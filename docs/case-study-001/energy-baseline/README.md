# Caso de Estudio #001 — Línea base eléctrica histórica (Sprint 42)

## Alcance

Consolidación documental de facturas EDEA recuperadas para reconstruir el consumo eléctrico y la facturación de la vivienda. La cobertura disponible comprende períodos entre septiembre de 2016 y noviembre de 2026, con una brecha documental explícita entre 2020 y 2024.

El objetivo es establecer una base histórica trazable para futuros análisis energéticos y económicos, sin completar períodos ausentes mediante interpolaciones ni estimaciones no verificadas.

## Archivos

- `document-inventory.csv`: inventario anonimizado de los PDF recuperados. Conserva copias repetidas para trazabilidad.
- `electricity-consumption.csv`: un registro por período de consumo, con fechas de lectura y referencia documental.
- `electricity-billing.csv`: un registro por factura/cuota identificada en los PDF.
- `data-quality-report.md`: resumen de cobertura, controles, conciliación y limitaciones.
- `historical-data-methodology.md`: metodología específica de consolidación histórica.
- `sources-and-methodology.md`: documento metodológico preexistente, conservado sin cambios.

## Cobertura histórica recuperada

- 2016: un período (06/16).
- 2017: seis períodos.
- 2018: seis períodos.
- 2019: seis períodos.
- 2020: cinco períodos (01/20 a 05/20).
- 2021–2023: sin facturas recuperadas.
- 2024: tres períodos (04/24 a 06/24).
- 2025: seis períodos.
- 2026: seis períodos (01/26 a 06/26).

La base contiene:

- 39 períodos únicos de consumo.
- 78 registros de facturas/cuotas.
- 85 archivos PDF inventariados.
- 15 documentos marcados como copias repetidas, conservados para trazabilidad.
- 17.089 kWh de consumo sumado en los períodos documentados.

El primer período de lectura disponible comienza el 01/09/2016 y el último finaliza el 02/11/2026.

Existe una brecha cronológica de 1.337 días entre el final del período 05/20 (03/09/2020) y el inicio del período 04/24 (02/05/2024).

El promedio aritmético de los 39 períodos documentados es 438,18 kWh por período. No representa un promedio mensual ni un consumo continuo para todo el intervalo histórico.

## Reglas de interpretación

1. `consumption_kwh` representa el consumo de un período de lectura. No se duplica por existir dos cuotas.
2. `electricity-billing.csv` conserva cada cuota individualmente. Los importes no se interpretan automáticamente como precio de energía ni como costo total del período.
3. `csv_importe_ars` conserva el valor original del campo `Importe` del CSV histórico EDEA cuando está disponible. En los 13 períodos comparables, coincide con el importe de la primera cuota en 8 casos y con el importe individual de ambas cuotas en 5 casos. No coincide con la suma de las dos cuotas en ninguno de esos casos.
4. El comportamiento observado en esos 13 períodos no se generaliza automáticamente a toda la historia de facturación.
5. Las fechas de lectura se transcriben de los estados anterior/actual del medidor cuando aparecen en las facturas. Se almacenan como `YYYY-MM-DD`.
6. No se infieren estados de pago a partir de la emisión o vencimiento. `payment_status` utiliza `not_documented` cuando no existe evidencia de pago en las fuentes utilizadas.
7. Los importes son pesos nominales. No están ajustados por inflación.
8. Los años y períodos sin documentación permanecen ausentes. No se interpolan, estiman ni anualizan.
9. Los documentos repetidos se conservan en el inventario, pero no generan registros adicionales en los datasets de consumo o facturación.

## Hallazgos de estructura documental

- Algunos PDF contienen dos páginas y cada página corresponde a una cuota distinta. Por eso, cantidad de PDF y cantidad de facturas no son equivalentes.
- En 2016 hay una copia repetida de la cuota 2 del período 06/16.
- En 2019 y 2020, parte de la documentación contiene dos cuotas dentro del mismo PDF.
- Los archivos individuales de 2026 incluyen copias de facturas ya presentes en el ZIP y copias repetidas de documentos del período 05/26. Se conservan en el inventario y no se vuelven a contar en la facturación consolidada.
- Para 05/26, las copias `2026_document_78` y `2026_document_82` se identificaron como duplicados de `2026_document_77` y `2026_document_74`, respectivamente.

## Estado de validación

La consolidación superó los siguientes controles:

- No se detectaron períodos de consumo duplicados.
- Cada período de facturación tiene dos registros: cuota 1 y cuota 2.
- No se detectaron claves duplicadas de facturación.
- Todos los períodos de consumo tienen registros de facturación correspondientes.
- Todas las referencias documentales de los datasets existen en el inventario.
- La revisión cronológica identificó una brecha de 1.337 días y no detectó solapamientos.
- La comparación económica de los 13 importes disponibles en el CSV histórico no produjo discrepancias exactas.

La validación estructural y referencial está aprobada. La conciliación económica es parcial, porque 26 de los 39 períodos no tienen importe disponible en el CSV histórico. La revisión independiente de todos los conceptos tarifarios y la confirmación externa de EDEA no forman parte de esta validación.

## Privacidad

Los PDF originales no se incluyen en el repositorio. Los identificadores documentales son alias anonimizados; no se publican titular, domicilio, cuenta, medidor ni códigos de pago.