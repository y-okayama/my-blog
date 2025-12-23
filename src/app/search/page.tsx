import Link from "next/link";
import { searchPosts } from "@/lib/posts";

export const metadata = {
  title: "検索",
  description: "記事タイトル・説明文から検索できます。",
};

type PageProps = {
  searchParams?: { q?: string };
};

export default function SearchPage({ searchParams }: PageProps) {
  const q = (searchParams?.q ?? "").trim();
  const results = q ? searchPosts(q) : [];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">検索</h1>
      <p className="mt-2 text-sm text-gray-600">
        タイトル / 説明文（description）から簡易検索できます。
      </p>

      {/* 検索フォーム：GETで ?q= を作る */}
      <form method="GET" action="/search" className="mt-6 flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="例：Next.js / Markdown / 運用 など"
          className="w-full rounded border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded border px-4 py-2 text-sm hover:bg-gray-50"
        >
          検索
        </button>
      </form>

      {/* 結果表示 */}
      {q === "" ? (
        <div className="mt-6 rounded border p-4">
          <p className="text-sm text-gray-700">
            キーワードを入力して検索してください。
          </p>
        </div>
      ) : results.length === 0 ? (
        <div className="mt-6 rounded border p-4">
          <p className="text-sm text-gray-700">
            「<span className="font-semibold">{q}</span>」に一致する記事は見つかりませんでした。
          </p>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-sm text-gray-600">
            「<span className="font-semibold">{q}</span>」の検索結果：{results.length}件
          </p>

          <ul className="mt-4 space-y-4">
            {results.map((post) => (
              <li key={post.slug} className="rounded border p-4 hover:bg-gray-50">
                <Link href={`/posts/${post.slug}`}>
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                </Link>

                <div className="mt-1 text-xs text-gray-600">{post.date}</div>

                {post.description ? (
                  <p className="mt-2 text-sm text-gray-700">{post.description}</p>
                ) : null}

                <div className="mt-3 flex gap-3">
                  <Link href={`/posts/${post.slug}`} className="text-sm underline">
                    記事を読む →
                  </Link>
                  {post.category ? (
                    <Link
                      href={`/categories/${encodeURIComponent(post.category)}`}
                      className="text-sm underline"
                    >
                      カテゴリ：{post.category}
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 flex gap-4">
        <Link href="/" className="text-sm underline">
          ← トップへ戻る
        </Link>
        <Link href="/categories" className="text-sm underline">
          カテゴリ一覧へ →
        </Link>
      </div>
    </main>
  );
}
