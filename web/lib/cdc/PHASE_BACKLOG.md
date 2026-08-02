# Public Health Tracker - Phase Backlog

## Completed Phases

### Phase 1: ✅ Dashboard Visualization Components
- Created interactive CDC data cards showing metrics by category
- Four health categories: Infectious Disease, Chronic Disease, Injuries & Mortality, Mental Health
- Real-time data fetching from `/api/health-data` endpoint
- Responsive grid layout

### Phase 2: ✅ Data Query API Endpoints  
- Built `/api/health-data` endpoint with filtering capabilities
- Supports dataset, state, date range, and limit parameters
- Returns filtered CDC data with metadata
- Documentation at `/docs`

### Phase 3: ✅ Data Source Status Monitoring
- Data Source Freshness Dashboard at `/data-sources`
- Shows 13 CDC datasets organized by category
- Color-coded by freshness status (fresh/warning/stale/error)
- Sorted by update frequency (daily → annual)
- Clickable rows to view most recent data records
- Expected next update dates for delayed sources

### Phase 4: ✅ Trending & Visualization
- CDC Data Trends page at `/trends`
- 8 datasets with time-series trend visualization
- ASCII charts showing trend patterns
- Min/Average/Max statistics
- Recent values list
- Spans multi-year data (2020-2026)

---

## Backlog - Future Phases

### Phase 5: 🔔 Statistical Alerting System (PRIORITY: HIGH)
**Enables proactive health monitoring through intelligent trend detection**

#### Feature Overview
- Monitor daily/weekly updated datasets for statistically significant increases
- Detect when health metrics are trending upward
- Alert on anomalies vs. historical baseline

#### Components to Build
1. **Trend Analysis Engine**
   - Calculate 7-day, 14-day, 30-day moving averages
   - Detect upward trends (slope analysis)
   - Compare current values to rolling baseline

2. **Statistical Significance Testing**
   - Calculate Z-scores for deviation from mean
   - Flag values > 2 standard deviations as significant
   - Consider trend duration (days of consecutive increase)

3. **Alert Rules Configuration**
   - Define thresholds by data source
   - Hourly/daily alert digest options
   - Severity levels (warning/critical)

4. **Alert Dashboard**
   - Display active alerts with recent changes
   - Show % increase from baseline
   - Link to detailed trend chart
   - Historical alert log

5. **Datasets for Phase 5 Alerting**
   - Healthcare Surveillance (daily updates, ED visits)
   - NSSP ED Respiratory (daily, respiratory illness tracking)
   - COVID-19 Test Positivity (weekly, infection indicators)
   - Drug Overdose Mortality (annual, public health crisis)
   - Anxiety/Depression (weekly, mental health indicators)

#### Implementation Approach
```
For each daily/weekly dataset:
1. Fetch last 30-60 days of data
2. Calculate 7-day moving average
3. Calculate z-score vs. historical mean
4. If z-score > 2.0 AND trend is upward → CREATE ALERT
5. Store alert in database with metadata
6. Display in alerts dashboard
```

#### Success Criteria
- Detect real increases within 1-2 updates after they occur
- False positive rate < 5%
- < 1 second latency for alert generation
- Searchable/filterable alert history

---

### Phase 6: Enhanced Visualizations (PRIORITY: MEDIUM)
- Interactive line/bar charts with date range selection
- Multi-source comparison on same chart
- Geographic filtering (state-level trends)
- Export trends to CSV/JSON
- Moving averages and smoothing options

---

### Phase 7: County-Level Analysis (PRIORITY: MEDIUM)
- Drill down to county-level data where available
- County-level ED visits and test positivity
- Geographic heatmaps showing variation
- County comparisons within states

---

### Phase 8: Predictive Analytics (PRIORITY: LOW)
- Forecast next 2-4 weeks of trends
- Identify potential escalation patterns
- Confidence intervals for predictions

---

## Technical Debt & Improvements

### Current Limitations
- NNDSS dataset (x9gk-5huc) exceeds Node.js string size limits
- Large datasets capped at 100k rows due to memory constraints
- No persistent storage of historical snapshots beyond file archive

### Future Database Needs
- PostgreSQL or Supabase for alert history
- Time-series database for efficient trend queries
- Cache layer for frequently accessed trends

---

## Quick Stats
- **Total Data Sources**: 13 (11 Tier 1 + 2 Backlog)
- **Data Categories**: 4 (Infectious, Chronic, Injuries, Mental Health)
- **Date Range**: 2020-2026 (4+ years of historical data)
- **Total Rows Ingested**: ~1.7M (across all datasets)
- **Update Frequencies**: Daily (3), Weekly (5), Annual (5)
