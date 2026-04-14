import fs from "fs";
import path from "path";

type Provider = {
  provider_id: string;
  provider_name: string;
  category: string;
  subcategory: string;
  province: string;
  city: string;
  website: string;
  price_level: string;
  last_verified: string;
};

// -----------------------------
// CSV Parser (simple but safe)
// -----------------------------
function parseCSV(data: string): Provider[] {
  const lines = data.split("\n").slice(1);

  return lines
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => line.split(","))
    .filter((cols) => cols.length >= 9)
    .map((cols) => ({
      provider_id: cols[0],
      provider_name: cols[1],
      category: cols[2],
      subcategory: cols[3],
      province: cols[4],
      city: cols[5],
      website: cols[6],
      price_level: cols[7],
      last_verified: cols[8],
    }));
}

// -----------------------------
// Bar Component
// -----------------------------
function Bar({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const width = max > 0 ? (value / max) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-3">
        <div
          className="bg-neutral-800 h-3 rounded-full"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function DataExplorationPage() {
  // -----------------------------
  // Path resolution (robust)
  // -----------------------------
  const ROOT = path.resolve(process.cwd(), "..", "..");

  const filePath = path.join(
    ROOT,
    "data",
    "sheets",
    "providers_clean.csv"
  );

  // -----------------------------
  // Read + parse data
  // -----------------------------
  const file = fs.readFileSync(filePath, "utf-8");
  const providers = parseCSV(file);

  // -----------------------------
  // Metrics
  // -----------------------------
  const total = providers.length;

  const withWebsite = providers.filter(
    (p) => p.website && p.website.trim() !== ""
  ).length;

  const withVerified = providers.filter(
    (p) => p.last_verified && p.last_verified.trim() !== ""
  ).length;

  // -----------------------------
  // Group by province
  // -----------------------------
  const byProvince: Record<string, number> = {};

  providers.forEach((p) => {
    const province = p.province?.trim() || "Unknown";

    if (!byProvince[province]) {
      byProvince[province] = 0;
    }

    byProvince[province]++;
  });

  const topProvinces = Object.entries(byProvince)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // -----------------------------
  // Group by category
  // -----------------------------
  const byCategory: Record<string, number> = {};

  providers.forEach((p) => {
    const category = p.category?.trim() || "Unknown";

    if (!byCategory[category]) {
      byCategory[category] = 0;
    }

    byCategory[category]++;
  });

  const topCategories = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // -----------------------------
  // Safe percentages
  // -----------------------------
  const websitePct =
    total > 0 ? Math.round((withWebsite / total) * 100) : 0;

  const verifiedPct =
    total > 0 ? Math.round((withVerified / total) * 100) : 0;

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">Data Exploration</h1>

      <p className="mt-4 text-neutral-600">
        Quick insights derived from the TinyWiki providers dataset.
      </p>

      {/* KPIs */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="p-4 border rounded-xl">
          <p className="text-sm text-neutral-500">Total providers</p>
          <p className="text-2xl font-semibold">{total}</p>
        </div>

        <div className="p-4 border rounded-xl">
          <p className="text-sm text-neutral-500">With website</p>
          <p className="text-2xl font-semibold">{websitePct}%</p>
        </div>

        <div className="p-4 border rounded-xl">
          <p className="text-sm text-neutral-500">Verified</p>
          <p className="text-2xl font-semibold">{verifiedPct}%</p>
        </div>
      </div>

      {/* Provinces Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold">Top provinces</h2>

        {/* List */}
        <ul className="mt-4 space-y-2">
          {topProvinces.map(([province, count]) => (
            <li
              key={province}
              className="flex justify-between border p-3 rounded-lg"
            >
              <span>{province}</span>
              <span>{count}</span>
            </li>
          ))}
        </ul>

        {/* Chart */}
        <div className="mt-8 space-y-4">
          {topProvinces.map(([province, count]) => (
            <Bar
              key={province}
              label={province}
              value={count}
              max={topProvinces[0]?.[1] || 0}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold">Top categories</h2>

        <div className="mt-6 space-y-4">
          {topCategories.map(([category, count]) => (
            <Bar
              key={category}
              label={category}
              value={count}
              max={topCategories[0]?.[1] || 0}
            />
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="mt-12 space-y-3">
        <a href="/providers" className="block underline">
          → Providers table
        </a>
        <a href="/providers-map" className="block underline">
          → Providers map
        </a>
        <a href="/dataset" className="block underline">
          → Dataset documentation
        </a>
      </div>
    </main>
  );
}