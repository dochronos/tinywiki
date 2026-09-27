export const ENERGY_CONSTANTS = {
  baseKwhPerM2: 50,
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

  roiCosts: {
    solar: 4000,
    insulation: 1500,
    windows: 2000,
  },

  roiSavings: {
    solar: 0.4,
    insulation: 0.25,
    windows: 0.15,
  },
} as const;