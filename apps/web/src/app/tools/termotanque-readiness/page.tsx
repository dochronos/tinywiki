import Link from "next/link";
import ThermalReadinessChecklist from "./ThermalReadinessChecklist";

export const metadata = {
  title: "Checklist de termotanque solar en Argentina | TinyWiki",
  description:
    "Checklist interactiva para evaluar si una vivienda en Argentina está preparada para instalar un termotanque solar.",
};

export default function ThermalReadinessPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="space-y-3">
        <div className="tw-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
          Herramientas · Solar térmica
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
          Checklist: ¿Estoy listo para un termotanque solar?
        </h1>

        <p className="max-w-2xl text-sm leading-6 text-text-secondary">
          Guía orientativa para ordenar decisiones antes de invertir en solar
          térmica. No reemplaza una evaluación técnica en sitio.
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-2 pt-2 text-sm">
          <Link
            href="/tools/solar-calculator"
            className="text-text-secondary underline underline-offset-4 hover:text-primary"
          >
            Calculadora solar
          </Link>

          <span className="text-neutral-400">·</span>

          <Link
            href="/tools/solar-readiness"
            className="text-text-secondary underline underline-offset-4 hover:text-primary"
          >
            Checklist solar
          </Link>

          <span className="text-neutral-400">·</span>

          <Link
            href="/providers"
            className="text-text-secondary underline underline-offset-4 hover:text-primary"
          >
            Ver proveedores
          </Link>

          <span className="text-neutral-400">·</span>

          <Link
            href="/wiki"
            className="text-text-secondary underline underline-offset-4 hover:text-primary"
          >
            Wiki
          </Link>

          <span className="text-neutral-400">·</span>

          <Link
            href="/tools"
            className="text-text-secondary underline underline-offset-4 hover:text-primary"
          >
            Todas las herramientas
          </Link>
        </div>
      </header>

      <section className="mt-8">
        <ThermalReadinessChecklist />
      </section>

      <footer className="mt-8 border-t border-border-soft pt-6 text-xs leading-5 text-text-secondary">
        <p>
          Nota: el rendimiento real depende de orientación, sombras,
          aislamiento, hábitos de consumo y configuración del sistema
          (tanque, colectores y respaldo).
        </p>

        <p className="mt-2">
          Los resultados son orientativos y no reemplazan una evaluación
          técnica profesional.
        </p>
      </footer>
    </main>
  );
}