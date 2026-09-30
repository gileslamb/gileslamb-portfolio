import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Link from "next/link";

/* Ùrlar copy and imagery are sourced from the Ùrlar pages (/urlar, /urlar/host). */

const URLAR_STILL =
  "https://customer-3aa0vwfgpylhsylu.cloudflarestream.com/68eeb46ea059449e3660d0f785f8367f/thumbnails/thumbnail.jpg?time=8s&height=720";

export const metadata = {
  title: "Live — Giles Lamb",
  description:
    "Unstable Systems is the live performance practice. Ùrlar is the deep-listening performance it makes — piano and modular synthesis in a quadraphonic field of sound and slow light.",
};

export default function LivePage() {
  return (
    <>
      <Nav />
      <main className="live-page">
        <div className="live-page-intro">
          <p className="section-label">Live</p>
          <p className="live-page-tagline">
            Music made in one pass, in the room, with the audience in it.
          </p>
        </div>

        {/* ===== The method ===== */}
        <section className="live-page-section">
          <h2 className="live-page-strand-label">The method</h2>
          <h3 className="live-headline">Unstable Systems</h3>
          <p className="live-body">
            Unstable Systems is Giles Lamb&rsquo;s live performance practice: music made
            in one pass, in the moment, played at the point where a part-stable,
            part-unpredictable system is about to fall apart. Nothing is decided in
            advance and nothing is fixed afterward. It is the wrangle between human and
            machine, human expression encoded in the act of shaping what comes out. The
            opposite of generative polish: musicality and intention, played live in a room.
          </p>
          <p className="live-body">
            The live recordings are released as they accumulate. Orbital Fifths, roughly
            forty minutes played in a single take, is the first.
          </p>
          <Link href="/releases" className="live-text-cta">
            Releases &rarr;
          </Link>
        </section>

        {/* ===== The event ===== */}
        <section className="live-page-section live-page-section-ruled">
          <h2 className="live-page-strand-label">The event</h2>

          <div className="live-page-urlar">
            <div className="live-page-urlar-text">
              <h3 className="live-headline live-page-urlar-title">Ùrlar</h3>
              <p className="live-page-pronounce">/ˈuːr-lər/ · OOR-lar</p>
              <p className="live-page-gloss">
                Scottish Gaelic — <em>ground</em>; the foundational theme of a pibroch,
                from which every variation departs and to which it returns.
              </p>

              <p className="live-body">
                A deep-listening performance: piano and modular synthesis in a
                quadraphonic spatial sound field, with slow projected light on scrim and
                the surfaces of the room itself. The audience sit, or lie down.
              </p>
              <p className="live-body">
                It is not a concert, and not an ambient background set. Contemplative, not
                audio-reactive.
              </p>
              <p className="live-body">
                Ùrlar is the event. Unstable Systems is the method underneath it.
              </p>

              <blockquote className="live-page-quote">
                &ldquo;To listen is to open to the possibility of change.&rdquo;
                <cite className="live-page-quote-cite">Pauline Oliveros</cite>
              </blockquote>

              <div className="live-coming-soon">
                <p className="live-coming-soon-label">Premiere</p>
                <p className="live-coming-soon-sub">
                  Friday 4 December 2026, House of Toad, Park Circus, Glasgow.
                </p>
              </div>
              <Link href="/urlar/host" className="live-text-cta">
                About Ùrlar &rarr;
              </Link>

              <p className="live-page-enquiry">
                Programmers and venues — enquiries welcome.
              </p>
              <Link href="/#contact" className="live-text-cta">
                Get in touch &rarr;
              </Link>
            </div>

            <div className="live-page-urlar-visual">
              {/* Cloudflare Stream still — not an allowed next/image remote host,
                  same plain-img pattern used by the Ùrlar and releases pages */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URLAR_STILL}
                alt="Ùrlar — piano and modular synthesis in projected light"
                className="live-page-urlar-img"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
