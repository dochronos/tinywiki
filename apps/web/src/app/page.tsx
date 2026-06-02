import Link from "next/link";

const sidebarLinks = [
  { href: "/", label: "Home" },
  { href: "/wiki", label: "Wiki" },
  { href: "/tools", label: "Tools" },
  { href: "/providers", label: "Providers" },
  { href: "/dataset", label: "Dataset" },
  {
    href: "/services/energy-analysis",
    label: "Services",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Navigation */}
          <div className="rounded-[2rem] border border-border-soft bg-surface p-6">
            <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
              Navigation
            </p>

            <nav className="mt-5 flex flex-col gap-2">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl px-4 py-3 text-sm text-text-secondary transition hover:bg-surface-soft hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Reserved / Future Ads */}
          <div className="rounded-[2rem] border border-dashed border-border-soft bg-surface p-6">
            <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
              Reserved Space
            </p>

            <p className="mt-4 text-sm leading-6 text-text-secondary">
              Espacio pensado para futuras integraciones:
              sponsors, newsletter, anuncios o recursos
              destacados.
            </p>
          </div>
        </aside>

        {/* Content */}
        <div>
          {/* Hero */}
          <section>
            <div className="rounded-[2rem] border border-border-soft bg-surface p-10 md:p-14">
              <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
                Sustainability · Energy · Data
              </p>

              <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight text-text-primary">
                Herramientas y datos sobre sustentabilidad en Argentina
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
                TinyWiki combina contenido educativo,
                herramientas interactivas, datasets y análisis
                para ayudar a tomar mejores decisiones sobre
                energía solar, eficiencia energética y vida
                off-grid.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/tools"
                  className="rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Explorar herramientas
                </Link>

                <Link
                  href="/services/energy-analysis"
                  className="rounded-2xl border border-border-soft px-5 py-3 text-sm font-medium transition hover:bg-surface-soft"
                >
                  Ver servicios
                </Link>
              </div>
            </div>
          </section>

          {/* Platform Sections */}
          <section className="mt-12">
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  href: "/wiki",
                  title: "Wiki",
                  text:
                    "Guías y contenido educativo sobre energía solar, tiny houses y sustentabilidad.",
                },
                {
                  href: "/tools",
                  title: "Herramientas",
                  text:
                    "Calculadoras, checklists y simuladores para evaluar mejoras energéticas.",
                },
                {
                  href: "/providers",
                  title: "Proveedores",
                  text:
                    "Dataset estructurado de proveedores y soluciones relacionadas.",
                },
                {
                  href: "/dataset",
                  title: "Dataset",
                  text:
                    "Exploración y transparencia sobre los datos utilizados.",
                },
                {
                  href: "/services/energy-analysis",
                  title: "Servicios",
                  text:
                    "Evaluaciones energéticas y recomendaciones orientadas a eficiencia.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[1.75rem] border border-border-soft bg-surface p-6 transition hover:-translate-y-1 hover:bg-surface-soft hover:shadow-sm"
                >
                  <h2 className="text-xl font-semibold">
                    {item.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {item.text}
                  </p>
                </Link>
              ))}

              <a
                href="https://github.com/dochronos/tinywiki"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[1.75rem] border border-border-soft bg-surface p-6 transition hover:-translate-y-1 hover:bg-surface-soft hover:shadow-sm"
              >
                <h2 className="text-xl font-semibold">
                  GitHub
                </h2>

                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  Repositorio público con código, datasets y
                  desarrollo incremental del proyecto.
                </p>
              </a>
            </div>
          </section>

          {/* Why TinyWiki */}
          <section className="mt-16 rounded-[2rem] border border-border-soft bg-surface p-10">
            <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
              Philosophy
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Un proyecto orientado a decisiones reales
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-text-secondary">
              TinyWiki busca transformar información compleja
              en herramientas prácticas y accesibles para
              personas interesadas en reducir consumo
              energético, mejorar eficiencia y explorar
              alternativas sustentables.
            </p>
          </section>

          {/* CTA */}
          <section className="mt-12 rounded-[2rem] border border-border-soft bg-surface p-10 md:p-12">
            <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
              Featured Tool
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Empezá a explorar TinyWiki
            </h2>

            <p className="mt-4 max-w-2xl text-text-secondary">
              Descubrí herramientas, datasets y recursos para
              entender mejor el impacto energético de una
              vivienda.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/tools/ecobuild-insight"
                className="rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Abrir EcoBuild Insight
              </Link>

              <Link
                href="/providers-map"
                className="rounded-2xl border border-border-soft px-5 py-3 text-sm font-medium transition hover:bg-surface-soft"
              >
                Ver mapa de proveedores
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}