"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const CLOUDFLARE_BASE = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

const PROJECT = {
  id: "holy-hell",
  title: "Holy Hell",
  year: "2016",
  type: "FEATURE DOCUMENTARY",
  client: "CNN Films / Netflix",
  director: "Will Allen",
  role: "Composer",
  medium: "Piano · Cello · Guitar · Ambient",
  production: "WRA Productions / Very Special Projects / Whitewater Films",
  executiveProducers: "Jared Leto, Cheryl Sanders, Julian Goldstein",
  awards: [
    "Sundance Film Festival, US Documentary Competition",
    "Documentary Critics Choice Award",
  ],
  distribution: "CNN Films · Netflix",
  posterImage: `${CLOUDFLARE_BASE}/14535be8-678b-404a-60d3-71cb2c887300/public`,
  filmStillImage: `${CLOUDFLARE_BASE}/7d088885-be0f-4554-0ee1-ec4dbf3a0f00/public`,
};

const COPY = [
  "In November 2015 I had an email from an old university friend. She had co-produced a feature documentary directed by Will Allen, who had recently left a cult he had been part of for more than 20 years and pieced together all the footage to make the film.",
  "I was immediately sucked into that world. The rough edit was poignant, almost dreamlike. Will had impeccable musical taste and was passionate about music being entwined with the edit. The challenge was replacing music he was so familiar with.",
  "The narrative arc was the key. The first two thirds are in many ways joyous and euphoric. As a viewer you get pulled into the hope and promise of something real. In the third act there is a sharp turn. My instinct was to go dark much earlier. I knew how the story would end.",
  "I used live cello, piano, guitar and ambient pads. The piano was perfect: percussive and celebratory, then incredibly melancholic. As the truth reveals itself the melancholy dominates and something sinister creeps in.",
];

export default function HolyHellPage() {
  return (
    <>
      <Nav />
      <main className="holy-hell-page">
        <article className="holy-hell-layout">
          <div className="holy-hell-left">
            <p className="holy-hell-type">{PROJECT.type} · {PROJECT.year}</p>
            <h1 className="holy-hell-title">{PROJECT.title}</h1>
            <p className="holy-hell-type-tag">{PROJECT.type}</p>

            <div className="holy-hell-description">
              {COPY.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="holy-hell-awards">
              {PROJECT.awards.map((award, i) => (
                <div key={i} className="holy-hell-award-item">
                  ✦ {award}
                </div>
              ))}
            </div>

            <p className="holy-hell-distribution">{PROJECT.distribution}</p>
            <p className="holy-hell-director">Director: {PROJECT.director}</p>

            <div className="holy-hell-meta">
              <span>{PROJECT.role}</span>
              <span className="holy-hell-meta-sep">·</span>
              <span>{PROJECT.medium}</span>
            </div>
          </div>

          <div className="holy-hell-right">
            <div className="holy-hell-poster">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROJECT.posterImage}
                alt="Holy Hell, 2016 film poster"
                className="holy-hell-img"
              />
            </div>
            <div className="holy-hell-hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROJECT.filmStillImage}
                alt="Holy Hell film still"
                className="holy-hell-img"
              />
            </div>
          </div>
        </article>

        <div className="holy-hell-back">
          <Link href="/#work">← Back to Selected Work</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
