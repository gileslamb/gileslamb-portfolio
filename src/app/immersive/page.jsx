import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { RevealObserver } from "@/components/RevealObserver";
import { IMMERSIVE_GRID } from "@/data/immersive";
import { JsonLd } from "@/components/JsonLd";
import { buildSectionBreadcrumb } from "@/lib/schema/helpers";

export default function ImmersivePage() {
  return (
    <>
      <JsonLd schema={buildSectionBreadcrumb("Installation & Museum", "immersive")} />
      <RevealObserver />
      <Nav />
      <main className="immersive-landing">
        <section className="immersive-landing-intro">
          <p className="section-label reveal">Installation &amp; Museum</p>
          <div className="immersive-landing-body reveal reveal-delay-1">
            <p>
              Giles Lamb is a composer and sound artist with thirty years of
              practice across film, television, games, theatre and museum
              installation. His work has won a BAFTA, Cannes Lions Gold and an RTS
              Award, among others.
            </p>
            <p>
              He works at the intersection of music, narrative and space. Score
              and sound design are composed together from the start as a single
              act, built around what a room, a sequence or a moment actually
              needs emotionally and dynamically. Alone or with collaborators, he
              holds the creative vision from first brief to final mix,
              crafting music and sound as one continuous piece.
            </p>
            <p>
              He has scored everything from Nicolas Winding Refn features to
              national museum commissions across three continents. He has
              taught at the Royal Conservatoire of Scotland, Glasgow School of
              Art and the National Film and Television School, and has written
              and spoken extensively on sound, narrative and the psychology of
              listening.
            </p>
            <p>
              The aim is always the same: sound that deepens what visitors feel,
              shapes how they move through a space, and extends how long they
              carry the experience after they leave.
            </p>
            <p className="immersive-reel-cta reveal reveal-delay-2">
              <Link href="/reels/museum-reel" className="immersive-reel-link">
                Listen: Installation &amp; Museum Reel →
              </Link>
            </p>
          </div>
        </section>

        <section className="work-tier2 immersive-landing-grid reveal reveal-delay-2">
          <ul className="work-further-grid">
            {IMMERSIVE_GRID.map((project, i) => (
              <li
                key={project.id}
                className={`work-further-item ${i % 2 === 0 ? "img-left" : "img-right"}`}
              >
                <Link href={project.href} className="work-further-link">
                  <div className="work-further-image">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      className="work-further-img-primary"
                      loading="lazy"
                    />
                  </div>
                  <div className="work-further-content">
                    <h3 className="work-further-title">{project.title}</h3>
                    <p className="work-further-client">{project.client}</p>
                    <p className="work-further-meta">
                      {[project.year, project.type]
                        .filter(Boolean)
                        .join(" · ") || "\u00A0"}
                    </p>
                    <p className="work-further-role">{project.role}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
