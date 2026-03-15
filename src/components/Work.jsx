import Link from "next/link";
import { FURTHER_WORK_PROJECTS } from "@/data/projects";

const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

const CASE_STUDIES = [
  {
    id: "distance-to-the-moon",
    href: "/work/distance-to-the-moon",
    year: "2025",
    type: "SHORT FILM · STOP-MOTION ANIMATION",
    title: "Distance to the Moon",
    tagline: "Music and image built simultaneously. Neither serving the other.",
    description: [
      "The starting point was Calvino. Cosmicomics — stories where science becomes memory. In a stark future where Earth lies desolate, its sole remaining inhabitant undertakes a surreal ascent to the Moon.",
      "Stop-motion animation inspired by Metropolis, Hitchcock, Calvino. Distance to the Moon began as musical sketches — a surrealist opera that never quite became one. Music and image built together from the start, each shaping the other.",
    ],
    awards: [
      "Distinction Award (Short Competition) — Athens Animfest",
      "Music Award — Athens Animfest",
      "Best Soundtrack — Animaze",
    ],
    meta: { role: "Composer · Producer", client: "Curious Dreamers / Eyebols", medium: "Original Score" },
    coverImage: `${CF}/dttm--high-res-stills-dttm-picture-lock-v06_01_01_19_12.jpg/public`,
    coverAlt: "Distance to the Moon",
  },
  {
    id: "holy-hell",
    href: "/work/holy-hell",
    year: "2016",
    type: "FEATURE DOCUMENTARY",
    title: "Holy Hell",
    tagline: "A cult leader's two decades captured on film. Sundance, CNN Films, Netflix.",
    description: [
      "Will Allen had recently left a cult he had been part of for more than 20 years and pieced together all the footage to make the film. The rough edit was poignant, almost dreamlike.",
      "The first two thirds are joyous and euphoric. In the third act there is a sharp turn. I used live cello, piano, guitar and ambient pads. As the truth reveals itself the melancholy dominates and something sinister creeps in.",
    ],
    awards: [
      "Sundance Film Festival — US Documentary Competition",
      "Documentary Critics Choice Award",
    ],
    meta: { role: "Composer", client: "CNN Films / Netflix", director: "Will Allen" },
    coverImage: `${CF}/14535be8-678b-404a-60d3-71cb2c887300/public`,
    coverAlt: "Holy Hell — 2016 film poster",
  },
  {
    id: "dead-island",
    href: "/work/dead-island",
    year: "2011",
    type: "GAME TRAILER",
    title: "Dead Island",
    tagline: "The score that changed everything.",
    description: [
      "A slow-motion, reverse-chronology ballet of a family being torn apart. They didn't want metal or horror stings. They wanted something beautiful and mournful that would make the violence land harder.",
      "I started at the piano. Spare, melancholy, built more from space than notes. Juxtaposition as a compositional strategy. The trailer swept round the world press in days. Cannes Lions Gold.",
    ],
    awards: [
      "Cannes Lions Gold, Best Internet Film",
      "Music+Sound Award",
    ],
    meta: { role: "Composer · Producer", client: "Deep Silver", medium: "Orchestral · Electronic" },
    coverImage: `${CF}/dead-island-cover.png/public`,
    coverAlt: "Dead Island trailer",
  },
];

export function Work() {
  return (
    <section className="work" id="work">
      <div className="work-intro">
        <div>
          <p className="section-label reveal">Selected Work</p>
          <h2 className="work-intro-headline reveal reveal-delay-1">
            Not a credits list.<br />
            <em>each project explored</em>
            <br />
            in depth
          </h2>
        </div>
        <p className="work-intro-note reveal reveal-delay-2">
          Process, context, decisions. The brief, the material, what the work
          became. A small number of projects, chosen because they represent
          something, not everything.
        </p>
      </div>

      {/* TIER 1: Three full case studies */}
      <div className="work-tier1">
        {CASE_STUDIES.map((study) => (
          <Link key={study.id} href={study.href} className="work-case-study reveal">
            <hr className="work-case-rule" />
            <div className="work-case-inner">
              <div className="work-case-left">
                <div className="work-case-tags">
                  <span className="work-case-year">{study.year}</span>
                  <span className="work-case-type">{study.type}</span>
                </div>
                <h3 className="work-case-title">{study.title}</h3>
                <p className="work-case-tagline">{study.tagline}</p>
                <div className="work-case-description">
                  {study.description.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <div className="work-case-awards">
                  {study.awards.map((award, i) => (
                    <div key={i} className="work-case-award">✦ {award}</div>
                  ))}
                </div>
                <div className="work-case-meta">
                  <span>{study.meta.role}</span>
                  {study.meta.client && <span>{study.meta.client}</span>}
                  {study.meta.director && <span>Director: {study.meta.director}</span>}
                  {study.meta.medium && <span>{study.meta.medium}</span>}
                </div>
                <span className="work-case-arrow">↗</span>
              </div>
              <div className="work-case-right">
                <div className="work-case-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={study.coverImage} alt={study.coverAlt} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* TIER 2: Further Selected Work */}
      <div className="work-tier2 reveal">
        <h3 className="work-tier2-title">Further Selected Work</h3>
        <p className="work-tier2-subtitle">Additional credits from 30 years of practice.</p>
        <ul className="work-further-grid">
          {FURTHER_WORK_PROJECTS.map((project, i) => (
            <li key={project.id} className={`work-further-item ${i % 2 === 0 ? "img-left" : "img-right"}`}>
              <Link href={project.href || "#"} className="work-further-link">
                <div className="work-further-image">
                  <img src={project.image} alt={project.title} className="work-further-img-primary" />
                  {project.image2 && (
                    <img src={project.image2} alt="" className="work-further-img-secondary" aria-hidden />
                  )}
                </div>
                <div className="work-further-content">
                  <h4 className="work-further-title">{project.title}</h4>
                  {project.metadataRow ? (
                    <p className="work-further-meta work-further-metadata-row">{project.metadataRow}</p>
                  ) : (
                    <>
                      <p className="work-further-client">{project.client}</p>
                      <p className="work-further-meta">
                        {[project.year, project.type].filter(Boolean).join(" · ") || "\u00A0"}
                      </p>
                      <p className="work-further-role">{project.role}</p>
                    </>
                  )}
                  {project.description && (
                    <p className="work-further-description">{project.description}</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
