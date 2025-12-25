// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";

const SITE_URL = "https://my-blog-theta-lemon.vercel.app/";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "雑記ブログ",
    template: "%s | 雑記ブログ",
  },
  description: "Next.js + Markdownで作る雑記ブログ",
  openGraph: {
    title: "雑記ブログ",
    description: "Next.js + Markdownで作る雑記ブログ",
    url: SITE_URL,
    siteName: "雑記ブログ",
    locale: "ja_JP",
    type: "website",
    images: [
      { url: "/ogp.png", width: 1200, height: 630, alt: "雑記ブログ" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/ogp.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-white text-gray-900">
        <header className="border-b">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="text-xl font-bold">
                雑記ブログ
              </Link>
              <nav className="flex flex-wrap gap-4 text-sm">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/categories" className="hover:underline">Categories</Link>
                <Link href="/tags" className="hover:underline">Tags</Link>
                <Link href="/search" className="hover:underline">Search</Link>
                <Link href="/about" className="hover:underline">About</Link>
                <Link href="/contact" className="hover:underline">Contact</Link>
                <Link href="/privacy" className="hover:underline">Privacy</Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>

        <footer className="border-t">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-600">
            <p>© {new Date().getFullYear()} 雑記ブログ</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
