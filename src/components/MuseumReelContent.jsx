"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const TRACKS = [
  {
    title: "Wallace Score · Wallace Monument Museum",
    context:
      "Historical Scottish subject. Atmospheric score built around place and weight rather than melody.",
    src: "https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/08%20Wallace%20Score%20%7C%20Wallace%20Monument%20Museum.mp3",
  },
  {
    title: "Dark Arts",
    context:
      "Moody textures and bells. Historical in atmosphere, minimal and unresolved.",
    src: "https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/Dark%20Arts.mp3",
  },
  {
    title: "Breathing Whale",
    context:
      "Slowly evolving pads with embedded vocals. Textural, immersive, unhurried.",
    src: "https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/8%20Breathing%20Whale.mp3",
  },
  {
    title: "Sirens Servers · ISO Design",
    context:
      "Drone-led, textural installation work. Commissioned in collaboration with ISO Design.",
    src: "https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/01%20Sirens%20Servers%20%7C%20ISO%20Design.mp3",
  },
  {
    title: "Deep Wave",
    context:
      "Atmospheric pads with interweaving vocals. Electronic in process, environmental in feel.",
    src: "https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/03-Deep%20wave%20.mp3",
  },
  {
    title: "Opera House · Oman Across the Ages, National Museum of Oman",
    context:
      "Large-scale museum installation. Score and sound design composed as a single continuous piece.",
    src: "https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/02%20OperaHouse%20%7C%20Oman%20Across%20the%20ages%20Museum.mp3",
  },
  {
    title: "Deep Space 2",
    context:
      "Atmospheric textures. Slowly evolving, spatially conceived.",
    src: "https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/10%20Deep%20Space%202.mp3",
  },
  {
    title: "Xephyr · ISOMirror · Museum of Science and Industry, Chicago",
    context:
      "Spatial installation for a 2,000 square foot immersive environment. Drone-based, slowly evolving.",
    src: "https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/09%20Xephyr%2C%20ISOMirror%20%7C%20MSI%20Chicago.mp3",
  },
  {
    title: "Xephyr · Pulse · Museum of Science and Industry, Chicago",
    context:
      "A second movement from the same installation. Textural, rhythmic undercurrent.",
    src: "https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/11%20Xephyr%2C%20Pulse%20%7C%20MSI%20Chicago.mp3",
  },
];

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MuseumReelContent({ sideImages = [] }) {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const resumeAfterLoadRef = useRef(false);
  const [, setUiTick] = useState(0);

  const bump = useCallback(() => setUiTick((n) => n + 1), []);

  const goRelative = useCallback((delta) => {
    const a = audioRef.current;
    const playing = Boolean(a && !a.paused);
    resumeAfterLoadRef.current = playing;
    setTrackIndex((i) => (i + delta + TRACKS.length) % TRACKS.length);
  }, []);

  const selectTrack = useCallback(
    (i) => {
      if (i === trackIndex) return;
      const a = audioRef.current;
      resumeAfterLoadRef.current = Boolean(a && !a.paused);
      setTrackIndex(i);
    },
    [trackIndex],
  );

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const shouldPlay = resumeAfterLoadRef.current;
    resumeAfterLoadRef.current = false;
    a.pause();
    a.src = TRACKS[trackIndex].src;
    const onCanPlay = () => {
      if (shouldPlay) void a.play().catch(() => {});
      bump();
    };
    a.addEventListener("canplay", onCanPlay, { once: true });
    a.load();
    bump();
  }, [trackIndex, bump]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => bump();
    const onEnded = () => {
      resumeAfterLoadRef.current = true;
      setTrackIndex((i) => (i + 1) % TRACKS.length);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnded);
    const id = setInterval(bump, 400);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnded);
      clearInterval(id);
    };
  }, [trackIndex, bump]);

  const togglePlay = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (!a.paused) {
      a.pause();
      bump();
      return;
    }
    void a.play().catch(() => {});
    bump();
  }, [bump]);

  const onSeek = useCallback(
    (clientX, barEl) => {
      const a = audioRef.current;
      if (!a || !Number.isFinite(a.duration) || a.duration <= 0) return;
      const rect = barEl.getBoundingClientRect();
      const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      a.currentTime = pct * a.duration;
      bump();
    },
    [bump],
  );

  const audio = audioRef.current;
  const cur = audio?.currentTime ?? 0;
  const dur = audio?.duration;
  const durSafe = Number.isFinite(dur) && dur > 0 ? dur : 0;
  const pct = durSafe > 0 ? Math.min(100, (cur / durSafe) * 100) : 0;
  const isPlaying = Boolean(audio && !audio.paused);
  const current = TRACKS[trackIndex];

  return (
    <>
      <Nav />
      <main className="museum-reel-page">
        <article className="museum-reel-editorial">
          <div className="museum-reel-left">
            <h1 className="museum-reel-title">
              Giles Lamb · Selected Immersive Work
            </h1>

            <p className="museum-reel-framing">
              An immersive soundscape built from low organic drones as the
              foundational layer. Minimal melodic content: music emerging from
              texture rather than theme. Environmental sound abstracted into the
              compositional fabric until the boundary between sound design and
              score dissolves. Vocal and choral elements introduced as texture,
              felt before they&apos;re identified.
            </p>

            <div className="museum-reel-player-card">
              <audio ref={audioRef} preload="metadata" />

              <div className="museum-reel-now-label">
                <span className="museum-reel-now-num">
                  {String(trackIndex + 1).padStart(2, "0")} /{" "}
                  {String(TRACKS.length).padStart(2, "0")}
                </span>
              </div>
              <h2 className="museum-reel-now-title">{current.title}</h2>
              <p className="museum-reel-now-context">{current.context}</p>

              <div className="museum-reel-transport">
                <button
                  type="button"
                  className="museum-reel-step"
                  aria-label="Previous track"
                  onClick={() => goRelative(-1)}
                />
                <button
                  type="button"
                  className={`museum-reel-play-lg ${isPlaying ? "is-playing" : ""}`}
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                />
                <button
                  type="button"
                  className="museum-reel-step museum-reel-step-next"
                  aria-label="Next track"
                  onClick={() => goRelative(1)}
                />
              </div>

              <div
                className="museum-reel-progress-hit-lg"
                role="slider"
                tabIndex={0}
                aria-valuemin={0}
                aria-valuemax={durSafe > 0 ? durSafe : 0}
                aria-valuenow={durSafe > 0 ? cur : 0}
                aria-label="Seek"
                onClick={(e) => onSeek(e.clientX, e.currentTarget)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    const el = e.currentTarget;
                    onSeek(
                      el.getBoundingClientRect().left + el.offsetWidth / 2,
                      el,
                    );
                  }
                }}
              >
                <span className="museum-reel-progress-lg">
                  <span
                    className="museum-reel-progress-fill-lg"
                    style={{ width: `${pct}%` }}
                  />
                </span>
              </div>
              <div className="museum-reel-times-lg" aria-live="polite">
                <span>{formatTime(cur)}</span>
                <span className="museum-reel-times-sep-lg">/</span>
                <span>{durSafe > 0 ? formatTime(durSafe) : "--:--"}</span>
              </div>
            </div>

            <ol className="museum-reel-chapters">
              {TRACKS.map((track, i) => (
                <li key={track.src}>
                  <button
                    type="button"
                    className={`museum-reel-chapter ${i === trackIndex ? "is-active" : ""}`}
                    onClick={() => selectTrack(i)}
                  >
                    <span className="museum-reel-chapter-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="museum-reel-chapter-title">
                      {track.title}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="museum-reel-foot">
              <a href="mailto:giles@gileslamb.com" className="museum-reel-email">
                giles@gileslamb.com
              </a>
            </div>
          </div>

          <aside className="museum-reel-right">
            <div className="museum-reel-side-stack">
              {sideImages.map((img) => (
                <div key={img.src} className="museum-reel-side-cell">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 42vw"
                    className="museum-reel-side-img"
                  />
                </div>
              ))}
            </div>
          </aside>
        </article>
      </main>
      <Footer />
    </>
  );
}
