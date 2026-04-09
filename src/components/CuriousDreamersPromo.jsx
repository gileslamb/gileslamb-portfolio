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
            Curious Dreamers is a Glasgow-based music and screen studio making
            animated series, immersive films and sound installations. Music comes
            first in everything they make. Giles is Composer and Sound Designer
            at the studio, with credits including the RTS award-winning Hushabye
            Lullaby and the festival-acclaimed stop-motion film Distance to the
            Moon. Multiple projects currently in development. Presenting at
            Pictoplasma Berlin in May, Annecy in June and MIP Cannes in November
            2026.
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
