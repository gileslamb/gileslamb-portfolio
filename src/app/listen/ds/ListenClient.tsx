"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./listen.module.css";

/* 320k MP3 encoded from the Main Album WAV master (Feedback Memory_Rising),
   in the dreamscreens-audio R2 bucket under listen-ds/ (public r2.dev URL,
   no expiry). Custom controls only, so there is no download menu. */
const TRACK = {
  title: "Feedback Memory",
  src: "https://pub-62666eef125a449aa31ba8192339a17e.r2.dev/listen-ds/feedback-memory.mp3",
  duration: 342,
};
const SUBTITLE = "From Dream Screens (2026, unreleased)";
const ARTWORK = "/images/dream-screens.png";

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

export default function ListenClient({ fontClass }: { fontClass: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(TRACK.duration);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const on = () => setPlaying(true);
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

    /* Lock screen / OS media controls, so playback carries on in the
       background (other tab, phone locked) and can be paused from there */
    if ("mediaSession" in navigator) {
      const ms = navigator.mediaSession;
      ms.metadata = new MediaMetadata({
        title: TRACK.title,
        artist: "Giles Lamb",
        album: "Dream Screens",
        artwork: [{ src: ARTWORK, sizes: "2398x1538", type: "image/png" }],
      });
      ms.setActionHandler("play", () => a.play().catch(() => {}));
      ms.setActionHandler("pause", () => a.pause());
      ms.setActionHandler("seekto", (d) => {
        if (d.seekTime != null) a.currentTime = d.seekTime;
      });
    }

    return () => {
      a.removeEventListener("play", on);
      a.removeEventListener("pause", off);
      a.removeEventListener("timeupdate", tick);
      a.removeEventListener("seeked", tick);
      a.removeEventListener("loadedmetadata", meta);
      a.removeEventListener("ended", ended);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Number(e.target.value);
    setTime(a.currentTime);
  };

  const pct = duration > 0 ? (time / duration) * 100 : 0;

  return (
    <main className={`${styles.room} ${fontClass}`}>
      <header className={styles.top}>
        <Link href="/" className={styles.brand}>
          Giles Lamb
        </Link>
        <Link href="/releases" className={styles.back}>
          ← Releases
        </Link>
      </header>

      <div className={styles.inner}>
        <div className={styles.art}>
          <Image
            src={ARTWORK}
            alt="Dream Screens"
            fill
            priority
            sizes="(max-width: 600px) 100vw, 560px"
            className={styles.artImg}
          />
        </div>

        <p className={styles.artist}>Giles Lamb · Composer</p>

        <section className={styles.player} aria-label={TRACK.title}>
          <audio
            ref={audioRef}
            src={TRACK.src}
            preload="metadata"
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
          />
          <button
            type="button"
            className={styles.play}
            onClick={toggle}
            aria-label={playing ? `Pause ${TRACK.title}` : `Play ${TRACK.title}`}
            aria-pressed={playing}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className={styles.body}>
            <h1 className={`${styles.title} ${playing ? styles.titleOn : ""}`}>
              {TRACK.title}
            </h1>
            <p className={styles.subtitle}>{SUBTITLE}</p>
            <div className={styles.scrub}>
              <input
                type="range"
                className={styles.range}
                min={0}
                max={duration}
                step={0.1}
                value={Math.min(time, duration)}
                onChange={seek}
                aria-label={`Seek ${TRACK.title}`}
                style={{ "--pct": `${pct}%` } as React.CSSProperties}
              />
              <span className={styles.time}>
                {fmt(time)} / {fmt(duration)}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
