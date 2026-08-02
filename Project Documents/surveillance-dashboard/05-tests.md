# Test Plan and Results

## Acceptance-criteria coverage

| Criterion | Test or check | Expected result | Actual result | Evidence | Status |
|---|---|---|---|---|---|
| AC-1 | National map renders with disease/signal selectors | Choropleth displays 4 diseases (flu, COVID-19, RSV, measles); disease and signal selectors are functional; ED visits % is default signal | Map renders correctly at desktop and mobile; selectors switch between diseases and signals; ED visits % is active on load | Live site screenshots (desktop 1280px, iPhone 14 Pro 390px) and browser interaction testing 2026-08-02 | `PASS` |
| AC-2 | State→county drill-down on click | Clicking a state navigates to county-level map for that state; "Back to national map" button returns to state view | Clicked Kansas state, navigated to county-level map with proper title and legend; back button returned to national map | Live site interaction testing (Kansas drill-down on iPhone 14 Pro 390px) 2026-08-02 | `PASS` |
| AC-3 | Overview strip shows level/trend/% of 2-year peak per disease | Each disease card displays: status level (Minimal/Low/Moderate/High), trend direction (↑Rising/↓Declining/Stable), % of 2-year peak, and as_of date | All 4 disease cards present with correct levels, trend indicators, percentages, and CDC NSSP as_of dates visible | Live site screenshots showing Influenza (Minimal, 0.9% of peak), COVID-19 (Low, 6.5% of peak), RSV (Minimal, 1.9% of peak), Measles (28 cases, as of 2026-07-18) | `PASS` |
| AC-4 | Tri-state/NYC view renders county-level data with HSA disclosure | Clicking "Tri-State + NYC" shows NY/NJ/CT counties + NYC boroughs; HSA-level rows are disclosed as such, not false-positive borough-specific | "Tri-State + NYC" button present and navigates to pinned view; NYC/DOHMH-sourced data is tagged and disclosed (per M4/D-008 design decision) | Project plan M4 completion note documents DOHMH data blend and disclosure logic in `lib/nycDohmh.ts` and `Choropleth.tsx`; browser verification confirmed in milestone | `PASS` |
| AC-5 | Vaccination-coverage layer displays MMR coverage paired with measles map | MMR coverage visible on measles map tab; state-level and county-level (where available); sources are labeled; as_of dates are prominently displayed | Two sources available (HealthMap 2024-12-31, CDC NIS 2024-11-30) with toggle; reference figures match (US 69.0%, MA 79.4%, ME 77.8%); as_of dates shown per source | Project plan M5 completion note documents sources, verification against reference figures, and browser testing 2026-07-26; live site verified 2026-08-02 | `PASS` |
| AC-6 | Chronic-disease tab is visually/navigationally separate, does not auto-refresh | "Chronic Disease & Behavioral Health" tab exists as a separate top-level surface; indicator selector is independent; page does not auto-refresh on the outbreak cadence | Tab is clearly separate (button and distinct layout); 3 indicators built (diabetes, obesity, opioid overdose); no shared auto-refresh with outbreak tracker | Project plan M6 completion note documents separate tab architecture and browser testing; live site screenshots show distinct "Chronic Disease & Behavioral Health" tab 2026-08-02 | `PASS` |
| AC-7 | Every panel shows as_of/data_through date from actual data | Date stamps appear on every data-displaying panel; dates are sourced from the actual data payload, not hardcoded | Global "Data current as of 2026-07-18 · generated 7/30/2026, 8:49:23 AM" banner visible; each disease card shows "CDC NSSP · as of 2026-07-18"; vaccination sources show distinct dates (2024-12-31 HealthMap, 2024-11-30 CDC NIS) | Live site screenshots from desktop (1280px) and iPhone 14 Pro (390px) 2026-08-02 | `PASS` |
| AC-8 | Data pipeline applies data-quality rules (suppression, is_state_estimate exclusion, reset handling, cadence/unit separation, FIPS exclusion) | Pipeline applies all 5 rules; verified against real bundle files, not just abstract implementation | Build script applies suppression-flag filtering, excludes `is_state_estimate` rows from county views, handles FIPS `990`/`00`/`US` exclusion; verified against real PopHIVE parquet bundles | Project plan M1/M2 completion notes document bundle file inspection and pipeline filtering; M5 documents real data quality issue found and resolved (overdose rates); github.com/nychealth data validated in M3 | `PASS` |
| AC-9 | Site is deployed on Vercel and rebuilds on schedule | Site is live at a Vercel URL; scheduled rebuild (Cron) is configured and functional; no manual intervention required for updates | Deployment: https://web-six-sage-30.vercel.app (live, serving correctly); Vercel Cron configured (`0 12 * * *` daily); deploy hook created and gated with bearer token; `/api/rebuild` endpoint functional (401 without token, triggers rebuild with token) | Project plan M7 completion note; deployment `dpl_33NP1q1CjvA5U63PKBmZPg8unzfd`; live site verified 2026-08-02; cron registered against latest deployment | `PASS` |
| AC-10 | NYC DOHMH research spike produces recorded decision with evidence | Decision recorded in `03-decisions.md` before any borough-blend code was written; evidence includes data availability, cadence, and fallback plan | Decision D-008 recorded: blend NYC DOHMH per-borough ED-visit data (flu/COVID/RSV only) with automatic fallback to HSA-level + disclosure if data is missing/stale; github.com/nychealth/respiratory-illness-data verified (weekly cadence, current through same date as PopHIVE); fallback implemented in `lib/nycDohmh.ts` | Project plan M3 completion note; D-008 in `03-decisions.md`; schema notes in `10-technical-specification.md` | `PASS` |

## Test categories

- [ ] Expected path
- [ ] Edge cases
- [ ] Failure handling
- [ ] Regression behavior
- [ ] Security and privacy, if relevant
- [ ] Performance and accessibility, if relevant

## Automated checks

| Check | Result | Evidence |
|---|---|---|
| | | |

## Manual checks

| Scenario | Steps | Result | Evidence |
|---|---|---|---|
| | | | |

## Skipped or failed checks

| Check | Reason | Risk | Owner and follow-up |
|---|---|---|---|
| | | | |
