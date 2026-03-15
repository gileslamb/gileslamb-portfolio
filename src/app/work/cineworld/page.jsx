"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function CineworldPage() {
  return (
    <>
      <Nav />
      <main className="coming-soon-page">
        <div className="coming-soon-content">
          <h1 className="coming-soon-title">Cineworld</h1>
          <p className="coming-soon-message">Coming soon.</p>
        </div>
        <div className="coming-soon-back">
          <Link href="/#work">← Back to Selected Work</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
