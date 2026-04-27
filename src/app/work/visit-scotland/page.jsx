"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import CloudflareVideo from "@/components/CloudflareVideo";
import { JsonLd } from "@/components/JsonLd";
import { buildVisitScotlandSchema } from "@/lib/schema/works";
import { buildWorkBreadcrumb } from "@/lib/schema/helpers";

const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

const PROJECT = {
  id: "visit-scotland",
  title: "Visit Scotland: A Spirit of its Own",
  year: "2016",
  type: "CAMPAIGN SCORE",
  client: "VisitScotland / Mallinson TV Productions",
  tagline: "Original orchestral score for VisitScotland's first ever global campaign. Performed by the Royal Scottish National Orchestra.",
  description: `Mallinson TV Productions in Glasgow commissioned the score for VisitScotland's Spirit of Scotland campaign. Their biggest global push to that point, running across the UK, US, Canada, France, Germany and Australia. The brief was to create something that felt iconic: music that could carry the weight of a nation.

The piece was recorded with over 50 musicians at the RSNO's brand-new concert hall in Glasgow. The first recording ever made there. Working with a full symphony orchestra at that scale, in a room that had never heard music before, was something you don't forget.

VisitScotland's head of marketing said they were looking for "a score that stirs something deep inside everyone who hears it." The campaign launched on 10 February 2016, unveiled by First Minister Nicola Sturgeon. It went on to feature on Good Morning America.

The score was later released as an EP titled "Timeless".`,
  awards: [
    "First ever recording at the RSNO's new Glasgow concert hall",
    "50+ musicians from the Royal Scottish National Orchestra",
    "Campaign launched globally 10 February 2016",
    "Featured on Good Morning America",
    "Released as EP: Timeless",
    "Campaign agency: The Union, Edinburgh",
    "Producer: Mallinson TV Productions, Glasgow",
  ],
  metadataRow: "COMPOSER  |  VISITSCOTLAND / RSNO  |  MALLINSON TV PRODUCTIONS  |  2016",
  image1: `${CF}/67d9add6-9e16-4eff-e6a3-66dc69cdcd00/public`,
  image1Alt: "Visit Scotland, Spirit of Scotland campaign",
  image2: `${CF}/38b87459-6a18-4c72-e3f7-d5930d601e00/public`,
  image2Alt: "RSNO recording session, Glasgow",
  image3: `${CF}/f358ecb4-8a67-4adf-16c8-824064190b00/public`,
  image3Alt: "Visit Scotland campaign still",
  videoId: "37a15ccbd778298e67d377875dc7e069",
};

export default function VisitScotlandPage() {
  return (
    <>
      <JsonLd schema={[...buildVisitScotlandSchema(), buildWorkBreadcrumb("Visit Scotland: A Spirit of its Own", "visit-scotland")]} />
      <Nav />
      <main className="visit-scotland-page">
        <article className="visit-scotland-layout">
          <div className="visit-scotland-left">
            <p className="visit-scotland-type">{PROJECT.type} · {PROJECT.year}</p>
            <h1 className="visit-scotland-title">{PROJECT.title}</h1>
            <p className="visit-scotland-tagline">{PROJECT.tagline}</p>

            <div className="visit-scotland-description">
              {PROJECT.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <p className="visit-scotland-listen">
              <a
                href="https://open.spotify.com/album/4SHwC028aqhTOcpd40irAx?si=4T3Jt4DUQr6O6Xu-riD5Ew"
                target="_blank"
                rel="noopener noreferrer"
                className="project-external-link"
              >
                Listen: Timeless EP on Spotify ↗
              </a>
            </p>

            <div className="visit-scotland-awards">
              {PROJECT.awards.map((award, i) => (
                <div key={i} className="visit-scotland-award-item">
                  ✦ {award}
                </div>
              ))}
            </div>

            <p className="visit-scotland-meta">{PROJECT.metadataRow}</p>
          </div>

          <div className="visit-scotland-right">
            <div className="visit-scotland-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROJECT.image1}
                alt={PROJECT.image1Alt}
                className="visit-scotland-img"
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <div className="visit-scotland-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROJECT.image2}
                alt={PROJECT.image2Alt}
                className="visit-scotland-img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="visit-scotland-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROJECT.image3}
                alt={PROJECT.image3Alt}
                className="visit-scotland-img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="visit-scotland-video">
              <CloudflareVideo videoId={PROJECT.videoId} />
            </div>
          </div>
        </article>

        <div className="visit-scotland-back">
          <Link href="/#work">← Back to Selected Work</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
