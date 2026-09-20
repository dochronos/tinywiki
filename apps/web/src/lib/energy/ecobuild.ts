import { cityFactors, type CityKey } from "./cityFactors";

import {
  generateSummary,
  getEnergyStatus,
  getPriorityLabel,
} from "./recommendations";

import {
  getEnergyProfile,
  getMainRecommendation,
} from "./insights";

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

export type EcoBuildInput = {
  size: number;
  city: CityKey;
  housingType: string;
  insulation: boolean;
  solar: boolean;
  windows: string;
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

const BASE_KWH_PER_M2 = 50;
const COST_PER_KWH = 0.15;

const SOLAR_COST = 4000;
const INSULATION_COST = 1500;
const WINDOWS_COST = 2000;

const HOUSING_LABELS = {
  tiny: "Tiny house",
  small: "Casa pequeña",
  familiar: "Casa familiar",
} as const;

export function calculateEcoBuild(
  input: EcoBuildInput,
): EcoBuildResult {
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
    BASE_KWH_PER_M2 *
    selectedCity.factor;

  // Ajuste por tipo de vivienda
  if (housingType === "tiny") {
    consumption *= 0.7;
  }

  if (housingType === "small") {
    consumption *= 0.9;
  }

  // Ajustes por mejoras
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
    (consumption / 12) *
    COST_PER_KWH;

  const yearlyCost =
    monthlyCost * 12;

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
      0.4 *
      selectedCity.solarEfficiency;

    roi.push({
      label: "Paneles solares",
      cost: SOLAR_COST,
      yearlySavings: Math.round(savings),
      payback: Math.max(
        1,
        Math.round(
          SOLAR_COST / savings,
        ),
      ),
    });
  }

  if (!insulation) {
    const savings =
      yearlyCost * 0.25;

    roi.push({
      label: "Aislamiento térmico",
      cost: INSULATION_COST,
      yearlySavings: Math.round(savings),
      payback: Math.max(
        1,
        Math.round(
          INSULATION_COST / savings,
        ),
      ),
    });
  }

  if (windows === "simple") {
    const savings =
      yearlyCost * 0.15;

    roi.push({
      label: "Doble vidrio",
      cost: WINDOWS_COST,
      yearlySavings: Math.round(savings),
      payback: Math.max(
        1,
        Math.round(
          WINDOWS_COST / savings,
        ),
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

  score = Math.min(
    score,
    100,
  );

  let efficiency = "Baja";

  if (score >= 70) {
    efficiency = "Alta";
  } else if (score >= 50) {
    efficiency = "Media";
  }

  // Derived insights
  const summary =
    generateSummary({
      insulation,
      solar,
      windows,
    });

  const priority =
    getPriorityLabel(score);

  const status =
    getEnergyStatus(score);

  const potentialSavings =
    roi.reduce(
      (total, item) =>
        total +
        item.yearlySavings,
      0,
    );

  const energyProfile =
    getEnergyProfile(score);

  const mainRecommendation =
    getMainRecommendation(
      insulation,
      solar,
      windows,
    );

  const benchmark =
    getBenchmark(
      housingType,
    );

  const benchmarkStatus =
    getBenchmarkStatus(
      consumption,
      benchmark,
    );

  const benchmarkMessage =
    getBenchmarkMessage(
      consumption,
      benchmark,
    );

  const actionPlan =
    getActionPlan(
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

  return {
    consumption:
      Math.round(consumption),

    cost:
      Math.round(monthlyCost),

    recommendations,
    roi,

    score,
    efficiency,

    cityLabel:
      selectedCity.label,

    summary,
    priority,
    status,
    potentialSavings,

    energyProfile,
    mainRecommendation,

    housingLabel:
      HOUSING_LABELS[
        housingType as keyof typeof HOUSING_LABELS
      ],

    benchmark,
    benchmarkStatus,
    benchmarkMessage,

    actionTitle:
      actionPlan.title,

    actionImpact:
      actionPlan.impact,

    actionNextStep:
      actionPlan.nextStep,

    readinessLevel,
    readinessMessage,
    confidenceLevel,
  };
}