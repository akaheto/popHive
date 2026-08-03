# Phase 8 - Next Priority Enhancements

**Current Status:** 2 backlog datasets integrated; NNDSS deferred  
**Build Time:** 89.5 seconds | **Datasets:** 12 of 13 | **Rows:** 1.3M  
**Production:** ✅ Live

---

## Phase 8 Priorities (Next 2-4 Weeks)

### Priority 1: Fix NNDSS Pagination ⭐
**Impact:** Access to comprehensive notifiable disease data  
**Effort:** 2-3 days  
**Blocker:** Currently deferred, returns 0 rows

**Problem:**
- NNDSS rows are large (~500B each with metadata)
- 100k+ rows × 500B = 50MB+ JSON payloads
- Node.js has string size limits (~2GB)
- Pagination to 250k rows hits limit

**Solutions to Evaluate:**
1. **Selective field fetching** (RECOMMENDED)
   - Query only: `states, year, week, label, m2` (most important fields)
   - Reduces per-row size from 500B to ~100B
   - Effort: 1 day to implement + test

2. **Streaming JSON parser**
   - Use streaming parser instead of loading all into memory
   - Harder to implement but more flexible
   - Effort: 2-3 days

3. **Payload filtering**
   - Fetch only recent weeks (e.g., last 4 weeks only)
   - Query: `WHERE week >= current_week - 4`
   - Effort: 1 day

**Recommendation:** Start with selective field fetching + recent weeks filter.

---

### Priority 2: Add Vaccination Coverage Data ⭐⭐
**Impact:** Highest value for state assessment ("is population protected?")  
**Effort:** 3-4 days  
**Value:** Links immunization rates to disease activity

**Data to Integrate:**
1. **COVID-19 Vaccination Coverage** (CDC COVID Data Tracker)
   - Dataset: Need to verify exact dataset ID on data.cdc.gov
   - Metrics: % fully vaccinated, % with booster
   - Frequency: Weekly
   - Value: Shows RSV/flu readiness for high-risk populations

2. **Influenza Vaccination Coverage** (CDC FluVax tracking)
   - Dataset: Need to verify exact dataset ID
   - Metrics: % vaccinated by age group (65+, adults, children)
   - Frequency: Annual (season-based)
   - Value: Compare flu vax rate to flu activity

3. **RSV Vaccination Coverage** (NEW - RSV vaccines just approved)
   - Dataset: CDC RSV vaccine tracking (NEW in 2023)
   - Metrics: % eligible population vaccinated
   - Frequency: Weekly/monthly
   - Value: Critical for elderly assessment

**Tasks:**
- [ ] Verify exact dataset IDs on data.cdc.gov
- [ ] Extract correct date fields for each
- [ ] Extract state field names
- [ ] Handle multiple datasets per vaccine type
- [ ] Test fetching and mapping

**Example Use Case:**
> "California: RSV elderly vaccination 45%, RSV ED visits 0.8%, activity HIGH
> Recommendation: Increase vaccination campaigns (currently under-protected)"

---

### Priority 3: Case Fatality Rate Calculation
**Impact:** Shows severity trends (deaths ÷ cases)  
**Effort:** 1-2 days  
**Value:** Complement to ED visits and test positivity

**Data Available:**
- Death counts: Already have (Influenza/Pneumonia/COVID provisional deaths)
- Cases: From NNDSS (once fixed) or from disease-specific datasets
- Formula: `Deaths[t-1] ÷ Cases[t-2] = CFR[t]` (lag adjustments)

**Implementation:**
- Calculate at state level
- Add to state assessment view
- Trend line showing CFR over time
- Compare CFR across states

---

### Priority 4: Optimize State Assessment UI
**Impact:** Better display of new metrics  
**Effort:** 2-3 days  
**Value:** More actionable state-level insights

**Tasks:**
- [ ] Add test positivity to state view
- [ ] Display condition-stratified ED data (respiratory vs. GI vs. other)
- [ ] Add age-group breakdown (65+ vs. others)
- [ ] Add vaccination coverage comparison
- [ ] Create "health status composite score" from all metrics

**Example UI:**
```
State: California

Overall Health Status: MODERATE CONCERN

Key Metrics:
├─ Transmission
│  ├─ Test Positivity: 8% (↑ rising)
│  └─ ED Visits: 2.1% respiratory (↓ declining)
├─ Vulnerability
│  ├─ Age 65+: 45% RSV-vaccinated
│  └─ Hospitalization: 120 beds occupied (18% capacity)
└─ Trends
   └─ Case Fatality Rate: 1.2% (stable)

Recommendation: Focus on elderly vaccination
```

---

## Phase 8 Schedule

| Week | Task | Owner | Status |
|------|------|-------|--------|
| 1 | Fix NNDSS pagination | Dev | Not started |
| 1-2 | Add vaccination coverage (verify IDs, integrate) | Dev | Not started |
| 2 | Calculate case fatality rates | Dev | Not started |
| 2-3 | Optimize state assessment UI | Dev/Design | Not started |
| 3 | Test and QA all changes | QA | Not started |
| 3-4 | Deploy to production | Dev | Not started |

**Timeline:** 3-4 weeks assuming parallel work on metrics/vaccination

---

## Phase 9 Preview (After Phase 8)

Once Phase 8 complete:
- **County-level disease progression** (track disease movement between counties)
- **Healthcare capacity monitoring** (bed availability, ICU utilization)
- **Hospitalization trend analysis** (compare to ED visits for severity assessment)
- **Demographic deep-dive** (race/ethnicity breakdowns for equity analysis)

---

## Technical Notes

### NNDSS Fix Implementation Plan
```typescript
// In soda-client.ts - Add selective field helper
function buildSelectClause(datasetId: string): string {
  const fieldMaps = {
    "x9gk-5huc": "states, year, week, label, m2", // NNDSS
  };
  return fieldMaps[datasetId] || "*";
}

// In fetch-tier1.ts - Use selective fields for NNDSS
if (key === "nndss-weekly") {
  response = querySODA(config.id, {
    select: buildSelectClause(config.id),
    limit: 50000, // Can now fetch more with smaller rows
    offset,
  });
}
```

### Vaccination Coverage Integration
```typescript
// Add to tier1-datasets.ts once IDs verified
"vaccination-covid": {
  id: "VERIFY", // Found on data.cdc.gov
  name: "COVID-19 Vaccination Coverage",
  category: "vaccination",
  dateField: "date",
  stateField: "state",
  valueFields: ["percent_vaccinated", "percent_booster"],
  updateFrequency: "weekly",
},
```

### State Assessment API Pattern
```typescript
GET /api/state-assessment?state=CA&metrics=all
Response: {
  state: "CA",
  timestamp: "2026-08-03",
  transmission: {
    testPositivity: 8.2,
    edVisits: { respiratory: 2.1, gi: 1.3, other: 0.8 },
    trend: "rising"
  },
  vulnerability: {
    vaccination: { rsv: 45, flu: 62 },
    demographics: { ages65plus: "high-risk" }
  },
  severity: {
    caseFatalityRate: 1.2,
    hospitalizations: 120,
    trendDirection: "stable"
  }
}
```

---

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|-----------|
| NNDSS still too large after selective fields | Medium | High | Have streaming parser ready as backup |
| Vaccination dataset IDs changed | Low | Medium | Script to auto-discover IDs from CDC |
| CFR calculation too complex with lags | Low | Low | Start simple (same-week), add lags later |
| State assessment UI becomes cluttered | Medium | Medium | Progressive disclosure (accordion/tabs) |

---

## Success Criteria

Phase 8 is complete when:
- [ ] NNDSS fetches and returns 10k+ rows (up from 0)
- [ ] Vaccination coverage data for 3+ vaccine types integrated
- [ ] Case fatality rate calculated and displayed
- [ ] State assessment UI shows all 4 metric categories
- [ ] Build time remains < 120 seconds
- [ ] Deployed to production and verified live
- [ ] No breaking changes to existing data

---

## Current Blockers

None. Ready to start Phase 8.

**Next Action:** Begin with NNDSS selective field fetching (1 day effort, unblocks high-value disease surveillance data).
