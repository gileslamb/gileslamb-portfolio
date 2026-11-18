import Link from "next/link";

export function Hero() {
  return (
    <section className="hero">
      {/* The photo runs full-bleed behind a solid paper column (left third on
          desktop; on phone the column stacks above it). object-position in
          globals.css keeps the face clear of the column as the window narrows. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-photo"
        src="https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/wide_studio_2026.png/public"
        alt="Giles Lamb in his studio"
        width={1152}
        height={768}
        fetchPriority="high"
      />
      <div className="hero-col">
        <div className="hero-col-top">
          <p className="hero-eyebrow">Composer · Immersive Sound Artist</p>
          <h1 className="hero-name">
            Giles
            <br />
            <span className="hero-name-surname">Lamb</span>
          </h1>
        </div>
        <div className="hero-col-bottom">
          <div className="hero-descriptor">
            <p>
              Composer and sound artist. Thirty years scoring film, television,
              animation and games, alongside museum and installation work, most
              recently the Bayeux Tapestry at the British Museum.
            </p>
            <p>
              My own work is live and spatial. Ùrlar, for piano, synthesis,
              projection and spatial sound, premieres at House of Toad, Glasgow,
              on 4 December. I&rsquo;m also developing Situated Score, spatial
              sound research with the University of Glasgow.
            </p>
            <p>Cannes, BAFTA, RTS and Music+Sound awards.</p>
          </div>
          <div className="hero-cta">
            <Link href="#work" className="cta-primary">
              Selected Work
            </Link>
            <Link href="/live" className="cta-secondary">
              Live
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
