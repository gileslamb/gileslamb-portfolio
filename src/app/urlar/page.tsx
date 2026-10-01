import type { Metadata } from "next";
import HeroVideo from "./_components/HeroVideo";
import UrlarHero from "./_components/UrlarHero";
import UrlarSignup from "./_components/UrlarSignup";
import { DESC, HERO_OG as OG_IMAGE } from "./_components/hero";
import {
  Column, EventDetails, GAP, PlayedLiveBand, RoomParagraph, SANS, UrlarPage, label, prose,
} from "./_components/ui";

/* Ùrlar, the public page: the premiere, tickets and the mailing list. Opens
   on the shared cloud hero, with the event details and the one Book tickets
   button in it, then the three-screen film (hero and film are shared with
   /urlar/host, the venue page). Indexable. */

const PAGE_URL = "https://www.gileslamb.com/urlar";

export const metadata: Metadata = {
  title: "Ùrlar: a deep-listening performance · Giles Lamb",
  description: DESC,
  robots: { index: true, follow: true },
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

export default function UrlarPublicPage() {
  return (
    <UrlarPage>
      <UrlarHero compact below={<EventDetails style={{ marginTop: "calc(var(--u) * 1.5)" }} />} />

      <HeroVideo prominent />

      <Column>
        <RoomParagraph style={{ marginTop: 0 }} />

        <PlayedLiveBand />

        <p style={{ ...prose, color: "var(--sand)", margin: `${GAP} 0 0` }}>
          Award-winning composer and sound artist behind the music for the Bayeux Tapestry at
          the British Museum and the Book of Kells Experience at Trinity College Dublin.
        </p>

        <section style={{ marginTop: GAP, paddingTop: "calc(var(--u) * 2)", borderTop: "1px solid var(--ash)" }}>
          <h2 style={label}>Mailing list</h2>
          <UrlarSignup />
        </section>

        {/* Footer row. A plain div, not <footer>: globals.css styles the
            footer element as site chrome (padding, opaque background). */}
        <div style={{ marginTop: GAP, paddingTop: "calc(var(--u) * 2)", borderTop: "1px solid var(--ash)" }}>
          <a
            href="https://www.gileslamb.com"
            className="home no-underline"
            style={{
              ...label, fontSize: "calc(var(--u) * 0.62)", letterSpacing: "0.2em",
              color: "var(--sand)", transition: "color .2s ease", fontFamily: SANS,
            }}
          >
            gileslamb.com
          </a>
        </div>
      </Column>
    </UrlarPage>
  );
}
