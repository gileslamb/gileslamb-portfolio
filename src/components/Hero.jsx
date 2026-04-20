"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export function Hero() {
  const waveformRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (waveformRef.current) {
        waveformRef.current.style.transform = `translateY(${window.scrollY * 0.28}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero">
      {/* Background image - full bleed, object-fit cover */}
      <div
        className="hero-bg-image"
        style={{
          backgroundImage: "url(https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/wide_studio_2026.png/public)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Dark overlay for text legibility */}
      <div className="hero-bg-overlay" />
      {/* Waveform SVG - 8% opacity, parallax on scroll */}
      <div className="hero-waveform" ref={waveformRef}>
        <svg viewBox="0 0 600 800" preserveAspectRatio="none">
          <defs>
            <filter id="b">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>
          <path
            className="wave-line"
            style={{ animationDuration: "19s" }}
            d="M0,80 C90,65 180,110 270,80 S450,50 540,80 S580,100 600,80"
            filter="url(#b)"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.6"
          />
          <path
            className="wave-line"
            style={{ animationDuration: "14s", strokeOpacity: 0.5 }}
            d="M0,170 C110,145 220,200 330,170 S510,135 600,170"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.6"
          />
          <path
            className="wave-line"
            style={{ animationDuration: "23s" }}
            d="M0,260 C70,238 155,288 240,260 S400,228 480,260 S555,288 600,260"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.6"
          />
          <path
            className="wave-line"
            style={{ animationDuration: "16s", strokeOpacity: 0.4 }}
            d="M0,350 C130,315 260,390 390,350 S550,308 600,350"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.6"
          />
          <path
            className="wave-line"
            style={{ animationDuration: "21s" }}
            d="M0,440 C85,415 175,468 265,440 S430,408 515,440 S570,465 600,440"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.6"
          />
          <path
            className="wave-line"
            style={{ animationDuration: "12s", strokeOpacity: 0.3 }}
            d="M0,530 C105,498 210,558 315,530 S510,492 600,530"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.6"
          />
          <path
            className="wave-line"
            style={{ animationDuration: "26s" }}
            d="M0,620 C85,592 190,652 295,620 S480,585 575,620 S595,638 600,620"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.6"
          />
          <path
            className="wave-line"
            style={{ animationDuration: "18s", strokeOpacity: 0.45 }}
            d="M0,710 C125,675 250,745 375,710 S555,668 600,710"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.6"
          />
        </svg>
      </div>
      <p className="hero-eyebrow">Composer · Immersive Sound Artist</p>
      <h1 className="hero-name">
        Giles
        <br />
        <span className="hero-name-surname">Lamb</span>
      </h1>
      <div className="hero-descriptor">
        <p>
          Composer. Film and installation, live audiovisual, generative work.
          Three decades of commissioned scoring and own artistic practice.
          Cannes, BAFTA, RTS and Music+Sound awards.
          I spend as much time on process and improvisation as on the final mix.
        </p>
        <p>
          Signal Dreams is current live work.{" "}
          <Link href="/writing" className="hero-descriptor-link">
            The Quiet Room
          </Link>{" "}
          is writing on sound and how I work.
        </p>
      </div>
      <div className="hero-cta">
        <Link href="#work" className="cta-primary">
          Selected Work
        </Link>
        <Link href="#contact" className="cta-secondary">
          Commission a project
        </Link>
      </div>

      <div className="scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
