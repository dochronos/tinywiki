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
  payback: number;
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

export function calculateEcoBuild(input: EcoBuildInput): EcoBuildResult {
  const { size, city, housingType, insulation, solar, windows } = input;

  const selectedCity = cityFactors[city];

  let consumption = size * ENERGY_CONSTANTS.baseKwhPerM2 * selectedCity.factor;

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

  const monthlyCost = (consumption / 12) * ENERGY_CONSTANTS.costPerKwh;

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
      "Cambiar a doble vidrio puede mejorar la eficiencia energética del hogar.",
    );
  }

  // ROI
  const roi: ROI[] = [];

  if (!solar) {
    const savings =
      yearlyCost *
      ENERGY_CONSTANTS.roiSavings.solar *
      selectedCity.solarEfficiency;

    roi.push({
      label: "Paneles solares",
      cost: ENERGY_CONSTANTS.roiCosts.solar,
      yearlySavings: Math.round(savings),
      payback: Math.max(
        1,
        Math.round(ENERGY_CONSTANTS.roiCosts.solar / savings),
      ),
    });
  }

  if (!insulation) {
    const savings = yearlyCost * ENERGY_CONSTANTS.roiSavings.insulation;

    roi.push({
      label: "Aislamiento térmico",
      cost: ENERGY_CONSTANTS.roiCosts.insulation,
      yearlySavings: Math.round(savings),
      payback: Math.max(
        1,
        Math.round(ENERGY_CONSTANTS.roiCosts.insulation / savings),
      ),
    });
  }

  if (windows === "simple") {
    const savings = yearlyCost * ENERGY_CONSTANTS.roiSavings.windows;

    roi.push({
      label: "Doble vidrio",
      cost: ENERGY_CONSTANTS.roiCosts.windows,
      yearlySavings: Math.round(savings),
      payback: Math.max(
        1,
        Math.round(ENERGY_CONSTANTS.roiCosts.windows / savings),
      ),
    });
  }

  // Energy score
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

  // Derived insights
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

  const mainRecommendation = getMainRecommendation(insulation, solar, windows);

  const benchmark = getBenchmark(housingType);

  const benchmarkStatus = getBenchmarkStatus(consumption, benchmark);

  const benchmarkMessage = getBenchmarkMessage(consumption, benchmark);

  const actionPlan = getActionPlan(insulation, solar, windows);

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
