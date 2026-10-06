import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import ListenClient from "./ListenClient";

/* Unlisted listening page for a grant panel (Oct 2026). Not linked from
   nav, not in any sitemap, noindex. Same face as the Invisible Threads
   listening room. */
const sleeveFont = Arimo({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-sleeve",
});

export const metadata: Metadata = {
  title: "Dream Screens — Giles Lamb",
  description: "Two pieces from Dream Screens (2026, unreleased).",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function ListenDsPage() {
  return <ListenClient fontClass={sleeveFont.variable} />;
}
