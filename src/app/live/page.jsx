import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TicketAlertForm } from "./TicketAlertForm";

/* Eventbrite link for the 4 Dec premiere. While empty, the button shows
   "Tickets coming soon" and is disabled; set it and the button goes live. */
const TICKETS_URL = "";

/* Kit tag applied to ticket-alert signups (allowlisted in /api/list). */
const TICKET_ALERT_TAG = "urlar-hot-2026";

/* Poster image: TouchDesigner scan visuals, the three-screen audience clip
   from /urlar/host. URLAR_FRAME picks the second. Stream thumbnails are not a next/image remote
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
        {/* ===== Forthcoming performances: gig poster ===== */}
        <h1 className="gig-heading">Forthcoming performances</h1>

        <article className="gig-poster" aria-labelledby="gig-urlar-title">
          <div className="gig-poster-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={URLAR_STILL}
              alt="Ùrlar: point-cloud scan visuals projected across three screens"
              className="gig-poster-img"
            />
          </div>

          <div className="gig-poster-body">
            <div className="gig-poster-type">
              <h2 id="gig-urlar-title" className="gig-poster-title">Ùrlar</h2>
              <p className="gig-poster-date">
                <time dateTime="2026-12-04">Friday 4 December 2026</time>
              </p>
              <p className="gig-poster-venue">House of Toad, Glasgow</p>
              <p className="gig-poster-note">Limited spaces</p>
            </div>

            <div className="gig-poster-actions">
              {TICKETS_URL ? (
                <a
                  href={TICKETS_URL}
                  className="gig-tickets"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tickets
                </a>
              ) : (
                <button type="button" className="gig-tickets" disabled>
                  Tickets coming soon
                </button>
              )}
              <TicketAlertForm tag={TICKET_ALERT_TAG} />
              <Link href="/urlar/host" className="gig-poster-about">
                About Ùrlar &rarr;
              </Link>
            </div>
          </div>
        </article>

        <p className="gig-more">More dates from January 2027.</p>

        {/* ===== Ùrlar ===== */}
        <section className="live-page-text live-page-section-ruled">
          <h2 className="live-headline live-page-feature-title">Ùrlar</h2>
          <p className="live-body">
            Ùrlar is the ground in pibroch, the theme everything returns to. An
            hour of live piano and synthesis, with spatial sound and projection
            across three screens. The room is dark; people sit or lie down.
          </p>
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
