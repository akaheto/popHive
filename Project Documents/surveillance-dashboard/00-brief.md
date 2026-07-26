# Task Brief

- Task ID: surveillance-dashboard
- Owner: Ben Aheto
- Requester: Ben Aheto
- Created: 2026-07-25
- Status: `IN PROGRESS`
- Confirmed discovery interview: `00-discovery-interview.md` (CONFIRMED, 2026-07-25)

## Desired outcome

A personal, hosted, self-refreshing dashboard of current US disease activity (flu,
COVID-19, RSV, measles) with a real geographic choropleth and state → county drill-down,
a tri-state (NY/NJ/CT) + NYC borough pinned view, a vaccination-coverage layer, and a
separate slower-cadence chronic-disease/behavioral-health tab — all sourced from
PopHIVE, with honest recency and precision disclosures on every panel.

This matches the confirmed goal in `00-discovery-interview.md`.

## User or business value

Replaces manually checking scattered public-health sources with one trustworthy,
at-a-glance view. The core value is *trust*: correct handling of suppression, cadence,
units, and geographic precision matters more than visual polish or feature count.

## Context

User supplied a detailed build brief (data source, feature spec, data-quality rules, and
reference figures) ahead of discovery — reproduced in relevant sections below and in the
technical specification. Key background:

- Data source: PopHIVE (Yale School of Public Health), harmonizing CDC NSSP, NWSS, NHSN,
  RespNET, ILINet, RSV-NET, JHU/CDC measles trackers, Epic Cosmos, Medicare/Medicaid
  claims, and Google Health Trends. DOI 10.5281/zenodo.17345935. Public site
  https://www.pophive.org.
- Raw parquet, no auth: `https://raw.githubusercontent.com/PopHIVE/Ingest/main/data/
  <bundle>/dist/<file>.parquet`. Column docs (may lag data): https://pophive.github.io/Ingest/.
- MCP server also available at `https://mcp.pophive.org/mcp` (tools: `get_overview`,
  `get_current_status`, `get_trend`, `get_map`, `compare`, `get_coverage`, `get_data`) —
  used to produce the in-chat preview mockup; not used for the production build (see
  `03-decisions.md` D-001).
- An in-chat preview used region-grouped chips as a fast stand-in for a real map; this
  project replaces that with an actual geographic projection.
- A known, confirmed-live data-precision issue: NYC boroughs sometimes share one
  HSA-level NSSP value rather than true per-borough figures.

## Constraints

- Time: No deadline; iterate in milestones.
- Technical: Personal use, hosted on Vercel, static site + scheduled rebuild (not a live
  backend). Map via d3-geo + us-atlas (no API key). No PII/PHI — all PopHIVE data is
  public and aggregate.
- Policy or compliance: None beyond not misrepresenting data precision or recency.
- Compatibility: None stated.

## Inputs and dependencies

| Item | Source or owner | Available? | Notes |
|---|---|---:|---|
| PopHIVE parquet bundles | raw.githubusercontent.com/PopHIVE/Ingest | Yes, no auth | Ground truth; docs site may lag |
| PopHIVE MCP server | https://mcp.pophive.org/mcp | Yes | Used for design-time queries/reference figures, not the production data pipeline |
| d3-geo + us-atlas TopoJSON | npm | Yes, no auth | State/county boundaries |
| Vercel hosting + Cron | Vercel account (user's) | Assumed yes | Needed for scheduled rebuild |
| NYC DOHMH open data (borough-level) | NYC Open Data / DOHMH | Unconfirmed | Subject of the borough-blend research spike |

## Open questions

| Question | Owner | Blocking? | Resolution |
|---|---|---:|---|
| Does NYC DOHMH open data provide true per-borough flu/COVID/RSV/measles figures at a usable cadence? | Research spike milestone | No (only blocks the borough-blend milestone, not v1) | Pending |
| Does a pure-JS parquet reader handle all PopHIVE bundle files without native build dependencies? | Build milestone M1 | No (fallback to DuckDB/native reader if needed) | Pending |
