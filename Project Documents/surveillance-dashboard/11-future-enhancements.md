# Future Enhancements

Use this register for ideas that are valuable but outside the current committed scope.
Reassess it during planning and after every milestone.

## Status values

- `CANDIDATE`
- `DISCOVERY`
- `PLANNED`
- `IN PROGRESS`
- `DELIVERED`
- `DEFERRED`
- `REJECTED`

## Enhancement register

| ID | Enhancement | User value | Priority | Effort | Dependencies | Source | Status | Target |
|---|---|---|---|---|---|---|---|---|
| E-001 | True per-borough NYC data via DOHMH blend | Removes HSA-level imprecision for NYC boroughs | Medium | Medium (pending spike findings) | M3 research spike | Brief section 9; D-004 | `DISCOVERY` | After M3 |
| E-002 | Per-disease default signal customization (instead of one global ED-visits-% default) | Lets the user pick the most clinically meaningful signal per disease (e.g. hospitalizations for severity) | Low | Low | M2 | Brief section 9; D-003 | `CANDIDATE` | Unscheduled |
| E-003 | Cross-source measles cross-check surfaced in UI (JHU tracker vs. CDC weekly count) | Brief notes these two sources can disagree/lag differently; surfacing both builds trust | Medium | Low-medium | M2 | Brief section 7 | `CANDIDATE` | Unscheduled |
| E-004 | Historical trend charts (beyond current "% of 2-year peak") | Richer context than a single snapshot number | Medium | Medium | M2 | Discovery, general dashboard value | `CANDIDATE` | Unscheduled |
| E-005 | Alerting/notification on level change (e.g. a disease crossing to "high") | Would remove the need to check manually | Low (explicitly out of scope for v1 per discovery) | Medium | M2 | Discovery (out-of-scope confirmation) | `CANDIDATE` | Unscheduled |
| E-006 | Wire remaining signals (CDC RespNET, ILINet, Kinsa, Epic Cosmos, Delphi claims) into the state-level signal toggle | More complete "signals disagree" picture beyond the 3 currently wired (NSSP/NWSS/NHSN) | Medium | Low-medium (data already present in `*_overall_trends.parquet`, just needs UI wiring + unit handling) | M2 build | Discovered during M2 build | `CANDIDATE` | Unscheduled |
| E-007 | Lazy-load county JSON per state instead of shipping the full ~1.2MB `counties.json` upfront | Faster initial page load | Low-medium | Low (API route or server action returning one state's slice) | M2 build | Discovered during M2 build | `CANDIDATE` | Unscheduled |
| E-008 | Independently validate a dark-mode-specific sequential color ramp for the choropleth | Currently reuses the light-mode ramp hexes in dark mode, unverified against the dark surface | Low | Low | M2 build | Noted as a known limitation in `12-visual-style-guide.md` | `DELIVERED` | M7 visual pass, 2026-07-26 |
| E-009 | Add measles to the county-level drill-down | `measles_county.parquet`'s `geography` codes turned out to be mostly standard county FIPS (resolves the original Q-002 concern) — feasible via exact-match join against `us-atlas`'s county set, dropping non-matching pseudo-codes | Medium | Low-medium | M2 build (county pipeline pattern already exists) | Discovered during M2 build; see `10-technical-specification.md` schema notes | `CANDIDATE` | Unscheduled |
| E-010 | Keyboard-operable equivalent for map state-click drill-down | Currently mouse/touch-only; the style guide requires a keyboard equivalent for every interactive element | Medium (accessibility gap) | Low-medium (e.g. a focusable state list alongside the map) | M2 build | Style guide accessibility standard, not yet implemented | `DELIVERED` | M7 visual pass, 2026-07-26 |
| E-011 | County-level MMR coverage (`wapo_vax_counties.parquet`) | Brief specifically asks for MMR at county level; would let the vaccination panel drill down like the disease maps do | Medium | Medium (needs clarification first, not just wiring) | M5 build | Discovered during M5: the file's `wapo_county_vax_rate` didn't reconcile with its own sibling file's exemption-rate columns at the school level (e.g. a school reading 1% overall rate but 0% exemptions) — deferred rather than risk a mislabeled metric | `CANDIDATE` | Unscheduled — needs schema clarification (check PopHIVE docs/maintainers or the original WaPo methodology) before building |
| E-012 | Surface additional childhood vaccines beyond MMR (DTaP, polio, HepA/B, varicella, Combined 7 Series — all present in `nis_overall.parquet`'s `vaccine` column) | Brief lists these as in-scope vaccination topics; same pipeline pattern as MMR, just needs a vaccine selector | Low-medium | Low (data already available, same file just different filter value) | M5 build | Brief section 3 topic list | `CANDIDATE` | Unscheduled |

## Enhancement details

### E-001 — True per-borough NYC data via DOHMH blend

- Problem or opportunity: NSSP sometimes reports NYC boroughs at shared HSA-level
  values, which understates precision for a NYC-focused user.
- Proposed outcome: Blend NYC DOHMH's own open data for diseases/cadences it actually
  supports, replacing the HSA-level fallback where possible.
- Users affected: The sole user, specifically for the tri-state/NYC panel.
- Expected value: Medium — improves precision but the HSA-level + disclosure fallback
  already avoids misleading the user.
- Rough effort: Unknown until M3 spike completes; likely medium (new data source,
  reconciliation with PopHIVE's schema/cadence).
- Dependencies: M3 research spike must confirm DOHMH data exists, at what cadence, for
  which diseases.
- Risks: DOHMH data could use different geographic boundaries, suppression rules, or
  update cadence than PopHIVE, requiring its own data-quality handling.
- Success measure: NYC borough values are genuinely borough-specific (not HSA-shared) for
  at least one in-scope disease, with correct `as_of` handling.
- Decision and rationale: Sequenced as a spike-then-maybe-build per D-004, to avoid
  blocking v1 on an unconfirmed data source.
- Related milestone or task: M3, M4.
- Status: `DISCOVERY`

### E-002 — Per-disease default signal customization

- Problem or opportunity: ED visits % is the confirmed default for all diseases (D-003),
  but a different signal (e.g. hospitalizations) may be more clinically meaningful for a
  specific disease.
- Proposed outcome: Allow overriding the default signal per disease, persisted as a
  preference.
- Users affected: The sole user.
- Expected value: Low-medium — nice refinement, not core to trust or correctness.
- Rough effort: Low — mostly a UI/state change once the signal toggle already exists
  from M2.
- Dependencies: M2.
- Risks: None significant.
- Success measure: User can set and have remembered a non-default signal per disease.
- Decision and rationale: Deferred — v1 uses one global default per D-003; revisit if it
  proves annoying in practice.
- Related milestone or task: Unscheduled, candidate for post-M2.
- Status: `CANDIDATE`

## Delivered enhancements

| ID | Delivered | Milestone | Evidence | Follow-up opportunities |
|---|---|---|---|---|
| E-008 | 2026-07-26 | M7 | Separate `SEQUENTIAL_RAMP_LIGHT`/`SEQUENTIAL_RAMP_DARK` in `Choropleth.tsx`, switched via a `prefers-color-scheme` media-query hook; endpoint contrast checked programmatically against `globals.css` dark tokens (low value ~1.0-1.3:1 vs background, matching the intentional "fade" behavior; high value ~12.6:1, clearly legible) — same contrast contract as the light ramp. Full rendered-dark-mode screenshot not captured this session (see status note); recommend a quick manual look under System Settings → Appearance → Dark before final visual sign-off. | None identified |
| E-010 | 2026-07-26 | M7 | `Choropleth.tsx` now renders a labeled "Jump to state" `<select>` (shown whenever `onSelectState` is passed, i.e. wherever click-to-drill-down exists) that calls the same `onSelectState` handler as a map click. Browser-verified: keyboard selection (typeahead "c" + Enter) drilled into the California counties view exactly as a map click would. | None identified |

## Review log

| Date | Reviewed by | Added | Reprioritized | Delivered or closed |
|---|---|---|---|---|
| 2026-07-25 | Claude Code | E-001 through E-005 | — | — |
| 2026-07-26 | Claude Code | E-006 through E-010 (discovered during M2 build) | — | — |
| 2026-07-26 | Claude Code | E-011, E-012 (discovered during M5 build) | — | — |
| 2026-07-26 | Claude Code | — | — | E-008, E-010 (M7 visual/accessibility pass) |
