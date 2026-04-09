import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { Cormorant_Garamond } from "next/font/google";

/** Homepage hero only: load on server to avoid client-bundle font work in dev */
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
    "Composer. Film, installation, live audiovisual, Glasgow, UK. Signal Dreams, The Quiet Room.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={heroNameFont.variable}
      style={{ backgroundColor: "#080808" }}
    >
      <body
        style={{
          backgroundColor: "#080808",
          color: "#d4c9b8",
          minHeight: "100%",
        }}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
