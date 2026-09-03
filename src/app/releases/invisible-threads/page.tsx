import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import InvisibleThreadsClient from "./InvisibleThreadsClient";

/* The printed sleeve (ecopak + disc, August 2026) is set in one face:
   Liberation Sans Regular. Liberation Sans 2.x shares its outlines with
   Arimo (Google Fonts), which next/font self-hosts at build time — no
   runtime request to Google. Loaded on the server, applied via --font-sleeve. */
const sleeveFont = Arimo({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-sleeve",
});

const OG_IMAGE = "https://www.gileslamb.com/releases/invisible-threads/og.jpg";

export const metadata: Metadata = {
  title: "Invisible Threads — Giles Lamb",
  description: "Invisible Threads — a listening room. Ten pieces, one thread.",
  openGraph: {
    title: "Invisible Threads — Giles Lamb",
    description: "Invisible Threads — a listening room. Ten pieces, one thread.",
    url: "https://www.gileslamb.com/releases/invisible-threads",
    type: "music.album",
    images: [{ url: OG_IMAGE, width: 1200, height: 1200, alt: "Invisible Threads — Giles Lamb" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invisible Threads — Giles Lamb",
    description: "Invisible Threads — a listening room. Ten pieces, one thread.",
    images: [OG_IMAGE],
  },
};

export default function InvisibleThreadsPage() {
  return <InvisibleThreadsClient fontClass={sleeveFont.variable} />;
}
