# User Guide

Keep these instructions aligned with the delivered behavior. Write for the actual user,
avoiding implementation detail unless it helps them succeed.

## Purpose

A personal dashboard for checking current US public-health surveillance data at a
glance: disease activity (flu, COVID-19, RSV, measles) by state and county, a
tri-state/NYC pinned view, vaccination coverage, and chronic-disease/behavioral-health
indicators — all sourced from PopHIVE.

## Intended audience

- Primary users: Ben Aheto (sole user).
- Expected knowledge: Comfortable reading epidemiological data (ED visit %, wastewater
  activity levels, hospitalization rates, coverage percentages); no special training
  assumed beyond that.

## Prerequisites

- A web browser.
- The dashboard's hosted URL (to be recorded here once deployed in M1/M7).

## Installation or access

1. TBD — will be completed once the site is deployed (M7): the Vercel URL and any access
   notes.

## Configuration

| Setting | Purpose | Required? | Default | Example |
|---|---|---:|---|---|
| — | No user-facing configuration planned for v1 (single default view, disease/signal selectors are in-page, not persisted settings) | | | |

Do not include real secrets or credentials.

## Quick start

1. TBD — will be written once the national map + overview strip ship (M2).
2. 
3. 

## Core workflows

### Check current national status

- Goal: See at-a-glance disease activity levels.
- Before you begin: Open the dashboard.
- Steps:
  1. TBD (M2)
- Expected result: TBD (M2)

### Drill into a state or county

- Goal: See local detail for a disease/signal.
- Before you begin: TBD (M2)
- Steps:
  1. TBD (M2)
- Expected result: TBD (M2)

### Check the tri-state/NYC view

- Goal: TBD (M4)
- Before you begin: TBD (M4)
- Steps:
  1. TBD (M4)
- Expected result: TBD (M4), including how the HSA-level disclosure appears.

### Check vaccination coverage

- Goal: TBD (M5)
- Steps:
  1. TBD (M5)
- Expected result: TBD (M5)

### Check chronic-disease/behavioral-health indicators

- Goal: TBD (M6)
- Steps:
  1. TBD (M6)
- Expected result: TBD (M6)

## Inputs and outputs

| Item | Format | Description | Example |
|---|---|---|---|
| Disease selector | UI control | Choose flu / COVID-19 / RSV / measles | TBD once built |
| Signal selector | UI control | Choose ED visits % / wastewater / hospitalizations / etc. | TBD once built |
| `as_of` date | Text label | Shows how current the displayed data is | e.g. "Data as of Jul 18, 2026" |

## Common problems

| Symptom | Likely cause | Resolution |
|---|---|---|
| A value looks unexpectedly identical across all 5 NYC boroughs | NSSP reports that metric at HSA level, not true per-borough | Look for the "HSA-level estimate — not borough-specific" disclosure; this is expected, not a bug |
| Data looks older than expected | PopHIVE only ingests Tue/Fri, and some sources (e.g. certain coverage estimates) update far less often | Check the `as_of` date on the panel — it reflects true source freshness, not a bug |

## Limitations and safe use

- This dashboard reflects PopHIVE's own data limitations: suppressed/small counts are
  not shown as true zeros, NYC boroughs may share one HSA-level value for some metrics,
  and some sources (e.g. vaccination coverage estimates) can lag by months.
- Not intended as a clinical or public-health decision-making tool — it is a personal
  situational-awareness dashboard.
- **Browser/device verification has not yet been performed** — no screens exist yet to
  test. This will be updated with real verification evidence (browsers/devices tested)
  once M2 ships; treat this guide as incomplete until then.

## Getting help

- Support owner or channel: Ben Aheto (self-supported personal project).
- Information to include: N/A — no support process needed for a single-user project.

## Version history

| Date | Version or milestone | User-facing change |
|---|---|---|
| 2026-07-25 | Pre-M1 | Documentation scaffolded; no user-facing product yet |

## Documentation QA

- [ ] Instructions were tested against the delivered output. — Not yet possible; no
      build exists.
- [ ] Names, labels, screenshots, and workflows match the approved visual style guide
      and current product. — Pending first build.
- [ ] Accessibility instructions and keyboard behavior are documented where relevant. —
      Pending first build.
