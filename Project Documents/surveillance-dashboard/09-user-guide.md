# User Guide

Keep these instructions aligned with the delivered behavior. Write for the actual user,
avoiding implementation detail unless it helps them succeed.

## Purpose

A personal dashboard for checking current US public-health surveillance data at a
glance: disease activity (flu, COVID-19, RSV, measles) by state and county, a
tri-state/NYC pinned view with true per-borough data, MMR vaccination coverage paired
with the measles map, and a separate chronic-disease/behavioral-health tab — all
sourced from PopHIVE (plus NYC's own open data for borough-level precision).

## Intended audience

- Primary users: Ben Aheto (sole user).
- Expected knowledge: Comfortable reading epidemiological data (ED visit %, wastewater
  activity levels, hospitalization rates, coverage percentages); no special training
  assumed beyond that.

## Prerequisites

- A web browser.
- The dashboard's hosted URL: **https://web-six-sage-30.vercel.app** (unlisted, not
  linked publicly anywhere — no login required, per the personal-use scope).

## Installation or access

1. Hosted (recommended): open https://web-six-sage-30.vercel.app directly. The site
   rebuilds automatically once a day (12:00 UTC) via Vercel Cron, re-running the full
   data pipeline so it stays current without any manual step.
2. Local development: from the `web/` folder, run `npm install` once, then `npm run dev`
   and open the printed `localhost` URL. The data pipeline runs automatically before
   each build (`npm run build`) via the `prebuild` script; for local dev, run
   `npm run build:data` manually first (or after pulling new code) to refresh the
   generated JSON in `web/data/generated/`.

## Configuration

| Setting | Purpose | Required? | Default | Example |
|---|---|---:|---|---|
| — | No user-facing configuration — all selectors are in-page state, not persisted settings | | | |

Do not include real secrets or credentials.

## Quick start

1. Open the dashboard. The **Outbreak Tracker** tab is selected by default, showing the
   national status overview strip (4 cards: Influenza, COVID-19, RSV, Measles) and a US
   map below it.
2. Use the disease buttons (Influenza / COVID-19 / RSV / Measles) and signal buttons
   (ED visits % / Wastewater / Hospitalizations, or Weekly / Cumulative for measles) to
   change what the map shows.
3. Click any state on the map to drill into its counties; click "← Back to national
   map" to return.

## Core workflows

### Check current national status

- Goal: See at-a-glance disease activity levels.
- Before you begin: Open the dashboard (Outbreak Tracker tab, the default view).
- Steps:
  1. Read the 4 overview cards: level (Minimal/Low/Moderate/High, or case counts for
     measles), trend arrow, % of 2-year peak, and the `as of` date.
  2. Note that level and trend are this project's own estimate, disclosed on each
     respiratory card — PopHIVE itself doesn't publish exact thresholds, and for
     measles specifically PopHIVE declines to classify severity at all, so no level is
     shown there.
- Expected result: Four cards reflecting the most recent pipeline run, each with a
  visible `as of` date.

### Drill into a state or county

- Goal: See local detail for a disease/signal.
- Before you begin: Outbreak Tracker tab, a disease and signal selected.
- Steps:
  1. Click a state on the national map.
  2. The map switches to that state's counties, colored by ED visits % (the only signal
     available at county level).
  3. Hover any county for its exact value and date. A dashed outline plus "Estimated
     (not county-specific)" in the legend marks counties with no direct report, showing
     the state estimate instead.
  4. Click "← Back to national map" to return.
- Expected result: County-level detail for the selected state, with estimated/real
  values visibly distinguished.

### Check the tri-state/NYC view

- Goal: See NY/NJ/CT county detail with the 5 NYC boroughs called out, without having to
  click through the national map state by state.
- Before you begin: Select a respiratory disease (Influenza, COVID-19, or RSV) — this
  view isn't available for measles, since there's no county-level measles data yet.
- Steps:
  1. Click "Tri-State + NYC" next to the signal selector.
  2. The map shows NY, NJ, and CT counties; the 5 NYC boroughs are outlined in blue.
  3. Hover a borough — its value comes from NYC's own health department data (true
     per-borough), not PopHIVE's feed, which sometimes reports one shared value across
     all 5 boroughs. A note above the map explains this.
- Expected result: NY/NJ/CT counties with NYC boroughs visibly outlined and showing
  real, distinct values.

### Check vaccination coverage

- Goal: See MMR coverage alongside current measles activity.
- Steps:
  1. Select the Measles disease tab.
  2. Scroll below the measles map to "MMR vaccination coverage."
  3. Toggle between HealthMap and CDC NIS — they measure coverage differently and
     disagree substantially (NIS reads much higher); both are shown rather than
     averaged into one number.
  4. Note the `as of` date, shown in orange — vaccination-coverage data is far staler
     (months to over a year old) than the weekly measles case data above it.
- Expected result: A US map of MMR coverage by state, source-labeled, with a clearly
  flagged (older) as-of date.

### Check chronic-disease/behavioral-health indicators

- Goal: Check slower-moving indicators (diabetes, obesity, opioid overdose deaths)
  separately from the weekly outbreak tracker.
- Steps:
  1. Click "Chronic Disease & Behavioral Health" at the top of the page — this is a
     fully separate tab, not a section of the outbreak tracker, and does not refresh on
     the same schedule.
  2. Choose an indicator: Diabetes, Obesity, or Opioid overdose deaths.
  3. Read the source/unit/as-of line above the map.
- Expected result: A state-level map for the selected indicator. Note this covers 3
  representative indicators, not the complete list of chronic-disease/behavioral-health
  topics — see `11-future-enhancements.md` for what's not yet built.

## Inputs and outputs

| Item | Format | Description | Example |
|---|---|---|---|
| Disease selector | Buttons | Choose Influenza / COVID-19 / RSV / Measles | "COVID-19" |
| Signal selector | Buttons | ED visits % / Wastewater / Hospitalizations (respiratory); Weekly cases / Cumulative (measles) | "Wastewater" |
| Indicator selector (Chronic tab) | Buttons | Diabetes / Obesity / Opioid overdose deaths | "Diabetes" |
| `as of` date | Text label | How current the displayed data is | "as of 2026-07-18" |
| Map hover tooltip | On-hover panel | Name, value, date, and estimate disclosure if applicable | "North Carolina, 0.25%, as of 2026-07-18" |

## Common problems

| Symptom | Likely cause | Resolution |
|---|---|---|
| A county shows a dashed outline and "estimated" note | No direct county-level report that week; a state-level estimate is shown instead | Expected behavior, not a bug — the real per-county figure isn't available |
| NYC boroughs look identical in the national map's county drill-down (not the Tri-State + NYC view) | The national drill-down still uses PopHIVE's NSSP feed, which sometimes shares one HSA-level value across boroughs | Use "Tri-State + NYC" instead — it uses NYC's own true per-borough data |
| A state is gray/"No data" on the map | That state doesn't report to the selected signal's source (e.g. some states don't report to NSSP for a given disease) | Expected — try a different signal or disease |
| MMR coverage numbers look very different between HealthMap and CDC NIS | They measure coverage differently (see the disclosure text on the panel) | Not a bug — shown separately on purpose, not averaged |
| Data looks older than expected | PopHIVE ingests Tue/Fri; some sources (vaccination coverage, certain chronic-disease indicators) update monthly to annually | Check the `as of` date on the panel — it reflects true source freshness |

## Limitations and safe use

- This dashboard reflects PopHIVE's own data limitations: suppressed/small counts are
  not shown as true zeros, and some sources (vaccination coverage, chronic-disease
  indicators) can lag current data by months to over a year.
- Level/trend labels on the overview strip are this project's own approximation, not an
  official PopHIVE classification — disclosed directly on each card.
- Not intended as a clinical or public-health decision-making tool — it is a personal
  situational-awareness dashboard.
- County-level drill-down covers ED visits % only (flu/COVID/RSV) — no county-level
  measles yet, and no county-level vaccination coverage yet (see
  `11-future-enhancements.md`, E-009/E-011).
- Chronic-disease tab covers 3 representative indicators (diabetes, obesity, opioid
  overdose), not the full topic list from the original brief.
- Verified in Chrome desktop (1400×900) and a narrow 420×850 viewport as of 2026-07-26;
  not yet verified in other browsers, on physical mobile devices, or against formal
  accessibility tooling (screen readers, automated contrast/keyboard audits) — treat
  those as open until explicitly tested.

## Getting help

- Support owner or channel: Ben Aheto (self-supported personal project).
- Information to include: N/A — no support process needed for a single-user project.

## Version history

| Date | Version or milestone | User-facing change |
|---|---|---|
| 2026-07-25 | Pre-M1 | Documentation scaffolded; no user-facing product yet |
| 2026-07-26 | M1-M6 | First full build: national map, overview strip, tri-state/NYC pinned view with real per-borough data, MMR vaccination-coverage layer, and a separate chronic-disease tab. Browser-verified. |
| 2026-07-26 | M7 | Deployed to Vercel at https://web-six-sage-30.vercel.app, connected to a private GitHub repo, with a daily scheduled rebuild via Vercel Cron. |

## Documentation QA

- [x] Instructions were tested against the delivered output — verified interactively in
      Chrome on 2026-07-26 (map hover/click/drill-down, tri-state view, vaccination
      toggle, chronic-disease tab, narrow-viewport layout).
- [x] Names, labels, screenshots, and workflows match the approved visual style guide
      and current product — confirmed via the same browser pass; two text-spacing bugs
      found were fixed before this guide was finalized.
- [ ] Accessibility instructions and keyboard behavior are documented where relevant —
      not yet done; map drill-down is currently mouse/touch-only (tracked as E-010).
