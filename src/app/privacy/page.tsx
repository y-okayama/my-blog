import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "プライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">プライバシーポリシー</h1>
      <p className="mt-2 text-sm text-gray-600">
        当サイトにおける個人情報の取り扱いについて
      </p>

      <section className="mt-6 space-y-6 text-sm leading-7">
        <div>
          <h2 className="text-base font-semibold">1. 取得する情報</h2>
          <p>
            当サイトでは、お問い合わせ等の際に、氏名（またはハンドルネーム）・メールアドレス等の情報を取得する場合があります。
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold">2. 利用目的</h2>
          <ul className="list-disc pl-5">
            <li>お問い合わせへの対応</li>
            <li>不正行為の防止</li>
            <li>サービス改善の参考</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold">3. アクセス解析ツール</h2>
          <p>
            当サイトではアクセス解析ツールを利用する場合があります。取得される情報は匿名で収集され、個人を特定するものではありません。
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold">4. 広告について（利用する場合）</h2>
          <p>
            当サイトで広告配信サービスを利用する場合、Cookie等によりユーザーの興味に基づいた広告が表示されることがあります。
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold">5. 免責事項</h2>
          <p>
            当サイトの掲載内容によって生じた損害等について、一切の責任を負いかねます。ご了承ください。
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold">6. 改定</h2>
          <p>
            本ポリシーは必要に応じて改定することがあります。最新の内容は本ページにてご確認ください。
          </p>
        </div>
      </section>

      <div className="mt-10 flex gap-4">
        <Link href="/" className="text-sm underline">
          ← トップへ戻る
        </Link>
        <Link href="/contact" className="text-sm underline">
          Contact →
        </Link>
      </div>
    </main>
  );
}
