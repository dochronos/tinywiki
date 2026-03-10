"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LOCATION_POINTS } from "@/lib/locations";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type LeafletDefaultIconPrototype = typeof L.Icon.Default.prototype & {
  _getIconUrl?: string;
};

const defaultIconPrototype =
  L.Icon.Default.prototype as LeafletDefaultIconPrototype;

delete defaultIconPrototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

type ProviderRow = {
  provider_id: string;
  provider_name: string;
  category: string;
  subcategory: string;
  province: string;
  city: string;
  website: string;
  whatsapp: string;
  email: string;
  price_level: string;
  notes: string;
  source_url: string;
  last_verified: string;
};

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
}

export default function ProvidersMap({
  providers,
}: {
  providers: ProviderRow[];
}) {
  const [category, setCategory] = useState("Todos");
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const categories = useMemo(
    () => uniqueSorted(providers.map((p) => p.category)),
    [providers]
  );

  const mappedProviders = useMemo(() => {
    return providers
      .filter((p) => (category === "Todos" ? true : p.category === category))
      .map((p) => {
        const normalizedCity = p.city?.trim().toLowerCase();
        const normalizedProvince = p.province?.trim().toLowerCase();

        const match =
          LOCATION_POINTS.find(
            (loc) =>
              loc.city?.trim().toLowerCase() === normalizedCity &&
              loc.province.trim().toLowerCase() === normalizedProvince
          ) ||
          LOCATION_POINTS.find(
            (loc) =>
              !loc.city &&
              loc.province.trim().toLowerCase() === normalizedProvince
          );

        return match
          ? {
              ...p,
              lat: match.lat,
              lon: match.lon,
            }
          : null;
      })
      .filter(Boolean) as (ProviderRow & { lat: number; lon: number })[];
  }, [providers, category]);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    const map = L.map(mapRef.current).setView([-34.6037, -58.3816], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    leafletMapRef.current = map;
    markersLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      leafletMapRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!leafletMapRef.current || !markersLayerRef.current) return;

    const layer = markersLayerRef.current;
    layer.clearLayers();

    const bounds: L.LatLngTuple[] = [];

    mappedProviders.forEach((provider) => {
      const marker = L.marker([provider.lat, provider.lon]);

      const popupHtml = `
        <div style="font-size: 14px; line-height: 1.4;">
          <div style="font-weight: 600;">${provider.provider_name}</div>
          <div>${provider.category}</div>
          <div>${provider.city}, ${provider.province}</div>
          ${
            provider.website
              ? `<div><a href="${provider.website}" target="_blank" rel="noreferrer">Sitio web</a></div>`
              : ""
          }
          ${
            provider.source_url
              ? `<div><a href="${provider.source_url}" target="_blank" rel="noreferrer">Fuente</a></div>`
              : ""
          }
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.addTo(layer);

      bounds.push([provider.lat, provider.lon]);
    });

    if (bounds.length > 0) {
      leafletMapRef.current.fitBounds(bounds, { padding: [30, 30] });
    } else {
      leafletMapRef.current.setView([-34.6037, -58.3816], 4);
    }
  }, [mappedProviders]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border p-4 shadow-sm">
        <label className="text-sm font-medium">Categoría</label>
        <select
          className="mt-2 block rounded-xl border px-3 py-2 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Todos</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border">
        <div ref={mapRef} style={{ height: "620px", width: "100%" }} />
      </div>
    </div>
  );
}