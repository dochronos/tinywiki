# Data Quality Report — Case Study 001

## Extraction summary

| Metric | Result |
|---|---:|
| Recovered PDF files across ZIPs and separate uploads | 85 |
| Documents flagged as repeated copies | 15 |
| Unique invoice-installment records | 78 |
| Unique consumption periods | 39 |
| Years with recovered records | 8 |
| Years without recovered invoices | 2021–2023 |
| Total recorded consumption | 17,089 kWh |
| Average per documented period | 438.18 kWh |

The inventory retains repeated copies for provenance. Repeated copies are not counted again in the billing or consumption datasets.

## Coverage by year

| Year | Periods | Recorded consumption (kWh) | Coverage |
|---|---:|---:|---|
| 2016 | 1 | 359 | Partial |
| 2017 | 6 | 2,150 | Six periods recovered |
| 2018 | 6 | 1,835 | Six periods recovered |
| 2019 | 6 | 3,513 | Six periods recovered |
| 2020 | 5 | 3,605 | Partial |
| 2021 | 0 | — | No recovered invoices |
| 2022 | 0 | — | No recovered invoices |
| 2023 | 0 | — | No recovered invoices |
| 2024 | 3 | 1,402 | Partial |
| 2025 | 6 | 2,144 | Six periods recovered |
| 2026 | 6 | 2,081 | Six periods recovered |

These totals are sums of the recovered periods only. Partial-year totals are not annual consumption estimates and should not be compared as though coverage were equal.

The total of 17,089 kWh is the sum of the 39 documented consumption periods. The arithmetic average of 438.18 kWh is calculated per documented period; it is not a monthly average or a continuous historical consumption estimate.

## Chronological coverage

| Metric | Result |
|---|---|
| First documented reading period start | 2016-09-01 |
| Last documented reading period end | 2026-11-02 |
| Chronological gaps detected | 1 |
| Overlaps detected | 0 |
| Gap duration | 1,337 days |
| Last reading before gap | 2020-09-03 |
| First reading after gap | 2024-05-02 |

The only detected chronological gap is between the end of period 05/20 and the beginning of period 04/24.

No consumption values are interpolated or estimated for this interval.

## Repeated copies and multi-page PDFs

- The 2016 archive includes a PDF containing both installments for 06/16 and another copy of installment 2. The repeated copy is retained in `document-inventory.csv`, while installment 2 is counted once in the billing dataset.
- Some PDFs contain two invoice pages, each representing a separate installment. This occurs in the recovered 2019 and 2020 material, among others. PDF file count is therefore not equal to invoice count.
- Separate 2026 uploads include repeated copies of invoices also present in the 2026 ZIP, plus duplicate copies of the two 05/26 installments. These are retained in the inventory but not double-counted in the billing dataset.
- For period 05/26, `2026_document_78` is identified as a duplicate of `2026_document_77`, and `2026_document_82` as a duplicate of `2026_document_74`.

A total of 15 documents are flagged as repeated copies in the inventory.

## Structural and referential validation

The following checks were executed against the consolidated CSV files:

| Check | Result |
|---|---|
| Duplicate consumption periods | None detected |
| Billing periods with missing or repeated installments | None detected |
| Duplicate billing keys (year, period, installment) | None detected |
| Consumption periods without billing records | None detected |
| Billing periods without consumption records | None detected |
| Source document IDs missing from inventory | None detected |
| Chronological overlaps | None detected |
| Chronological gaps | One detected |

Each documented billing period has two installment records, numbered 1 and 2.

All 78 billing records have `payment_status` set to `not_documented`. This means payment evidence was not available in the sources used; it does not mean that the invoices were unpaid.

## Targeted invoice-level consumption verification

A documentary cross-check was completed for five selected consumption periods:

| Billing period | Invoice consumption (kWh) | Calculated from meter readings (kWh) | Dataset consumption (kWh) | Result |
|---|---:|---:|---:|---|
| 2019-04 | 624 | 624 | 624 | Verified |
| 2019-05 | 761 | 761 | 761 | Verified |
| 2019-06 | 962 | 962 | 962 | Verified |
| 2020-04 | 1,078 | 1,078 | 1,078 | Verified |
| 2020-05 | 1,300 | 1,300 | 1,300 | Verified |

All five selected periods matched across the invoice, the arithmetic difference between the printed meter readings, and `electricity-consumption.csv`.

The verification involved six invoice documents for five unique metering periods. The two documents for 2019-04 represent separate installments of the same consumption period and are not counted as separate measurements.

**Scope and limitations:**

- The check confirms documentary and arithmetic consistency for these five periods.
- It does not independently verify the physical meter or its accuracy.
- It does not establish the cause of the recorded consumption levels.
- It does not constitute a complete invoice-level re-audit of all 39 consumption periods.

Detailed period-level results are available in `invoice-verification.csv`. Original invoices and personal identifiers are excluded from the public repository.

## Economic reconciliation with the original EDEA CSV

The `csv_importe_ars` field was compared with the two installment amounts and their sum for each consumption period.

| Comparison result | Periods |
|---|---:|
| CSV amount matches installment 1 | 8 |
| CSV amount matches both installments individually | 5 |
| CSV amount matches installment 2 only | 0 |
| CSV amount matches the sum of both installments | 0 |
| No exact match | 0 |
| CSV amount unavailable | 26 |
| **Total consumption periods** | **39** |

For the 13 periods with a CSV amount, all comparisons produced an exact match with an individual installment amount. In five periods, both installments have the same amount, so the CSV amount matches each installment individually.

In none of the 13 comparable periods does the CSV amount match the sum of both installments.

This is an observed relationship in the available records. It should not be generalized as a universal billing rule without further evidence.

The 26 periods without a CSV amount remain without a comparable value. Their invoice installment amounts are still available in `electricity-billing.csv`.

## Data interpretation and limitations

- Consumption is recorded once per billing period, not once per installment.
- Installment amounts are nominal ARS amounts as printed on each invoice. They are not inflation-adjusted.
- No normalized ARS/kWh series is produced. Invoice totals can include fixed charges, energy charges, subsidies, taxes, and other levies.
- Payment status is not inferred from invoice issuance or due dates. The value `not_documented` indicates absence of payment evidence in the reviewed sources.
- The original EDEA CSV's `Importe` field is preserved separately in `csv_importe_ars`. It is not treated as the total amount billed for a consumption period.
- Dates are transcribed as day/month/year from the invoices and stored as ISO dates (`YYYY-MM-DD`).
- Missing periods are not interpolated, and partial-year totals are not annualized.
- The documented-period average is not representative of a continuous monthly or annual baseline because the historical series contains incomplete years and a 1,337-day gap.
- Tariff components have not been independently reconciled across all historical invoices.
- Original PDF files are not included in the public repository.

## Validation status

Structural validation and document-reference checks passed.

Economic reconciliation is partial: all 13 available CSV amounts match an individual installment amount, while 26 periods have no CSV amount available for comparison.

The consolidated dataset is suitable as a traceable historical record of recovered consumption and billing documents, subject to the coverage limitations described above. It should not be interpreted as a complete continuous energy or cost baseline for the entire 2016–2026 interval.