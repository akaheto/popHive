# Decision Log

Record choices that affect scope, architecture, behavior, risk, or schedule.

### D-001 — Static site with scheduled rebuild, not a live backend

- Date: 2026-07-25
- Status: `ACCEPTED`
- Context: PopHIVE ingests on a Tue/Fri cadence; a live-query backend would add
  operational complexity without a corresponding freshness benefit.
- Options considered: (a) static site, build-time data fetch, scheduled rebuild; (b)
  small server that queries PopHIVE MCP/parquet live on each request.
- Decision: (a) — static site with scheduled rebuild.
- Rationale: User confirmed this directly; matches source cadence; cheapest to run and
  host for a personal, single-user project.
- Consequences: Data can lag by up to one rebuild cycle; mitigated by displaying the true
  `as_of` date on every panel rather than implying live data.
- Approved by: Ben Aheto

### D-002 — d3-geo + us-atlas for map rendering

- Date: 2026-07-25
- Status: `ACCEPTED`
- Context: Brief flagged a choice between d3-geo+us-atlas and Leaflet/Mapbox for
  replacing the chip-based preview with a real geographic projection.
- Options considered: (a) d3-geo + us-atlas TopoJSON; (b) Leaflet/Mapbox tiles.
- Decision: (a) — d3-geo + us-atlas.
- Rationale: No API key or usage limits; fits a static-site build; full control over
  custom HSA-disclosure overlays on the map. User confirmed directly.
- Consequences: No pan/zoom basemap tiles or richer interaction Mapbox would offer; not
  needed for a choropleth-first use case.
- Approved by: Ben Aheto

### D-003 — ED visits % (NSSP) as default signal

- Date: 2026-07-25
- Status: `ACCEPTED`
- Context: Signals disagree by design (ED visits vs. wastewater vs. hospitalizations);
  the map and overview cards need one default value everywhere, with others toggle-able.
- Options considered: (a) ED visits % as default; (b) defer per-disease default choice to
  the build/visual step.
- Decision: (a) — ED visits % (NSSP) as default signal for all four diseases, with a
  toggle for other available signals.
- Rationale: Broadest state+county coverage, most consistent across all four diseases.
  User confirmed directly.
- Consequences: Some diseases may have a more clinically meaningful "primary" signal
  (e.g. hospitalizations for severity) — this is available via toggle, not lost, just not
  the default.
- Approved by: Ben Aheto

### D-004 — NYC borough handling: HSA-level + disclosure now, DOHMH blend as a spiked fast-follow

- Date: 2026-07-25
- Status: `ACCEPTED`
- Context: NSSP sometimes reports NYC boroughs at shared HSA-level values, not true
  per-borough; blending NYC DOHMH's own open data could fix this but its coverage/cadence
  for the in-scope diseases is unconfirmed.
- Options considered: (a) ship HSA-level + explicit disclosure now, research/blend DOHMH
  data as a separate, timeboxed spike milestone; (b) block the entire borough view on
  confirmed per-borough accuracy from the start.
- Decision: (a).
- Rationale: Keeps v1 honest and on schedule; avoids indefinitely blocking a working,
  disclosed view on an unconfirmed data-source spike. User confirmed directly.
- Consequences: V1 ships with HSA-level values + "HSA-level estimate — not
  borough-specific" disclosure for any metric where boroughs share one value; borough
  precision improves later only if the spike (plan step 6) confirms DOHMH data supports
  it.
- Approved by: Ben Aheto

### D-005 — Deployment target: Vercel, private/unlisted, personal use

- Date: 2026-07-25
- Status: `ACCEPTED`
- Context: Personal-use dashboard; user wants access from any device without running a
  local server.
- Options considered: (a) hosted on Vercel, private/unlisted URL; (b) run locally only.
- Decision: (a).
- Rationale: User confirmed directly; enables Vercel Cron for scheduled rebuilds without
  a separate always-on machine.
- Consequences: Requires a Vercel account/project; no auth layer since scope is personal
  use with an unlisted URL, not public distribution.
- Approved by: Ben Aheto

### D-006 — Next.js as the application framework

- Date: 2026-07-25
- Status: `ACCEPTED`
- Context: A framework decision was needed to execute D-001/D-005; initially proposed by
  Claude Code as low-risk, then explicitly confirmed with the user before scaffolding.
- Options considered: (a) Next.js (App Router, static generation) on Vercel; (b) a
  framework-less static site (e.g. Vite) with manually wired Vercel Cron + deploy hook.
- Decision: (a) — Next.js.
- Rationale: First-class Vercel support, good fit for a static-generation + scheduled
  rebuild model, mainstream enough to keep maintenance low. User confirmed directly.
- Consequences: Adds Next.js's conventions/build step vs. a leaner static setup; considered
  an acceptable tradeoff for a project expected to grow multiple tabs/panels.
- Approved by: Ben Aheto

### D-007 — DuckDB (native bindings) for the parquet data pipeline

- Date: 2026-07-25
- Status: `ACCEPTED`
- Context: The brief's own examples use `pandas.read_parquet`, but the build pipeline
  runs in a Node/Vercel build environment, not Python. Claude Code initially proposed a
  pure-JS reader (e.g. hyparquet) to avoid a native build step, with DuckDB as fallback;
  the user chose DuckDB from the start instead.
- Options considered: (a) pure-JS parquet reader (no native compilation, portable on
  Vercel's build machines, more limited SQL-side filtering); (b) DuckDB Node bindings
  (native binary, full SQL-side filtering/joins over parquet, including reading directly
  from HTTP URLs); (c) a separate Python build step.
- Decision: (b) — DuckDB from the start.
- Rationale: More powerful SQL-side filtering and joins (useful for applying
  suppression/FIPS/cadence rules and any future NYC DOHMH join) outweighs the added
  native-dependency build cost for this project. User confirmed directly.
- Consequences: Vercel build must support DuckDB's native binary (Linux x64 — standard
  Vercel build environment, expected to work without extra configuration); validate this
  in M1 alongside the parquet schema check.
- Approved by: Ben Aheto

## Deviations

| Date | Planned | Actual | Reason | Impact | Approved by |
|---|---|---|---|---|---|
| | | | | | |
