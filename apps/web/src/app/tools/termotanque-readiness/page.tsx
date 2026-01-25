import Link from "next/link";
import ThermalReadinessChecklist from "./ThermalReadinessChecklist";

export const metadata = {
  title: "Checklist de termotanque solar en Argentina | TinyWiki",
  description:
    "Checklist interactiva para evaluar si una vivienda en Argentina está preparada para instalar un termotanque solar (consumo, espacio, sol e instalación).",
};

export default function ThermalReadinessPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Checklist: ¿Estoy listo para un termotanque solar?
        </h1>
        <p className="text-sm text-neutral-600">
          Guía orientativa para ordenar decisiones antes de invertir en solar térmica. No reemplaza una evaluación técnica
          en sitio.
        </p>

        <div className="pt-2 text-sm">
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
        <ThermalReadinessChecklist />
      </section>

      <footer className="mt-8 text-xs text-neutral-500">
        Nota: el rendimiento real depende de orientación, sombras, aislamiento, hábitos de consumo y configuración del
        sistema (tanque, colectores y respaldo).
      </footer>
    </main>
  );
}
