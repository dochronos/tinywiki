export const cityFactors = {
  buenos_aires: {
    label: "Buenos Aires",
    factor: 1,
    solarEfficiency: 1,
  },

  cordoba: {
    label: "Córdoba",
    factor: 0.92,
    solarEfficiency: 1.1,
  },

  mendoza: {
    label: "Mendoza",
    factor: 0.85,
    solarEfficiency: 1.2,
  },
};

export type CityKey = keyof typeof cityFactors;