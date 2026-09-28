'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { HERO_MANIFEST as MANIFEST, HERO_POSTER, LOOP_IN, LOOP_OUT } from './hero';

/* Full-width 16:9 hero. At rest it loops a muted section (LOOP_IN to LOOP_OUT)
   where the scan system is at full brightness; "Play with sound" runs the whole
   clip from the start with audio, then drops back to the silent loop.

   A native <video> fed by the Stream HLS manifest rather than the Stream iframe:
   the iframe has a start param but no end param, and unmuting it from this page
   is a cross-frame call with no user gesture, which iOS Safari answers by
   pausing. Same-document playback keeps the click a real gesture.

   prefers-reduced-motion never loads the loop: the poster stands in, and the
   sound button still plays the full clip on request. The box reserves its 16:9
   height from first paint, so nothing jumps when the video arrives. It sits
   above the fixed corner plate so the frame never draws across the image. */

/* In/out points, poster frame and clip id live in ./hero. */

type Mode = 'poster' | 'loop' | 'full';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
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
    <div className="uh-hero">
      <style>{`
        .uh-hero { position:relative; z-index:3; width:100%; aspect-ratio:16/9; background:var(--black); overflow:hidden; }
        .uh-hero img, .uh-hero video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }
        .uh-hero video { opacity:0; transition:opacity .8s ease; }
        .uh-hero video.shown { opacity:1; }
        .uh-snd { position:absolute; right:clamp(10px,2vw,24px); bottom:clamp(10px,2vw,22px); z-index:2;
          display:inline-flex; align-items:center; gap:.6em; cursor:pointer;
          font-family:'Karla',-apple-system,sans-serif; font-size:calc(var(--u) * 0.6); letter-spacing:.22em;
          text-transform:uppercase; color:var(--warm); background:rgba(8,8,8,.42);
          border:1px solid rgba(212,201,184,.22); padding:.85em 1.15em; backdrop-filter:blur(6px);
          -webkit-backdrop-filter:blur(6px); transition:border-color .25s ease, background .25s ease, color .25s ease; }
        .uh-snd:hover, .uh-snd:focus-visible { border-color:var(--accent); color:var(--cream); background:rgba(8,8,8,.6); }
        .uh-snd svg { width:1.35em; height:1.35em; flex:none; }
      `}</style>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={HERO_POSTER} alt="Ùrlar: the audience between three screens of projected light" width={1920} height={1080} fetchPriority="high" />

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

      <button
        type="button"
        className="uh-snd"
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
  );
}
