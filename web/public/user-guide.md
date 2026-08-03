# User Guide

Keep these instructions aligned with the delivered behavior. Write for the actual user,
avoiding implementation detail unless it helps them succeed.

## Purpose

A personal dashboard for checking current US public-health surveillance data at a glance. Features include:
- **Outbreak Tracker**: Disease activity (flu, COVID-19, RSV, measles) by state and county with customizable signals
- **Tri-state/NYC view**: New York, New Jersey, Connecticut counties with true per-borough NYC data
- **Vaccination monitoring**: MMR coverage with dual-source comparison (HealthMap vs CDC NIS) plus 5 additional vaccine types
- **CDC Dashboard**: Multi-tab analysis including data explorer, state health assessments, and disease progression tracking
- **Chronic Disease & Behavioral Health**: Separate tab for diabetes, obesity, opioid overdose with slower-moving indicators
- **Personalization**: Per-disease signal defaults (saved to browser) and level-change alerts
- **Accessibility**: WCAG AA compliant with 44px touch targets and keyboard navigation

All data sourced from PopHIVE (Yale School of Public Health) with NYC's own open data for borough-level precision.

## Intended audience

- Primary users: Ben Aheto (sole user).
- Expected knowledge: Comfortable reading epidemiological data (ED visit %, wastewater
  activity levels, hospitalization rates, coverage percentages); no special training
  assumed beyond that.

## Prerequisites

- A web browser.
- The dashboard's hosted URL: **https://public-health-dashboard-ten.vercel.app** (unlisted, not
  linked publicly anywhere — no login required, per the personal-use scope).

## Installation or access

1. Hosted (recommended): open https://public-health-dashboard-ten.vercel.app directly. The site
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

1. Open the dashboard at **https://public-health-dashboard-ten.vercel.app**. The **Outbreak Tracker** tab is selected by default, showing:
   - Overview strip with 4 disease cards (Influenza, COVID-19, RSV, Measles) displaying current level, trend, % of peak, and age
   - 2-year historical trend chart for each disease
   - US map below showing the selected disease/signal
2. Choose what to display:
   - **Disease buttons**: Influenza / COVID-19 / RSV / Measles
   - **Signal buttons**: 10+ sources including ED visits %, Wastewater, Hospitalizations, Lab positivity, etc.
   - **Personalization**: Click the ☆ star icon next to a signal to save it as your default for that disease
3. Interact with the map:
   - Click any state to drill into its counties (county-level detail available for respiratory diseases)
   - Hover counties for exact values and dates
   - Click "← Back to national map" to return
   - Use "Tri-State + NYC" button for focused NY/NJ/CT/NYC view
4. Monitor alerts: The **Level Change** banner shows recent severity changes for tracked diseases
5. Explore other tabs:
   - **CDC Dashboard**: State-level health assessments, data trends, disease progression
   - **Chronic Disease & Behavioral Health**: Slower-moving indicators (diabetes, obesity, opioid overdose)

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

### Personalize signal defaults

- Goal: Save your preferred signal for each disease so it automatically loads when you select that disease.
- Steps:
  1. On the Outbreak Tracker tab, choose a disease (e.g., Influenza).
  2. Select a signal (e.g., ED visits %).
  3. Click the ☆ star icon next to the signal name — it fills and turns ★ to indicate saved.
  4. Next time you select Influenza, that signal will load by default.
- Expected result: Your signal preferences are saved to your browser and persist across visits.

### Monitor level change alerts

- Goal: Stay aware of sudden disease severity shifts.
- Before you begin: Monitor the dashboard over time as disease levels change.
- Steps:
  1. Watch the "Level Change" notification banner on the Outbreak Tracker tab.
  2. It shows the 3 most recent disease level changes (e.g., "Influenza changed from Low to Moderate").
  3. The banner disappears after the latest change is older than 30 days.
- Expected result: Quick visibility into disease severity shifts without manually tracking each card.

### Use the CDC Dashboard

- Goal: Explore CDC-sourced data, assess state health status, and track disease trends across states.
- Steps:
  1. Click the **CDC Dashboard** tab at the top.
  2. Choose one of three sub-tabs:
     - **Data Explorer**: Browse raw CDC metrics by state (respiratory, chronic disease, mental health indicators)
     - **State Assessment**: Detailed health assessment for a selected state, comparing across metrics
     - **Disease Progression**: Track disease spread patterns and trends moving between states
  3. Each tab loads data from 12+ CDC datasets integrated directly from data.cdc.gov.
- Expected result: Comprehensive view of CDC surveillance data with state-level detail.

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
- CDC Dashboard data from 12+ CDC datasets, updated at varying frequencies (daily to annual).
- County-level drill-down covers ED visits % only for respiratory diseases; measles and other
  diseases available at state level only (see `11-future-enhancements.md`).
- Chronic-disease tab covers 3 representative indicators (diabetes, obesity, opioid
  overdose), not the full topic list from the original brief.
- Signal defaults and level-change history are stored in your browser's localStorage; clearing
  your browser data will reset these settings.
- Verified in Chrome desktop and on iPhone 14 Pro (390×844) as of 2026-08-02. WCAG AA
  compliant: 44px minimum touch targets, keyboard navigation enabled, color contrast verified,
  dark/light mode themes supported. Not verified on other browsers or devices.

## Getting help

- Support owner or channel: Ben Aheto (self-supported personal project).
- Information to include: N/A — no support process needed for a single-user project.

## Version history

| Date | Version or milestone | User-facing change |
|---|---|---|
| 2026-07-25 | Pre-M1 | Documentation scaffolded; no user-facing product yet |
| 2026-07-26 | M1-M6 | First full build: national map, overview strip, tri-state/NYC pinned view with real per-borough data, MMR vaccination-coverage layer, and a separate chronic-disease tab. Browser-verified. |
| 2026-07-26 | M7 | Deployed to Vercel at https://public-health-dashboard-ten.vercel.app, connected to a private GitHub repo, with a daily scheduled rebuild via Vercel Cron. Theme-aware dark-mode choropleth. |
| 2026-08-02 | M8 | Formal QA sign-off and retrospective. Manual verification on iPhone 14 Pro confirmed responsive design and dark/light mode rendering. |
| 2026-08-02 | Post-M8 Enhancements | Released 8 enhancements: signal defaults (localStorage), 2-year trend charts, level-change alerts, 10+ signals, lazy-loaded county data, measles county drill-down (320 counties), 6 vaccine types, WCAG AA touch-target sizing (44px). CDC Dashboard integrated as main tab with data explorer, state assessments, and disease progression tracking. |

## Documentation QA

- [x] Instructions were tested against the delivered output — verified interactively in
      Chrome on 2026-07-26 (map hover/click/drill-down, tri-state view, vaccination
      toggle, chronic-disease tab, narrow-viewport layout).
- [x] Names, labels, screenshots, and workflows match the approved visual style guide
      and current product — confirmed via the same browser pass; two text-spacing bugs
      found were fixed before this guide was finalized.
- [x] Accessibility instructions and keyboard behavior documented — WCAG AA verified on 2026-08-02 with 44px touch targets and keyboard navigation.
