"use client";

import { useState } from "react";

export default function EcoBuildInsightPage() {
  const [size, setSize] = useState<number>(0);
  const [city, setCity] = useState("buenos_aires");
  const [insulation, setInsulation] = useState(false);
  const [solar, setSolar] = useState(false);
  const [windows, setWindows] = useState("simple");

  const [result, setResult] = useState<null | {
    consumption: number;
    cost: number;
  }>(null);

  function calculate() {
    const BASE_KWH_PER_M2 = 50;
    const COST_PER_KWH = 0.15;

    let consumption = size * BASE_KWH_PER_M2;

    // Ajustes
    if (insulation) consumption *= 0.75;
    if (solar) consumption *= 0.6;
    if (windows === "double") consumption *= 0.85;

    const monthlyCost = (consumption / 12) * COST_PER_KWH;

    setResult({
      consumption: Math.round(consumption),
      cost: Math.round(monthlyCost),
    });
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">EcoBuild Insight</h1>

      <p className="mt-4 text-neutral-600">
        Estimate your home´s energy consumption and discover potential savings
        from sustainable improvements.
      </p>

      {/* FORM */}
      <div className="mt-10 space-y-6 border p-6 rounded-2xl">
        {/* Size */}
        <div>
          <label className="block text-sm font-medium">
            House size (m²)
          </label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="mt-2 w-full border rounded-lg p-2"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium">City</label>
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

        {/* Insulation */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={insulation}
            onChange={(e) => setInsulation(e.target.checked)}
          />
          <label>Thermal insulation</label>
        </div>

        {/* Solar */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={solar}
            onChange={(e) => setSolar(e.target.checked)}
          />
          <label>Solar panels</label>
        </div>

        {/* Windows */}
        <div>
          <label className="block text-sm font-medium">
            Window type
          </label>
          <select
            value={windows}
            onChange={(e) => setWindows(e.target.value)}
            className="mt-2 w-full border rounded-lg p-2"
          >
            <option value="simple">Single glazing</option>
            <option value="double">Double glazing</option>
          </select>
        </div>

        {/* Button */}
        <button
          onClick={calculate}
          className="w-full bg-black text-white py-2 rounded-xl"
        >
          Calculate
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div className="mt-10 border p-6 rounded-2xl">
          <h2 className="text-xl font-semibold">Results</h2>

          <p className="mt-4">
            Estimated annual consumption:
            <strong> {result.consumption} kWh</strong>
          </p>

          <p className="mt-2">
            Estimated monthly cost:
            <strong> ${result.cost}</strong>
          </p>
        </div>
      )}
    </main>
  );
}