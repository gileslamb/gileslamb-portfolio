"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import CloudflareVideo from "@/components/CloudflareVideo";
import { JsonLd } from "@/components/JsonLd";
import { buildValhallaRisingSchema } from "@/lib/schema/works";
import { buildWorkBreadcrumb } from "@/lib/schema/helpers";

const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

const PROJECT = {
  id: "valhalla-rising",
  title: "Valhalla Rising",
  year: "2009",
  type: "FEATURE FILM",
  director: "Nicolas Winding Refn",
  tagline: "Sound design and original composition for Refn's mythic Viking film. His next was Drive.",
  description: `Nicolas Winding Refn shot Valhalla Rising entirely in Scotland. Mads Mikkelsen plays One Eye, a mute warrior moving through landscape and violence with the logic of a dream. There is almost no dialogue. The film lives in its atmosphere.

The brief was unusual. Rather than composing to picture in the conventional sense, an improvising ensemble was assembled for two days and played live to the film. Everything was recorded. That raw material became the sound design: textures, drones, percussive strikes extracted and shaped into something between score and soundscape.

The result sits alongside compositions by Peter Peter and Peter Kyed. Released on 180g vinyl by Milan Records. Credited as additional composer and sound designer.

Refn coined his approach "Refn-esque" after this film. Drive followed two years later.`,
  awards: [
    "Released on 180g vinyl, Milan Records",
    "Credited: Additional Composer · Sound Designer",
    "Premiered: Venice Film Festival, 2009",
    "Shot entirely in Scotland",
  ],
  metadataRow: "SOUND DESIGN · ADDITIONAL COMPOSER  |  IFC FILMS  |  MILAN RECORDS  |  2009",
  image: `${CF}/3362dd69-35ae-4e85-f2f6-6665a03d4e00/public`,
  imageAlt: "Valhalla Rising, Nicolas Winding Refn, 2009",
  videoId: "582a45f1926a1d2a92712035161f77d9",
};

export default function ValhallaRisingPage() {
  return (
    <>
      <JsonLd schema={[...buildValhallaRisingSchema(), buildWorkBreadcrumb("Valhalla Rising", "valhalla-rising")]} />
      <Nav />
      <main className="valhalla-rising-page">
        <article className="valhalla-rising-layout">
          <div className="valhalla-rising-left">
            <p className="valhalla-rising-type">{PROJECT.type} · {PROJECT.year}</p>
            <h1 className="valhalla-rising-title">{PROJECT.title}</h1>
            <p className="valhalla-rising-director">Director: {PROJECT.director}</p>
            <p className="valhalla-rising-tagline">{PROJECT.tagline}</p>

            <div className="valhalla-rising-description">
              {PROJECT.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="valhalla-rising-awards">
              {PROJECT.awards.map((award, i) => (
                <div key={i} className="valhalla-rising-award-item">
                  ✦ {award}
                </div>
              ))}
            </div>

            <p className="valhalla-rising-meta">{PROJECT.metadataRow}</p>
          </div>

          <div className="valhalla-rising-right">
            <div className="valhalla-rising-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROJECT.image}
                alt={PROJECT.imageAlt}
                className="valhalla-rising-img"
              />
            </div>
            <div className="valhalla-rising-video">
              <CloudflareVideo videoId={PROJECT.videoId} />
            </div>
          </div>
        </article>

        <div className="valhalla-rising-back">
          <Link href="/#work">← Back to Selected Work</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
