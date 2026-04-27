import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import CloudflareVideo from "@/components/CloudflareVideo";
import { JsonLd } from "@/components/JsonLd";
import { buildDeadIslandSchema, buildWorkItemList } from "@/lib/schema/works";
import { buildWorkBreadcrumb } from "@/lib/schema/helpers";

export default function DeadIslandPage() {
  return (
    <>
      <JsonLd schema={[...buildDeadIslandSchema(), buildWorkBreadcrumb("Dead Island", "dead-island")]} />
      <Nav />
      <main className="case-study">
        <article className="case-study-content">
          <div className="case-study-hero-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/dead-island-cover.png/public"
              alt="Dead Island trailer"
            />
          </div>
          <header className="case-study-header">
            <p className="case-study-label">2011 · GAME TRAILER</p>
            <h1 className="case-study-title">Dead Island</h1>
            <p className="case-study-strapline">
              The score that changed everything.
            </p>
          </header>

          <div className="case-study-body">
            <p className="case-study-intro">
              In 2011, Axis Animation came to me with an unusual brief. The
              trailer was for a zombie first-person shooter. But what
              they&apos;d created wasn&apos;t a conventional game trailer. It was
              a slow-motion, reverse-chronology ballet of a family being torn
              apart. Gruesome, yes. But rendered with a strange, aching poetry.
            </p>
            <p className="case-study-intro">
              They didn&apos;t want metal. They didn&apos;t want horror stings.
              They wanted something that would sit <em>against</em> that:
              something beautiful and mournful that would make the violence land
              harder precisely because the music refused to flinch.
            </p>

            <h2 className="case-study-heading">The Approach</h2>
            <p>
              I started at the piano. Against a rough animatic of the
              reverse-motion sequence, I improvised a simple theme. Spare,
              melancholy, built more from space than notes. The kind of melody
              that feels like it&apos;s already half a memory. Strings came in
              later, layered carefully to deepen the emotional weight without
              pushing too hard.
            </p>
            <p>
              The idea was juxtaposition as a compositional strategy. Where the
              image goes dark, the music stays luminous. The tension comes not
              from musical drama but from the gap between what you&apos;re
              hearing and what you&apos;re seeing.
            </p>
            <p>
              We slowed the theme down slightly. The edit tightened around it.
              Something clicked.
            </p>

            <h2 className="case-study-heading">The Result</h2>
            <p>
              The trailer was released on 16 February 2011. Nobody expected what
              happened next.
            </p>
            <p>
              Within a week, over a million people had watched it on YouTube.
              Ten times Deep Silver&apos;s own projections. It swept round the
              world press in days. Dead Island became one of the most searched
              terms on Google, YouTube, and Twitter simultaneously. A game that had
              gone dark for four years, widely assumed cancelled, had become one
              of the most talked-about titles of the year. Through three
              minutes of music and image, before a single second of gameplay had
              been shown.
            </p>
            <p>
              The score won a Cannes Lions Gold in 2011. The trailer is still
              cited as one of the best game trailers ever made. The music
              continues to circulate on Spotify more than a decade later.
            </p>
            <p>
              It&apos;s a rare example of tone doing real strategic work. Not
              illustrating the game, but reframing it. The result elevated Dead
              Island from mid-tier release to AAA-level cultural event. And it
              put my name on the map.
            </p>

            <h2 className="case-study-heading">10th Anniversary</h2>
            <p>
              In 2021, I returned to the piece with the Scottish Session
              Orchestra. A full orchestral recording that finally gave the
              composition the space it had always been reaching for. The
              original combined live and virtual instruments out of necessity.
              The anniversary version removed the compromise. What was always in
              the writing could finally breathe.
            </p>

            <div className="case-study-video">
              <CloudflareVideo videoId="4d2a685b8db894160368a1a592e5604e" />
            </div>

            <div className="case-study-awards">
              <div className="award-item">
                ★ Cannes Lions Gold, Best Internet Film, 2011
              </div>
              <div className="award-item">★ Music+Sound Award</div>
            </div>

            <div className="case-study-stats">
              <div className="stat-item">1,000,000+ YouTube views in 7 days</div>
              <div className="stat-item">15,000,000+ total views</div>
              <div className="stat-item">Still streaming, 14 years later</div>
            </div>

            <p className="case-study-closing">
              Being different doesn&apos;t just get noticed. Sometimes it changes
              what&apos;s possible.
            </p>
          </div>
        </article>

        <div className="case-study-back">
          <Link href="/#work">← Back to Selected Work</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
