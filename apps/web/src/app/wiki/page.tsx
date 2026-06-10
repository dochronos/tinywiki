import Link from "next/link";
import { Card } from "@/components/ui/card";

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
      <header>
        <Card className="bg-surface">
          <h1 className="text-3xl font-semibold tracking-tight">Wiki</h1>

          <p className="mt-3 text-text-secondary">
            Artículos y guías prácticas sobre sustentabilidad, energía solar y
            soluciones off-grid, con foco en Argentina.
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link href="/tools" className="font-medium hover:underline">
              Ir a herramientas
            </Link>

            <Link href="/providers" className="font-medium hover:underline">
              Ver proveedores
            </Link>
          </div>
        </Card>
      </header>

      <section className="mt-8 grid gap-4">
        {topics.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="transition-opacity hover:opacity-90"
          >
            <Card>
              <h2 className="text-lg font-medium">{t.title}</h2>
              <p className="mt-2 text-sm text-text-secondary">
                {t.description}
              </p>
            </Card>
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
