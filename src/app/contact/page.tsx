import Link from "next/link";

export const metadata = {
  title: "Contact",
  description: "お問い合わせ",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Contact</h1>
      <p className="mt-2 text-sm text-gray-600">お問い合わせ</p>

      <section className="mt-6 space-y-4 text-sm leading-7">
        <p>
          お問い合わせは、以下の方法でお願いいたします。
          （※現時点では簡易運用です。必要に応じてフォームを追加します）
        </p>

        <h2 className="mt-6 text-base font-semibold">連絡方法</h2>
        <ul className="list-disc pl-5">
          <li>
            メール：<span className="font-mono">your-email@example.com</span>
            （←ここは後であなたのメールに差し替え）
          </li>
          <li>内容：記事の誤り指摘・依頼・その他</li>
        </ul>

        <h2 className="mt-6 text-base font-semibold">お願い</h2>
        <ul className="list-disc pl-5">
          <li>返信にはお時間をいただく場合があります</li>
          <li>営業・勧誘目的のご連絡はご遠慮ください</li>
        </ul>
      </section>

      <div className="mt-10 flex gap-4">
        <Link href="/" className="text-sm underline">
          ← トップへ戻る
        </Link>
        <Link href="/about" className="text-sm underline">
          About →
        </Link>
      </div>
    </main>
  );
}
