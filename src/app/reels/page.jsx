import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { pickMuseumReelGalleryImages } from "@/data/museumReelSideImages";

export const dynamic = "force-dynamic";

const REELS = [
  {
    id: "installation-museum",
    title: "Installation & Museum",
    description:
      "Spatial sound, museum commissions and immersive installation work.",
    href: "/reels/museum-reel",
    live: true,
    /** Rotating still from the same immersive credits pool as /reels/museum-reel */
    visualPool: "museum",
  },
  {
    id: "animation-kids",
    title: "Animation & Kids",
    description: "Score and sound design for animation across all ages.",
    live: false,
  },
  {
    id: "documentary",
    title: "Documentary",
    description: "Feature and short documentary scores.",
    live: false,
  },
  {
    id: "tv-drama",
    title: "TV & Drama",
    description: "Television and drama composition.",
    live: false,
  },
  {
    id: "trailers-cinematics",
    title: "Trailers & Cinematics",
    description: "Game trailers, film trailers and cinematic work.",
    live: false,
  },
];

const THUMB_SIZE = 76;

export default function ReelsIndexPage() {
  const museumNeed = REELS.filter((r) => r.visualPool === "museum").length;
  const museumThumbs =
    museumNeed > 0 ? pickMuseumReelGalleryImages(museumNeed) : [];
  let museumIx = 0;

  return (
    <>
      <Nav />
      <main className="reels-index-page">
        <header className="reels-index-header">
          <h1 className="reels-index-title">Reels</h1>
          <p className="reels-index-intro">
            Selected audio and audiovisual reels by category. More added as they
            land.
          </p>
        </header>

        <ul className="reels-directory">
          {REELS.map((item) => {
            const thumb =
              item.visualPool === "museum"
                ? museumThumbs[museumIx++]
                : null;
            return (
              <li key={item.id} className="reels-directory-row">
                <div
                  className={
                    thumb
                      ? "reels-directory-thumb"
                      : "reels-directory-thumb reels-directory-thumb--empty"
                  }
                  aria-hidden={!thumb}
                >
                  {thumb ? (
                    <Image
                      src={thumb.src}
                      alt=""
                      width={THUMB_SIZE}
                      height={THUMB_SIZE}
                      sizes={`${THUMB_SIZE}px`}
                      className="reels-directory-thumb-img"
                    />
                  ) : null}
                </div>
                <div className="reels-directory-main">
                  <span className="reels-directory-title">{item.title}</span>
                  <p className="reels-directory-desc">{item.description}</p>
                </div>
                <div className="reels-directory-action">
                  {item.live && item.href ? (
                    <Link href={item.href} className="reels-directory-link">
                      Listen <span aria-hidden>→</span>
                    </Link>
                  ) : (
                    <span className="reels-directory-soon">Coming soon</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </main>
      <Footer />
    </>
  );
}
