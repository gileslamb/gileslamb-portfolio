"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import CloudflareVideo from "@/components/CloudflareVideo";
import { JsonLd } from "@/components/JsonLd";
import { buildFableLegendsSchema } from "@/lib/schema/works";
import { buildWorkBreadcrumb } from "@/lib/schema/helpers";

const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

const PROJECT = {
  id: "fable-legends",
  title: "Fable Legends",
  year: "2013",
  type: "GAME TRAILER",
  client: "Lionhead Studios / Microsoft",
  tagline: "Announcement trailer for Lionhead's final Fable game. Directed by Ben Hibon. Premiered at Gamescom 2013.",
  description: `Fable Legends was set 400 years before the original game. Four heroes, one villain, the world of Albion before it became familiar. A prequel in spirit as much as in timeline. Lionhead spent three years making it. Microsoft cancelled it in March 2016 without releasing it, closing the studio at the same time. One of the most expensive cancelled games ever made.

The trailer was directed by Ben Hibon at Axis Animation in Glasgow. A director known for the animated sequences in Harry Potter and the Deathly Hallows. The brief was to build a world from a travelling theatre: a village show, small and playful, that slowly reveals something darker. The music had to make that journey. It starts in a kind of miniature medieval comedy: street performers, pop-up scenery, a lightness of touch. Then the monsters arrive. Then the villain steps forward, and the register shifts completely.

Michael Gambon voiced the villain. The trailer premiered at Gamescom 2013 and introduced a game that was never released.

Giles Lamb composed the score. Sound design and mix by Savalas, the Glasgow-based sound post company he co-founded.`,
  awards: [
    "Director: Ben Hibon / Axis Animation, Glasgow",
    "Narrator: Michael Gambon (as the Villain)",
    "Client: Lionhead Studios / Microsoft Studios",
    "Composer: Giles Lamb",
    "Sound Design & Mix: Savalas",
    "Premiered: Gamescom, Cologne, August 2013",
    "Game cancelled: March 2016. Lionhead Studios closed.",
  ],
  metadataRow: "COMPOSER  |  SOUND DESIGN & MIX: SAVALAS  |  LIONHEAD / MICROSOFT  |  2013",
  image: `${CF}/198cfe11-01bf-43f9-dece-34662a41bd00/public`,
  imageAlt: "Fable Legends, announcement trailer, 2013",
  videoId: "2205e8d188c4296799cc8d41d1fd460f",
};

export default function FableLegendsPage() {
  return (
    <>
      <JsonLd schema={[...buildFableLegendsSchema(), buildWorkBreadcrumb("Fable Legends", "fable-legends")]} />
      <Nav />
      <main className="fable-legends-page">
        <article className="fable-legends-layout">
          <div className="fable-legends-left">
            <p className="fable-legends-type">{PROJECT.type} · {PROJECT.year}</p>
            <h1 className="fable-legends-title">{PROJECT.title}</h1>
            <p className="fable-legends-tagline">{PROJECT.tagline}</p>

            <div className="fable-legends-description">
              {PROJECT.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="fable-legends-awards">
              {PROJECT.awards.map((award, i) => (
                <div key={i} className="fable-legends-award-item">
                  ✦ {award}
                </div>
              ))}
            </div>

            <p className="fable-legends-meta">{PROJECT.metadataRow}</p>
          </div>

          <div className="fable-legends-right">
            <div className="fable-legends-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROJECT.image}
                alt={PROJECT.imageAlt}
                className="fable-legends-img"
              />
            </div>
            <div className="fable-legends-video">
              <CloudflareVideo videoId={PROJECT.videoId} />
            </div>
          </div>
        </article>

        <div className="fable-legends-back">
          <Link href="/#work">← Back to Selected Work</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
