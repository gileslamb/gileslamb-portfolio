import type { Metadata } from "next";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { Cormorant_Garamond } from "next/font/google";

/* The Ùrlar wordmark's face (italic 300). Nothing else on the site uses it:
   everything else is Inter Tight, self-hosted in globals.css. */
const urlarFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "300",
  style: "italic",
  display: "swap",
  variable: "--font-urlar",
});
import { buildGlobalSchemas } from "@/lib/schema/helpers";

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
      className={urlarFont.variable}
      style={{ backgroundColor: "#D6D5D1" }}
    >
      <body
        style={{
          backgroundColor: "#D6D5D1",
          color: "#0A0A0A",
          minHeight: "100%",
        }}
      >
        <JsonLd schema={buildGlobalSchemas()} />
        {children}
      </body>
    </html>
  );
}
