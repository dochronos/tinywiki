type RecommendationInput = {
  insulation: boolean;
  solar: boolean;
  windows: string;
};

export function generateSummary({
  insulation,
  solar,
  windows,
}: RecommendationInput) {
  const missingItems = [];

  if (!insulation) {
    missingItems.push("aislamiento térmico");
  }

  if (!solar) {
    missingItems.push("energía solar");
  }

  if (windows === "simple") {
    missingItems.push("doble vidrio");
  }

  if (missingItems.length === 0) {
    return "La vivienda presenta un nivel energético eficiente y no requiere mejoras prioritarias.";
  }

  return `La vivienda presenta oportunidades claras de mejora energética. Las principales áreas de optimización son: ${missingItems.join(
    ", "
  )}.`;
}

export function getPriorityLabel(score: number) {
  if (score < 50) {
    return "Alta";
  }

  if (score < 75) {
    return "Media";
  }

  return "Baja";
}

export function getEnergyStatus(score: number) {
  if (score < 50) {
    return "Ineficiente";
  }

  if (score < 75) {
    return "Intermedio";
  }

  return "Eficiente";
}