// src/app/posts/[slug]/page.tsx
import { getAllPosts, getPost } from "@/lib/posts";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// 既に入れているならOK（静的出力対策）
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

// ★記事ごとのmetadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  const title = post.title || "記事";
  const description = post.description || "記事詳細ページです。";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/posts/${slug}`,
      images: [{ url: "/ogp.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/ogp.png"],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

return (
  <>
    {/* === 記事ヘッダー（③） === */}
    <header className="mb-10">
      <h1 className="text-3xl font-bold leading-tight">
        {post.title}
      </h1>

      <div className="mt-2 text-sm opacity-70">
        {post.date}
      </div>

      {post.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full border px-3 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </header>

    {/* === 記事本文（②） === */}
    <article
      className="prose prose-neutral max-w-none"
      dangerouslySetInnerHTML={{ __html: post.contentHtml }}
    />
  </>
);


}
