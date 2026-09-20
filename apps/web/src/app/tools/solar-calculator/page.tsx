import Link from "next/link";
import SolarCalculator from "./SolarCalculator";

export const metadata = {
  title: "Calculadora solar gratuita en Argentina | TinyWiki",
  description:
    "Calculadora solar gratuita y orientativa para estimar un rango de tamaño del sistema solar y paneles según consumo mensual, provincia y objetivo.",
};

export default function SolarCalculatorPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      {/* Header */}
      <header className="rounded-3xl border border-border-soft bg-surface p-8">
        <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
          Herramienta gratuita · Energía solar
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
          Calculadora solar
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-text-secondary">
          Estimá de forma orientativa el tamaño de un sistema solar para tu
          vivienda según tu consumo mensual, provincia y objetivo energético.
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-border-soft bg-surface-soft px-3 py-1.5 text-text-secondary">
            Gratis
          </span>

          <span className="rounded-full border border-border-soft bg-surface-soft px-3 py-1.5 text-text-secondary">
            Sin registro
          </span>

          <span className="rounded-full border border-border-soft bg-surface-soft px-3 py-1.5 text-text-secondary">
            Resultado orientativo
          </span>
        </div>
      </header>

      {/* Calculator */}
      <section className="mt-8">
        <SolarCalculator />
      </section>

      {/* Methodology / disclaimer */}
      <section className="mt-8 rounded-3xl border border-border-soft bg-surface-soft p-6">
        <p className="tw-mono text-xs uppercase tracking-wide text-text-secondary">
          Sobre esta herramienta
        </p>

        <p className="mt-3 text-sm leading-6 text-text-secondary">
          La estimación utiliza horas solares promedio por provincia, un factor
          de pérdidas conservador y un objetivo de cobertura según el modo
          seleccionado. El resultado se expresa como un rango para evitar una
          falsa precisión.
        </p>

        <p className="mt-3 text-xs leading-5 text-text-secondary">
          Esta herramienta es orientativa. No constituye una cotización ni
          reemplaza una evaluación técnica de la vivienda, del sitio o del
          sistema a instalar.
        </p>
      </section>

      {/* Next step */}
      <section className="mt-8 rounded-3xl border border-border-soft bg-surface p-7">
        <p className="tw-mono text-xs uppercase tracking-wide text-text-secondary">
          Siguiente nivel
        </p>

        <h2 className="mt-3 text-xl font-semibold tracking-tight text-text-primary">
          ¿Necesitás analizar tu vivienda en mayor profundidad?
        </h2>

        <p className="mt-3 max-w-2xl leading-7 text-text-secondary">
          Esta calculadora sirve como primer acercamiento. Si querés evaluar
          diferentes variables de tu vivienda, estimar oportunidades de mejora
          y obtener un análisis más completo, podés conocer nuestro servicio de
          análisis energético.
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
        <Link href="/tools/solar-readiness" className="hover:text-primary hover:underline">
          Checklist solar
        </Link>

        <span className="text-neutral-400">·</span>

        <Link
          href="/tools/termotanque-readiness"
          className="hover:text-primary hover:underline"
        >
          Checklist termotanque solar
        </Link>

        <span className="text-neutral-400">·</span>

        <Link href="/providers" className="hover:text-primary hover:underline">
          Proveedores
        </Link>

        <span className="text-neutral-400">·</span>

        <Link href="/wiki" className="hover:text-primary hover:underline">
          Wiki
        </Link>

        <span className="text-neutral-400">·</span>

        <Link href="/tools" className="hover:text-primary hover:underline">
          Todas las herramientas
        </Link>
      </nav>
    </main>
  );
}