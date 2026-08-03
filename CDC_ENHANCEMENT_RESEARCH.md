# CDC Dashboard Enhancement Research
**For Enhanced State-Based Assessments**

Date: 2026-08-03

---

## Part 1: Currently Available CDC Data (Tier 1 - Already Integrated)

### 12 Datasets Currently Accessible via data.cdc.gov

#### Infectious Disease (4 datasets)
1. **CDC Epidemic Trends and Rt** (5dqz-y4ea) — Weekly
   - Disease: COVID-19, Influenza, RSV trend classifications
   - Data: Declining/Growing/etc classification
   - Lag: 1 week
   - **State-Assessment Use**: Trend momentum by state

2. **NSSP Emergency Department Respiratory Daily** (vjzj-u7u8) — Daily
   - Data: ED visit percentages for respiratory illnesses
   - Lag: 1-2 days
   - **State-Assessment Use**: Current respiratory burden by disease type

3. **Level of Acute Respiratory Illness Activity by State** (f3zz-zga5) — Weekly
   - Data: ARI activity levels (minimal/low/moderate/high/very high)
   - Lag: 1 week
   - **State-Assessment Use**: Comparative activity severity across states

4. **NNDSS Weekly Data** (x9gk-5huc) — Weekly
   - Data: Notifiable diseases (TB, STIs, food-borne, etc.)
   - Lag: 1 week
   - **State-Assessment Use**: Multi-disease burden beyond respiratory

#### Chronic Disease (2 datasets)
5. **U.S. Chronic Disease Indicators** (hksd-2xuw) — Annual
   - Data: 125+ state-level indicators (diabetes, heart disease, stroke, etc.)
   - Lag: 1-2 years
   - **State-Assessment Use**: Chronic disease prevalence baseline

6. **BRFSS Historical Questions** (iuq5-y9ct) — Annual
   - Data: Behavioral Risk Factor Surveillance System
   - Lag: 1-2 years
   - **State-Assessment Use**: Lifestyle/risk factors contributing to disease

#### Injuries & Mortality (2 datasets)
7. **Drug Poisoning Mortality by County** (pbkm-d27e) — Annual
   - Data: Overdose mortality rates per 100,000
   - Lag: 1-2 years
   - **State-Assessment Use**: Opioid epidemic severity by state

8. **TBI-related Emergency Department Visits** (45um-c62r) — Annual
   - Data: Traumatic Brain Injury ED visits by demographics
   - Lag: 1-2 years
   - **State-Assessment Use**: Injury prevention priorities

9. **Provisional Death Counts for Influenza, Pneumonia, COVID-19** (ynw2-4viq) — Weekly
   - Data: Weekly provisional death counts by disease
   - Lag: 1-2 weeks
   - **State-Assessment Use**: Mortality trends (more sensitive than annual data)

#### Mental Health (2 datasets)
10. **Indicators of Anxiety or Depression** (8pt5-q6wp) — Weekly
    - Data: Anxiety/depression prevalence (last 7 days)
    - Lag: 2-3 days
    - **State-Assessment Use**: Mental health crisis indicators

11. **Mental Health Care in the Last 4 Weeks** (yni7-er2q) — Weekly
    - Data: % who received mental health care
    - Lag: 2-3 days
    - **State-Assessment Use**: Mental health access/treatment rates

#### Healthcare Access & Utilization
12. **Healthcare Access Indicators** (implied in BRFSS)
    - Data: Insurance coverage, preventive care access
    - Lag: 1-2 years

---

## Part 2: Dataset Backlog (Discovered but Not Yet Integrated)

### 3 High-Priority Datasets Ready to Add

1. **COVID-19 Test Positivity Data** (seuz-s2cv) — Weekly
   - Data: Test positivity rates by state
   - Lag: 1-2 weeks
   - **Value**: Complements ED visit data; shows transmission level
   - **For State Assessment**: Indicator of ongoing spread intensity

2. **Healthcare Syndromic Surveillance - Conditions** (v58w-vynu) — Daily
   - Data: ED visit percentages by condition (respiratory, GI, other) and age group
   - Lag: 1-2 days
   - **Value**: More granular than NSSP; adds age-stratification
   - **For State Assessment**: Age-specific disease burden (pediatric vs. adult)

3. **NNDSS - Notifiable Disease Surveillance** (x9gk-5huc) — Already listed above
   - Note: In backlog due to size constraints (pagination needed)
   - Currently integrated with 100k-row cap

---

## Part 3: Other CDC APIs & Measures Not Yet Integrated

### Tier 2: Likely Available via CDC SODA API

#### Vaccination Coverage (State-Level)
- **Immunization Coverage by Vaccine Type** (CDC.gov)
  - Data: %population vaccinated (COVID-19 boosters, flu, RSV, MPox, etc.)
  - Frequency: Weekly/Monthly
  - **For State Assessment**: Vaccination readiness for emerging threats

#### Environmental Health
- **Air Quality Indices by State** (EPA/CDC partnership)
  - Data: AQI, specific pollutants
  - Frequency: Daily
  - **For State Assessment**: Respiratory comorbidity risk

#### Food & Waterborne Illness
- **Foodborne Disease Outbreak Investigation** (CDC FoodNet)
  - Data: Outbreak counts, sources
  - Frequency: Weekly
  - **For State Assessment**: Food safety trends

#### Healthcare System Capacity
- **COVID-19 Hospitalization Data by State** (CDC)
  - Data: Current hospitalizations, ICU beds, ventilators
  - Frequency: Daily
  - **For State Assessment**: Healthcare system strain/resilience

#### Vector-Borne & Zoonotic Diseases
- **West Nile Virus Activity by State** (CDC)
  - Data: Case counts, deaths
  - Frequency: Weekly
  - **For State Assessment**: Seasonal vector-borne risk

- **Lyme Disease Cases by State** (CDC Lyme Surveillance)
  - Data: Confirmed cases
  - Frequency: Annual
  - **For State Assessment**: Regional endemic risk

### Tier 3: Specialized CDC Databases (May Require Special API Access)

#### Healthcare-Associated Infections (HAI)
- **NHSN HAI Data** (Hospital infections)
  - Data: C. difficile, MRSA, central-line infections
  - Lag: Quarterly
  - **For State Assessment**: Healthcare system safety culture

#### Substance Abuse & Mental Health Services
- **SAMHSA National Survey on Drug Use and Health (NSDUH)**
  - Data: Substance use disorders, mental illness prevalence
  - Lag: Annual
  - **For State Assessment**: Mental health & addiction burden

#### Cancer Incidence & Mortality
- **CDC Cancer Statistics** (SEER + CINA registries)
  - Data: Cancer rates by type, demographics
  - Lag: 1-2 years
  - **For State Assessment**: Long-term chronic disease trends

#### Reproductive Health
- **CDC Reproductive Health Surveillance**
  - Data: Birth rates, maternal mortality, contraceptive use
  - Lag: Annual/Monthly
  - **For State Assessment**: Women's health equity metrics

#### Disability & Health
- **CDC Disability Statistics**
  - Data: Disability prevalence, healthcare access
  - Lag: Annual
  - **For State Assessment**: Population vulnerability factors

---

## Part 4: State Assessment Enhancement Recommendations

### Immediate Priorities (Quick Wins - Phase 8)

**Add 3 Backlog Datasets to Current System:**
1. COVID-19 Test Positivity (seuz-s2cv) — Easy integration, high signal value
2. Healthcare Syndromic Surveillance by Condition (v58w-vynu) — Age-stratified insights
3. Resolve NNDSS pagination issue — Already in system, just needs cap increase

**Cost**: ~1-2 days integration time per dataset

**State Assessment Impact**:
- Test positivity + ED visits = Complete picture of respiratory transmission & clinical impact
- Age-stratified ED data = Identify whether kids/elderly disproportionately affected
- Multi-disease surveillance = Detect emerging threats beyond respiratory

---

### Medium-Term Enhancements (Phase 9-10)

**Vaccination Coverage Data** (Highest Value)
- Link vaccination rates to disease trends
- Identify vulnerability gaps by state
- Show "protection readiness" for emerging threats
- Example: RSV elderly vaccination rate vs. RSV ED visits

**Death Certificates & Provisional Mortality**
- Weekly death counts by cause already available (in Tier 1)
- Add CDC Wonder database for historical mortality trends
- Show mortality-to-cases ratio (case fatality rate) by state

**Healthcare Capacity Monitoring**
- Hospitalization trends (should exist in HHS Protect dataset)
- ICU bed availability
- Ventilator utilization
- Example: Compare NH (high elderly population) ICU strain during RSV season vs. CA (younger demographics)

---

### Lower Priority (Specialized Assessments)

- **Vector-borne diseases** (West Nile, Lyme) for geographic-specific risk
- **Cancer/chronic disease registries** for long-term burden assessment
- **Mental health access metrics** (already have prevalence; need access data)

---

## Part 5: API Queries for State-Based Assessments

### Core Query Pattern
```
GET /api/health-data?dataset={dataset_id}&state={state}&dateRange=7d|30d|90d|1y
Response: {
  state: "CA",
  metric: "ed_visits_respiratory_%",
  current: 4.2,
  7d_avg: 4.1,
  trend: "stable",
  rank_nationally: 12,
  peers: [TX, NY, FL],  // Similar-population states
  confidence: 0.95,
  lastUpdated: "2026-08-02"
}
```

### Example State Assessment Dashboard Queries
1. **Respiratory Situation**:
   - ED visits % (NSSP) + Test positivity (backlog) + Activity level (Tier 1) → Composite severity score
   
2. **Mortality vs. Morbidity**:
   - Death counts (Tier 1) ÷ Cases (NNDSS) → Case fatality rate trend
   
3. **Mental Health Crisis**:
   - Anxiety/depression indicators + Mental health care access → Gap identification
   
4. **Healthcare System Strain** (if hosp data added):
   - ED visits + Hospitalizations + ICU beds → Capacity utilization forecast

---

## Part 6: Implementation Roadmap

### Week 1 (This week)
- [ ] Add COVID-19 Test Positivity dataset to integration
- [ ] Add Healthcare Syndromic Surveillance by Condition
- [ ] Fix NNDSS pagination (increase cap to handle full dataset)
- [ ] Update StateAssessment component to use test positivity + ED visits

### Week 2-3
- [ ] Research CDC hospitalization dataset (HHS Protect?)
- [ ] Implement state-level peer comparison (similar-pop states)
- [ ] Add national ranking (e.g., "State ranks #12 nationally in RSV activity")
- [ ] Add trend direction + velocity (growing/stable/declining + speed)

### Week 4+
- [ ] Add vaccination coverage data
- [ ] Implement case-fatality rate trends
- [ ] Add demographic drill-down (age-stratified assessments)

---

## Summary

**Currently Available**: 12 datasets, strong coverage of infectious disease + mental health
**Quick Additions** (ready now): 3 more datasets for test positivity, age-stratification, full disease surveillance
**Research Needed**: 5-6 CDC datasets likely available (vaccination, hospitalization, mortality detail, environmental, vector-borne)

**Recommended Next Step**: Add the 3 backlog datasets first (Test Positivity, Condition-stratified ED, NNDSS pagination fix) to unlock immediate state-assessment improvements without new API research.
