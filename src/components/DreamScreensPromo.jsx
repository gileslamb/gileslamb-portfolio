import Image from "next/image";

const HERO =
  "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/139e9942-632c-478a-5ba5-977a6b6b5100/public";

export function DreamScreensPromo() {
  return (
    <section className="live-bridge" id="dream-screens">
      <div className="live-bridge-inner">
        <div className="live-text">
          <h2 className="live-headline reveal">Dream Screens</h2>
          <p className="live-body reveal reveal-delay-1">
            Dream Screens is a new project in development — a narrative
            conceptual album built using AI and immersive technologies. Where
            Signal Dreams is live and performative, Dream Screens is a composed
            experience: music, image and narrative designed to be inhabited
            rather than watched.
          </p>
          <p className="live-body reveal reveal-delay-2">
            The project explores what an album can be when image, story and
            sound are conceived together from the start — not a soundtrack to
            visuals, not visuals added to music, but a single thing.
          </p>
          <p className="live-body reveal reveal-delay-3">Still in development.</p>
          <a
            href="https://dream-screens.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="live-text-cta live-text-cta-prose reveal reveal-delay-4"
          >
            Find out more at Dream Screens
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
