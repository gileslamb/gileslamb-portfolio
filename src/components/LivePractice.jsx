import Image from "next/image";
import Link from "next/link";

const FEATURED_IMAGE =
  "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/8cd73992-0209-4125-16d2-5a81f67fb200/public";

export function LivePractice() {
  return (
    <section className="live-bridge" id="live">
      <div className="live-bridge-inner">
        <div className="live-text">
          <p className="live-eyebrow reveal">Live Practice</p>
          <h2 className="live-headline reveal reveal-delay-1">
            Unstable Systems
          </h2>
          <p className="live-body reveal reveal-delay-2">
            Unstable Systems is Giles Lamb&rsquo;s live performance practice: music made in one
            pass, in the moment, played at the point where a part-stable, part-unpredictable
            system is about to fall apart. Nothing is decided in advance and nothing is fixed
            afterward. It is the wrangle between human and machine, human expression encoded
            in the act of shaping what comes out. The opposite of generative polish:
            musicality and intention, played live in a room.
          </p>
          <p className="live-body reveal reveal-delay-2">
            The first public preview, in June 2026, confirmed what the practice is for. The
            audience completes it. These are works that exist to connect in the moment,
            cinematic and strongly visual, built from modular synthesis, the Osmose, neural
            voice processing and felt piano.
          </p>
          <p className="live-body reveal reveal-delay-2">
            The live recordings are released as they accumulate. Orbital Fifths, roughly
            forty minutes played in a single take, is the first.
          </p>
          <Link href="/releases" className="live-text-cta reveal reveal-delay-2">
            Releases &rarr;
          </Link>
        </div>
        <div className="live-featured-link reveal reveal-delay-2">
          <div className="live-visual">
            <Image
              src={FEATURED_IMAGE}
              alt="Giles Lamb performing live — Unstable Systems"
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="live-featured-image"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
