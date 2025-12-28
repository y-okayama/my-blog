// src/app/posts/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "記事一覧",
  description: "ブログの記事一覧ページです。",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div>
      {/* ページヘッダー */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold leading-tight">記事一覧</h1>
        <p className="mt-2 text-sm opacity-70">
          最新の記事から順に表示します。
        </p>
      </header>

      {/* 一覧 */}
      {posts.length === 0 ? (
        <p className="text-sm opacity-70">記事がまだありません。</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold leading-snug">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>

                {/* 日付 */}
                <time className="shrink-0 text-xs opacity-60">
                  {post.date}
                </time>
              </div>

              {/* description */}
              {post.description ? (
                <p className="mt-3 text-sm leading-relaxed opacity-80">
                  {post.description}
                </p>
              ) : null}

              {/* tags */}
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

              <div className="mt-5">
                <Link
                  href={`/posts/${post.slug}`}
                  className="inline-flex items-center text-sm font-medium hover:underline"
                >
                  続きを読む →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
