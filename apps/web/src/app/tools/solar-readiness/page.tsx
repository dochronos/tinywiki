import Link from "next/link";
import SolarReadinessChecklist from "./SolarReadinessChecklist";

export const metadata = {
  title: "Checklist solar gratuita en Argentina | TinyWiki",
  description:
    "Checklist solar gratuita y orientativa para evaluar si una vivienda en Argentina está preparada para avanzar hacia una instalación de energía solar.",
};

export default function SolarReadinessPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      {/* Header */}
      <header className="rounded-3xl border border-border-soft bg-surface p-8">
        <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
          Herramienta gratuita · Energía solar
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
          ¿Estoy listo para energía solar?
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-text-secondary">
          Respondé unas preguntas simples para obtener una primera orientación
          sobre las condiciones de tu vivienda antes de avanzar con una
          instalación solar.
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-border-soft bg-surface-soft px-3 py-1.5 text-text-secondary">
            Gratis
          </span>

          <span className="rounded-full border border-border-soft bg-surface-soft px-3 py-1.5 text-text-secondary">
            Sin registro
          </span>

          <span className="rounded-full border border-border-soft bg-surface-soft px-3 py-1.5 text-text-secondary">
            5 preguntas
          </span>
        </div>
      </header>

      {/* Checklist */}
      <section className="mt-8">
        <SolarReadinessChecklist />
      </section>

      {/* Methodology / disclaimer */}
      <section className="mt-8 rounded-3xl border border-border-soft bg-surface-soft p-6">
        <p className="tw-mono text-xs uppercase tracking-wide text-text-secondary">
          ¿Qué evalúa esta checklist?
        </p>

        <p className="mt-3 text-sm leading-6 text-text-secondary">
          La herramienta considera aspectos básicos relacionados con consumo
          eléctrico, espacio disponible, exposición solar, objetivos y posibles
          cargas críticas.
        </p>

        <p className="mt-3 text-xs leading-5 text-text-secondary">
          El resultado es orientativo y sirve para ordenar las primeras
          preguntas. No reemplaza una evaluación técnica del sitio, del techo,
          de las instalaciones eléctricas ni del sistema solar.
        </p>
      </section>

      {/* Next step */}
      <section className="mt-8 rounded-3xl border border-border-soft bg-surface p-7">
        <p className="tw-mono text-xs uppercase tracking-wide text-text-secondary">
          Siguiente nivel
        </p>

        <h2 className="mt-3 text-xl font-semibold tracking-tight text-text-primary">
          ¿Querés analizar tu vivienda con más detalle?
        </h2>

        <p className="mt-3 max-w-2xl leading-7 text-text-secondary">
          Esta checklist te ayuda a identificar las condiciones iniciales.
          Para analizar consumo, eficiencia energética, oportunidades de mejora
          y otros factores de tu vivienda, podés conocer nuestro análisis
          energético.
        </p>

        <Link
          href="/services/energy-analysis"
          className="mt-5 inline-block rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Conocer el análisis energético
        </Link>
      </section>

      {/* Navigation */}
      <nav className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-secondary">
        <Link
          href="/tools/solar-calculator"
          className="hover:text-primary hover:underline"
        >
          Calculadora solar
        </Link>

        <span className="text-neutral-400">·</span>

        <Link
          href="/tools/termotanque-readiness"
          className="hover:text-primary hover:underline"
        >
          Checklist termotanque solar
        </Link>

        <span className="text-neutral-400">·</span>

        <Link
          href="/providers"
          className="hover:text-primary hover:underline"
        >
          Proveedores
        </Link>

        <span className="text-neutral-400">·</span>

        <Link
          href="/wiki"
          className="hover:text-primary hover:underline"
        >
          Wiki
        </Link>

        <span className="text-neutral-400">·</span>

        <Link
          href="/tools"
          className="hover:text-primary hover:underline"
        >
          Todas las herramientas
        </Link>
      </nav>
    </main>
  );
}