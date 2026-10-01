import { CLOUD } from "./hero";
import { BookTickets, SANS, SERIF, label } from "./ui";

/* The opening of both Ùrlar pages, built from the poster: a full viewport of
   black, the cloud large in the upper part, the type in the lower third. The
   film follows directly (see ./HeroVideo); the hero's bottom padding is kept
   small so its black runs straight into the film's top gradient and the two
   read as one opening sequence.

   `below` is what sits under the tagline: <PremiereLine /> on its own on the
   venue page, or with <BookTickets /> on the public page. */

export function PremiereLine() {
  return (
    <p style={{ ...label, fontSize: "calc(var(--u) * 0.62)", letterSpacing: "0.2em", lineHeight: 1.9, color: "var(--warm)", margin: "calc(var(--u) * 2.25) 0 0" }}>
      <span style={{ color: "var(--accent)" }}>Premiere</span> · Friday 4 December 2026 · House of Toad, Glasgow
    </p>
  );
}

/* The premiere line with Book tickets under it. */
export function PremiereTickets() {
  return (
    <>
      <PremiereLine />
      <BookTickets style={{ marginTop: "calc(var(--u) * 1.25)" }} />
    </>
  );
}

export default function UrlarHero({ below }: { below: React.ReactNode }) {
  return (
    <header className="uh-top">
      <style>{`
        /* --ch is the cloud image height: big on tall screens, held by the
           width on narrow ones so the cloud stays in frame. The top offset
           puts the cloud's own top edge (29% down the image) at 7svh.
           Isolated so the screen blend only sees the black. */
        .uh-top { position:relative; isolation:isolate; overflow:hidden; background:var(--black);
          min-height:100vh; min-height:100svh; display:flex; flex-direction:column; justify-content:flex-end;
          --ch:min(112vh, 152vw); --ch:min(112svh, 152vw); }
        .uh-cloud { position:absolute; left:50%; top:calc(7svh - var(--ch) * 0.29);
          height:var(--ch); width:auto; max-width:none; transform:translateX(-50%);
          mix-blend-mode:screen; pointer-events:none; user-select:none;
          animation:uh-breathe 28s ease-in-out infinite; }
        @keyframes uh-breathe {
          0%, 100% { transform:translateX(-50%) scale(1); opacity:.9; }
          50% { transform:translateX(-50%) translateY(-1.2%) scale(1.035); opacity:1; }
        }
        @media (prefers-reduced-motion: reduce) { .uh-cloud { animation:none; } }
        @media (min-width:640px){ .uh-cloud { left:55%; } }
      `}</style>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="uh-cloud" src={CLOUD} alt="" aria-hidden="true" width={960} height={1080} fetchPriority="high" />

      <div
        className="relative w-full"
        style={{
          margin: "0 auto", maxWidth: "calc(var(--u) * 42)",
          padding:
            "calc(var(--u) * 6)" +
            " clamp(calc(var(--u) * 1.5),5vw,calc(var(--u) * 2))" +
            " clamp(calc(var(--u) * 1.5),4svh,calc(var(--u) * 2.5))",
        }}
      >
        <p style={{ ...label, fontSize: "calc(var(--u) * 0.78)", letterSpacing: "0.42em", color: "var(--cream)" }}>
          Giles Lamb
        </p>

        <h1
          style={{
            fontFamily: SERIF, fontStyle: "italic", fontWeight: 300,
            fontSize: "clamp(calc(var(--u) * 3.6),11vw,calc(var(--u) * 7))", lineHeight: 0.9,
            letterSpacing: "-0.02em", color: "var(--cream)", margin: "calc(var(--u) * 0.6) 0 0",
          }}
        >
          <span style={{ color: "var(--accent)" }}>Ù</span>rlar
        </h1>

        <p
          style={{
            fontFamily: SERIF, fontStyle: "italic", fontWeight: 400,
            fontSize: "clamp(calc(var(--u) * 1.15),2vw,calc(var(--u) * 1.4))", lineHeight: 1.4,
            color: "var(--sand)", margin: "calc(var(--u) * 1) 0 0",
          }}
        >
          Gaelic, the floor. In pibroch, the ground.
        </p>

        <p
          style={{
            fontFamily: SANS, fontWeight: 300, fontSize: "clamp(calc(var(--u) * 0.95),1.3vw,calc(var(--u) * 1.1))",
            lineHeight: 1.6, letterSpacing: "0.02em", color: "var(--cream)", margin: "calc(var(--u) * 1.5) 0 0",
          }}
        >
          <span className="block">Live music in quadraphonic sound.</span>
          <span className="block">Multi-screen projection. Total immersion.</span>
        </p>

        {below}
      </div>
    </header>
  );
}
