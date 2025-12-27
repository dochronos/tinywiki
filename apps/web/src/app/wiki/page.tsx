import Link from "next/link";
import { getAllWikiArticles } from "@/lib/wiki";

export const metadata = {
  title: "Wiki | TinyWiki",
  description: "Artículos curados sobre sustentabilidad y tiny houses (Argentina / LATAM).",
};

export default function WikiIndexPage() {
  const articles = getAllWikiArticles();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Wiki</h1>
        <p className="text-sm text-neutral-600">
          Artículos curados (con fuentes) sobre energía solar, construcción, seguridad y agua/saneamiento.
        </p>
      </header>

      <section className="mt-8 space-y-3">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/wiki/${a.slug}`}
            className="block rounded-2xl border p-5 shadow-sm hover:bg-neutral-50"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-medium">{a.title}</h2>
              {a.section ? (
                <span className="rounded-full border px-2 py-0.5 text-xs text-neutral-600">{a.section}</span>
              ) : null}
              {a.lastUpdated ? (
                <span className="text-xs text-neutral-500">Actualizado: {a.lastUpdated}</span>
              ) : null}
            </div>

            {a.tags?.length ? (
              <p className="mt-2 text-xs text-neutral-600">
                Tags: {a.tags.join(", ")}
              </p>
            ) : null}
          </Link>
        ))}
      </section>
    </main>
  );
}
