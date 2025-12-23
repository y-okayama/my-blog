import Link from "next/link";

export const metadata = {
  title: "About",
  description: "このブログについて",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">About</h1>
      <p className="mt-2 text-sm text-gray-600">このブログについて</p>

      <section className="mt-6 space-y-4 text-sm leading-7">
        <p>
          このブログは、日々の気づきや学びを、気軽に残していくための雑記ブログです。
          Next.js（App Router）+ Markdown で記事を管理し、Vercelで公開する構成で作っています。
        </p>

        <h2 className="mt-6 text-base font-semibold">運用方針</h2>
        <ul className="list-disc pl-5">
          <li>まずは継続を優先（短くてもOK）</li>
          <li>記事は Markdown で管理して、増やしやすくする</li>
          <li>後から整理できるように、カテゴリ・タグを付ける</li>
        </ul>

        <h2 className="mt-6 text-base font-semibold">免責</h2>
        <p>
          記事の内容は可能な限り正確を心がけていますが、必ずしも正確性・完全性を保証するものではありません。
          ご利用は自己責任でお願いいたします。
        </p>
      </section>

      <div className="mt-10 flex gap-4">
        <Link href="/" className="text-sm underline">
          ← トップへ戻る
        </Link>
        <Link href="/privacy" className="text-sm underline">
          プライバシーポリシー →
        </Link>
      </div>
    </main>
  );
}
