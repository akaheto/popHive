# Discovery Interview

## Interview record

- Project: Public health surveillance dashboard (PopHIVE-sourced)
- Interviewer: Claude Code
- Participants and roles: Ben Aheto (owner, sole user)
- Date: 2026-07-25
- Status: `CONFIRMED`

## 1. Goal and motivation

- What should this project accomplish? A self-refreshing personal dashboard showing
  current US disease activity (flu, COVID-19, RSV, measles) with state → county
  drill-down, a tri-state (NY/NJ/CT) + NYC borough pinned view, a vaccination-coverage
  layer, and a separate chronic-disease/behavioral-health tab — all sourced from PopHIVE.
- What problem or opportunity prompted it? User wants an at-a-glance, trustworthy view of
  public health surveillance data instead of checking pophive.org or CDC dashboards
  separately. A region-grouped-chip mockup was previewed in-chat; this project replaces
  it with a real build using an actual geographic projection.
- Why does it matter now? No external deadline — this is a personal project the user
  wants to iterate on.
- What would happen if nothing changed? User would keep manually checking scattered
  sources with no single current-status view.

### Notes

- Full feature/data spec supplied by the user as a written build brief (reproduced in
  `00-brief.md` context section) — most discovery ground was pre-answered there. This
  interview focused on resolving the brief's explicitly flagged open decisions plus
  standard Gate-0 items (audience, deployment, timeline, visual direction).

## 2. Users and context

- Who are the primary and secondary users? Sole user: the project owner. Personal use
  only, not shared or public-facing.
- What are they trying to accomplish? Quickly check current disease activity levels and
  trends, trust the recency/precision of what's shown, and compare vaccination coverage
  against active measles activity.
- Where, when, and on what devices will they use the output? Web, ad hoc, any device —
  hosted so it's reachable without a local server running.
- What knowledge, permissions, or accessibility needs do they have? Comfortable reading
  epidemiological data (ED visit %, wastewater levels, hospitalization rates); no special
  accessibility requirements stated, but standard accessibility practice still applies
  per the project's operating contract.

### Notes

- Since this is single-user and not shared, no auth/access-control layer is required for
  v1.

## 3. Workflows and outcomes

- What are the most important user journeys?
  1. Open the dashboard → see the national status overview strip (level/trend/% of
     2-year peak per disease) at a glance.
  2. Select a disease → view choropleth → drill into a state → county.
  3. Check the tri-state/NYC pinned view specifically.
  4. Check vaccination coverage next to the measles map.
  5. Separately, check the chronic-disease/behavioral-health tab (different cadence).
- What inputs are available and what outputs are expected? Inputs: PopHIVE parquet
  bundles (raw.githubusercontent.com/PopHIVE/Ingest) and/or PopHIVE MCP tools. Output: a
  hosted, browsable dashboard site.
- What does a successful first release enable? National map + overview strip working
  end-to-end with real drill-down and honest recency/precision disclosures — the rest
  (tri-state/NYC, vaccination layer, chronic-disease tab) can follow in later milestones.
- What outcomes would make the project unsuccessful? Showing false precision (e.g.
  implying true per-borough NYC data when it's HSA-level), hiding staleness, or mixing
  incompatible cadences/units in one calculation (see data-quality rules in the brief).

### Notes

- 

## 4. Priorities and scope boundaries

- What is essential, desirable, and optional?
  - Essential: national choropleth with real geographic projection, disease + signal
    selectors, overview strip, per-panel `as_of` dates, data-quality rules encoded
    (suppression flags, `is_state_estimate` exclusion, FIPS `990`/`00`/`US` exclusion,
    no cross-cadence/unit mixing).
  - Desirable: tri-state/NYC drill-down, vaccination-coverage layer.
  - Optional / fast-follow: chronic-disease/behavioral-health tab; true per-borough NYC
    data (contingent on a research spike, see below).
- What must not be changed or included? No implied precision beyond what the source
  data supports; no mixing of weekly/monthly/annual data in one chart.
- Which tradeoffs favor speed, quality, cost, flexibility, or simplicity? Personal,
  no-deadline project — favor simplicity and honesty over completeness or polish. Static
  site + scheduled rebuild over a live backend, since PopHIVE itself only ingests
  Tue/Fri.
- Is there a deadline or milestone that drives the work? No. Iterate in milestones.

### Notes

- 

## 5. Environment and constraints

- What existing tools, systems, data, APIs, or processes are involved? PopHIVE parquet
  bundles (no auth) and/or the PopHIVE MCP server; Vercel for hosting; d3-geo + us-atlas
  for map rendering (chosen over Leaflet/Mapbox to avoid an API-key dependency and fit a
  static-site build).
- What technical, legal, security, privacy, brand, or budget constraints apply? None
  stated beyond "personal use, keep it simple." No PII/PHI involved — PopHIVE data is
  public, aggregate, de-identified.
- Who makes decisions and who approves the result? The user (sole stakeholder).
- What dependencies or known risks exist?
  - PopHIVE cadence (Tue/Fri ingest; NSSP/NWSS most-recent-1–2-weeks preliminary; claims
    data monthly-to-annual; some sources go stale for long stretches).
  - NYC NSSP data is HSA-level, not true per-borough, for at least some metrics (confirmed
    live: all 5 boroughs identical flu % in the Jul 18 2026 test pull).
  - Whether NYC DOHMH's own open data portal has true per-borough flu/COVID/RSV/measles
    data at a usable cadence is **not yet confirmed** — flagged as a research spike
    before committing to blending it.

### Notes

- 

## 6. Visual direction

- What should the product feel like to users? Clean, clinical/dashboard aesthetic —
  dense, data-first, muted neutral palette with clear semantic color for severity
  (minimal/low/moderate/high), closer to a CDC/public-health reporting tool than a
  consumer news graphic.
- Are there existing brand standards or products to align with? None specified; treat
  pophive.org and typical CDC surveillance dashboards as loose reference points.
- Which examples should influence the design, and what specifically works? The in-chat
  region-grouped-chip preview was explicitly a fast stand-in, not a design reference —
  the real build must use an actual geographic projection.
- Which visual or interaction patterns should be avoided? Anything implying false
  precision (e.g., 5 visually distinct boroughs shaded differently when the underlying
  value is identical/HSA-level) without a visible caveat.
- What accessibility and device requirements are mandatory? Standard accessibility
  practice per the project's operating contract (contrast, keyboard nav, focus
  visibility) — no additional requirements stated.

### Notes

- 

## 7. Success and validation

- How will success be measured? The user checks the dashboard and trusts what it shows —
  correct data-quality handling, visible recency, honest precision claims — more than
  visual polish.
- Which acceptance signals matter most? National map + overview strip render real data
  correctly with correct `as_of` dates; data-quality rules (suppression, FIPS exclusion,
  cadence separation) are verifiably applied, not just described.
- Who will test or review the result? The user, informally, milestone by milestone.
- What evidence is required before release? Each milestone's acceptance criteria checked
  against real PopHIVE data pulls (see `05-tests.md` once populated).

### Notes

- 

## Facts, assumptions, and unknowns

| ID | Type | Statement | Source or owner | Risk | Validation |
|---|---|---|---|---|---|
| F-001 | `FACT` | PopHIVE ingests Tue/Fri; underlying feeds range weekly (NSSP/NWSS, most recent 1–2 weeks preliminary) to monthly/annual (claims-based). | User-supplied brief | — | — |
| F-002 | `FACT` | NYC NSSP flu % returned identical HSA-level values for all 5 boroughs in a live test pull (Jul 18 2026: all 0.04%). | User-supplied brief, confirmed live | — | — |
| F-003 | `FACT` | Raw parquet is available with no auth at `raw.githubusercontent.com/PopHIVE/Ingest/main/data/<bundle>/dist/<file>.parquet`. | User-supplied brief | — | — |
| A-001 | `ASSUMPTION` | NYC DOHMH's open data portal has true per-borough data for at least some of flu/COVID/RSV/measles at a usable cadence. | Claude proposal | Medium — if false, borough view stays HSA-level indefinitely | Research spike milestone before committing to blending |
| A-002 | `ASSUMPTION` | A pure-JS parquet reader (no native build step) is sufficient to read PopHIVE's parquet files at Vercel build time, avoiding a Python/pandas build dependency. | Claude proposal | Low-medium — may need to fall back to a native/DuckDB reader if schema features aren't supported | Validate against one real bundle file early in M1 |
| A-003 | `ASSUMPTION` | Daily scheduled rebuild (rather than matching PopHIVE's exact Tue/Fri cadence) is an acceptable simplification. | Claude proposal, aligned with brief's "poll daily or on a schedule" recommendation | Low | Confirmed via discovery answers (static + scheduled rebuild, no objection to daily) |
| Q-001 | `OPEN QUESTION` | Which specific disease/signal combinations does NYC DOHMH publish at true per-borough granularity, if any? | Owner: research spike milestone | Blocking for borough-blend milestone only, not for v1 | Resolve during the DOHMH spike milestone |

## Interpreted project brief

### Goal

Build a personal, static-site public-health surveillance dashboard, hosted on Vercel with
a scheduled rebuild, sourced from PopHIVE. It shows current US disease activity (flu,
COVID-19, RSV, measles) via a real geographic choropleth with state → county drill-down,
a status overview strip, a tri-state/NYC pinned view (HSA-level with explicit disclosure
for now), a vaccination-coverage layer paired with the measles map, and a separate
slower-cadence chronic-disease/behavioral-health tab. Every panel shows its data's
`as_of` date. Visual style is clean, clinical, dashboard-like.

### First-release outcome

- National choropleth (d3-geo + us-atlas) for flu/COVID/RSV/measles, ED-visits % as the
  default signal with a toggle for other signals, state → county drill-down.
- Status overview strip (level/trend/% of 2-year peak per disease).
- Data-quality rules encoded (suppression flags, `is_state_estimate` exclusion, FIPS
  `990`/`00`/`US` exclusion, cadence/unit separation).
- Per-panel `as_of` / `data_through` display.

### Priorities

1. Honesty and correctness of what's shown (recency, precision, data-quality rules) over
   visual polish or feature breadth.
2. National map + overview strip first; tri-state/NYC, vaccination layer, and
   chronic-disease tab as subsequent milestones.
3. Simplicity: static build + scheduled rebuild over a live backend.

### Constraints and exclusions

- Personal use only — no auth/access-control layer, no multi-user concerns.
- No external deadline.
- Must not imply false precision (notably: NYC boroughs must be visibly flagged as
  HSA-level, not true per-borough, until/unless the DOHMH spike changes that).
- Must not mix cadences or units in a single calculation or chart.

### Proposed assumptions requiring acceptance

- A-001, A-002, A-003 above — all accepted implicitly via the confirmed discovery
  answers; A-001 specifically gated behind its own spike milestone before any borough
  data is blended.

## User confirmation

- Confirmation status: `CONFIRMED`
- Confirmed by: Ben Aheto
- Date: 2026-07-25
- Changes requested: None — confirmed as summarized, including task ID
  `surveillance-dashboard`.
- Evidence or reference: Confirmed via in-conversation goal-summary question, all
  options selected as presented (see `03-decisions.md` for the individual architecture
  decisions this interview resolved).
