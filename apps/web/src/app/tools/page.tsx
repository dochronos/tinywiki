import Link from "next/link";

export const metadata = {
  title: "Herramientas | TinyWiki",
  description: "Herramientas prácticas (checklists y guías) para decisiones off-grid y sustentabilidad.",
};

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Herramientas</h1>
        <p className="text-sm text-neutral-600">
          Checklists y guías interactivas para tomar decisiones antes de invertir tiempo o dinero.
        </p>
      </header>

      <section className="mt-6 space-y-3">
        <Link
          href="/tools/solar-readiness"
          className="block rounded-2xl border p-5 shadow-sm hover:bg-neutral-50"
        >
          <div className="font-medium">Checklist: ¿Estoy listo para energía solar?</div>
          <div className="mt-1 text-sm text-neutral-600">
            Evalúa preparación básica (consumo, espacio, sol, objetivos) y obtiene un resultado orientativo.
          </div>
        </Link>

        <Link
          href="/tools/termotanque-readiness"
          className="block rounded-2xl border p-5 shadow-sm hover:bg-neutral-50"
        >
          <div className="font-medium">Checklist: ¿Estoy listo para un termotanque solar?</div>
          <div className="mt-1 text-sm text-neutral-600">
            Evalúa consumo, espacio, sol y estado de la instalación antes de elegir un sistema térmico.
          </div>
        </Link>

      </section>
    </main>
  );
}
