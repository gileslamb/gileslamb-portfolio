import Link from "next/link";

/* Three-screen audience view from the /urlar/host hero clip, frame at 65s.
   Cloudflare Stream is not a next/image remote host, so this is a plain img,
   the same pattern /live and /urlar/host use. */
const STREAM = "https://customer-3aa0vwfgpylhsylu.cloudflarestream.com";
const URLAR_STILL = `${STREAM}/ca96b876b35b1a3278d9f15770b6972f/thumbnails/thumbnail.jpg?time=65s&height=1080`;

export function LivePractice() {
  return (
    <section className="live-bridge" id="live">
      <div className="live-bridge-inner">
        <div className="live-text">
          <p className="live-eyebrow reveal">Live</p>
          <h2 className="live-headline reveal reveal-delay-1">Ùrlar</h2>
          <p className="live-body reveal reveal-delay-2">
            Ùrlar is the ground in pibroch, the theme everything returns to. A live
            piece for piano, synthesis, projection and spatial sound.
          </p>
          <p className="live-body reveal reveal-delay-2">
            Premiere Friday 4 December, House of Toad, Glasgow.
          </p>
          <Link href="/live" className="live-text-cta reveal reveal-delay-2">
            Live &rarr;
          </Link>
          <Link href="/urlar" className="live-text-cta reveal reveal-delay-2">
            About Ùrlar &rarr;
          </Link>
        </div>
        <div className="live-featured-link reveal reveal-delay-2">
          <div className="live-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={URLAR_STILL}
              alt="Ùrlar: projection across three screens, seen from the audience"
              className="live-featured-image live-featured-image-plain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
