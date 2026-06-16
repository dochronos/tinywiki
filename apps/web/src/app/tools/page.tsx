import Link from "next/link";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Herramientas de energía solar en Argentina | TinyWiki",
  description:
    "Checklists y calculadoras orientativas para tomar decisiones sobre energía solar y soluciones off-grid en Argentina.",
};

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header>
        <Card className="bg-surface">
          <h1 className="text-3xl font-semibold tracking-tight">
            Herramientas
          </h1>

          <p className="mt-3 text-text-secondary">
            Checklists y calculadoras orientativas para tomar decisiones antes
            de invertir tiempo o dinero.
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link
              href="/wiki"
              className="font-medium hover:underline"
            >
              Wiki
            </Link>

            <Link
              href="/providers"
              className="font-medium hover:underline"
            >
              Proveedores
            </Link>

            <Link
              href="/services/energy-analysis"
              className="font-medium hover:underline"
            >
              Servicios
            </Link>
          </div>
        </Card>
      </header>

      <section className="mt-6 space-y-3">
        <Link
          href="/tools/solar-readiness"
          className="block transition-opacity hover:opacity-90"
        >
          <Card>
            <div className="font-medium">
              Checklist: ¿Estoy listo para energía solar?
            </div>

            <div className="mt-1 text-sm text-text-secondary">
              Evalúa preparación básica (consumo, espacio, sol y objetivos)
              antes de avanzar.
            </div>
          </Card>
        </Link>

        <Link
          href="/tools/termotanque-readiness"
          className="block transition-opacity hover:opacity-90"
        >
          <Card>
            <div className="font-medium">
              Checklist: ¿Estoy listo para un termotanque solar?
            </div>

            <div className="mt-1 text-sm text-text-secondary">
              Evalúa consumo de agua caliente, espacio, sol y estado de la
              instalación.
            </div>
          </Card>
        </Link>

        <Link
          href="/tools/solar-calculator"
          className="block transition-opacity hover:opacity-90"
        >
          <Card>
            <div className="font-medium">
              Calculadora: estimación solar (Argentina)
            </div>

            <div className="mt-1 text-sm text-text-secondary">
              Estima un rango de kWp y paneles según consumo mensual,
              provincia y objetivo.
            </div>
          </Card>
        </Link>

        <Link
          href="/tools/ecobuild-insight"
          className="block transition-opacity hover:opacity-90"
        >
          <Card>
            <div className="font-medium">
              EcoBuild Insight
            </div>

            <div className="mt-1 text-sm text-text-secondary">
              Estimá consumo energético, mejoras sustentables y retorno de
              inversión para viviendas en Argentina.
            </div>
          </Card>
        </Link>
      </section>

      <footer className="mt-8 text-xs text-neutral-500">
        Nota: los resultados son orientativos y no reemplazan una evaluación
        técnica en sitio.
      </footer>
    </main>
  );
}