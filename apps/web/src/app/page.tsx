import Link from "next/link";

const sidebarLinks = [
  { href: "/", label: "Home", active: true },
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
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
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
                  className={`rounded-2xl px-4 py-3 text-sm transition ${
                    link.active
                      ? "bg-surface-soft font-medium text-primary"
                      : "text-text-secondary hover:bg-surface-soft hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Featured Tool */}
          <div className="rounded-[2rem] border border-border-soft bg-surface p-6">
            <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
              Featured Tool
            </p>

            <h3 className="mt-4 text-lg font-semibold">EcoBuild Insight</h3>

            <p className="mt-3 text-sm leading-6 text-text-secondary">
              Interactive energy calculator for estimating housing consumption,
              efficiency and improvement opportunities.
            </p>

            <Link
              href="/tools/ecobuild-insight"
              className="mt-5 inline-flex rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Open tool
            </Link>
          </div>

          {/* Reserved / Future Monetization */}
          <div className="rounded-[2rem] border border-dashed border-border-soft bg-surface p-6">
            <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
              Reserved Space
            </p>

            <p className="mt-4 text-sm leading-6 text-text-secondary">
              Future space reserved for sponsors, newsletter, featured resources
              or monetization integrations.
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
                TinyWiki combina contenido educativo, herramientas interactivas,
                datasets y análisis para ayudar a tomar mejores decisiones sobre
                energía solar, eficiencia energética y vida off-grid.
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
                  text: "Guías y contenido educativo sobre energía solar, tiny houses y sustentabilidad.",
                },
                {
                  href: "/tools",
                  title: "Herramientas",
                  text: "Calculadoras, checklists y simuladores para evaluar mejoras energéticas.",
                },
                {
                  href: "/providers",
                  title: "Proveedores",
                  text: "Dataset estructurado de proveedores y soluciones relacionadas.",
                },
                {
                  href: "/dataset",
                  title: "Dataset",
                  text: "Exploración y transparencia sobre los datos utilizados.",
                },
                {
                  href: "/services/energy-analysis",
                  title: "Servicios",
                  text: "Evaluaciones energéticas y recomendaciones orientadas a eficiencia.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[1.75rem] border border-border-soft bg-surface p-6 transition hover:-translate-y-1 hover:bg-surface-soft hover:shadow-sm"
                >
                  <h2 className="text-xl font-semibold">{item.title}</h2>

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
                <h2 className="text-xl font-semibold">GitHub</h2>

                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  Repositorio público con código, datasets y desarrollo
                  incremental del proyecto.
                </p>
              </a>
            </div>
          </section>

          {/* Platform Snapshot */}
          <section className="mt-16">
            <div className="rounded-[2rem] border border-border-soft bg-surface p-10">
              <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
                Platform Snapshot
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                TinyWiki en desarrollo
              </h2>

              <p className="mt-4 max-w-3xl text-text-secondary">
                TinyWiki se desarrolla públicamente mediante sprints semanales
                que combinan conocimiento sobre sustentabilidad, herramientas
                interactivas y experimentación basada en datos.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {[
                  "27+ Sprints públicos",
                  "Herramientas interactivas",
                  "Desarrollo abierto",
                  "Enfoque energético",
                  "Roadmap público",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-border-soft bg-surface-soft p-5"
                  >
                    <p className="text-sm font-medium text-text-primary">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Resource */}
          <section className="mt-12">
            <div className="rounded-[2rem] border border-border-soft bg-surface p-10">
              <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
                Featured Resource
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                EcoBuild Insight
              </h2>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-text-secondary">
                Analizá el consumo energético estimado de una vivienda,
                identificá oportunidades de mejora y obtené recomendaciones
                orientativas para aumentar la eficiencia energética.
              </p>

              <div className="mt-8">
                <Link
                  href="/tools/ecobuild-insight"
                  className="inline-flex rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Abrir EcoBuild Insight
                </Link>
              </div>
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
              TinyWiki busca transformar información compleja en herramientas
              prácticas y accesibles para personas interesadas en reducir
              consumo energético, mejorar eficiencia y explorar alternativas
              sustentables.
            </p>
          </section>

          {/* Project Roadmap */}
          <section className="mt-12 rounded-[2rem] border border-border-soft bg-surface p-10 md:p-12">
            <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
              Project Roadmap
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Evolución del proyecto
            </h2>

            <p className="mt-4 max-w-2xl text-text-secondary">
              TinyWiki continúa creciendo mediante sprints incrementales
              enfocados en herramientas, datasets, experiencia de usuario y
              recursos sobre sustentabilidad.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-border-soft bg-surface-soft p-5">
                <p className="text-sm font-semibold">Completado</p>

                <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                  <li>✓ EcoBuild Insight</li>
                  <li>✓ Reportes energéticos</li>
                  <li>✓ UI Foundation</li>
                </ul>
              </div>

              <div className="rounded-[1.5rem] border border-border-soft bg-surface-soft p-5">
                <p className="text-sm font-semibold">En progreso</p>

                <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                  <li>• Homepage Evolution</li>
                  <li>• UX Refinement</li>
                  <li>• Platform Structure</li>
                </ul>
              </div>

              <div className="rounded-[1.5rem] border border-border-soft bg-surface-soft p-5">
                <p className="text-sm font-semibold">Próximamente</p>

                <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                  <li>→ Solar ROI Calculator</li>
                  <li>→ Dataset Explorer</li>
                  <li>→ Additional Tools</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
