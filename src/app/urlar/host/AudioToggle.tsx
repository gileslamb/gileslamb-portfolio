'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TRACK_URL, claimAudio, onAudioClaim } from './audio';

/* Same track and same toggle logic as the barn gig page (see
   src/app/urlar/UrlarClient.tsx): one looped R2 file, played on a click so it
   never trips autoplay policy, with a pulsing ring while it runs. Restyled to
   this page's tokens. Nothing is imported from that page, so it stays untouched. */

export default function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  /* The inline excerpt player started: stand down. */
  useEffect(
    () =>
      onAudioClaim('toggle', () => {
        audioRef.current?.pause();
        setPlaying(false);
      }),
    [],
  );

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      claimAudio('toggle');
      audio.volume = 0.85;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [playing]);

  return (
    <>
      <style>{`
        .uh-atoggle { transition: background .25s ease, border-color .25s ease, transform .2s ease; }
        .uh-atoggle:hover { background: rgba(212,201,184,.10); border-color: var(--accent); transform: scale(1.04); }
        .uh-eq-ring.on { animation: uh-pulse 2.4s ease-out infinite; }
        @keyframes uh-pulse { 0% { opacity:.5; transform:scale(1); } 100% { opacity:0; transform:scale(1.45); } }
        @media (prefers-reduced-motion:reduce) { .uh-eq-ring { animation:none!important; } }
      `}</style>

      <button
        className="uh-atoggle"
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        style={{
          position: 'fixed', zIndex: 12,
          top: 'clamp(1.15rem,2.6vw,1.6rem)', right: 'clamp(1.15rem,2.6vw,1.75rem)',
          width: 'clamp(42px,4.4vw,50px)', height: 'clamp(42px,4.4vw,50px)',
          borderRadius: '50%', border: '1px solid rgba(212,201,184,.24)',
          background: 'rgba(8,8,8,.35)', backdropFilter: 'blur(6px)',
          color: 'var(--sand)', cursor: 'pointer', display: 'grid', placeItems: 'center',
        }}
      >
        <span
          className={`uh-eq-ring${playing ? ' on' : ''}`}
          style={{
            position: 'absolute', inset: '-1px', borderRadius: '50%',
            border: '1px solid var(--accent)', opacity: playing ? undefined : 0,
          }}
        />
        {playing ? (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <audio ref={audioRef} src={TRACK_URL} loop preload="auto" />
    </>
  );
}
