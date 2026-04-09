"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import CloudflareVideo from "@/components/CloudflareVideo";

function RightColumn({ blocks }) {
  return (
    <div className="dttm-right">
      {blocks.map((item, i) => {
        if (item.block === "video") {
          return (
            <div key={i} className="dttm-video">
              <CloudflareVideo videoId={item.id} />
            </div>
          );
        }
        if (item.block === "image") {
          return (
            <div key={i} className="dttm-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="immersive-hero-photo"
              />
            </div>
          );
        }
        if (item.block === "images" && item.items?.length) {
          return (
            <div key={i} className="dttm-stills">
              {item.items.map((img, j) => (
                <div key={j} className="dttm-still">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="dttm-still-img"
                  />
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

export function ImmersiveCaseStudy({ project }) {
  return (
    <>
      <Nav />
      <main className="dttm-page">
        <article className="dttm-layout">
          <div className="dttm-left">
            <p className="dttm-type">
              {project.type} · {project.year}
            </p>
            <h1 className="dttm-title">{project.title}</h1>

            <div className="dttm-description">
              {project.description.split("\n\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="dttm-meta">
              <span>{project.role}</span>
              <span className="dttm-meta-sep">·</span>
              <span>{project.client}</span>
              {project.studio ? (
                <>
                  <span className="dttm-meta-sep">·</span>
                  <span>{project.studio}</span>
                </>
              ) : null}
            </div>
          </div>

          <RightColumn blocks={project.rightBlocks} />
        </article>

        <div className="dttm-back">
          <Link href="/immersive">← Back to Installation &amp; Museum</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
