// Build-time data pipeline: fetches PopHIVE parquet bundles via DuckDB,
// applies the project's data-quality rules, and writes static JSON consumed
// by the site. Run via `npm run build:data` (also wired as `prebuild`).
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  buildOverviewCard,
  buildStateSignalSeries,
  AVAILABLE_SIGNALS,
} from "../lib/pophive/overallTrends";
import {
  buildMeaslesOverviewCard,
  buildMeaslesWeeklySeries,
  buildMeaslesCumulativeSeries,
} from "../lib/pophive/measles";
import { buildCountySeries } from "../lib/pophive/countyEdVisits";
import { buildMmrHealthmapSeries, buildMmrNisSeries } from "../lib/pophive/vaccination";
import { fetchAllBoroughData, type RespiratoryDisease as NycDisease } from "../lib/nycDohmh";

const OUT_DIR = path.join(__dirname, "..", "data", "generated");

const RESPIRATORY_DISEASES = ["flu", "covid", "rsv"] as const;

async function main() {
  const startedAt = Date.now();
  await mkdir(OUT_DIR, { recursive: true });

  console.log("Building overview cards...");
  const [flu, covid, rsv, measles] = await Promise.all([
    buildOverviewCard("flu"),
    buildOverviewCard("covid"),
    buildOverviewCard("rsv"),
    buildMeaslesOverviewCard(),
  ]);
  const overview = { flu, covid, rsv, measles, generatedAt: new Date().toISOString() };
  await writeFile(path.join(OUT_DIR, "overview.json"), JSON.stringify(overview, null, 2));
  console.log(
    `  flu: ${flu.value}${flu.unit} (${flu.level}, ${flu.trend}, ${flu.pctOfPeak}% of peak, as of ${flu.asOf})`
  );
  console.log(
    `  covid: ${covid.value}${covid.unit} (${covid.level}, ${covid.trend}, ${covid.pctOfPeak}% of peak, as of ${covid.asOf})`
  );
  console.log(
    `  rsv: ${rsv.value}${rsv.unit} (${rsv.level}, ${rsv.trend}, ${rsv.pctOfPeak}% of peak, as of ${rsv.asOf})`
  );
  console.log(
    `  measles: ${measles.weeklyCasesUS} weekly cases US (${measles.trend}, ${measles.activeStateCount} states active, as of ${measles.asOf})`
  );

  console.log("\nBuilding state-level signal series...");
  const states: Record<string, unknown> = {};
  for (const disease of RESPIRATORY_DISEASES) {
    states[disease] = {};
    for (const signal of AVAILABLE_SIGNALS) {
      const series = await buildStateSignalSeries(disease, signal);
      (states[disease] as Record<string, unknown>)[signal] = series;
      console.log(
        `  ${disease} / ${signal}: ${series.states.length} states, as of ${series.asOf}`
      );
    }
  }
  const [measlesWeekly, measlesCumulative] = await Promise.all([
    buildMeaslesWeeklySeries(),
    buildMeaslesCumulativeSeries(),
  ]);
  states.measles = { weekly: measlesWeekly, cumulative: measlesCumulative };
  console.log(
    `  measles / weekly: ${measlesWeekly.states.length} states, as of ${measlesWeekly.asOf}`
  );
  console.log(
    `  measles / cumulative: ${measlesCumulative.states.length} states, as of ${measlesCumulative.asOf}`
  );
  await writeFile(path.join(OUT_DIR, "states.json"), JSON.stringify(states, null, 2));

  console.log("\nBuilding county-level series (ED visits %)...");

  // NYC DOHMH borough blend (D-008): a secondary source, so its failure
  // must never fail the whole build — fall back to the existing
  // PopHIVE-derived counties (HSA-level + disclosure) for NYC if this
  // doesn't come back.
  let boroughData: Record<NycDisease, Awaited<ReturnType<typeof fetchAllBoroughData>>["flu"]> | null =
    null;
  try {
    boroughData = await fetchAllBoroughData();
    console.log(
      `  NYC DOHMH: fetched borough data for ${Object.keys(boroughData).length} diseases`
    );
  } catch (err) {
    console.warn(
      "  NYC DOHMH fetch failed — NYC boroughs will fall back to PopHIVE HSA-level + disclosure:",
      err
    );
  }

  const counties: Record<string, unknown> = {};
  for (const disease of RESPIRATORY_DISEASES) {
    const series = await buildCountySeries(disease);

    if (boroughData) {
      const byFips = new Map(series.counties.map((c) => [c.countyFips, c]));
      for (const b of boroughData[disease]) {
        byFips.set(b.countyFips, {
          countyFips: b.countyFips,
          value: b.value,
          isStateEstimate: false,
          asOf: b.asOf,
          source: b.source,
        });
      }
      series.counties = Array.from(byFips.values());
    }

    counties[disease] = series;
    const estimated = series.counties.filter((c) => c.isStateEstimate).length;
    const dohmhCount = series.counties.filter((c) => c.source === "NYC DOHMH").length;
    console.log(
      `  ${disease}: ${series.counties.length} counties (${estimated} state-estimate fallback, ${dohmhCount} NYC DOHMH), as of ${series.asOf}`
    );
  }
  await writeFile(path.join(OUT_DIR, "counties.json"), JSON.stringify(counties, null, 2));

  console.log("\nBuilding vaccination-coverage series (MMR)...");
  const [mmrHealthmap, mmrNis] = await Promise.all([
    buildMmrHealthmapSeries(),
    buildMmrNisSeries(),
  ]);
  const vaccination = { mmrHealthmap, mmrNis };
  console.log(
    `  MMR (HealthMap): ${mmrHealthmap.states.length} states, as of ${mmrHealthmap.asOf}`
  );
  console.log(`  MMR (NIS): ${mmrNis.states.length} states, as of ${mmrNis.asOf}`);
  await writeFile(
    path.join(OUT_DIR, "vaccination.json"),
    JSON.stringify(vaccination, null, 2)
  );

  console.log(`\nDone in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Data pipeline failed:", err);
  process.exit(1);
});
