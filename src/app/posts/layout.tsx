export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* 記事だけ「読みやすい幅」に制限 */}
      <main className="mx-auto max-w-3xl px-4 py-10">
        {children}
      </main>
    </div>
  );
}
