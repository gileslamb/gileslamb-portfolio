"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./menin.module.css";
import {
  HERO,
  IMG_BASE,
  MONTAGE,
  PAGE,
  SECTIONS,
  type AudioItem,
  type Img,
  type VideoItem,
} from "./data";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 5.5v13l10-6.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7.5 5.5h3v13h-3zM13.5 5.5h3v13h-3z" />
    </svg>
  );
}

function fmt(s: number): string {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
}

/* One audio track: round play button, title, line, thin scrub bar.
   preload="none" so nothing downloads until the listener taps play. */
function AudioPlayer({ item }: { item: AudioItem }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(item.duration);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    const on = () => {
      setPlaying(true);
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: item.title,
          artist: "Giles Lamb",
          album: PAGE.title,
        });
      }
    };
    const off = () => setPlaying(false);
    const tick = () => setTime(a.currentTime);
    const meta = () => {
      if (isFinite(a.duration)) setDuration(a.duration);
    };
    const ended = () => {
      setPlaying(false);
      a.currentTime = 0;
    };
    a.addEventListener("play", on);
    a.addEventListener("pause", off);
    a.addEventListener("timeupdate", tick);
    a.addEventListener("seeked", tick);
    a.addEventListener("loadedmetadata", meta);
    a.addEventListener("ended", ended);
    return () => {
      a.removeEventListener("play", on);
      a.removeEventListener("pause", off);
      a.removeEventListener("timeupdate", tick);
      a.removeEventListener("seeked", tick);
      a.removeEventListener("loadedmetadata", meta);
      a.removeEventListener("ended", ended);
    };
  }, [item.title]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = ref.current;
    if (!a) return;
    a.currentTime = Number(e.target.value);
    setTime(a.currentTime);
  };

  const pct = duration > 0 ? (Math.min(time, duration) / duration) * 100 : 0;

  return (
    <div className={styles.player}>
      <audio
        ref={ref}
        src={item.src}
        preload="none"
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
      />
      <button
        type="button"
        className={styles.play}
        onClick={toggle}
        aria-label={playing ? `Pause ${item.title}` : `Play ${item.title}`}
        aria-pressed={playing}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={`${styles.title} ${playing ? styles.titleOn : ""}`}>{item.title}</h3>
          {item.download ? (
            <a
              className={styles.dl}
              href={item.download}
              download
              aria-label={`Download ${item.title} (MP3)`}
            >
              MP3
            </a>
          ) : null}
        </div>
        {item.line ? <p className={styles.line}>{item.line}</p> : null}
        <div className={styles.scrub}>
          <input
            type="range"
            className={styles.range}
            min={0}
            max={duration}
            step={0.1}
            value={Math.min(time, duration)}
            onChange={seek}
            aria-label={`Seek ${item.title}`}
            style={{ "--pct": `${pct}%` } as React.CSSProperties}
          />
          <span className={styles.time}>
            {fmt(time)} / {fmt(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}

/* Responsive image: AVIF, then WebP, then JPEG, at the widths listed in
   data.ts. Lazy unless `eager` (the hero only). */
function Picture({
  img,
  sizes,
  eager = false,
  className,
}: {
  img: Img;
  sizes: string;
  eager?: boolean;
  className?: string;
}) {
  const set = (ext: string) =>
    img.widths.map((w) => `${IMG_BASE}/${img.name}-${w}.${ext} ${w}w`).join(", ");
  const fallback = `${IMG_BASE}/${img.name}-${img.widths[0]}.jpg`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fallback}
        srcSet={set("jpg")}
        sizes={sizes}
        width={img.w}
        height={img.h}
        alt={img.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
      />
    </picture>
  );
}

/* Native video controls (they handle fullscreen and iPhone inline play),
   poster frame only until tapped, no download / PiP / speed menu. */
function VideoPlayer({ item }: { item: VideoItem }) {
  return (
    <figure className={styles.video}>
      <div className={styles.frame} style={{ aspectRatio: item.aspect }}>
        <video
          src={item.src}
          poster={item.poster}
          preload="none"
          controls
          playsInline
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          onContextMenu={(e) => e.preventDefault()}
          aria-label={item.title}
        />
      </div>
      <figcaption className={styles.caption}>
        <h3 className={styles.title}>{item.title}</h3>
        {item.line ? <p className={styles.line}>{item.line}</p> : null}
      </figcaption>
    </figure>
  );
}

export default function MeninClient() {
  /* Only one thing plays at a time: starting any audio or video pauses the
     rest. `play` doesn't bubble, so listen in the capture phase. */
  useEffect(() => {
    const onPlay = (e: Event) => {
      const t = e.target;
      if (!(t instanceof HTMLMediaElement)) return;
      document.querySelectorAll<HTMLMediaElement>("audio, video").forEach((m) => {
        if (m !== t && !m.paused) m.pause();
      });
    };
    document.addEventListener("play", onPlay, true);
    return () => {
      document.removeEventListener("play", onPlay, true);
    };
  }, []);

  return (
    <main className={styles.page}>
      {/* Page-only overrides, present only while this page is mounted:
          - the site-wide custom cursor (dot + trailing ring) is animation, so
            use the normal pointer;
          - the root layout paints html/body near-black inline, so lift them to
            the page's stone grey (no black edges on overscroll). */}
      <style>
        {
          "html,body{background-color:#25231f!important}body{cursor:auto}.cursor,.cursor-ring{display:none!important}"
        }
      </style>

      <header className={styles.hero}>
        <Picture img={HERO} sizes="(max-width: 760px) 200vw, 100vw" eager className={styles.heroImg} />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroText}>
          <h1 className={styles.pageTitle}>{PAGE.title}</h1>
          <p className={styles.byline}>{PAGE.byline}</p>
          <p className={styles.subtitle}>{PAGE.subtitle}</p>
        </div>
      </header>

      <div className={styles.inner}>
      <section className={`${styles.section} ${styles.montage}`} aria-label={MONTAGE.title}>
        <AudioPlayer item={MONTAGE} />
        <p className={styles.note}>{MONTAGE.note}</p>
        <Picture
          img={MONTAGE.image}
          sizes="(max-width: 760px) 100vw, 920px"
          className={styles.wideImg}
        />
      </section>

      {SECTIONS.map((s) => (
        <section key={s.heading} className={styles.section} aria-label={s.heading}>
          {s.image ? (
            <Picture
              img={s.image}
              sizes="(max-width: 760px) 100vw, 640px"
              className={styles.sectionImg}
            />
          ) : null}
          <h2 className={styles.heading}>{s.heading}</h2>
          {s.intro ? <p className={styles.intro}>{s.intro}</p> : null}
          <div className={s.items[0]?.kind === "video" ? styles.videos : styles.list}>
            {s.items.map((it) =>
              it.kind === "audio" ? (
                <AudioPlayer key={it.src} item={it} />
              ) : (
                <VideoPlayer key={it.src} item={it} />
              )
            )}
          </div>
        </section>
      ))}

      <footer className={styles.footer}>
        <p>{PAGE.footerName}</p>
        <p>
          <a href={`mailto:${PAGE.footerEmail}`}>{PAGE.footerEmail}</a>
        </p>
      </footer>
      </div>
    </main>
  );
}
