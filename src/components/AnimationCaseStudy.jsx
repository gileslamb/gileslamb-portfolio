"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import CloudflareVideo from "@/components/CloudflareVideo";

function RightColumn({ blocks }) {
  return (
    <div className="anim-case-right">
      {blocks.map((item, i) => {
        if (item.block === "video") {
          return (
            <div key={i} className="anim-case-video">
              <CloudflareVideo videoId={item.id} />
            </div>
          );
        }
        if (item.block === "image") {
          return (
            <div key={i} className="anim-case-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.alt} className="anim-case-photo" />
            </div>
          );
        }
        if (item.block === "images" && item.items?.length) {
          return (
            <div key={i} className="anim-case-stills">
              {item.items.map((img, j) => (
                <div key={j} className="anim-case-still">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} className="anim-case-still-img" />
                </div>
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export function AnimationCaseStudy({ project }) {
  return (
    <>
      <Nav />
      <main className="anim-case-page">
        <article className="anim-case-layout">
          <div className="anim-case-left">
            <p className="anim-case-type">
              {project.type} · {project.year}
            </p>
            <h1 className="anim-case-title">{project.title}</h1>

            <div className="anim-case-description">
              {project.description.split("\n\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {project.awards?.length > 0 && (
              <div className="anim-case-awards">
                {project.awards.map((award, i) => (
                  <div key={i} className="anim-case-award-item">✦ {award}</div>
                ))}
              </div>
            )}

            <div className="anim-case-meta">
              <span>{project.role}</span>
              <span className="anim-case-meta-sep">·</span>
              <span>{project.client}</span>
              {project.studio && (
                <>
                  <span className="anim-case-meta-sep">·</span>
                  <span>{project.studio}</span>
                </>
              )}
            </div>

            {project.externalLink && (
              <div className="anim-case-links">
                <a
                  href={project.externalLink.href}
                  className="anim-case-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.externalLink.label}
                </a>
              </div>
            )}
          </div>

          <RightColumn blocks={project.rightBlocks} />
        </article>

        <div className="anim-case-back">
          <Link href="/animation">← Back to Animation &amp; Kids&rsquo;</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
