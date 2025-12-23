import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

/** frontmatter の型（Markdown側の標準） */
export type PostFrontMatter = {
  title: string;
  date: string; // "YYYY-MM-DD" 推奨
  description?: string;
  category?: string; // 例: "開発"
  tags?: string[];   // 例: ["Next.js", "Markdown"]
};

/** 一覧用（Markdown本文は含めない） */
export type PostSummary = PostFrontMatter & {
  slug: string;
};

/** 詳細用 */
export type PostDetail = PostFrontMatter & {
  slug: string;
  contentHtml: string;
};

function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

function readPostFile(slug: string): { data: PostFrontMatter; content: string } | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // tags が "Next.js, Markdown" のような文字列で来た場合でも救済
  const normalizedTags =
    Array.isArray((data as any).tags)
      ? (data as any).tags
      : typeof (data as any).tags === "string"
        ? (data as any).tags.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [];

  const fm: PostFrontMatter = {
    title: String((data as any).title ?? ""),
    date: String((data as any).date ?? ""),
    description: (data as any).description ? String((data as any).description) : undefined,
    category: (data as any).category ? String((data as any).category) : undefined,
    tags: normalizedTags,
  };

  return { data: fm, content };
}

/** 全記事（date降順） */
export function getAllPosts(): PostSummary[] {
  const slugs = getAllSlugs();

  return slugs
    .map((slug) => {
      const parsed = readPostFile(slug);
      if (!parsed) return null;

      return {
        slug,
        ...parsed.data,
      } satisfies PostSummary;
    })
    .filter((p): p is PostSummary => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** 単記事（HTML変換込み） */
export async function getPost(slug: string): Promise<PostDetail> {
  const parsed = readPostFile(slug);

  if (!parsed) {
    return {
      slug,
      title: "記事が見つかりません",
      date: "",
      description: "",
      category: "",
      tags: [],
      contentHtml: "<p>Markdown ファイルが存在しません。</p>",
    };
  }

  const processed = await remark().use(html).process(parsed.content);
  const contentHtml = processed.toString();

  return {
    slug,
    contentHtml,
    ...parsed.data,
  };
}

/** カテゴリ別の記事一覧（date降順） */
export function getPostsByCategory(category: string): PostSummary[] {
  const decoded = decodeURIComponent(category);
  return getAllPosts().filter((p) => (p.category ?? "") === decoded);
}

/** タグ別の記事一覧（date降順） */
export function getPostsByTag(tag: string): PostSummary[] {
  const decoded = decodeURIComponent(tag);
  return getAllPosts().filter((p) => (p.tags ?? []).includes(decoded));
}

/** カテゴリ一覧（件数付き・件数降順） */
export function getAllCategories(): { category: string; count: number }[] {
  const map = new Map<string, number>();

  for (const p of getAllPosts()) {
    const c = (p.category ?? "").trim();
    if (!c) continue;
    map.set(c, (map.get(c) ?? 0) + 1);
  }

  return Array.from(map.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category, "ja"));
}

/** タグ一覧（件数付き・件数降順） */
export function getAllTags(): { tag: string; count: number }[] {
  const map = new Map<string, number>();

  for (const p of getAllPosts()) {
    for (const t of p.tags ?? []) {
      const tag = String(t).trim();
      if (!tag) continue;
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "ja"));
}

/** 検索（title/description 部分一致・大文字小文字無視） */
export function searchPosts(query: string): PostSummary[] {
  const q = (query ?? "").trim().toLowerCase();
  if (!q) return [];

  return getAllPosts().filter((p) => {
    const title = (p.title ?? "").toLowerCase();
    const desc = (p.description ?? "").toLowerCase();
    return title.includes(q) || desc.includes(q);
  });
}
