"use client";

import { useMemo, useState } from "react";

export type ProviderRow = {
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
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

export default function ProvidersTable({ providers }: { providers: ProviderRow[] }) {
  const categories = useMemo(() => uniqueSorted(providers.map((p) => p.category)), [providers]);
  const provinces = useMemo(() => uniqueSorted(providers.map((p) => p.province)), [providers]);

  const [category, setCategory] = useState<string>("Todos");
  const [province, setProvince] = useState<string>("Todas");
  const [q, setQ] = useState<string>("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return providers.filter((p) => {
      if (category !== "Todos" && p.category !== category) return false;
      if (province !== "Todas" && p.province !== province) return false;

      if (!query) return true;

      const haystack = [
        p.provider_name,
        p.subcategory,
        p.city,
        p.notes,
        p.website,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [providers, category, province, q]);

  return (
    <div className="rounded-2xl border p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-neutral-600">Categoría</label>
            <select
              className="rounded-xl border px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Todos</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-neutral-600">Provincia</label>
            <select
              className="rounded-xl border px-3 py-2 text-sm"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              <option>Todas</option>
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-neutral-600">Búsqueda</label>
            <input
              className="w-full rounded-xl border px-3 py-2 text-sm md:w-64"
              placeholder="Nombre, ciudad, subcategoría..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        <div className="text-xs text-neutral-600">
          Mostrando <span className="font-medium">{filtered.length}</span> de{" "}
          <span className="font-medium">{providers.length}</span>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[900px] border-separate border-spacing-0">
          <thead>
            <tr className="text-left text-xs text-neutral-600">
              <th className="border-b px-3 py-2">Proveedor</th>
              <th className="border-b px-3 py-2">Categoría</th>
              <th className="border-b px-3 py-2">Ubicación</th>
              <th className="border-b px-3 py-2">Contacto</th>
              <th className="border-b px-3 py-2">Verificado</th>
              <th className="border-b px-3 py-2">Fuente</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.provider_id} className="text-sm">
                <td className="border-b px-3 py-3 align-top">
                  <div className="font-medium">{p.provider_name}</div>
                  {p.subcategory ? (
                    <div className="mt-1 text-xs text-neutral-600">{p.subcategory}</div>
                  ) : null}
                  {p.notes ? <div className="mt-2 text-xs text-neutral-600">{p.notes}</div> : null}
                </td>

                <td className="border-b px-3 py-3 align-top">{p.category}</td>

                <td className="border-b px-3 py-3 align-top">
                  <div>{p.province}</div>
                  {p.city ? <div className="text-xs text-neutral-600">{p.city}</div> : null}
                </td>

                <td className="border-b px-3 py-3 align-top">
                  <div className="flex flex-col gap-1 text-xs">
                    {p.website ? (
                      <a className="underline" href={p.website} target="_blank" rel="noreferrer">
                        Sitio web
                      </a>
                    ) : null}
                    {p.email ? <span>{p.email}</span> : null}
                    {p.whatsapp ? <span>{p.whatsapp}</span> : null}
                  </div>
                </td>

                <td className="border-b px-3 py-3 align-top text-xs">{p.last_verified || "-"}</td>

                <td className="border-b px-3 py-3 align-top">
                  {p.source_url ? (
                    <a className="underline text-xs" href={p.source_url} target="_blank" rel="noreferrer">
                      Link
                    </a>
                  ) : (
                    <span className="text-xs text-neutral-500">-</span>
                  )}
                </td>
              </tr>
            ))}

            {filtered.length === 0 ? (
              <tr>
                <td className="px-3 py-6 text-sm text-neutral-600" colSpan={6}>
                  No hay resultados con esos filtros.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
