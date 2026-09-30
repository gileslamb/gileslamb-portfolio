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

/* Image band behind the "played live" line: a still of the playing (studio
   pilot, 2:50). PLAYING_ID is the clip; BAND_AT picks the frame (51s is both
   hands on the keys). BAND_OVERLAY is the near-black wash over the still. */
const PLAYING_ID = "3913fbedb27eed32fd88c6d87eab3448";
const BAND_AT = 51;
const BAND_IMAGE = `${STREAM}/${PLAYING_ID}/thumbnails/thumbnail.jpg?time=${BAND_AT}s&height=1080`;
const BAND_OVERLAY = 0.7;

const DESC =
  "Live music in quadraphonic sound. Multi-screen projection. Total immersion.";

/* Premiere poster, above the hero film (web copy of the press pack
   urlar-poster.png, flattened on #0a0a09, 1400 wide). */
const POSTER = "/urlar/poster-house-of-toad.jpg";

/* TODO(Giles): replace with the Eventbrite event URL. Until then the tickets
   button points at this placeholder and goes nowhere useful. */
const EVENTBRITE_URL = "EVENTBRITE_URL_TBC";

/* Premiere event details. */
const EVENT: [string, string, string][] = [
  ["When", "Friday 4 December 2026", "Doors 7pm, starts 7.30pm"],
  ["Where", "House of Toad", "Park Circus, Glasgow"],
  ["Tickets", "£35", "Including a drink on arrival. 50 places."],
];

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

/* (5) rider */
const RIDER: [string, string][] = [
  ["Blackout", "Full blackout, or after dark."],
  ["Room", "Character surfaces suit it best: stone, plaster, timber."],
  ["Get-in", "Four hours before doors, two after."],
  [
    "System",
    "Quadraphonic speakers, subwoofer, three projectors and screens, and the instruments. All of it arrives with me.",
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
        /* Band breaks out of the centred column to the full viewport width. */
        .uh-band { position:relative; width:100vw; margin-left:calc(50% - 50vw);
          min-height:45vh; display:flex; align-items:center; justify-content:center;
          padding:calc(var(--u) * 3) clamp(calc(var(--u) * 1.5),5vw,calc(var(--u) * 2)); overflow:hidden; }
        .uh-band img, .uh-band-wash { position:absolute; inset:0; width:100%; height:100%; }
        .uh-band img { object-fit:cover; object-position:center; display:block; }
        /* Poster sits centred on black above the film, portrait, never wider
           than the content column plus a little. */
        .uh-poster { background:var(--black); padding:clamp(calc(var(--u) * 3.5),8vw,calc(var(--u) * 5)) clamp(16px,5vw,calc(var(--u) * 2)); }
        .uh-poster img { display:block; width:100%; max-width:calc(var(--u) * 30); height:auto; margin:0 auto; }
        .uh-event + .uh-event { border-top:1px solid var(--ash); }
        @media (min-width:640px){
          .uh-event + .uh-event { border-top:0; border-left:1px solid var(--ash); padding-left:calc(var(--u) * 1.25) !important; }
          .uh-band { min-height:65vh; }
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
        {/* ===== POSTER, above the hero film ===== */}
        <div className="uh-poster">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={POSTER}
            alt="Ùrlar poster. Giles Lamb, live music in quadraphonic sound. Friday 4 December 2026, House of Toad, Park Circus, Glasgow. Doors 7pm, starts 7.30pm. £35 including a drink on arrival, 50 places."
            width={1400}
            height={1978}
            fetchPriority="high"
          />
        </div>

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
                Live music in quadraphonic sound. Multi-screen projection. Total immersion.
              </p>
            </div>
          </header>

          {/* ===== PREMIERE: event details and tickets ===== */}
          <section style={{ marginTop: "clamp(calc(var(--u) * 3),7vw,calc(var(--u) * 4.5))" }}>
            <h2 style={{ ...label, color: "var(--accent)" }}>Premiere</h2>
            <dl
              className="grid grid-cols-1 sm:grid-cols-3"
              style={{ margin: "calc(var(--u) * 1.25) 0 0", borderTop: "1px solid var(--ash)" }}
            >
              {EVENT.map(([k, main, sub]) => (
                <div key={k} className="uh-event" style={{ padding: "calc(var(--u) * 1.1) 0" }}>
                  <dt style={{ ...label, fontSize: "calc(var(--u) * 0.58)", letterSpacing: "0.2em" }}>{k}</dt>
                  <dd style={{ margin: "calc(var(--u) * 0.5) 0 0" }}>
                    <span
                      style={{
                        display: "block", fontFamily: SERIF, fontSize: "calc(var(--u) * 1.2)",
                        lineHeight: 1.3, color: "var(--cream)",
                      }}
                    >
                      {main}
                    </span>
                    <span
                      style={{
                        display: "block", fontFamily: SANS, fontWeight: 300, fontSize: "calc(var(--u) * 0.82)",
                        lineHeight: 1.55, color: "var(--sand)", marginTop: "calc(var(--u) * 0.3)",
                      }}
                    >
                      {sub}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href={EVENTBRITE_URL}
              className="cta inline-block no-underline"
              style={{
                fontFamily: SANS, fontSize: "calc(var(--u) * 0.72)", fontWeight: 400,
                letterSpacing: "0.26em", textTransform: "uppercase",
                background: "var(--accent)", color: "var(--black)",
                padding: "calc(var(--u) * 1.05) calc(var(--u) * 2.4)", marginTop: "calc(var(--u) * 1.25)",
              }}
            >
              Book tickets
            </a>
          </section>

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

          {/* ===== (3) THE ROOM: one paragraph, no heading ===== */}
          <p style={{ ...prose, margin: "clamp(calc(var(--u) * 3.5),8vw,calc(var(--u) * 5.5)) 0 0" }}>
            The room is blacked out, so the projections create a field of light, with people
            sitting or lying down. I play from behind, among the audience.
          </p>

          {/* ===== PLAYED LIVE BAND: full bleed out of the column, still of the
               playing under a near-black wash that fades into the page. ===== */}
          <section className="uh-band" style={{ marginTop: "clamp(calc(var(--u) * 3.5),8vw,calc(var(--u) * 5.5))" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BAND_IMAGE} alt="" aria-hidden="true" loading="lazy" decoding="async" width={1920} height={1080} />
            <div
              aria-hidden="true"
              className="uh-band-wash"
              style={{
                background:
                  "linear-gradient(to bottom, var(--black) 0%, transparent 22%, transparent 78%, var(--black) 100%)," +
                  ` rgba(8,8,8,${BAND_OVERLAY})`,
              }}
            />
            <p
              style={{
                position: "relative", fontFamily: SERIF, fontStyle: "italic", fontWeight: 400,
                fontSize: "clamp(calc(var(--u) * 1.3),2.5vw,calc(var(--u) * 1.65))", lineHeight: 1.4,
                color: "var(--cream)", maxWidth: "32ch", margin: 0, textAlign: "center",
              }}
            >
              The outline is composed, but within it everything is improvised, so every performance
              is different. I play in response to the feel of the space and the people in it, in
              the moment.
            </p>
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
              <div style={{ ...label, fontSize: "calc(var(--u) * 0.58)", letterSpacing: "0.2em" }}>Bookings</div>
              <p
                style={{
                  fontFamily: SANS, fontWeight: 300, fontSize: "calc(var(--u) * 0.82)", lineHeight: 1.55,
                  color: "var(--sand)", margin: "calc(var(--u) * 0.6) 0 0",
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
