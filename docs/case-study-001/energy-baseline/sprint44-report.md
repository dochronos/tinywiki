# Sprint 44 — Extended Invoice-Level Verification

## 1. Sprint objective

Extend the documentary verification of the historical electricity-consumption dataset from five to six selected billing periods by reviewing the EDEA invoices for billing-period label 05/26.

The objective was to check whether the consumption recorded in the historical dataset is consistent with the consumption and meter readings printed on the selected source documents.

## 2. Scope of work

This sprint focused on:

- Reviewing the two installment invoices for EDEA billing-period label 05/26.
- Comparing the printed consumption and meter readings with the historical dataset.
- Updating the invoice-level verification record.
- Updating the historical data methodology and data quality report.
- Documenting the additional verification and its limitations.

The work did not modify the original electricity-consumption dataset, historical baseline calculations, or EcoBuild Insight formulas.

## 3. Deliverables

The following project records were updated:

- `invoice-verification.csv`
- `historical-data-methodology.md`
- `data-quality-report.md`

This report documents the additional verification performed during Sprint 44.

## 4. Additional verification for EDEA billing-period label 05/26

EDEA billing-period label 05/26 (dataset key: 2026-05) was reviewed using two EDEA-issued installment invoices. The recorded consumption of 370 kWh corresponds to the meter-reading interval from 2026-07-02 to 2026-09-03. The dataset key preserves the billing-period label; it does not identify calendar May 2026 as the consumption month.

- Installment 1 of 2.
- Installment 2 of 2.

Both installment invoices show identical meter readings and the same printed consumption:

| Verification field | Result |
|---|---|
| Meter-reading interval | 2026-07-02 to 2026-09-03 |
| Printed consumption | 370 kWh |
| Reading arithmetic | Consistent with 370 kWh |
| Historical dataset | 370 kWh |
| Cross-document consistency | Both invoices agree |

The exact meter readings are intentionally omitted from this public report. The printed consumption matches the value recorded in the historical dataset.

The two invoices represent installments associated with one consumption period. They are not separate meter measurements and must not be added together.

## 5. Extended verification results

The targeted documentary verification now covers six selected billing periods and eight invoice documents.

| Dataset key / EDEA billing-period label | Verified consumption |
|---|---:|
| 2019-04 | 624 kWh |
| 2019-05 | 761 kWh |
| 2019-06 | 962 kWh |
| 2020-04 | 1,078 kWh |
| 2020-05 | 1,300 kWh |
| 2026-05 (EDEA label: 05/26) | 370 kWh |

For all six selected periods, the reviewed invoice consumption is consistent with the corresponding historical dataset value.

The invoices for EDEA billing-period label 05/26 were confirmed as EDEA-issued documents obtained through EDEA email communications or its website. Their recorded consumption corresponds to the 2026-07-02 to 2026-09-03 reading interval, not calendar May 2026.

A file-organization and inventory-mapping discrepancy was identified: the inventory classifies document IDs 74 and 77 as loose uploads, while corresponding PDFs are also present in the current 2026 ZIP archive. This discrepancy does not change the technical consistency result or the confirmed issuer and source of the invoices.

## 6. Verification limitations

The historical dataset contains 39 documented consumption periods. Six periods have now been included in this targeted invoice-level verification; the other 33 periods have not been subjected to the same procedure.

This is a selected documentary check, not a complete audit of the historical dataset.

The verification does not establish:

- The physical accuracy or calibration of the electricity meter.
- The accuracy of every historical record outside the selected periods.
- The causes of changes in electricity consumption.
- Historical occupancy patterns or equipment usage.
- The composition of tariffs or the total amount billed for each period.
- Whether invoices were paid.

The check for EDEA billing-period label 05/26 confirms consistency between the selected invoice readings, printed consumption, and the historical dataset. It does not establish broader conclusions beyond that scope.

## 7. Methodological safeguards

The project continues to distinguish between:

- **Documented evidence:** information directly visible in the reviewed source documents.
- **Dataset values:** records preserved in the historical consumption dataset.
- **Calculated values:** arithmetic checks derived from documented readings.
- **Estimates and assumptions:** values that require additional evidence or explicit qualification.
- **Pending validation:** questions that cannot be resolved with the available documentation.

Installment invoices are treated as payment documents associated with a consumption period, not as independent consumption measurements.



No technical, financial, or operational conclusion should be presented as verified unless supported by the relevant evidence.

## 8. Current analytical readiness

The additional verification improves the documentary support for the historical dataset by confirming consistency across six selected periods.

The dataset remains suitable for continued exploratory analysis, provided that its documented limitations and the distinction between verified and unverified periods remain explicit.

The six verified periods must not be interpreted as proof that all 39 periods have been independently checked.

## 9. Recommended next steps

1. Preserve the current source documents and their local backups.
2. Continue invoice-level verification selectively when additional source documents are available.
3. Resolve inventory-to-archive file mapping without altering the original evidence.
4. Keep the historical dataset and its methodology synchronized when new checks are completed.
5. Continue separating documented facts, calculations, assumptions, and pending professional validation.
6. Avoid changing baseline calculations or analytical tool formulas without a separately documented rationale.

## 10. Sprint conclusion

Sprint 44 extended the targeted invoice-level verification from five to six selected billing periods, covering eight invoice documents.

The review of EDEA billing-period label 05/26 confirmed that the two installment invoices show identical meter readings and a consumption value of 370 kWh, consistent with the historical dataset and the arithmetic difference between the readings. The associated reading interval is 2026-07-02 to 2026-09-03.

The work strengthens the documentary basis of the selected records while preserving the distinction between targeted verification and a full historical audit.

No changes were made to the original consumption dataset, historical baseline calculations, or EcoBuild Insight formulas.

---

**Project:** TinyWiki — Case Study #001
**Sprint:** 44
**Focus:** Extended invoice-level documentary verification
**Status:** Documentation prepared for review
