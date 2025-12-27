import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllWikiSlugs, getWikiArticleBySlug } from "@/lib/wiki";

// Import dinámico del MDX (por slug)
async function importMdx(slug: string) {
  try {
    const mod = await import(`@/content/wiki/${slug}.mdx`);
    return mod.default;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  return getAllWikiSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const { meta } = getWikiArticleBySlug(params.slug);
    return {
      title: `${meta.title} | TinyWiki`,
      description: `Artículo de TinyWiki: ${meta.title}`,
    };
  } catch {
    return {
      title: "Artículo | TinyWiki",
    };
  }
}

export default async function WikiArticlePage({ params }: { params: { slug: string } }) {
  // valida existencia por metadata
  try {
    getWikiArticleBySlug(params.slug);
  } catch {
    notFound();
  }

  const MdxContent = await importMdx(params.slug);
  if (!MdxContent) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <article className="prose max-w-none">
        <MdxContent />
      </article>
    </main>
  );
}
