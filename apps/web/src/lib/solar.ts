export type SolarGoal = "ahorro" | "autonomia";

export type SolarEstimateInput = {
  monthlyKwh: number; // kWh/mes
  province: string;
  goal: SolarGoal;
};

export type SolarEstimateOutput = {
  // Rango recomendado (kWp)
  kwpMin: number;
  kwpMax: number;

  // Paneles estimados (rango) para dos potencias típicas
  panels400Min: number;
  panels400Max: number;
  panels450Min: number;
  panels450Max: number;

  // Parámetros usados
  psH: number; // horas solares promedio (h/día)
  lossFactor: number; // 0.75
  targetCoverage: number; // 0.65 ahorro, 0.35 autonomia (cargas críticas)
};

export const LOSS_FACTOR = 0.75;

// Cobertura objetivo por modo (simple y defendible)
export const TARGET_COVERAGE: Record<SolarGoal, number> = {
  ahorro: 0.65,      // cubrir ~50–70% => promedio 65%
  autonomia: 0.35,   // cargas críticas => parcial y realista
};

// Horas solares promedio (Argentina). Valores conservadores.
export const PSH_BY_PROVINCE: Record<string, number> = {
  "CABA": 4.0,
  "Buenos Aires": 4.0,
  "Córdoba": 4.5,
  "Santa Fe": 4.2,
  "Mendoza": 5.5,
  "San Juan": 5.8,
  "San Luis": 5.2,
  "La Rioja": 5.8,
  "Catamarca": 6.0,
  "Salta": 5.8,
  "Jujuy": 6.2,
  "Tucumán": 5.3,
  "Santiago del Estero": 5.6,
  "Chaco": 5.2,
  "Corrientes": 5.0,
  "Misiones": 4.8,
  "Entre Ríos": 4.4,
  "La Pampa": 4.8,
  "Río Negro": 4.6,
  "Neuquén": 4.9,
  "Chubut": 4.2,
  "Santa Cruz": 3.8,
  "Tierra del Fuego": 3.2,
};

export function listProvinces(): string[] {
  return Object.keys(PSH_BY_PROVINCE).sort((a, b) => a.localeCompare(b));
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}
function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

export function estimateSolar(input: SolarEstimateInput): SolarEstimateOutput {
  const psh = PSH_BY_PROVINCE[input.province] ?? 4.0;
  const target = TARGET_COVERAGE[input.goal];
  const monthlyTargetKwh = input.monthlyKwh * target;

  // kWp base: (kWh/mes) / (PSH * 30 * pérdidas)
  const kwpBase = monthlyTargetKwh / (psh * 30 * LOSS_FACTOR);

  // Rango: +/- 8% (tolerancia razonable por variación real)
  const kwpMin = round1(clamp(kwpBase * 0.92, 0.3, 50));
  const kwpMax = round1(clamp(kwpBase * 1.08, 0.3, 50));

  // Paneles (rango) para 400W y 450W
  const panels400Min = Math.ceil((kwpMin * 1000) / 400);
  const panels400Max = Math.ceil((kwpMax * 1000) / 400);
  const panels450Min = Math.ceil((kwpMin * 1000) / 450);
  const panels450Max = Math.ceil((kwpMax * 1000) / 450);

  return {
    kwpMin,
    kwpMax,
    panels400Min,
    panels400Max,
    panels450Min,
    panels450Max,
    psH: psh,
    lossFactor: LOSS_FACTOR,
    targetCoverage: target,
  };
}
