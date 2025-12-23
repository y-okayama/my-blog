import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
      <h1>雑記ブログ</h1>

      {posts.length === 0 && (
        <p>まだ記事がありません。</p>
      )}

      <ul style={{ padding: 0, listStyle: "none" }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: "2rem" }}>
            <Link href={`/posts/${post.slug}`}>
              <strong style={{ fontSize: "1.2rem" }}>
                {post.title}
              </strong>
            </Link>

            <div style={{ opacity: 0.6, marginTop: "0.25rem" }}>
              {post.date}
            </div>

            {post.description && (
              <p style={{ marginTop: "0.5rem" }}>
                {post.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
