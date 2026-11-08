# Caso de Estudio #001 — Línea base eléctrica (Sprint 41.1)

## Alcance
Paquete inicial de consolidación anonimizada de:
- 13 registros bimestrales del CSV de historial EDEA.
- 12 registros de facturas/pagos visibles en EDEA Web (seis períodos, dos cuotas por período).

No incluye dirección, titular, número de cuenta, número de medidor ni códigos de pago.

## Archivos
- `electricity-consumption.csv`: un registro por período bimestral de consumo.
- `electricity-billing.csv`: un registro por factura/cuota.

## Reglas de interpretación
1. `consumption_kwh` es el consumo del período bimestral. No se duplica por existir dos cuotas.
2. `electricity-billing.csv` registra cada cuota por separado. Los importes de ambas cuotas se suman únicamente cuando se analiza el total facturado/pagado del período.
3. `csv_importe_ars` conserva literalmente la columna `Importe` del CSV EDEA. Para los períodos 2026-01 a 2026-05 coincide con el importe de la cuota 1 del portal, excepto 2026-05 donde también coincide con cuota 2. No se asume que sea el total bimestral facturado.
4. Fechas de lectura solo se incluyen donde se han identificado en documentación de factura; los demás campos quedan vacíos, no se estiman.
5. Estado y fecha de pago se transcriben del listado EDEA Web proporcionado por el usuario. Los importes y vencimientos de períodos 2025-06 y 2026-01 no cuentan con PDF en este paquete.
6. Los importes son pesos nominales de cada fecha. No están ajustados por inflación.
7. No se calcula aún una tarifa efectiva validada por kWh. Para ello debe definirse qué componentes incluir y reconciliar el desglose de facturación.

## Observaciones de validación
- Los dos CSV suministrados son duplicados idénticos; se utilizó una sola copia lógica.
- Los dos PDF de cada período 2026-02 a 2026-05 corresponden a cuotas 1 y 2, no a consumos independientes.
- Para 2026-05, ambas facturas muestran 370 kWh y $47.330,44 cada una; el listado EDEA Web las marca como cobradas. Por tanto, total de ambas cuotas: $94.660,88, sin duplicar los 370 kWh.
- La tarifa visible en los PDF es T1R; el período 2026-05 identifica segmentación N2/SEF y cuadro tarifario Res. MyP 682/26.

## Pendientes
- Obtener los PDF o desglose de 2025-06 y 2026-01.
- Verificar fechas exactas de lectura para todos los períodos.
- Solicitar a EDEA el historial de lecturas y/o facturación desglosada de períodos no descargables.
- Aclarar formalmente el significado de la columna `Importe` del CSV para períodos anteriores.
