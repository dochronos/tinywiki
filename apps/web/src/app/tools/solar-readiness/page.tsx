import Link from "next/link";
import SolarReadinessChecklist from "./SolarReadinessChecklist";

export const metadata = {
  title: "Checklist de energía solar en Argentina | TinyWiki",
  description:
    "Checklist interactiva para evaluar si una vivienda en Argentina está preparada para instalar energía solar (consumo, espacio, sol y objetivos).",
};

export default function SolarReadinessPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Checklist: ¿Estoy listo para energía solar?
        </h1>
        <p className="text-sm text-neutral-600">
          Guía orientativa para ordenar decisiones antes de invertir en un sistema solar. No reemplaza una evaluación
          técnica en sitio.
        </p>

        <div className="pt-2 text-sm">
          <Link href="/tools/solar-calculator" className="underline">
            Ir a la calculadora solar
          </Link>
          <span className="text-neutral-400"> · </span>
          <Link href="/providers" className="underline">
            Ver proveedores
          </Link>
          <span className="text-neutral-400"> · </span>
          <Link href="/wiki" className="underline">
            Wiki
          </Link>
          <span className="text-neutral-400"> · </span>
          <Link href="/tools" className="underline">
            Todas las herramientas
          </Link>
        </div>
      </header>

      <section className="mt-6">
        <SolarReadinessChecklist />
      </section>

      <footer className="mt-8 text-xs text-neutral-500">
        Consejo: si tu objetivo principal es reducir costos, medí consumo y hábitos primero. Si priorizás resiliencia ante
        cortes, definí cargas críticas y estrategia de almacenamiento.
      </footer>
    </main>
  );
}
