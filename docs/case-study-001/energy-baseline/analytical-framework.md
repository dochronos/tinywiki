# Analytical Framework — Case Study #001

## 1. Purpose

This framework defines the analytical questions, indicators, evidence requirements, and limitations for the historical electricity baseline of TinyWiki Case Study #001.

Its purpose is to establish what can be reliably analyzed with the currently documented electricity consumption and billing records before building dashboards, drawing conclusions, or proposing changes to the household energy system.

The framework prioritizes traceable evidence and explicitly distinguishes documented facts, calculated indicators, estimates, assumptions, and questions that require additional information.

## 2. Analytical scope

The current analytical scope covers four areas:

1. Historical electricity consumption.
2. Historical documentation coverage and continuity.
3. Electricity billing records and their limitations.
4. Future household measurements and evidence collection.

The current baseline contains:

- 39 documented electricity consumption periods.
- 17,089 kWh of cumulative documented consumption.
- 78 billing installment records associated with those periods.
- 85 inventoried PDF files, including repeated copies.
- Five periods with targeted invoice-level consumption verification.
- No recovered electricity invoices for 2021, 2022, or 2023.

The documented periods are not a continuous monthly time series. Conclusions must account for incomplete historical coverage.

## 3. Evidence and analytical principles

### 3.1 Evidence hierarchy

Use the following evidence categories:

| Category | Meaning |
|---|---|
| Source document | Information transcribed from an original invoice or other source record |
| Validated record | Information checked against its source document |
| Calculated indicator | A reproducible calculation based on documented input data |
| Estimate | An approximation that depends on explicitly stated assumptions |
| Assumption | A condition adopted for analysis but not independently verified |
| Pending evidence | Information that is not currently available or sufficiently validated |

Do not present estimates or assumptions as measured facts.

### 3.2 General rules

- Preserve the original source values and their provenance.
- Do not interpolate undocumented consumption periods.
- Do not interpret missing records as zero consumption.
- Do not interpret `not_documented` payment status as evidence of non-payment.
- Do not count repeated PDF copies as additional billing periods or consumption measurements.
- Distinguish a billing installment from a metering period.
- Do not infer the cause of consumption changes without supporting evidence.
- Keep nominal historical ARS amounts separate from inflation-adjusted or normalized costs.
- Record the scope and limitations of every verification procedure.

## 4. Analytical area A — Electricity consumption

### 4.1 Research questions

| ID | Research question | Current evidence | Status |
|---|---|---|---|
| A-01 | How much electricity consumption is documented across the available periods? | 39 consumption records | Answerable |
| A-02 | What is the arithmetic average consumption per documented period? | Consumption values in the baseline CSV | Answerable with coverage caveat |
| A-03 | How long did each documented reading period last? | Reading start and end dates | Answerable |
| A-04 | What was the average daily consumption rate for each documented period? | Consumption and reading duration | Answerable |
| A-05 | What is the weighted daily consumption rate across all documented periods? | Total consumption and total documented days | Answerable with coverage caveat |
| A-06 | Which documented periods have the highest and lowest daily consumption rates? | Calculated daily rates | Answerable |
| A-07 | What caused the observed consumption variations? | No sufficient contextual evidence | Pending |

### 4.2 Core indicators

| Indicator ID | Indicator | Calculation | Interpretation and limitation |
|---|---|---|---|
| consumption_total_documented | Total documented consumption | Sum of documented kWh | Applies only to the 39 available periods |
| consumption_average_period | Average consumption per documented period | Total documented kWh / number of documented periods | Not a monthly or annual average |
| reading_duration | Reading duration | Reading end date - reading start date | Calculated for each documented period |
| daily_consumption_period | Daily consumption per period | Period kWh / reading duration in days | Derived rate, not a continuous daily measurement |
| daily_consumption_weighted | Weighted daily consumption | Total documented kWh / total documented reading days | Represents documented intervals only |
| daily_consumption_max | Maximum documented daily rate | Maximum period daily rate | Does not establish the cause of the peak |
| daily_consumption_min | Minimum documented daily rate | Minimum period daily rate | Does not establish the cause of the minimum |

### 4.3 Interpretation constraints

The current dataset contains 39 documented periods totaling 17,089 kWh.

The arithmetic average is approximately 438.18 kWh per documented period. The weighted daily consumption rate is approximately 7.19 kWh per documented reading day.

These indicators must not be interpreted as representative monthly or annual household consumption because the records do not cover a continuous sequence of periods.

The highest documented daily rates occur in 2020-05, 2020-04, 2019-06, 2019-05, and 2019-04.

The available invoice verification corroborates the printed consumption and meter-reading arithmetic for these five periods. It does not establish the physical accuracy of the meter or explain the reasons for the observed consumption levels.

Potential explanatory variables such as occupancy, appliances, heating, cooling, weather, or changes in household routines have not been sufficiently documented for this historical analysis.

## 5. Analytical area B — Historical coverage

### 5.1 Research questions

| ID | Research question | Current evidence | Status |
|---|---|---|---|
| B-01 | How many consumption periods are documented? | 39 records | Answerable |
| B-02 | Which calendar years have available records? | Consumption baseline | Answerable |
| B-03 | Where are the chronological gaps in the available records? | Reading start and end dates | Answerable |
| B-04 | Is the historical dataset a continuous time series? | Chronological coverage analysis | Answerable: no |
| B-05 | Are all expected historical invoices accounted for? | No complete expected billing schedule | Pending |

### 5.2 Core indicators

| Indicator ID | Indicator | Calculation | Interpretation and limitation |
|---|---|---|---|
| documented_period_count | Documented period count | Count distinct year and billing-period combinations | Counts available records, not expected periods |
| chronological_gap_count | Chronological gap count | Count gaps between consecutive documented reading intervals | Depends on the available records and date definitions |

### 5.3 Coverage limitations

The current documentation includes no recovered invoices for 2021, 2022, or 2023.

A chronological gap of 1,337 days exists between 2020-09-03 and 2024-05-02.

This gap describes the available documentation. It does not establish that electricity service was interrupted or that consumption was zero during the interval.

The expected billing or reading schedule has not yet been independently established. Therefore, the current inventory cannot establish the exact number of missing invoices.

## 6. Analytical area C — Electricity billing

### 6.1 Research questions

| ID | Research question | Current evidence | Status |
|---|---|---|---|
| C-01 | What nominal amounts are documented for each billing installment? | 78 billing records | Answerable |
| C-02 | Are payment statuses documented? | Payment status field | Answerable: no |
| C-03 | Can the historical energy-only cost be calculated? | No comparable tariff component breakdown | Pending |
| C-04 | Can nominal billing amounts be compared as real purchasing-power values? | No inflation adjustment in current baseline | Pending |
| C-05 | Can a reliable ARS/kWh indicator be calculated for every documented period? | Incomplete original CSV amounts and insufficient tariff detail | Pending |

### 6.2 Billing interpretation

The billing dataset contains 78 installment records associated with 39 documented consumption periods.

The recorded amounts are nominal ARS amounts transcribed from source documents. They may include fixed charges, energy charges, subsidies, taxes, and other components.

Consequently:

- An installment amount must not be treated as an energy-only charge.
- An installment amount must not automatically be treated as the total cost of its metering period.
- `not_documented` does not mean unpaid.
- Nominal ARS amounts must not be interpreted as inflation-adjusted values.
- Missing original CSV amounts must not be reconstructed from installment amounts without supporting evidence.

A normalized historical energy cost indicator remains pending until sufficiently comparable tariff component data and a documented calculation method are available.

## 7. Analytical area D — Document verification

### 7.1 Research questions

| ID | Research question | Current evidence | Status |
|---|---|---|---|
| D-01 | Do selected invoice consumption values match the consumption CSV? | Five targeted invoice verifications | Answerable for selected periods |
| D-02 | Does the printed consumption agree with the difference between the two meter readings? | Invoice-level reading arithmetic | Answerable for selected periods |
| D-03 | Has every documented consumption period been independently verified against its invoice? | Five of 39 periods checked | No |
| D-04 | Has the physical meter been independently inspected? | No independent inspection evidence | Pending |

### 7.2 Verification scope

Five periods have been checked against six source documents:

- 2019-04
- 2019-05
- 2019-06
- 2020-04
- 2020-05

For these periods, the invoice-printed consumption, calculated reading difference, and consumption CSV value agree.

Two installment documents for 2019-04 represent one metering period and one consumption measurement.

This verification establishes consistency between selected invoice values, their printed meter readings, and the corresponding CSV records. It does not constitute an independent physical meter audit.

The remaining 34 documented consumption periods have not been covered by this targeted verification procedure.

## 8. Future measurements and evidence collection

The historical baseline alone cannot explain household energy demand or establish the performance of future efficiency interventions.

Future analysis should progressively collect evidence that allows consumption to be related to actual household conditions.

Potential evidence categories include:

| Evidence category | Examples | Analytical purpose |
|---|---|---|
| Electricity readings | Dated meter readings and utility invoices | Track consumption over time |
| Household occupancy | Number of occupants and relevant schedule changes | Document contextual changes |
| Electrical equipment | Equipment inventory, rated power, operating schedules | Identify potential demand contributors |
| Heating and cooling | Equipment type, usage, and operating hours | Document seasonal and operational context |
| Indoor conditions | Temperature and humidity measurements | Evaluate comfort and building performance |
| Building characteristics | Insulation, windows, orientation, and construction details | Document relevant building conditions |
| Intervention records | Installation dates, specifications, and costs | Establish before-and-after comparison context |
| Renewable generation | Inverter readings and generation records | Distinguish grid consumption from on-site generation |

These are proposed future evidence categories, not measurements currently available in the historical baseline.

Any future comparison should define its measurement period, data source, calculation method, and relevant limitations.

## 9. Questions requiring additional evidence

The following questions must remain open until the necessary evidence is collected:

- What explains the high daily consumption rates documented in 2019 and 2020?
- What was the household's actual electricity consumption during undocumented intervals?
- What was the household's energy cost after separating comparable tariff components?
- What were the effects of occupancy and household routines on demand?
- What is the contribution of individual appliances and heating or cooling systems?
- How does building performance affect electricity demand?
- What measurable changes follow future energy-efficiency interventions?
- What is the actual contribution of future on-site renewable generation?

No causal conclusion or intervention performance claim should be made solely from the current historical consumption dataset.

## 10. Analytical readiness

| Analytical area | Current readiness | Main limitation |
|---|---|---|
| Historical consumption | Available for descriptive analysis | Incomplete chronological coverage |
| Daily consumption rates | Available for descriptive analysis | Derived from billing-period readings |
| Historical coverage | Available for documentation analysis | Expected billing schedule not established |
| Billing amounts | Available for nominal descriptive analysis | Tariff components not normalized |
| Invoice verification | Partially available | Five of 39 periods checked |
| Causal consumption analysis | Not ready | Missing household and equipment context |
| Intervention performance analysis | Not ready | No sufficiently documented before-and-after measurements |

## 11. Relationship with future project decisions

This framework is intended to guide subsequent analysis and evidence collection.

It does not authorize automatic changes to EcoBuild Insight formulas, assumptions, or recommendations.

Any future model adjustment must identify:

1. The source evidence supporting the change.
2. The assumptions introduced.
3. The calculation method.
4. The limitations and uncertainty.
5. The validation required before using the result for a real-world decision.

Technical recommendations involving electrical installations, structural modifications, or building systems must be evaluated by appropriately qualified professionals.

## 12. Conclusion

The historical electricity baseline provides a useful starting point for descriptive analysis of documented consumption, reading duration, daily consumption rates, and selected invoice-level verification.

Its principal limitation is incomplete historical coverage, combined with insufficient contextual and tariff-component evidence for causal or normalized-cost analysis.

The next analytical stages should prioritize transparent reporting, targeted evidence recovery, and the establishment of reliable future measurements before making household energy-performance claims or changing decision-support models.
