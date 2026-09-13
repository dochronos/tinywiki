import Link from "next/link";

const footerLinks = [
  { href: "/wiki", label: "Wiki" },
  { href: "/tools", label: "Tools" },
  { href: "/providers", label: "Providers" },
  { href: "/dataset", label: "Dataset" },
  {
    href: "/services/energy-analysis",
    label: "Services",
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border-soft bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-md">
            <Link
              href="/"
              className="font-serif text-xl font-semibold tracking-tight text-text-primary transition hover:text-primary"
            >
              TinyWiki
            </Link>

            <p className="mt-3 text-sm leading-6 text-text-secondary">
              Knowledge, tools and data for more sustainable decisions in
              Argentina and LATAM.
            </p>

            <p className="tw-mono mt-4 text-[10px] uppercase tracking-[0.14em] text-text-secondary">
              Knowledge · Tools · Data · Sustainability
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 text-sm md:items-end">
            <nav className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-secondary transition hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <a
              href="https://github.com/dochronos/tinywiki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary transition hover:text-primary"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-border-soft pt-5">
          <div className="flex flex-col gap-2 text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 TinyWiki — Open project.</p>

            <p className="tw-mono uppercase tracking-[0.1em]">
              Argentina · LATAM
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}