# Sources and Methodology — Case Study 001

## Source material

The historical baseline is transcribed from user-provided EDEA invoice PDFs contained in year-based ZIP archives and separately uploaded invoice copies.

The original EDEA consumption-history CSV is retained through the `csv_importe_ars` field in the consumption dataset for periods where a corresponding value is available.

Original PDFs are not redistributed in this public package. Document IDs in the datasets are anonymized aliases.

## Unit of observation

- Consumption dataset: one row per EDEA billing/reading period.
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