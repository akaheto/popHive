# Agile Project Plan

This is a living document. Update it whenever a milestone starts, changes status,
becomes blocked, or satisfies its definition of done.

## Project overview

- Project: Public health surveillance dashboard (surveillance-dashboard)
- Product owner: Ben Aheto
- Delivery owner: Claude Code
- Started: 2026-07-25
- Target outcome: See `00-brief.md` desired outcome.
- Overall status: `IN PROGRESS`
- Last updated: 2026-07-25

## Product goal

A personal, hosted dashboard that gives a trustworthy, at-a-glance view of current US
disease activity (flu, COVID-19, RSV, measles), tri-state/NYC drill-down, vaccination
coverage, and chronic-disease/behavioral-health indicators — all sourced from PopHIVE,
with honest recency and precision disclosures throughout.

## Delivery approach

- Cadence: `MILESTONE`
- Review frequency: At the end of each milestone, informally with the user.
- Prioritization method: National map + overview strip first (core value), then
  tri-state/NYC, vaccination layer, and chronic-disease tab in the order listed below.
- Release strategy: Continuous deploy to Vercel on scheduled rebuild; each milestone
  ships as soon as its acceptance criteria pass.

## Definition of ready

A backlog item is ready when:

- [x] User value is clear.
- [x] Scope and acceptance criteria are defined.
- [x] Dependencies and risks are understood.
- [x] The item can be verified.

## Project definition of done

- [ ] Acceptance criteria are satisfied.
- [ ] Required tests pass and evidence is recorded.
- [ ] QA is complete.
- [ ] User guide is current.
- [ ] Technical specification is current.
- [ ] Enhancement register is current.
- [ ] Visual style guide and representative examples are current.
- [ ] Risks, limitations, and follow-ups have owners.

## Milestone roadmap

| ID | Milestone | Goal | Owner | Target | Status | Started | Completed |
|---|---|---|---|---|---|---|---|
| M1 | Scaffold + data pipeline foundation | Working Next.js/Vercel scaffold, validated parquet→JSON pipeline for one bundle | Claude Code | No deadline | `COMPLETE` | 2026-07-25 | 2026-07-25 |
| M2 | National map + overview strip | Choropleth (state+county) for 4 diseases, disease/signal selectors, overview strip | Claude Code | No deadline | `IN PROGRESS` | 2026-07-25 | |
| M3 | NYC DOHMH research spike | Recorded decision: blend borough data or keep HSA-level | Claude Code | No deadline | `COMPLETE` | 2026-07-26 | 2026-07-26 |
| M4 | Tri-state/NYC pinned view | County drill-down for NY/NJ/CT + NYC boroughs, per M3 outcome | Claude Code | No deadline | `IN PROGRESS` | 2026-07-26 | |
| M5 | Vaccination-coverage layer | MMR (+ other childhood vaccines) paired with measles map | Claude Code | No deadline | `IN PROGRESS` | 2026-07-26 | |
| M6 | Chronic-disease/behavioral-health tab | Separate slower-cadence tab | Claude Code | No deadline | `IN PROGRESS` | 2026-07-26 | |
| M7 | Scheduled rebuild + visual/accessibility pass | Vercel Cron wired, style guide applied consistently | Claude Code | No deadline | `NOT STARTED` | | |
| M8 | Test, QA, and close-out | All ACs verified, QA passed, retro complete | Claude Code | No deadline | `NOT STARTED` | | |

## Milestone details

### M1 — Scaffold + data pipeline foundation

- Goal: Prove the technical foundation works before building UI on top of it.
- Owner: Claude Code
- Dependencies: D-006/D-007 confirmed by the user (Next.js, DuckDB) — done.
- Planned deliverables: Next.js repo scaffolded and linked to Vercel; a build script that
  fetches one real PopHIVE parquet bundle via DuckDB and parses it correctly.
- Acceptance criteria:
  - [x] DuckDB reads a real PopHIVE parquet bundle directly over HTTP in the build
        environment.
  - [x] Parsed output matches the bundle's documented columns.
- Definition of done:
  - [x] Acceptance criteria verified.
  - [ ] Test and QA evidence linked (formal `05-tests.md` entry pending; informal
        evidence recorded below).
  - [x] Living documentation updated (`10-technical-specification.md` schema notes).
  - [ ] Visual standards and approved exceptions updated. (N/A — no UI yet.)
- Status: `IN PROGRESS` (scaffold + schema validation done; data-quality pipeline for
  all four diseases per plan step 2 still to build)
- Start note: Started 2026-07-25 after D-006/D-007 confirmed.
- Completion note: Next.js app scaffolded at `web/`; DuckDB confirmed working against
  live PopHIVE parquet with no auth. Real schemas confirmed for
  flu/covid/rsv_ed_visits_by_county and measles_county/measles_state via DuckDB
  DESCRIBE, plus a full bundle file listing via the GitHub contents API. Found `fips` is
  a DOUBLE needing zero-pad, `is_state_estimate` is a DOUBLE 0/1, suppression columns
  are not universal, and measles county data uses a `geography` code whose FIPS
  compatibility is unconfirmed (see Q-002 in the technical spec) — flagged to resolve
  before wiring measles into the county map.
- Evidence: `web/scripts/inspect-bundle.mjs` output (see technical spec's "Confirmed
  real bundle files" section for the recorded schemas).

### M2 — National map + overview strip

- Goal: Deliver the core, highest-value surface (AC-1, AC-2, AC-3, AC-7, AC-8 partial).
- Owner: Claude Code
- Dependencies: M1.
- Planned deliverables: Choropleth with disease/signal selectors and county drill-down;
  overview strip; data-quality rules applied in the pipeline.
- Acceptance criteria: AC-1, AC-2, AC-3, AC-7, AC-8 (respiratory/measles bundles only).
- Definition of done: as above.
- Status: `IN PROGRESS`
- Start note: Started 2026-07-25, directly following M1.
- Completion note: Build complete — data pipeline (overview cards, 3-signal state
  series, county ED-visit series with disclosed state-estimate fallback), Choropleth
  and OverviewStrip components, disease/signal selectors, drill-down navigation, all
  wired into `app/page.tsx`. Typecheck/lint clean; dev server confirmed serving correct
  content via server logs + rendered HTML inspection (52 SVG paths = 50 states + DC +
  nation outline; card values match the pipeline's own verified output). Full
  interactive/visual browser verification (colors, hover, click interaction, responsive
  behavior, accessibility) intentionally deferred at the user's request — milestone
  stays `IN PROGRESS` until that's done, per the "never claim completion while required
  checks remain unrun" rule.
- Evidence: `web/app`, `web/components`, `web/lib/pophive`; `/tmp/nextdev.log` server
  output; rendered HTML spot-check (2026-07-26).

### M3 — NYC DOHMH research spike

- Goal: Resolve A-001/Q-001 before writing any borough-blend code.
- Owner: Claude Code
- Dependencies: None (can run in parallel with M2).
- Planned deliverables: A recorded decision in `03-decisions.md` (new entry) stating
  whether DOHMH data is usable, for which diseases, at what cadence.
- Acceptance criteria: AC-10.
- Definition of done: Decision recorded with evidence; no code committed to blending
  unless the decision says to.
- Status: `COMPLETE`
- Completion note: Verified `github.com/nychealth/respiratory-illness-data` provides
  true per-borough ED-visit % for flu/COVID/RSV (not measles), updated weekly, current
  through the same date as PopHIVE. Decision D-008 recorded: blend it, with automatic
  fallback to the existing HSA-level + disclosure path if a borough's row is ever
  missing/stale.
- Evidence: D-008 in `03-decisions.md`; schema notes in `10-technical-specification.md`.

### M4 — Tri-state/NYC pinned view

- Goal: Deliver AC-4.
- Owner: Claude Code
- Dependencies: M2, M3.
- Planned deliverables: Tri-state/NYC panel, HSA-disclosure logic (or DOHMH blend per M3).
- Acceptance criteria: AC-4.
- Status: `IN PROGRESS`
- Completion note: Built — `lib/nycDohmh.ts` fetches real per-borough ED-visit data
  (D-008) and merges it into the county pipeline with source tagging; a pinned
  "Tri-State + NYC" button jumps directly to a combined NY/NJ/CT county view with the 5
  NYC boroughs visually outlined and a disclosure note explaining the DOHMH-vs-NSSP
  distinction. Typecheck/lint clean; server-rendered HTML confirmed the button renders.
  Interactive/visual browser verification still pending (same deferred item as M2).
- Evidence: `web/lib/nycDohmh.ts`, `web/components/{Dashboard,Choropleth}.tsx`; pipeline
  console output showing 5 NYC DOHMH-sourced counties per disease.

### M5 — Vaccination-coverage layer

- Goal: Deliver AC-5.
- Owner: Claude Code
- Dependencies: M2 (measles map).
- Acceptance criteria: AC-5.
- Status: `IN PROGRESS`
- Completion note: Built two independent MMR coverage series —
  `mmr_coverage_healthmap` (verified exact match to the brief's reference figures: US
  69.0%, MA 79.4%, ME 77.8%, VT 76.9%, CT 76.5%, MN 75.7%, as of 2024-12-31) and CDC
  NIS's "≥1 Dose MMR" (as of 2024-11-30, reading ~97-99% — a real, large discrepancy
  from HealthMap, shown with a source toggle rather than reconciled). Investigated
  WaPo's school/county-level vaccination file (`wapo_vax_counties.parquet`) but found
  its rate values didn't hang together with its own exemption-rate columns (e.g. a
  school showing 1% overall rate and 0% exemptions) — deferred rather than ship a
  possibly-mislabeled county metric; tracked as a future enhancement pending
  clarification. Panel appears directly under the measles map (per the brief's "paired
  visually" request) with the as-of dates prominently flagged as much older than the
  case map. Typecheck/lint clean; dev server confirmed serving without errors.
  Interactive/visual browser verification still pending (same deferred item as M2/M4).
- Evidence: `web/lib/pophive/vaccination.ts`, `web/components/Dashboard.tsx`; pipeline
  console output.

### M6 — Chronic-disease/behavioral-health tab

- Goal: Deliver AC-6.
- Owner: Claude Code
- Dependencies: M1 (pipeline supports claims-based bundles).
- Acceptance criteria: AC-6.
- Status: `IN PROGRESS`
- Completion note: Built a representative slice — diabetes (Epic Cosmos ICD10),
  obesity (Epic Cosmos BMI), and opioid overdose death rate (CDC/NCHS) — as a fully
  separate "Chronic Disease & Behavioral Health" tab with its own indicator selector,
  navigationally distinct from the outbreak tracker (satisfies "does not auto-refresh
  on the same cadence" via being a wholly separate view, not a shared surface). Caught
  a real data-quality issue: `overdose_by_geography_and_source.parquet`'s `value`
  column produced implausible state rates (~120-140 deaths/100k, when real-world
  worst-case is ~40-55); used `overdose_deaths_state.parquet` instead after its numbers
  passed a sanity check against known CDC ranges. The brief's full topic list (cancer
  screenings, cardiovascular/depression/diabetes screening, wellness visits, adult
  vaccination, anxiety, depression, adhd, opioid use disorder, injury/firearm deaths)
  is NOT fully covered — deliberately scoped down to 3 indicators for v1, rest tracked
  in `11-future-enhancements.md`. Typecheck/lint clean; dev server verified.
  Interactive/visual browser verification still pending (same deferred item as
  M2/M4/M5).
- Evidence: `web/lib/pophive/chronic.ts`, `web/components/ChronicDiseasePanel.tsx`;
  pipeline console output.

### M7 — Scheduled rebuild + visual/accessibility pass

- Goal: Deliver AC-9 and consistent, accessible visuals across all surfaces built so far.
- Owner: Claude Code
- Dependencies: M2–M6.
- Acceptance criteria: AC-9; visual style guide checklist passed.
- Status: `NOT STARTED`

### M8 — Test, QA, and close-out

- Goal: Verify every acceptance criterion with evidence; complete `05-tests.md`,
  `06-qa.md`, `07-retro.md`.
- Owner: Claude Code
- Dependencies: M1–M7.
- Acceptance criteria: All ACs in `01-scope.md`.
- Status: `NOT STARTED`

## Prioritized backlog

| ID | User story or task | Value | Priority | Milestone | Owner | Status | Evidence |
|---|---|---|---|---|---|---|---|
| B-001 | As the owner, I want a national choropleth per disease so I can see activity at a glance | High | 1 | M2 | Claude Code | `NOT STARTED` | |
| B-002 | As the owner, I want a status overview strip so I don't have to read the full map to get the gist | High | 1 | M2 | Claude Code | `NOT STARTED` | |
| B-003 | As the owner, I want state→county drill-down so I can see local detail | High | 1 | M2 | Claude Code | `NOT STARTED` | |
| B-004 | As the owner, I want the tri-state/NYC view pinned so I don't have to navigate to it manually | Medium | 2 | M4 | Claude Code | `NOT STARTED` | |
| B-005 | As the owner, I want NYC borough values flagged when they're really HSA-level so I'm not misled | High | 2 | M4 | Claude Code | `NOT STARTED` | |
| B-006 | As the owner, I want vaccination coverage next to the measles map so I can see the coverage/case relationship | Medium | 3 | M5 | Claude Code | `NOT STARTED` | |
| B-007 | As the owner, I want a separate chronic-disease tab so slow-moving data doesn't clutter the outbreak view | Medium | 3 | M6 | Claude Code | `NOT STARTED` | |
| B-008 | As the owner, I want the site to rebuild on a schedule so it's always current without manual work | High | 2 | M7 | Claude Code | `NOT STARTED` | |
| B-009 | As the owner, I want every panel to show its real `as_of` date so I know how fresh it is | High | 1 | M2 | Claude Code | `NOT STARTED` | |

## Risks, issues, and dependencies

| ID | Type | Description | Impact | Owner | Mitigation or action | Status |
|---|---|---|---|---|---|---|
| R-001 | `RISK` | NYC borough data stays HSA-level indefinitely | Medium | Claude Code | Ship disclosed HSA-level view as durable fallback | `OPEN` |
| R-002 | `RISK` | Parquet schema quirks break pure-JS reader | Medium | Claude Code | Validate in M1; fall back to DuckDB if needed | `OPEN` |
| R-003 | `RISK` | PopHIVE source staleness (e.g. HealthMap MMR estimate) misleads if not surfaced | Low-medium | Claude Code | `as_of` date shown per panel by design | `OPEN` |
| D-006/D-007 | `DEPENDENCY` | Framework and parquet-reader choices confirmed (Next.js, DuckDB) | Low | Ben Aheto | Confirmed 2026-07-25 | `CLOSED` |

## Change log

| Date | Change | Reason | Impact | Updated by |
|---|---|---|---|---|
| 2026-07-25 | Initial project plan created | Gate 3 planning after confirmed discovery | Establishes milestone roadmap | Claude Code |
