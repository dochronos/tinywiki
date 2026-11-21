# Sprint 43 — Analytical Framework and Data Validation

## 1. Sprint objective

Establish a transparent analytical framework for TinyWiki Case Study #001 using the historical electricity baseline consolidated during Sprint 42.

The sprint focused on defining answerable research questions, documenting available indicators, identifying evidence gaps, and strengthening the traceability of selected historical consumption records.

The objective was to establish analytical readiness before developing dashboards, interpreting household energy performance, or modifying decision-support calculations.

## 2. Scope of work

The sprint covered five work areas:

1. Analytical framework definition.
2. Electricity consumption indicator catalog.
3. Historical data gaps documentation.
4. Targeted invoice-level consumption verification.
5. Updates to historical methodology and data quality documentation.

No changes to EcoBuild Insight calculation formulas or assumptions were included in this sprint.

## 3. Deliverables

| Deliverable | Description |
|---|---|
| `analytical-framework.md` | Defines research questions, indicators, evidence requirements, interpretation rules, and analytical limitations |
| `indicator-catalog.csv` | Catalogs proposed indicators, calculation methods, availability, and limitations |
| `data-gaps-register.csv` | Records identified evidence gaps, their status, and priority |
| `invoice-verification.csv` | Records targeted invoice-level verification for five historical consumption periods |
| `sprint43-report.md` | Documents sprint scope, activities, findings, and remaining work |
| `data-quality-report.md` | Updated with targeted invoice-level verification findings |
| `historical-data-methodology.md` | Updated with the verification procedure and its limitations |

## 4. Historical consumption profile

The sprint used the historical baseline established in Sprint 42.

| Metric | Documented result |
|---|---:|
| Consumption periods | 39 |
| Cumulative documented consumption | 17,089 kWh |
| Arithmetic average per documented period | 438.18 kWh |
| Total documented reading days | 2,377 days |
| Weighted daily consumption rate | Approximately 7.19 kWh/day |
| Billing installment records | 78 |
| Inventoried PDF files | 85 |
| Repeated PDF copies | 15 |

These values describe the available records only. The dataset does not represent a continuous monthly time series.

The arithmetic average per documented period must not be interpreted as an average monthly or annual household consumption figure.

## 5. Targeted invoice-level verification

A targeted verification procedure was conducted for five historical consumption periods:

| Billing period | Invoice consumption | Calculated reading difference | CSV consumption | Result |
|---|---:|---:|---:|---|
| 2019-04 | 624 kWh | 624 kWh | 624 kWh | Verified |
| 2019-05 | 761 kWh | 761 kWh | 761 kWh | Verified |
| 2019-06 | 962 kWh | 962 kWh | 962 kWh | Verified |
| 2020-04 | 1,078 kWh | 1,078 kWh | 1,078 kWh | Verified |
| 2020-05 | 1,300 kWh | 1,300 kWh | 1,300 kWh | Verified |

The procedure covered six source documents supporting five unique metering periods.

For each selected period, the invoice-printed consumption was compared with the difference between the current and previous meter readings and with the corresponding consumption CSV value.

All five comparisons were consistent.

The two installment documents associated with 2019-04 represent one metering period and one consumption measurement, not two separate consumption records.

### Verification limitations

This procedure verifies consistency between selected invoice values, their printed meter readings, and the corresponding CSV records.

It does not establish:

- Independent physical meter accuracy.
- The cause of the recorded consumption levels.
- The accuracy of every historical consumption record.
- Household occupancy or equipment conditions during the verified periods.

The targeted verification covers five of the 39 documented consumption periods. The remaining 34 periods were not included in this procedure.

## 6. Analytical findings and interpretation

The available records support descriptive analysis of:

- Cumulative documented electricity consumption.
- Arithmetic average per documented period.
- Reading duration.
- Daily consumption rates derived from period readings.
- Weighted daily consumption across documented reading days.
- Highest and lowest documented daily consumption rates.
- Historical documentation coverage.
- Nominal billing installment amounts.
- Selected invoice-level consumption consistency.

The available evidence does not yet support reliable conclusions about:

- The causes of historical consumption variations.
- Actual consumption during undocumented intervals.
- Comparable historical energy-only costs.
- Inflation-adjusted household electricity expenditure.
- The effect of occupancy, appliances, heating, cooling, or weather.
- The measured performance of future energy-efficiency interventions.

## 7. Data gaps and limitations

The sprint documented the following principal limitations:

| Area | Current limitation |
|---|---|
| Historical coverage | No recovered electricity invoices for 2021, 2022, or 2023 |
| Chronological continuity | A 1,337-day gap between 2020-09-03 and 2024-05-02 |
| Expected billing schedule | Not independently established |
| Original CSV amounts | Missing for 26 of 39 documented periods |
| Payment evidence | Payment status is `not_documented` for all 78 installments |
| Tariff analysis | No sufficiently comparable tariff component breakdown |
| Invoice verification | Five of 39 periods checked |
| Physical meter verification | No independent inspection evidence |
| Household context | Insufficient historical occupancy and equipment information |

The missing records must not be interpreted as zero consumption, service interruption, or non-payment.

Nominal installment amounts must not be treated as energy-only costs or as inflation-adjusted expenditure.

## 8. Methodological safeguards

The sprint reinforced the following analytical rules:

- Preserve source values and document provenance.
- Distinguish source evidence from calculated indicators.
- Do not interpolate undocumented periods.
- Do not count repeated PDF copies more than once.
- Distinguish billing installments from metering periods.
- Do not interpret missing payment documentation as non-payment.
- Do not infer causal explanations without supporting evidence.
- Document the scope and limitations of verification procedures.
- Keep original private source documents and audit material outside the public repository.
- Do not modify EcoBuild Insight formulas without evidence-based justification and explicit project review.

## 9. Current analytical readiness

| Area | Readiness |
|---|---|
| Historical consumption description | Available |
| Daily consumption rate analysis | Available, with coverage limitations |
| Historical documentation coverage | Available |
| Nominal billing description | Available |
| Comparable historical energy cost | Pending |
| Targeted invoice verification | Partially completed |
| Independent physical meter verification | Pending |
| Causal consumption analysis | Pending additional evidence |
| Intervention performance analysis | Pending future measurements |

## 10. Recommended next steps

The following activities remain relevant for subsequent project stages:

1. Review the remaining 34 documented consumption periods against their source invoices where practical.
2. Investigate whether additional records exist for currently undocumented intervals.
3. Establish the expected billing or reading schedule using available documentary evidence.
4. Obtain sufficiently detailed tariff components before attempting normalized historical cost analysis.
5. Begin collecting dated household electricity readings and relevant operational context.
6. Document equipment, occupancy, heating, cooling, and building characteristics as evidence becomes available.
7. Define future before-and-after measurement procedures for any energy-efficiency intervention.
8. Review analytical requirements before making changes to EcoBuild Insight.

These are recommendations, not completed sprint activities.

## 11. Sprint conclusion

Sprint 43 established an initial analytical framework for the historical electricity baseline and documented the limits of the available evidence.

The indicator catalog and data gaps register provide a structured basis for future analysis. The targeted invoice-level verification added documentary support for five selected consumption periods, confirming consistency between invoice values, meter-reading arithmetic, and the corresponding CSV records.

The historical dataset is suitable for descriptive analysis within its documented coverage. It is not yet sufficient for causal conclusions, fully normalized historical cost analysis, or evaluation of household energy-efficiency interventions.

The next project stages should prioritize evidence recovery, improved contextual measurements, and transparent validation before producing stronger energy-performance claims or modifying decision-support models.

---

- **Sprint:** 43
- **Project:** TinyWiki — Case Study #001
- **Focus:** Analytical framework and historical electricity data validation
**Status:** Documentation and analytical framework prepared; cross-document consistency review completed.
