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

Sourced from the dataviz skill's validated reference palette (chosen as this project's
palette outright, not swapped for a separate brand — appropriate for a personal,
non-branded tool). Defined as CSS custom properties in `web/app/globals.css`.

| Token | Light | Dark | Usage | Contrast requirement |
|---|---|---|---|---|
| `color-bg-page` | `#f9f9f7` | `#0d0d0d` | Page background | — |
| `color-bg-surface` | `#fcfcfb` | `#1a1a19` | Cards and panels | — |
| `color-text-primary` | `#0b0b0b` | `#ffffff` | Primary text | WCAG AA (4.5:1) against surface |
| `color-text-secondary` | `#52514e` | `#c3c2b7` | Secondary text | WCAG AA (4.5:1) against surface |
| `color-text-muted` | `#898781` | `#898781` | `as_of` captions, axis labels | Muted by design; never the only carrier of meaning |
| `color-border-default` | `#e1e0d9` | `#2c2c2a` | Dividers, gridlines | — |
| `color-focus` | `#2a78d6` | `#3987e5` | Keyboard focus ring | Visible against both light and dark backgrounds |
| `color-no-data` | `#e1e0d9` | `#2c2c2a` | Map fill for counties/states with no usable data | — |

Status palette (fixed — never themed, same hexes in both modes), mapped 1:1 to the four
severity levels used in the overview strip and level-based map fills:

| Level | Token | Hex | Notes |
|---|---|---|---|
| Minimal | `color-state-minimal` | `#0ca30c` | |
| Low | `color-state-low` | `#fab219` | Sub-3:1 on light surface by design — always paired with icon + text label, never color alone |
| Moderate | `color-state-serious` | `#ec835a` | Same sub-3:1 caveat as above |
| High | `color-state-critical` | `#d03b3b` | |

Sequential ramp (single hue, blue, light→dark step 100→700) for choropleth magnitude
encoding — the map's fill color is never the status palette, since the map encodes a
continuous value, not a discrete level. The ramp is theme-aware as of M7: `Choropleth.tsx`
picks light or dark endpoints from a `prefers-color-scheme` media-query hook.

Light mode (unchanged from M2, low value fades toward the light page background):

`#cde2fb → #b7d3f6 → #9ec5f4 → #86b6ef → #6da7ec → #5598e7 → #3987e5 → #2a78d6 → #256abf
→ #1c5cab → #184f95 → #104281 → #0d366b`

Dark mode (added M7, low value fades toward the near-black dark surface instead of going
transparent/invisible — a straight reuse of the light hexes made the darkest, highest-
value steps nearly indistinguishable from the surface):

`#182a3d → #1a3350 → #1d3d62 → #204775 → #255588 → #2c649c → #3373b0 → #3987e5 → #5598e7
→ #6da7ec → #86b6ef → #9ec5f4 → #b7d3f6`

Endpoint contrast against `--color-bg-page` checked programmatically (WCAG relative-
luminance formula) in both modes: low value ≈1.0-1.3:1 (intentionally low — it's meant to
recede, paired with the separate `color-no-data` fill for true no-data cells), high value
≈11.3:1 (light) / ≈12.6:1 (dark) — clearly legible in both themes, same contrast contract
preserved across the theme switch. Not yet confirmed by an actual rendered dark-mode
screenshot in this environment (tooling limitation, not a design gap) — a quick manual
look under system dark mode is recommended before final visual sign-off.

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
  keyboard-accessible equivalent. Delivered in M7: a labeled "Jump to state" `<select>`
  above the map, shown wherever click-to-drill-down exists, calling the same handler as
  a map click.

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

Pass run 2026-07-26 (M7). See `04-status.md` for the session note and open items.

- [x] Approved tokens are used; no unexplained one-off values exist. Verified by
      grepping `app`/`components`/`lib`/`scripts` for hex literals outside
      `globals.css` and the documented choropleth ramp — none found.
- [x] Components match approved variants and state behavior, per the Component
      standards table above.
- [x] Visual hierarchy is consistent (overview strip → tabs → map → legend, in
      that order, on every tab/panel) — confirmed by screenshot across the
      Outbreak Tracker, Tri-State + NYC, and Chronic Disease tabs.
- [~] Responsive behavior matches the documented rules. Confirmed no horizontal
      overflow and clean control wrapping down to the narrowest viewport this
      session's tooling could reach (~606px CSS width — a hard floor in this
      browser-automation environment, not a floor in the app). True phone-width
      (~320-390px) and true 200% browser zoom were not exercised; recommend a
      manual check on an actual phone or with real DevTools device emulation.
- [x] Keyboard focus and interaction states are visible. Confirmed by screenshot
      (visible focus ring while tabbing through the disease-tab control) and by
      code review (no `outline-none`/`tabIndex={-1}` anywhere suppressing it);
      `color-focus` contrast checked at 4.19:1 (light) / 5.34:1 (dark) against
      `color-bg-page`, both above the 3:1 non-text minimum.
- [~] Contrast and text scaling meet the stated standard. All text-token pairs
      checked programmatically (WCAG relative-luminance formula) — every pair is
      7.7:1 or higher in both themes, well above the 4.5:1 AA minimum. Text
      *scaling* (200% zoom) itself was not exercised this session — same tooling
      limitation as above.
- [x] Loading, empty, error, and success states are designed, within this site's
      actual architecture: data is static-generated (no client-side fetch, so no
      loading spinner is needed — documented in Interaction and motion above),
      "no data" cells get the dedicated `color-no-data` fill + legend entry, and
      staleness is disclosed via visible `as_of`/`generated` timestamps plus the
      existing HSA-level and stale-MMR banners (shipped in M2-M5, browser-
      verified at the time).
- [x] Content follows voice, labeling, and formatting rules — spot-checked
      against the live site (sentence case, plain factual tone, `as_of` dates
      shown, no editorializing).
- [x] Intentional exceptions are documented and approved. None currently exist;
      the Exceptions table below is correctly empty.

Gap found (not a regression from M7's changes, pre-existing): interactive
control heights measured 30-34px, short of the 44x44px touch-target minimum
stated above. Tracked as E-013 in `11-future-enhancements.md` rather than fixed
inline, since it's a shared-class change across most components (a visible
spacing change) and the style guide already treats touch targets as lower
priority for this desktop/laptop-first tool.

## Exceptions

| ID | Surface | Exception | Rationale | Approved by | Review date |
|---|---|---|---|---|---|
| | | | | | |

## Change log

| Date | Milestone | Change | Rationale | Approved by |
|---|---|---|---|---|
| 2026-07-25 | Pre-M1 | Initial style direction established (principles, semantic tokens, component list) — concrete values deferred to M2 | Personality/direction was confirmed in discovery; exact tokens need real screens to validate against, not chosen in the abstract | Ben Aheto |
