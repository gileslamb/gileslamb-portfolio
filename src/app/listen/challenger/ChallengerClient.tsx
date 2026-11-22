"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./challenger.module.css";

/* Media lives in the music-releases R2 bucket under time-loop/.
   The stems are one 5.1 AAC file so voice and music share one media
   element and one decoder: sample-aligned by construction through play,
   pause and seek, with no drift to correct. File channels (5.1):
     L/R   = music L/R (stored 2 dB down, restored below)
     C     = marker: a -20 dBFS 997 Hz sine, never routed to the output
     LFE   = silent
     Ls/Rs = voice L/R
   Stereo copies of each stem sit beside it (challenger_voice.m4a,
   challenger_music.m4a) for reference. The stems are AI-separated
   (Demucs htdemucs_ft); music = master minus voice, so voice + music at
   full level is the released master. */
const R2_BASE = "https://pub-1c42ac5be9844cb9bd9cf16ce1ef9b94.r2.dev/time-loop/";
const STEMS_SRC = `${R2_BASE}challenger_stems_6ch_v2.m4a`;
const LOOP_SRC = `${R2_BASE}challenger_loop.mp4`;

/* Browsers hand the six channels to Web Audio in different orders.
   Chrome uses the standard order (L R C LFE Ls Rs); Safari and every iOS
   browser (WebKit) use AAC's native order (C L R Ls Rs LFE), measured on
   iOS 18 / Safari 26 on 22 Nov 2026. The page starts with a guess from the
   user agent, listens for the marker tone, and switches if the guess was
   wrong. Output stays muted until the order is confirmed. */
type ChannelMap = { musicL: number; musicR: number; voiceL: number; voiceR: number; marker: number };
const STANDARD_ORDER: ChannelMap = { musicL: 0, musicR: 1, voiceL: 4, voiceR: 5, marker: 2 };
const AAC_ORDER: ChannelMap = { musicL: 1, musicR: 2, voiceL: 3, voiceR: 4, marker: 0 };
const MARKER_HZ = 997;
const MUSIC_TRIM = Math.pow(10, 2 / 20); // undo the 2 dB stored headroom

function guessOrder(): ChannelMap {
  const ua = navigator.userAgent;
  const ios = /iPhone|iPad|iPod/.test(ua);
  const safari = /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR|Firefox/.test(ua);
  return ios || safari ? AAC_ORDER : STANDARD_ORDER;
}

/* A channel is the marker if it holds a strong 997 Hz line and next to
   nothing in the low band. Music channels always carry low-band energy
   when they carry any 997 Hz energy at all. */
function isMarker(an: AnalyserNode, buf: Float32Array<ArrayBuffer>, sampleRate: number) {
  an.getFloatFrequencyData(buf);
  const bin = (hz: number) => Math.round((hz * an.fftSize) / sampleRate);
  let peak = -Infinity;
  for (let i = bin(MARKER_HZ) - 2; i <= bin(MARKER_HZ) + 2; i++) peak = Math.max(peak, buf[i]);
  let low = -Infinity;
  for (let i = bin(60); i <= bin(500); i++) low = Math.max(low, buf[i]);
  return peak > -50 && low < -95;
}

/* The film is a seamless 8-bar loop at 123 BPM: 468 frames at 30 fps */
const LOOP_SECONDS = 15.6;
const FRAME = 1 / 30;

/* Time Loop on Spotify, confirmed by Giles 22 Nov 2026 */
const ALBUM_URL = "https://open.spotify.com/album/2ppa68fjsou5FzN06YiM1f";
const BANDCAMP_URL = "https://gileslamb.bandcamp.com/album/timeloop";

type Graph = {
  ctx: AudioContext;
  voice: GainNode;
  out: GainNode;
  route: (m: ChannelMap) => void;
  map: ChannelMap;
  confirmed: boolean;
  probes: AnalyserNode[]; // one per splitter output
  heard: number; // seconds of playback spent listening for the marker
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
  const startAt = useRef<number | null>(null); // position when play was first pressed
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
    const route = (m: ChannelMap) => {
      try {
        split.disconnect(musicBus);
      } catch {}
      try {
        split.disconnect(voiceBus);
      } catch {}
      split.connect(musicBus, m.musicL, 0);
      split.connect(musicBus, m.musicR, 1);
      split.connect(voiceBus, m.voiceL, 0);
      split.connect(voiceBus, m.voiceR, 1);
    };
    const map = guessOrder();
    route(map);

    /* Probes on every splitter output, to find the marker channel */
    const probes = [0, 1, 2, 3, 4, 5].map((i) => {
      const an = ctx.createAnalyser();
      an.fftSize = 8192;
      an.smoothingTimeConstant = 0;
      split.connect(an, i);
      return an;
    });

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

    /* Held at zero until the channel order is confirmed */
    const out = ctx.createGain();
    out.gain.value = 0;
    limiter.connect(out);
    out.connect(ctx.destination);

    graphRef.current = {
      ctx,
      voice: voiceGain,
      out,
      route,
      map,
      confirmed: false,
      probes,
      heard: 0,
    };
    return graphRef.current;
  }, []);

  /* Confirm the channel order from the marker tone, then unmute. If no
     marker shows within two seconds of playback, keep the guess. */
  useEffect(() => {
    const STEP = 60;
    let buf: Float32Array<ArrayBuffer> | null = null;
    const id = window.setInterval(() => {
      const g = graphRef.current;
      const a = audioRef.current;
      if (!g || !a || g.confirmed || a.paused || g.ctx.state !== "running") return;
      if (!buf) buf = new Float32Array(g.probes[0].frequencyBinCount);
      g.heard += STEP / 1000;
      const found: number[] = [];
      g.probes.forEach((an, i) => {
        if (isMarker(an, buf!, g.ctx.sampleRate)) found.push(i);
      });
      const other = g.map === STANDARD_ORDER ? AAC_ORDER : STANDARD_ORDER;
      let done = false;
      if (found.length === 1 && found[0] === g.map.marker) {
        done = true;
      } else if (found.length === 1 && found[0] === other.marker) {
        g.route(other);
        g.map = other;
        done = true;
      } else if (g.heard > 2) {
        done = true;
      }
      if (!done) return;
      g.confirmed = true;
      g.probes.forEach((an) => an.disconnect());
      const fadeIn = () => {
        const now = g.ctx.currentTime;
        g.out.gain.cancelScheduledValues(now);
        g.out.gain.setValueAtTime(0, now);
        g.out.gain.linearRampToValueAtTime(1, now + 0.03);
      };
      /* The listen took a moment of muted playback: go back to where play
         was pressed (unless the listener has seeked since) before fading in */
      const from = startAt.current;
      if (from !== null && Math.abs(a.currentTime - from) < 3) {
        a.addEventListener("seeked", fadeIn, { once: true });
        a.currentTime = from;
      } else {
        fadeIn();
      }
      (window as unknown as { __challengerOrder?: string }).__challengerOrder =
        g.map === STANDARD_ORDER ? "standard" : "aac";
    }, STEP);
    return () => window.clearInterval(id);
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
      if (g && !g.confirmed && startAt.current === null) startAt.current = a.currentTime;
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

        <ul className={styles.album}>
          <li>
            <a href={BANDCAMP_URL} target="_blank" rel="noopener noreferrer">
              Buy Time Loop on Bandcamp
            </a>
          </li>
          <li>
            <a href={ALBUM_URL} target="_blank" rel="noopener noreferrer">
              Stream on Spotify
            </a>
          </li>
          <li>
            <Link href="/releases">Back to releases</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
