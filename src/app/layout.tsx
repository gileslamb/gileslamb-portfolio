import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Giles Lamb · Cinematic Composer · Immersive Audiovisual Artist",
  description: "An artist whose medium includes film scores. A practice built continuously across albums, film, trailers, animation, and live audiovisual performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
