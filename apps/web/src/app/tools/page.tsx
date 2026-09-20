import Link from "next/link";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Herramientas | TinyWiki",
  description:
    "Herramientas gratuitas y análisis energéticos orientativos para explorar consumo, energía solar y eficiencia en viviendas de Argentina.",
};

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      {/* HERO */}
      <section>
        <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
          TinyWiki · Tools
        </p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-text-primary">
          Herramientas
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-text-secondary">
          Explorá, calculá y evaluá antes de tomar una decisión.
          Empezá con herramientas gratuitas y, si necesitás profundizar,
          avanzá hacia un análisis energético más completo.
        </p>
      </section>

      {/* FREE TOOLS */}
      <section className="mt-14">
        <div>
          <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
            Free tools
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
            Herramientas gratuitas
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-text-secondary">
            Probá estas herramientas sin registrarte para obtener
            estimaciones y evaluaciones iniciales sobre tu vivienda.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <Link
            href="/tools/solar-readiness"
            className="block transition hover:-translate-y-0.5"
          >
            <Card className="h-full transition hover:border-primary">
              <p className="tw-mono text-xs uppercase tracking-wide text-text-secondary">
                Checklist
              </p>

              <h3 className="mt-3 text-lg font-semibold text-text-primary">
                ¿Estoy listo para energía solar?
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Evaluá consumo, espacio, exposición solar y objetivos
                antes de avanzar con una instalación.
              </p>

              <p className="mt-5 text-sm font-medium text-primary">
                Comenzar →
              </p>
            </Card>
          </Link>

          <Link
            href="/tools/solar-calculator"
            className="block transition hover:-translate-y-0.5"
          >
            <Card className="h-full transition hover:border-primary">
              <p className="tw-mono text-xs uppercase tracking-wide text-text-secondary">
                Calculadora
              </p>

              <h3 className="mt-3 text-lg font-semibold text-text-primary">
                Calculadora solar
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Estimá un rango de tamaño del sistema y cantidad de
                paneles según consumo, provincia y objetivo.
              </p>

              <p className="mt-5 text-sm font-medium text-primary">
                Calcular →
              </p>
            </Card>
          </Link>

          <Link
            href="/tools/termotanque-readiness"
            className="block transition hover:-translate-y-0.5"
          >
            <Card className="h-full transition hover:border-primary">
              <p className="tw-mono text-xs uppercase tracking-wide text-text-secondary">
                Checklist
              </p>

              <h3 className="mt-3 text-lg font-semibold text-text-primary">
                ¿Estoy listo para un termotanque solar?
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Revisá consumo de agua caliente, espacio, exposición
                solar y condiciones básicas de instalación.
              </p>

              <p className="mt-5 text-sm font-medium text-primary">
                Comenzar →
              </p>
            </Card>
          </Link>
        </div>
      </section>

      {/* ECOBUILD INSIGHT */}
      <section className="mt-16">
        <div>
          <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
            Go deeper
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
            Explorá tu vivienda
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-text-secondary">
            Si querés ir más allá de una calculadora puntual, EcoBuild
            Insight reúne distintas variables para construir una primera
            visión energética de tu vivienda.
          </p>
        </div>

        <Link
          href="/tools/ecobuild-insight"
          className="mt-6 block transition hover:-translate-y-0.5"
        >
          <Card className="transition hover:border-primary">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="tw-mono text-xs uppercase tracking-wide text-text-secondary">
                  EcoBuild Insight
                </p>

                <h3 className="mt-3 text-xl font-semibold text-text-primary">
                  Análisis energético de tu vivienda
                </h3>

                <p className="mt-2 text-sm leading-7 text-text-secondary">
                  Estimá consumo energético, identificá oportunidades
                  de mejora, compará tu vivienda con un benchmark y
                  explorá posibles ahorros y retornos de inversión.
                </p>

                <p className="mt-4 text-xs text-text-secondary">
                  Herramienta orientativa · Sin registro
                </p>
              </div>

              <div className="shrink-0 text-sm font-medium text-primary">
                Explorar análisis →
              </div>
            </div>
          </Card>
        </Link>
      </section>

      {/* PERSONALIZED ANALYSIS */}
      <section className="mt-16 rounded-3xl border border-border-soft bg-surface p-8">
        <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
          Personalized analysis
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-text-primary">
          ¿Necesitás un análisis más completo?
        </h2>

        <p className="mt-3 max-w-2xl leading-7 text-text-secondary">
          Si necesitás analizar una vivienda concreta con más información,
          documentación, objetivos y variables específicas, TinyWiki puede
          ayudarte a construir un análisis energético personalizado.
        </p>

        <Link
          href="/services/energy-analysis"
          className="mt-6 inline-block rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Solicitar análisis →
        </Link>
      </section>

      {/* DISCLAIMER */}
      <footer className="mt-10 text-xs leading-6 text-text-secondary">
        Los resultados de estas herramientas son orientativos y no
        reemplazan una evaluación técnica profesional en sitio.
      </footer>
    </main>
  );
}