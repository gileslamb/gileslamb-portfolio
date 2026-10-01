import type { Metadata } from "next";
import HeroVideo from "./HeroVideo";
import { HERO_OG as OG_IMAGE, STREAM } from "./hero";

/* Ùrlar, structured as a documented gig page rather than a poster.
   Site design system only: Cormorant Garamond + Karla (loaded globally via
   globals.css @import) and the :root colour tokens. Structure is Tailwind;
   colour stays inline so it reads off the tokens.
   It opens on a black hero built from the poster: the cloud still with the
   wordmark, gloss and premiere line over it. Then the three-screen audience
   film, full bleed and ungraded, with its own sound control (./HeroVideo).
   The page black is #000 here (scoped on .uh-page), matching the darkest
   values of both the film frames and the cloud, so the hero, film and page
   read as one dark sequence with no visible step. */

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

/* Cloud still from the poster (urlar_poster_frames/poster 1 scan .png),
   960x1080, transparent on RGB 0. Drawn with mix-blend-mode: screen, so it has
   no edge against the black. The cloud itself spans x 15% to 85% and y 29% to
   72% of the image; the hero CSS sizes and places it from those fractions. */
const CLOUD = "/urlar/cloud.png";

/* TODO(Giles): replace with the Eventbrite event URL. Until then the tickets
   button points at this placeholder and goes nowhere useful. */
const EVENTBRITE_URL = "EVENTBRITE_URL_TBC";

/* Premiere event details. */
const EVENT: [string, string, string][] = [
  ["When", "Friday 4 December 2026", "Doors 7pm, starts 7.30pm"],
  ["Where", "House of Toad", "Park Circus, Glasgow"],
  ["Tickets", "£20", "£15 concessions and House of Toad members. Booking fee applies."],
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
    <main className="uh-page" style={{ background: "var(--black)", color: "var(--warm)" }}>
      <style>{`
        /* One fluid unit drives every size on the page. It holds at 16px up to
           1440, grows to 20px by 2200, then stops, so the layout scales as a
           whole on large windows without turning the wordmark into a banner.
           Hairlines stay 1px on purpose. */
        .uh { overflow-x:clip; --u:clamp(16px, .526vw + 8.42px, 20px); }
        /* This page's black: pure #000, the film's own black. Scoped here so
           the global --black token is untouched; html and body follow it so
           overscroll shows the same black. */
        .uh-page { --black:#000; }
        html:has(.uh-page), html:has(.uh-page) body { background-color:#000 !important; }
        /* Under 768px globals.css sets overflow-x:hidden on html and body,
           which makes body a scroll container that never scrolls, and the
           film's view() crossfade then tracks body and freezes. clip keeps the
           sideways guard without the scroll container. */
        html:has(.uh-page) body { overflow-x:clip; }
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
        /* Hero: a full viewport of black, the cloud large in the upper part,
           the type in the lower third. --ch is the cloud image height: big on
           tall screens, held by the width on narrow ones so the cloud stays in
           frame. The top offset puts the cloud's own top edge (29% down the
           image) at 7svh. Isolated so the screen blend only sees the black. */
        .uh-top { position:relative; isolation:isolate; overflow:hidden; background:var(--black);
          min-height:100vh; min-height:100svh; display:flex; flex-direction:column; justify-content:flex-end;
          --ch:min(112vh, 152vw); --ch:min(112svh, 152vw); }
        .uh-cloud { position:absolute; left:50%; top:calc(7svh - var(--ch) * 0.29);
          height:var(--ch); width:auto; max-width:none; transform:translateX(-50%);
          mix-blend-mode:screen; pointer-events:none; user-select:none;
          animation:uh-breathe 28s ease-in-out infinite; }
        @keyframes uh-breathe {
          0%, 100% { transform:translateX(-50%) scale(1); opacity:.9; }
          50% { transform:translateX(-50%) translateY(-1.2%) scale(1.035); opacity:1; }
        }
        @media (prefers-reduced-motion: reduce) { .uh-cloud { animation:none; } }
        .uh-event + .uh-event { border-top:1px solid var(--ash); }
        @media (min-width:640px){
          .uh-event + .uh-event { border-top:0; border-left:1px solid var(--ash); padding-left:calc(var(--u) * 1.25) !important; }
          .uh-band { min-height:65vh; }
          .uh-cloud { left:55%; }
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
        {/* ===== (1) HERO: the cloud, with the poster's type over it ===== */}
        <header className="uh-top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="uh-cloud" src={CLOUD} alt="" aria-hidden="true" width={960} height={1080} fetchPriority="high" />

          <div
            className="relative w-full"
            style={{
              margin: "0 auto", maxWidth: "calc(var(--u) * 42)",
              padding:
                "calc(var(--u) * 6)" +
                " clamp(calc(var(--u) * 1.5),5vw,calc(var(--u) * 2))" +
                " clamp(calc(var(--u) * 3),9svh,calc(var(--u) * 5))",
            }}
          >
            <p style={{ ...label, fontSize: "calc(var(--u) * 0.78)", letterSpacing: "0.42em", color: "var(--cream)" }}>
              Giles Lamb
            </p>

            <h1
              style={{
                fontFamily: SERIF, fontStyle: "italic", fontWeight: 300,
                fontSize: "clamp(calc(var(--u) * 3.6),11vw,calc(var(--u) * 7))", lineHeight: 0.9,
                letterSpacing: "-0.02em", color: "var(--cream)", margin: "calc(var(--u) * 0.6) 0 0",
              }}
            >
              <span style={{ color: "var(--accent)" }}>Ù</span>rlar
            </h1>

            <p
              style={{
                fontFamily: SERIF, fontStyle: "italic", fontWeight: 400,
                fontSize: "clamp(calc(var(--u) * 1.15),2vw,calc(var(--u) * 1.4))", lineHeight: 1.4,
                color: "var(--sand)", margin: "calc(var(--u) * 1) 0 0",
              }}
            >
              Gaelic, the floor. In pibroch, the ground.
            </p>

            <p
              style={{
                fontFamily: SANS, fontWeight: 300, fontSize: "clamp(calc(var(--u) * 0.95),1.3vw,calc(var(--u) * 1.1))",
                lineHeight: 1.6, letterSpacing: "0.02em", color: "var(--cream)", margin: "calc(var(--u) * 1.5) 0 0",
              }}
            >
              <span className="block">Live music in quadraphonic sound.</span>
              <span className="block">Multi-screen projection. Total immersion.</span>
            </p>

            <p style={{ ...label, fontSize: "calc(var(--u) * 0.62)", letterSpacing: "0.2em", lineHeight: 1.9, color: "var(--warm)", margin: "calc(var(--u) * 2.25) 0 0" }}>
              <span style={{ color: "var(--accent)" }}>Premiere</span> · Friday 4 December 2026 · House of Toad, Glasgow
            </p>

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
          </div>
        </header>

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
          {/* ===== PREMIERE: event details and tickets ===== */}
          <section>
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
