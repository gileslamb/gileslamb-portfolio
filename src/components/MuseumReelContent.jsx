"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

export function MuseumReelContent() {
  const audiosRef = useRef([]);
  const [, setUiTick] = useState(0);

  const audioRefCallbacks = useMemo(
    () =>
      TRACKS.map(
        (_, i) => (el) => {
          audiosRef.current[i] = el;
        },
      ),
    [],
  );

  useEffect(() => {
    const id = window.setInterval(() => setUiTick((n) => n + 1), 250);
    return () => window.clearInterval(id);
  }, []);

  const pauseOthers = useCallback((except) => {
    audiosRef.current.forEach((el, j) => {
      if (el && j !== except && !el.paused) el.pause();
    });
  }, []);

  const togglePlay = useCallback(
    (i) => {
      const el = audiosRef.current[i];
      if (!el) return;
      if (!el.paused) {
        el.pause();
        return;
      }
      pauseOthers(i);
      void el.play().catch(() => {});
    },
    [pauseOthers],
  );

  const onSeek = useCallback((i, clientX, barEl) => {
    const el = audiosRef.current[i];
    if (!el || !Number.isFinite(el.duration) || el.duration <= 0) return;
    const rect = barEl.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    el.currentTime = pct * el.duration;
    setUiTick((n) => n + 1);
  }, []);

  return (
    <main className="museum-reel">
      <header className="museum-reel-header">
        <h1 className="museum-reel-title">Giles Lamb · Selected Immersive Work</h1>
      </header>

      <p className="museum-reel-framing">
        An immersive soundscape built from low organic drones as the foundational
        layer — minimal melodic content, music emerging from texture rather than
        theme. Environmental sound abstracted into the compositional fabric until
        the boundary between sound design and score dissolves. Vocal and choral
        elements introduced as texture, felt before they&apos;re identified.
      </p>

      <ol className="museum-reel-tracks">
        {TRACKS.map((track, i) => {
          const audio = audiosRef.current[i];
          const cur = audio?.currentTime ?? 0;
          const dur = audio?.duration;
          const durSafe = Number.isFinite(dur) && dur > 0 ? dur : 0;
          const pct = durSafe > 0 ? Math.min(100, (cur / durSafe) * 100) : 0;
          const isPlaying = Boolean(audio && !audio.paused);

          return (
            <li key={track.src} className="museum-reel-track">
              <audio
                ref={audioRefCallbacks[i]}
                src={track.src}
                preload="metadata"
              />
              <div className="museum-reel-track-head">
                <h2 className="museum-reel-track-title">{track.title}</h2>
                <p className="museum-reel-track-context">{track.context}</p>
              </div>
              <div className="museum-reel-player">
                <button
                  type="button"
                  className={`museum-reel-play ${isPlaying ? "is-playing" : ""}`}
                  onClick={() => togglePlay(i)}
                  aria-label={isPlaying ? "Pause" : "Play"}
                />
                <div className="museum-reel-player-main">
                  <div
                    className="museum-reel-progress-hit"
                    role="slider"
                    tabIndex={0}
                    aria-valuemin={0}
                    aria-valuemax={durSafe > 0 ? durSafe : 0}
                    aria-valuenow={durSafe > 0 ? cur : 0}
                    aria-label="Seek"
                    onClick={(e) => onSeek(i, e.clientX, e.currentTarget)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        const el = e.currentTarget;
                        onSeek(
                          i,
                          el.getBoundingClientRect().left + el.offsetWidth / 2,
                          el,
                        );
                      }
                    }}
                  >
                    <span className="museum-reel-progress">
                      <span
                        className="museum-reel-progress-fill"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                  </div>
                  <div className="museum-reel-times" aria-live="polite">
                    <span>{formatTime(cur)}</span>
                    <span className="museum-reel-times-sep">/</span>
                    <span>{durSafe > 0 ? formatTime(durSafe) : "—:—"}</span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <footer className="museum-reel-footer">
        <a href="mailto:giles@gileslamb.com" className="museum-reel-email">
          giles@gileslamb.com
        </a>
      </footer>
    </main>
  );
}
