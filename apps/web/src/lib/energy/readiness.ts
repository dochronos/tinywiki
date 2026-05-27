export function getReadinessLevel(
  score: number
) {
  if (score >= 75) {
    return "Alta";
  }

  if (score >= 50) {
    return "Media";
  }

  return "Baja";
}

export function getReadinessMessage(
  score: number
) {
  if (score >= 75) {
    return "Tu vivienda presenta un desempeño energético favorable y buenas condiciones de eficiencia.";
  }

  if (score >= 50) {
    return "Tu vivienda presenta oportunidades de mejora antes de alcanzar un mejor desempeño energético.";
  }

  return "Existen mejoras prioritarias que podrían aumentar significativamente la eficiencia energética estimada.";
}

export function getConfidenceLevel(
  score: number
) {
  if (score >= 75) {
    return "Alta";
  }

  if (score >= 50) {
    return "Media";
  }

  return "Orientativa";
}