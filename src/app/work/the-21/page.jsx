"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

const PROJECT = {
  id: "the-21",
  title: "The 21",
  year: "2023",
  type: "SHORT ANIMATED FILM",
  director: "Tod Polson",
  tagline: "Score producer and sound designer for an animated short longlisted for an Academy Award.",
  description: `In February 2015, twenty-one Coptic Christian men were executed on a beach in Libya. The 21 is an animated short film that tells their story. Shaped by neo-Coptic iconography, five years in production, built by a team of over 70 artists from 24 countries.

The director is Tod Polson, former creative director at Cartoon Saloon, the Irish studio behind some of the most celebrated hand-drawn animation of recent decades. Jorge R. Gutierrez, director of The Book of Life, called it "a masterpiece of story, art, and faith."

I came in initially in a consulting role and ended up producing the full score and sound. Working with the Ayoub Sisters, classically trained musicians who weave Coptic hymns and liturgy into their compositions, the process became a deep collaboration. Score production, sound design and mix were a single thread from start to finish.

The film carries a particular weight. The subject matter is real, the families of the 21 were consulted throughout, and the Coptic community has embraced it as a document of faith and courage. The film found a wide audience beyond that community too. Longlisted for an Academy Award and shown at festivals internationally.`,
  awards: [
    "Director: Tod Polson (former Creative Director, Cartoon Saloon)",
    "Music: The Ayoub Sisters",
    "Score Production, Sound Design & Mix: Giles Lamb",
    "70+ artists from 24 countries",
    "Academy Award longlist",
  ],
  metadataRow: "SCORE COMPOSITION & PRODUCTION · SOUND DESIGN · MIX  |  THE AYOUB SISTERS  |  2023",
  image1: `${CF}/4c4c6acf-96ad-47b3-4f2a-de7efc826a00/public`,
  image1Alt: "The 21, animated short film",
  image2: `${CF}/c1681bd1-28a3-4db2-2573-86b6f10e9400/public`,
  image2Alt: "The 21, film still",
};

export default function The21Page() {
  return (
    <>
      <Nav />
      <main className="the-21-page">
        <article className="the-21-layout">
          <div className="the-21-left">
            <p className="the-21-type">{PROJECT.type} · {PROJECT.year}</p>
            <h1 className="the-21-title">{PROJECT.title}</h1>
            <p className="the-21-director">Director: {PROJECT.director}</p>
            <p className="the-21-tagline">{PROJECT.tagline}</p>

            <div className="the-21-description">
              {PROJECT.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="the-21-awards">
              {PROJECT.awards.map((award, i) => (
                <div key={i} className="the-21-award-item">
                  ✦ {award}
                </div>
              ))}
            </div>

            <p className="the-21-meta">{PROJECT.metadataRow}</p>
          </div>

          <div className="the-21-right">
            <div className="the-21-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROJECT.image1}
                alt={PROJECT.image1Alt}
                className="the-21-img"
              />
            </div>
            <div className="the-21-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROJECT.image2}
                alt={PROJECT.image2Alt}
                className="the-21-img"
              />
            </div>
          </div>
        </article>

        <div className="the-21-back">
          <Link href="/#work">← Back to Selected Work</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
