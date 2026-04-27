"use client";

import Link from "next/link";
import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import CloudflareVideo from "@/components/CloudflareVideo";
import { JsonLd } from "@/components/JsonLd";
import { buildDistanceToTheMoonSchema } from "@/lib/schema/works";
import { buildWorkBreadcrumb } from "@/lib/schema/helpers";

const PROJECT = {
  id: "distance-to-the-moon",
  title: "Distance to the Moon",
  year: "2025",
  type: "SHORT FILM · STOP-MOTION ANIMATION",
  client: "Curious Dreamers / Eyebols",
  medium: "Original Score · Stop-Motion Animation",
  role: "Composer · Producer",
  tagline:
    "Music and image built simultaneously. Neither serving the other.",
  description: `The starting point was Calvino. Cosmicomics, stories where science becomes memory, where characters climb ladders to the moon and drift through space with longing.

In a stark future where Earth lies desolate, its sole remaining inhabitant undertakes a surreal ascent to the Moon. Battling inner demons, existential despair, and profound solitude, the character discovers unexpected companionship and glimpses of beauty and hope in the infinite vastness of space.

Stop-motion animation inspired by early sci-fi: Fritz Lang's Metropolis, Hitchcock, Samuel Beckett, Italo Calvino's Cosmicomics. Set during the Space Race era but in a future timeline.

Distance to the Moon began as musical sketches, a surrealist opera that never quite became one. Music and image built together from the start, each shaping the other. Not score to picture. A single act of composition.`,
  awards: [
    "Distinction Award (Short Competition), Athens Animfest",
    "Music Award, Athens Animfest",
    "Best Soundtrack, Animaze",
    "Best Original Composition in a Short Film, Finalist, Music & Sound Awards",
    "Best International Animated Short, Shortlisted, Shark Awards",
  ],
  festivalSelections: [
    "Athens Animfest",
    "Stop-eMotion, Venice",
    "DUMBO Film Festival, NYC",
    "Edinburgh International Film Festival",
    "Animaze, Montreal International Animation Film Festival",
    "Banjaluka International Animated Film Festival",
    "POFF Shorts",
    "Trieste Science+Fiction Festival",
    "IndieCork Film Festival",
    "Edinburgh Short Film Festival",
    "Glasgow International Film Festival",
    "Portland EcoFilm Festival",
    "Liverpool Film Festival",
    "Manipulate Film Festival",
    "Glasgow Short Film Festival",
  ],
  externalUrl: "https://www.distancetothemoonfilm.com",
  videoId: "974fcd6c69f72218a2c1e4ad46fec6ef",
  coverImage: "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/dttm--high-res-stills-dttm-picture-lock-v06_01_01_19_12.jpg/public",
  stills: [
    "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/dttm--high-res-stills-dttm-picture-lock-v06_01_00_25_21-copy.jpg/public",
    "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/dttm--high-res-stills-dttm-picture-lock-v06_01_01_46_12-copy.jpg/public",
    "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/dttm--high-res-stills-dttm-picture-lock-v06_01_02_10_21-copy.jpg/public",
  ],
};

function imgPath(path) {
  const parts = path.split("/");
  const filename = parts.pop();
  return parts.join("/") + "/" + encodeURIComponent(filename);
}

export default function DistanceToTheMoonPage() {
  const [festivalsExpanded, setFestivalsExpanded] = useState(false);

  return (
    <>
      <JsonLd schema={[...buildDistanceToTheMoonSchema(), buildWorkBreadcrumb("Distance to the Moon", "distance-to-the-moon")]} />
      <Nav />
      <main className="dttm-page">
        <article className="dttm-layout">
          <div className="dttm-left">
            <p className="dttm-type">{PROJECT.type} · {PROJECT.year}</p>
            <h1 className="dttm-title">{PROJECT.title}</h1>
            <p className="dttm-tagline">{PROJECT.tagline}</p>

            <div className="dttm-description">
              {PROJECT.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="dttm-awards">
              {PROJECT.awards.map((award, i) => (
                <div key={i} className="dttm-award-item">
                  ✦ {award}
                </div>
              ))}
            </div>

            <div className="dttm-festivals">
              <button
                type="button"
                className="dttm-festivals-toggle"
                onClick={() => setFestivalsExpanded(!festivalsExpanded)}
              >
                {PROJECT.festivalSelections.length} festival selections
                <span className="dttm-toggle-icon">
                  {festivalsExpanded ? "−" : "+"}
                </span>
              </button>
              {festivalsExpanded && (
                <ul className="dttm-festivals-list">
                  {PROJECT.festivalSelections.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="dttm-meta">
              <span>{PROJECT.role}</span>
              <span className="dttm-meta-sep">·</span>
              <span>{PROJECT.medium}</span>
            </div>

            <div className="dttm-links">
              <a
                href={PROJECT.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dttm-link"
              >
                View Film Site →
              </a>
              <a
                href={PROJECT.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dttm-link"
              >
                Stream Album →
              </a>
            </div>
          </div>

          <div className="dttm-right">
            <div className="dttm-video">
              <CloudflareVideo videoId={PROJECT.videoId} />
            </div>
            <div className="dttm-stills">
              {PROJECT.stills.slice(0, 3).map((still, i) => (
                <div key={i} className="dttm-still">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgPath(still)}
                    className="dttm-still-img"
                    alt={`Distance to the Moon still ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </article>

        <div className="dttm-back">
          <Link href="/#work">← Back to Selected Work</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
