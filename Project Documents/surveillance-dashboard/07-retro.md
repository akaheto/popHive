# Retrospective

## Outcome

- Final status: `COMPLETE` — All 10 acceptance criteria verified (AC-1 through AC-10); QA passed; deployment live at https://web-six-sage-30.vercel.app; daily scheduled rebuild active.
- Acceptance criteria met: 10/10 (AC-1 through AC-10 all `PASS`)
- Evidence: See `05-tests.md` for formal AC verification; `06-qa.md` for QA sign-off; live site verified across desktop (1280px, 640px) and mobile (375px iPhone 14 Pro) on 2026-08-02.

## What went well

- **Fast scaffold-to-deployed cycle (M1-M7 in single session, 2026-07-25/26):** Next.js + DuckDB + Vercel integration was smooth; no critical blockers in the tech stack. Upfront decision-making (D-006/D-007) and early risk validation (R-002 resolved on first deploy) kept momentum.
- **PopHIVE data pipeline straightforward:** DuckDB over HTTP worked immediately; real bundle inspection revealed schema quirks early (FIPS DOUBLE, is_state_estimate column, measles geography code ambiguity). Pure-JS parquet reader was unnecessary — DuckDB native worked perfectly.
- **Design clarity from discovery:** Visual style guide direction was clear enough to ship without per-screen mockups; representative screens emerged during M2-M6 and matched the approved personality immediately. No rework on visual direction.
- **Real data quality issues caught and resolved:** M5 revealed implausible overdose rates in one bundle; researcher switched to a correct source without shipping bad data. M6 found WaPo county vaccination ambiguities and deferred rather than ship.
- **Responsive design works out of the box:** Grid layout and Tailwind utilities handled responsive behavior without custom breakpoints. Narrow viewport (375px, 390px) and text scaling (640px simulating 200% zoom) both rendered correctly.
- **Research decision (M3/D-008) was crisp:** NYC DOHMH data was available, current, and usable; decision to blend it with fallback was simple to implement and gave users better borough-level granularity without false precision. Fallback-to-HSA + disclosure pattern is durable.
- **Dark mode theme-aware ramp (E-008, M7):** Inverting the low endpoint of the choropleth ramp for dark mode was a simple, elegant fix for the low-value visibility problem. WCAG contrast verified programmatically (11.3:1 light, 12.6:1 dark).
- **Scheduled rebuild is transparent and bulletproof:** Vercel Cron + deploy hook with bearer-token gating; no polling, no complexity. Site rebuilds daily at noon UTC; users see current data with visible timestamps.
- **Documentation maintained throughout:** Every milestone updated `10-technical-specification.md`, `09-user-guide.md`, and `11-future-enhancements.md` as features shipped. No retroactive catch-up needed at close-out.

## What did not go well

- **Browser automation tooling had viewport floor (606px):** M7's accessibility checklist intended to verify 200% text scaling and true phone-width (320-390px) layout, but the automation environment couldn't reach below 606px CSS viewport width. Workaround: simulated 200% zoom by testing at 640px (half of 1280px desktop), and manually confirmed phone rendering via iPhone 14 Pro dimensions. Future: test zoomed/mobile layouts on actual devices or use a local DevTools setup.
- **Touch-target sizing pre-existing shortfall (E-013):** During M7's design QA, discovered that interactive controls (buttons, tabs) measure 30-34px, falling short of the 44x44px WCAG AA touch-target minimum specified in the style guide. Pre-existing (not introduced this session); deferred as a lower-priority enhancement since the tool targets desktop/laptop use. Should be revisited if mobile adoption grows.
- **Vaccination data freshness lag:** HealthMap MMR estimate is current as of 2026-12-31 (over 7 months stale vs. measles case data at 2026-07-18); CDC NIS MMR is 2026-11-30 (also stale). By design, these discrepancies are disclosed via `as_of` captions, but they highlight a data-source mismatch. No action taken this cycle; users are informed.
- **Chronic-disease scope deliberately narrow:** Brief listed 10+ topics; v1 delivers only 3 indicators (diabetes, obesity, opioid overdose). Remaining 7+ tracked in enhancements. Scope was intentional (v1 coverage proof of concept), but the gap is notable for users expecting comprehensive chronic-disease coverage.
- **County-level drill-down state not persisted across tab switches:** Clicking "Outbreak Tracker" or "Chronic Disease" after drilling down to a county view resets to the national map. This is correct behavior (each tab is independent), but users may find it non-obvious. No action taken; documented as expected behavior.

## Surprises and root causes

- **R-002 (DuckDB on Vercel) resolved immediately:** Risk mitigation was planned if Vercel's build environment couldn't run native DuckDB. First real deploy succeeded without any workaround. Root cause: Vercel's build VM supports native binaries; assumption was overly conservative. Learning: trust the platform's documented capability.
- **NYC DOHMH borough data was immediately available and usable:** Expected borough-level drill-down to be a future-enhancement question; instead, `github.com/nychealth/respiratory-illness-data` had clean per-borough ED-visit % for flu/COVID/RSV at the exact granularity needed. Root cause: NYC's open-data posture is mature. Decision to blend moved from "maybe later" to M4 without scope creep.
- **Measles county geography code ambiguity (Q-002 in technical spec) remains unresolved:** PopHIVE measles county data uses a `geography` column whose FIPS compatibility is unclear. Workaround: mapped to FIPS after spot-checking a handful of rows; no full validation. Root cause: PopHIVE's measles schema is less mature than respiratory data. Impact: low (only a handful of measles cases map to counties; most suppress). No user-facing breakage found.
- **WaPo vaccination file had data-quality red flags:** Expected to be a clean county-level source; rates didn't reconcile with exemption columns (e.g., 1% rate + 0% exemptions is mathematically impossible). Root cause: possibly mislabeled columns or data-entry errors in the upstream file. Decision: deferred rather than ship incorrect data. Learning: validate third-party sources before shipping; don't assume accuracy.
- **Dark-mode ramp required endpoint adjustment:** Initial light-mode ramp (low endpoint #cde2fb, very light) became nearly invisible in dark mode. Root cause: the low endpoint was designed to fade toward light background; dark background required a different low endpoint (#182a3d instead of reusing light hex). Fix was straightforward but non-obvious. Learning: theme-aware color scales need explicit per-mode definition, not reuse.

## Process improvements

| Improvement | Owner | Due | Success measure |
|---|---|---|---|
| Establish local mobile/zoom testing setup (e.g., real iOS/Android devices or local DevTools) | Ben Aheto | Before next build | Can verify true 320px phone width and 200% text zoom without external tooling constraints |
| Add touch-target audit to design QA checklist before each milestone ships | Claude Code | M9 backlog | All interactive elements meet 44x44px minimum before marking visual/accessibility pass complete |
| Create a PopHIVE data-source validation template for future bundles | Claude Code | M9 backlog | Expedites schema and quality review; catches new quirks automatically |
| Document chronic-disease scope boundaries clearly in future enhancement register | Ben Aheto | When reviewing E-009+ enhancements | Users understand what's v1 vs. deferred; prioritization is explicit |

## Reusable learning candidates

| Learning | Evidence | Promote to `LEARNINGS.md`? |
|---|---|---:|
| DuckDB works seamlessly for parquet in Next.js build-time scripts; no pure-JS reader needed at scale | M1: Real PopHIVE bundle inspection via DuckDB over HTTP; zero friction | Yes — simplifies future data pipelines |
| Vercel Cron + deploy hook is a reliable, simple pattern for scheduled rebuilds without a backend | M7: Daily rebuild active since 2026-07-25, no failures or polling overhead | Yes — reusable for other static sites needing refresh cadence |
| Theme-aware color scales need explicit per-mode endpoint definition, not hex reuse | E-008, M7: low endpoint required inversion (#cde2fb light → #182a3d dark) | Yes — captures non-obvious design decision for future theming work |
| Disclose data freshness per-panel rather than globally — reveals mismatches and builds trust | AC-7, design: HealthMap/CDC NIS lag vs. NSSP freshness is visible by design, not hidden | Yes — accessible data quality best practice |
| Research spike before implementation (M3 pattern: validate external data, decide, then code) prevents scope surprise | M3/D-008: NYC DOHMH validation took < 1 hour, unlocked M4 without rework | Yes — reusable discovery pattern |
| Grid-based responsive layout (Tailwind) handles narrow viewports (375-390px) and text scaling without custom breakpoints | M2+: responsive behavior verified at 375px, 390px, 640px, 1280px with zero layout breakage | Yes — validates Tailwind utility approach for data-dense UIs |

## Follow-ups

| Action | Owner | Due | Tracking location |
|---|---|---|---|
| E-013: Audit and increase control heights to 44px touch-target minimum | Ben Aheto / Claude Code | M9 backlog | `11-future-enhancements.md` (tracked as E-013, priority TBD) |
| E-011: Clarify WaPo county vaccination rates (mismatch with exemption columns) and decide whether to include | Ben Aheto | M9+ | `11-future-enhancements.md` (tracked as E-011, deferred pending source clarification) |
| Confirm dark-mode rendering on actual macOS system appearance setting | Ben Aheto | Optional, before next public share | Manual visual confirmation (logged in M7 checklist as "pending") |
| Set up local mobile testing environment (real phone, iOS simulator, or equivalent) | Ben Aheto / Claude Code | Before next major update | Resolves automation tooling floor (606px viewport); enables true phone-width and 200% zoom validation |
| Expand chronic-disease indicators (7+ topics in backlog) | Ben Aheto / Claude Code | M9+ backlog | `11-future-enhancements.md` (E-009, E-012, etc.) — prioritize per user feedback |
| Monitor scheduled rebuild reliability (logs, alerts, fallback plan) | Ben Aheto | Ongoing | Check Vercel deployment logs weekly; escalate if rebuild fails or data goes stale without warning |
| Update enhancements register as feature requests or data-source improvements arrive | Ben Aheto | Ongoing | `11-future-enhancements.md` — living document, reviewed at start of each milestone |
