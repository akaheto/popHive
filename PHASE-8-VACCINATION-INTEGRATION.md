# Phase 8 Priority 2: Vaccination Coverage Integration

**Status:** Ready to implement  
**Effort:** 3-4 days  
**Value:** HIGHEST - Links immunization readiness to disease trends

---

## Overview

Add vaccination coverage data for COVID-19, Influenza, and RSV to enable analysis like:
> "California RSV vaccination 45% (low) + RSV ED visits 0.8% (high) = under-protected population"

---

## Datasets to Integrate

### 1. COVID-19 Vaccination Coverage by State
**Source:** CDC COVID Data Tracker / data.cdc.gov  
**Update Frequency:** Weekly  
**Lag:** 1-2 weeks  
**Metrics Needed:**
- State (geography)
- Date
- % Fully Vaccinated (series complete)
- % With Booster (at least 1 booster dose)
- % With Bivalent Booster (updated booster)

**Dataset ID:** [TO VERIFY - search CDC SODA for "COVID vaccination coverage by state"]  
**Alternative Source:** COVID Data Tracker API (`https://api.covidtracking.com/`)

**Field Mapping (EXPECTED):**
```
State Field: state / location_name
Date Field: date / update_date
Value Fields: percent_fully_vaccinated, percent_booster, percent_bivalent
```

### 2. Influenza Vaccination Coverage by State
**Source:** CDC FluVax Tracking / data.cdc.gov  
**Update Frequency:** Annual (season-based, weekly updates during season)  
**Lag:** 1-2 weeks  
**Metrics Needed:**
- State
- Season (e.g., 2025-2026)
- Date
- % Vaccinated Overall
- % Vaccinated Ages 65+
- % Vaccinated Ages 18-64
- % Vaccinated Pediatric (6mo-17y)

**Dataset ID:** [TO VERIFY - search CDC SODA for "influenza vaccination coverage by state"]

**Field Mapping (EXPECTED):**
```
State Field: state / location_name
Date Field: season / week_ending_date
Value Fields: percent_vaccinated, age_group, percent_vaccinated_[AGE]
```

### 3. RSV Vaccination Coverage by State ⭐ (NEW)
**Source:** CDC RSV Vaccine Tracking (NEW - vaccines authorized 2023)  
**Update Frequency:** Weekly / Monthly (high priority, new program)  
**Lag:** 1-2 weeks  
**Metrics Needed:**
- State
- Date
- % Adults 60+ Vaccinated (primary target)
- % Adults 50-59 Vaccinated (expanded eligibility)
- % Vaccinated Via Healthcare Worker Program

**Dataset ID:** [TO VERIFY - search CDC SODA for "RSV vaccination" or "respiratory syncytial virus vaccine"]  
**Note:** RSV vaccine tracking is NEW; CDC may have limited historical data

**Field Mapping (EXPECTED):**
```
State Field: state
Date Field: date / week_ending_date
Value Fields: percent_vaccinated_60plus, percent_vaccinated_50_59
```

---

## Integration Tasks

### Task 1: Research & Verify Dataset IDs (1 day)
**Action Items:**
- [ ] Search CDC data.cdc.gov for "COVID vaccination" datasets
- [ ] Identify exact dataset IDs and field names
- [ ] Test API queries for each dataset
- [ ] Document field mappings and data structure
- [ ] Check data freshness and update frequency

**Commands:**
```bash
# Search for COVID vaccination datasets
curl "https://data.cdc.gov/api/v3/views.json?tags=vaccination,covid"

# Check dataset structure
curl "https://data.cdc.gov/api/v3/views/{DATASET_ID}/query.json?\$limit=1"

# Check available fields
curl "https://data.cdc.gov/api/v3/views/{DATASET_ID}/columns.json"
```

**Verification Checklist:**
- [ ] COVID vaccination dataset returns data for all 50 states
- [ ] Flu vaccination dataset has recent season data (2025-2026)
- [ ] RSV vaccination dataset exists and has state-level data
- [ ] Date/state fields correctly identified
- [ ] Data freshness acceptable (<2 weeks old)

### Task 2: Update tier1-datasets.ts (1 day)
Add 3 new datasets to configuration:

```typescript
"vaccination-covid": {
  id: "DATASET_ID_HERE", // From Task 1
  name: "COVID-19 Vaccination Coverage by State",
  category: "vaccination",
  description: "Weekly COVID-19 vaccination rates by state",
  dateField: "date", // Verify from Task 1
  stateField: "state", // Verify from Task 1
  valueFields: ["percent_fully_vaccinated", "percent_booster"],
  updateFrequency: "weekly",
  typicalLag: "1-2 weeks",
},

"vaccination-influenza": {
  id: "DATASET_ID_HERE",
  name: "Influenza Vaccination Coverage by State",
  category: "vaccination",
  description: "Annual flu vaccination coverage by state and age group",
  dateField: "season",
  stateField: "state",
  valueFields: ["percent_vaccinated", "age_group"],
  updateFrequency: "annual",
  typicalLag: "1-2 weeks",
},

"vaccination-rsv": {
  id: "DATASET_ID_HERE",
  name: "RSV Vaccination Coverage by State",
  category: "vaccination",
  description: "RSV vaccine coverage by state (adults 60+)",
  dateField: "date",
  stateField: "state",
  valueFields: ["percent_vaccinated_60plus"],
  updateFrequency: "weekly",
  typicalLag: "1-2 weeks",
},
```

### Task 3: Test Fetching (1 day)
**Actions:**
- [ ] Test build with 3 new datasets
- [ ] Verify each dataset fetches without error
- [ ] Check row counts and data freshness
- [ ] Validate data quality (no null-heavy columns)
- [ ] Check build time impact

**Expected Results:**
- COVID vaccination: ~500-1000 rows (daily data, 30-day window)
- Influenza vaccination: ~1000-2000 rows (season data)
- RSV vaccination: ~1000-1500 rows (weekly data)
- Build time: <120 seconds

### Task 4: Display in State Assessment (1 day)
**UI Changes:**
- [ ] Add vaccination metrics to state assessment view
- [ ] Show vaccination rate compared to disease activity
- [ ] Display vaccination trend (% increasing over time)
- [ ] Add "Protection Readiness" composite score

**Example Display:**
```
State: California | Vaccination Coverage

COVID-19
├─ Fully Vaccinated: 78% ↔️ (stable)
├─ Current Booster: 45% ↗️ (increasing)
└─ RSV ED Visits: 0.8% (disease activity)

Influenza
├─ 2025-2026 Coverage: 62% ↗️
├─ Ages 65+: 78% ↗️ (high)
└─ Flu ED Visits: 1.2% (disease activity)

RSV (NEW)
├─ Ages 60+ Vaccinated: 45% ↗️
├─ Ages 50-59: 28% ↗️
└─ RSV ED Visits: 0.02% (minimal)

Overall Protection Readiness: MODERATE
```

---

## Data Structure Example

Once integrated, vaccination data will enable queries like:

```typescript
// State Assessment Query
GET /api/state-assessment?state=CA&metrics=vaccination,disease

Response: {
  state: "CA",
  vaccination: {
    covid: {
      fullyVaccinated: 78,
      currentBooster: 45,
      trend: "stable",
      lastUpdated: "2026-08-01"
    },
    influenza: {
      coverage: 62,
      ages65plus: 78,
      trend: "rising",
      season: "2025-2026"
    },
    rsv: {
      ages60plus: 45,
      ages50to59: 28,
      trend: "rising",
      lastUpdated: "2026-08-01"
    }
  },
  disease: {
    covid: { edVisits: 0.21, trend: "rising" },
    influenza: { edVisits: 0.07, trend: "declining" },
    rsv: { edVisits: 0.02, trend: "declining" }
  },
  analysis: "Strong COVID protection but RSV vaccination low for high-risk ages"
}
```

---

## Known Challenges

| Challenge | Solution |
|-----------|----------|
| Vaccine data may be in separate endpoints per vaccine type | Normalize to single query pattern |
| Historical RSV vaccine data limited (new 2023) | Document data availability constraints |
| Age-stratified flu data may not be in same dataset | May need to join multiple datasets |
| CDC updates may cause field name changes | Monitor CDC docs; build flexibility |

---

## Success Criteria

Phase 8 Priority 2 complete when:
- [ ] All 3 vaccination datasets fetch successfully
- [ ] Row counts > 500 per dataset (indicating good coverage)
- [ ] Build time remains < 120 seconds
- [ ] State assessment displays vaccination + disease comparison
- [ ] Deployed to production and verified live
- [ ] Documentation updated

---

## Implementation Order

1. **Day 1:** Research dataset IDs + verify API access
2. **Day 2:** Implement tier1-datasets.ts changes + test fetching
3. **Day 3:** UI integration in state assessment view
4. **Day 4:** QA testing + production deployment

---

## Next Steps

1. Execute Task 1: Research exact CDC dataset IDs
2. Create PR with new datasets once IDs verified
3. Test build and validate data
4. Update State Assessment component to display vaccination data
5. Deploy to production

---

## Reference Links

- CDC COVID Data Tracker: https://covid.cdc.gov/covid-data-tracker
- CDC FluVax Tracking: https://www.cdc.gov/flu/vaccination-coverage/index.html
- CDC RSV Vaccine Info: https://www.cdc.gov/vaccines/vpd/rsv/
- data.cdc.gov: https://data.cdc.gov/ (search for vaccination datasets)
- CDC SODA API Docs: https://dev.socrata.com/

---

## Timeline

**If IDs found quickly:** 2-3 days  
**If research takes longer:** 3-4 days  
**Risk:** RSV vaccine data might be very limited (new program)

**Start date:** Immediately after NNDSS defer  
**Target completion:** EOW (end of week)
