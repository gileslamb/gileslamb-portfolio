import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { Cormorant_Garamond } from "next/font/google";

/** Homepage hero only — load on server to avoid client-bundle font work in dev */
const heroNameFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "300",
  style: "italic",
  display: "swap",
  variable: "--font-hero-name",
});

export const metadata: Metadata = {
  title: "Giles Lamb · Composer · Immersive Sound Artist",
  description:
    "Composer and immersive sound artist. Cinematic scoring, generative systems, and live audiovisual performance — Signal Dreams, The Quiet Room, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={heroNameFont.variable}>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
