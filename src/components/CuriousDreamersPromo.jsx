import Image from "next/image";

const HERO =
  "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/33e1fa44-6454-4c4d-892d-8354d1e11500/public";

export function CuriousDreamersPromo() {
  return (
    <section className="live-bridge" id="curious-dreamers">
      <div className="live-bridge-inner">
        <div className="live-text">
          <h2 className="live-headline reveal">Curious Dreamers</h2>
          <p className="live-body reveal reveal-delay-1">
            Curious Dreamers is an independent animation studio developing
            original IP across animation and immersive formats. Building on the
            award-winning early years series Lullaby, with multiple projects
            currently in development. Presenting at Cartoon Forum Berlin in May
            and Annecy in June 2026.
          </p>
          <a
            href="https://www.curiousdreamers.com"
            target="_blank"
            rel="noopener noreferrer"
            className="live-text-cta live-text-cta-prose reveal reveal-delay-2"
          >
            Visit Curious Dreamers
          </a>
        </div>
        <div className="live-featured-link reveal reveal-delay-2">
          <div className="live-visual">
            <Image
              src={HERO}
              alt="Curious Dreamers"
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
