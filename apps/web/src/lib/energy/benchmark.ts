
import { ENERGY_CONSTANTS } from "./constants";

export type BenchmarkHousingType = "tiny" | "small" | "familiar";

export function getBenchmark(
  housingType: BenchmarkHousingType,
): number {
  switch (housingType) {
    case "tiny":
      return ENERGY_CONSTANTS.benchmarkKwh.tiny;

    case "small":
      return ENERGY_CONSTANTS.benchmarkKwh.small;

    case "familiar":
      return ENERGY_CONSTANTS.benchmarkKwh.familiar;

    default: {
      const invalidHousingType: never = housingType;
      throw new RangeError(
        `Tipo de vivienda no válido: ${invalidHousingType}`,
      );
    }
  }
}

export function getBenchmarkStatus(
  consumption: number,
  benchmark: number,
): string {
  return consumption <= benchmark
    ? "Dentro de la referencia estimada"
    : "Por encima de la referencia estimada";
}

export function getBenchmarkMessage(
  consumption: number,
  benchmark: number,
): string {
  if (consumption <= benchmark) {
    return (
      "El consumo calculado está dentro del umbral de referencia " +
      "configurado para esta categoría de vivienda. Es una comparación " +
      "orientativa, no un promedio estadístico validado."
    );
  }

  return (
    "El consumo calculado supera el umbral de referencia configurado " +
    "para esta categoría de vivienda. Puede ser útil evaluar mejoras " +
    "energéticas. La comparación es orientativa, no un promedio " +
    "estadístico validado."
  );
}
