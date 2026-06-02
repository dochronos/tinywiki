import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/wiki", label: "Wiki" },
  { href: "/tools", label: "Tools" },
  { href: "/providers", label: "Providers" },
  { href: "/dataset", label: "Dataset" },
  {
    href: "/services/energy-analysis",
    label: "Services",
  },
];

export default function Navbar() {
  return (
    <header className="border-b border-border-soft bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-text-primary transition hover:text-primary"
        >
          TinyWiki
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-3 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-text-secondary transition hover:rounded-[2rem] border border-border-soft bg-surface p-10 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}

          <a
            href="https://github.com/dochronos/tinywiki"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border-soft px-3 py-1.5 text-text-secondary transition hover:rounded-[2rem] border border-border-soft bg-surface p-10 hover:text-primary"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}