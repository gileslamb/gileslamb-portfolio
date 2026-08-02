import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { Cormorant_Garamond } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { buildGlobalSchemas } from "@/lib/schema/helpers";

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
    "Composer and immersive sound artist based in Glasgow. Film, animation, installation and live audiovisual work.",
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
        <JsonLd schema={buildGlobalSchemas()} />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
