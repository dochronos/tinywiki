# Sources and Methodology — Case Study #001

- **Project:** TinyWiki
- **Case Study:** #001 — Existing Home Energy Transition
- **Workstream:** Sprint 41.1 — Electricity Baseline
- **Status:** Initial documented baseline
- **Last updated:** November 8, 2026

## 1. Purpose

This document describes the sources, data structure, transcription criteria, and methodological limitations used to establish the initial electricity baseline for Case Study #001.

The objective is to reconstruct the available historical electricity consumption and billing records for the specific dwelling under study.

This baseline is case-specific. It must not be interpreted as representative of other homes, households, or locations.

## 2. Scope

The initial dataset contains:

- 13 billing-period consumption records extracted from an EDEA electricity-history CSV.
- 12 individual installment records transcribed from the EDEA Web portal.
- 8 invoice PDF documents covering four billing periods in 2026 (two installments per period).

The available consumption records cover selected periods from 2024 to 2026. They do not constitute a continuous historical series.

## 3. Primary Sources

### 3.1 EDEA consumption-history CSV

**Source:** Electricity consumption history exported from the EDEA customer portal.

**Available information:**
- Year
- Billing period
- Consumption (kWh)
- Amount (ARS)

The original `Importe` field is preserved in the dataset as `csv_importe_ars`.

Its precise accounting meaning has not yet been formally confirmed.

### 3.2 EDEA Web billing records

**Source:** Billing and payment information displayed in the EDEA customer portal.

**Available information:**
- Billing period
- Installment number
- Due date
- Amount (ARS)
- Payment date
- Payment status

Twelve individual installment records were transcribed for six billing periods.

### 3.3 EDEA invoice PDFs

Eight invoice PDFs are available for billing periods 2026-02 through 2026-05.

Each period has two invoices corresponding to installments 1 and 2. They represent two billing documents associated with the same consumption period, not two independent consumption measurements.

The PDFs provide additional information about billing concepts, tariff classification, consumption periods, and applicable tariff references.

## 4. Data Structure

Two datasets are maintained separately.

### 4.1 Electricity consumption

File: `electricity-consumption.csv`

One row represents one billing-period consumption record.

The `consumption_kwh` field must not be duplicated or summed twice because the billing period has two installments.

Reading dates are included only when they have been identified in the available invoice documentation.

### 4.2 Electricity billing

File: `electricity-billing.csv`

One row represents one individual invoice installment.

The amounts of both installments may be added when calculating the documented total billed amount for a period, provided that the underlying records have been verified.

Billing records and consumption records must remain separate to avoid double-counting energy consumption.

## 5. Data Classification

All information must be classified according to its evidentiary status.

| Classification | Meaning | Current application |
|---|---|---|
| Documented data | Information transcribed from an identifiable source | EDEA CSV, portal records, invoice PDFs |
| Utility-recorded consumption | Consumption values reported by EDEA | kWh values in the consumption dataset |
| Independently measured data | Measurements collected directly through project instrumentation | Not available yet |
| Estimate | A value derived through an explicit estimation method | Not established in this baseline |
| Assumption | A value adopted provisionally for analysis | Must be explicitly identified when introduced |
| Pending validation | Information requiring confirmation or additional evidence | CSV `Importe` interpretation and missing historical records |

EDEA consumption values are documented utility records. They are not independent measurements collected by the project.

## 6. Transcription and Interpretation Rules

1. Consumption values are recorded once per billing period.
2. Installment amounts are recorded separately.
3. Two installments do not represent two independent consumption periods.
4. The original CSV `Importe` value is preserved without assuming that it represents the complete billing-period amount.
5. Dates are transcribed only when supported by available documentation.
6. Empty date fields indicate unavailable information, not estimated dates.
7. Monetary amounts are nominal ARS values from their respective billing dates.
8. No inflation adjustment has been applied.
9. No validated effective electricity cost per kWh has been calculated.

### 6.1 CSV amount ambiguity

For periods 2026-01 through 2026-04, the CSV `Importe` value matches the first installment amount shown in the portal.

For period 2026-05, the CSV value matches both installment amounts.

This observed relationship does not establish the formal meaning of the CSV field. Confirmation from EDEA or additional billing documentation is required.

### 6.2 Example: billing period 2026-05

The available records show:

- Consumption: 370 kWh.
- Installment 1: ARS 47,330.44.
- Installment 2: ARS 47,330.44.
- Documented total of both installments: ARS 94,660.88.

The consumption remains 370 kWh. It must not be doubled.

The invoice breakdown also includes taxes, contributions, and other billing components. Therefore, the total invoice amount divided by consumption must not automatically be interpreted as the energy tariff per kWh.

## 7. Limitations

The current baseline has the following limitations:

- Historical consumption coverage is partial.
- Some billing periods lack downloadable invoice PDFs.
- Exact reading dates are not available for every period.
- The meaning of the CSV `Importe` field remains unconfirmed.
- Historical tariff breakdowns are incomplete.
- Nominal ARS amounts have not been adjusted for inflation.
- No independent electricity monitoring data is currently available.

The available evidence is insufficient to establish a fully validated historical effective electricity cost per kWh.

## 8. Privacy and Data Handling

The public repository must not contain personal or account-identifying information.

The published datasets exclude:
- Customer names
- Addresses
- Account identifiers
- Meter identifiers
- Payment codes
- Invoice numbers

Original invoices and unmodified source exports must be retained privately.

Any additional public evidence must be reviewed for personal and account information before publication.

## 9. Pending Validation and Next Steps

1. Obtain historical invoice PDFs or detailed billing breakdowns for periods 2025-06 and 2026-01.
2. Verify exact consumption reading dates for all available periods.
3. Request historical reading and billing information from EDEA where portal downloads are unavailable.
4. Confirm the formal meaning of the CSV `Importe` field.
5. Reconcile invoice components before defining an effective electricity cost per kWh.
6. Document any future assumptions and estimates separately from source records.

## 10. Methodological Principle

This baseline prioritizes traceability over completeness.

No missing value should be silently inferred, no estimate should be presented as a documented fact, and no preliminary economic calculation should be treated as a validated result.

Technical proposals derived from this case study do not replace professional assessments by qualified architects, engineers, electricians, or other relevant specialists.
