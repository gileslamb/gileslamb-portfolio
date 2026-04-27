import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  formatWritingDateLong,
  getAllPosts,
  getPostBySlug,
} from "@/lib/writing";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { buildBlogPostingSchema, buildEssayBreadcrumb } from "@/lib/schema/helpers";

function WideImage({ src, alt }) {
  return (
    <figure className="article-wide-image">
      <img src={src} alt={alt || ""} />
    </figure>
  );
}

function ClosingLine({ children }) {
  return <div className="article-closing-line">{children}</div>;
}

const mdxComponents = { WideImage, ClosingLine };

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function WritingPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, body } = post;
  const hasHero = !!frontmatter.coverImage;

  return (
    <>
      <JsonLd schema={[
        buildBlogPostingSchema({
          title: frontmatter.title,
          description: frontmatter.description ?? frontmatter.subtitle,
          date: frontmatter.date,
          slug: frontmatter.slug,
          coverImage: frontmatter.coverImage,
        }),
        buildEssayBreadcrumb(frontmatter.title, frontmatter.slug),
      ]} />
      <Nav />

      {hasHero && (
        <div className="article-hero">
          <img
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            className="article-hero-img"
          />
          <div className="article-hero-overlay" />
          <div className="article-hero-content">
            <time className="article-hero-date" dateTime={frontmatter.date}>
              {formatWritingDateLong(frontmatter.date)}
            </time>
            <h1 className="article-hero-title">{frontmatter.title}</h1>
            <p className="article-hero-subtitle">
              {frontmatter.subtitle ?? frontmatter.description}
            </p>
          </div>
        </div>
      )}

      <main className={`writing-article${hasHero ? " writing-article--has-hero" : ""}`}>
        <article className="article-content">
          {!hasHero && (
            <header className="article-header">
              <h1 className="article-title">{frontmatter.title}</h1>
              <p className="article-subtitle">
                {frontmatter.subtitle ?? frontmatter.description}
              </p>
              <time className="article-date" dateTime={frontmatter.date}>
                {formatWritingDateLong(frontmatter.date)}
              </time>
            </header>
          )}

          <div className="article-body">
            <MDXRemote source={body} components={mdxComponents} />
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
