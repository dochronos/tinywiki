import Link from "next/link";

export const metadata = {
  title: "TinyWiki | Sustentabilidad, energía solar y tiny houses en Argentina",
  description:
    "Guías prácticas, checklists y herramientas para tomar decisiones informadas sobre energía solar, tiny houses y vida off-grid en Argentina.",
};

export default function Home() {
  const sections = [
    {
      title: "Energía solar",
      description:
        "Conceptos básicos, guías y checklists para evaluar si una vivienda en Argentina está preparada para energía solar.",
    },
    {
      title: "Construcción Tiny Houses",
      description:
        "Materiales, aislación, humedad, estructura y decisiones clave para construcciones pequeñas y eficientes.",
    },
    {
      title: "Seguridad",
      description:
        "Seguridad práctica para entornos rurales y viviendas autosuficientes.",
    },
    {
      title: "Agua y saneamiento",
      description:
        "Opciones off-grid, tradeoffs y mantenimiento para sistemas de agua y saneamiento.",
    },
    {
      title: "Recursos y proveedores",
      description:
        "Base consultable de proveedores locales + datasets estructurados para análisis y BI.",
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">TinyWiki</h1>

        <p className="text-base text-neutral-600">
          Recurso práctico de sustentabilidad enfocado en Argentina y LATAM.
          Combina contenido curado con herramientas y datos estructurados para
          ayudar a tomar mejores decisiones sobre energía solar, tiny houses y
          soluciones off-grid.
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            href="/wiki"
            className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium shadow-sm hover:bg-neutral-50"
          >
            Ver Wiki
          </Link>

          <Link
            href="/providers"
            className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Proveedores
          </Link>

          <Link href="/tools" className="underline text-sm">
            Herramientas prácticas (checklists y calculadoras)
          </Link>

          <Link href="/data" className="underline text-sm">
            Datos y BI (Power BI)
          </Link>
        </div>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        {sections.map((s) => (
          <div key={s.title} className="rounded-2xl border p-5 shadow-sm">
            <h2 className="text-lg font-medium">{s.title}</h2>
            <p className="mt-2 text-sm text-neutral-600">{s.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border p-5">
        <h2 className="text-lg font-medium">Estado del proyecto</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-neutral-700 space-y-1">
          <li>Sprint 1: sitio alpha + estructura wiki + primeros artículos</li>
          <li>Sprint 2: base consultable de proveedores + dataset estructurado</li>
          <li>Sprint 3: dashboard de Power BI conectado al dataset</li>
          <li>Sprint 4–6: herramientas interactivas (checklists y calculadora solar)</li>
        </ul>
      </section>
    </main>
  );
}
