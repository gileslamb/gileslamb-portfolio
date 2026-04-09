"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import CloudflareVideo from "@/components/CloudflareVideo";

const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

export const STORY_TRAILS_PROJECT = {
  id: "story-trails",
  title: "Story Trails",
  year: "2022",
  type: "IMMERSIVE · SPATIAL AUDIO",
  client: "StoryFutures Academy / ISO Design / BBC",
  tagline:
    "Original score, sound design and mix for the UK's largest immersive storytelling project.",
  description: `Story Trails toured 15 towns and cities across the UK in summer 2022. Part of UNBOXED: Creativity in the UK, the largest creative programme ever staged across the four nations. Executive produced by David Olusoga, it brought together augmented reality, immersive cinema and LiDAR scanning technology to reanimate public spaces with untold local histories.

The centrepiece of each location was a cycloramic cinema screen inside the town library. LiDAR data captured the physical fabric of each city: buildings, streets, fragments of place. It was processed into animated 3D footage that moved through space and time. The score had to move with it.

The approach was to dissolve the boundary between music and sound design. Foley, location recordings and effects were folded into the composition rather than layered separately on top. Surreal visual elements (twisted architecture, manipulated archival footage) needed sound that matched their logic rather than explained it. The music worked best when it behaved like the images: familiar materials made strange.

Composition, sound design and mix were a single process throughout.`,
  awards: [
    "Part of UNBOXED: Creativity in the UK, 4 nations, 2022",
    "Executive Producer: David Olusoga",
    "15 locations: Blackpool, Bradford, Bristol, Dumfries, Dundee, Lambeth, Lewisham, Lincoln, Newport, Omagh, Sheffield, Slough, Swansea, Swindon, Wolverhampton",
    "Culminated in a BBC iPlayer film: The People's Piazza",
    "Partners: StoryFutures Academy · ISO Design · BFI · BBC · Nexus Studios",
  ],
  metadataRow:
    "COMPOSER · SOUND DESIGN · MIX  |  STORYFUTURES / ISO DESIGN  |  BBC  |  2022",
  image1: `${CF}/d7b9ffe0-5073-4182-1443-89c60b8b4000/public`,
  image1Alt: "Story Trails immersive installation",
  image2: `${CF}/24b09d57-e824-4a7a-74b6-08869afbe000/public`,
  image2Alt: "Story Trails cycloramic screen",
  videoId: "4bf85a45046ca32d5773edf9f64e6d47",
};

export function StoryTrailsCaseStudy({
  backHref = "/#work",
  backLabel = "← Back to Selected Work",
}) {
  const PROJECT = STORY_TRAILS_PROJECT;
  return (
    <>
      <Nav />
      <main className="story-trails-page">
        <article className="story-trails-layout">
          <div className="story-trails-left">
            <p className="story-trails-type">
              {PROJECT.type} · {PROJECT.year}
            </p>
            <h1 className="story-trails-title">{PROJECT.title}</h1>
            <p className="story-trails-tagline">{PROJECT.tagline}</p>

            <div className="story-trails-description">
              {PROJECT.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="story-trails-awards">
              {PROJECT.awards.map((award, i) => (
                <div key={i} className="story-trails-award-item">
                  ✦ {award}
                </div>
              ))}
            </div>

            <p className="story-trails-meta">{PROJECT.metadataRow}</p>
          </div>

          <div className="story-trails-right">
            <div className="story-trails-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROJECT.image1}
                alt={PROJECT.image1Alt}
                className="story-trails-img"
              />
            </div>
            <div className="story-trails-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROJECT.image2}
                alt={PROJECT.image2Alt}
                className="story-trails-img"
              />
            </div>
            <div className="story-trails-video">
              <CloudflareVideo videoId={PROJECT.videoId} />
            </div>
          </div>
        </article>

        <div className="story-trails-back">
          <Link href={backHref}>{backLabel}</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
