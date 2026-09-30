import Image from "next/image";

const HERO = "/images/dream-screens.png";

export function DreamScreensPromo() {
  return (
    <section className="live-bridge" id="dream-screens">
      <div className="live-bridge-inner">
        <div className="live-text">
          <h2 className="live-headline reveal">Dream Screens</h2>
          <p className="live-body reveal reveal-delay-1">
            Dream Screens is a concept album, with music, image and story built
            together from the start. Out 30 October.
          </p>
          <p className="live-body reveal reveal-delay-2">
            Where the live work is made in the moment, Dream Screens is composed
            and fixed, a world you move through.
          </p>
          <a
            href="https://dream-screens.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="live-text-cta live-text-cta-prose reveal reveal-delay-3"
          >
            Dream Screens
          </a>
        </div>
        <div className="live-featured-link reveal reveal-delay-2">
          <div className="live-visual">
            <Image
              src={HERO}
              alt="Dream Screens"
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="live-featured-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
