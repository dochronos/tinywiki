import Link from "next/link";
import { Card } from "@/components/ui/card";

const libraryLinks = [
  { href: "/wiki", label: "Solar Energy" },
  { href: "/wiki", label: "Thermal Mass" },
  { href: "/wiki", label: "Passive Cooling" },
  { href: "/services/energy-analysis", label: "Water Systems" },
  { href: "/tools", label: "Calculators" },
];

const libraryItems = [
  {
    href: "/wiki",
    icon: "☼",
    title: "Knowledge",
    text: "Guías prácticas sobre energía solar, eficiencia, tiny houses y soluciones off-grid.",
  },
  {
    href: "/tools",
    icon: "≋",
    title: "Decision Tools",
    text: "Calculadoras y checklists para explorar alternativas antes de tomar decisiones.",
  },
  {
    href: "/providers",
    icon: "⌂",
    title: "Local Data",
    text: "Base estructurada de proveedores y soluciones relacionadas en Argentina.",
  },
  {
    href: "/dataset",
    icon: "◇",
    title: "Open Data",
    text: "Datos estructurados para exploración, análisis y proyectos de BI.",
  },
];

const featuredTools = [
  {
    href: "/tools/ecobuild-insight",
    badge: "v1.0",
    icon: "☼",
    title: "EcoBuild Insight",
    text: "Estimá consumo energético, oportunidades de mejora y retorno orientativo.",
  },
  {
    href: "/tools/solar-calculator",
    badge: "v1.0",
    icon: "◫",
    title: "Solar Calculator",
    text: "Estimá un rango inicial de potencia solar y cantidad de paneles.",
  },
  {
    href: "/tools/solar-readiness",
    badge: "BETA",
    icon: "⌂",
    title: "Solar Readiness",
    text: "Evaluá si una vivienda está preparada para avanzar hacia energía solar.",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8 md:py-10">
      <div className="grid gap-8 lg:grid-cols-[210px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-6 border-border-soft lg:sticky lg:top-6 lg:self-start lg:border-r lg:pr-6">
          <div className="px-2">
            <h2 className="font-serif text-xl font-semibold tracking-tight text-primary">
              Library
            </h2>

            <p className="tw-mono mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-primary">
              Sustainable Energy
            </p>

            <nav className="mt-6 flex flex-col gap-1">
              {libraryLinks.map((link, index) => (
                <Link
                  key={`${link.label}-${index}`}
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-text-primary transition hover:bg-surface-soft hover:text-primary"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 shrink-0 items-center justify-center text-lg text-text-primary"
                  >
                    {["☼", "♨", "≋", "◯", "▣"][index]}
                  </span>

                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t border-border-soft pt-5">
            <Link
              href="/services/energy-analysis"
              className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Contribute
            </Link>

            <nav className="mt-4 flex flex-col gap-1">
              <Link
                href="/wiki"
                className="rounded-lg px-2 py-2 text-sm text-text-primary transition hover:bg-surface-soft hover:text-primary"
              >
                Engineering Docs
              </Link>

              <Link
                href="/services/energy-analysis"
                className="rounded-lg px-2 py-2 text-sm text-text-primary transition hover:bg-surface-soft hover:text-primary"
              >
                Support
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 lg:pl-8">
          {/* Hero */}
          <section>
            <div className="overflow-hidden rounded-[1.5rem] border border-border-soft bg-surface-soft">
              <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                {/* Hero content */}
                <div className="p-7 sm:p-9 md:p-11 lg:p-12">
                  <p className="tw-mono inline-flex rounded-full bg-[#f7d8cc] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
                    Open Blueprint Project
                  </p>

                  <div className="mt-6 max-w-3xl">
                    <h1 className="max-w-[680px] font-serif text-4xl font-semibold leading-[0.98] tracking-tight text-text-primary sm:text-5xl md:text-[3rem] lg:text-[3.15rem]">
                      Diseñando un futuro
                      <span className="block text-primary">sustentable.</span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-7 text-text-secondary md:text-lg">
                      Herramientas de precisión, documentación y datos para
                      explorar energía solar, eficiencia energética y soluciones
                      off-grid en Argentina y LATAM.
                    </p>
                  </div>

                  {/* Hero search / CTA */}
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <div
                      aria-label="Search tools and articles"
                      className="flex min-h-12 flex-1 items-center rounded-xl border border-border-soft bg-background px-4 text-sm text-text-secondary"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="mr-3 h-4 w-4 shrink-0"
                      >
                        <circle cx="11" cy="11" r="6.5" />
                        <path d="m16 16 4 4" />
                      </svg>

                      <span>¿Qué estás construyendo hoy?</span>
                    </div>

                    <Link
                      href="/tools"
                      className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-white transition hover:opacity-90"
                    >
                      Empezar a calcular
                    </Link>
                  </div>
                </div>

                {/* Hero visual */}
                <div className="relative min-h-[280px] overflow-hidden border-t border-border-soft bg-[#ebe3dc] p-6 lg:min-h-full lg:border-l lg:border-t-0">
                  <div className="flex h-full flex-col justify-between">
                    {/* Technical frame */}
                    <div className="relative flex min-h-[220px] flex-1 items-center justify-center rounded-xl border border-[#c9beb5] bg-[#ddd4cd] p-5">
                      <div className="relative h-full min-h-[190px] w-full overflow-hidden rounded-lg border-8 border-[#343434] bg-[#b9b1aa] shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
                        {/* Architectural grid */}
                        <div className="absolute inset-0 opacity-40">
                          <div className="absolute inset-x-0 top-1/4 border-t border-[#f7f3ef]" />
                          <div className="absolute inset-x-0 top-1/2 border-t border-[#f7f3ef]" />
                          <div className="absolute inset-x-0 top-3/4 border-t border-[#f7f3ef]" />
                          <div className="absolute inset-y-0 left-1/4 border-l border-[#f7f3ef]" />
                          <div className="absolute inset-y-0 left-1/2 border-l border-[#f7f3ef]" />
                          <div className="absolute inset-y-0 left-3/4 border-l border-[#f7f3ef]" />
                        </div>

                        {/* Tiny house schematic */}
                        <div className="absolute bottom-[18%] left-[15%] right-[15%] top-[25%]">
                          <div className="absolute bottom-0 left-[8%] right-[8%] h-[3px] bg-[#f7f3ef]" />

                          <div className="absolute bottom-0 left-[14%] h-[78%] w-[3px] bg-[#f7f3ef]" />
                          <div className="absolute bottom-0 right-[14%] h-[78%] w-[3px] bg-[#f7f3ef]" />

                          <div className="absolute bottom-[72%] left-[14%] right-[14%] h-[3px] rotate-[12deg] bg-[#f7f3ef]" />
                          <div className="absolute bottom-[72%] left-[14%] right-[14%] h-[3px] -rotate-[12deg] bg-[#f7f3ef]" />

                          <div className="absolute bottom-[22%] left-[28%] h-[42%] w-[18%] border-2 border-[#f7f3ef]" />
                          <div className="absolute bottom-[22%] right-[28%] h-[42%] w-[18%] border-2 border-[#f7f3ef]" />

                          <div className="absolute bottom-0 left-[50%] h-[22%] w-[3px] -translate-x-1/2 bg-[#f7f3ef]" />
                        </div>

                        {/* Technical marker */}
                        <span className="absolute left-3 top-3 tw-mono text-[8px] uppercase tracking-[0.18em] text-[#f7f3ef]">
                          SCHEMATIC 04-A
                        </span>
                      </div>
                    </div>

                    {/* Technical metadata */}
                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <p className="tw-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">
                          Schematic 04-A
                        </p>
                        <p className="mt-1 text-xs text-text-secondary">
                          Sustainable building system
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-serif text-3xl font-semibold text-secondary">
                          82%
                        </p>
                        <p className="tw-mono text-[9px] uppercase tracking-[0.14em] text-text-secondary">
                          Efficiency
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Browse the Library */}
          <section className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="tw-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
                  Browse the library
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
                  Explorar la biblioteca
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
                  Conocimiento y recursos prácticos para proyectos sustentables.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {libraryItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Card className="group h-full rounded-xl p-5 transition hover:-translate-y-1 hover:bg-background hover:shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-xl text-primary">
                      <span aria-hidden="true">{item.icon}</span>
                    </div>

                    <h3 className="mt-5 text-base font-semibold text-text-primary">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                      {item.text}
                    </p>

                    <div className="tw-mono mt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary transition group-hover:translate-x-1">
                      Read docs →
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured Calculators */}
          <section className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="tw-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
                  Featured calculators
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
                  Herramientas destacadas
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
                  Herramientas orientativas para explorar decisiones de
                  sustentabilidad.
                </p>
              </div>

              <Link
                href="/tools"
                className="hidden shrink-0 rounded-full border border-border-soft px-4 py-2 tw-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-text-primary transition hover:bg-surface-soft hover:text-primary sm:inline-flex"
              >
                View all tools
              </Link>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {featuredTools.map((tool) => (
                <Link key={tool.href} href={tool.href}>
                  <Card className="group h-full overflow-hidden rounded-xl p-0 transition hover:-translate-y-1 hover:shadow-sm">
                    {/* Technical visual */}
                    <div className="relative h-40 overflow-hidden border-b border-border-soft bg-[#e4ddd6]">
                      <div className="absolute inset-4 rounded-lg border border-[#c8beb5] bg-[#d7cec6]">
                        <div className="absolute inset-0 opacity-50">
                          <div className="absolute inset-x-0 top-1/3 border-t border-[#f6f1eb]" />
                          <div className="absolute inset-x-0 top-2/3 border-t border-[#f6f1eb]" />
                          <div className="absolute inset-y-0 left-1/3 border-l border-[#f6f1eb]" />
                          <div className="absolute inset-y-0 left-2/3 border-l border-[#f6f1eb]" />
                        </div>

                        <div className="absolute left-4 top-4 rounded bg-background px-2 py-1">
                          <span className="tw-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-text-primary">
                            {tool.badge}
                          </span>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-serif text-5xl text-primary opacity-70">
                            {tool.icon}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif text-lg font-semibold text-text-primary">
                          {tool.title}
                        </h3>

                        <span
                          aria-hidden="true"
                          className="text-lg text-primary transition group-hover:translate-x-0.5"
                        >
                          ↗
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-text-secondary">
                        {tool.text}
                      </p>

                      <div className="mt-5 rounded-lg border border-secondary px-4 py-2 text-center font-serif text-sm text-secondary transition group-hover:bg-surface-soft">
                        Launch Tool
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            <Link
              href="/tools"
              className="mt-5 inline-flex rounded-full border border-border-soft px-4 py-2 tw-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-text-primary transition hover:bg-surface-soft hover:text-primary sm:hidden"
            >
              View all tools
            </Link>
          </section>

          {/* Contribution / Open Blueprint */}
          <section className="mt-12">
            <div className="rounded-[1.5rem] border border-border-soft bg-surface p-6 md:p-8">
              <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-center">
                {/* Open data */}
                <div className="border-border-soft md:border-r md:pr-8">
                  <p className="tw-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                    Open data
                  </p>

                  <p className="mt-3 font-serif text-3xl font-semibold tracking-tight text-primary">
                    Data + BI
                  </p>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-text-secondary">
                    Datasets estructurados para exploración, análisis y
                    visualización.
                  </p>

                  <Link
                    href="/dataset"
                    className="mt-4 inline-flex tw-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary transition hover:translate-x-1"
                  >
                    Explorar datasets →
                  </Link>
                </div>

                {/* Contribution */}
                <div>
                  <p className="tw-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
                    Open blueprint project
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
                    Contribuí a TinyWiki
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">
                    TinyWiki se construye mediante sprints incrementales que
                    combinan desarrollo web, datos, herramientas interactivas y
                    contenido sobre sustentabilidad.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-4">
                    <Link
                      href="/services/energy-analysis"
                      className="tw-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary transition hover:translate-x-1"
                    >
                      Ver servicios →
                    </Link>

                    <a
                      href="https://github.com/dochronos/tinywiki"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tw-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary transition hover:translate-x-1"
                    >
                      Browse GitHub ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
