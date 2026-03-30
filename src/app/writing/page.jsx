import Link from "next/link";
import { formatWritingDateShort, getAllPosts } from "@/lib/writing";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main className="writing-page">
        <section className="writing-intro">
          <h1 className="writing-headline">The Quiet Room</h1>
          <p className="writing-tagline">
            Essays on sound, image, and the act of making.
          </p>
        </section>

        <ul className="writing-list">
          {posts.map((post) => (
            <li key={post.slug} className="writing-card">
              <Link href={`/writing/${post.slug}`} className="writing-link">
                <div className="writing-card-image">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div className="writing-card-placeholder" />
                  )}
                </div>
                <div className="writing-card-content">
                  <span className="writing-date">
                    {formatWritingDateShort(post.date)}
                  </span>
                  <h2 className="writing-title">{post.title}</h2>
                  <p className="writing-subtitle">{post.subtitle}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="writing-back">
          <Link href="/">← Back to home</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
