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

import {
  getEnergyProfile,
  getMainRecommendation,
} from "@/lib/energy/insights";

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

    let consumption =
      size * BASE_KWH_PER_M2 * selectedCity.factor;

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

    const monthlyCost =
      (consumption / 12) * COST_PER_KWH;

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
      const savings =
        yearlyCost *
        0.4 *
        selectedCity.solarEfficiency;

      roi.push({
        label: "Paneles solares",
        cost: SOLAR_COST,
        yearlySavings: Math.round(savings),
        payback: Math.max(
          1,
          Math.round(SOLAR_COST / savings),
        ),
      });
    }

    if (!insulation) {
      const savings = yearlyCost * 0.25;

      roi.push({
        label: "Aislamiento térmico",
        cost: INSULATION_COST,
        yearlySavings: Math.round(savings),
        payback: Math.max(
          1,
          Math.round(INSULATION_COST / savings),
        ),
      });
    }

    if (windows === "simple") {
      const savings = yearlyCost * 0.15;

      roi.push({
        label: "Doble vidrio",
        cost: WINDOWS_COST,
        yearlySavings: Math.round(savings),
        payback: Math.max(
          1,
          Math.round(WINDOWS_COST / savings),
        ),
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

    const mainRecommendation =
      getMainRecommendation(
        insulation,
        solar,
        windows,
      );

    const benchmark = getBenchmark(housingType);

    const benchmarkStatus = getBenchmarkStatus(
      consumption,
      benchmark,
    );

    const benchmarkMessage = getBenchmarkMessage(
      consumption,
      benchmark,
    );

    const actionPlan = getActionPlan(
      insulation,
      solar,
      windows,
    );

    const readinessLevel =
      getReadinessLevel(score);

    const readinessMessage =
      getReadinessMessage(score);

    const confidenceLevel =
      getConfidenceLevel(score);

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

      housingLabel:
        housingLabels[
          housingType as keyof typeof housingLabels
        ],

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
    <main className="mx-auto max-w-6xl px-6 py-14 print-spacing">
      {/* HERO */}
      <section className="rounded-3xl border border-border-soft bg-surface p-8 md:p-10">
        <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
          TinyWiki · Energy Analysis
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
          EcoBuild Insight
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-text-secondary">
          Explorá el desempeño energético estimado de tu vivienda,
          identificá oportunidades de mejora y obtené una primera
          referencia sobre posibles ahorros y retornos de inversión.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link
            href="/tools"
            className="font-medium text-primary hover:underline"
          >
            Todas las herramientas
          </Link>

          <Link
            href="/tools/solar-calculator"
            className="font-medium text-primary hover:underline"
          >
            Calculadora solar
          </Link>

          <Link
            href="/services/energy-analysis"
            className="font-medium text-primary hover:underline"
          >
            Análisis personalizado
          </Link>
        </div>
      </section>

      {/* INPUT */}
      <section className="mt-10 rounded-3xl border border-border-soft bg-surface p-8 md:p-10">
        <div className="mb-8">
          <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
            Step 01 · Inputs
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
            Datos de tu vivienda
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-text-secondary">
            Completá los datos básicos para generar una estimación
            orientativa. No necesitás conocer todos los parámetros
            técnicos de tu vivienda.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Size */}
          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              Tamaño de la vivienda (m²)
            </label>

            <input
              type="number"
              min="1"
              placeholder="Ej: 80"
              value={size || ""}
              onChange={(e) =>
                setSize(Number(e.target.value))
              }
              className="w-full rounded-lg border border-border-soft bg-background p-3 text-text-primary"
            />

            <p className="mt-2 text-xs leading-5 text-text-secondary">
              Superficie aproximada de la vivienda.
            </p>
          </div>

          {/* City */}
          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              Ciudad
            </label>

            <select
              value={city}
              onChange={(e) =>
                setCity(e.target.value as CityKey)
              }
              className="w-full rounded-lg border border-border-soft bg-background p-3 text-text-primary"
            >
              <option value="buenos_aires">
                Buenos Aires
              </option>

              <option value="cordoba">
                Córdoba
              </option>

              <option value="mendoza">
                Mendoza
              </option>
            </select>

            <p className="mt-2 text-xs leading-5 text-text-secondary">
              Se utiliza para aplicar el factor climático
              correspondiente.
            </p>
          </div>

          {/* Housing */}
          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              Tipo de vivienda
            </label>

            <select
              value={housingType}
              onChange={(e) =>
                setHousingType(e.target.value)
              }
              className="w-full rounded-lg border border-border-soft bg-background p-3 text-text-primary"
            >
              <option value="tiny">
                Tiny house
              </option>

              <option value="small">
                Casa pequeña
              </option>

              <option value="familiar">
                Casa familiar
              </option>
            </select>
          </div>

          {/* Windows */}
          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              Tipo de ventanas
            </label>

            <select
              value={windows}
              onChange={(e) =>
                setWindows(e.target.value)
              }
              className="w-full rounded-lg border border-border-soft bg-background p-3 text-text-primary"
            >
              <option value="simple">
                Vidrio simple
              </option>

              <option value="double">
                Doble vidrio
              </option>
            </select>
          </div>
        </div>

        {/* Improvements */}
        <div className="mt-8 border-t border-border-soft pt-8">
          <p className="text-sm font-medium text-text-primary">
            Mejoras existentes
          </p>

          <p className="mt-1 text-xs leading-5 text-text-secondary">
            Indicá qué soluciones ya están presentes en la
            vivienda.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border-soft p-4 transition hover:border-primary">
              <input
                type="checkbox"
                checked={insulation}
                onChange={(e) =>
                  setInsulation(e.target.checked)
                }
                className="mt-1"
              />

              <span>
                <span className="block font-medium text-text-primary">
                  Aislamiento térmico
                </span>

                <span className="mt-1 block text-sm leading-6 text-text-secondary">
                  La vivienda cuenta con una mejora de
                  aislamiento térmico.
                </span>
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border-soft p-4 transition hover:border-primary">
              <input
                type="checkbox"
                checked={solar}
                onChange={(e) =>
                  setSolar(e.target.checked)
                }
                className="mt-1"
              />

              <span>
                <span className="block font-medium text-text-primary">
                  Paneles solares
                </span>

                <span className="mt-1 block text-sm leading-6 text-text-secondary">
                  La vivienda ya cuenta con generación
                  solar.
                </span>
              </span>
            </label>
          </div>
        </div>

        <button
          onClick={calculate}
          disabled={size <= 0}
          className="mt-8 w-full rounded-2xl bg-primary py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Analizar vivienda
        </button>
      </section>

      {/* RESULTS */}
      {result && (
        <section className="mt-10 space-y-8">
          {/* OVERVIEW */}
          <SectionCard title="Resultado del análisis">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <p className="text-sm text-text-secondary">
                  Consumo anual estimado
                </p>

                <p className="mt-2 text-2xl font-semibold text-text-primary">
                  {result.consumption} kWh
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">
                  Costo mensual estimado
                </p>

                <p className="mt-2 text-2xl font-semibold text-text-primary">
                  ${result.cost}
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">
                  Puntaje energético
                </p>

                <p className="mt-2 text-2xl font-semibold text-text-primary">
                  {result.score}/100
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">
                  Eficiencia estimada
                </p>

                <p className="mt-2 text-2xl font-semibold text-text-primary">
                  {result.efficiency}
                </p>
              </Card>
            </div>

            <div className="mt-6 rounded-2xl border border-border-soft p-5">
              <p className="text-sm text-text-secondary">
                Configuración analizada
              </p>

              <p className="mt-2 text-sm leading-7 text-text-primary">
                {result.cityLabel} ·{" "}
                {result.housingLabel}
              </p>
            </div>
          </SectionCard>

          {/* SUMMARY */}
          <SectionCard title="Resumen energético">
            <p className="leading-7 text-text-secondary">
              {result.summary}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card>
                <p className="text-sm text-text-secondary">
                  Estado energético
                </p>

                <p className="mt-2 text-lg font-semibold text-text-primary">
                  {result.status}
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">
                  Prioridad de mejora
                </p>

                <p className="mt-2 text-lg font-semibold text-text-primary">
                  {result.priority}
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">
                  Ahorro potencial anual
                </p>

                <p className="mt-2 text-lg font-semibold text-text-primary">
                  ${result.potentialSavings}
                </p>
              </Card>
            </div>
          </SectionCard>

          {/* INSIGHTS */}
          <SectionCard title="Insights personalizados">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <p className="text-sm text-text-secondary">
                  Perfil energético
                </p>

                <p className="mt-2 text-lg font-semibold text-text-primary">
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

          {/* BENCHMARK */}
          <SectionCard title="Comparación energética">
            <p className="text-text-secondary">
              Comparación estimada frente a viviendas
              similares.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card>
                <p className="text-sm text-text-secondary">
                  Tu consumo anual
                </p>

                <p className="mt-2 text-lg font-semibold text-text-primary">
                  {result.consumption} kWh
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">
                  Promedio estimado
                </p>

                <p className="mt-2 text-lg font-semibold text-text-primary">
                  {result.benchmark} kWh
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">
                  Resultado
                </p>

                <p className="mt-2 text-lg font-semibold text-text-primary">
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

          {/* ACTION PLAN */}
          <SectionCard title="Plan sugerido de mejora">
            <p className="text-text-secondary">
              Próximos pasos orientativos según la
              configuración analizada.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Card>
                <p className="text-sm text-text-secondary">
                  Mejora prioritaria
                </p>

                <p className="mt-2 font-semibold text-text-primary">
                  {result.actionTitle}
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">
                  Impacto esperado
                </p>

                <p className="mt-2 font-semibold text-text-primary">
                  {result.actionImpact}
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">
                  Próximo paso
                </p>

                <p className="mt-2 font-semibold text-text-primary">
                  {result.actionNextStep}
                </p>
              </Card>
            </div>
          </SectionCard>

          {/* RECOMMENDATIONS */}
          <SectionCard title="Recomendaciones">
            {result.recommendations.length > 0 ? (
              <div className="space-y-3">
                {result.recommendations.map(
                  (recommendation, index) => (
                    <Card key={index}>
                      <p className="leading-7 text-text-secondary">
                        {recommendation}
                      </p>
                    </Card>
                  ),
                )}
              </div>
            ) : (
              <Card>
                <p className="leading-7 text-text-secondary">
                  No se detectaron recomendaciones
                  adicionales con la configuración
                  seleccionada.
                </p>
              </Card>
            )}
          </SectionCard>

          {/* ROI */}
          {result.roi.length > 0 && (
            <SectionCard title="Impacto económico orientativo">
              <p className="text-sm leading-6 text-text-secondary">
                Estas cifras representan escenarios
                estimativos construidos a partir de los
                supuestos actuales del modelo.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {result.roi.map((item, index) => (
                  <Card key={index}>
                    <p className="font-medium text-text-primary">
                      {item.label}
                    </p>

                    <div className="mt-4 space-y-2 text-sm text-text-secondary">
                      <p>
                        Costo estimado: ${item.cost}
                      </p>

                      <p>
                        Ahorro anual: $
                        {item.yearlySavings}
                      </p>

                      <p>
                        Retorno estimado:{" "}
                        {item.payback} años
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </SectionCard>
          )}

          {/* METHODOLOGY */}
          <SectionCard title="Metodología y alcance">
            <p className="leading-7 text-text-secondary">
              EcoBuild Insight utiliza estimaciones
              orientativas basadas en superficie,
              ubicación, tipo de vivienda y mejoras
              energéticas seleccionadas.
            </p>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-text-secondary">
              <li>
                • Consumo base estimado por m² de
                vivienda.
              </li>

              <li>
                • Ajuste climático según ciudad
                seleccionada.
              </li>

              <li>
                • Ajustes orientativos por tipo de
                vivienda.
              </li>

              <li>
                • Impacto estimado de aislamiento
                térmico, generación solar y tipo de
                ventanas.
              </li>

              <li>
                • Comparación contra un benchmark
                estimado para viviendas similares.
              </li>

              <li>
                • Los resultados son orientativos y no
                reemplazan una evaluación técnica
                profesional.
              </li>
            </ul>
          </SectionCard>

          {/* READINESS */}
          <SectionCard title="Nivel de preparación energética">
            <p className="text-text-secondary">
              Resumen general del desempeño energético
              estimado.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Card>
                <p className="text-sm text-text-secondary">
                  Preparación
                </p>

                <p className="mt-2 text-lg font-semibold text-text-primary">
                  {result.readinessLevel}
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">
                  Confianza orientativa
                </p>

                <p className="mt-2 text-lg font-semibold text-text-primary">
                  {result.confidenceLevel}
                </p>
              </Card>

              <Card>
                <p className="text-sm text-text-secondary">
                  Resultado general
                </p>

                <p className="mt-2 text-lg font-semibold text-text-primary">
                  {result.status}
                </p>
              </Card>
            </div>

            <Card className="mt-4">
              <p className="leading-7 text-text-secondary">
                {result.readinessMessage}
              </p>
            </Card>
          </SectionCard>

          {/* REPORT */}
          <SectionCard title="Reporte energético">
            <p className="text-text-secondary">
              Guardá este análisis como referencia o
              compartilo para continuar evaluando
              futuras mejoras.
            </p>

            <button
              onClick={() => window.print()}
              className="mt-4 rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Descargar PDF
            </button>
          </SectionCard>

          {/* CTA */}
          <section className="rounded-3xl border border-border-soft bg-surface p-8 md:p-10">
            <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
              Personalized analysis
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-text-primary">
              ¿Necesitás ir un paso más allá?
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-text-secondary">
              Si necesitás analizar documentación,
              facturas, mediciones u objetivos específicos,
              TinyWiki puede ayudarte a estructurar un
              análisis energético más detallado.
            </p>

            <Link
              href="/services/energy-analysis"
              className="mt-6 inline-block rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Solicitar análisis →
            </Link>
          </section>
        </section>
      )}

      {/* DISCLAIMER */}
      <footer className="mt-10 text-xs leading-6 text-text-secondary">
        Los resultados de EcoBuild Insight son orientativos.
        No constituyen una auditoría energética, una
        cotización ni una recomendación técnica profesional.
        Antes de realizar inversiones o modificaciones en una
        vivienda, consultá con profesionales habilitados cuando
        corresponda.
      </footer>
    </main>
  );
}