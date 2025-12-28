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
    images: [{ url: "/ogp.png", width: 1200, height: 630, alt: "雑記ブログ" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/ogp.png"],
  },
};

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
  { href: "/categories", label: "Categories" },
  { href: "/tags", label: "Tags" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-white text-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="text-xl font-bold tracking-tight">
                雑記ブログ
              </Link>

              {/* Nav */}
              <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-2 py-1 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>

        {/* Footer */}
        <footer className="border-t">
          <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-gray-600">
            <p>© {new Date().getFullYear()} 雑記ブログ</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
