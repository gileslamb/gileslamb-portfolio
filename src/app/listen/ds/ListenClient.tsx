"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./listen.module.css";

/* 320k MP3s encoded from the Main Album WAV masters, in the
   dreamscreens-audio R2 bucket under listen-ds/ (public r2.dev URL,
   no expiry). Custom controls only, so there is no download menu. */
const R2_BASE =
  "https://pub-62666eef125a449aa31ba8192339a17e.r2.dev/listen-ds/";

const TRACKS = [
  { title: "Feedback Memory", src: `${R2_BASE}feedback-memory.mp3`, duration: 342 },
  { title: "Module n5", src: `${R2_BASE}module-n5.mp3`, duration: 314 },
];

const SUBTITLE = "From Dream Screens (2026, unreleased)";

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

function Player({
  title,
  src,
  duration: fallbackDuration,
  active,
  onPlay,
}: {
  title: string;
  src: string;
  duration: number;
  active: boolean;
  onPlay: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(fallbackDuration);

  /* Only one track plays at a time */
  useEffect(() => {
    if (!active) audioRef.current?.pause();
  }, [active]);

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
    if (a.paused) {
      onPlay();
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Number(e.target.value);
    setTime(a.currentTime);
  };

  const pct = duration > 0 ? (time / duration) * 100 : 0;

  return (
    <section className={styles.player} aria-label={title}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
      />
      <button
        type="button"
        className={styles.play}
        onClick={toggle}
        aria-label={playing ? `Pause ${title}` : `Play ${title}`}
        aria-pressed={playing}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
      <div className={styles.body}>
        <h2 className={`${styles.title} ${playing ? styles.titleOn : ""}`}>{title}</h2>
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
            aria-label={`Seek ${title}`}
            style={{ "--pct": `${pct}%` } as React.CSSProperties}
          />
          <span className={styles.time}>
            {fmt(time)} / {fmt(duration)}
          </span>
        </div>
      </div>
    </section>
  );
}

export default function ListenClient({ fontClass }: { fontClass: string }) {
  const [active, setActive] = useState(-1);

  return (
    <main className={`${styles.room} ${fontClass}`}>
      <div className={styles.inner}>
        <p className={styles.artist}>Giles Lamb</p>
        {TRACKS.map((t, i) => (
          <Player
            key={t.src}
            title={t.title}
            src={t.src}
            duration={t.duration}
            active={active === i}
            onPlay={() => setActive(i)}
          />
        ))}
      </div>
    </main>
  );
}
