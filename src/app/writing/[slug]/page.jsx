import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/writing";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function WritingPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, body } = post;

  return (
    <>
      <Nav />
      <main className="writing-article">
        <article className="article-content">
          <header className="article-header">
            <h1 className="article-title">{frontmatter.title}</h1>
            <p className="article-subtitle">{frontmatter.subtitle}</p>
            <time className="article-date" dateTime={frontmatter.date}>
              {formatDate(frontmatter.date)}
            </time>
          </header>

          <div className="article-body">
            <MDXRemote source={body} />
          </div>
        </article>

        <div className="writing-back">
          <Link href="/writing">← Back to The Quiet Room</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
