import Link from "next/link";
import { Card } from "@/components/ui/card";

const sidebarLinks = [
  { href: "/", label: "Home", active: true },
  { href: "/wiki", label: "Wiki" },
  { href: "/tools", label: "Tools" },
  { href: "/providers", label: "Providers" },
  { href: "/dataset", label: "Dataset" },
  { href: "/services/energy-analysis", label: "Services" },
];

const libraryItems = [
  {
    href: "/wiki",
    eyebrow: "Knowledge",
    title: "Wiki",
    text: "Guías prácticas sobre energía solar, eficiencia, tiny houses y soluciones off-grid.",
  },
  {
    href: "/tools",
    eyebrow: "Decision tools",
    title: "Herramientas",
    text: "Calculadoras y checklists para explorar alternativas antes de tomar decisiones.",
  },
  {
    href: "/providers",
    eyebrow: "Local data",
    title: "Proveedores",
    text: "Base estructurada de proveedores y soluciones relacionadas en Argentina.",
  },
  {
    href: "/dataset",
    eyebrow: "Open data",
    title: "Datasets",
    text: "Datos estructurados para exploración, análisis y proyectos de BI.",
  },
];

const featuredTools = [
  {
    href: "/tools/ecobuild-insight",
    title: "EcoBuild Insight",
    text: "Estimá consumo energético, oportunidades de mejora y retorno orientativo.",
  },
  {
    href: "/tools/solar-calculator",
    title: "Solar Calculator",
    text: "Estimá un rango inicial de potencia solar y cantidad de paneles.",
  },
  {
    href: "/tools/solar-readiness",
    title: "Solar Readiness",
    text: "Evaluá si una vivienda está preparada para avanzar hacia energía solar.",
  },
  {
    href: "/tools/termotanque-readiness",
    title: "Termotanque Readiness",
    text: "Revisá las condiciones básicas antes de evaluar un termotanque solar.",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8 md:py-10">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-8 lg:self-start">
          <Card className="p-5">
            <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
              TinyWiki
            </p>

            <p className="mt-3 text-sm leading-6 text-text-secondary">
              Sustainability knowledge, tools and data for Argentina.
            </p>

            <nav className="mt-6 flex flex-col gap-1.5">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-2xl px-4 py-2.5 text-sm transition ${
                    link.active
                      ? "bg-surface-soft font-medium text-primary"
                      : "text-text-secondary hover:bg-surface-soft hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </Card>

          <Card className="p-5">
            <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
              Featured
            </p>

            <h2 className="mt-4 text-lg font-semibold">
              EcoBuild Insight
            </h2>

            <p className="mt-3 text-sm leading-6 text-text-secondary">
              Una herramienta interactiva para explorar consumo energético,
              eficiencia y mejoras sustentables.
            </p>

            <Link
              href="/tools/ecobuild-insight"
              className="mt-5 inline-flex rounded-2xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Abrir herramienta
            </Link>
          </Card>

          <Card className="border-dashed p-5">
            <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
              Open project
            </p>

            <p className="mt-3 text-sm leading-6 text-text-secondary">
              TinyWiki se desarrolla públicamente mediante sprints
              incrementales y experimentación con datos.
            </p>
          </Card>
        </aside>

        {/* Main content */}
        <div className="min-w-0">
          {/* Hero */}
          <section>
            <Card className="overflow-hidden p-8 md:p-12 lg:p-14">
              <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
                Sustainability · Energy · Data
              </p>

              <div className="mt-6 max-w-4xl">
                <h1 className="text-4xl font-semibold tracking-tight text-text-primary md:text-5xl lg:text-6xl">
                  Información para tomar mejores decisiones sobre sustentabilidad.
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary md:text-xl">
                  TinyWiki combina conocimiento práctico, herramientas
                  interactivas y datos abiertos para explorar energía solar,
                  eficiencia energética y vida off-grid en Argentina.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/wiki"
                  className="rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Explorar la Wiki
                </Link>

                <Link
                  href="/tools"
                  className="rounded-2xl border border-border-soft px-5 py-3 text-sm font-medium transition hover:bg-surface-soft"
                >
                  Ver herramientas
                </Link>

                <Link
                  href="/dataset"
                  className="rounded-2xl border border-border-soft px-5 py-3 text-sm font-medium transition hover:bg-surface-soft"
                >
                  Explorar datos
                </Link>
              </div>
            </Card>
          </section>

          {/* Browse the Library */}
          <section className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
                  Browse the library
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  Explorar TinyWiki
                </h2>
              </div>

              <Link
                href="/wiki"
                className="hidden text-sm font-medium text-primary hover:underline sm:block"
              >
                Ver Wiki →
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {libraryItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Card className="h-full transition hover:-translate-y-1 hover:bg-surface-soft hover:shadow-sm">
                    <p className="tw-mono text-xs uppercase tracking-[0.16em] text-text-secondary">
                      {item.eyebrow}
                    </p>

                    <h3 className="mt-4 text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-text-secondary">
                      {item.text}
                    </p>

                    <div className="mt-5 text-sm font-medium text-primary">
                      Explorar →
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured Tools */}
          <section className="mt-12">
            <div>
              <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
                Featured tools
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Herramientas para explorar decisiones
              </h2>

              <p className="mt-3 max-w-2xl text-text-secondary">
                Pequeñas herramientas orientativas para transformar preguntas
                generales en decisiones más concretas.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {featuredTools.map((tool) => (
                <Link key={tool.href} href={tool.href}>
                  <Card className="h-full transition hover:-translate-y-1 hover:bg-surface-soft hover:shadow-sm">
                    <h3 className="text-lg font-semibold">{tool.title}</h3>

                    <p className="mt-3 text-sm leading-6 text-text-secondary">
                      {tool.text}
                    </p>

                    <div className="mt-5 text-sm font-medium text-primary">
                      Abrir herramienta →
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Data Experience */}
          <section className="mt-12">
            <Card className="p-8 md:p-10">
              <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
                    Open data
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                    Datos para explorar y analizar
                  </h2>

                  <p className="mt-4 max-w-2xl leading-7 text-text-secondary">
                    TinyWiki también funciona como una pequeña plataforma de
                    datos. Los datasets pueden explorarse, descargarse y
                    utilizarse como base para análisis y visualizaciones de BI.
                  </p>
                </div>

                <Link
                  href="/dataset"
                  className="inline-flex rounded-2xl border border-border-soft px-5 py-3 text-sm font-medium transition hover:bg-surface-soft"
                >
                  Explorar datasets
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-border-soft bg-surface-soft p-5">
                  <p className="text-sm font-semibold">Explore</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    Descubrí qué información contiene cada dataset.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-border-soft bg-surface-soft p-5">
                  <p className="text-sm font-semibold">Analyze</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    Utilizá los datos para análisis y visualizaciones.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-border-soft bg-surface-soft p-5">
                  <p className="text-sm font-semibold">Download</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    Accedé a los archivos disponibles para reutilizarlos.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Project / Open Blueprint */}
          <section className="mt-12">
            <Card className="p-8 md:p-10">
              <p className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
                Open blueprint project
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Un proyecto que evoluciona públicamente
              </h2>

              <p className="mt-4 max-w-3xl leading-7 text-text-secondary">
                TinyWiki se construye mediante sprints incrementales que
                combinan desarrollo web, datos, herramientas interactivas y
                contenido sobre sustentabilidad.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-border-soft bg-surface-soft p-5">
                  <p className="text-sm font-semibold">Knowledge</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    Contenido práctico y documentación abierta.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-border-soft bg-surface-soft p-5">
                  <p className="text-sm font-semibold">Tools</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    Herramientas para convertir información en decisiones.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-border-soft bg-surface-soft p-5">
                  <p className="text-sm font-semibold">Data</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    Datasets y análisis como parte del producto.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/services/energy-analysis"
                  className="rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Ver servicios
                </Link>

                <a
                  href="https://github.com/dochronos/tinywiki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-border-soft px-5 py-3 text-sm font-medium transition hover:bg-surface-soft"
                >
                  Ver en GitHub
                </a>
              </div>
            </Card>
          </section>

          {/* Footer */}
          <footer className="mt-12 border-t border-border-soft pt-6 pb-4">
            <div className="flex flex-col gap-3 text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between">
              <p>
                TinyWiki · Sustainability · Energy · Data
              </p>

              <p>
                Open project · Argentina
              </p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}