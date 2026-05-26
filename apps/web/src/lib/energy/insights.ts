export function getEnergyProfile(score: number) {
  if (score < 50) {
    return "Alto consumo";
  }

  if (score < 75) {
    return "Consumo medio";
  }

  return "Bajo consumo";
}

export function getMainRecommendation(
  insulation: boolean,
  solar: boolean,
  windows: string
) {
  if (!insulation) {
    return "La mejora más importante es incorporar aislamiento térmico para reducir pérdidas energéticas.";
  }

  if (!solar) {
    return "La instalación de paneles solares puede generar un ahorro energético significativo.";
  }

  if (windows === "simple") {
    return "Actualizar a doble vidrio puede mejorar la eficiencia térmica del hogar.";
  }

  return "La vivienda presenta una configuración energética eficiente.";
}