"use client";

import { useState } from "react";

type Result = {
  consumption: number;
  cost: number;
  recommendations: string[];
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

    if (size > 120 && !insulation) {
      recommendations.push(
        "En viviendas grandes, el aislamiento tiene un impacto aún mayor en el ahorro energético."
      );
    }

    setResult({
      consumption: Math.round(consumption),
      cost: Math.round(monthlyCost),
      recommendations,
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
        <div>
          <label className="block text-sm font-medium">
            Tamaño de la vivienda (m²)
          </label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="mt-2 w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Ciudad</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-2 w-full border rounded-lg p-2"
          >
            <option value="buenos_aires">Buenos Aires</option>
            <option value="cordoba">Córdoba</option>
            <option value="mendoza">Mendoza</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={insulation}
            onChange={(e) => setInsulation(e.target.checked)}
          />
          <label>Aislamiento térmico</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={solar}
            onChange={(e) => setSolar(e.target.checked)}
          />
          <label>Paneles solares</label>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Tipo de ventanas
          </label>
          <select
            value={windows}
            onChange={(e) => setWindows(e.target.value)}
            className="mt-2 w-full border rounded-lg p-2"
          >
            <option value="simple">Vidrio simple</option>
            <option value="double">Doble vidrio</option>
          </select>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-black text-white py-2 rounded-xl"
        >
          Calcular
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div className="mt-10 border p-6 rounded-2xl">
          <h2 className="text-xl font-semibold">Resultados</h2>

          <p className="mt-4">
            Consumo anual estimado:
            <strong> {result.consumption} kWh</strong>
          </p>

          <p className="mt-2">
            Costo mensual estimado:
            <strong> ${result.cost}</strong>
          </p>

          {result.recommendations.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Recomendaciones</h3>

              <ul className="mt-3 space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li
                    key={index}
                    className="border p-3 rounded-lg bg-neutral-50"
                  >
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </main>
  );
}