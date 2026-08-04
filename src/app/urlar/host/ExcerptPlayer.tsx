'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TRACK_URL, claimAudio, onAudioClaim } from './audio';

/* Inline excerpt player. Shares the track with the floating toggle but keeps its
   own <audio>, so the two never fight: whichever starts last claims playback and
   the other pauses (see ./audio). Hairlines only, no radius. */

/* Resting heights, uneven so the paused state already reads as a waveform.
   Animation scales each bar on a staggered loop while the track runs. */
const BARS = [
  0.58, 0.86, 0.50, 0.45, 0.73, 0.50, 0.37, 0.83, 0.91, 0.67,
  0.94, 1.00, 0.63, 0.63, 0.93, 0.71, 0.66, 1.00, 1.00, 0.82,
  1.00, 1.00, 0.64, 0.74, 1.00, 0.84, 0.85, 1.00, 1.00, 0.80,
  1.00, 0.99, 0.60, 0.80, 1.00, 0.88, 0.90, 1.00, 0.96, 0.63,
  0.87, 0.84, 0.52, 0.80, 1.00, 0.77, 0.76, 1.00, 0.65, 0.37,
  0.67, 0.63, 0.36, 0.68, 0.85, 0.42,
];

function clock(seconds: number) {
  if (!Number.isFinite(seconds)) return '--:--';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function ExcerptPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [at, setAt] = useState(0);
  const [len, setLen] = useState(NaN);

  /* Another player started: stand down. */
  useEffect(
    () =>
      onAudioClaim('excerpt', () => {
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
      claimAudio('excerpt');
      audio.volume = 0.85;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [playing]);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    const box = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - box.left) / box.width) * audio.duration;
  }, []);

  const pct = Number.isFinite(len) && len > 0 ? (at / len) * 100 : 0;

  return (
    <div
      className="flex flex-col justify-between"
      style={{ border: '1px solid var(--ash)', padding: '1.1rem 1.25rem', minHeight: '92px' }}
    >
      <style>{`
        .uh-xbtn { transition: background .25s ease, border-color .25s ease; }
        .uh-xbtn:hover { background: rgba(212,201,184,.10); border-color: var(--accent); }
        .uh-xbar { cursor: pointer; }
        .uh-wave { display:flex; align-items:flex-end; gap:2px; height:26px; width:100%; }
        .uh-wave i { display:block; flex:1 1 0; min-width:1px; background:#6e5c45; transform-origin:bottom;
          transition: background .3s ease; }
        .uh-wave.on i { background:var(--accent-dim); animation:uh-wave 1.25s ease-in-out infinite; }
        @keyframes uh-wave {
          0%,100% { transform:scaleY(.55); }
          50%     { transform:scaleY(1.35); }
        }
        @media (prefers-reduced-motion:reduce) { .uh-wave.on i { animation:none; } }
      `}</style>

      <div className="flex items-center" style={{ gap: '0.85rem' }}>
        <button
          className="uh-xbtn grid shrink-0 place-items-center"
          onClick={toggle}
          aria-label={playing ? 'Pause excerpt' : 'Play excerpt'}
          style={{
            width: 34, height: 34, border: '1px solid rgba(212,201,184,.24)',
            background: 'transparent', color: 'var(--sand)', cursor: 'pointer',
          }}
        >
          {playing ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.02rem', lineHeight: 1.25, color: 'var(--cream)',
            }}
          >
            Listen
          </div>
          <div
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--smoke)',
              marginTop: '0.25rem',
            }}
          >
            {clock(at)} / {clock(len)}
          </div>
        </div>
      </div>

      <div className={`uh-wave${playing ? ' on' : ''}`} aria-hidden="true" style={{ marginTop: '0.75rem' }}>
        {BARS.map((h, i) => (
          <i
            key={i}
            style={{ height: `${Math.round(h * 26)}px`, animationDelay: `${(i % 9) * 0.11}s` }}
          />
        ))}
      </div>

      <div
        className="uh-xbar"
        onClick={seek}
        style={{ marginTop: '0.7rem', height: 1, background: 'var(--ash)', position: 'relative' }}
      >
        <div
          style={{
            position: 'absolute', left: 0, top: 0, height: 1,
            width: `${pct}%`, background: 'var(--accent)',
          }}
        />
      </div>

      <audio
        ref={audioRef}
        src={TRACK_URL}
        preload="metadata"
        onLoadedMetadata={(e) => setLen(e.currentTarget.duration)}
        onTimeUpdate={(e) => setAt(e.currentTarget.currentTime)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
