# Execution Plan

## Approach

Build a Next.js static site deployed on Vercel. A build-time data pipeline fetches the
required PopHIVE parquet bundles directly (no auth), applies the data-quality rules from
`01-scope.md`, and writes static JSON that the site consumes. A Vercel Cron job triggers
a redeploy on a schedule so the site always shows the newest available PopHIVE pull
without implying faster-than-real cadence. Map rendering uses d3-geo + us-atlas
(TopoJSON) for both state and county geometries. Work proceeds milestone by milestone,
national map first, with the NYC-borough research spike sequenced early but decoupled
from the v1 map's release.

Key tradeoff: static + scheduled rebuild is simpler and cheaper than a live backend, and
matches PopHIVE's own Tue/Fri ingest cadence — the cost is that data can be up to
~1 rebuild cycle stale, which is mitigated by always showing the real `as_of` date rather
than implying live data.

## Steps

| # | Step | Deliverable | Verification | Depends on | Status |
|---:|---|---|---|---|---|
| 1 | Scaffold Next.js + Vercel project; verify DuckDB against one real PopHIVE bundle file | Working repo, one bundle successfully parsed to JSON | Manual: inspect parsed output against the bundle's documented columns | — | `COMPLETE` |
| 2 | Build the data pipeline: fetch bundles for flu/COVID/RSV/measles, apply data-quality rules, emit static JSON with `as_of` per dataset | Pipeline script + sample JSON output | Manual: spot-check suppression/FIPS/cadence handling against known rows from the brief's reference data (section 7) | 1 | `NOT STARTED` |
| 3 | Build national choropleth (state level) with disease + signal selectors, ED visits % default | Working map page | Manual: compare rendered values to brief's reference figures (e.g. national status: flu 0.9% of peak, RSV 1.9%, COVID 6.5%, measles 6 states active) | 2 | `NOT STARTED` |
| 4 | Add state → county drill-down | Working drill-down | Manual: click through 2-3 states, verify county values load and FIPS exclusions hold | 3 | `NOT STARTED` |
| 5 | Build status/overview strip (level/trend/% of 2-year peak) | Working overview strip | Manual: cross-check against `get_overview`-equivalent values in a fresh pull | 2 | `NOT STARTED` |
| 6 | NYC DOHMH research spike: determine if true per-borough data exists at a usable cadence for any in-scope disease | Recorded decision in `03-decisions.md` with evidence | Documented findings, no code dependency | — | `NOT STARTED` |
| 7 | Build tri-state/NYC pinned view (HSA-level + disclosure, or blended if step 6 says yes) | Working tri-state/NYC panel | Manual: verify disclosure appears exactly where boroughs share one HSA value, per-metric | 4, 6 | `NOT STARTED` |
| 8 | Build vaccination-coverage layer paired with measles map | Working coverage panel | Manual: verify MMR figures against brief's reference data (e.g. MA 79.4%, ME 77.8%) and stale `as_of` (Dec 2024) is visibly shown | 2 | `NOT STARTED` |
| 9 | Build chronic-disease/behavioral-health tab, separate surface/cadence | Working separate tab | Manual: confirm it does not share the outbreak surface's auto-refresh | 2 | `NOT STARTED` |
| 10 | Wire Vercel Cron → scheduled rebuild | Working scheduled redeploy | Manual: trigger manually once, confirm `as_of` dates update after a real PopHIVE ingest | 1 | `NOT STARTED` |
| 11 | Visual pass against `12-visual-style-guide.md`; accessibility check | Consistent, accessible UI | Manual QA per `06-qa.md` checklist | 3–9 | `NOT STARTED` |
| 12 | Full acceptance-criteria verification and close-out | Completed `05-tests.md`, `06-qa.md`, `07-retro.md` | Evidence per AC in `01-scope.md` | 1–11 | `NOT STARTED` |

## Change surface

- New Next.js application (source code, to live outside `Project Documents/`).
- Vercel project configuration (env vars, cron config, deploy hook).
- No changes to existing systems — this is a new, standalone project.

## Recovery plan

- Static site + JSON pipeline: any bad deploy can be rolled back instantly via Vercel's
  deployment history — no data migrations or destructive operations involved.
- Data pipeline failures fail the build (no partial/silent bad data shipped); the
  previous good deployment stays live until a build succeeds.

## Plan review

- Reviewed by: Ben Aheto
- Date: 2026-07-25
- Concerns: None raised; plan approved via confirmed discovery answers (static+scheduled
  rebuild, d3-geo/us-atlas, ED-visits-% default, NYC spike sequencing).
