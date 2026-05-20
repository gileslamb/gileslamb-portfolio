import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import releasesData from "@/data/releases.json";

export const metadata = {
  title: "Releases — Giles Lamb",
  description:
    "Studio albums, soundtracks, and live sessions. Music by Giles Lamb.",
};

function ReleaseCard({ release }) {
  const linkProps = release.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a href={release.link} className="releases-card" {...linkProps}>
      <div className="releases-card-image">
        {/* Cover URLs: sessions use local /public assets; albums hotlink from
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
        <span className="releases-card-type">{release.type}</span>
        <h3 className="releases-card-title">{release.title}</h3>
        {release.subtitle && (
          <p className="releases-card-subtitle">{release.subtitle}</p>
        )}
        <p className="releases-card-year">{release.year}</p>
        {release.description && (
          <p className="releases-card-desc">{release.description}</p>
        )}
      </div>
    </a>
  );
}

export default function ReleasesPage() {
  const { sessions, albums } = releasesData;

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

        <section className="releases-section">
          <h2 className="releases-section-heading">Sessions</h2>
          <div className="releases-sessions-grid">
            {sessions.map((release) => (
              <ReleaseCard key={release.slug} release={release} />
            ))}
          </div>
        </section>

        <section className="releases-section">
          <h2 className="releases-section-heading">Albums</h2>
          <div className="releases-albums-grid">
            {albums.map((release) => (
              <ReleaseCard key={release.slug} release={release} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
