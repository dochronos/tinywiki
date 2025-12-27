import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllWikiSlugs } from "@/lib/wiki";

const WIKI_DIR = path.join(process.cwd(), "src", "content", "wiki");

type Params = { slug: string };
type Props = { params: Params | Promise<Params> };

async function getSlug(params: Props["params"]) {
  const resolved = await params;
  return resolved.slug;
}

export async function generateStaticParams() {
  return getAllWikiSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = await getSlug(params);

  const filePath = path.join(WIKI_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return { title: "Artículo | TinyWiki" };

  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  const title = (data.title as string) ?? slug;

  return {
    title: `${title} | TinyWiki`,
    description: `Artículo de TinyWiki: ${title}`,
  };
}

export default async function WikiArticlePage({ params }: Props) {
  const slug = await getSlug(params);

  const filePath = path.join(WIKI_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) notFound();

  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <article className="prose max-w-none">
        <MDXRemote source={content} />
      </article>
    </main>
  );
}
