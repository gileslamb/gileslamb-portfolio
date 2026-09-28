import type { Metadata } from "next";
import HeroVideo from "./HeroVideo";
import { HERO_OG as OG_IMAGE, STREAM } from "./hero";

/* Ùrlar, structured as a documented gig page rather than a poster.
   Site design system only: Cormorant Garamond + Karla (loaded globally via
   globals.css @import) and the :root colour tokens. Structure is Tailwind;
   colour stays inline so it reads off the tokens.
   The hero is the three-screen audience film, full width and ungraded, with
   its own sound control (./HeroVideo). Everything below sits on var(--black). */

const PAGE_URL = "https://www.gileslamb.com/urlar/host";
const EMAIL = "giles@gileslamb.com";

/* "Played live": a second, smaller clip of the playing. PLAYING_ID is the one
   constant to swap. STAND-IN: the ghosted performer clip from /urlar until the
   real footage is on Stream. PLAYING_POSTER_AT should land on hands on the
   instruments. */
const PLAYING_ID = "68eeb46ea059449e3660d0f785f8367f";
const PLAYING_POSTER_AT = 8;
const PLAYING_POSTER = `${STREAM}/${PLAYING_ID}/thumbnails/thumbnail.jpg?time=${PLAYING_POSTER_AT}s&height=720`;
const PLAYING_IFRAME =
  `${STREAM}/${PLAYING_ID}/iframe?controls=true&preload=metadata` +
  `&poster=${encodeURIComponent(PLAYING_POSTER)}`;

/* Darkens the played-live clip only, poster included (it renders inside the
   same filtered wrapper, so nothing jumps when playback starts). */
const PLAYING_BRIGHTNESS = 0.7;
const PLAYING_CONTRAST = 1.1;
const PLAYING_SATURATE = 0.9;
const PLAYING_FILTER = `brightness(${PLAYING_BRIGHTNESS}) contrast(${PLAYING_CONTRAST}) saturate(${PLAYING_SATURATE})`;

const DESC =
  "A 60-minute deep-listening concert for piano and synthesis, played into a quadraphonic field of sound and slow projected light, moving from delicate and fragile to something quite intense, and back.";

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

/* (2) fact bar */
const FACTS: [string, string][] = [
  ["Duration", "Around 60 minutes, no interval"],
  ["Sound", "Quadraphonic spatial"],
  ["Capacity", "20 to 60"],
  ["Performance", "Structured improvisation, played live"],
];

/* (3) in the room */
const ROOM: [string, string][] = [
  [
    "Sound",
    "Piano and synthesis moved around four speakers and a subwoofer, so the music arrives from behind and beside you as often as from the front. I play from the back of the room, with the audience, rather than from a stage.",
  ],
  [
    "Light",
    "Slow projected light across three screens: one large screen ahead and two dimmer ones either side, so the image surrounds the room rather than sitting in front of it.",
  ],
  [
    "Stillness",
    "The room is blacked out and the audience stays for the duration. People sit, or lie down. The sound is not talked over.",
  ],
];

/* (5) rider */
const RIDER: [string, string][] = [
  ["Blackout", "Full blackout, or after dark."],
  ["Room", "Character surfaces suit it best: stone, plaster, timber."],
  ["Get-in", "Four hours before doors, two after."],
  [
    "System",
    "Quadraphonic speakers, subwoofer, three projectors and screens, piano and synthesis. All of it arrives with me.",
  ],
  ["Installation", "Freestanding. Nothing fixes to the building."],
  ["Seating", "Seating, mats or floor cushions, from the venue."],
  ["Running order", "Around 60 minutes, no interval, plus scope for a guest opener."],
  ["Capacity", "20 to 60, depending on layout."],
];

const label: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: "calc(var(--u) * 0.66)",
  fontWeight: 400,
  letterSpacing: "0.26em",
  textTransform: "uppercase",
  color: "var(--fog)",
  margin: 0,
};

const prose: React.CSSProperties = {
  fontFamily: SERIF,
  fontWeight: 400,
  fontSize: "clamp(calc(var(--u) * 1.02),1.4vw,calc(var(--u) * 1.15))",
  lineHeight: 1.65,
  color: "var(--warm)",
};


export default function UrlarHostPage() {
  return (
    <main style={{ background: "var(--black)", color: "var(--warm)" }}>
      <style>{`
        /* One fluid unit drives every size on the page. It holds at 16px up to
           1440, grows to 20px by 2200, then stops, so the layout scales as a
           whole on large windows without turning the wordmark into a banner.
           Hairlines stay 1px on purpose. */
        .uh { overflow-x:clip; --u:clamp(16px, .526vw + 8.42px, 20px); }
        .uh a.back:hover { color: var(--warm); }
        .uh a.cta { transition: background .3s ease, letter-spacing .3s ease; }
        .uh a.cta:hover { background: var(--cream); letter-spacing: .3em; }
        .uh-plate { position:fixed; z-index:2; pointer-events:none;
          inset:clamp(calc(var(--u) * 0.75),1.8vw,calc(var(--u) * 1.35)); border:1px solid #1c1915; }
        .uh-plate span { position:absolute; width:9px; height:9px; }
        .uh-plate span::before, .uh-plate span::after { content:''; position:absolute; background:#3b352d; }
        .uh-plate span::before { left:0; top:0; width:9px; height:1px; }
        .uh-plate span::after  { left:0; top:0; width:1px; height:9px; }
        .uh-plate .tl { left:-1px; top:-1px; }
        .uh-plate .tr { right:-1px; top:-1px; transform:scaleX(-1); }
        .uh-plate .bl { left:-1px; bottom:-1px; transform:scaleY(-1); }
        .uh-plate .br { right:-1px; bottom:-1px; transform:scale(-1,-1); }
        /* Rider rows: label column and gutter scale with the page. */
        .uh-rider-row { display:grid; grid-template-columns:1fr; gap:calc(var(--u) * 0.25); }
        .uh-playing { width:100%; }
        @media (min-width:640px){
          .uh-playing { max-width:60%; }
          .uh-rider-row { grid-template-columns:calc(var(--u) * 9) 1fr; gap:calc(var(--u) * 1.5); }
        }
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
        <HeroVideo />

        <div className="uh-plate" aria-hidden="true">
          <span className="tl" /><span className="tr" /><span className="bl" /><span className="br" />
        </div>

        <a
          href="https://www.gileslamb.com"
          className="back fixed left-7 top-6 z-10 no-underline"
          style={{
            fontFamily: SANS, fontSize: "calc(var(--u) * 0.72)", letterSpacing: "0.06em",
            color: "rgba(212,201,184,0.5)", transition: "color .2s ease",
          }}
        >
          ← gileslamb.com
        </a>

        <div
          className="relative z-[1] w-full"
          style={{
            margin: "0 auto", maxWidth: "calc(var(--u) * 42)",
            padding:
              "clamp(calc(var(--u) * 3),7vw,calc(var(--u) * 5))" +
              " clamp(calc(var(--u) * 1.5),5vw,calc(var(--u) * 2))" +
              " calc(var(--u) * 6)",
          }}
        >
          {/* ===== (1) HERO, the only centred block ===== */}
          <header className="relative text-center">
            <div style={label}>Giles Lamb · Live</div>

            <h1
              style={{
                fontFamily: SERIF, fontStyle: "italic", fontWeight: 300,
                fontSize: "clamp(calc(var(--u) * 3.6),11vw,calc(var(--u) * 7))", lineHeight: 0.9,
                letterSpacing: "-0.02em", color: "var(--cream)", margin: "calc(var(--u) * 1.5) 0 0",
              }}
            >
              <span style={{ color: "var(--accent)" }}>Ù</span>rlar
            </h1>

            <p
              style={{
                fontFamily: MONO, fontSize: "calc(var(--u) * 0.72)", letterSpacing: "0.12em",
                color: "var(--smoke)", margin: "calc(var(--u) * 1) 0 0",
              }}
            >
              [ ˈuːr-lər ]
            </p>

            <div className="max-w-[46ch]" style={{ margin: "calc(var(--u) * 1.75) auto 0" }}>
              <p style={{ ...prose, color: "var(--sand)", margin: 0 }}>
                A 60-minute deep-listening concert for piano and synthesis, played into a
                quadraphonic field of sound and slow projected light.
              </p>
              <p style={{ ...prose, color: "var(--sand)", margin: "calc(var(--u) * 1) 0 0" }}>
                It starts from a ground and evolves, the music and the visuals cycling through
                beauty, energy, stillness and real dynamics. It moves from delicate and fragile to
                something quite intense, and back. A journey that is meditative and detailed
                throughout.
              </p>
              <p style={{ ...prose, color: "var(--sand)", margin: "calc(var(--u) * 1) 0 0" }}>
                Everything is played live. The shape of the hour is composed, but what happens
                inside it is found in the moment, in the room, and it is different every night.
              </p>
            </div>
          </header>

          {/* ===== (2) FACT BAR ===== */}
          <section
            className="grid grid-cols-2 sm:grid-cols-4"
            style={{
              marginTop: "clamp(calc(var(--u) * 3.5),8vw,calc(var(--u) * 5))",
              borderTop: "1px solid var(--ash)", borderBottom: "1px solid var(--ash)",
            }}
          >
            {FACTS.map(([k, v], i) => (
              <div
                key={k}
                className="uh-fact"
                style={{ padding: "calc(var(--u) * 1.25) calc(var(--u) * 1)", ...(i === 0 ? { paddingLeft: 0 } : null) }}
              >
                <div style={{ ...label, fontSize: "calc(var(--u) * 0.58)", letterSpacing: "0.2em" }}>{k}</div>
                <div
                  style={{
                    fontFamily: SERIF, fontSize: "calc(var(--u) * 1)", lineHeight: 1.35,
                    color: "var(--cream)", marginTop: "calc(var(--u) * 0.5)",
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </section>

          {/* ===== (3) IN THE ROOM ===== */}
          <section style={{ marginTop: "clamp(calc(var(--u) * 3.5),8vw,calc(var(--u) * 5.5))" }}>
            <h2 style={label}>In the room</h2>
            <div
              className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-7"
              style={{ marginTop: "calc(var(--u) * 1.75)" }}
            >
              {ROOM.map(([head, copy]) => (
                <div key={head}>
                  <h3
                    style={{
                      fontFamily: SERIF, fontStyle: "italic", fontWeight: 400,
                      fontSize: "calc(var(--u) * 1.3)", lineHeight: 1.2, color: "var(--cream)", margin: 0,
                    }}
                  >
                    {head}
                  </h3>
                  <p style={{ ...prose, fontSize: "calc(var(--u) * 0.94)", lineHeight: 1.6, margin: "calc(var(--u) * 0.7) 0 0" }}>
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ===== PLAYED LIVE: click to play, with sound. Darkened by PLAYING_FILTER. ===== */}
          <section style={{ marginTop: "clamp(calc(var(--u) * 3.5),8vw,calc(var(--u) * 5.5))" }}>
            <h2 style={label}>Played live</h2>
            <div
              className="uh-playing"
              style={{
                position: "relative", aspectRatio: "16 / 9", marginTop: "calc(var(--u) * 1.75)",
                background: "var(--black)", border: "1px solid var(--ash)", filter: PLAYING_FILTER,
              }}
            >
              <iframe
                src={PLAYING_IFRAME}
                title="Giles Lamb playing Ùrlar live, piano and synthesis"
                aria-label="Video: Giles Lamb playing Ùrlar live, piano and synthesis"
                allow="encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              />
            </div>
          </section>

          {/* ===== (4) ETYMOLOGY, pull-quote on a left rule ===== */}
          <blockquote
            style={{
              borderLeft: "1px solid var(--accent-dim)", paddingLeft: "calc(var(--u) * 1.5)",
              margin: "clamp(calc(var(--u) * 3.5),8vw,calc(var(--u) * 5.5)) 0 0",
            }}
          >
            <p
              style={{
                fontFamily: SERIF, fontStyle: "italic", fontWeight: 400,
                fontSize: "clamp(calc(var(--u) * 1.3),2.5vw,calc(var(--u) * 1.65))", lineHeight: 1.4,
                color: "var(--cream)", margin: 0,
              }}
            >
              Ùrlar is the pibroch word for the ground: the theme a piece departs from and returns to.
            </p>
          </blockquote>

          {/* ===== (5) HOSTING IT ===== */}
          <section style={{ marginTop: "clamp(calc(var(--u) * 3.5),8vw,calc(var(--u) * 5.5))" }}>
            <h2 style={label}>Hosting it</h2>
            <dl style={{ borderTop: "1px solid var(--ash)", margin: "calc(var(--u) * 1.5) 0 0" }}>
              {RIDER.map(([k, v]) => (
                <div
                  key={k}
                  className="uh-rider-row"
                  style={{ borderBottom: "1px solid var(--ash)", padding: "calc(var(--u) * 1) 0" }}
                >
                  <dt style={{ ...label, fontSize: "calc(var(--u) * 0.6)", letterSpacing: "0.2em", paddingTop: "calc(var(--u) * 0.3)" }}>
                    {k}
                  </dt>
                  <dd style={{ ...prose, fontSize: "calc(var(--u) * 0.99)", lineHeight: 1.55, margin: 0 }}>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ===== (6) FOOTER ROW. A plain div, not <footer>: globals.css styles
               the footer element as site chrome (padding 2.8rem 3.5rem, opaque
               background), which would indent this row. ===== */}
          <div
            className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end"
            style={{
              marginTop: "clamp(calc(var(--u) * 3.5),8vw,calc(var(--u) * 5.5))", paddingTop: "calc(var(--u) * 2)",
              borderTop: "1px solid var(--ash)",
            }}
          >
            <div>
              <div style={{ ...label, fontSize: "calc(var(--u) * 0.58)", letterSpacing: "0.2em" }}>Confirmed</div>
              <div
                style={{
                  ...label, fontSize: "calc(var(--u) * 0.58)", letterSpacing: "0.2em",
                  color: "var(--accent)", marginTop: "calc(var(--u) * 0.9)",
                }}
              >
                Premiere
              </div>
              <p
                style={{
                  fontFamily: SERIF, fontSize: "calc(var(--u) * 1.3)", lineHeight: 1.3,
                  color: "var(--cream)", margin: "calc(var(--u) * 0.6) 0 0",
                }}
              >
                Friday 4 December 2026
              </p>
              <p
                style={{
                  fontFamily: SANS, fontWeight: 300, fontSize: "calc(var(--u) * 0.82)", lineHeight: 1.55,
                  color: "var(--sand)", margin: "calc(var(--u) * 0.35) 0 0",
                }}
              >
                House of Toad, Park Circus, Glasgow.
              </p>
              <p
                style={{
                  fontFamily: SANS, fontWeight: 300, fontSize: "calc(var(--u) * 0.82)", lineHeight: 1.55,
                  color: "var(--sand)", margin: "calc(var(--u) * 0.35) 0 0",
                }}
              >
                Further dates from January 2027.
              </p>
            </div>

            <a
              href={`mailto:${EMAIL}`}
              className="cta inline-block shrink-0 no-underline"
              style={{
                fontFamily: SANS, fontSize: "calc(var(--u) * 0.72)", fontWeight: 400,
                letterSpacing: "0.26em", textTransform: "uppercase",
                background: "var(--accent)", color: "var(--black)",
                padding: "calc(var(--u) * 1.05) calc(var(--u) * 2.4)", display: "inline-block",
              }}
            >
              {EMAIL}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
