"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import CloudflareVideo from "@/components/CloudflareVideo";

const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

const PROJECT = {
  id: "siren-servers",
  title: "Siren Servers",
  year: "2015",
  type: "VR INSTALLATION",
  tagline: "Sound design and composition for an immersive VR installation presented at Sonica, Glasgow.",
  description: `In the Victorian catacombs beneath Glasgow's Merchant City, visitors donned VR headsets and moved through a series of immersive digital environments. The space was mapped exactly. Reality and virtual reality occupied the same physical footprint, so movement through the room corresponded precisely to movement through the virtual world. The boundary between the two dissolved.

A collaboration between Giles Lamb, ISO Design, Numbercult and The Butler Brothers, drawing on backgrounds in 3D imaging, games design, neuroscience and sound.

The score presented an unusual challenge. VR was still in its early exploratory phase. Before crypto, before AI consumed the conversation, the rules were unwritten. A strong stereo soundtrack, it turned out, immediately broke the spell. The more music asserted itself, the less present the virtual environment felt. What worked was restraint: subtle scoring, real-world sound design woven into the environment, music that served immersion rather than announcing itself.`,
  awards: [
    "Presented at Sonica Festival, Glasgow",
    "Collaboration: Giles Lamb · ISO Design · Numbercult · The Butler Brothers",
  ],
  metadataRow: "COMPOSER · SOUND DESIGN  |  SONICA / ISO DESIGN  |  2015",
  image: `${CF}/c7ab2e8f-fd53-45d8-a626-1eb588589600/public`,
  imageAlt: "Siren Servers VR installation at Sonica",
  videoId: "eb4853855ef3336aed2237a728ee7b15",
};

export default function SirenServersPage() {
  return (
    <>
      <Nav />
      <main className="siren-servers-page">
        <article className="siren-servers-layout">
          <div className="siren-servers-left">
            <p className="siren-servers-type">{PROJECT.type} · {PROJECT.year}</p>
            <h1 className="siren-servers-title">{PROJECT.title}</h1>
            <p className="siren-servers-tagline">{PROJECT.tagline}</p>

            <div className="siren-servers-description">
              {PROJECT.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="siren-servers-awards">
              {PROJECT.awards.map((award, i) => (
                <div key={i} className="siren-servers-award-item">
                  ✦ {award}
                </div>
              ))}
            </div>

            <p className="siren-servers-meta">{PROJECT.metadataRow}</p>
          </div>

          <div className="siren-servers-right">
            <div className="siren-servers-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROJECT.image}
                alt={PROJECT.imageAlt}
                className="siren-servers-img"
              />
            </div>
            <div className="siren-servers-video">
              <CloudflareVideo videoId={PROJECT.videoId} />
            </div>
          </div>
        </article>

        <div className="siren-servers-back">
          <Link href="/#work">← Back to Selected Work</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
