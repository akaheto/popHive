import { queryParquet } from "./duckdb";
import { STATE_FIPS_BY_NAME } from "./states";
import type { IndicatorSeries, StateDatum } from "./types";

// Chronic disease / behavioral health: a deliberately smaller slice than the
// brief's full topic list (diabetes, obesity, cancer screenings,
// cardiovascular/depression/diabetes screening, wellness visits, adult
// vaccination, anxiety, depression, adhd, opioid use disorder, injury/
// firearm deaths). Diabetes, obesity, and opioid overdose were picked as a
// representative first slice; the rest are tracked in
// 11-future-enhancements.md rather than guessed at without their own schema
// checks.

const PREVALENCE_BUNDLE =
  "bundle_chronic_diseases/dist/prevalence_by_geography_and_year_and_source.parquet";
const OVERDOSE_BUNDLE = "bundle_injury_overdose/dist/overdose_deaths_state.parquet";
const FIREARMS_BUNDLE = "bundle_injury_overdose/dist/firearms_geography_source.parquet";

interface PrevalenceRow {
  geography: string;
  year: number;
  value: number | null;
  source: string;
}

interface OverdoseRow {
  geography: string;
  time: string;
  rate_deaths_overdose: number | null;
}

interface FirearmsRow {
  geography: string;
  year: number;
  rate_deaths_firearm: number | null;
}

async function buildPrevalenceSeries(
  outcomeName: "Diabetes" | "Obesity",
  source: string,
  unit: string
): Promise<IndicatorSeries> {
  const rows = await queryParquet<PrevalenceRow>(PREVALENCE_BUNDLE, (url) =>
    `SELECT geography, year, value, source
     FROM read_parquet('${url}')
     WHERE outcome_name = '${outcomeName}' AND source = '${source}' AND age = 'Total'
       AND year = (SELECT max(year) FROM read_parquet('${url}') WHERE outcome_name = '${outcomeName}' AND source = '${source}' AND age = 'Total')
     ORDER BY geography`
  );

  const states: StateDatum[] = [];
  let maxYear = 0;
  for (const r of rows) {
    if (r.geography === "United States" || r.value == null) continue;
    const fips = STATE_FIPS_BY_NAME[r.geography];
    if (!fips) continue;
    states.push({ stateFips: fips, stateName: r.geography, value: r.value, asOf: String(r.year) });
    if (r.year > maxYear) maxYear = r.year;
  }

  return {
    topic: outcomeName.toLowerCase(),
    signal: `${outcomeName.toLowerCase()}_${source}`,
    source,
    unit,
    asOf: String(maxYear),
    states,
  };
}

export function buildDiabetesSeries(): Promise<IndicatorSeries> {
  // ICD10-coded diagnoses (vs. Epic's HbA1c-lab-based series, which reads
  // lower) — chosen as the more commonly cited "diagnosed diabetes
  // prevalence" framing; both exist in the source data if a second signal
  // is added later (see 11-future-enhancements.md).
  return buildPrevalenceSeries("Diabetes", "Epic Cosmos: ICD10", "% diagnosed (Epic Cosmos)");
}

export function buildObesitySeries(): Promise<IndicatorSeries> {
  // BMI-measured (vs. ICD10-diagnosed, which undercounts obesity
  // substantially relative to measured BMI) — the more standard framing for
  // population obesity prevalence.
  return buildPrevalenceSeries("Obesity", "Epic Cosmos: BMI", "% by measured BMI (Epic Cosmos)");
}

export async function buildOpioidOverdoseSeries(): Promise<IndicatorSeries> {
  // Deliberately NOT using bundle_chronic_diseases/dist/
  // overdose_by_geography_and_source.parquet's `value` column — its state
  // rates (~120-140 per 100k at the most recent date checked) are
  // implausible against known CDC overdose-mortality ranges (worst-hit
  // states peak around 40-55 per 100k; national ~30). This file's
  // `rate_deaths_overdose` produced numbers in that sane range and was used
  // instead. Flagged rather than silently picking whichever loaded first.
  const rows = await queryParquet<OverdoseRow>(OVERDOSE_BUNDLE, (url) =>
    `SELECT geography, CAST(time AS VARCHAR) AS time, rate_deaths_overdose
     FROM read_parquet('${url}')
     WHERE time = (SELECT max(time) FROM read_parquet('${url}'))
     ORDER BY geography`
  );

  const states: StateDatum[] = [];
  let maxAsOf = "";
  for (const r of rows) {
    if (r.geography === "United States" || r.rate_deaths_overdose == null) continue;
    const fips = STATE_FIPS_BY_NAME[r.geography];
    if (!fips) continue;
    states.push({
      stateFips: fips,
      stateName: r.geography,
      value: r.rate_deaths_overdose,
      asOf: r.time,
    });
    if (r.time > maxAsOf) maxAsOf = r.time;
  }

  return {
    topic: "opioid_overdose",
    signal: "opioid_overdose",
    source: "CDC/NCHS",
    unit: "deaths per 100k (overdose, all drugs)",
    asOf: maxAsOf,
    states,
  };
}

export async function buildFirearmMortalitySeries(): Promise<IndicatorSeries | null> {
  // Firearm-related mortality (homicide, suicide, accidents) by state
  // Schema: https://github.com/PopHIVE/Ingest/tree/main/data/bundle_injury_overdose
  try {
    const rows = await queryParquet<FirearmsRow>(FIREARMS_BUNDLE, (url) =>
      `SELECT geography, year, rate_deaths_firearm
       FROM read_parquet('${url}')
       WHERE year IS NOT NULL AND rate_deaths_firearm IS NOT NULL
       ORDER BY geography, year DESC`
    );

    if (rows.length === 0) return null;

    const maxYear = Math.max(...rows.map((r) => r.year));
    const states: StateDatum[] = [];

    for (const r of rows) {
      if (r.geography === "United States" || r.year !== maxYear || r.rate_deaths_firearm == null)
        continue;
      const fips = STATE_FIPS_BY_NAME[r.geography];
      if (!fips) continue;
      states.push({
        stateFips: fips,
        stateName: r.geography,
        value: r.rate_deaths_firearm,
        asOf: String(r.year),
      });
    }

    if (states.length === 0) return null;

    return {
      topic: "firearm_mortality",
      signal: "firearm_mortality",
      source: "CDC/NCHS",
      unit: "deaths per 100k (firearms)",
      asOf: String(maxYear),
      states,
    };
  } catch (err) {
    console.warn("  Firearm mortality fetch failed:", err);
    return null;
  }
}
