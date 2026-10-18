
import { cityFactors, type CityKey } from "./cityFactors";

import {
  generateSummary,
  getEnergyStatus,
  getPriorityLabel,
} from "./recommendations";

import { getEnergyProfile, getMainRecommendation } from "./insights";

import {
  getBenchmark,
  getBenchmarkStatus,
  getBenchmarkMessage,
} from "./benchmark";

import { getActionPlan } from "./actionPlan";

import {
  getReadinessLevel,
  getReadinessMessage,
  getConfidenceLevel,
} from "./readiness";

import { ENERGY_CONSTANTS } from "./constants";

export type HousingType = "tiny" | "small" | "familiar";

export type WindowType = "simple" | "double";

export type EcoBuildInput = {
  size: number;
  city: CityKey;
  housingType: HousingType;
  insulation: boolean;
  solar: boolean;
  windows: WindowType;
};

export type ROI = {
  label: string;
  cost: number;
  yearlySavings: number;
  payback: number | null;
};

export type EcoBuildResult = {
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

const HOUSING_LABELS: Record<HousingType, string> = {
  tiny: "Tiny house",
  small: "Casa pequeña",
  familiar: "Casa familiar",
};

const VALID_HOUSING_TYPES: readonly string[] = [
  "tiny",
  "small",
  "familiar",
];

const VALID_WINDOW_TYPES: readonly string[] = [
  "simple",
  "double",
];

function validateInput(input: EcoBuildInput): void {
  if (!Number.isFinite(input.size) || input.size <= 0) {
    throw new RangeError(
      "La superficie debe ser un número finito mayor que cero.",
    );
  }

  if (
    !Object.prototype.hasOwnProperty.call(cityFactors, input.city)
  ) {
    throw new RangeError("La ciudad seleccionada no es válida.");
  }

  if (!VALID_HOUSING_TYPES.includes(input.housingType)) {
    throw new RangeError(
      "El tipo de vivienda seleccionado no es válido.",
    );
  }

  if (!VALID_WINDOW_TYPES.includes(input.windows)) {
    throw new RangeError(
      "El tipo de ventanas seleccionado no es válido.",
    );
  }

  if (
    typeof input.insulation !== "boolean" ||
    typeof input.solar !== "boolean"
  ) {
    throw new TypeError(
      "Las opciones de mejoras energéticas deben ser booleanas.",
    );
  }
}

function calculatePayback(
  cost: number,
  yearlySavings: number,
): number | null {
  if (
    !Number.isFinite(cost) ||
    cost <= 0 ||
    !Number.isFinite(yearlySavings) ||
    yearlySavings <= 0 ||
    Math.round(yearlySavings) <= 0
  ) {
    return null;
  }

  const years = cost / yearlySavings;

  if (!Number.isFinite(years)) {
    return null;
  }

  return Math.max(1, Math.round(years));
}

function createROI(
  label: string,
  cost: number,
  yearlySavings: number,
): ROI {
  if (!Number.isFinite(yearlySavings)) {
    throw new RangeError(
      "No se pudo calcular un ahorro anual finito.",
    );
  }

  return {
    label,
    cost,
    yearlySavings: Math.max(0, Math.round(yearlySavings)),
    payback: calculatePayback(cost, yearlySavings),
  };
}

export function calculateEcoBuild(
  input: EcoBuildInput,
): EcoBuildResult {
  validateInput(input);

  const {
    size,
    city,
    housingType,
    insulation,
    solar,
    windows,
  } = input;

  const selectedCity = cityFactors[city];

  let consumption =
    size *
    ENERGY_CONSTANTS.baseKwhPerM2 *
    selectedCity.factor;

  // Ajuste por tipo de vivienda
  if (housingType === "tiny") {
    consumption *= ENERGY_CONSTANTS.housingFactors.tiny;
  }

  if (housingType === "small") {
    consumption *= ENERGY_CONSTANTS.housingFactors.small;
  }

  // Ajustes por mejoras
  if (insulation) {
    consumption *= ENERGY_CONSTANTS.efficiencyFactors.insulation;
  }

  if (solar) {
    consumption *= ENERGY_CONSTANTS.efficiencyFactors.solar;
  }

  if (windows === "double") {
    consumption *= ENERGY_CONSTANTS.efficiencyFactors.doubleWindows;
  }

  if (!Number.isFinite(consumption) || consumption <= 0) {
    throw new RangeError(
      "El consumo calculado está fuera del rango válido.",
    );
  }

  const monthlyCost =
    (consumption / 12) * ENERGY_CONSTANTS.costPerKwh;

  const yearlyCost = monthlyCost * 12;

  if (
    !Number.isFinite(monthlyCost) ||
    !Number.isFinite(yearlyCost)
  ) {
    throw new RangeError(
      "El costo energético calculado está fuera del rango válido.",
    );
  }

  // Recomendaciones
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
      "Cambiar a doble vidrio puede mejorar la eficiencia energética del hogar.",
    );
  }

  // Retorno de inversión orientativo
  const roi: ROI[] = [];

  if (!solar) {
    const savings =
      yearlyCost *
      ENERGY_CONSTANTS.roiSavings.solar *
      selectedCity.solarEfficiency;

    roi.push(
      createROI(
        "Paneles solares",
        ENERGY_CONSTANTS.roiCosts.solar,
        savings,
      ),
    );
  }

  if (!insulation) {
    const savings =
      yearlyCost * ENERGY_CONSTANTS.roiSavings.insulation;

    roi.push(
      createROI(
        "Aislamiento térmico",
        ENERGY_CONSTANTS.roiCosts.insulation,
        savings,
      ),
    );
  }

  if (windows === "simple") {
    const savings =
      yearlyCost * ENERGY_CONSTANTS.roiSavings.windows;

    roi.push(
      createROI(
        "Doble vidrio",
        ENERGY_CONSTANTS.roiCosts.windows,
        savings,
      ),
    );
  }

  // Puntaje energético
  let score: number = ENERGY_CONSTANTS.score.base;

  if (insulation) {
    score += ENERGY_CONSTANTS.score.insulation;
  }

  if (solar) {
    score += ENERGY_CONSTANTS.score.solar;
  }

  if (windows === "double") {
    score += ENERGY_CONSTANTS.score.doubleWindows;
  }

  score = Math.min(score, 100);

  let efficiency = "Baja";

  if (score >= 70) {
    efficiency = "Alta";
  } else if (score >= 50) {
    efficiency = "Media";
  }

  // Indicadores derivados
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

  const readinessLevel = getReadinessLevel(score);

  const readinessMessage = getReadinessMessage(score);

  const confidenceLevel = getConfidenceLevel(score);

  return {
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
    housingLabel: HOUSING_LABELS[housingType],

    benchmark,
    benchmarkStatus,
    benchmarkMessage,

    actionTitle: actionPlan.title,
    actionImpact: actionPlan.impact,
    actionNextStep: actionPlan.nextStep,

    readinessLevel,
    readinessMessage,
    confidenceLevel,
  };
}
