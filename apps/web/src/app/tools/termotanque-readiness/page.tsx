import Link from "next/link";
import ThermalReadinessChecklist from "./ThermalReadinessChecklist";

export const metadata = {
  title: "Checklist Termotanque Solar | TinyWiki",
  description: "Checklist interactiva para evaluar si estás listo para instalar un termotanque solar.",
};

export default function ThermalReadinessPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Checklist: ¿Estoy listo para un termotanque solar?
        </h1>
        <p className="text-sm text-neutral-600">
          Guía orientativa para evaluar condiciones antes de invertir en un sistema solar térmico.
        </p>

        <div className="pt-2 text-sm">
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
        <ThermalReadinessChecklist />
      </section>
    </main>
  );
}
