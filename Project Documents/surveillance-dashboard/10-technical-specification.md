# Technical Specification

This is the technical source of truth for the delivered build. Update it in the same
milestone as any architectural, interface, data, configuration, or deployment change.

## System purpose and scope

- Purpose: A personal, hosted, self-refreshing dashboard of US public-health
  surveillance data sourced from PopHIVE.
- In scope: See `01-scope.md`.
- Out of scope: See `01-scope.md`.

## Architecture overview

Static site (Next.js — D-006) hosted on Vercel. A build-time data pipeline uses DuckDB
(D-007) to query PopHIVE parquet bundles directly from
`raw.githubusercontent.com/PopHIVE/Ingest` over HTTP, applies data-quality transforms in
SQL/JS, and emits static JSON files consumed by the site's pages/components at build
time. A Vercel Cron job periodically triggers a redeploy (via a deploy hook or a
scheduled build) so the static output refreshes without a live backend.

```text
PopHIVE parquet bundles (raw.githubusercontent.com)
        |
        v
  data pipeline (build-time Node script)
    - fetch bundle files for in-scope topics
    - apply data-quality rules (suppression, is_state_estimate,
      FIPS exclusion, annual-reset handling, cadence/unit separation)
    - compute as_of / data_through per dataset
        |
        v
  static JSON (checked into build output, not the repo)
        |
        v
  Next.js pages/components (map, overview strip, tabs)
        |
        v
  Vercel static hosting
        ^
        |
  Vercel Cron ---> deploy hook ---> triggers rebuild (re-runs pipeline)
```

This is not yet built; described here as the target architecture from `02-plan.md` /
`03-decisions.md`. Update this section with the as-built architecture as milestones
complete.

## Components

| Component | Responsibility | Technology | Inputs | Outputs | Owner |
|---|---|---|---|---|---|
| Data pipeline | Fetch, clean, and transform PopHIVE bundles into static JSON | Node script, DuckDB (D-007) | PopHIVE parquet URLs | Static JSON per dataset | Claude Code |
| Map view | Render choropleth + drill-down | Next.js + d3-geo + us-atlas TopoJSON | Static JSON, TopoJSON | Rendered UI | Claude Code |
| Overview strip | Level/trend/% of 2-year peak per disease | Next.js component | Static JSON | Rendered UI | Claude Code |
| Tri-state/NYC panel | County + borough drill-down, HSA disclosure | Next.js component | Static JSON (+ DOHMH data if M3 approves) | Rendered UI | Claude Code |
| Vaccination layer | Coverage by state/county paired with measles map | Next.js component | Static JSON | Rendered UI | Claude Code |
| Chronic-disease tab | Separate slower-cadence surface | Next.js route/component | Static JSON | Rendered UI | Claude Code |
| Scheduled rebuild | Trigger periodic redeploys | Vercel Cron + deploy hook | Schedule config | Redeploy trigger | Claude Code |

## Folder structure

```text
project/               # Next.js application root (to be created in M1)
  app/                  # App Router pages (map, tri-state, vaccination, chronic-disease tabs)
  components/           # Shared UI components (choropleth, overview cards, panels)
  lib/                  # Data-pipeline scripts, parquet parsing, data-quality transforms
  data/                 # Generated static JSON (build output, not hand-edited)
  public/                # Static assets (TopoJSON, icons)
  vercel.json           # Cron configuration
```

Exact structure to be finalized in M1 and reflected here once scaffolded.

## Code organization

| Module or package | Responsibility | Key interfaces | Dependencies |
|---|---|---|---|
| `lib/pophive/fetch.ts` (proposed) | Download parquet bundles by name | `fetchBundle(bundleName, fileName)` | Pure-JS parquet reader |
| `lib/pophive/transform.ts` (proposed) | Apply data-quality rules | `applyQualityRules(rows, ruleset)` | — |
| `lib/pophive/asOf.ts` (proposed) | Compute per-dataset `as_of`/`data_through` | `getAsOf(dataset)` | — |

To be finalized during M1; this table is a placeholder reflecting the plan, not yet
implemented code.

## APIs and integrations

| API or service | Direction | Purpose | Authentication | Contract or version | Failure handling |
|---|---|---|---|---|---|
| PopHIVE raw parquet (`raw.githubusercontent.com/PopHIVE/Ingest`) | Inbound (fetch) | Source data for all panels | None (public) | Parquet files under `<bundle>/dist/<file>.parquet` | Build fails loudly rather than shipping partial/stale-without-disclosure data |
| PopHIVE MCP server (`https://mcp.pophive.org/mcp`) | Inbound (design-time only) | Used to produce reference figures and the in-chat preview; not part of the production pipeline (D-001) | None documented | MCP tools: `get_overview`, `get_current_status`, `get_trend`, `get_map`, `compare`, `get_coverage`, `get_data` | N/A — not used at runtime |
| Vercel Cron | Inbound (scheduler → deploy hook) | Trigger scheduled rebuilds | Vercel account-scoped | `vercel.json` cron config | Missed rebuilds are visible via stale `as_of` dates on the site |
| NYC DOHMH open data (candidate) | Inbound (fetch, if M3 approves) | True per-borough figures | Likely none (public open data) | Unconfirmed — subject of M3 spike | N/A until M3 resolves |

## Data model and storage

| Entity or store | Purpose | Key fields | Retention | Sensitivity |
|---|---|---|---|---|
| Per-disease/signal dataset (static JSON) | Map + overview rendering | `fips`, `value`, `signal`, `as_of`, `suppressed`, `is_state_estimate` | Regenerated each rebuild; no historical retention beyond what PopHIVE itself keeps | None — public, aggregate, de-identified |
| Vaccination coverage dataset | Coverage layer | `fips`, `vaccine`, `coverage_pct`, `as_of` | Regenerated each rebuild | None |
| Chronic-disease dataset | Chronic-disease tab | `fips`, `indicator`, `value`, `as_of` | Regenerated each rebuild | None |

No PII/PHI: PopHIVE data is public, aggregate, and de-identified per its own governance
(see MCP server instructions).

## Configuration

| Variable or setting | Purpose | Required? | Default | Secret? |
|---|---|---:|---|---:|
| Vercel deploy hook URL | Cron target to trigger rebuild | Yes | — | Yes (store as a Vercel env var, not in this doc) |
| Cron schedule | How often to rebuild | Yes | Daily (per A-003) | No |

Never record actual secret values.

## Dependencies

| Dependency | Version | Purpose | Update or compatibility notes |
|---|---|---|---|
| Next.js | Latest stable at scaffold time | Application framework (D-006) | — |
| d3-geo | Latest stable | Geographic projection math | — |
| us-atlas | Latest stable | US state/county TopoJSON | — |
| DuckDB (Node bindings) | Latest stable | Query PopHIVE parquet directly over HTTP, apply data-quality rules in SQL (D-007) | Validate native binary works in Vercel's build environment in M1 |

## Security and privacy

- Trust boundaries: Build-time fetches from two public, unauthenticated sources
  (PopHIVE parquet, optionally NYC DOHMH open data). No user-submitted data, no auth
  layer (personal, unlisted deployment).
- Authentication and authorization: None — single user, unlisted URL.
- Sensitive data handling: None — all source data is public/aggregate/de-identified.
- Validation and sanitization: Data-quality rules (suppression, FIPS exclusion, cadence
  separation) are the primary "validation" concern here, applied for correctness rather
  than security.
- Logging and audit: Not required for a personal single-user static site.
- Known risks: A failed or partial build could ship stale data; mitigated by failing the
  build loudly (see APIs and integrations) and always showing real `as_of` dates.

## Error handling and observability

- Error strategy: Build-time failures (fetch/parse errors, missing expected columns)
  fail the build rather than shipping partial data.
- Logging: Standard Vercel build logs.
- Metrics: None planned for v1 (personal project, no dashboard-of-the-dashboard).
- Alerts: None planned for v1; staleness is self-evident via the `as_of` date.
- Health checks: None planned for v1.

## Build, test, and deployment

- Local setup: TBD in M1 (Next.js scaffold, package manager choice).
- Build: `next build` (or equivalent) runs the data pipeline as a pre-build step.
- Automated tests: TBD — see `05-tests.md` once populated.
- Manual verification: Compare rendered values against the brief's reference figures
  (section 7) as a sanity check at each milestone.
- Deployment: Vercel, connected to the project's git repo (or CLI deploy); scheduled
  rebuild via Vercel Cron + deploy hook.
- Rollback: Vercel's deployment history allows instant rollback to any prior build.

## Performance, reliability, and accessibility

- Expected load: Single user, low request volume — no scaling concerns.
- Performance requirements: None strict; static generation keeps page loads fast by
  default.
- Availability or recovery expectations: Personal project — best-effort; Vercel's
  platform reliability is sufficient.
- Accessibility requirements: Standard practice per the visual style guide (contrast,
  keyboard nav, focus visibility) — see `12-visual-style-guide.md`.

## Technical limitations and debt

| Item | Impact | Workaround | Tracking reference |
|---|---|---|---|
| NYC boroughs may share one HSA-level NSSP value | Implies less precision than a true per-borough figure | Explicit UI disclosure; DOHMH blend pending M3 | R-001, M3, M4 |
| Static rebuild lags real-time by up to one cycle | Data can be briefly stale relative to a fresh PopHIVE pull | `as_of` date shown per panel | A-003 |
| DuckDB adds a native binary to the Vercel build | Slightly larger/slower build than a pure-JS reader | Expected to work on Vercel's standard Linux build image; revisit if build issues appear | D-007, R-002 |
| `fips` column in NSSP-sourced bundles (flu/covid/rsv ED visits) is a `DOUBLE`, not a zero-padded string (e.g. `1007`, not `"01007"`) | Must reformat before matching TopoJSON county/state IDs, which expect zero-padded FIPS strings | Pipeline pads: 5 digits for county, 2 digits for state, before any geography join | M1 evidence, plan step 2 |
| `is_state_estimate` is a `DOUBLE` (0/1), not a boolean, across all bundles checked so far | Must compare `= 1` rather than truthy-check | Encode explicitly in the pipeline's filter logic | M1 evidence |
| The `flu`/`covid`/`rsv` ED-visit bundles have no `suppressed`/`suppressed_flag` column — only `is_state_estimate` | The brief's suppression rule doesn't apply uniformly to every bundle; must check per-file, not assume the column exists | Pipeline checks for the column's existence before applying suppression filtering | M1 evidence |
| `measles_county.parquet` uses a `geography` string column (e.g. `"00024"`) instead of `fips`, and its format has **not yet been confirmed** to be a standard county FIPS code | Risk of silently mis-joining measles county data to the map if the code scheme differs from NSSP's FIPS | Do not wire measles county data into the map until this is resolved; use `measles_state.parquet` (state names, easy to map) for the measles map layer in M2 first | New open question — add to Q-002 below |
| `measles_state.parquet` uses full state names (e.g. `"Alabama"`) in `geography`, and separates `cdc_measles_cases_nnds_cum` (cumulative, resets each January) from other measles sources by the `source` column | Must not chart cumulative and weekly measles sources together; must handle the January reset per the brief's data-quality rules | Pipeline branches on `source` and treats each as a separate series | M1 evidence, scope data-quality rules |

### Confirmed real bundle files (M1 schema discovery, 2026-07-25)

Verified via DuckDB `DESCRIBE`/`SELECT` against the live GitHub-hosted parquet files
(not assumed from the brief's docs site, which may lag):

- `bundle_respiratory/dist/flu_ed_visits_by_county.parquet` — `source, fips (DOUBLE),
  week_end (DATE), percent_visits_flu (DOUBLE), is_state_estimate (DOUBLE)`
- `bundle_respiratory/dist/covid_ed_visits_by_county.parquet` — same shape,
  `percent_visits_covid`
- `bundle_respiratory/dist/rsv_ed_visits_by_county.parquet` — same shape,
  `percent_visits_rsv`
- `bundle_measles/dist/measles_county.parquet` — `geography (VARCHAR),
  is_state_estimate (DOUBLE), date (DATE), year (INTEGER), week (INTEGER), source
  (VARCHAR), value (DOUBLE)`
- `bundle_measles/dist/measles_state.parquet` — `geography (VARCHAR, state name),
  date (DATE), year (DOUBLE), week (DOUBLE), source (VARCHAR), value (DOUBLE)`

Full file listing for `bundle_respiratory`, `bundle_measles`,
`bundle_childhood_immunizations`, and `bundle_chronic_diseases` was retrieved from the
GitHub contents API (`api.github.com/repos/PopHIVE/Ingest/contents/data/<bundle>/dist`)
to avoid guessing filenames; measles has no ED-visits-style file (it's tracked via case
counts, not NSSP visit %, which matches the brief's description). Childhood-immunization
and chronic-disease file schemas are not yet inspected — planned before M5/M6.

| ID | Type | Statement | Risk | Validation |
|---|---|---|---|---|
| Q-002 | `OPEN QUESTION` | Does `measles_county.parquet`'s `geography` code scheme match standard 5-digit county FIPS? | Medium — wrong assumption would silently mis-map measles county data | Resolve before wiring measles into the county-level map (M2/M4); until then use state-level measles data only |

## Specification change log

| Date | Milestone | Technical change | Related decision |
|---|---|---|---|
| 2026-07-25 | Pre-M1 | Initial target architecture documented (not yet built) | D-001, D-002, D-003, D-004, D-005, D-006, D-007 |
