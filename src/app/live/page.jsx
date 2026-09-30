import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

/* Upcoming dates: one entry per performance, soonest first. */
const DATES = [
  {
    work: "Ùrlar",
    date: "Fri 4 December 2026",
    dateTime: "2026-12-04",
    venue: "House of Toad, Glasgow",
    href: "/urlar/host",
  },
];

/* TouchDesigner scan visuals: the three-screen audience clip from /urlar/host.
   URLAR_FRAME picks the second. Stream thumbnails are not a next/image remote
   host, so this is a plain img. */
const STREAM = "https://customer-3aa0vwfgpylhsylu.cloudflarestream.com";
const URLAR_FRAME = 65;
const URLAR_STILL = `${STREAM}/ca96b876b35b1a3278d9f15770b6972f/thumbnails/thumbnail.jpg?time=${URLAR_FRAME}s&height=1080`;

/* Black-and-white photo of Giles playing (formerly the homepage live image). */
const PLAYING_PHOTO =
  "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/8cd73992-0209-4125-16d2-5a81f67fb200/public";

export const metadata = {
  title: "Live · Giles Lamb",
  description:
    "Upcoming live dates. Ùrlar premieres Friday 4 December 2026 at House of Toad, Glasgow: live piano and synthesis with spatial sound and projection across three screens.",
};

export default function LivePage() {
  return (
    <>
      <Nav />
      <main className="live-page">
        <div className="live-page-intro">
          <p className="section-label">Live</p>
          <h1 className="live-page-heading">Where and when to see me play.</h1>
        </div>

        {/* ===== Upcoming dates ===== */}
        <section className="live-dates" aria-labelledby="live-dates-title">
          <h2 id="live-dates-title" className="live-dates-title">
            Upcoming dates
          </h2>
          <ul className="live-dates-list">
            {DATES.map((d) => (
              <li key={`${d.work}-${d.dateTime}`} className="live-dates-row">
                <span className="live-dates-work">{d.work}</span>
                <time className="live-dates-date" dateTime={d.dateTime}>
                  {d.date}
                </time>
                <span className="live-dates-venue">{d.venue}</span>
                <Link href={d.href} className="live-dates-button">
                  Details &rarr;
                </Link>
              </li>
            ))}
          </ul>
          <p className="live-dates-foot">
            More dates from January 2027. Programmers and venues,{" "}
            <Link href="/#contact">get in touch</Link>.
          </p>
        </section>

        {/* ===== Ùrlar ===== */}
        <section className="live-page-feature">
          <div className="live-page-feature-text">
            <h2 className="live-headline live-page-feature-title">Ùrlar</h2>
            <p className="live-body">
              Ùrlar is the ground in pibroch, the theme everything returns to. An
              hour of live piano and synthesis, with spatial sound and projection
              across three screens. The room is dark; people sit or lie down.
            </p>
            <Link href="/urlar/host" className="live-text-cta">
              About Ùrlar &rarr;
            </Link>
          </div>
          <div className="live-page-feature-visual live-page-feature-visual-wide">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={URLAR_STILL}
              alt="Ùrlar: point-cloud scan visuals projected across three screens"
              className="live-page-feature-img"
              loading="lazy"
            />
          </div>
        </section>

        {/* ===== The method ===== */}
        <section className="live-page-feature live-page-feature-flip live-page-section-ruled">
          <div className="live-page-feature-text">
            <h2 className="live-page-strand-label">The method</h2>
            <h3 className="live-headline live-page-feature-title">Unstable Systems</h3>
            <p className="live-body">
              Music made in one pass, in the moment, at the point where a
              part-stable, part-unpredictable system is about to fall apart. The
              live recordings are released as they accumulate. Orbital Fifths, forty
              minutes in a single take, is the first.
            </p>
            <Link href="/releases" className="live-text-cta">
              Releases &rarr;
            </Link>
          </div>
          <div className="live-page-feature-visual">
            <Image
              src={PLAYING_PHOTO}
              alt="Giles Lamb playing live at the keyboard, black and white"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              className="live-page-feature-img"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
