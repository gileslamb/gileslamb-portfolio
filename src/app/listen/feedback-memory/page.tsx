import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import ListenClient from "./ListenClient";

/* Unlisted listening page for a funding application (Oct 2026). Not linked from
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
  description: "Feedback Memory, from Dream Screens (2026, unreleased). Giles Lamb, composer.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function ListenFeedbackMemoryPage() {
  return <ListenClient fontClass={sleeveFont.variable} />;
}
