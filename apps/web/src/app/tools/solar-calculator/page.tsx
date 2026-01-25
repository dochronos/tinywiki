import Link from "next/link";
import SolarCalculator from "./SolarCalculator";

export const metadata = {
  title: "Calculadora solar en Argentina | TinyWiki",
  description:
    "Calculadora orientativa para estimar un rango de tamaño del sistema solar (kWp) y paneles según consumo mensual, provincia y objetivo.",
};

export default function SolarCalculatorPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Calculadora solar (Argentina)</h1>
        <p className="text-sm text-neutral-600">
          Estimación orientativa del tamaño del sistema (rango). No es una cotización ni reemplaza una evaluación técnica
          en sitio.
        </p>

        <div className="pt-2 text-sm">
          <Link href="/tools/solar-readiness" className="underline">
            Checklist solar
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
        <SolarCalculator />
      </section>

      <footer className="mt-8 text-xs text-neutral-500">
        Supuestos: horas solares promedio por provincia + factor de pérdidas conservador. El resultado se expresa como
        rango para evitar falsa precisión.
      </footer>
    </main>
  );
}
