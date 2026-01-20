import Link from "next/link";
import SolarReadinessChecklist from "./SolarReadinessChecklist";

export const metadata = {
  title: "Checklist Solar | TinyWiki",
  description:
    "Checklist interactiva para evaluar si estás listo para instalar energía solar en casa (Argentina/LATAM).",
};

export default function SolarReadinessPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Checklist: ¿Estoy listo para energía solar?
        </h1>
        <p className="text-sm text-neutral-600">
          Esta guía es orientativa. No reemplaza una evaluación técnica en sitio,
          pero te ayuda a ordenar decisiones antes de avanzar.
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
          <Link href="/tools" className="underline">
            Todas las herramientas
          </Link>
        </div>
      </header>

      <section className="mt-6">
        <SolarReadinessChecklist />
      </section>

      <footer className="mt-8 text-xs text-neutral-500">
        Consejo: si tu objetivo principal es reducir costos, medí consumo y
        hábitos primero. Si priorizás resiliencia ante cortes, enfocá el sistema
        en almacenamiento y cargas críticas.
      </footer>
    </main>
  );
}
