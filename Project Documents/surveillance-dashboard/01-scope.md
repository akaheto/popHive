# Scope

## In scope

- National choropleth (US states) for flu, COVID-19, RSV, measles, built with d3-geo +
  us-atlas TopoJSON (state and county levels).
- Disease selector and signal selector (ED visits %, wastewater activity, hospital
  admissions, lab-confirmed hospitalizations, outpatient ILI %, Google search trends,
  where available per disease); ED visits % (NSSP) is the default signal.
- State → county drill-down on click.
- Status/overview strip: current level (minimal/low/moderate/high), trend direction
  (rising/stable/declining), % of 2-year peak, per disease.
- Tri-state (NY/NJ/CT) + NYC 5-borough pinned drill-down view, using PopHIVE's
  NSSP county/HSA-level data, with a visible "HSA-level estimate — not
  borough-specific" disclosure wherever boroughs share one HSA value. Checked
  per-metric, not assumed universal.
- Vaccination-coverage layer (MMR at minimum; other childhood vaccines where available)
  at state level (county level for MMR), shown paired with the measles map.
- Chronic-disease/behavioral-health tab, separate from the daily/weekly outbreak
  surface, sourced from the same PopHIVE claims-based bundles.
- Every panel displays its data's `as_of` / `data_through` date; a global "data current
  as of" banner reflecting the least-fresh layer in view.
- Data-quality rules encoded in the data pipeline, not just described:
  - Exclude/handle rows where `suppressed`/`suppressed_flag` is set (not treated as 0).
  - Exclude `is_state_estimate` rows from county-level views.
  - Handle annual resets (e.g., NNDSS cumulative counts resetting each January) without
    diffing/averaging across the reset.
  - Never mix cadences (weekly/monthly/annual) or units (%, activity level, rate per
    100k) within one calculation or chart.
  - Exclude county FIPS codes ending in `990` (masked/non-real) and `"00"`/`"US"`
    (national aggregates) from county-level work.
- Static site, hosted on Vercel, rebuilt on a schedule (Vercel Cron → deploy hook or
  equivalent) rather than served by a live backend.
- Research spike: assess whether NYC DOHMH's own open data supports true per-borough
  figures for the diseases in scope, at a usable cadence — output is a decision (blend
  it, or keep HSA-level with disclosure), not a shipped feature by itself.

## Out of scope (for this task)

- Multi-user access, authentication, or sharing/permissions — personal use only.
- A live backend that polls PopHIVE on request (rejected in favor of static + scheduled
  rebuild; see `03-decisions.md` D-001).
- Leaflet/Mapbox-based mapping (rejected in favor of d3-geo + us-atlas; see D-002).
- Blending NYC DOHMH borough data before the research spike confirms it's viable —
  tracked as a follow-on milestone/enhancement, not committed scope yet.
- Any geography beyond the US (PopHIVE's own coverage boundary).
- Alerting, notifications, or user accounts.

## Deliverables

- A deployed Vercel site showing the in-scope features above.
- A data pipeline (build-time script) that fetches PopHIVE parquet bundles, applies the
  data-quality rules, and emits static JSON consumed by the site.
- A scheduled rebuild mechanism (Vercel Cron + deploy hook, or equivalent).
- Updated living documentation (`09-user-guide.md`, `10-technical-specification.md`,
  `11-future-enhancements.md`, `12-visual-style-guide.md`) reflecting delivered behavior.

## Acceptance criteria

- [ ] AC-1: National map renders a true geographic choropleth (not chips) for all four
      diseases, with a working disease selector and signal selector, ED visits % as
      default.
- [ ] AC-2: Clicking a state drills down to its counties for the selected disease/signal.
- [ ] AC-3: Overview strip shows level/trend/% of 2-year peak per disease, matching a
      real PopHIVE pull at build time.
- [ ] AC-4: Tri-state/NYC pinned view renders county-level data for NY/NJ/CT and
      borough-level rows for NYC; any HSA-shared-value case is visibly disclosed rather
      than shown as if borough-specific.
- [ ] AC-5: Vaccination-coverage layer displays MMR coverage state-level (and county-level
      where available) alongside the measles map view.
- [ ] AC-6: Chronic-disease/behavioral-health tab is visually and navigationally separate
      from the outbreak-tracking surface and does not auto-refresh on the same cadence.
- [ ] AC-7: Every panel shows an `as_of`/`data_through` date sourced from the actual data,
      not a hardcoded placeholder.
- [ ] AC-8: Data pipeline demonstrably applies each data-quality rule (suppression
      handling, `is_state_estimate` exclusion, annual-reset handling, cadence/unit
      separation, FIPS `990`/`00`/`US` exclusion) — verified against real bundle files,
      not just implemented in the abstract.
- [ ] AC-9: Site is deployed on Vercel and rebuilds on a schedule without manual
      intervention.
- [ ] AC-10: NYC DOHMH research spike produces a recorded decision (blend or defer) with
      evidence, before any borough-blend code is written.

## Assumptions

| Assumption | Confidence | Validation method | Result |
|---|---|---|---|
| A-001: NYC DOHMH open data has true per-borough figures for at least one in-scope disease at a usable cadence | Medium | Research spike milestone | Pending |
| A-002: A pure-JS parquet reader is sufficient at Vercel build time without native build steps | Medium-high | Validate against one real bundle file in M1 | Pending |
| A-003: Daily scheduled rebuild is an acceptable simplification vs. matching PopHIVE's exact Tue/Fri cadence | High | Confirmed in discovery interview | Accepted |

Carried forward from `00-discovery-interview.md`; no new material assumption introduced
beyond what's listed there.

## Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|
| NYC borough data stays HSA-level indefinitely (DOHMH spike comes back negative) | Medium | Medium — user still gets an honest, disclosed view, just not true per-borough | Ship HSA-level + disclosure as the durable fallback, not a placeholder | Owner |
| Parquet schema quirks (e.g. nested types, dictionary encoding) break the pure-JS reader | Low-medium | Medium — delays M1 | Fall back to DuckDB (native) or a small server-side conversion step if needed | Owner |
| PopHIVE source goes stale for a bundle (e.g. HealthMap MMR estimate last updated Dec 2024) | Confirmed to occur | Low-medium — misleading if not surfaced | `as_of` date shown per panel makes staleness visible by design | Owner |
| Vercel Cron/deploy-hook rebuild silently fails | Low | Medium — site goes stale without visible warning | Surface the true `as_of` date (already planned) so staleness is self-evident even if the cause isn't | Owner |

## Scope approval

- Approved by: Ben Aheto
- Date: 2026-07-25
- Notes: Approved via confirmed discovery interview; scope reflects the confirmed
  interpreted goal with no requested changes.
