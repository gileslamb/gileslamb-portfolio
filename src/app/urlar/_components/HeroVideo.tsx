'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { HERO_MANIFEST as MANIFEST, HERO_POSTER, LOOP_IN, LOOP_OUT } from './hero';

/* The three-screen film, full bleed. At rest it loops a muted section (LOOP_IN to LOOP_OUT)
   where the scan system is at full brightness; "Play with sound" runs the whole
   clip from the start with audio, then drops back to the silent loop.

   A native <video> fed by the Stream HLS manifest rather than the Stream iframe:
   the iframe has a start param but no end param, and unmuting it from this page
   is a cross-frame call with no user gesture, which iOS Safari answers by
   pausing. Same-document playback keeps the click a real gesture.

   prefers-reduced-motion never loads the loop: the poster stands in, and the
   sound button still plays the full clip on request.

   Layout: on landscape screens a full-viewport black box with the whole 16:9
   frame centred in it (never cropped, so the side screens stay in),
   letterboxed in the page black. On portrait screens the box is the frame
   plus 15vh of black above and below, so a phone isn't mostly empty black.
   The box reserves its height from first paint, so nothing jumps when the
   video arrives, and sits above the fixed corner plate so the plate never
   draws across the film. The box's own black fades in over its top and
   bottom edges (and the picture is masked to match), so the plate lines fade
   out where they meet the film instead of stopping at a hard line.

   Crossfade: the film fades up from black over the first FADE of the viewport
   as it enters and back to black over the last FADE as it leaves. Two nested
   layers (in, out) so the two scroll animations multiply rather than fight.
   CSS scroll-driven (animation-timeline: view()) where supported, otherwise
   an IntersectionObserver sets the same opacities. */

/* In/out points, poster frame and clip id live in ./hero. */

type Mode = 'poster' | 'loop' | 'full';

/* Crossfade length, as a fraction of the viewport height. */
const FADE = 0.15;
const pct = `${FADE * 100}%`;
const pctOut = `${100 - FADE * 100}%`;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/* prominent: a larger, brighter sound button, for the public page where the
   film is the first thing most visitors will want to hear. */
export default function HeroVideo({ prominent = false }: { prominent?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const filmRef = useRef<HTMLDivElement>(null);
  const inRef = useRef<HTMLDivElement>(null);
  const outRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const modeRef = useRef<Mode>('poster');
  const [full, setFull] = useState(false);
  const [shown, setShown] = useState(false);

  const go = useCallback((m: Mode) => {
    modeRef.current = m;
    setFull(m === 'full');
  }, []);

  /* Attach the manifest once. Resolves when the element can seek. */
  const attach = useCallback((start: number) => {
    const v = videoRef.current;
    if (!v) return Promise.resolve();
    if (v.src || hlsRef.current) return Promise.resolve();
    return new Promise<void>((resolve) => {
      const ready = () => { v.removeEventListener('loadedmetadata', ready); resolve(); };
      v.addEventListener('loadedmetadata', ready);
      v.preload = 'auto';
      /* hls.js first: Chrome's own HLS playback stalls on seeks, and the loop
         seeks every 30 seconds. Native only where MSE is missing. */
      if (Hls.isSupported()) {
        const h = new Hls({ startPosition: start, capLevelToPlayerSize: true });
        hlsRef.current = h;
        h.loadSource(MANIFEST);
        h.attachMedia(v);
      } else {
        v.src = `${MANIFEST}#t=${start}`;
      }
    });
  }, []);

  const startLoop = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    await attach(LOOP_IN);
    /* The sound button may have been pressed while this was loading. */
    if (modeRef.current === 'full') return;
    v.muted = true;
    v.currentTime = LOOP_IN;
    modeRef.current = 'loop';
    v.play().catch(() => {});
  }, [attach]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) startLoop();
    return () => { hlsRef.current?.destroy(); hlsRef.current = null; };
  }, [startLoop]);

  /* Crossfade fallback for browsers without scroll-driven animations. The
     film is at most a viewport tall, so fine thresholds on its own visibility
     give a smooth enough ramp, and the short
     CSS transition on .uh-io covers the steps. The fade length follows
     view(): FADE of the viewport, or of the box when the box is shorter
     (portrait). */
  useEffect(() => {
    const film = filmRef.current;
    if (!film || CSS.supports('animation-timeline: view()')) return;
    film.classList.add('uh-io');
    const steps = Array.from({ length: 201 }, (_, i) => i / 200);
    const io = new IntersectionObserver(([e]) => {
      const vh = e.rootBounds?.height || window.innerHeight;
      const r = e.boundingClientRect;
      const len = FADE * Math.min(vh, r.height);
      if (inRef.current) inRef.current.style.opacity = String(clamp01((vh - r.top) / len));
      if (outRef.current) outRef.current.style.opacity = String(clamp01(r.bottom / len));
    }, { threshold: steps });
    io.observe(film);
    return () => io.disconnect();
  }, []);

  const onTime = useCallback(() => {
    const v = videoRef.current;
    if (v && modeRef.current === 'loop' && (v.currentTime >= LOOP_OUT || v.currentTime < LOOP_IN - 1)) {
      v.currentTime = LOOP_IN;
    }
  }, []);

  const onEnded = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.muted = true;
      setShown(false);
      go('poster');
    } else {
      go('loop');
      startLoop();
    }
  }, [go, startLoop]);

  const toggleSound = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    if (modeRef.current === 'full') {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        v.pause();
        v.muted = true;
        setShown(false);
        go('poster');
      } else {
        go('loop');
        startLoop();
      }
      return;
    }
    /* Unmute and play inside the click so the gesture counts. attach() sets
       the source synchronously, so a first load (reduced motion) is covered. */
    go('full');
    const loaded = !!v.src || !!hlsRef.current;
    const ready = attach(0);
    if (loaded) v.currentTime = 0;
    v.muted = false;
    v.volume = 0.9;
    v.play().catch(() => {});
    await ready;
  }, [attach, go, startLoop]);

  return (
    <div className="uh-film" ref={filmRef}>
      <style>{`
        .uh-film { position:relative; z-index:3; width:100%; height:100vh; height:100svh; overflow:clip;
          --edge:clamp(48px, 10vh, 120px); --edge-top:var(--edge);
          background:linear-gradient(to bottom, transparent, var(--black) var(--edge-top),
            var(--black) calc(100% - var(--edge)), transparent); }
        /* clip, not hidden: hidden makes this a scroll container, and view()
           would then track the film inside itself instead of the viewport. */
        .uh-film-in, .uh-film-out { position:absolute; inset:0; display:grid; place-items:center; }
        .uh-io .uh-film-in, .uh-io .uh-film-out { transition:opacity .12s linear; }
        @supports (animation-timeline: view()) {
          .uh-film-in { animation:uh-fade-in linear both; animation-timeline:view(); animation-range:entry 0% entry ${pct}; }
          .uh-film-out { animation:uh-fade-out linear both; animation-timeline:view(); animation-range:exit ${pctOut} exit 100%; }
        }
        @keyframes uh-fade-in { from { opacity:0; } to { opacity:1; } }
        @keyframes uh-fade-out { from { opacity:1; } to { opacity:0; } }
        /* The whole 16:9 frame, as large as the viewport allows. */
        .uh-frame { position:relative; width:min(100%, 100vh * 16 / 9); width:min(100%, 100svh * 16 / 9); aspect-ratio:16/9; }
        .uh-media { position:absolute; inset:0;
          -webkit-mask-image:linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent);
          mask-image:linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent); }
        .uh-frame img, .uh-frame video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }
        .uh-frame video { opacity:0; transition:opacity .8s ease; }
        .uh-frame video.shown { opacity:1; }
        .uh-snd { position:absolute; right:clamp(10px,2vw,24px); bottom:clamp(10px,2vw,22px); z-index:2;
          display:inline-flex; align-items:center; gap:.6em; cursor:pointer;
          font-family:'Karla',-apple-system,sans-serif; font-size:calc(var(--u) * 0.6); letter-spacing:.22em;
          text-transform:uppercase; color:var(--warm); background:rgba(8,8,8,.42);
          border:1px solid rgba(212,201,184,.22); padding:.85em 1.15em; backdrop-filter:blur(6px);
          -webkit-backdrop-filter:blur(6px); transition:border-color .25s ease, background .25s ease, color .25s ease; }
        .uh-snd:hover, .uh-snd:focus-visible { border-color:var(--accent); color:var(--cream); background:rgba(8,8,8,.6); }
        .uh-snd svg { width:1.35em; height:1.35em; flex:none; }
        .uh-snd.loud { font-size:calc(var(--u) * 0.7); color:var(--cream); background:rgba(8,8,8,.62);
          border-color:var(--accent-dim); padding:.95em 1.3em; }
        .uh-snd.loud svg { color:var(--accent); }
        .uh-snd.loud:hover, .uh-snd.loud:focus-visible { border-color:var(--accent); background:rgba(8,8,8,.75); }
        /* Portrait: the frame is the full width, so the box is its 16:9 height
           plus 15vh above and below. Smaller sound button so it sits well
           inside a phone-sized frame. */
        @media (orientation: portrait) {
          .uh-film { height:calc(100vw * 9 / 16 + 30vh); }
          .uh-snd { font-size:calc(var(--u) * 0.55); padding:.7em .9em; }
          .uh-snd.loud { font-size:calc(var(--u) * 0.62); }
        }
        /* Phones: only 4vh above the frame, so the film follows the hero
           closely; 15vh below as before. The plate fade above the frame
           shortens to match. */
        @media (orientation: portrait) and (max-width: 767px) {
          .uh-film { height:calc(100vw * 9 / 16 + 19vh); --edge-top:4vh; }
          .uh-film-in, .uh-film-out { align-content:start; padding-top:4vh; }
        }
      `}</style>

      <div className="uh-film-in" ref={inRef}>
        <div className="uh-film-out" ref={outRef}>
          <div className="uh-frame">
            <div className="uh-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO_POSTER} alt="Ùrlar: the audience between three screens of projected light" width={1920} height={1080} />

              <video
                ref={videoRef}
                className={shown ? 'shown' : undefined}
                muted
                playsInline
                preload="none"
                poster={HERO_POSTER}
                aria-hidden={!full}
                tabIndex={-1}
                onPlaying={() => setShown(true)}
                onTimeUpdate={onTime}
                onEnded={onEnded}
              />
            </div>

            <button
              type="button"
              className={prominent ? 'uh-snd loud' : 'uh-snd'}
              onClick={toggleSound}
              aria-pressed={full}
            >
              {full ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="none" />
                  <path d="M16 9.5l5 5M21 9.5l-5 5" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="none" />
                  <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11" />
                </svg>
              )}
              {full ? 'Stop sound' : 'Play with sound'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
