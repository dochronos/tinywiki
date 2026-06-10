"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SectionCard } from "@/components/ui/section-card";
import { cityFactors, type CityKey } from "@/lib/energy/cityFactors";

import {
  generateSummary,
  getEnergyStatus,
  getPriorityLabel,
} from "@/lib/energy/recommendations";

import { getEnergyProfile, getMainRecommendation } from "@/lib/energy/insights";

import {
  getBenchmark,
  getBenchmarkStatus,
  getBenchmarkMessage,
} from "@/lib/energy/benchmark";

import { getActionPlan } from "@/lib/energy/actionPlan";

import {
  getReadinessLevel,
  getReadinessMessage,
  getConfidenceLevel,
} from "@/lib/energy/readiness";

type ROI = {
  label: string;
  cost: number;
  yearlySavings: number;
  payback: number;
};

type Result = {
  consumption: number;
  cost: number;
  recommendations: string[];
  roi: ROI[];

  score: number;
  efficiency: string;
  cityLabel: string;

  summary: string;
  priority: string;
  status: string;
  potentialSavings: number;

  energyProfile: string;
  mainRecommendation: string;
  housingLabel: string;

  benchmark: number;
  benchmarkStatus: string;
  benchmarkMessage: string;

  actionTitle: string;
  actionImpact: string;
  actionNextStep: string;

  readinessLevel: string;
  readinessMessage: string;
  confidenceLevel: string;
};

export default function EcoBuildInsightPage() {
  const [size, setSize] = useState<number>(0);

  const [city, setCity] = useState<CityKey>("buenos_aires");

  const [housingType, setHousingType] = useState("familiar");

  const [insulation, setInsulation] = useState(false);

  const [solar, setSolar] = useState(false);

  const [windows, setWindows] = useState("simple");

  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const BASE_KWH_PER_M2 = 50;
    const COST_PER_KWH = 0.15;

    const selectedCity = cityFactors[city];

    const housingLabels = {
      tiny: "Tiny house",
      small: "Casa pequeña",
      familiar: "Casa familiar",
    };

    let consumption = size * BASE_KWH_PER_M2 * selectedCity.factor;

    // Housing adjustments
    if (housingType === "tiny") {
      consumption *= 0.7;
    }

    if (housingType === "small") {
      consumption *= 0.9;
    }

    // Efficiency adjustments
    if (insulation) {
      consumption *= 0.75;
    }

    if (solar) {
      consumption *= 0.6;
    }

    if (windows === "double") {
      consumption *= 0.85;
    }

    const monthlyCost = (consumption / 12) * COST_PER_KWH;

    const yearlyCost = monthlyCost * 12;

    // Recommendations
    const recommendations: string[] = [];

    if (!insulation) {
      recommendations.push(
        "Agregar aislamiento térmico puede reducir pérdidas de energía en ~25%.",
      );
    }

    if (!solar) {
      recommendations.push(
        "Instalar paneles solares puede reducir el consumo de la red eléctrica.",
      );
    }

    if (windows === "simple") {
      recommendations.push(
        "Cambiar a doble vidrio mejora la eficiencia energética del hogar.",
      );
    }

    // ROI
    const roi: ROI[] = [];

    const SOLAR_COST = 4000;
    const INSULATION_COST = 1500;
    const WINDOWS_COST = 2000;

    if (!solar) {
      const savings = yearlyCost * 0.4 * selectedCity.solarEfficiency;

      roi.push({
        label: "Paneles solares",
        cost: SOLAR_COST,
        yearlySavings: Math.round(savings),

        payback: Math.max(1, Math.round(SOLAR_COST / savings)),
      });
    }

    if (!insulation) {
      const savings = yearlyCost * 0.25;

      roi.push({
        label: "Aislamiento térmico",
        cost: INSULATION_COST,
        yearlySavings: Math.round(savings),

        payback: Math.max(1, Math.round(INSULATION_COST / savings)),
      });
    }

    if (windows === "simple") {
      const savings = yearlyCost * 0.15;

      roi.push({
        label: "Doble vidrio",
        cost: WINDOWS_COST,
        yearlySavings: Math.round(savings),

        payback: Math.max(1, Math.round(WINDOWS_COST / savings)),
      });
    }

    // Energy score
    let score = 40;

    if (insulation) {
      score += 20;
    }

    if (solar) {
      score += 25;
    }

    if (windows === "double") {
      score += 15;
    }

    score = Math.min(score, 100);

    let efficiency = "Baja";

    if (score >= 70) {
      efficiency = "Alta";
    } else if (score >= 50) {
      efficiency = "Media";
    }

    const summary = generateSummary({
      insulation,
      solar,
      windows,
    });

    const priority = getPriorityLabel(score);

    const status = getEnergyStatus(score);

    const potentialSavings = roi.reduce(
      (total, item) => total + item.yearlySavings,
      0,
    );

    const energyProfile = getEnergyProfile(score);

    const mainRecommendation = getMainRecommendation(
      insulation,
      solar,
      windows,
    );

    const benchmark = getBenchmark(housingType);

    const benchmarkStatus = getBenchmarkStatus(consumption, benchmark);

    const benchmarkMessage = getBenchmarkMessage(consumption, benchmark);

    const actionPlan = getActionPlan(insulation, solar, windows);

    const readinessLevel = getReadinessLevel(score);

    const readinessMessage = getReadinessMessage(score);

    const confidenceLevel = getConfidenceLevel(score);

    setResult({
      consumption: Math.round(consumption),

      cost: Math.round(monthlyCost),

      recommendations,
      roi,

      score,
      efficiency,

      cityLabel: selectedCity.label,

      summary,
      priority,
      status,
      potentialSavings,

      energyProfile,

      mainRecommendation,

      housingLabel: housingLabels[housingType as keyof typeof housingLabels],

      benchmark,
      benchmarkStatus,
      benchmarkMessage,

      actionTitle: actionPlan.title,

      actionImpact: actionPlan.impact,

      actionNextStep: actionPlan.nextStep,

      readinessLevel,
      readinessMessage,
      confidenceLevel,
    });
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
              placeholder="Ej: 80"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full rounded-lg border p-2"
            />
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
              onChange={(e) => setHousingType(e.target.value)}
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
              onChange={(e) => setWindows(e.target.value)}
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
                Costo mensual estimado:
                <strong> ${result.cost}</strong>
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
                  Ahorro potencial anual
                </p>

                <p className="mt-2 text-lg font-semibold">
                  ${result.potentialSavings}
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
          <SectionCard title="Comparación energética">
            <p className="mt-2 text-text-secondary">
              Comparación estimada frente a viviendas similares.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card>
                <p className="text-sm text-text-secondary">Tu consumo anual</p>

                <p className="mt-2 text-lg font-semibold">
                  {result.consumption} kWh
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">Promedio estimado</p>

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
                • Comparación contra un benchmark estimado para viviendas
                similares.
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
              <h3 className="font-semibold">Impacto económico</h3>

              <div className="mt-3 space-y-3">
                {result.roi.map((item, index) => (
                  <Card key={index}>
                    <p className="font-medium">{item.label}</p>

                    <div className="mt-2 space-y-1 text-sm text-neutral-700">
                      <p>Costo estimado: ${item.cost}</p>

                      <p>Ahorro anual: ${item.yearlySavings}</p>

                      <p>
                        Retorno estimado:
                        {item.payback} años
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

            <Link
              href="/services/energy-analysis"
              className="mt-4 inline-block rounded-2xl bg-primary px-5 py-3 text-white transition hover:opacity-90"
            >
              Solicitar análisis
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
