// Calculate Case Fatality Rate (CFR) from death counts and case counts
// CFR = (Deaths / Cases) × 100

export interface CFRData {
  state: string;
  disease: "covid" | "influenza" | "rsv";
  date: string;
  deaths: number;
  cases: number;
  cfr: number; // percentage
  trend: "rising" | "stable" | "declining";
  weekOverWeekChange: number; // percentage point change
}

// Calculate CFR for a state's disease data
export function calculateCFR(
  state: string,
  disease: "covid" | "influenza" | "rsv",
  deathCounts: Array<{ date: string; count: number }>,
  caseCounts: Array<{ date: string; count: number }>
): CFRData | null {
  if (deathCounts.length === 0 || caseCounts.length === 0) {
    return null;
  }

  // Get most recent data points
  const latestDeath = deathCounts[deathCounts.length - 1];
  const latestCases = caseCounts[caseCounts.length - 1];

  // Ensure dates align (within 7 days)
  const deathDate = new Date(latestDeath.date);
  const caseDate = new Date(latestCases.date);
  const daysDiff = Math.abs(
    (deathDate.getTime() - caseDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff > 7) {
    return null;
  }

  // Calculate CFR
  const cfr =
    latestCases.count > 0 ? (latestDeath.count / latestCases.count) * 100 : 0;

  // Calculate trend (7-day comparison)
  let trend: "rising" | "stable" | "declining" = "stable";
  let weekOverWeekChange = 0;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const prevDeaths = deathCounts.find((d) => {
    const d_date = new Date(d.date);
    return d_date <= sevenDaysAgo;
  });

  const prevCases = caseCounts.find((c) => {
    const c_date = new Date(c.date);
    return c_date <= sevenDaysAgo;
  });

  if (prevDeaths && prevCases && prevCases.count > 0) {
    const prevCFR = (prevDeaths.count / prevCases.count) * 100;
    weekOverWeekChange = cfr - prevCFR;

    if (cfr > prevCFR * 1.1) {
      trend = "rising";
    } else if (cfr < prevCFR * 0.9) {
      trend = "declining";
    }
  }

  return {
    state,
    disease,
    date: latestDeath.date,
    deaths: latestDeath.count,
    cases: latestCases.count,
    cfr: Math.round(cfr * 100) / 100,
    trend,
    weekOverWeekChange: Math.round(weekOverWeekChange * 100) / 100,
  };
}

// Calculate CFR for all states
export function calculateStateCFRs(
  deaths: Record<string, Array<{ date: string; count: number }>>,
  cases: Record<string, Array<{ date: string; count: number }>>,
  disease: "covid" | "influenza" | "rsv"
): CFRData[] {
  const cfrs: CFRData[] = [];

  for (const state in deaths) {
    if (cases[state]) {
      const cfr = calculateCFR(state, disease, deaths[state], cases[state]);
      if (cfr) {
        cfrs.push(cfr);
      }
    }
  }

  return cfrs.sort((a, b) => b.cfr - a.cfr);
}

// Interpretation helper
export function interpretCFR(cfr: number): string {
  if (cfr < 0.1) return "Very Low";
  if (cfr < 0.5) return "Low";
  if (cfr < 1) return "Moderate";
  if (cfr < 2) return "High";
  return "Very High";
}
