import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type WikiArticleMeta = {
  title: string;
  slug: string;
  section?: string;
  tags?: string[];
  lastUpdated?: string;
};

const WIKI_DIR = path.join(process.cwd(), "src", "content", "wiki");

export function getAllWikiArticles(): WikiArticleMeta[] {
  const files = fs.readdirSync(WIKI_DIR).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((file) => {
    const fullPath = path.join(WIKI_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);

    // fallbacks to keep it robust
    const slug = (data.slug as string) ?? file.replace(/\.mdx$/, "");
    const title = (data.title as string) ?? slug;

    return {
      title,
      slug,
      section: data.section as string | undefined,
      tags: data.tags as string[] | undefined,
      lastUpdated: data.lastUpdated as string | undefined,
    };
  });

  // simple sort: lastUpdated desc if available
  return articles.sort((a, b) => (b.lastUpdated ?? "").localeCompare(a.lastUpdated ?? ""));
}

export function getWikiArticleBySlug(slug: string): { meta: WikiArticleMeta; filePath: string } {
  const files = fs.readdirSync(WIKI_DIR).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const fullPath = path.join(WIKI_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);

    const fileSlug = (data.slug as string) ?? file.replace(/\.mdx$/, "");
    if (fileSlug === slug) {
      const meta: WikiArticleMeta = {
        title: (data.title as string) ?? slug,
        slug: fileSlug,
        section: data.section as string | undefined,
        tags: data.tags as string[] | undefined,
        lastUpdated: data.lastUpdated as string | undefined,
      };

      return { meta, filePath: fullPath };
    }
  }

  throw new Error(`Wiki article not found: ${slug}`);
}

export function getAllWikiSlugs(): string[] {
  return getAllWikiArticles().map((a) => a.slug);
}
