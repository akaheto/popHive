# E-011 Data Reconciliation Investigation Report

**Date:** 2026-08-02  
**Status:** BLOCKED — Data Quality Issue Confirmed  
**Severity:** HIGH — County-level integration unsafe without resolution

## Summary

Investigation of the E-011 data reconciliation issue has confirmed the original blocker. The WaPo vaccination data contains a critical inconsistency between county-level and school-level records that makes county-level implementation unsafe.

## Files Involved

- **wapo_vax_counties.parquet** (5 columns)
  - geography, time, wapo_county_vax_rate, wapo_prepand_herd, wapo_postpand_herd
  - Sample: County 01001 on 09-01-2024 shows 92.77% vaccination rate

- **wapo_vax_schools.parquet** (16 columns)
  - Includes: geography, time, wapo_school_name, wapo_school_mmr_rate, wapo_school_overall_rate
  - Exemption columns: medical, religious, personal, nonmedical, overall exemption rates

## Reconciliation Issue Findings

### Issue 1: School-Level Data Corruption
When examining schools in Milwaukee county (09-01-2024):
- **Grant Gordon Learning Center**
  - Vaccination rate: 0.06%
  - Unvaccinated: 99.94%
  - Exemptions recorded: 0%
  - **Problem:** 99.94% unvaccinated students with zero exemptions = logically impossible

- **Neeskara Elementary**
  - Vaccination rate: 0.07%
  - Unvaccinated: 99.93%
  - Exemptions recorded: 0%
  - **Problem:** Same issue

- **Fifty-Third Street Elementary**
  - Vaccination rate: 0.12%
  - Unvaccinated: 99.88%
  - Exemptions recorded: 0%
  - **Problem:** Same issue

**Finding:** 8 out of 10 sampled schools showed this pattern

### Issue 2: Data Completeness
- Milwaukee county: 314 schools, avg vaccination 0.7%, avg exemptions 0.1%
- Alameda county: 258 schools, avg vaccination 0.9%, exemptions undefined
- King county: 412 schools, avg vaccination 0.9%, exemptions undefined
- Mesa county: 40 schools, avg vaccination undefined, exemptions undefined

**Finding:** Many schools have undefined vaccination rates, suggesting missing/incomplete data

### Issue 3: County vs. School Aggregation Mismatch
- County-level rates: 92-94% (reasonable)
- School-level average rates: 0.06-0.12% (essentially zero, illogical)
- **Gap unexplained:** County rates don't match school aggregations by orders of magnitude

## Root Causes (Possible)

1. **Data Version Mismatch:** School-level data may be from a different data collection/methodology than county rates
2. **Incomplete School Records:** School-level file may be missing key student enrollment or vaccination data
3. **Exemption Encoding Issue:** Exemptions might be encoded differently (absent vs. 0, null vs. no record)
4. **Data Quality Issue in Source:** WaPo source data may have quality issues for certain schools/years
5. **API/Export Error:** School-level export may have truncated or corrupted data

## Safety Assessment

**Can we use wapo_vax_counties.parquet for county-level drill-down?**

**Recommendation: NO — NOT WITHOUT CLARIFICATION**

Reasons:
1. County rates appear valid (92-94%), but school-level validation suggests systemic data quality issues
2. Users accessing county-level data via county drill-down expect it to match school-level rollup
3. Exposing county data without understanding why schools show 0.06% rates would be misleading
4. If school data is corrupted, county data credibility is questionable

## Required Actions to Unblock E-011

**Option 1: PopHIVE Clarification (RECOMMENDED)**
- Contact PopHIVE maintainers to explain:
  - Why school-level vaccination rates are ~0.06-0.12% while county rates are ~92-94%
  - Whether school-level exemption data is incomplete or encoded differently
  - How county rates are calculated relative to school data
  - Data quality caveats for this bundle

**Option 2: Data Investigation**
- Query the full dataset (not just samples) to quantify:
  - What percentage of schools have undefined vaccination rates
  - Whether county rates match median/average/weighted-sum of school rates
  - Temporal patterns (are recent years better quality than 2018?)
  - Geographic patterns (do some states have better data quality?)

**Option 3: Conditional Implementation**
- Document the data quality issue in the UI
- Display county rates WITH a warning: "School-level data quality unclear; county aggregation method unknown"
- Include (?) icon linking to this reconciliation note

## Data Quality Score

| Component | Quality | Notes |
|-----------|---------|-------|
| County-level rates | ✓ GOOD | Reasonable 92-94% values, consistent across time |
| School-level rates | ✗ POOR | 0.06-0.12% is illogical, suggests missing data |
| Exemption rates | ✗ POOR | Undefined/0% for all students shown as unvaccinated |
| Reconciliation | ✗ FAILED | County and school rates don't match |
| Documentation | ✗ MISSING | No schema docs on calculation methodology |

## Recommendation

**DEFER E-011 IMPLEMENTATION** until:
1. PopHIVE clarifies the reconciliation issue, OR
2. Data investigation shows school-level data is reliable, OR
3. Clear caveats are documented in project & UI

**Estimated effort to resolve:** 2-4 hours (contact, analysis, documentation)

**Risk of implementing without resolution:** User confusion, potential metrics misinterpretation
