import type { MetadataRoute } from "next";
import { getAllWikiArticles } from "@/lib/wiki";

const siteUrl = "https://tinywiki.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/wiki`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/providers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/data`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const wikiRoutes: MetadataRoute.Sitemap = getAllWikiArticles().map((article) => ({
    url: `${siteUrl}/wiki/${article.slug}`,
    lastModified: article.lastUpdated ? new Date(article.lastUpdated) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...wikiRoutes];
}