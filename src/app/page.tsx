import Link from "next/link";
import { getAllPosts } from "../lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
      <h1>雑記ブログ</h1>

      <ul style={{ padding: 0, listStyle: "none" }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: "1.5rem" }}>
            <Link href={`/posts/${post.slug}`}>
              <strong style={{ fontSize: "1.2rem" }}>{post.title}</strong>
            </Link>
            <div style={{ opacity: 0.7, marginTop: "0.25rem" }}>
              {post.date}
            </div>
            <p style={{ marginTop: "0.5rem" }}>{post.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
