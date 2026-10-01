import type { Metadata } from "next";
import HeroVideo from "../_components/HeroVideo";
import UrlarHero, { PremiereLine } from "../_components/UrlarHero";
import { DESC, HERO_OG as OG_IMAGE } from "../_components/hero";
import { HEADSHOT, SELECTED_CREDITS, SHORT_BIO } from "@/data/press";
import {
  Column, GAP, PlayedLiveBand, RoomParagraph, SANS, SERIF, UrlarPage, label, prose,
} from "../_components/ui";

/* Ùrlar, the venue page: for programmers and hosts. Opens on the same cloud
   hero and three-screen film as the public page (/urlar), with the premiere
   as a plain line and no ticket links; then what the show is, what it needs
   and how to book it. */

const PAGE_URL = "https://www.gileslamb.com/urlar/host";
const EMAIL = "giles@gileslamb.com";

export const metadata: Metadata = {
  title: "Ùrlar: a deep-listening performance · Giles Lamb",
  description: DESC,
  /* Shared directly with programmers, reachable by link, kept out of search.
     The public page is /urlar. */
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

export default function UrlarHostPage() {
  return (
    <UrlarPage>
      <style>{`
        /* Rider rows: label column and gutter scale with the page. */
        .uh-rider-row { display:grid; grid-template-columns:1fr; gap:calc(var(--u) * 0.25); }
        @media (min-width:640px){
          .uh-rider-row { grid-template-columns:calc(var(--u) * 9) 1fr; gap:calc(var(--u) * 1.5); }
        }
        /* About: headshot beside the bio from 640px up; the six credits run
           underneath, two columns on desktop, one on phones. */
        .uh-about { display:grid; grid-template-columns:1fr; gap:calc(var(--u) * 1.75); }
        .uh-credits { display:grid; grid-template-columns:1fr; column-gap:calc(var(--u) * 2); }
        .uh-about img { max-width:calc(var(--u) * 14); }
        @media (min-width:640px){
          .uh-about { grid-template-columns:calc(var(--u) * 11) 1fr; gap:calc(var(--u) * 2); align-items:start; }
          .uh-credits { grid-template-columns:1fr 1fr; }
          .uh-about img { max-width:none; }
        }
        .uh a.press { color:var(--cream); text-decoration:none; border-bottom:1px solid var(--accent-dim);
          transition:color .2s ease, border-color .2s ease; }
        .uh a.press:hover { color:var(--accent); border-color:var(--accent); }
        /* Hairline dividers between fact cells: vertical on the row, and on the
           2x2 stack only between columns. */
        .uh-fact + .uh-fact { border-left:1px solid var(--ash); }
        @media (max-width:639px){
          .uh-fact + .uh-fact { border-left:0; }
          .uh-fact:nth-child(even) { border-left:1px solid var(--ash); }
          .uh-fact:nth-child(n+3) { border-top:1px solid var(--ash); }
        }
      `}</style>

      <UrlarHero below={<PremiereLine />} />

      <HeroVideo />

      <Column>
        {/* ===== (2) FACT BAR ===== */}
        <section
          className="grid grid-cols-2 sm:grid-cols-4"
          style={{
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

        <RoomParagraph />

        <PlayedLiveBand />

        {/* ===== (4) ETYMOLOGY, pull-quote on a left rule ===== */}
        <blockquote
          style={{
            borderLeft: "1px solid var(--accent-dim)", paddingLeft: "calc(var(--u) * 1.5)",
            margin: `${GAP} 0 0`,
          }}
        >
          <p
            style={{
              fontFamily: SERIF, fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(calc(var(--u) * 1.3),2.5vw,calc(var(--u) * 1.65))", lineHeight: 1.4,
              color: "var(--cream)", margin: 0,
            }}
          >
            The ground is the theme a piece departs from and returns to.
          </p>
        </blockquote>

        {/* ===== ABOUT: headshot and short bio, six credits, link to /press ===== */}
        <section style={{ marginTop: GAP }}>
          <h2 style={label}>About</h2>
          <div className="uh-about" style={{ marginTop: "calc(var(--u) * 1.5)", borderTop: "1px solid var(--ash)", paddingTop: "calc(var(--u) * 1.5)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HEADSHOT.src}
              alt={HEADSHOT.alt}
              width={HEADSHOT.width}
              height={HEADSHOT.height}
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "auto", aspectRatio: "4 / 5", objectFit: "cover", display: "block" }}
            />
            <p style={{ ...prose, margin: 0 }}>{SHORT_BIO}</p>
          </div>

          <ul className="uh-credits" style={{ listStyle: "none", margin: "calc(var(--u) * 1.75) 0 0", padding: 0 }}>
            {SELECTED_CREDITS.map((c) => (
              <li
                key={c.title}
                style={{ ...prose, fontSize: "calc(var(--u) * 0.99)", lineHeight: 1.45, padding: "calc(var(--u) * 0.55) 0", borderTop: "1px solid var(--ash)" }}
              >
                <span style={{ color: "var(--cream)" }}>{c.title}</span>
                {c.detail && <span style={{ color: "var(--sand)" }}> · {c.detail}</span>}
              </li>
            ))}
          </ul>

          <a
            href="/press"
            className="press"
            style={{ display: "inline-block", marginTop: "calc(var(--u) * 1.5)", fontFamily: SANS, fontSize: "calc(var(--u) * 0.66)", letterSpacing: "0.22em", textTransform: "uppercase" }}
          >
            Full press kit
          </a>
        </section>

        {/* ===== (5) HOSTING IT ===== */}
        <section style={{ marginTop: GAP }}>
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
            marginTop: GAP, paddingTop: "calc(var(--u) * 2)",
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
      </Column>
    </UrlarPage>
  );
}
