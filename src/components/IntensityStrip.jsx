"use client";

import { useEffect, useRef } from "react";
import intensity from "@/data/reel-intensity.json";

/* The catalogue's grey intensity strip (catalogue-site index.html, toneHTML /
   updateTone): a flat printed tone bar of five greys, grain on top, square
   corners. Sections come from src/data/reel-intensity.json
   (scripts/reel-intensity.mjs), [[start_s, end_s, level 1-5], ...]. The played
   portion is a 1px ink rule under the strip and the playhead a 1px ink line,
   both moved straight from the audio clock while playing; nothing else moves.
   Click or drag to seek. A track without sections gets one pale block, as in
   the catalogue. */
export function IntensityStrip({ src, audioRef, title }) {
  const el = useRef(null);
  const iv = intensity[src]?.length ? intensity[src] : [[0, 1, 1]];
  const total = iv[iv.length - 1][1] || 1;

  // playhead and played rule follow the audio (rAF while playing, like the catalogue)
  useEffect(() => {
    const a = audioRef.current, strip = el.current;
    if (!a || !strip) return;
    const ph = strip.querySelector(".ph"), pl = strip.querySelector(".pl");
    let raf = 0;
    const draw = () => {
      const frac = a.duration ? Math.min(1, a.currentTime / a.duration) : 0;
      const pc = (frac * 100).toFixed(3) + "%";
      ph.style.left = pc; pl.style.width = pc;
      strip.classList.toggle("on", !a.paused || a.currentTime > 0);
      strip.setAttribute("aria-valuenow", String(Math.round(frac * 100)));
    };
    const loop = () => { draw(); raf = a.paused ? 0 : requestAnimationFrame(loop); };
    const start = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const evs = ["play", "pause", "seeked", "loadedmetadata", "emptied", "ended"];
    a.addEventListener("play", start);
    evs.forEach((e) => a.addEventListener(e, draw));
    draw();
    if (!a.paused) start();
    return () => {
      cancelAnimationFrame(raf);
      a.removeEventListener("play", start);
      evs.forEach((e) => a.removeEventListener(e, draw));
    };
  }, [audioRef, src]);

  // click or drag to seek
  const drag = useRef(false);
  const frac = (e) => {
    const r = el.current.getBoundingClientRect();
    return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
  };
  const seek = (e) => {
    const a = audioRef.current;
    if (a && a.duration) a.currentTime = frac(e) * a.duration;
  };
  const onKey = (e) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    if (e.key === "ArrowRight") { e.preventDefault(); a.currentTime = Math.min(a.duration, a.currentTime + 5); }
    if (e.key === "ArrowLeft") { e.preventDefault(); a.currentTime = Math.max(0, a.currentTime - 5); }
  };

  return (
    <span
      ref={el}
      className="tone"
      role="slider"
      tabIndex={0}
      aria-label={`Seek ${title}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      onPointerDown={(e) => {
        if (e.button > 0) return;
        drag.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        seek(e);
      }}
      onPointerMove={(e) => { if (drag.current) seek(e); }}
      onPointerUp={() => { drag.current = false; }}
      onPointerCancel={() => { drag.current = false; }}
      onKeyDown={onKey}
    >
      {iv.map(([a, b, l], i) => (
        <i
          key={i}
          className={`t${l}`}
          style={{ left: `${((a / total) * 100).toFixed(3)}%`, width: `${(((b - a) / total) * 100 + 0.05).toFixed(3)}%` }}
        />
      ))}
      <b className="pl" />
      <b className="ph" />
    </span>
  );
}
