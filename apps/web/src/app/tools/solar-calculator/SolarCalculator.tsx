"use client";

import { useMemo, useState } from "react";
import { estimateSolar, listProvinces, type SolarGoal } from "@/lib/solar";

export default function SolarCalculator() {
  const provinces = useMemo(() => listProvinces(), []);
  const [monthlyKwh, setMonthlyKwh] = useState<string>("");
  const [province, setProvince] = useState<string>(provinces[0] ?? "Buenos Aires");
  const [goal, setGoal] = useState<SolarGoal>("ahorro");
  const [submitted, setSubmitted] = useState(false);

  const parsedKwh = useMemo(() => {
    const n = Number(monthlyKwh);
    if (!Number.isFinite(n)) return null;
    if (n <= 0) return null;
    return n;
  }, [monthlyKwh]);

  const result = useMemo(() => {
    if (!parsedKwh) return null;
    return estimateSolar({ monthlyKwh: parsedKwh, province, goal });
  }, [parsedKwh, province, goal]);

  return (
    <div className="rounded-2xl border p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-600">Consumo mensual (kWh/mes)</label>
          <input
            className="rounded-xl border px-3 py-2 text-sm"
            inputMode="decimal"
            placeholder="Ej: 250"
            value={monthlyKwh}
            onChange={(e) => {
              setMonthlyKwh(e.target.value.replace(",", "."));
              setSubmitted(false);
            }}
          />
          <div className="text-xs text-neutral-500">Tip: lo encontrás en tu factura.</div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-600">Provincia</label>
          <select
            className="rounded-xl border px-3 py-2 text-sm"
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
              setSubmitted(false);
            }}
          >
            {provinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <div className="text-xs text-neutral-500">Horas solares promedio (estimación conservadora).</div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-600">Objetivo</label>
          <select
            className="rounded-xl border px-3 py-2 text-sm"
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value as SolarGoal);
              setSubmitted(false);
            }}
          >
            <option value="ahorro">Ahorro parcial (50–70%)</option>
            <option value="autonomia">Autonomía básica (cargas críticas)</option>
          </select>
          <div className="text-xs text-neutral-500">Define cuánta energía buscás cubrir.</div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-neutral-600">
          {parsedKwh ? (
            <>
              Consumo: <span className="font-medium">{parsedKwh}</span> kWh/mes
            </>
          ) : (
            <span className="text-neutral-500">Ingresá un consumo mensual válido para calcular.</span>
          )}
        </div>

        <button
          type="button"
          className="rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50 disabled:opacity-50"
          disabled={!parsedKwh}
          onClick={() => setSubmitted(true)}
        >
          Calcular
        </button>
      </div>

      {submitted && result ? (
        <div className="mt-5 rounded-2xl border bg-neutral-50 p-4">
          <div className="text-sm font-medium">Resultado orientativo</div>

          <div className="mt-2 text-sm text-neutral-800">
            Tamaño estimado del sistema:{" "}
            <span className="font-semibold">
              {result.kwpMin} – {result.kwpMax} kWp
            </span>
          </div>

          <div className="mt-2 text-sm text-neutral-800">
            Paneles aproximados:
            <div className="mt-1 text-sm text-neutral-700">
              • Con paneles de <span className="font-medium">400 W</span>:{" "}
              <span className="font-medium">
                {result.panels400Min} – {result.panels400Max}
              </span>{" "}
              paneles
              <br />• Con paneles de <span className="font-medium">450 W</span>:{" "}
              <span className="font-medium">
                {result.panels450Min} – {result.panels450Max}
              </span>{" "}
              paneles
            </div>
          </div>

          <details className="mt-4 rounded-xl border bg-white p-3">
            <summary className="cursor-pointer text-sm font-medium">Supuestos usados</summary>
            <div className="mt-2 space-y-1 text-xs text-neutral-600">
              <div>• Horas solares promedio (provincia): {result.psH} h/día</div>
              <div>• Factor de pérdidas (conservador): {result.lossFactor}</div>
              <div>• Cobertura objetivo aplicada: {Math.round(result.targetCoverage * 100)}%</div>
              <div className="pt-2">
                Nota: resultado orientativo. Sombras, orientación, temperatura y equipamiento pueden variar la producción.
              </div>
            </div>
          </details>
        </div>
      ) : null}
    </div>
  );
}
