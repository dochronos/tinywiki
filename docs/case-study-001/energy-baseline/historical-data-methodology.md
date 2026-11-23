# Sources and Methodology — Case Study 001

## Source material

The historical baseline is transcribed from user-provided EDEA invoice PDFs contained in year-based ZIP archives and separately uploaded invoice copies.

The original EDEA consumption-history CSV is retained through the `csv_importe_ars` field in the consumption dataset for periods where a corresponding value is available.

Original PDFs are not redistributed in this public package. Document IDs in the datasets are anonymized aliases.

## Unit of observation

- Consumption dataset: one row per EDEA billing period, with the associated meter-reading interval and recorded consumption.
- `billing_period` preserves the period label printed by EDEA (for example, `05/26`). It must not be interpreted automatically as the calendar month in which the electricity was consumed.
- `reading_start_date` and `reading_end_date` delimit the actual meter-reading interval associated with the recorded consumption.
- `consumption_kwh` represents the consumption recorded over that reading interval. The interval may span calendar months and may not coincide with the billing-period label.
- Billing dataset: one row per invoice installment.
- Document inventory: one row per recovered PDF file, including repeated copies.

A single PDF can contain multiple invoice pages. Therefore, PDF count, invoice count, and consumption-period count are distinct quantities.

## Extraction

Consumption values, period labels, installment numbers, due dates, nominal invoice amounts, and meter reading dates were transcribed from the invoice pages.

Reading dates were interpreted in DD/MM/YYYY format and stored as ISO 8601 dates (`YYYY-MM-DD`).

The `csv_importe_ars` field preserves the raw historical CSV amount for matching periods. Its meaning is not assumed to be the total amount billed for a consumption period.

Payment status is represented by `not_documented` when no payment evidence was available in the reviewed source material. Invoice issuance or due dates are not treated as proof of payment.

## Data consolidation

The consolidation follows these rules:

1. Consumption is represented once per reading period, not once per installment.
2. Each invoice installment is represented as a separate billing record.
3. Repeated PDF copies are retained in the document inventory for provenance but are not counted again in the billing or consumption datasets.
4. A PDF containing two installment pages is inventoried as one document while its two installments are represented separately in the billing dataset.
5. Missing periods are left missing.
6. Original nominal amounts are preserved without inflation adjustment or tariff normalization.

## Validation

The following structural and referential checks were performed:

1. No duplicate consumption-period keys were detected.
2. Each billing period contains two installment records, numbered 1 and 2.
3. No duplicate billing keys (year, period, installment) were detected.
4. Every consumption period has corresponding billing records.
5. Every billing period has a corresponding consumption record.
6. All source document IDs referenced by the datasets exist in the document inventory.
7. Chronological reading dates were checked for gaps and overlaps.

The chronological review identified one gap of 1,337 days between 2020-09-03 and 2024-05-02. No overlaps were detected.

## Targeted invoice-level consumption verification

An initial targeted documentary verification was performed for five consumption periods with comparatively high recorded consumption:

- 2019-04: 624 kWh
- 2019-05: 761 kWh
- 2019-06: 962 kWh
- 2020-04: 1,078 kWh
- 2020-05: 1,300 kWh

During Sprint 44, an additional EDEA billing period was reviewed as a documentary consistency check:

- Billing-period label 05/26 (dataset key: 2026-05): 370 kWh recorded over the meter-reading interval from 2026-07-02 to 2026-09-03.

The `2026-05` dataset key preserves the billing-period label; it does not mean that the 370 kWh were consumed during calendar May 2026. The associated reading interval is the relevant time span for interpreting this consumption value.

For each period, three values were compared:

1. Consumption printed on the invoice.
2. Consumption calculated as the difference between the current and previous meter readings.
3. Consumption recorded in `electricity-consumption.csv`.

All six periods matched across the three values. The results are recorded in `invoice-verification.csv`.

The verification covered eight invoice documents supporting six unique metering periods:

- For 2019-04, the two installments were found in separate PDF documents.
- For 2019-05, 2019-06, 2020-04, and 2020-05, both installments were contained in a single PDF per period.
- For billing-period label 05/26 (dataset key: 2026-05), the two installments were found in separate PDF documents. Both display identical meter readings and the same consumption value of 370 kWh. The arithmetic difference between the printed readings also equals 370 kWh. These are two installment records for one billing/reading period, not two separate measurements.

Installment invoices represent separate billing records, not separate consumption measurements. Their consumption values must not be added together.

For billing-period label 05/26, the reviewed installment PDFs are EDEA-issued documents obtained through EDEA email communications or its website. The inventory classifies the two files as loose uploads, while corresponding PDFs are also present in the current 2026 ZIP archive. This is a file-organization and inventory-mapping discrepancy; the issuer and source of the invoices are confirmed as EDEA. It does not change the technical consistency result.

The verification establishes consistency between the invoice's printed consumption, the arithmetic of the readings shown on the invoice, and the consolidated consumption dataset. It does not constitute an independent physical meter inspection, an assessment of meter accuracy, or an explanation of the recorded consumption levels.

This was a targeted check, not a complete invoice-level re-audit of all 39 documented consumption periods. The six verified periods must not be taken as evidence that every historical record has undergone the same procedure.

## Economic reconciliation

The `csv_importe_ars` field was compared with the amounts of installment 1, installment 2, and the sum of both installments for the same period.

Of the 39 consumption periods:

- 13 have an amount available in the original EDEA CSV.
- 8 of those amounts match installment 1.
- 5 match both installments individually because the two installment amounts are equal.
- None matches the sum of both installments.
- 26 periods have no CSV amount available for comparison.

These results describe the available records only. They do not establish a universal billing rule for all periods.

The CSV amount and the invoice installment amounts remain separate fields and sources. They are not merged or substituted for one another.

## Evidence classifications and limitations

The invoice PDF is the documentary source for the transcribed invoice fields. The original EDEA CSV is the source for values preserved in `csv_importe_ars`.

The consolidated package distinguishes between:

- Documented consumption: values transcribed from recovered invoices.
- Documented billing: nominal installment amounts transcribed from invoice pages.
- Historical CSV amounts: values preserved from the EDEA history export where available.
- Not documented: information for which the reviewed sources do not provide evidence, including payment status for all 78 billing records.
- Documentary gaps: periods without recovered invoice records.

The total recorded consumption of 17,089 kWh is the sum of 39 documented periods. The arithmetic average of 438.18 kWh is calculated per documented period and must not be interpreted as a monthly or annual average.

This package is a structured historical consolidation, not a complete continuous record of the dwelling's electricity consumption or expenditure.

No missing values are interpolated, no partial-year totals are annualized, and no inflation adjustment or tariff normalization is performed.

Nominal invoice amounts may include fixed charges, energy charges, subsidies, taxes, and other levies. They are not treated as an energy-only unit price.

The following activities remain outside the scope of this consolidation:

- Independent verification of every historical tariff component.
- Confirmation of all historical billing interpretations by EDEA.
- Reconstruction of consumption during the 1,337-day documentary gap.
- Inflation-adjusted comparison of historical invoice amounts.
- Development or modification of EcoBuild Insight calculation parameters.

## Reproducibility and privacy

The CSV datasets preserve anonymized document aliases so that each consolidated record can be traced back to the corresponding entry in the inventory.

Original PDF files and personal identifiers are excluded from the public repository.