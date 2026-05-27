export function getActionPlan(
  insulation: boolean,
  solar: boolean,
  windows: string
) {
  if (!insulation) {
    return {
      title: "Agregar aislamiento térmico",
      impact: "Alto impacto en eficiencia energética",
      nextStep:
        "Evaluar materiales y opciones de instalación.",
    };
  }

  if (!solar) {
    return {
      title: "Evaluar paneles solares",
      impact: "Reducción del consumo eléctrico",
      nextStep:
        "Analizar orientación y viabilidad solar.",
    };
  }

  if (windows === "simple") {
    return {
      title: "Mejorar ventanas",
      impact:
        "Menores pérdidas térmicas",
      nextStep:
        "Considerar doble vidrio o soluciones térmicas.",
    };
  }

  return {
    title: "Mantener configuración actual",
    impact:
      "Buen desempeño energético estimado",
    nextStep:
      "Realizar seguimiento periódico del consumo.",
  };
}