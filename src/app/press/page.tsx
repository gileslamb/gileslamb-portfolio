import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import releasesData from "@/data/releases.json";
import { AWARDS, CREDITS, IMAGE_SLOTS, PRESS_IMAGES } from "@/data/press";

/* Press kit: bio, selected credits, awards, releases, images, live work and
   contact. Indexable, linked from the site footer. Credits, awards and images
   live in src/data/press.ts (shared with /urlar/host); releases come from
   src/data/releases.json, the same list as /releases. */

const PAGE_URL = "https://www.gileslamb.com/press";
const EMAIL = "giles@gileslamb.com";
const DESC =
  "Press kit for Giles Lamb, composer and immersive sound artist based in Glasgow: selected credits, awards, releases, images and contact.";

export const metadata: Metadata = {
  title: "Press · Giles Lamb",
  description: DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", url: PAGE_URL, siteName: "Giles Lamb", title: "Press · Giles Lamb", description: DESC },
};

const SERIF = "'Cormorant Garamond', Georgia, serif";

type Release = {
  slug: string; title: string; subtitle?: string; year: number; date: string; cover: string;
  room?: string; bandcamp?: string; streaming?: string; store?: string;
};

/* Where a release card links: its listening room on this site, otherwise
   Bandcamp, streaming or the store. */
const releaseHref = (r: Release) => r.room || r.bandcamp || r.streaming || r.store || "/releases";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="press-section">
      <h2 className="section-label">{title}</h2>
      {children}
    </section>
  );
}

/* A clearly marked slot for content that doesn't exist yet. */
function Slot({ code, note }: { code: string; note: string }) {
  return (
    <div className="press-slot">
      <span className="press-slot-code">{code}</span>
      <span>{note}</span>
    </div>
  );
}

export default function PressPage() {
  const releases = [...(releasesData.releases as Release[])].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Nav />
      <main className="press-page">
        <style>{`
          .press-page { min-height:100vh; padding:9rem 3.5rem 5rem; background:var(--black); color:var(--warm); }
          .press-inner { max-width:68rem; margin:0 auto; }
          .press-title { font-family:${SERIF}; font-style:italic; font-weight:300; color:var(--cream);
            font-size:clamp(2.6rem,6vw,4.5rem); line-height:1; margin:0; }
          .press-lede { color:var(--sand); font-size:.9rem; line-height:1.75; margin:1.25rem 0 0; max-width:40rem; }
          .press-section { margin-top:5.5rem; }
          .press-section .section-label { margin-bottom:2rem; }
          .press-slot { border:1px dashed var(--accent-dim); padding:1.5rem; color:var(--fog);
            font-size:.82rem; line-height:1.6; display:flex; flex-direction:column; gap:.5rem; }
          .press-slot-code { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:.72rem;
            letter-spacing:.12em; color:var(--accent); }
          .press-credits { display:grid; grid-template-columns:repeat(auto-fit,minmax(14rem,1fr)); gap:2.5rem 3rem; }
          .press-group { font-size:.6rem; letter-spacing:.24em; text-transform:uppercase; color:var(--fog);
            margin:0 0 1rem; padding-bottom:.75rem; border-bottom:1px solid var(--ash); }
          .press-list { list-style:none; margin:0; padding:0; }
          .press-list li { padding:.45rem 0; line-height:1.4; }
          .press-credit { font-family:${SERIF}; font-size:1.15rem; color:var(--cream); text-decoration:none; }
          a.press-credit:hover { color:var(--accent); }
          .press-detail { display:block; font-size:.78rem; color:var(--sand); margin-top:.15rem; }
          .press-awards li { display:flex; flex-wrap:wrap; gap:.25rem 1rem; align-items:baseline;
            border-bottom:1px solid var(--ash); padding:1rem 0; }
          .press-awards li:first-child { border-top:1px solid var(--ash); }
          .press-releases { display:grid; grid-template-columns:repeat(auto-fill,minmax(10.5rem,1fr)); gap:2rem 1.5rem; }
          .press-release { text-decoration:none; color:inherit; display:block; }
          .press-release img { width:100%; aspect-ratio:1; object-fit:cover; display:block; background:#0f0e0c;
            transition:opacity .25s ease; }
          .press-release:hover img { opacity:.8; }
          .press-release-title { font-family:${SERIF}; font-size:1.05rem; color:var(--cream); margin:.75rem 0 0; line-height:1.3; }
          .press-release-year { font-size:.7rem; letter-spacing:.12em; color:var(--fog); margin:.2rem 0 0; }
          .press-images { display:grid; grid-template-columns:repeat(auto-fill,minmax(17rem,1fr)); gap:2rem 1.5rem; }
          .press-image img { width:100%; aspect-ratio:4/3; object-fit:cover; display:block; }
          .press-image figcaption { display:flex; justify-content:space-between; gap:1rem; margin-top:.75rem;
            font-size:.7rem; letter-spacing:.14em; text-transform:uppercase; color:var(--fog); }
          .press-link { color:var(--cream); text-decoration:none; border-bottom:1px solid var(--accent-dim);
            transition:color .2s ease, border-color .2s ease; }
          .press-link:hover { color:var(--accent); border-color:var(--accent); }
          .press-slots { display:grid; grid-template-columns:repeat(auto-fill,minmax(17rem,1fr)); gap:1.5rem; margin-top:2rem; }
          .press-live { display:block; text-decoration:none; color:inherit; border:1px solid var(--ash);
            padding:2rem; max-width:34rem; transition:border-color .25s ease; }
          .press-live:hover { border-color:var(--accent-dim); }
          .press-live-title { font-family:${SERIF}; font-style:italic; font-weight:300; font-size:2.6rem; line-height:1;
            color:var(--cream); margin:0; }
          @media (max-width:767px){
            .press-page { padding:5rem 1.5rem 4rem; }
            .press-section { margin-top:4rem; }
            .press-releases { grid-template-columns:repeat(2,1fr); gap:1.5rem 1rem; }
          }
        `}</style>

        <div className="press-inner">
          <p className="section-label">Press</p>
          <h1 className="press-title">Giles Lamb</h1>
          <p className="press-lede">Composer and immersive sound artist based in Glasgow.</p>

          <Section id="bio" title="Bio">
            <Slot code="BIO_TBC" note="Biography to come." />
          </Section>

          <Section id="credits" title="Selected credits">
            <div className="press-credits">
              {CREDITS.map(({ group, items }) => (
                <div key={group}>
                  <h3 className="press-group">{group}</h3>
                  <ul className="press-list">
                    {items.map((c) => (
                      <li key={c.title}>
                        {c.href ? (
                          <a href={c.href} className="press-credit">{c.title}</a>
                        ) : (
                          <span className="press-credit">{c.title}</span>
                        )}
                        {c.detail && <span className="press-detail">{c.detail}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section id="awards" title="Awards">
            <ul className="press-list press-awards">
              {AWARDS.map((a) => (
                <li key={a.award}>
                  <span className="press-credit">{a.award}</span>
                  <span style={{ color: "var(--sand)", fontSize: ".85rem" }}>{a.for}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="releases" title="Releases">
            <div className="press-releases">
              {releases.map((r) => {
                const href = releaseHref(r);
                const external = href.startsWith("http");
                return (
                  <a
                    key={r.slug}
                    href={href}
                    className="press-release"
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.cover} alt={`${r.title} cover`} loading="lazy" decoding="async" />
                    <p className="press-release-title">{r.title}</p>
                    <p className="press-release-year">{r.year}</p>
                  </a>
                );
              })}
            </div>
          </Section>

          <Section id="images" title="Images">
            <div className="press-images">
              {PRESS_IMAGES.map((img) => (
                <figure key={img.src} className="press-image" style={{ margin: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" />
                  <figcaption>
                    <span>{img.kind}</span>
                    <a href={img.src} className="press-link" download target="_blank" rel="noopener noreferrer">
                      Download
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="press-slots">
              {IMAGE_SLOTS.map((s) => (
                <Slot key={s} code="IMAGE_TBC" note={s} />
              ))}
            </div>
          </Section>

          <Section id="live" title="Live work">
            <a href="/urlar" className="press-live">
              <p className="press-live-title">
                <span style={{ color: "var(--accent)" }}>Ù</span>rlar
              </p>
              <p style={{ color: "var(--sand)", fontSize: ".9rem", lineHeight: 1.7, margin: "1rem 0 0" }}>
                Live music in quadraphonic sound. Multi-screen projection. Total immersion.
              </p>
              <p style={{ fontSize: ".65rem", letterSpacing: ".24em", textTransform: "uppercase", color: "var(--accent)", margin: "1.5rem 0 0" }}>
                Premiere · Friday 4 December 2026 · House of Toad, Glasgow
              </p>
            </a>
          </Section>

          <Section id="contact" title="Contact">
            <a href={`mailto:${EMAIL}`} className="press-link" style={{ fontFamily: SERIF, fontSize: "1.6rem" }}>
              {EMAIL}
            </a>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
