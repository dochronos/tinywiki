import Link from "next/link";

export const metadata = {
  title: "Herramientas de energía solar en Argentina | TinyWiki",
  description:
    "Checklists y calculadoras orientativas para tomar decisiones sobre energía solar y soluciones off-grid en Argentina.",
};

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Herramientas
        </h1>

        <p className="text-sm text-text-secondary">
          Checklists y calculadoras orientativas para tomar decisiones antes
          de invertir tiempo o dinero.
        </p>

        {/* Navigation */}
        <div className="pt-2 text-sm">
          <Link href="/wiki" className="underline">
            Wiki
          </Link>

          <span className="text-neutral-400"> · </span>

          <Link href="/providers" className="underline">
            Proveedores
          </Link>

          <span className="text-neutral-400"> · </span>

          <Link
            href="/services/energy-analysis"
            className="underline"
          >
            Servicios
          </Link>
        </div>
      </header>

      {/* Tools */}
      <section className="mt-6 space-y-3">
        <Link
          href="/tools/solar-readiness"
          className="block rounded-2xl border p-5 shadow-sm transition hover:bg-neutral-50"
        >
          <div className="font-medium">
            Checklist: ¿Estoy listo para energía solar?
          </div>

          <div className="mt-1 text-sm text-text-secondary">
            Evalúa preparación básica (consumo, espacio, sol y objetivos)
            antes de avanzar.
          </div>
        </Link>

        <Link
          href="/tools/termotanque-readiness"
          className="block rounded-2xl border p-5 shadow-sm transition hover:bg-neutral-50"
        >
          <div className="font-medium">
            Checklist: ¿Estoy listo para un termotanque solar?
          </div>

          <div className="mt-1 text-sm text-text-secondary">
            Evalúa consumo de agua caliente, espacio, sol y estado de la
            instalación.
          </div>
        </Link>

        <Link
          href="/tools/solar-calculator"
          className="block rounded-2xl border p-5 shadow-sm transition hover:bg-neutral-50"
        >
          <div className="font-medium">
            Calculadora: estimación solar (Argentina)
          </div>

          <div className="mt-1 text-sm text-text-secondary">
            Estima un rango de kWp y paneles según consumo mensual,
            provincia y objetivo.
          </div>
        </Link>

        <Link
          href="/tools/ecobuild-insight"
          className="block rounded-2xl border p-5 shadow-sm transition hover:bg-neutral-50"
        >
          <div className="font-medium">
            EcoBuild Insight
          </div>

          <div className="mt-1 text-sm text-text-secondary">
            Estimá consumo energético, mejoras sustentables y retorno de
            inversión para viviendas en Argentina.
          </div>
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-8 text-xs text-neutral-500">
        Nota: los resultados son orientativos y no reemplazan una evaluación
        técnica en sitio.
      </footer>
    </main>
  );
}