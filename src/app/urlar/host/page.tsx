import type { Metadata } from "next";

/* Reuses the site design system only: Cormorant Garamond + Karla (loaded globally
   via globals.css @import) and the :root colour tokens. No new fonts/deps.
   Hero reuses the existing Ùrlar Cloudflare Stream composite (50% performer blend)
   as a muted background — the /reel iframe pattern, no client JS. */

const STREAM = "https://customer-3aa0vwfgpylhsylu.cloudflarestream.com";
const HERO_ID = "68eeb46ea059449e3660d0f785f8367f";
const HERO_POSTER = `${STREAM}/${HERO_ID}/thumbnails/thumbnail.jpg?time=8s&height=720`;
const HERO_IFRAME =
  `${STREAM}/${HERO_ID}/iframe?autoplay=true&loop=true&muted=true&controls=false&preload=auto` +
  `&poster=${encodeURIComponent(HERO_POSTER)}`;
const OG_IMAGE = `${STREAM}/${HERO_ID}/thumbnails/thumbnail.jpg?time=8s&width=1200&height=630&fit=crop`;
const PAGE_URL = "https://www.gileslamb.com/urlar/host";
const MAILTO =
  "mailto:giles@gileslamb.com?subject=%C3%99rlar%20%E2%80%94%20venue%20enquiry";

const DESC =
  "A deep-listening performance — piano and modular synthesis in a quadraphonic sound field, with slow projected light. An occasional series for rooms not built as music venues.";

export const metadata: Metadata = {
  title: "Ùrlar — a deep-listening performance · Giles Lamb",
  description: DESC,
  /* Shared directly with programmers and the gig audience — reachable by link,
     kept out of search. Matches /urlar and /urlar/tickets. OG/Twitter cards are
     unaffected, so link previews still render when the page is shared. */
  robots: { index: false, follow: false },
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Giles Lamb",
    title: "Ùrlar — a deep-listening performance",
    description: DESC,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Ùrlar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ùrlar — a deep-listening performance",
    description: DESC,
    images: [OG_IMAGE],
  },
};

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS = "'Karla', -apple-system, sans-serif";

/* small uppercase section label */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: SANS,
        fontSize: "0.7rem",
        fontWeight: 400,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: "var(--fog)",
        marginBottom: "1.4rem",
      }}
    >
      {children}
    </div>
  );
}

export default function UrlarHostPage() {
  return (
    <main style={{ background: "var(--black)", color: "var(--warm)", minHeight: "100vh" }}>
      <style>{`
        .uh a.cta { transition: background .3s ease, color .3s ease, letter-spacing .3s ease; }
        .uh a.cta:hover { background: var(--accent); color: var(--black); letter-spacing: .3em; }
        .uh a.back:hover { color: var(--warm); }
        .uh-video { position:absolute; inset:0; overflow:hidden; z-index:0; pointer-events:none; background:var(--black); }
        .uh-video iframe { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
          width:100vw; height:56.25vw; min-height:100%; min-width:177.78vh; border:0; }
        .uh-give { display:grid; grid-template-columns:1fr 1fr; gap:3rem 2.5rem; }
        @media (max-width:620px){ .uh-give { grid-template-columns:1fr; gap:2.4rem; } }
      `}</style>

      <div className="uh">
        {/* Back link — mirrors /reel */}
        <a
          href="https://www.gileslamb.com"
          className="back"
          style={{
            position: "fixed", top: "1.5rem", left: "1.75rem", zIndex: 10,
            fontFamily: SANS, fontSize: "0.72rem", letterSpacing: "0.06em",
            color: "rgba(212,201,184,0.5)", textDecoration: "none", transition: "color .2s ease",
          }}
        >
          ← gileslamb.com
        </a>

        {/* ===== HERO ===== */}
        <header
          style={{
            position: "relative", minHeight: "100vh",
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: "clamp(2rem,6vw,5.5rem)", overflow: "hidden",
          }}
        >
          <div className="uh-video" aria-hidden="true">
            <iframe src={HERO_IFRAME} title="" tabIndex={-1} allow="autoplay; muted" loading="eager" />
          </div>
          {/* scrim for legibility */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
              background:
                "linear-gradient(to top, rgba(8,8,8,.92) 0%, rgba(8,8,8,.45) 45%, rgba(8,8,8,.62) 100%)",
            }}
          />
          <div style={{ position: "relative", zIndex: 2, maxWidth: "40ch" }}>
            <h1
              style={{
                fontFamily: SERIF, fontStyle: "italic", fontWeight: 300,
                fontSize: "clamp(4rem, 15vw, 10rem)", lineHeight: 0.9,
                letterSpacing: "-0.02em", margin: 0, color: "var(--cream)",
              }}
            >
              Ùrlar
            </h1>
            <p
              style={{
                fontFamily: SERIF, fontWeight: 400, fontStyle: "italic",
                fontSize: "clamp(1.15rem, 2.4vw, 1.7rem)", lineHeight: 1.4,
                color: "var(--sand)", margin: "1.4rem 0 0", maxWidth: "34ch",
              }}
            >
              Deep listening — piano and modular synthesis in a quadraphonic field of sound and slow light.
            </p>
          </div>
        </header>

        {/* ===== BODY ===== */}
        <div
          style={{
            maxWidth: "680px", margin: "0 auto",
            padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,6vw,2rem) 6rem",
          }}
        >
          {/* What it is */}
          <section style={{ marginBottom: "clamp(4rem,9vw,7rem)" }}>
            <Label>What it is</Label>
            {[
              <>Ùrlar is the pibroch word for the <em style={{ fontStyle: "italic", color: "var(--cream)" }}>ground</em> — the theme a piece departs from and returns to.</>,
              <>A deep-listening performance: piano and modular synthesis in a quadraphonic spatial sound field, with slow projected light on scrim and the surfaces of the room itself. The audience sit, or lie down.</>,
              <>It is not a concert, and not an ambient background set. Contemplative, not audio-reactive.</>,
            ].map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: SERIF, fontWeight: 400,
                  fontSize: "clamp(1.15rem,1.8vw,1.35rem)", lineHeight: 1.6,
                  color: "var(--warm)", margin: i === 0 ? 0 : "1.4rem 0 0",
                }}
              >
                {p}
              </p>
            ))}
          </section>

          {/* The room */}
          <section
            style={{
              marginBottom: "clamp(4rem,9vw,7rem)",
              paddingTop: "clamp(3rem,7vw,4.5rem)", borderTop: "1px solid var(--ash)",
            }}
          >
            <Label>The room — what Ùrlar needs, and gives back</Label>
            <div className="uh-give">
              <div>
                <h2 style={subhead}>Needs</h2>
                <ul style={list}>
                  <li style={liStrong}>
                    Full blackout — <span style={{ color: "var(--accent)" }}>the single hard requirement</span>. Evenings preferred.
                  </li>
                  <li style={li}>A room with character surfaces — stone, plaster, timber.</li>
                  <li style={li}>A four-hour get-in.</li>
                  <li style={li}>Power.</li>
                </ul>
              </div>
              <div>
                <h2 style={subhead}>Gives back</h2>
                <ul style={list}>
                  <li style={li}>A format that suits rooms not built as music venues.</li>
                  <li style={li}>20–60 capacity, depending on layout.</li>
                  <li style={li}>Ticketed, with a fair split.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Dates */}
          <section
            style={{
              marginBottom: "clamp(4rem,9vw,7rem)",
              paddingTop: "clamp(3rem,7vw,4.5rem)", borderTop: "1px solid var(--ash)",
            }}
          >
            <Label>Dates</Label>
            <p
              style={{
                fontFamily: SERIF, fontWeight: 400,
                fontSize: "clamp(1.3rem,2.4vw,1.7rem)", lineHeight: 1.4,
                color: "var(--cream)", margin: 0,
              }}
            >
              Sunday 20 September 2026
            </p>
            <p
              style={{
                fontFamily: SANS, fontWeight: 300, fontSize: "0.95rem",
                letterSpacing: "0.02em", lineHeight: 1.6, color: "var(--sand)", margin: "0.6rem 0 0",
              }}
            >
              KCR Academy Barn, Dalgarven Mill, Ayrshire &nbsp;·&nbsp; with Seth Gardner (gong)
            </p>
            <p
              style={{
                fontFamily: SANS, fontWeight: 300, fontSize: "0.9rem",
                lineHeight: 1.6, color: "var(--fog)", margin: "1.6rem 0 0",
              }}
            >
              Further dates for autumn and winter 2026 to be confirmed.
            </p>
          </section>

          {/* Series line */}
          <p
            style={{
              fontFamily: SERIF, fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(1.2rem,2.2vw,1.5rem)", lineHeight: 1.5,
              color: "var(--sand)", margin: "0 0 clamp(3.5rem,8vw,5.5rem)", maxWidth: "40ch",
            }}
          >
            Ùrlar is an occasional series — each edition shaped by its room and an invited guest performer.
          </p>

          {/* CTA */}
          <div style={{ borderTop: "1px solid var(--ash)", paddingTop: "clamp(3rem,7vw,4.5rem)" }}>
            <a
              href={MAILTO}
              className="cta"
              style={{
                display: "inline-block", fontFamily: SANS, fontSize: "0.75rem",
                fontWeight: 400, letterSpacing: "0.26em", textTransform: "uppercase",
                color: "var(--accent)", textDecoration: "none",
                padding: "1.05rem 2.6rem", border: "1px solid var(--accent)",
              }}
            >
              Host an Ùrlar
            </a>
            <p
              style={{
                fontFamily: SANS, fontWeight: 300, fontSize: "0.8rem",
                lineHeight: 1.6, color: "var(--fog)", margin: "1.4rem 0 0",
              }}
            >
              An enquiry email to Giles — no form, no obligation.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

const subhead: React.CSSProperties = {
  fontFamily: "'Karla', sans-serif",
  fontSize: "0.7rem",
  fontWeight: 400,
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "var(--sand)",
  margin: "0 0 1.1rem",
};

const list: React.CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.9rem",
};

const li: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontWeight: 400,
  fontSize: "1.18rem",
  lineHeight: 1.45,
  color: "var(--warm)",
};

const liStrong: React.CSSProperties = { ...li, color: "var(--cream)" };
