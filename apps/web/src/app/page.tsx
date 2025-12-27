export default function Home() {
  const sections = [
    { title: "Energía solar", description: "Conceptos básicos, guías y checklist antes de comprar o instalar." },
    { title: "Construcción Tiny Houses", description: "Materiales, aislación, humedad, estructura y decisiones clave." },
    { title: "Seguridad", description: "Seguridad práctica para entornos rurales y casas autosuficientes." },
    { title: "Agua y saneamiento", description: "Opciones off-grid, tradeoffs y mantenimiento." },
    { title: "Recursos y proveedores", description: "Base consultable (próximo sprint) + dataset para BI." },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">TinyWiki</h1>
        <p className="text-base text-neutral-600">
          Wiki minimalista de sustentabilidad y tiny houses (Argentina / LATAM). Contenido curado con fuentes + datos estructurados
          (proveedores, referencias de precios) para análisis y dashboards.
        </p>
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
        <h2 className="text-lg font-medium">Estado</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-neutral-700 space-y-1">
          <li>Sprint 1: sitio alpha + estructura wiki + primeros artículos</li>
          <li>Sprint 2: base consultable de proveedores + filtros + dataset (Sheets/CSV)</li>
          <li>Sprint 3: Power BI dashboard conectado al dataset</li>
        </ul>
      </section>
    </main>
  );
}
