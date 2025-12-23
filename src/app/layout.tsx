import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: {
    default: "雑記ブログ",
    template: "%s | 雑記ブログ",
  },
  description: "Next.js + Markdown で作る雑記ブログ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-white text-gray-900">
        {/* ===== ヘッダー ===== */}
        <header className="border-b">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* サイトタイトル */}
              <Link href="/" className="text-xl font-bold">
                雑記ブログ
              </Link>

              {/* ナビゲーション */}
              <nav className="flex gap-4 text-sm">
                <Link href="/" className="hover:underline">
                  Home
                </Link>
                <Link href="/categories" className="hover:underline">
                  Categories
                </Link>
                <Link href="/search" className="hover:underline">
                  Search
                </Link>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
                <Link href="/privacy" className="hover:underline">
                  Privacy
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* ===== メイン ===== */}
        <main className="mx-auto max-w-5xl px-4 py-8">
          {children}
        </main>

        {/* ===== フッター ===== */}
        <footer className="border-t">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-600">
            <p>© {new Date().getFullYear()} 雑記ブログ</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
