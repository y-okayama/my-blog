// src/app/sitemap.ts
import { getAllPosts } from "@/lib/posts";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const base: MetadataRoute.Sitemap = [
    { url: "/", lastModified: new Date() },
    { url: "/categories", lastModified: new Date() },
    { url: "/tags", lastModified: new Date() },
    { url: "/search", lastModified: new Date() },
    { url: "/about", lastModified: new Date() },
    { url: "/contact", lastModified: new Date() },
    { url: "/privacy", lastModified: new Date() },
  ];

  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `/posts/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
  }));

  return [...base, ...postUrls];
}
