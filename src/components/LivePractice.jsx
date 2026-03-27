import Image from "next/image";
import Link from "next/link";

/** Featured live / immersive credit: real project page, not a placeholder */
const FEATURED_PROJECT_HREF = "/work/story-trails";
const FEATURED_IMAGE =
  "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/d7b9ffe0-5073-4182-1443-89c60b8b4000/public";

export function LivePractice() {
  return (
    <section className="live-bridge" id="live">
      <div className="live-bridge-inner">
        <div className="live-text">
          <p className="live-eyebrow reveal">Live Practice</p>
          <h2 className="live-headline reveal reveal-delay-1">
            Sound as the DNA
            <br />
            from which
            <br />
            <em>image emerges</em>
          </h2>
          <p className="live-body reveal reveal-delay-2">
            Years of studio and film work, now in the room in real time. Modular
            and TouchDesigner. Sound and image at once, neither pretending to lead.
            Debuting 2025.
          </p>
          <Link
            href={FEATURED_PROJECT_HREF}
            className="live-text-cta reveal reveal-delay-2"
          >
            Story Trails: view project
          </Link>
        </div>
        <Link
          href={FEATURED_PROJECT_HREF}
          className="live-featured-link reveal reveal-delay-2"
          aria-label="Story Trails project"
        >
          <div className="live-visual">
            <Image
              src={FEATURED_IMAGE}
              alt="Story Trails immersive installation"
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="live-featured-image"
              priority={false}
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
