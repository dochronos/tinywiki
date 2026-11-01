"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SectionCard } from "@/components/ui/section-card";
import type { CityKey } from "@/lib/energy/cityFactors";
import {
  calculateEcoBuild,
  type EcoBuildResult,
  type HousingType,
  type WindowType,
} from "@/lib/energy/ecobuild";

const ECOBUILD_REQUEST_KEY = "tinywiki:ecobuild-request";

export default function EcoBuildInsightPage() {
  const [size, setSize] = useState<number>(0);

  const [city, setCity] = useState<CityKey>("buenos_aires");

  const [housingType, setHousingType] = useState<HousingType>("familiar");

  const [insulation, setInsulation] = useState(false);

  const [solar, setSolar] = useState(false);

  const [windows, setWindows] = useState<WindowType>("simple");

  const [result, setResult] = useState<EcoBuildResult | null>(null);

  const [validationError, setValidationError] = useState<string | null>(null);

  function calculate() {
    if (!Number.isFinite(size) || size <= 0) {
      setResult(null);
      setValidationError(
        "Ingresá una superficie mayor que 0 m² para calcular.",
      );
      return;
    }

    const nextResult = calculateEcoBuild({
      size,
      city,
      housingType,
      insulation,
      solar,
      windows,
    });

    setValidationError(null);
    setResult(nextResult);
  }

  function requestPersonalizedAnalysis() {
    if (!result) return;

    const requestData = {
      size,
      city: result.cityLabel,
      housingType: result.housingLabel,
      insulation,
      solar,
      windows,
      consumption: result.consumption,
      monthlyCost: result.cost,
      score: result.score,
      recommendations: result.recommendations,
      generatedAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem(ECOBUILD_REQUEST_KEY, JSON.stringify(requestData));

      window.location.href = "/services/energy-analysis";
    } catch {
      setValidationError(
        "No se pudieron preparar los resultados para la solicitud. Intentá nuevamente.",
      );
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-14 print-spacing">
      {/* HERO */}
      <section className="rounded-3xl border border-border-soft bg-surface p-8">
        <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
          Sustainability · Energy · Insights
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary">
          EcoBuild Insight
        </h1>

        <p className="mt-4 max-w-2xl leading-8 text-text-secondary">
          Estimá el consumo energético de tu vivienda y descubrí oportunidades
          reales para reducir costos mediante eficiencia, aislamiento y
          soluciones sustentables.
        </p>
      </section>

      {/* FORM */}
      <section className="mt-10 rounded-3xl border border-border-soft bg-surface p-8">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Tamaño de la vivienda (m²)
            </label>

            <input
              type="number"
              min="1"
              step="any"
              placeholder="Ej: 80"
              value={size}
              aria-invalid={validationError !== null}
              aria-describedby="size-error"
              onChange={(e) => {
                setSize(Number(e.target.value));
                setValidationError(null);
              }}
              className="w-full rounded-lg border p-2"
            />

            {validationError && (
              <p
                id="size-error"
                role="alert"
                className="mt-2 text-sm text-red-600"
              >
                {validationError}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Ciudad</label>

            <select
              value={city}
              onChange={(e) => setCity(e.target.value as CityKey)}
              className="w-full rounded-lg border p-2"
            >
              <option value="buenos_aires">Buenos Aires</option>

              <option value="cordoba">Córdoba</option>

              <option value="mendoza">Mendoza</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Tipo de vivienda
            </label>

            <select
              value={housingType}
              onChange={(e) => setHousingType(e.target.value as HousingType)}
              className="w-full rounded-lg border p-2"
            >
              <option value="tiny">Tiny house</option>

              <option value="small">Casa pequeña</option>

              <option value="familiar">Casa familiar</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={insulation}
                onChange={(e) => setInsulation(e.target.checked)}
              />

              <span>Aislamiento térmico</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={solar}
                onChange={(e) => setSolar(e.target.checked)}
              />

              <span>Paneles solares</span>
            </label>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Tipo de ventanas
            </label>

            <select
              value={windows}
              onChange={(e) => setWindows(e.target.value as WindowType)}
              className="w-full rounded-lg border p-2"
            >
              <option value="simple">Vidrio simple</option>

              <option value="double">Doble vidrio</option>
            </select>
          </div>

          <button
            onClick={calculate}
            className="w-full rounded-2xl bg-primary py-3 text-white transition hover:opacity-90"
          >
            Calcular
          </button>
        </div>
      </section>

      {/* RESULTS */}
      {result && (
        <section className="mt-10 space-y-6 rounded-3xl border border-border-soft bg-surface p-8">
          {/* Results */}
          <div>
            <h2 className="text-xl font-semibold">Resultados</h2>

            <div className="mt-4 space-y-2">
              <p>
                Consumo anual estimado:
                <strong> {result.consumption} kWh</strong>
              </p>

              <p>
                Costo mensual estimado (USD):
                <strong> USD {result.cost}</strong>
              </p>
            </div>
          </div>

          {/* Energy Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <p className="text-sm text-text-secondary">Ciudad</p>

              <p className="mt-2 text-lg font-semibold">{result.cityLabel}</p>
            </Card>

            <Card>
              <p className="text-sm text-text-secondary">Tipo de vivienda</p>

              <p className="mt-2 text-lg font-semibold">
                {result.housingLabel}
              </p>
            </Card>

            <Card>
              <p className="text-sm text-text-secondary">Puntaje energético</p>

              <p className="mt-2 text-lg font-semibold">{result.score}/100</p>
            </Card>
          </div>

          {/* Energy Report */}
          <SectionCard title="Resumen del análisis">
            <p className="leading-7 text-text-secondary">{result.summary}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card>
                <p className="text-sm text-text-secondary">Estado energético</p>

                <p className="mt-2 text-lg font-semibold">{result.status}</p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">
                  Prioridad de mejora
                </p>

                <p className="mt-2 text-lg font-semibold">{result.priority}</p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">
                  Suma orientativa de ahorros individuales (USD/año)
                </p>

                <p className="mt-2 text-lg font-semibold">
                  USD {result.potentialSavings}
                </p>

                <p className="mt-2 text-xs leading-5 text-text-secondary">
                  Es la suma de estimaciones individuales para cada mejora. No
                  representa un ahorro combinado garantizado, ya que los efectos
                  de las intervenciones pueden superponerse.
                </p>
              </Card>
            </div>
          </SectionCard>

          {/* Insights */}
          <SectionCard title="Insights personalizados">
            <div className="space-y-4">
              <Card>
                <p className="text-sm text-text-secondary">Perfil energético</p>

                <p className="mt-2 text-lg font-semibold">
                  {result.energyProfile}
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">
                  Mejora principal sugerida
                </p>

                <p className="mt-2 leading-7 text-text-secondary">
                  {result.mainRecommendation}
                </p>
              </Card>
            </div>
          </SectionCard>

          {/* Benchmark */}
          <SectionCard title="Referencia energética">
            <p className="mt-2 text-text-secondary">
              Comparación orientativa entre el consumo calculado y un umbral de
              referencia configurado según el tipo de vivienda.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card>
                <p className="text-sm text-text-secondary">Tu consumo anual</p>

                <p className="mt-2 text-lg font-semibold">
                  {result.consumption} kWh
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">
                  Umbral de referencia
                </p>

                <p className="mt-2 text-lg font-semibold">
                  {result.benchmark} kWh
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">Resultado</p>

                <p className="mt-2 text-lg font-semibold">
                  {result.benchmarkStatus}
                </p>
              </Card>
            </div>

            <Card className="mt-4">
              <p className="leading-7 text-text-secondary">
                {result.benchmarkMessage}
              </p>
            </Card>
          </SectionCard>

          {/* Methodology */}
          <SectionCard title="¿Cómo se calcula esta estimación?">
            <p className="text-text-secondary">
              EcoBuild utiliza estimaciones orientativas basadas en superficie,
              ubicación y mejoras energéticas seleccionadas.
            </p>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-text-secondary">
              <li>• Consumo base estimado por m² de vivienda.</li>

              <li>• Ajuste climático según ciudad seleccionada.</li>

              <li>
                • Impacto de aislamiento térmico, paneles solares y tipo de
                ventanas.
              </li>

              <li>
                • Comparación contra un umbral de referencia configurado según
                la categoría de vivienda. Este valor no representa un promedio
                estadístico ni considera ajustes por superficie o ciudad.
              </li>

              <li>
                • Resultados orientativos que no reemplazan una evaluación
                técnica profesional.
              </li>
            </ul>
          </SectionCard>

          {/* Action Plan */}
          <SectionCard title="Plan sugerido de mejora">
            <p className="text-text-secondary">
              Próximos pasos recomendados según tu configuración actual.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Card>
                <p className="text-sm text-text-secondary">
                  Mejora prioritaria
                </p>

                <p className="mt-2 font-semibold">{result.actionTitle}</p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">Impacto esperado</p>

                <p className="mt-2 font-semibold">{result.actionImpact}</p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">Próximo paso</p>

                <p className="mt-2 font-semibold">{result.actionNextStep}</p>
              </Card>
            </div>
          </SectionCard>

          {/* Recommendations */}
          <div>
            <h3 className="font-semibold">Recomendaciones</h3>

            <ul className="mt-3 space-y-2">
              {result.recommendations.map((recommendation, index) => (
                <Card key={index}>{recommendation}</Card>
              ))}
            </ul>
          </div>

          {/* ROI */}
          {result.roi.length > 0 && (
            <div>
              <h3 className="font-semibold">
                Estimaciones económicas por mejora
              </h3>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Los costos y ahorros se expresan en dólares estadounidenses
                (USD) y se basan en parámetros internos orientativos. No
                representan cotizaciones comerciales ni garantizan ahorros o
                plazos de recuperación. Los valores reales dependen de las
                características de cada vivienda, los equipos, la instalación y
                las condiciones del mercado.
              </p>

              <div className="mt-3 space-y-3">
                {result.roi.map((item, index) => (
                  <Card key={index}>
                    <p className="font-medium">{item.label}</p>

                    <div className="mt-2 space-y-1 text-sm text-neutral-700">
                      <p>Costo estimado: USD {item.cost}</p>

                      <p>Ahorro anual estimado: USD {item.yearlySavings}</p>

                      <p>
                        Retorno estimado:{" "}
                        {item.payback === null
                          ? "No estimable"
                          : `${item.payback} años`}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Download Report */}
          <SectionCard title="Descargar reporte energético">
            <p className="text-text-secondary">
              Exportá este análisis para guardarlo, compartirlo o utilizarlo
              como referencia para futuras mejoras.
            </p>

            <button
              onClick={() => window.print()}
              className="mt-4 rounded-2xl bg-primary px-5 py-3 text-white transition hover:opacity-90"
            >
              Descargar PDF
            </button>
          </SectionCard>

          {/* Energy Readiness */}
          <SectionCard title="Nivel de preparación energética">
            <p className="text-text-secondary">
              Resumen general del desempeño energético estimado.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Card>
                <p className="text-sm text-text-secondary">Preparación</p>

                <p className="mt-2 text-lg font-semibold">
                  {result.readinessLevel}
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">
                  Confianza orientativa
                </p>

                <p className="mt-2 text-lg font-semibold">
                  {result.confidenceLevel}
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">Resultado general</p>

                <p className="mt-2 text-lg font-semibold">{result.status}</p>
              </Card>
            </div>

            <Card className="mt-4">
              <p className="leading-7 text-text-secondary">
                {result.readinessMessage}
              </p>
            </Card>
          </SectionCard>

          {/* CTA */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold">
              ¿Querés un análisis personalizado?
            </h3>

            <p className="mt-2 text-text-secondary">
              TinyWiki puede ayudarte a evaluar mejoras reales para tu vivienda,
              incluyendo ahorro estimado y retorno de inversión.
            </p>

            <button
              type="button"
              onClick={requestPersonalizedAnalysis}
              className="mt-4 inline-block rounded-2xl bg-primary px-5 py-3 text-white transition hover:opacity-90"
            >
              Solicitar análisis
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
