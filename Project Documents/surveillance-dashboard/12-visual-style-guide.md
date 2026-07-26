# Visual Style Guide

This is the source of truth for the product's visual and interaction design. Later
contributors and models must extend these standards instead of replacing them with
personal preferences.

## Governance

- Design owner: Ben Aheto
- Approved by: Ben Aheto
- Initial approval date: 2026-07-25
- Last updated: 2026-07-25
- Applies to: The surveillance-dashboard Next.js site (all tabs/panels).
- Reference implementation or screens: None yet — no screens built. This is the initial
  direction from discovery; representative screens will be added as milestones ship.

Changes require a recorded decision, rationale, affected surfaces, and review.

## Product personality

### Experience principles

1. Honest over polished — never imply more precision or freshness than the data
   supports.
2. Data-first density — favor information clarity over decorative whitespace.
3. Calm, not alarmist — severity color coding should inform, not create false urgency.
4. Scannable at a glance — the overview strip and map should communicate the gist
   without requiring drill-down.

### Desired user impression

- The product should feel: clinical, precise, trustworthy, quietly authoritative — like
  a public-health reporting tool.
- The product should not feel: like a consumer news graphic, gamified, or alarmist.

### Reference direction

| Reference | What to adopt | What not to copy |
|---|---|---|
| CDC/public-health surveillance dashboards (general genre, not a specific site) | Muted, data-dense layout; clear status/severity semantics | Dated visual chrome common to some government sites |
| In-chat region-grouped-chip preview | Nothing visually — it was an explicit fast stand-in | The chip-based non-geographic layout itself; must be replaced with a real map |

## Brand foundations

### Logo and identity

- Approved assets: None — no logo/brand identity required for a personal project.
- Minimum size: N/A
- Clear space: N/A
- Prohibited treatments: N/A

### Color tokens

Use semantic names so themes can change without rewriting components. Exact hex values
to be finalized during M2 build (first UI milestone) and recorded here once chosen;
placeholders below establish the semantic model and contrast requirement now so
implementation isn't ad hoc.

| Token | Value | Usage | Contrast requirement |
|---|---|---|---|
| `color-bg-page` | TBD (neutral light/dark) | Page background | — |
| `color-bg-surface` | TBD (neutral, slightly elevated from page) | Cards and panels | — |
| `color-text-primary` | TBD (near-black / near-white) | Primary text | WCAG AA (4.5:1) against surface |
| `color-text-muted` | TBD (muted gray) | Secondary text, `as_of` captions | WCAG AA (4.5:1) against surface where used for meaningful text |
| `color-action-primary` | TBD | Selectors, interactive controls | WCAG AA (4.5:1) against surface |
| `color-border-default` | TBD (subtle neutral) | Dividers and controls | — |
| `color-state-minimal` | TBD (calm neutral/green family) | Severity: minimal | WCAG AA against its label text |
| `color-state-low` | TBD (green-yellow family) | Severity: low | WCAG AA against its label text |
| `color-state-moderate` | TBD (amber family) | Severity: moderate | WCAG AA against its label text |
| `color-state-high` | TBD (red family) | Severity: high | WCAG AA against its label text |
| `color-state-warning` | TBD | HSA-disclosure / staleness callouts | WCAG AA against its label text |
| `color-state-danger` | TBD | Error states | WCAG AA against its label text |
| `color-focus` | TBD (high-contrast, distinct from action-primary) | Keyboard focus | Visible against both light and dark backgrounds |

Document light, dark, high-contrast, and data-visualization palettes when applicable —
to be completed when the first screens are built (M2), since color choices should be
validated against real map/chart data, not chosen in the abstract.

### Typography

| Token or role | Typeface | Weight | Size | Line height | Usage |
|---|---|---:|---:|---:|---|
| Display | TBD (system UI or a single neutral sans) | TBD | TBD | TBD | Page/section titles |
| Heading 1 | TBD | TBD | TBD | TBD | Panel titles |
| Heading 2 | TBD | TBD | TBD | TBD | Sub-panel titles |
| Body | TBD | TBD | TBD | TBD | Primary content, data labels |
| Small | TBD | TBD | TBD | TBD | `as_of` captions, disclosures |
| Code or data | TBD (monospace) | TBD | TBD | TBD | Raw values, FIPS codes if shown |

- Fallback stack: System UI stack (to avoid a web-font dependency for a personal
  project) — finalize in M2.
- Minimum readable size: 14px equivalent for body text; disclosures/captions no smaller
  than 12px equivalent.
- Line-length guidance: TBD, finalize with first real layout.

### Spacing and sizing

- Base spacing unit: TBD (propose 4px or 8px scale — finalize in M2).
- Spacing scale: TBD.
- Content maximum width: TBD — dashboard likely wants a wide, near-full-viewport layout
  given map + panels.
- Control heights: TBD.
- Touch-target minimum: 44x44px equivalent (standard accessibility baseline), even
  though primary use is expected to be desktop/laptop.

### Shape, borders, elevation, and imagery

- Corner-radius tokens: TBD — propose small/consistent radius (e.g. 4–8px) to keep the
  clinical feel rather than a rounded, consumer-app look.
- Border tokens: TBD — subtle, low-contrast dividers preferred over heavy borders.
- Shadow or elevation tokens: TBD — propose minimal elevation (flat or near-flat cards)
  consistent with a data-dense, non-decorative aesthetic.
- Icon style: TBD — simple line icons if any are needed (trend arrows, disclosure
  markers).
- Illustration or photography style: None — this is a data-first tool, not editorial
  content.
- Image aspect ratios and treatments: N/A.

## Layout and responsiveness

| Breakpoint or mode | Width | Columns | Gutter | Key behavior |
|---|---:|---:|---:|---|
| Small | TBD | TBD | TBD | Map and panels stack vertically; overview strip becomes horizontally scrollable or wraps |
| Medium | TBD | TBD | TBD | TBD |
| Large | TBD | TBD | TBD | Map + drill-down panel can sit side by side |

- Grid: TBD, finalize in M2.
- Density: High — favor showing more data over generous whitespace, within
  accessibility limits.
- Navigation behavior: Outbreak tracker (map/overview/tri-state/vaccination) and
  chronic-disease tab are navigationally distinct (per D-004/AC-6) — likely top-level
  tabs.
- Content hierarchy: Overview strip → map → drill-down detail, top to bottom or
  left to right depending on breakpoint.
- Empty-space guidance: Minimal — this is not an editorial/marketing surface.
- Overflow and long-content behavior: TBD, finalize once real county lists/tables exist.

## Component standards

For each component, define anatomy, variants, states, behavior, content rules, and
accessibility requirements. To be completed progressively as each component is built
(M2 onward) — do not invent specifics ahead of implementation.

| Component | Approved variants | Required states | Do | Avoid |
|---|---|---|---|---|
| Choropleth map | State-level, county-level (drill-down) | Default, hover, selected, loading, no-data/suppressed | Use a clear, colorblind-safe sequential/diverging scale for severity; show suppressed counties distinctly from zero | Implying suppressed = zero; implying borough-level precision where data is HSA-level |
| Overview card | Per-disease status card | Default, loading, stale-data warning | Show level, trend arrow, % of 2-year peak, `as_of` date | Hiding the `as_of` date or trend direction when uncertain |
| Signal/disease selector | Dropdown or segmented control | Default, focus, disabled (if a signal isn't available for a disease) | Disable rather than hide unavailable combinations | Silently falling back to a different signal without indicating the switch |
| Disclosure banner (HSA-level, stale data) | Inline banner/callout | Default, dismissible (optional) | Use `color-state-warning`; keep visible near the affected data, not just in a footnote | Burying the disclosure where it won't be seen before the value is read |
| Tab navigation (outbreak vs. chronic-disease) | Default | Default, current, focus | Make the cadence difference obvious (e.g. distinct header treatment) | Implying the chronic-disease tab auto-refreshes like the outbreak tracker |

## Interaction and motion

- Interaction feedback: Immediate visual feedback on hover/click for map regions and
  selectors; no artificial delay.
- Transition durations: TBD — keep short (under ~200ms) to match a data-tool feel, not a
  showcase feel.
- Easing: TBD.
- Loading behavior: Since this is a static site, most content is present at load;
  loading states matter mainly for client-side drill-down transitions.
- Reduced-motion behavior: Respect `prefers-reduced-motion` — disable non-essential
  transitions.
- Drag, swipe, hover, and keyboard equivalents: Map drill-down (click) must have a
  keyboard-accessible equivalent (e.g. focusable state list) — finalize in M2.

## Content and data display

- Voice and tone: Plain, factual, non-alarmist. Avoid editorializing about risk.
- Capitalization: Sentence case for labels and captions.
- Button labels: Verb-first, short (e.g. "View counties").
- Error-message pattern: State what failed and what the user can still see (e.g. "Latest
  data unavailable — showing last successful pull from <date>").
- Date, time, number, and currency formats: Dates as `Mon D, YYYY`; percentages to one
  decimal place matching the brief's reference figures (e.g. "0.9% of peak"); no
  currency involved.
- Chart type and color rules: Choropleth for geographic data; simple trend
  lines/sparklines if added later. Severity color scale must be colorblind-safe and
  consistent across map and overview cards.
- Empty states: Distinguish "no data reported" from "suppressed" from "not yet ingested"
  — these are not equivalent and must not render identically.

## Accessibility standards

- Target standard: WCAG 2.1 AA.
- Color contrast: 4.5:1 minimum for text; severity color coding must not be the only
  signal (pair with text label, e.g. "Moderate", not color alone).
- Keyboard navigation: All interactive elements (selectors, map regions, tabs) must be
  keyboard-operable.
- Focus visibility: A distinct, visible focus style (`color-focus` token) on every
  interactive element.
- Screen-reader names and landmarks: Map regions need accessible names (e.g. state/county
  name + current value), not just visual color.
- Text resizing and zoom: Layout must not break at 200% browser zoom.
- Motion and flashing: No flashing content; respect reduced-motion preference.
- Alternative text: N/A for decorative elements (none planned); data visualizations need
  a text-equivalent summary (e.g. the overview strip itself serves this role for the
  map).
- Error identification: Errors/staleness communicated in text, not color alone.

## Representative screen specifications

| Screen or workflow | Reference | Key rules demonstrated | Approval status |
|---|---|---|---|
| National map + overview strip | Not yet built | Severity color + text pairing, `as_of` display | Pending (M2) |
| Tri-state/NYC panel | Not yet built | HSA-disclosure banner placement | Pending (M4) |
| Vaccination layer | Not yet built | Stale-data disclosure (e.g. Dec 2024 MMR estimate) | Pending (M5) |
| Chronic-disease tab | Not yet built | Visual/navigational separation from outbreak tracker | Pending (M6) |

Include or link approved examples for primary, empty, loading, error, success, disabled,
and narrow-screen states once each screen is built.

## Design QA checklist

- [ ] Approved tokens are used; no unexplained one-off values exist.
- [ ] Components match approved variants and state behavior.
- [ ] Visual hierarchy is consistent.
- [ ] Responsive behavior matches the documented rules.
- [ ] Keyboard focus and interaction states are visible.
- [ ] Contrast and text scaling meet the stated standard.
- [ ] Loading, empty, error, and success states are designed.
- [ ] Content follows voice, labeling, and formatting rules.
- [ ] Intentional exceptions are documented and approved.

## Exceptions

| ID | Surface | Exception | Rationale | Approved by | Review date |
|---|---|---|---|---|---|
| | | | | | |

## Change log

| Date | Milestone | Change | Rationale | Approved by |
|---|---|---|---|---|
| 2026-07-25 | Pre-M1 | Initial style direction established (principles, semantic tokens, component list) — concrete values deferred to M2 | Personality/direction was confirmed in discovery; exact tokens need real screens to validate against, not chosen in the abstract | Ben Aheto |
