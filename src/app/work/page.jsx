import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { RevealObserver } from "@/components/RevealObserver";
import { JsonLd } from "@/components/JsonLd";
import { IMMERSIVE_GRID } from "@/data/immersive";
import { ANIMATION_GRID } from "@/data/animation";
import { FILM_TV_GAMES } from "@/data/projects";
import { buildSectionBreadcrumb } from "@/lib/schema/helpers";

export const metadata = {
  title: "Work · Giles Lamb",
  description:
    "Installation and museum, film, television and games, animation and live work by composer and sound artist Giles Lamb.",
};

const LIVE_CARD = {
  id: "live",
  title: "Ùrlar and Unstable Systems",
  client: "Live",
  type: "Piano · Synthesis · Projection · Spatial Sound",
  role: "Premiere 4 December 2026, House of Toad, Glasgow",
  image:
    "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/8cd73992-0209-4125-16d2-5a81f67fb200/public",
  href: "/live",
};

const SECTIONS = [
  {
    id: "installation-museum",
    title: "Installation & Museum",
    items: IMMERSIVE_GRID,
    more: { href: "/immersive", label: "Installation & Museum" },
  },
  {
    id: "film-tv-games",
    title: "Film, TV & Games",
    items: FILM_TV_GAMES,
  },
  {
    id: "animation",
    title: "Animation",
    items: ANIMATION_GRID,
    more: { href: "/animation", label: "Animation" },
  },
  {
    id: "live",
    title: "Live",
    items: [LIVE_CARD],
    more: { href: "/live", label: "Live" },
  },
];

function WorkCard({ project, index }) {
  return (
    <li className={`work-further-item ${index % 2 === 0 ? "img-left" : "img-right"}`}>
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
            {[project.year, project.type].filter(Boolean).join(" · ") || " "}
          </p>
          <p className="work-further-role">{project.role}</p>
        </div>
      </Link>
    </li>
  );
}

export default function WorkPage() {
  return (
    <>
      <JsonLd schema={buildSectionBreadcrumb("Work", "work")} />
      <RevealObserver />
      <Nav />
      <main className="immersive-landing work-index">
        <section className="immersive-landing-intro">
          <p className="section-label reveal">Work</p>
          <div className="work-index-jump reveal reveal-delay-1">
            {SECTIONS.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </div>
        </section>

        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="work-tier2 work-index-section reveal"
          >
            <div className="work-index-head">
              <h2 className="work-tier2-title">{section.title}</h2>
              {section.more && (
                <Link href={section.more.href} className="work-index-more">
                  {section.more.label} &rarr;
                </Link>
              )}
            </div>
            <ul className="work-further-grid work-index-grid">
              {section.items.map((project, i) => (
                <WorkCard key={project.id} project={project} index={i} />
              ))}
            </ul>
          </section>
        ))}

        <Contact />
      </main>
      <Footer />
    </>
  );
}
