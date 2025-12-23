import Link from "next/link";
import { getAllCategories } from "../../lib/posts";

export const metadata = {
  title: "カテゴリ一覧",
  description: "カテゴリ別に記事を一覧できます。",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">カテゴリ一覧</h1>
      <p className="mt-2 text-sm text-gray-600">カテゴリ別に記事を探せます。</p>

      {categories.length === 0 ? (
        <div className="mt-6 rounded border p-4">
          <p className="text-sm">
            まだカテゴリがありません。Markdownのfrontmatterに{" "}
            <code className="px-1">category</code> を追加してください。
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {categories.map(({ category, count }) => {
            const href = `/categories/${encodeURIComponent(category)}`;
            return (
              <li key={category}>
                <Link
                  href={href}
                  className="flex items-center justify-between rounded border px-4 py-3 hover:bg-gray-50"
                >
                  <span className="font-medium">{category}</span>
                  <span className="text-sm text-gray-600">{count}件</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-10">
        <Link href="/" className="text-sm underline">
          ← トップへ戻る
        </Link>
      </div>
    </main>
  );
}
