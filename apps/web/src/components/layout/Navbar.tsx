import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/wiki", label: "Wiki" },
  { href: "/tools", label: "Tools" },
  { href: "/providers", label: "Providers" },
  { href: "/dataset", label: "Dataset" },
  { href: "/services/energy-analysis", label: "Services" },
];

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight"
        >
          TinyWiki
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-black"
            >
              {link.label}
            </Link>
          ))}

          <a
            href="https://github.com/dochronos/tinywiki"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-black"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}