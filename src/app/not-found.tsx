// src/app/not-found.tsx
import Link from "next/link";

export const metadata = {
  title: "ページが見つかりません",
  description: "お探しのページは見つかりませんでした。",
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">404 - ページが見つかりません</h1>
      <p className="mt-4 text-sm text-gray-700">
        URLが間違っているか、ページが移動した可能性があります。
      </p>
      <div className="mt-8">
        <Link href="/" className="text-sm underline">
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}
