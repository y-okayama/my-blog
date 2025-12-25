// src/app/error.tsx
"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">エラーが発生しました</h1>
      <p className="mt-4 text-sm text-gray-700">
        申し訳ありません。時間をおいて再度お試しください。
      </p>

      <div className="mt-8 flex gap-4">
        <button onClick={() => reset()} className="rounded border px-4 py-2 text-sm hover:bg-gray-50">
          再試行
        </button>
        <Link href="/" className="text-sm underline">
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}
