export const ENERGY_CONSTANTS = {
  baseKwhPerM2: 50,

  // Internal reference assumption expressed in USD per kWh.
  // Not a validated residential electricity tariff.
  costPerKwh: 0.15,

  housingFactors: {
    tiny: 0.7,
    small: 0.9,
    familiar: 1,
  },

  efficiencyFactors: {
    insulation: 0.75,
    solar: 0.6,
    doubleWindows: 0.85,
  },

  // Internal investment cost assumptions expressed in USD.
  // These values are not local market quotations.
  roiCosts: {
    solar: 4000,
    insulation: 1500,
    windows: 2000,
  },

  // Assumed annual savings proportions.
  // These are illustrative model parameters, not guaranteed savings.
  roiSavings: {
    solar: 0.4,
    insulation: 0.25,
    windows: 0.15,
  },

  benchmarkKwh: {
    tiny: 3000,
    small: 4500,
    familiar: 6500,
  },

  score: {
    base: 40,
    insulation: 20,
    solar: 25,
    doubleWindows: 15,
  },
} as const;