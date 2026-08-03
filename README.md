# Public Health Surveillance Dashboard

A personal dashboard for monitoring US disease activity from PopHIVE (Yale School of Public Health's harmonized surveillance dataset). Displays national, state, and county-level data for respiratory diseases, measles, vaccination coverage, and chronic disease indicators.

**Live Dashboard:** https://public-health-dashboard-ten.vercel.app

## Features

- **Multi-disease tracking**: Flu, COVID-19, RSV, measles, chronic diseases
- **10+ signal sources**: CDC NSSP, NWSS, NHSN, RespNET, ILINet, Epic Cosmos, Delphi claims, Kinsa, Google Trends
- **Geographic drill-down**: State → county choropleth maps with interactive selection
- **Vaccination monitoring**: 6 vaccine types (MMR, DTaP, Polio, Hep B, Varicella, Combined 7-series)
- **Historical trends**: 2-year disease progression charts with peak references
- **CDC Dashboard**: Data Explorer, State Assessment, Disease Progression tabs
- **Personalization**: Per-disease signal defaults (saved locally), level-change alerts
- **Accessibility**: WCAG AA compliant (44px touch targets, keyboard navigation, contrast verified)

## Documentation

- **[User Guide](Project%20Documents/surveillance-dashboard/09-user-guide.md)** — How to use the dashboard, feature descriptions
- **[Technical Specification](Project%20Documents/surveillance-dashboard/10-technical-specification.md)** — Architecture, data pipeline, components, APIs
- **[Future Enhancements](Project%20Documents/surveillance-dashboard/11-future-enhancements.md)** — Roadmap and candidate features
- **[Visual Style Guide](Project%20Documents/surveillance-dashboard/12-visual-style-guide.md)** — Design tokens, typography, accessibility standards

## Recent Enhancements (Post-M8)

| Enhancement | Description | Status |
|---|---|---|
| E-002 | Per-disease signal customization (localStorage-backed defaults) | ✅ Live |
| E-004 | Historical trend charts (2-year progression) | ✅ Live |
| E-005 | Level change alerts (notification banner) | ✅ Live |
| E-006 | 10 disease signals with grouped selector | ✅ Live |
| E-007 | Lazy-loaded county data (~1.2MB savings) | ✅ Live |
| E-009 | County-level measles drill-down (320 counties) | ✅ Live |
| E-012 | 6 vaccine types in vaccination panel | ✅ Live |
| E-013 | WCAG AA touch-target sizing (44px minimum) | ✅ Live |

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React, Recharts, D3-geo
- **Data Pipeline**: DuckDB (parquet querying), TypeScript
- **Styling**: Tailwind CSS with design tokens
- **Hosting**: Vercel (auto-deploy on main push, daily scheduled rebuild)
- **Data Sources**: PopHIVE (national/state/county), NYC DOHMH (borough-level)

## Getting Started

### Local Development

```bash
cd web
npm install
npm run dev              # Start dev server (http://localhost:3000)
npm run build:data      # Rebuild static data files
npm run build          # Production build
```

### Deployment

```bash
npm run build          # Build production bundle
vercel --prod          # Deploy to production
```

## Help & Support

Click the **?** icon in the dashboard header for the user guide, or browse documentation in the `Project Documents/surveillance-dashboard/` folder.

