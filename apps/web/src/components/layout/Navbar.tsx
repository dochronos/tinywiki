import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-border-soft bg-background">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3">
        {/* Brand */}
        <Link
          href="/"
          className="shrink-0 font-serif text-xl font-semibold tracking-tight text-primary transition hover:opacity-80"
        >
          TinyWiki
        </Link>

        {/* Search */}
        <div
          aria-label="Search tools and articles"
          className="hidden w-full max-w-[300px] items-center rounded-full border border-border-soft bg-surface-soft px-4 py-2 text-sm text-text-secondary md:flex"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="mr-2 h-4 w-4 shrink-0"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>

          <span>Search tools &amp; articles...</span>
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-4 text-primary">
          <button
            type="button"
            aria-label="Profile"
            className="transition hover:opacity-70"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5.5 19c.8-3.2 3.2-5 6.5-5s5.7 1.8 6.5 5" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Settings"
            className="transition hover:opacity-70"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19 12a7 7 0 0 0-.2-1.6l1.7-1.3-1.8-3.1-2 .8a7 7 0 0 0-2.7-1.6L13.8 3h-3.6l-.3 2.2a7 7 0 0 0-2.7 1.6l-2-.8-1.8 3.1 1.7 1.3A7 7 0 0 0 5 12c0 .5.1 1.1.2 1.6l-1.7 1.3 1.8 3.1 2-.8a7 7 0 0 0 2.7 1.6l.3 2.2h3.6l.3-2.2a7 7 0 0 0 2.7-1.6l2 .8 1.8-3.1-1.7-1.3c.1-.5.2-1 .2-1.6Z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}