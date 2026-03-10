import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ProvidersMap from "./ProvidersMap";

export const metadata = {
  title: "Mapa de proveedores en Argentina | TinyWiki",
  description:
    "Mapa interactivo de proveedores locales de energía solar, solar térmica y construcción en Argentina.",
};

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

function resolveProvidersCsvPath() {
  const a = path.join(process.cwd(), "data", "sheets", "providers.csv");
  if (fs.existsSync(a)) return a;

  const b = path.join(process.cwd(), "..", "..", "data", "sheets", "providers.csv");
  if (fs.existsSync(b)) return b;

  const c = path.join(process.cwd(), "..", "..", "..", "data", "sheets", "providers.csv");
  if (fs.existsSync(c)) return c;

  throw new Error("providers.csv not found.");
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

function parseCsv(csv: string): ProviderRow[] {
  const lines = csv
    .split(/\r?\n/)
    .map((l) => l.trimEnd())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = splitCsvLine(lines[0]).map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    const obj: Record<string, string> = {};

    headers.forEach((h, i) => {
      obj[h] = (values[i] ?? "").trim();
    });

    return {
      provider_id: obj.provider_id ?? "",
      provider_name: obj.provider_name ?? "",
      category: obj.category ?? "",
      subcategory: obj.subcategory ?? "",
      province: obj.province ?? "",
      city: obj.city ?? "",
      website: obj.website ?? "",
      whatsapp: obj.whatsapp ?? "",
      email: obj.email ?? "",
      price_level: obj.price_level ?? "",
      notes: obj.notes ?? "",
      source_url: obj.source_url ?? "",
      last_verified: obj.last_verified ?? "",
    };
  });
}

export default function ProvidersMapPage() {
  const csvPath = resolveProvidersCsvPath();
  const csv = fs.readFileSync(csvPath, "utf8");
  const providers = parseCsv(csv);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Mapa de proveedores</h1>
        <p className="text-sm text-neutral-600">
          Vista geográfica del dataset de proveedores en Argentina. Esta versión usa ubicaciones aproximadas por ciudad.
        </p>

        <div className="pt-2 text-sm">
          <Link href="/providers" className="underline">
            Volver a proveedores
          </Link>
          <span className="text-neutral-400"> · </span>
          <Link href="/data" className="underline">
            Datos y BI
          </Link>
        </div>
      </header>

      <section className="mt-6">
        <ProvidersMap providers={providers} />
      </section>
    </main>
  );
}