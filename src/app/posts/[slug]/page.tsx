import Link from "next/link";
import { getPost } from "../../../lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <main style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
      <p>
        <Link href="/">← トップへ戻る</Link>
      </p>

      <h1>{post.title}</h1>

      {post.date ? (
        <div style={{ opacity: 0.7, marginBottom: "1rem" }}>{post.date}</div>
      ) : null}

      <article
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        style={{ lineHeight: 1.8 }}
      />
    </main>
  );
}
