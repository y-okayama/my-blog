import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export const metadata = {
  title: "タグ一覧",
  description: "タグ別に記事を一覧できます。",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">タグ一覧</h1>
      <p className="mt-2 text-sm text-gray-600">タグ別に記事を探せます。</p>

      {tags.length === 0 ? (
        <div className="mt-6 rounded border p-4">
          <p className="text-sm">
            まだタグがありません。Markdownのfrontmatterに{" "}
            <code className="px-1">tags</code> を追加してください。
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {tags.map(({ tag, count }) => {
            const href = `/tags/${encodeURIComponent(tag)}`;
            return (
              <li key={tag}>
                <Link
                  href={href}
                  className="flex items-center justify-between rounded border px-4 py-3 hover:bg-gray-50"
                >
                  <span className="font-medium">{tag}</span>
                  <span className="text-sm text-gray-600">{count}件</span>
                </Link>
              </li>
            );
          })}
        </ul>
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
