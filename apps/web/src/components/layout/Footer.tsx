import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Description */}
        <div className="max-w-2xl">
          <h2 className="text-lg font-semibold">TinyWiki</h2>

          <p className="mt-3 text-sm text-neutral-600">
            Herramientas, datasets y recursos educativos sobre energía
            solar, eficiencia energética y vida off-grid en Argentina.
          </p>
        </div>

        {/* Links */}
        <div className="mt-8 flex flex-wrap gap-4 text-sm text-neutral-600">
          <Link href="/wiki" className="hover:text-black">
            Wiki
          </Link>

          <Link href="/tools" className="hover:text-black">
            Herramientas
          </Link>

          <Link href="/providers" className="hover:text-black">
            Proveedores
          </Link>

          <Link href="/dataset" className="hover:text-black">
            Dataset
          </Link>

          <Link
            href="/services/energy-analysis"
            className="hover:text-black"
          >
            Servicios
          </Link>
        </div>

        {/* Bottom */}
        <div className="mt-8 text-xs text-neutral-500">
          © 2026 TinyWiki — Proyecto desarrollado públicamente con Next.js,
          TypeScript y herramientas de datos.
        </div>
      </div>
    </footer>
  );
}