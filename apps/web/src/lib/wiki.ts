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

function resolveWikiDir(): string {
  const candidateA = path.join(process.cwd(), "src", "content", "wiki");
  if (fs.existsSync(candidateA)) return candidateA;

  const candidateB = path.join(process.cwd(), "apps", "web", "src", "content", "wiki");
  if (fs.existsSync(candidateB)) return candidateB;

  // helpful error for debugging
  throw new Error(
    `Wiki content directory not found. Checked:\n- ${candidateA}\n- ${candidateB}`
  );
}

const WIKI_DIR = resolveWikiDir();

export function getAllWikiArticles(): WikiArticleMeta[] {
  const files = fs.readdirSync(WIKI_DIR).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((file) => {
    const fullPath = path.join(WIKI_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);

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

  return articles.sort((a, b) => (b.lastUpdated ?? "").localeCompare(a.lastUpdated ?? ""));
}

export function getAllWikiSlugs(): string[] {
  return getAllWikiArticles().map((a) => a.slug);
}
