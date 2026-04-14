"use client";

import { useState } from "react";

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
};

export default function EcoBuildInsightPage() {
  const [size, setSize] = useState<number>(0);
  const [city, setCity] = useState("buenos_aires");
  const [insulation, setInsulation] = useState(false);
  const [solar, setSolar] = useState(false);
  const [windows, setWindows] = useState("simple");

  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const BASE_KWH_PER_M2 = 50;
    const COST_PER_KWH = 0.15;

    let consumption = size * BASE_KWH_PER_M2;

    if (insulation) consumption *= 0.75;
    if (solar) consumption *= 0.6;
    if (windows === "double") consumption *= 0.85;

    const monthlyCost = (consumption / 12) * COST_PER_KWH;
    const yearlyCost = monthlyCost * 12;

    // -----------------------------
    // Recommendations
    // -----------------------------
    const recommendations: string[] = [];

    if (!insulation) {
      recommendations.push(
        "Agregar aislamiento térmico puede reducir pérdidas de energía en ~25%."
      );
    }

    if (!solar) {
      recommendations.push(
        "Instalar paneles solares puede reducir el consumo de la red eléctrica."
      );
    }

    if (windows === "simple") {
      recommendations.push(
        "Cambiar a doble vidrio mejora la eficiencia energética del hogar."
      );
    }

    // -----------------------------
    // ROI calculations
    // -----------------------------
    const roi: ROI[] = [];

    const SOLAR_COST = 4000;
    const INSULATION_COST = 1500;
    const WINDOWS_COST = 2000;

    if (!solar) {
      const savings = yearlyCost * 0.4;
      roi.push({
        label: "Paneles solares",
        cost: SOLAR_COST,
        yearlySavings: Math.round(savings),
        payback: Math.round(SOLAR_COST / savings),
      });
    }

    if (!insulation) {
      const savings = yearlyCost * 0.25;
      roi.push({
        label: "Aislamiento térmico",
        cost: INSULATION_COST,
        yearlySavings: Math.round(savings),
        payback: Math.round(INSULATION_COST / savings),
      });
    }

    if (windows === "simple") {
      const savings = yearlyCost * 0.15;
      roi.push({
        label: "Doble vidrio",
        cost: WINDOWS_COST,
        yearlySavings: Math.round(savings),
        payback: Math.round(WINDOWS_COST / savings),
      });
    }

    setResult({
      consumption: Math.round(consumption),
      cost: Math.round(monthlyCost),
      recommendations,
      roi,
    });
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">EcoBuild Insight</h1>

      <p className="mt-4 text-neutral-600">
        Estimá el consumo energético de tu vivienda y descubrí cómo reducir costos con mejoras sustentables.
      </p>

      {/* FORM */}
      <div className="mt-10 space-y-6 border p-6 rounded-2xl">
        <input
          type="number"
          placeholder="Tamaño (m²)"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full border rounded-lg p-2"
        />

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="buenos_aires">Buenos Aires</option>
          <option value="cordoba">Córdoba</option>
          <option value="mendoza">Mendoza</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={insulation}
            onChange={(e) => setInsulation(e.target.checked)}
          />
          Aislamiento térmico
        </label>

        <label>
          <input
            type="checkbox"
            checked={solar}
            onChange={(e) => setSolar(e.target.checked)}
          />
          Paneles solares
        </label>

        <select
          value={windows}
          onChange={(e) => setWindows(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="simple">Vidrio simple</option>
          <option value="double">Doble vidrio</option>
        </select>

        <button
          onClick={calculate}
          className="w-full bg-black text-white py-2 rounded-xl"
        >
          Calcular
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div className="mt-10 border p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-semibold">Resultados</h2>

          <p>
            Consumo anual: <strong>{result.consumption} kWh</strong>
          </p>

          <p>
            Costo mensual: <strong>${result.cost}</strong>
          </p>

          {/* Recommendations */}
          <div>
            <h3 className="font-semibold">Recomendaciones</h3>
            <ul className="mt-2 space-y-2">
              {result.recommendations.map((r, i) => (
                <li key={i} className="border p-2 rounded">
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* ROI */}
          {result.roi.length > 0 && (
            <div>
              <h3 className="font-semibold">Impacto económico</h3>

              <div className="mt-3 space-y-3">
                {result.roi.map((item, i) => (
                  <div key={i} className="border p-3 rounded-lg">
                    <p className="font-medium">{item.label}</p>
                    <p>Costo estimado: ${item.cost}</p>
                    <p>Ahorro anual: ${item.yearlySavings}</p>
                    <p>Retorno: {item.payback} años</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}