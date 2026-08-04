import type { Metadata } from "next";
import AudioToggle from "./AudioToggle";
import ExcerptPlayer from "./ExcerptPlayer";

/* Ùrlar, structured as a documented gig page rather than a poster.
   Site design system only: Cormorant Garamond + Karla (loaded globally via
   globals.css @import) and the :root colour tokens. Structure is Tailwind;
   colour and the drawn elements stay inline so they read off the tokens.
   Background is the existing Ùrlar Cloudflare Stream composite (the /reel
   iframe pattern) under a near-black grade. */

const STREAM = "https://customer-3aa0vwfgpylhsylu.cloudflarestream.com";
const HERO_ID = "68eeb46ea059449e3660d0f785f8367f";
const HERO_POSTER = `${STREAM}/${HERO_ID}/thumbnails/thumbnail.jpg?time=8s&height=720`;
const HERO_IFRAME =
  `${STREAM}/${HERO_ID}/iframe?autoplay=true&loop=true&muted=true&controls=false&preload=auto` +
  `&poster=${encodeURIComponent(HERO_POSTER)}`;
const OG_IMAGE = `${STREAM}/${HERO_ID}/thumbnails/thumbnail.jpg?time=8s&width=1200&height=630&fit=crop`;
const PAGE_URL = "https://www.gileslamb.com/urlar/host";
const EMAIL = "giles@gileslamb.com";
const STILL =
  "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/1fceb1b8-7959-4ce2-b885-a107fd74d300/public";
const MAILTO = `mailto:${EMAIL}?subject=%C3%99rlar%3A%20dates`;

const DESC =
  "A deep-listening performance. Piano and modular synthesis in a quadraphonic sound field, with slow projected light. An occasional series for rooms not built as music venues.";

export const metadata: Metadata = {
  title: "Ùrlar: a deep-listening performance · Giles Lamb",
  description: DESC,
  /* Shared directly with programmers and the gig audience, reachable by link,
     kept out of search. Matches /urlar and /urlar/tickets. */
  robots: { index: false, follow: false },
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Giles Lamb",
    title: "Ùrlar: a deep-listening performance",
    description: DESC,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Ùrlar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ùrlar: a deep-listening performance",
    description: DESC,
    images: [OG_IMAGE],
  },
};

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS = "'Karla', -apple-system, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

/* Eight rings behind the wordmark, fading outward. */
const RINGS: [number, string][] = [
  [70, "#3b352d"],
  [120, "#353029"],
  [180, "#2f2b25"],
  [250, "#292621"],
  [330, "#24201c"],
  [420, "#1e1b18"],
  [520, "#181614"],
  [630, "#121110"],
];

function RingField() {
  return (
    <svg
      className="uh-rings"
      viewBox="0 0 1400 1400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {RINGS.map(([r, stroke]) => (
        <circle key={r} cx={700} cy={700} r={r} fill="none" stroke={stroke} strokeWidth={0.7} />
      ))}
    </svg>
  );
}

/* Primitive lyre: bowl, two arms, yoke, seven strings, tuning pegs. */
const STRINGS = [112, 128, 144, 160, 176, 192, 208];

function Lyre({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 380"
      fill="none"
      stroke="#8a7355"
      strokeWidth={4.2}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M92 244 C 96 302, 224 302, 228 244" />
      <path d="M88 244 C 132 233, 188 233, 232 244" />
      <path d="M100 240 C 52 190, 46 110, 92 54" />
      <path d="M220 240 C 268 190, 274 110, 228 54" />
      <path d="M82 60 C 140 48, 180 48, 238 60" />
      {STRINGS.map((x) => (
        <line key={x} x1={x} y1={56} x2={x} y2={238} stroke="#6e5c45" strokeWidth={2.4} />
      ))}
      {STRINGS.map((x) => (
        <circle
          key={`p${x}`}
          cx={x}
          cy={55}
          r={4.6}
          fill={x === 160 ? "var(--accent)" : "#8a7355"}
          stroke="none"
        />
      ))}
    </svg>
  );
}

/* (2) fact bar */
const FACTS: [string, string][] = [
  ["Duration", "70 minutes, no interval"],
  ["Sound", "Quadraphonic, four point"],
  ["Capacity", "20 to 60"],
  ["Support", "One invited guest"],
];

/* (3) in the room */
const ROOM: [string, string][] = [
  [
    "Sound",
    "Piano and modular synthesis moved around four speakers and a subwoofer, so the music arrives from behind and beside you as often as from the front.",
  ],
  [
    "Light",
    "Slow projected light on scrim and on the surfaces of the room itself. It moves at the pace of the music and never reacts to it.",
  ],
  [
    "Stillness",
    "The room is blacked out and the audience stays for the duration. People sit, or lie down. The sound is not talked over.",
  ],
];

/* (5) rider */
const RIDER: [string, string][] = [
  ["Blackout", "Full blackout. This is the single hard requirement."],
  ["Room", "Character surfaces suit it best: stone, plaster, timber."],
  ["Get-in", "Four hours before doors, two after."],
  ["Power", "Standard 13A."],
  [
    "System",
    "Quadraphonic speakers, subwoofer, projector, scrim, piano, modular. All of it arrives with me.",
  ],
  ["Fixings", "Nothing fixes to the building."],
  ["Running order", "Around 70 minutes, no interval, plus a guest opener."],
  ["Capacity", "20 to 60, depending on layout."],
];

const label: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: "0.66rem",
  fontWeight: 400,
  letterSpacing: "0.26em",
  textTransform: "uppercase",
  color: "var(--fog)",
  margin: 0,
};

const prose: React.CSSProperties = {
  fontFamily: SERIF,
  fontWeight: 400,
  fontSize: "clamp(1.02rem,1.4vw,1.15rem)",
  lineHeight: 1.65,
  color: "var(--warm)",
};

const slot: React.CSSProperties = {
  border: "1px solid var(--ash)",
  fontFamily: MONO,
  fontSize: "0.68rem",
  letterSpacing: "0.1em",
  color: "var(--smoke)",
};

export default function UrlarHostPage() {
  return (
    <main style={{ background: "var(--black)", color: "var(--warm)" }}>
      <style>{`
        .uh { overflow-x:clip; }
        .uh a.back:hover { color: var(--warm); }
        .uh a.cta { transition: background .3s ease, letter-spacing .3s ease; }
        .uh a.cta:hover { background: var(--cream); letter-spacing: .3em; }
        .uh-video { position:fixed; inset:0; overflow:hidden; z-index:0; pointer-events:none; background:var(--black); }
        .uh-video iframe { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
          width:100vw; height:56.25vw; min-height:100%; min-width:177.78vh; border:0; }
        .uh-grade { position:fixed; inset:0; z-index:0; pointer-events:none;
          background:
            linear-gradient(to bottom, rgba(8,8,8,.28) 0%, rgba(8,8,8,.62) 48%, rgba(8,8,8,.8) 100%),
            rgba(8,8,8,.52); }
        /* Ring field is anchored to the wordmark, so the two stay concentric. */
        .uh-rings-wrap { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
          width:150vw; height:150vw; max-width:1500px; max-height:1500px;
          z-index:-1; pointer-events:none; }
        .uh-rings { display:block; width:100%; height:100%; }
        .uh-lyre-hero { height:clamp(3.5rem,10.2vw,6.4rem); width:auto;
          position:relative; top:-.08em; }
        .uh-plate { position:fixed; z-index:2; pointer-events:none;
          inset:clamp(.75rem,1.8vw,1.35rem); border:1px solid #1c1915; }
        .uh-plate span { position:absolute; width:9px; height:9px; }
        .uh-plate span::before, .uh-plate span::after { content:''; position:absolute; background:#3b352d; }
        .uh-plate span::before { left:0; top:0; width:9px; height:1px; }
        .uh-plate span::after  { left:0; top:0; width:1px; height:9px; }
        .uh-plate .tl { left:-1px; top:-1px; }
        .uh-plate .tr { right:-1px; top:-1px; transform:scaleX(-1); }
        .uh-plate .bl { left:-1px; bottom:-1px; transform:scaleY(-1); }
        .uh-plate .br { right:-1px; bottom:-1px; transform:scale(-1,-1); }
        /* Hairline dividers between fact cells: vertical on the row, and on the
           2x2 stack only between columns. */
        .uh-fact + .uh-fact { border-left:1px solid var(--ash); }
        @media (max-width:639px){
          .uh-fact + .uh-fact { border-left:0; }
          .uh-fact:nth-child(even) { border-left:1px solid var(--ash); }
          .uh-fact:nth-child(n+3) { border-top:1px solid var(--ash); }
        }
      `}</style>

      <div className="uh relative">
        <div aria-hidden="true">
          <div className="uh-video">
            <iframe src={HERO_IFRAME} title="" tabIndex={-1} allow="autoplay; muted" loading="eager" />
          </div>
          <div className="uh-grade" />
        </div>

        <div className="uh-plate" aria-hidden="true">
          <span className="tl" /><span className="tr" /><span className="bl" /><span className="br" />
        </div>

        <a
          href="https://www.gileslamb.com"
          className="back fixed left-7 top-6 z-10 no-underline"
          style={{
            fontFamily: SANS, fontSize: "0.72rem", letterSpacing: "0.06em",
            color: "rgba(212,201,184,0.5)", transition: "color .2s ease",
          }}
        >
          ← gileslamb.com
        </a>

        <AudioToggle />

        <div
          className="relative z-[1] w-full max-w-2xl"
          style={{ margin: "0 auto", padding: "clamp(5rem,12vw,8rem) clamp(1.5rem,5vw,2rem) 6rem" }}
        >
          {/* ===== (1) HERO, the only centred block ===== */}
          <header className="relative text-center">
            <div className="uh-rings-wrap" aria-hidden="true">
              <RingField />
            </div>

            <div style={label}>Giles Lamb · Live</div>

            {/* Lyre locked to the left of the wordmark, optically centred on it */}
            <div
              className="flex items-center justify-center"
              style={{ gap: "clamp(0.9rem,2.2vw,1.6rem)", marginTop: "1.5rem" }}
            >
              <Lyre className="uh-lyre-hero shrink-0" />
              <h1
                style={{
                  fontFamily: SERIF, fontStyle: "italic", fontWeight: 300,
                  fontSize: "clamp(3.6rem,11vw,7rem)", lineHeight: 0.9,
                  letterSpacing: "-0.02em", color: "var(--cream)", margin: 0,
                }}
              >
                Ùrlar
              </h1>
            </div>

            <p
              style={{
                fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.12em",
                color: "var(--smoke)", margin: "1rem 0 0",
              }}
            >
              [ ˈuːr-lər ]
            </p>

            <p
              className="max-w-[46ch]"
              style={{ ...prose, color: "var(--sand)", margin: "1.75rem auto 0" }}
            >
              A 70-minute deep-listening concert for piano and modular synthesis, played into a
              quadraphonic field of sound and slow projected light.
            </p>
          </header>

          {/* ===== (2) FACT BAR ===== */}
          <section
            className="grid grid-cols-2 sm:grid-cols-4"
            style={{
              marginTop: "clamp(3.5rem,8vw,5rem)",
              borderTop: "1px solid var(--ash)", borderBottom: "1px solid var(--ash)",
            }}
          >
            {FACTS.map(([k, v], i) => (
              <div
                key={k}
                className="uh-fact"
                style={{ padding: "1.25rem 1rem", ...(i === 0 ? { paddingLeft: 0 } : null) }}
              >
                <div style={{ ...label, fontSize: "0.58rem", letterSpacing: "0.2em" }}>{k}</div>
                <div
                  style={{
                    fontFamily: SERIF, fontSize: "1rem", lineHeight: 1.35,
                    color: "var(--cream)", marginTop: "0.5rem",
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </section>

          {/* ===== (3) IN THE ROOM ===== */}
          <section style={{ marginTop: "clamp(3.5rem,8vw,5.5rem)" }}>
            <h2 style={label}>In the room</h2>
            <div
              className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-7"
              style={{ marginTop: "1.75rem" }}
            >
              {ROOM.map(([head, copy]) => (
                <div key={head}>
                  <h3
                    style={{
                      fontFamily: SERIF, fontStyle: "italic", fontWeight: 400,
                      fontSize: "1.3rem", lineHeight: 1.2, color: "var(--cream)", margin: 0,
                    }}
                  >
                    {head}
                  </h3>
                  <p style={{ ...prose, fontSize: "0.94rem", lineHeight: 1.6, margin: "0.7rem 0 0" }}>
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ===== (4) ETYMOLOGY, pull-quote on a left rule ===== */}
          <blockquote
            style={{
              borderLeft: "1px solid var(--accent-dim)", paddingLeft: "1.5rem",
              margin: "clamp(3.5rem,8vw,5.5rem) 0 0",
            }}
          >
            <p
              style={{
                fontFamily: SERIF, fontStyle: "italic", fontWeight: 400,
                fontSize: "clamp(1.3rem,2.5vw,1.65rem)", lineHeight: 1.4,
                color: "var(--cream)", margin: 0,
              }}
            >
              Ùrlar is the pibroch word for the ground: the theme a piece departs from and returns to.
            </p>
          </blockquote>

          {/* ===== EXCERPT: player alongside the floating toggle, and a still ===== */}
          <section style={{ marginTop: "clamp(3.5rem,8vw,5.5rem)" }}>
            <h2 style={label}>Excerpt</h2>
            <div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              style={{ marginTop: "1.5rem" }}
            >
              <ExcerptPlayer />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={STILL}
                alt="Ùrlar in performance"
                width={1366}
                height={768}
                loading="lazy"
                style={{
                  display: "block", width: "100%", height: "100%",
                  minHeight: "92px", objectFit: "cover",
                  border: "1px solid var(--ash)", filter: "saturate(.82) brightness(.72)",
                }}
              />
            </div>
          </section>

          {/* ===== (5) HOSTING IT ===== */}
          <section style={{ marginTop: "clamp(3.5rem,8vw,5.5rem)" }}>
            <h2 style={label}>Hosting it</h2>
            <dl style={{ borderTop: "1px solid var(--ash)", margin: "1.5rem 0 0" }}>
              {RIDER.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-1 gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6"
                  style={{ borderBottom: "1px solid var(--ash)", padding: "1rem 0" }}
                >
                  <dt style={{ ...label, fontSize: "0.6rem", letterSpacing: "0.2em", paddingTop: "0.3rem" }}>
                    {k}
                  </dt>
                  <dd style={{ ...prose, fontSize: "0.99rem", lineHeight: 1.55, margin: 0 }}>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ===== (6) FOOTER ROW. A plain div, not <footer>: globals.css styles
               the footer element as site chrome (padding 2.8rem 3.5rem, opaque
               background), which would indent this row and mask the video. ===== */}
          <div
            className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end"
            style={{
              marginTop: "clamp(3.5rem,8vw,5.5rem)", paddingTop: "2rem",
              borderTop: "1px solid var(--ash)",
            }}
          >
            <div>
              <div style={{ ...label, fontSize: "0.58rem", letterSpacing: "0.2em" }}>Confirmed</div>
              <p
                style={{
                  fontFamily: SERIF, fontSize: "1.3rem", lineHeight: 1.3,
                  color: "var(--cream)", margin: "0.6rem 0 0",
                }}
              >
                Sunday 20 September 2026
              </p>
              <p
                style={{
                  fontFamily: SANS, fontWeight: 300, fontSize: "0.82rem", lineHeight: 1.55,
                  color: "var(--sand)", margin: "0.35rem 0 0",
                }}
              >
                KCR Academy Barn, Dalgarven Mill, Ayrshire, with Seth Gardner (gong).
              </p>
            </div>

            <a
              href={MAILTO}
              className="cta inline-block shrink-0 no-underline"
              style={{
                fontFamily: SANS, fontSize: "0.72rem", fontWeight: 400,
                letterSpacing: "0.26em", textTransform: "uppercase",
                background: "var(--accent)", color: "var(--black)",
                padding: "1.05rem 2.4rem", display: "inline-block",
              }}
            >
              Find a date
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
