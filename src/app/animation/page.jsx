import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ANIMATION_GRID } from "@/data/animation";

export const metadata = {
  title: "Animation & Kids' — Giles Lamb",
  description:
    "Music for animation and children's television. CBeebies, Sky Kids, award-winning short films. Composer Giles Lamb.",
};

export default function AnimationPage() {
  return (
    <>
      <Nav />
      <main className="anim-landing">
        <section className="anim-landing-intro">
          <p className="section-label">Animation &amp; Kids&rsquo;</p>
          <div className="anim-landing-body">
            <p>
              Alongside the experimental and cinematic work, a long thread of
              my career has been writing music for animation and children&rsquo;s
              television. From CBeebies favourites still played daily on YouTube
              a decade after broadcast, to multi-award-winning short films
              screened at festivals worldwide, this work has reached millions of
              listeners — often the youngest ones.
            </p>
            <p>
              It asks for a different kind of writing: melodic, emotionally
              direct, character-led. It&rsquo;s some of the most rewarding
              work I do.
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
