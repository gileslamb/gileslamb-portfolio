"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const PROJECT = {
  id: "cineworld",
  title: "Cineworld: The Eternal Descent",
  year: "2012",
  type: "COMMERCIAL · CINEMA",
  client: "Cineworld",
  tagline: "The theme that played before every Cineworld screening, in every cinema across the UK.",
  description: `Every time someone went to the cinema, this played. Cineworld needed a theme. Something that could carry the ritual of the auditorium going dark. They came to it via Dead Island. The team behind the campaign had heard the Dead Island announcement trailer and wanted something with that same quality: cinematic weight, emotional directness, a sense of scale.

The track they found was The Eternal Descent. A piece submitted to a music library. It fit immediately. No brief, no commission from scratch. Just the right piece in the right place.

It played before screenings across the Cineworld estate. Every film, every screen, every visit.`,
  metadataRow: "COMPOSER  |  CINEWORLD  |  2012",
  image: "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/9ae53dfd-1b02-4624-20e2-157dafce9000/public",
  imageAlt: "Cineworld, The Eternal Descent, 2012",
};

export default function CineworldPage() {
  return (
    <>
      <Nav />
      <main className="cineworld-page">
        <article className="cineworld-layout">
          <div className="cineworld-left">
            <p className="cineworld-type">{PROJECT.type} · {PROJECT.year}</p>
            <h1 className="cineworld-title">{PROJECT.title}</h1>
            <p className="cineworld-tagline">{PROJECT.tagline}</p>

            <div className="cineworld-description">
              {PROJECT.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <p className="cineworld-meta">{PROJECT.metadataRow}</p>
          </div>

          <div className="cineworld-right">
            <div className="cineworld-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROJECT.image}
                alt={PROJECT.imageAlt}
                className="cineworld-img"
              />
            </div>
          </div>
        </article>

        <div className="cineworld-back">
          <Link href="/#work">← Back to Selected Work</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
