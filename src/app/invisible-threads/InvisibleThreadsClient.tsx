"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./invisible-threads.module.css";

/* Media lives in the music-releases R2 bucket under invisible-threads/ */
const R2_BASE =
  "https://pub-1c42ac5be9844cb9bd9cf16ce1ef9b94.r2.dev/invisible-threads/";
const VIDEO_SRC = `${R2_BASE}invisible-threads_listening-room_WEB_1440_h264.mp4`;
const STREAM_SRC = `${R2_BASE}invisible-threads_listening-room_STREAM_aac256.m4a`;

const CD_URL = "https://gileslamb.gumroad.com/l/invisible-threads";
/* PLACEHOLDER — swap for the Cancer Research UK link Giles supplies */
const DONATE_URL = "https://www.cancerresearchuk.org/get-involved/donate";

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

export default function InvisibleThreadsClient() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  /* Lock scroll for the full-viewport layout (same pattern as /urlar) */
  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, []);

  /* React does not reliably emit the `muted` attribute on SSR output, and
     browsers only autoplay muted video — set it on the element directly. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.defaultMuted = true;
    v.muted = true;
    const tryPlay = () => {
      if (!v.paused) return;
      const p = v.play();
      if (p) p.catch(() => {});
    };
    tryPlay();
    /* Some browsers (iOS Low Power Mode, strict autoplay policies) refuse even
       muted autoplay until the first interaction — retry on that gesture. */
    const opts = { passive: true } as const;
    document.addEventListener("pointerdown", tryPlay, opts);
    document.addEventListener("keydown", tryPlay, opts);
    document.addEventListener("touchstart", tryPlay, opts);
    return () => {
      document.removeEventListener("pointerdown", tryPlay);
      document.removeEventListener("keydown", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
    };
  }, []);

  /* Mirror the audio element's real state so the control never drifts */
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const on = () => setPlaying(true);
    const off = () => setPlaying(false);
    a.addEventListener("play", on);
    a.addEventListener("pause", off);
    a.addEventListener("ended", off);
    return () => {
      a.removeEventListener("play", on);
      a.removeEventListener("pause", off);
      a.removeEventListener("ended", off);
    };
  }, []);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    const v = videoRef.current;
    if (v && v.paused) {
      const p = v.play();
      if (p) p.catch(() => {});
    }
    if (a.paused) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  }, []);

  return (
    <main className={styles.room}>
      <video
        ref={videoRef}
        className={styles.video}
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className={styles.scrim} aria-hidden="true" />

      <audio ref={audioRef} src={STREAM_SRC} preload="metadata" />

      <div className={styles.text}>
        <h1 className={styles.title}>Invisible Threads</h1>
        <p className={styles.sub}>in memory of those lost</p>

        <div className={styles.row}>
          <button
            type="button"
            className={styles.play}
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            aria-pressed={playing}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>

          <div className={styles.links}>
            <a href={CD_URL} target="_blank" rel="noopener noreferrer">
              The CD
            </a>
            <a href={DONATE_URL} target="_blank" rel="noopener noreferrer">
              Donate to Cancer Research UK
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
