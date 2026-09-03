import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import releasesData from "@/data/releases.json";

export const metadata = {
  title: "Releases — Giles Lamb",
  description:
    "Studio albums, soundtracks, and live sessions. Music by Giles Lamb.",
};

/* One card per release. Cards differ only by which links they carry:
   a link renders when its field is non-empty, nothing otherwise. */
function ReleaseCard({ release }) {
  const links = [
    { label: "Listening room", href: release.room, external: false },
    { label: "Streaming", href: release.streaming, external: true },
    { label: "Bandcamp", href: release.bandcamp, external: true },
  ].filter((l) => l.href);

  return (
    <article className="releases-card">
      <div className="releases-card-image">
        {/* Cover URLs: live releases use R2 CDN; albums hotlink from
            Bandcamp CDN (f4.bcbits.com) — migrate to local /public in a future pass */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={release.cover}
          alt={release.title}
          className="releases-card-img"
          loading="lazy"
        />
      </div>
      <div className="releases-card-body">
        <h3 className="releases-card-title">{release.title}</h3>
        {release.subtitle && (
          <p className="releases-card-subtitle">{release.subtitle}</p>
        )}
        <p className="releases-card-year">{release.year}</p>
        {release.description && (
          <p className="releases-card-desc">{release.description}</p>
        )}
        {links.length > 0 && (
          <p className="releases-card-links">
            {links.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  className="releases-card-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.label}
                </a>
              ) : (
                <a key={l.label} href={l.href} className="releases-card-link">
                  {l.label}
                </a>
              ),
            )}
          </p>
        )}
      </div>
    </article>
  );
}

export default function ReleasesPage() {
  const releases = [...releasesData.releases].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <>
      <Nav />
      <main className="releases-page">
        <div className="releases-intro">
          <p className="section-label">Releases</p>
          <p className="releases-tagline">
            Studio albums, soundtracks, and live sessions.
          </p>
        </div>

        <div className="releases-grid">
          {releases.map((release) => (
            <ReleaseCard key={release.slug} release={release} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
