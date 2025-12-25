// src/app/rss.xml/route.ts
import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://your-site.vercel.app";

export function GET() {
  const posts = getAllPosts();

  const items = posts
    .slice(0, 30)
    .map((p) => {
      const link = `${SITE_URL}/posts/${p.slug}`;
      const title = escapeXml(p.title ?? "");
      const desc = escapeXml(p.description ?? "");
      const pubDate = p.date ? new Date(p.date).toUTCString() : new Date().toUTCString();
      return `
        <item>
          <title>${title}</title>
          <link>${link}</link>
          <guid>${link}</guid>
          <description>${desc}</description>
          <pubDate>${pubDate}</pubDate>
        </item>
      `.trim();
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>雑記ブログ</title>
        <link>${SITE_URL}</link>
        <description>Next.js + Markdownで作る雑記ブログ</description>
        ${items}
      </channel>
    </rss>
  `;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
