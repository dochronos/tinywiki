import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border-soft bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Top */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Brand / Description */}
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-text-primary">
              TinyWiki
            </h2>

            <p className="mt-4 leading-7 text-sm text-text-secondary">
              Herramientas, datasets y recursos educativos sobre
              energía solar, eficiencia energética y vida off-grid
              en Argentina y LATAM.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="tw-mono text-xs uppercase tracking-wide text-text-secondary">
              Navegación
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link
                href="/wiki"
                className="rounded-full px-3 py-1.5 text-text-secondary transition hover:rounded-[2rem] border border-border-soft bg-surface p-10 hover:text-primary"
              >
                Wiki
              </Link>

              <Link
                href="/tools"
                className="rounded-full px-3 py-1.5 text-text-secondary transition hover:rounded-[2rem] border border-border-soft bg-surface p-10 hover:text-primary"
              >
                Herramientas
              </Link>

              <Link
                href="/providers"
                className="rounded-full px-3 py-1.5 text-text-secondary transition hover:rounded-[2rem] border border-border-soft bg-surface p-10 hover:text-primary"
              >
                Proveedores
              </Link>

              <Link
                href="/dataset"
                className="rounded-full px-3 py-1.5 text-text-secondary transition hover:rounded-[2rem] border border-border-soft bg-surface p-10 hover:text-primary"
              >
                Dataset
              </Link>

              <Link
                href="/services/energy-analysis"
                className="rounded-full px-3 py-1.5 text-text-secondary transition hover:rounded-[2rem] border border-border-soft bg-surface p-10 hover:text-primary"
              >
                Servicios
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-border-soft pt-6">
          <p className="tw-mono text-xs text-text-secondary">
            © 2026 TinyWiki — Proyecto desarrollado públicamente con
            Next.js, TypeScript y herramientas de datos.
          </p>
        </div>
      </div>
    </footer>
  );
}