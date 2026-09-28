import { ENERGY_CONSTANTS } from "./constants";

export function getBenchmark(housingType: string) {
  switch (housingType) {
    case "tiny":
      return ENERGY_CONSTANTS.benchmarkKwh.tiny;

    case "small":
      return ENERGY_CONSTANTS.benchmarkKwh.small;

    default:
      return ENERGY_CONSTANTS.benchmarkKwh.familiar;
  }
}

export function getBenchmarkStatus(
  consumption: number,
  benchmark: number,
) {
  return consumption <= benchmark
    ? "Mejor que el promedio"
    : "Mayor consumo que el promedio";
}

export function getBenchmarkMessage(
  consumption: number,
  benchmark: number,
) {
  if (consumption <= benchmark) {
    return "Tu vivienda muestra un desempeño energético favorable frente al promedio estimado.";
  }

  return "Existen oportunidades de mejora para acercar el consumo al promedio energético estimado.";
}