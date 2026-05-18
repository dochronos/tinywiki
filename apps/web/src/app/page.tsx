import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* Hero */}
      <section className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          TinyWiki
        </p>

        <h1 className="mt-4 text-5xl font-bold tracking-tight text-neutral-900">
          Herramientas y datos sobre sustentabilidad en Argentina
        </h1>

        <p className="mt-6 text-lg leading-8 text-neutral-600">
          TinyWiki combina contenido educativo, herramientas interactivas,
          datasets y análisis para ayudar a tomar mejores decisiones sobre
          energía solar, eficiencia energética y vida off-grid.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/tools"
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Explorar herramientas
          </Link>

          <Link
            href="/services/energy-analysis"
            className="rounded-xl border px-5 py-3 text-sm font-medium transition hover:bg-neutral-100"
          >
            Ver servicios
          </Link>
        </div>
      </section>

      {/* Platform Sections */}
      <section className="mt-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Wiki */}
          <Link
            href="/wiki"
            className="rounded-2xl border p-6 transition hover:bg-neutral-50"
          >
            <h2 className="text-xl font-semibold">Wiki</h2>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Guías y contenido educativo sobre energía solar, tiny houses
              y sustentabilidad en Argentina.
            </p>
          </Link>

          {/* Tools */}
          <Link
            href="/tools"
            className="rounded-2xl border p-6 transition hover:bg-neutral-50"
          >
            <h2 className="text-xl font-semibold">Herramientas</h2>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Checklists, calculadoras y simuladores para evaluar mejoras
              energéticas y costos.
            </p>
          </Link>

          {/* Providers */}
          <Link
            href="/providers"
            className="rounded-2xl border p-6 transition hover:bg-neutral-50"
          >
            <h2 className="text-xl font-semibold">Proveedores</h2>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Dataset estructurado de proveedores relacionados con energía
              solar y soluciones off-grid.
            </p>
          </Link>

          {/* Dataset */}
          <Link
            href="/dataset"
            className="rounded-2xl border p-6 transition hover:bg-neutral-50"
          >
            <h2 className="text-xl font-semibold">Dataset</h2>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Exploración, documentación y transparencia sobre los datos
              utilizados en TinyWiki.
            </p>
          </Link>

          {/* Services */}
          <Link
            href="/services/energy-analysis"
            className="rounded-2xl border p-6 transition hover:bg-neutral-50"
          >
            <h2 className="text-xl font-semibold">Servicios</h2>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Evaluaciones energéticas orientativas para viviendas y
              recomendaciones enfocadas en ahorro y eficiencia.
            </p>
          </Link>

          {/* GitHub */}
          <a
            href="https://github.com/dochronos/tinywiki"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border p-6 transition hover:bg-neutral-50"
          >
            <h2 className="text-xl font-semibold">GitHub</h2>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Repositorio público con código, datasets y desarrollo
              incremental del proyecto.
            </p>
          </a>
        </div>
      </section>

      {/* Why TinyWiki */}
      <section className="mt-24 max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight">
          Un proyecto orientado a decisiones reales
        </h2>

        <p className="mt-6 text-lg leading-8 text-neutral-600">
          TinyWiki busca transformar información compleja en herramientas
          prácticas y accesibles para personas interesadas en reducir consumo
          energético, mejorar eficiencia y explorar alternativas sustentables.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-24 rounded-3xl border bg-neutral-50 p-10">
        <h2 className="text-3xl font-bold tracking-tight">
          Empezá a explorar TinyWiki
        </h2>

        <p className="mt-4 max-w-2xl text-neutral-600">
          Descubrí herramientas, datasets y recursos para entender mejor
          el impacto energético de una vivienda.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/tools/ecobuild-insight"
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Abrir EcoBuild Insight
          </Link>

          <Link
            href="/providers-map"
            className="rounded-xl border px-5 py-3 text-sm font-medium transition hover:bg-neutral-100"
          >
            Ver mapa de proveedores
          </Link>
        </div>
      </section>
    </main>
  );
}