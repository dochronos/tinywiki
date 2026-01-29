import Link from "next/link";

export const metadata = {
  title: "Datos y BI | TinyWiki",
  description:
    "Dashboard de Power BI (Desktop) conectado al dataset de proveedores. Visualización, archivo .pbix y pipeline de datos.",
};

export default function DataPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Datos y BI</h1>
        <p className="text-sm text-neutral-600">
          Este proyecto incluye un dashboard construido en{" "}
          <strong>Power BI Desktop</strong> a partir del dataset de proveedores.
          El embed web directo requiere Power BI Service con cuenta
          organizacional, por eso aquí se muestra el artefacto y el pipeline de
          datos.
        </p>

        <div className="pt-2 text-sm">
          <Link href="/providers" className="underline">
            Proveedores
          </Link>
          <span className="text-neutral-400"> · </span>
          <Link href="/wiki" className="underline">
            Wiki
          </Link>
          <span className="text-neutral-400"> · </span>
          <Link href="/tools" className="underline">
            Herramientas
          </Link>
        </div>
      </header>

      {/* Dashboard */}
      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border p-5 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-medium">Power BI dashboard (Desktop)</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Visualización del dashboard conectado al dataset de proveedores
            (categorías, provincias/ciudades, verificación y filtros).
          </p>

          <div className="mt-4 overflow-hidden rounded-2xl border">
            <img
              src="/bi/powerbi_dashboard.png"
              alt="Power BI dashboard showing providers by category, province and verification status"
              className="w-full"
            />
          </div>
        </div>

        <div className="rounded-2xl border p-5 shadow-sm">
          <h2 className="text-lg font-medium">Archivos del proyecto</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <span className="text-neutral-600">Dataset (CSV): </span>
              <code className="rounded bg-neutral-100 px-1 py-0.5">
                data/sheets/providers.csv
              </code>
            </li>
            <li>
              <span className="text-neutral-600">Power BI file: </span>
              <code className="rounded bg-neutral-100 px-1 py-0.5">
                bi/powerbi/tinywiki_providers.pbix
              </code>
            </li>
          </ul>

          <p className="mt-4 text-xs text-neutral-500">
            El archivo <code>.pbix</code> permite revisar el modelo, relaciones,
            métricas y visuales directamente en Power BI Desktop.
          </p>
        </div>
      </section>

      {/* Pipeline */}
      <section className="mt-8 rounded-2xl border p-5">
        <h2 className="text-lg font-medium">Pipeline de datos</h2>
        <ol className="mt-3 list-decimal pl-5 text-sm text-neutral-700 space-y-1">
          <li>Proveedores curados manualmente en Google Sheets.</li>
          <li>Export del dataset a CSV versionado en el repositorio.</li>
          <li>Next.js consume el CSV para la página de Proveedores.</li>
          <li>Power BI Desktop consume el mismo dataset para el dashboard.</li>
        </ol>
      </section>

      <footer className="mt-8 text-xs text-neutral-500">
        Nota: el dashboard es un artefacto reproducible y se actualiza cada vez
        que cambia el dataset.
      </footer>
    </main>
  );
}
