export type LocationPoint = {
  city?: string;
  province: string;
  lat: number;
  lon: number;
};

export const LOCATION_POINTS: LocationPoint[] = [
  { city: "Mar del Plata", province: "Buenos Aires", lat: -38.0055, lon: -57.5426 },
  { city: "La Plata", province: "Buenos Aires", lat: -34.9205, lon: -57.9536 },
  { city: "Bahía Blanca", province: "Buenos Aires", lat: -38.7196, lon: -62.2724 },
  { city: "Córdoba", province: "Córdoba", lat: -31.4201, lon: -64.1888 },
  { city: "Rosario", province: "Santa Fe", lat: -32.9442, lon: -60.6505 },
  { city: "Santa Fe", province: "Santa Fe", lat: -31.6333, lon: -60.7000 },
  { city: "Mendoza", province: "Mendoza", lat: -32.8895, lon: -68.8458 },
  { city: "San Juan", province: "San Juan", lat: -31.5375, lon: -68.5364 },
  { city: "Salta", province: "Salta", lat: -24.7829, lon: -65.4232 },
  { city: "San Miguel de Tucumán", province: "Tucumán", lat: -26.8083, lon: -65.2176 },
  { city: "Neuquén", province: "Neuquén", lat: -38.9516, lon: -68.0591 },
  { city: "Posadas", province: "Misiones", lat: -27.3671, lon: -55.8961 },
];