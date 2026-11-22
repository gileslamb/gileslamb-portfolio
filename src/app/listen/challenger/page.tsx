import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import ChallengerClient from "./ChallengerClient";

/* Challenger, from Time Loop (20 Nov 2026). Same face as the Invisible
   Threads listening room (Arimo = Liberation Sans outlines, self-hosted). */
const sleeveFont = Arimo({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-sleeve",
});

const OG_IMAGE = "https://www.gileslamb.com/listen/challenger/og.jpg";
const DESCRIPTION =
  "Challenger, from Time Loop. Move the slider to take the voice in and out.";

export const metadata: Metadata = {
  title: "Challenger | Giles Lamb",
  description: DESCRIPTION,
  openGraph: {
    title: "Challenger | Giles Lamb",
    description: DESCRIPTION,
    url: "https://www.gileslamb.com/listen/challenger",
    type: "music.song",
    images: [{ url: OG_IMAGE, width: 1080, height: 1080, alt: "Challenger, Giles Lamb" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Challenger | Giles Lamb",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function ChallengerPage() {
  return <ChallengerClient fontClass={sleeveFont.variable} />;
}
