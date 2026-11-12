import type { Metadata } from "next";
import MeninClient from "./MeninClient";

/* Unlisted page for the Menin Gate 100 tender (CWGC, Nov 2026), opened from a
   QR code in the concept book. Not linked from anywhere, not in nav, noindex
   (metadata here + X-Robots-Tag header in next.config.ts). Content: data.ts. */

export const metadata: Metadata = {
  title: "Menin Gate 100 · Giles Lamb",
  description: "Listening page for the Menin Gate 100 tender.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function MeninPage() {
  return <MeninClient />;
}
