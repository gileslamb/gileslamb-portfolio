import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { pickMuseumReelGalleryImages } from "@/data/museumReelSideImages";
import { pickCinematicsTrailersImages } from "@/data/cinematicsTrailersSideImages";
import { pickDramaDocumentaryImages } from "@/data/dramaDocumentarySideImages";
import { pickKidsAnimationImages } from "@/data/kidsAnimationSideImages";
import { pickTvImages } from "@/data/tvSideImages";

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
    title: "Kids & Animation",
    description: "Score and sound design for animation across all ages.",
    href: "/reels/kids-animation",
    live: true,
    visualPool: "kids",
  },
  {
    id: "documentary",
    title: "Drama & Documentary",
    description: "Feature and short documentary scores.",
    href: "/reels/drama-documentary",
    live: true,
    visualPool: "drama",
  },
  {
    id: "tv-drama",
    title: "TV",
    description: "Television and drama composition.",
    href: "/reels/tv",
    live: true,
    visualPool: "tv",
  },
  {
    id: "trailers-cinematics",
    title: "Cinematics & Trailers",
    description: "Game trailers, film trailers and cinematic work.",
    href: "/reels/cinematics-trailers",
    live: true,
    visualPool: "cinematics",
  },
];

const THUMB_SIZE = 76;

export default function ReelsIndexPage() {
  const thumbMap = {
    museum:     pickMuseumReelGalleryImages(1)[0]    ?? null,
    kids:       pickKidsAnimationImages(1)[0]         ?? null,
    drama:      pickDramaDocumentaryImages(1)[0]      ?? null,
    tv:         pickTvImages(1)[0]                    ?? null,
    cinematics: pickCinematicsTrailersImages(1)[0]    ?? null,
  };

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
          <p className="reels-index-back">
            Part of the work at{" "}
            <Link href="/" className="reels-index-back-link">gileslamb.com</Link>
          </p>
        </header>

        <ul className="reels-directory">
          {REELS.map((item) => {
            const thumb = item.visualPool ? (thumbMap[item.visualPool] ?? null) : null;
            return (
              <li key={item.id} className="reels-directory-row">
                {item.live && item.href ? (
                  <Link href={item.href} className="reels-directory-thumb-link" tabIndex={-1} aria-hidden="true">
                    <div className={thumb ? "reels-directory-thumb" : "reels-directory-thumb reels-directory-thumb--empty"}>
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
                  </Link>
                ) : (
                  <div className={thumb ? "reels-directory-thumb" : "reels-directory-thumb reels-directory-thumb--empty"} aria-hidden="true">
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
                )}
                <div className="reels-directory-main">
                  {item.live && item.href ? (
                    <Link href={item.href} className="reels-directory-title-link">
                      {item.title}
                    </Link>
                  ) : (
                    <span className="reels-directory-title">{item.title}</span>
                  )}
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
