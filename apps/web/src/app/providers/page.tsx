import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ProvidersTable, { ProviderRow } from "./ProvidersTable";

export const metadata = {
  title: "Proveedores de energía solar y tiny houses en Argentina | TinyWiki",
  description:
    "Base consultable de proveedores locales en Argentina (energía solar, solar térmica y construcción), con dataset para análisis y BI.",
};

function resolveProvidersCsvPath() {
  const a = path.join(process.cwd(), "data", "sheets", "providers.csv");
  if (fs.existsSync(a)) return a;

  const b = path.join(process.cwd(), "..", "..", "data", "sheets", "providers.csv");
  if (fs.existsSync(b)) return b;

  const c = path.join(process.cwd(), "..", "..", "..", "data", "sheets", "providers.csv");
  if (fs.existsSync(c)) return c;

  throw new Error("providers.csv not found. Expected at /data/sheets/providers.csv in repo root.");
}

function parseCsv(csv: string): ProviderRow[] {
  const lines = csv
    .split(/\r?\n/)
    .map((l) => l.trimEnd())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = splitCsvLine(lines[0]).map((h) => h.trim());
  const rows = lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = (values[i] ?? "").trim();
    });
    return obj;
  });

  return rows.map((r) => ({
    provider_id: r.provider_id ?? "",
    provider_name: r.provider_name ?? "",
    category: r.category ?? "",
    subcategory: r.subcategory ?? "",
    province: r.province ?? "",
    city: r.city ?? "",
    website: r.website ?? "",
    whatsapp: r.whatsapp ?? "",
    email: r.email ?? "",
    price_level: r.price_level ?? "",
    notes: r.notes ?? "",
    source_url: r.source_url ?? "",
    last_verified: r.last_verified ?? "",
  }));
}

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      const next = line[i + 1];
      if (inQuotes && next === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }

    cur += ch;
  }

  out.push(cur);
  return out;
}

export default function ProvidersPage() {
  const csvPath = resolveProvidersCsvPath();
  const csv = fs.readFileSync(csvPath, "utf8");
  const providers = parseCsv(csv);

  const sorted = [...providers].sort((a, b) => {
    const c = a.category.localeCompare(b.category);
    if (c !== 0) return c;
    const p = a.province.localeCompare(b.province);
    if (p !== 0) return p;
    return a.provider_name.localeCompare(b.provider_name);
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Proveedores</h1>
        <p className="text-sm text-neutral-600">
          Base consultable de proveedores locales en Argentina (fuente + última verificación). Este dataset también se usa
          para análisis y BI (Power BI).
        </p>

        <div className="pt-2 text-sm">
          <Link href="/tools" className="underline">
            Herramientas
          </Link>
          <span className="text-neutral-400"> · </span>
          <Link href="/wiki" className="underline">
            Wiki
          </Link>
          <span className="text-neutral-400"> · </span>
          <Link href="/providers-map" className="underline">
            Ver mapa
          </Link>
        </div>
      </header>

      <section className="mt-6 rounded-2xl border p-5 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-medium">Exploración geográfica</h2>
            <p className="text-sm text-neutral-600">
              También podés recorrer el dataset en una vista visual por ciudad y provincia.
            </p>
          </div>

          <Link
            href="/providers-map"
            className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            Abrir mapa interactivo
          </Link>
        </div>
      </section>

      <section className="mt-6">
        <ProvidersTable providers={sorted} />
      </section>

      <footer className="mt-8 text-xs text-neutral-500">
        Nota: esta lista es informativa. Verificá disponibilidad y condiciones directamente con cada proveedor.
      </footer>
    </main>
  );
}