import Link from "next/link";

export const metadata = {
  title: "Wiki de sustentabilidad y energía solar en Argentina | TinyWiki",
  description:
    "Artículos y guías prácticas sobre energía solar, tiny houses y soluciones off-grid, enfocados en Argentina.",
};

export default function WikiPage() {
  const topics = [
    {
      title: "Energía solar",
      description:
        "Conceptos básicos, tipos de sistemas, guías introductorias y decisiones clave antes de instalar.",
      href: "/wiki/solar-paneles-argentina",
    },
    {
      title: "Construcción Tiny Houses",
      description:
        "Materiales, aislación, humedad y criterios de diseño para viviendas pequeñas y eficientes.",
      href: "/wiki/tinyhouses-materiales-basicos",
    },
  ];

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Wiki</h1>
        <p className="text-sm text-neutral-600">
          Artículos y guías prácticas sobre sustentabilidad, energía solar y
          soluciones off-grid, con foco en Argentina.
        </p>

        <div className="pt-2 text-sm">
          <Link href="/tools" className="underline">
            Ir a herramientas
          </Link>
          <span className="text-neutral-400"> · </span>
          <Link href="/providers" className="underline">
            Ver proveedores
          </Link>
        </div>
      </header>

      <section className="mt-8 grid gap-4">
        {topics.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="block rounded-2xl border p-5 shadow-sm hover:bg-neutral-50"
          >
            <h2 className="text-lg font-medium">{t.title}</h2>
            <p className="mt-2 text-sm text-neutral-600">{t.description}</p>
          </Link>
        ))}
      </section>

      <footer className="mt-10 text-xs text-neutral-500">
        Los contenidos son informativos y no reemplazan asesoramiento técnico
        profesional.
      </footer>
    </main>
  );
}
