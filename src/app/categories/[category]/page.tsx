import Link from "next/link";
import { getPostsByCategory, getAllCategories } from "../../../lib/posts";

type PageProps = {
  params: { category: string };
};

export async function generateStaticParams() {
  // ビルド時にカテゴリごとのページを生成（SSG）
  const categories = getAllCategories();
  return categories.map((c) => ({
    category: encodeURIComponent(c.category),
  }));
}

export default function CategoryPostsPage({ params }: PageProps) {
  // params.category はURLエンコードされている可能性があるのでデコード
  const category = decodeURIComponent(params.category);
  const posts = getPostsByCategory(params.category); // 内部で decodeURIComponent 済み

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">カテゴリ：{category}</h1>
      <p className="mt-2 text-sm text-gray-600">
        このカテゴリの記事一覧です。
      </p>

      {posts.length === 0 ? (
        <div className="mt-6 rounded border p-4">
          <p className="text-sm">このカテゴリの記事はまだありません。</p>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="rounded border p-4 hover:bg-gray-50">
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-lg font-semibold">{post.title}</h2>
              </Link>

              <div className="mt-1 text-xs text-gray-600">{post.date}</div>

              {post.description ? (
                <p className="mt-2 text-sm text-gray-700">{post.description}</p>
              ) : null}

              <div className="mt-3">
                <Link href={`/posts/${post.slug}`} className="text-sm underline">
                  記事を読む →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 flex gap-4">
        <Link href="/categories" className="text-sm underline">
          ← カテゴリ一覧へ
        </Link>
        <Link href="/" className="text-sm underline">
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}
