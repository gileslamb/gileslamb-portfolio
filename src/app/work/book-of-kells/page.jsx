import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug } from "@/lib/project-content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import CloudflareVideo from "@/components/CloudflareVideo";

const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

function cfImage(id) {
  return `${CF}/${id}/public`;
}

export default async function BookOfKellsPage() {
  const post = getProjectBySlug("book-of-kells");
  if (!post) notFound();

  const { frontmatter, body } = post;
  const typeLine = [frontmatter.category, frontmatter.year].filter(Boolean).join(" · ");

  return (
    <>
      <Nav />
      <main className="book-of-kells-page">
        <article className="book-of-kells-layout">
          <div className="book-of-kells-left">
            <p className="book-of-kells-type">{typeLine || frontmatter.category}</p>
            <h1 className="book-of-kells-title">{frontmatter.title}</h1>
            <p className="book-of-kells-tagline">{frontmatter.role}</p>
            <p className="book-of-kells-client">{frontmatter.client}</p>

            <div className="book-of-kells-description">
              <MDXRemote source={body} />
            </div>

            <p className="book-of-kells-meta">{frontmatter.metadataRow}</p>
          </div>

          <div className="book-of-kells-right">
            <div className="book-of-kells-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cfImage(frontmatter.thumbnailId)}
                alt="Book of Kells Experience"
                className="book-of-kells-img"
              />
            </div>
            <div className="book-of-kells-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cfImage(frontmatter.image2Id)}
                alt="Book of Kells, film still"
                className="book-of-kells-img"
              />
            </div>
            <div className="book-of-kells-video">
              <CloudflareVideo videoId={frontmatter.videoId} />
            </div>
          </div>
        </article>

        <div className="book-of-kells-back">
          <Link href="/#work">← Back to Selected Work</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
