import { BAND_IMAGE, BAND_OVERLAY, EVENT, EVENTBRITE_URL } from "./hero";

/* Shared building blocks for /urlar (public) and /urlar/host (venues).
   Site design system only: Cormorant Garamond + Karla (loaded globally via
   globals.css @import) and the :root colour tokens. Structure is Tailwind;
   colour stays inline so it reads off the tokens. */

export const SERIF = "'Cormorant Garamond', Georgia, serif";
export const SANS = "'Karla', -apple-system, sans-serif";

export const label: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: "calc(var(--u) * 0.66)",
  fontWeight: 400,
  letterSpacing: "0.26em",
  textTransform: "uppercase",
  color: "var(--fog)",
  margin: 0,
};

export const prose: React.CSSProperties = {
  fontFamily: SERIF,
  fontWeight: 400,
  fontSize: "clamp(calc(var(--u) * 1.02),1.4vw,calc(var(--u) * 1.15))",
  lineHeight: 1.65,
  color: "var(--warm)",
};

/* Vertical gap between sections in the column. */
export const GAP = "clamp(calc(var(--u) * 3.5),8vw,calc(var(--u) * 5.5))";

const cta: React.CSSProperties = {
  fontFamily: SANS, fontSize: "calc(var(--u) * 0.72)", fontWeight: 400,
  letterSpacing: "0.26em", textTransform: "uppercase",
  background: "var(--accent)", color: "var(--black)",
  padding: "calc(var(--u) * 1.05) calc(var(--u) * 2.4)",
};

/* Page shell: the scoped black, the fluid unit, the fixed corner plate and
   the back link. Everything else is passed in. */
export function UrlarPage({ children }: { children: React.ReactNode }) {
  return (
    <main className="uh-page" style={{ background: "var(--black)", color: "var(--warm)" }}>
      <style>{`
        /* One fluid unit drives every size on the page. It holds at 16px up to
           1440, grows to 20px by 2200, then stops, so the layout scales as a
           whole on large windows without turning the wordmark into a banner.
           Hairlines stay 1px on purpose. */
        .uh { overflow-x:clip; --u:clamp(16px, .526vw + 8.42px, 20px); }
        /* This page's black: pure #000, the film's own black. Scoped here so
           the global --black token is untouched; html and body follow it so
           overscroll shows the same black. */
        .uh-page { --black:#000; }
        html:has(.uh-page), html:has(.uh-page) body { background-color:#000 !important; }
        /* Under 768px globals.css sets overflow-x:hidden on html and body,
           which makes body a scroll container that never scrolls, and the
           film's view() crossfade then tracks body and freezes. clip keeps the
           sideways guard without the scroll container. */
        html:has(.uh-page) body { overflow-x:clip; }
        .uh a.back:hover, .uh a.home:hover { color: var(--warm); }
        .uh a.cta { transition: background .3s ease, letter-spacing .3s ease; }
        .uh a.cta:hover { background: var(--cream); letter-spacing: .3em; }
        .uh-plate { position:fixed; z-index:2; pointer-events:none;
          inset:clamp(calc(var(--u) * 0.75),1.8vw,calc(var(--u) * 1.35)); border:1px solid #1c1915; }
        .uh-plate span { position:absolute; width:9px; height:9px; }
        .uh-plate span::before, .uh-plate span::after { content:''; position:absolute; background:#3b352d; }
        .uh-plate span::before { left:0; top:0; width:9px; height:1px; }
        .uh-plate span::after  { left:0; top:0; width:1px; height:9px; }
        .uh-plate .tl { left:-1px; top:-1px; }
        .uh-plate .tr { right:-1px; top:-1px; transform:scaleX(-1); }
        .uh-plate .bl { left:-1px; bottom:-1px; transform:scaleY(-1); }
        .uh-plate .br { right:-1px; bottom:-1px; transform:scale(-1,-1); }
        /* Band breaks out of the centred column to the full viewport width. */
        .uh-band { position:relative; width:100vw; margin-left:calc(50% - 50vw);
          min-height:45vh; display:flex; align-items:center; justify-content:center;
          padding:calc(var(--u) * 3) clamp(calc(var(--u) * 1.5),5vw,calc(var(--u) * 2)); overflow:hidden; }
        .uh-band img, .uh-band-wash { position:absolute; inset:0; width:100%; height:100%; }
        .uh-band img { object-fit:cover; object-position:center; display:block; }
        .uh-event + .uh-event { border-top:1px solid var(--ash); }
        @media (min-width:640px){
          .uh-event + .uh-event { border-top:0; border-left:1px solid var(--ash); padding-left:calc(var(--u) * 1.25) !important; }
          .uh-band { min-height:65vh; }
        }
      `}</style>

      <div className="uh relative">
        <div className="uh-plate" aria-hidden="true">
          <span className="tl" /><span className="tr" /><span className="bl" /><span className="br" />
        </div>

        <a
          href="https://www.gileslamb.com"
          className="back fixed left-7 top-6 z-10 no-underline"
          style={{
            fontFamily: SANS, fontSize: "calc(var(--u) * 0.72)", letterSpacing: "0.06em",
            color: "rgba(212,201,184,0.5)", transition: "color .2s ease",
          }}
        >
          ← gileslamb.com
        </a>

        {children}
      </div>
    </main>
  );
}

/* The centred reading column below the film. */
export function Column({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative z-[1] w-full"
      style={{
        margin: "0 auto", maxWidth: "calc(var(--u) * 42)",
        padding:
          "clamp(calc(var(--u) * 3),7vw,calc(var(--u) * 5))" +
          " clamp(calc(var(--u) * 1.5),5vw,calc(var(--u) * 2))" +
          " calc(var(--u) * 6)",
      }}
    >
      {children}
    </div>
  );
}

export function BookTickets({ style }: { style?: React.CSSProperties }) {
  return (
    <a href={EVENTBRITE_URL} className="cta inline-block no-underline" style={{ ...cta, ...style }}>
      Book tickets
    </a>
  );
}

/* Premiere: When / Where / Tickets, then Book tickets. */
export function EventDetails({ style }: { style?: React.CSSProperties }) {
  return (
    <section style={style}>
      <h2 style={{ ...label, color: "var(--accent)" }}>Premiere</h2>
      <dl
        className="grid grid-cols-1 sm:grid-cols-3"
        style={{ margin: "calc(var(--u) * 1.25) 0 0", borderTop: "1px solid var(--ash)" }}
      >
        {EVENT.map(([k, main, sub]) => (
          <div key={k} className="uh-event" style={{ padding: "calc(var(--u) * 1.1) 0" }}>
            <dt style={{ ...label, fontSize: "calc(var(--u) * 0.58)", letterSpacing: "0.2em" }}>{k}</dt>
            <dd style={{ margin: "calc(var(--u) * 0.5) 0 0" }}>
              <span
                style={{
                  display: "block", fontFamily: SERIF, fontSize: "calc(var(--u) * 1.2)",
                  lineHeight: 1.3, color: "var(--cream)",
                }}
              >
                {main}
              </span>
              <span
                style={{
                  display: "block", fontFamily: SANS, fontWeight: 300, fontSize: "calc(var(--u) * 0.82)",
                  lineHeight: 1.55, color: "var(--sand)", marginTop: "calc(var(--u) * 0.3)",
                }}
              >
                {sub}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <BookTickets style={{ marginTop: "calc(var(--u) * 1.25)" }} />
    </section>
  );
}

/* The room: one paragraph, no heading. */
export function RoomParagraph({ style }: { style?: React.CSSProperties }) {
  return (
    <p style={{ ...prose, margin: `${GAP} 0 0`, ...style }}>
      The room is blacked out, so the projections create a field of light, with people
      sitting or lying down. I play from behind, among the audience.
    </p>
  );
}

/* Played-live band: full bleed out of the column, a still of the playing
   under a near-black wash that fades into the page. */
export function PlayedLiveBand() {
  return (
    <section className="uh-band" style={{ marginTop: GAP }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={BAND_IMAGE} alt="" aria-hidden="true" loading="lazy" decoding="async" width={1920} height={1080} />
      <div
        aria-hidden="true"
        className="uh-band-wash"
        style={{
          background:
            "linear-gradient(to bottom, var(--black) 0%, transparent 22%, transparent 78%, var(--black) 100%)," +
            ` rgba(8,8,8,${BAND_OVERLAY})`,
        }}
      />
      <p
        style={{
          position: "relative", fontFamily: SERIF, fontStyle: "italic", fontWeight: 400,
          fontSize: "clamp(calc(var(--u) * 1.3),2.5vw,calc(var(--u) * 1.65))", lineHeight: 1.4,
          color: "var(--cream)", maxWidth: "32ch", margin: 0, textAlign: "center",
        }}
      >
        The outline is composed, but within it everything is improvised, so every performance
        is different. I play in response to the feel of the space and the people in it, in
        the moment.
      </p>
    </section>
  );
}
