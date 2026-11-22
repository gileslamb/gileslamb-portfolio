"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./challenger.module.css";

/* Media lives in the music-releases R2 bucket under time-loop/.
   The stems are one 5.1 AAC file so voice and music share one media
   element and one decoder: sample-aligned by construction through play,
   pause and seek, with no drift to correct. Channel use:
     0/1 = music L/R (stored 2 dB down, restored below)
     2/3 = silent (centre, LFE)
     4/5 = voice L/R
   Stereo copies of each stem sit beside it (challenger_voice.m4a,
   challenger_music.m4a) for reference. The stems are AI-separated
   (Demucs htdemucs_ft); music = master minus voice, so voice + music at
   full level is the released master. */
const R2_BASE = "https://pub-1c42ac5be9844cb9bd9cf16ce1ef9b94.r2.dev/time-loop/";
const STEMS_SRC = `${R2_BASE}challenger_stems_6ch.m4a`;
const LOOP_SRC = `${R2_BASE}challenger_loop.mp4`;

const CH = { musicL: 0, musicR: 1, voiceL: 4, voiceR: 5 };
const MUSIC_TRIM = Math.pow(10, 2 / 20); // undo the 2 dB stored headroom

/* The film is a seamless 8-bar loop at 123 BPM: 468 frames at 30 fps */
const LOOP_SECONDS = 15.6;
const FRAME = 1 / 30;

/* Set when the Time Loop album link is confirmed */
const ALBUM_URL = "";

type Graph = {
  ctx: AudioContext;
  voice: GainNode;
};

/* Equal-power curve on the voice stem only; music stays at unity */
const voiceGainFor = (x: number) => Math.sin((x * Math.PI) / 2);

function fmt(t: number) {
  if (!Number.isFinite(t) || t < 0) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

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

export default function ChallengerClient({ fontClass }: { fontClass: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const graphRef = useRef<Graph | null>(null);
  const voiceRef = useRef(1);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [voice, setVoice] = useState(1); // default fully right, as released

  /* Before the first play the film loops on its own, muted */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.defaultMuted = true;
    v.muted = true;
    const p = v.play();
    if (p) p.catch(() => {});
  }, []);

  /* Build the audio graph. Must run inside a user gesture (iOS). */
  const ensureGraph = useCallback((): Graph | null => {
    if (graphRef.current) return graphRef.current;
    const a = audioRef.current;
    if (!a) return null;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;

    /* iOS: let Web Audio play with the ringer switch on silent */
    const nav = navigator as Navigator & { audioSession?: { type: string } };
    if (nav.audioSession) {
      try {
        nav.audioSession.type = "playback";
      } catch {}
    }

    const ctx = new AC({ latencyHint: "playback" });
    const src = ctx.createMediaElementSource(a);
    const split = ctx.createChannelSplitter(6);
    src.connect(split);

    const musicBus = ctx.createChannelMerger(2);
    const voiceBus = ctx.createChannelMerger(2);
    split.connect(musicBus, CH.musicL, 0);
    split.connect(musicBus, CH.musicR, 1);
    split.connect(voiceBus, CH.voiceL, 0);
    split.connect(voiceBus, CH.voiceR, 1);

    const music = ctx.createGain();
    music.gain.value = MUSIC_TRIM;
    const voiceGain = ctx.createGain();
    voiceGain.gain.value = voiceGainFor(voiceRef.current);
    musicBus.connect(music);
    voiceBus.connect(voiceGain);

    /* Safety limiter at 0 dBFS. The released master peaks below it, so at
       full voice nothing is touched; with the voice out the music stem has
       a few brief overs (up to +1.8 dB) that would otherwise hard-clip. */
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = 0;
    limiter.knee.value = 0;
    limiter.ratio.value = 20;
    limiter.attack.value = 0.001;
    limiter.release.value = 0.1;
    music.connect(limiter);
    voiceGain.connect(limiter);
    limiter.connect(ctx.destination);

    graphRef.current = { ctx, voice: voiceGain };
    return graphRef.current;
  }, []);

  /* Mirror the audio element's state */
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const on = () => setPlaying(true);
    const off = () => setPlaying(false);
    const tick = () => setTime(a.currentTime);
    const meta = () => setDuration(a.duration);
    const ended = () => {
      setPlaying(false);
      a.currentTime = 0;
    };
    a.addEventListener("play", on);
    a.addEventListener("pause", off);
    a.addEventListener("ended", ended);
    a.addEventListener("timeupdate", tick);
    a.addEventListener("seeked", tick);
    a.addEventListener("loadedmetadata", meta);
    a.addEventListener("durationchange", meta);
    if (a.readyState >= 1) meta();
    return () => {
      a.removeEventListener("play", on);
      a.removeEventListener("pause", off);
      a.removeEventListener("ended", ended);
      a.removeEventListener("timeupdate", tick);
      a.removeEventListener("seeked", tick);
      a.removeEventListener("loadedmetadata", meta);
      a.removeEventListener("durationchange", meta);
    };
  }, []);

  /* Keep the film locked to the audio: video time = audio time mod 15.6s.
     Small drift is pulled in by nudging the (muted) video's rate; anything
     over a quarter second is a hard resync. Allows for output latency so
     the picture lines up with what is heard, not what is decoded. */
  useEffect(() => {
    const id = window.setInterval(() => {
      const a = audioRef.current;
      const v = videoRef.current;
      const g = graphRef.current;
      if (!a || !v || !g) return; // not started: film runs free
      const latency = (g.ctx.outputLatency || 0) + (g.ctx.baseLatency || 0);
      const heard = a.paused ? a.currentTime : Math.max(0, a.currentTime - latency);
      const target = heard % LOOP_SECONDS;
      let d = v.currentTime - target;
      if (d > LOOP_SECONDS / 2) d -= LOOP_SECONDS;
      if (d < -LOOP_SECONDS / 2) d += LOOP_SECONDS;
      const ad = Math.abs(d);

      if (a.paused) {
        if (!v.paused) v.pause();
        v.playbackRate = 1;
        if (ad > FRAME) v.currentTime = target;
        return;
      }
      if (v.paused) {
        v.currentTime = target;
        const p = v.play();
        if (p) p.catch(() => {});
        return;
      }
      if (ad > 0.25) {
        v.currentTime = target;
        v.playbackRate = 1;
      } else if (ad > FRAME) {
        v.playbackRate = Math.min(1.1, Math.max(0.9, 1 - d * 1.5));
      } else if (ad < FRAME / 2) {
        v.playbackRate = 1;
      }
    }, 200);
    return () => window.clearInterval(id);
  }, []);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    const g = ensureGraph();
    if (g && g.ctx.state !== "running") g.ctx.resume().catch(() => {});
    if (a.paused) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  }, [ensureGraph]);

  const onSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    if (!a) return;
    const t = Number(e.target.value);
    a.currentTime = t;
    setTime(t);
  }, []);

  const onVoice = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const x = Number(e.target.value);
    voiceRef.current = x;
    setVoice(x);
    const g = graphRef.current;
    if (g) g.voice.gain.setTargetAtTime(voiceGainFor(x), g.ctx.currentTime, 0.02);
  }, []);

  return (
    <main className={`${styles.room} ${fontClass}`}>
      <div className={styles.frame}>
        <video
          ref={videoRef}
          className={styles.video}
          src={LOOP_SRC}
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
      </div>

      <audio ref={audioRef} src={STEMS_SRC} preload="metadata" crossOrigin="anonymous" />

      <div className={styles.text}>
        <p className={styles.artist}>Giles Lamb</p>
        <h1 className={styles.title}>Challenger</h1>
        <p className={styles.from}>
          from{" "}
          {ALBUM_URL ? (
            <a href={ALBUM_URL} target="_blank" rel="noopener noreferrer">
              Time Loop
            </a>
          ) : (
            "Time Loop"
          )}
        </p>

        <div className={styles.transport}>
          <button
            type="button"
            className={styles.play}
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            aria-pressed={playing}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className={styles.seekWrap}>
            <input
              type="range"
              className={styles.range}
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(time, duration || 0)}
              onChange={onSeek}
              aria-label="Position"
              aria-valuetext={`${fmt(time)} of ${fmt(duration)}`}
              style={{ "--fill": `${duration ? (time / duration) * 100 : 0}%` } as React.CSSProperties}
            />
            <p className={styles.times} aria-hidden="true">
              <span>{fmt(time)}</span>
              <span>{fmt(duration)}</span>
            </p>
          </div>
        </div>

        <label className={styles.voice}>
          <span className={styles.voiceLabel}>Voice</span>
          <input
            type="range"
            className={styles.range}
            min={0}
            max={1}
            step={0.01}
            value={voice}
            onChange={onVoice}
            aria-valuetext={`${Math.round(voice * 100)}%`}
            style={{ "--fill": `${voice * 100}%` } as React.CSSProperties}
          />
        </label>

        <p className={styles.hint}>Move the slider to take the voice in and out.</p>

        {ALBUM_URL ? (
          <p className={styles.album}>
            <a href={ALBUM_URL} target="_blank" rel="noopener noreferrer">
              Listen to Time Loop
            </a>
          </p>
        ) : null}
      </div>
    </main>
  );
}
