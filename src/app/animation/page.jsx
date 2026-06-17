import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ANIMATION_GRID } from "@/data/animation";

export const metadata = {
  title: "Animation Composer — Giles Lamb",
  description:
    "Music for animation and children's television. CBeebies, Sky Kids, award-winning short films. Composer Giles Lamb.",
};

export default function AnimationPage() {
  return (
    <>
      <Nav />
      <main className="anim-landing">
        <section className="anim-standalone-hero">
          <Link href="/" className="anim-hero-name">Giles Lamb</Link>
          <span className="anim-hero-role">Composer</span>
          <Link href="https://www.gileslamb.com/" className="anim-hero-back">Full portfolio →</Link>
        </section>

        <section className="anim-landing-intro">
          <h1 className="anim-landing-heading">Animation &amp; Children&rsquo;s Television</h1>
          <div className="anim-landing-body">
            <p>
              Giles Lamb is a composer with three decades of practice across film,
              television and animation. His commissioned work in animation and
              children&rsquo;s television runs deep: series for CBeebies and Sky Kids,
              award-winning short films screened at festivals worldwide, music still
              reaching millions of listeners years after broadcast. BAFTA, RTS and
              Music+Sound awards.
            </p>
            <p>
              Increasingly that work runs in both directions. As well as scoring to
              picture, Giles develops animation from the music outward, where the score
              is not added at the end but is the starting point the film grows from.
              Distance to the Moon began that way, as musical sketches that became an
              award-winning stop-motion short, with Giles as composer and producer. He
              continues to develop music-led animation with Curious Dreamers and other
              collaborators.
            </p>
            <p>
              The discipline asks for something specific: melodic, emotionally direct,
              character-led. Some of the most rewarding work in the catalogue.
            </p>
          </div>
        </section>

        <section className="anim-landing-grid">
          <ul className="anim-grid-list">
            {ANIMATION_GRID.map((project, i) => (
              <li
                key={project.id}
                className={`anim-grid-item ${i % 2 === 0 ? "img-left" : "img-right"}`}
              >
                <Link href={project.href} className="anim-grid-link">
                  <div className="anim-grid-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="anim-grid-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="anim-grid-content">
                    <h3 className="anim-grid-title">{project.title}</h3>
                    <p className="anim-grid-client">{project.client}</p>
                    <p className="anim-grid-meta">
                      {[project.year, project.type].filter(Boolean).join(" · ")}
                    </p>
                    <p className="anim-grid-role">{project.role}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
