import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type PageProps = {
  params: { tag: string };
};

export async function generateStaticParams() {
  // ビルド時にタグごとのページを生成（SSG）
  const tags = getAllTags();
  return tags.map((t) => ({
    tag: encodeURIComponent(t.tag),
  }));
}

export default function TagPostsPage({ params }: PageProps) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(params.tag); // 内部で decodeURIComponent 済み

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">タグ：{tag}</h1>
      <p className="mt-2 text-sm text-gray-600">このタグの記事一覧です。</p>

      {posts.length === 0 ? (
        <div className="mt-6 rounded border p-4">
          <p className="text-sm">このタグの記事はまだありません。</p>
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

              <div className="mt-3 flex flex-wrap gap-3">
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
      )}

      <div className="mt-10 flex gap-4">
        <Link href="/tags" className="text-sm underline">
          ← タグ一覧へ
        </Link>
        <Link href="/" className="text-sm underline">
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}
