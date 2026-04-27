import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const HERO_IMAGE =
  "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/1943f336-31d4-4a82-0fee-c8f3015c9a00/public";

export const metadata = {
  title: "Organic AI — Giles Lamb",
  description:
    "How I use artificial intelligence without losing my mind, or my music. Essays on creativity, friction, and the act of making.",
};

export default function OrganicAIPage() {
  return (
    <>
      <Nav />

      <div className="article-hero">
        <img src={HERO_IMAGE} alt="Organic AI" className="article-hero-img" />
        <div className="article-hero-overlay" />
        <div className="article-hero-content">
          <h1 className="article-hero-title">Organic AI</h1>
          <p className="article-hero-subtitle">
            How I use artificial intelligence without losing my mind, or my music.
          </p>
        </div>
      </div>

      <main className="writing-article writing-article--has-hero">
        <article className="article-content">
          <div className="article-body">
            <p>I've been writing about this for a while without naming it.</p>

            <p>
              The essays gathered here circle the same set of questions. How do
              you work with these tools without being absorbed by them. Where
              does the human stay essential. What gets lost when the friction
              goes. What gets found when you stay with the difficulty.
            </p>

            <p>
              I call it Organic AI because the alternative, the framing I keep
              seeing everywhere, treats AI as a replacement layer. A way around
              the work. A shortcut past the part that's hard. That isn't how I
              use it, and I don't think it's how the artists I respect use it
              either. The tools are real. They're powerful. They're changing my
              practice in ways I couldn't have imagined a few years ago. But the
              work itself, the music, the listening, the slow attention to a
              system that's only ever semi-stable, that part hasn't been
              collapsed. If anything it's clearer than it's ever been.
            </p>

            <p>
              These pieces aren't a manifesto. They're a record of working it
              out in real time, from inside the practice. They contradict each
              other in places. They circle back. The thinking is still moving.
            </p>

            <p>
              Read them in any order. The three most recent build on each other
              directly and probably make the most sense as a sequence.
            </p>

            <hr />

            <h2>Start here</h2>

            <p>
              <Link href="/writing/the-distance-between-desire-and-making">
                The Distance Between Desire and Making
              </Link>{" "}
              — On creativity, irreducibility, and what we lose when AI closes
              the gap.
            </p>

            <p>
              <Link href="/writing/the-edge-of-control">
                The Edge of Control
              </Link>{" "}
              — On semi-stable systems, expressive instruments, and why friction
              is the point.
            </p>

            <p>
              <Link href="/writing/the-reinvention-loop">
                The Reinvention Loop
              </Link>{" "}
              — On creativity, control, and the quiet addiction of starting
              again.
            </p>

            <hr />

            <h2>How I actually use it</h2>

            <p>
              <Link href="/writing/the-sandpit-and-the-symphony">
                The Sandpit and the Symphony
              </Link>{" "}
              — How technology became my creative playground.
            </p>

            <p>
              <Link href="/writing/what-happened-when-i-let-ai-remix">
                What Happened When I Let AI Remix My Music
              </Link>{" "}
              — A simple prompt and my mind was blown.
            </p>

            <p>
              <Link href="/writing/when-the-machine-becomes-a-collaborator">
                When the Machine Becomes a Collaborator
              </Link>{" "}
              — AI music, ghost producers, and the thin line between authorship
              and abdication.
            </p>

            <p>
              <Link href="/writing/ai-is-the-air">AI Is the Air</Link> — On
              meaning, creation, and the quiet death of authorship.
            </p>

            <hr />

            <h2>Why the human still matters</h2>

            <p>
              <Link href="/writing/why-the-ai-edge-belongs-to-humans">
                Why the AI Edge Belongs to Humans
              </Link>
            </p>

            <p>
              <Link href="/writing/creativity-isnt-an-output">
                Creativity Isn't an Output
              </Link>{" "}
              — AI can't think, and that tells us something important about
              being human.
            </p>

            <p>
              <Link href="/writing/we-dont-need-ai-to-make-slop">
                We Don't Need AI to Make Slop
              </Link>{" "}
              — Notes on sound, culture, and the quiet return of something
              human.
            </p>

            <p>
              <Link href="/writing/the-creative-hunter">
                The Creative Hunter
              </Link>{" "}
              — and the AI conundrum.
            </p>

            <p>
              <Link href="/writing/the-art-of-attention">
                The Art of Attention
              </Link>{" "}
              — Reclaiming meaning in a world of infinite creation.
            </p>

            <p>
              <Link href="/writing/finishing-is-overrated">
                Finishing Is Overrated
              </Link>{" "}
              — Why the best work comes from staying in the mess, not rushing to
              the result.
            </p>

            <hr />

            <p>More to come. The thinking is ongoing.</p>
          </div>
        </article>

        <div className="writing-back">
          <Link href="/writing">← The Quiet Room</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
