'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';

const MANIFEST =
  'https://customer-3aa0vwfgpylhsylu.cloudflarestream.com/9510de9cffc769d1720604298dc57895/manifest/video.m3u8';
const THUMBNAIL =
  'https://customer-3aa0vwfgpylhsylu.cloudflarestream.com/9510de9cffc769d1720604298dc57895/thumbnails/thumbnail.jpg?time=8s&height=1080';
const TRACK_URL =
  'https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/resonant-beings/internal-logic-middle.m4a';
const FADE = 1.2;

const INK = '#F5F3ED';
const MUTED = 'rgba(245,243,237,.82)';
const FAINT = 'rgba(245,243,237,.55)';
const LINE = 'rgba(245,243,237,.24)';
const LINE_SOFT = 'rgba(245,243,237,.12)';
const ACCENT = '#E7A75E';
const BG = '#05070a';

const VIDFILTER = 'brightness(.60) saturate(.75) blur(1px)';
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* Cormorant Garamond is loaded by the root layout as --font-hero-name */
const SERIF = 'var(--font-hero-name,"Cormorant Garamond",Georgia,serif)';
const DISP = 'var(--font-syne,"Syne",system-ui,sans-serif)';
const SANS = 'var(--font-sg,"Space Grotesk",-apple-system,sans-serif)';

export default function UrlarClient() {
  const vidARef = useRef<HTMLVideoElement>(null);
  const vidBRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const rafRef = useRef<number | null>(null);
  const hlsRef = useRef<Hls[]>([]);

  const [playing, setPlaying] = useState(false);
  const [printMode, setPrintMode] = useState(false);

  /* Print mode (?print=1) — used only for static PDF generation */
  useEffect(() => {
    setPrintMode(new URLSearchParams(window.location.search).get('print') === '1');
  }, []);

  /* Lock scroll for full-viewport layout */
  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, []);

  /* Cloudflare Stream crossfade — skipped entirely in print mode */
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('print') === '1') return;
    const vidA = vidARef.current;
    const vidB = vidBRef.current;
    if (!vidA || !vidB) return;

    function attach(v: HTMLVideoElement) {
      if (v.canPlayType('application/vnd.apple.mpegurl')) {
        v.src = MANIFEST;
      } else if (Hls.isSupported()) {
        const h = new Hls();
        hlsRef.current.push(h);
        h.loadSource(MANIFEST);
        h.attachMedia(v);
      } else {
        v.src = MANIFEST;
      }
    }

    attach(vidA);
    attach(vidB);

    let front = vidA;
    let back = vidB;
    let transitioning = false;

    vidA.style.opacity = '1';
    vidB.style.opacity = '0';
    vidA.play().catch(() => {});

    function swap() {
      transitioning = true;
      back.currentTime = 0;
      back.play().catch(() => {});
      back.style.opacity = '1';
      front.style.opacity = '0';
      const old = front;
      front = back;
      back = old;
      setTimeout(() => {
        back.pause();
        try { back.currentTime = 0; } catch (_) { /* ignored */ }
        transitioning = false;
      }, FADE * 1000 + 60);
    }

    function tick() {
      if (!transitioning && isFinite(front.duration) && front.duration > 0) {
        if (front.currentTime >= front.duration - FADE) swap();
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      hlsRef.current.forEach(h => h.destroy());
      hlsRef.current = [];
      [vidA, vidB].forEach(v => { v.pause(); v.src = ''; });
    };
  }, []);

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = 0.85;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [playing]);

  return (
    <>
      <style>{`
        .ul-top   { opacity:0; animation:ul-rise 1s .2s cubic-bezier(.2,.7,.2,1) forwards; }
        .ul-h1    { opacity:0; animation:ul-rise 1.1s .36s cubic-bezier(.2,.7,.2,1) forwards; }
        .ul-ph    { opacity:0; animation:ul-rise 1.1s .50s cubic-bezier(.2,.7,.2,1) forwards; }
        .ul-strap { opacity:0; animation:ul-rise 1.1s .62s cubic-bezier(.2,.7,.2,1) forwards; }
        .ul-quote { opacity:0; animation:ul-rise 1.1s .68s cubic-bezier(.2,.7,.2,1) forwards; }
        .ul-bottom{ opacity:0; animation:ul-rise 1.1s .82s cubic-bezier(.2,.7,.2,1) forwards; }
        @keyframes ul-rise{ from{ opacity:0; transform:translateY(16px);} to{ opacity:1; transform:none;} }
        .ul-r1{ animation:ul-ripple 6s ease-in-out infinite; transform-origin:32px 32px; }
        .ul-r2{ animation:ul-ripple 6s ease-in-out .8s infinite; transform-origin:32px 32px; }
        .ul-r3{ animation:ul-ripple 6s ease-in-out 1.6s infinite; transform-origin:32px 32px; }
        @keyframes ul-ripple{ 0%,100%{ opacity:.18; transform:scale(.96);} 45%{ opacity:.6; transform:scale(1.02);} }
        .ul-eq-ring.on{ animation:ul-pulse 2.4s ease-out infinite; }
        @keyframes ul-pulse{ 0%{ opacity:.5; transform:scale(1);} 100%{ opacity:0; transform:scale(1.4);} }
        @media (prefers-reduced-motion:reduce){
          .ul-r1,.ul-r2,.ul-r3,.ul-eq-ring,.ul-top,.ul-h1,.ul-ph,.ul-strap,.ul-quote,.ul-bottom{ animation:none!important; opacity:1!important; transform:none!important; }
        }
        @media (max-width:720px){
          .ul-botrow{ flex-direction:column!important; align-items:flex-start!important; }
        }
        .ul-cta{ transition:color .2s!important; }
        .ul-cta:hover{ color:${ACCENT}!important; }
        .ul-printlink:hover{ color:${INK}!important; }
        .ul-atoggle:hover{ background:rgba(245,243,237,.18)!important; transform:scale(1.05)!important; }
      `}</style>

      {/* Background — darkened still + crossfading video */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', background: BG,
      }}>
        <img
          src={THUMBNAIL}
          alt=""
          crossOrigin="anonymous"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: VIDFILTER }}
        />
        {!printMode && (
          <>
            <video
              ref={vidARef}
              muted playsInline preload="auto"
              poster={THUMBNAIL}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: VIDFILTER, opacity: 0, transition: 'opacity 1.2s linear', willChange: 'opacity' }}
            />
            <video
              ref={vidBRef}
              muted playsInline preload="auto"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: VIDFILTER, opacity: 0, transition: 'opacity 1.2s linear', willChange: 'opacity' }}
            />
          </>
        )}
      </div>

      {/* Scrim */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: [
          'linear-gradient(to right,rgba(4,7,12,.6) 0%,rgba(4,7,12,.26) 42%,rgba(4,7,12,0) 70%)',
          'linear-gradient(to top,rgba(4,7,12,.86) 0%,rgba(4,7,12,.32) 42%,rgba(4,7,12,.4) 100%)',
          'radial-gradient(120% 90% at 50% 40%,transparent 52%,rgba(4,7,12,.5))',
        ].join(','),
      }} />

      {/* Grain */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none', opacity: 0.05,
        backgroundImage: GRAIN,
      }} />

      {/* Watermark */}
      <svg aria-hidden="true" viewBox="0 0 64 64" fill="none" style={{
        position: 'fixed', zIndex: 2, right: '-14vw', top: '50%', transform: 'translateY(-50%)',
        width: '60vw', height: '60vw', color: INK, opacity: 0.07, pointerEvents: 'none',
      }}>
        <circle cx="32" cy="32" r="2.6" fill="currentColor"/>
        <circle cx="32" cy="32" r="9"  stroke="currentColor" strokeWidth=".5"/>
        <circle cx="32" cy="32" r="17" stroke="currentColor" strokeWidth=".5"/>
        <circle cx="32" cy="32" r="25" stroke="currentColor" strokeWidth=".5"/>
        <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth=".5"/>
      </svg>

      {/* Hairline frame + top label */}
      {!printMode && (
        <div aria-hidden="true" style={{
          position: 'fixed', inset: 'clamp(15px,2.2vw,26px)', zIndex: 4,
          pointerEvents: 'none', border: `1px solid ${LINE_SOFT}`,
        }}>
          <span style={{
            position: 'absolute', top: -1, left: '50%', transform: 'translate(-50%,-50%)',
            background: BG, padding: '0 12px',
            fontFamily: SANS, fontSize: 9, letterSpacing: '.34em', color: FAINT, textTransform: 'uppercase',
          }}>Ùrlar · 20.09.26 · Ayrshire</span>
        </div>
      )}

      {/* Audio toggle */}
      {!printMode && (
        <button
          className="ul-atoggle"
          onClick={toggleAudio}
          aria-label={playing ? 'Pause music' : 'Play music'}
          style={{
            position: 'fixed', zIndex: 12,
            top: 'clamp(26px,3.2vw,44px)', right: 'clamp(26px,3.2vw,44px)',
            width: 'clamp(48px,5vw,58px)', height: 'clamp(48px,5vw,58px)',
            borderRadius: '50%', border: `1px solid ${LINE}`,
            background: 'rgba(245,243,237,.08)', backdropFilter: 'blur(6px)',
            color: INK, cursor: 'pointer', display: 'grid', placeItems: 'center',
            transition: 'background .25s,transform .2s',
          }}
        >
          <span
            className={`ul-eq-ring${playing ? ' on' : ''}`}
            style={{
              position: 'absolute', inset: '-1px', borderRadius: '50%',
              border: `1px solid ${ACCENT}`,
              opacity: playing ? undefined : 0,
            }}
          />
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1"/>
              <rect x="14" y="5" width="4" height="14" rx="1"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      )}
      <audio ref={audioRef} src={TRACK_URL} loop preload="auto" />

      {/* Poster content */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 5,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: 'clamp(30px,4.5vw,66px)',
        fontFamily: SANS, color: INK,
      }}>
        {/* Brand — top */}
        <div className="ul-top" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg viewBox="0 0 64 64" fill="none" aria-hidden="true"
            style={{ width: 'clamp(40px,4.6vw,56px)', height: 'auto', flex: 'none', color: INK }}
          >
            <circle cx="32" cy="32" r="2.6" fill="currentColor"/>
            <circle className="ul-r1" cx="32" cy="32" r="9"  stroke="currentColor" strokeWidth="1.1" opacity=".7"/>
            <circle className="ul-r2" cx="32" cy="32" r="17" stroke="currentColor" strokeWidth="1"   opacity=".45"/>
            <circle className="ul-r3" cx="32" cy="32" r="25" stroke="currentColor" strokeWidth="1"   opacity=".25"/>
            <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="1" opacity=".12"/>
          </svg>
          <div>
            <div style={{ fontFamily: DISP, fontWeight: 600, fontSize: 'clamp(19px,2.4vw,27px)', letterSpacing: '.05em', lineHeight: 1.05 }}>
              Giles Lamb
            </div>
            <div style={{
              fontFamily: SANS, fontSize: 'clamp(10px,1.1vw,12px)', letterSpacing: '.42em',
              textTransform: 'uppercase', color: FAINT, marginTop: 6,
            }}>Live</div>
          </div>
        </div>

        {/* Hero */}
        <div className="ul-h1" style={{ maxWidth: 'min(92vw,900px)' }}>
          <div style={{
            display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap',
            gap: 'clamp(12px,1.8vw,28px)',
          }}>
            <h1 style={{
              fontFamily: SERIF, fontWeight: 300, fontStyle: 'italic',
              fontSize: 'clamp(80px,13vw,190px)', lineHeight: .84, letterSpacing: '-.01em',
              textShadow: '0 4px 60px rgba(0,0,0,.6)', margin: 0, color: INK, flex: 'none',
            }}>Ùrlar</h1>
            <p style={{
              fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
              fontSize: 'clamp(11px,1vw,13px)', lineHeight: 1.7, color: FAINT,
              maxWidth: '46ch', margin: 0, paddingBottom: '.35em',
            }}>[Scottish Gaelic — <span style={{ color: MUTED }}>ground</span>; the foundational theme of a pibroch, from which every variation departs and to which it returns.]</p>
          </div>

          <p className="ul-ph" style={{
            fontFamily: SANS, fontWeight: 300, fontSize: 'clamp(10px,1vw,12px)',
            letterSpacing: '.26em', color: FAINT, margin: 'clamp(10px,1.2vw,16px) 0 0',
          }}>/ˈuːr-lər/ · OOR-lar</p>

          <p className="ul-strap" style={{
            fontFamily: DISP, fontWeight: 400, fontSize: 'clamp(16px,2vw,26px)',
            lineHeight: 1.35, color: INK, maxWidth: '28ch',
            margin: 'clamp(14px,1.8vw,24px) 0 0',
          }}>A live performance of piano, synthesis, projection and quadraphonic sound.</p>
        </div>

        {/* Oliveros epigraph — sits in the gap between strap and date */}
        <p className="ul-quote" style={{
          fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
          fontSize: 'clamp(19px,2.4vw,30px)', lineHeight: 1.35, color: ACCENT,
          maxWidth: '32ch', margin: 0,
        }}>
          &ldquo;To listen is to open to the possibility of change.&rdquo;
          <span style={{
            display: 'block', fontFamily: SANS, fontStyle: 'normal', fontSize: 10,
            letterSpacing: '.32em', textTransform: 'uppercase', color: FAINT, marginTop: 12,
          }}>Pauline Oliveros</span>
        </p>

        {/* Bottom — date/venue + links */}
        <div className="ul-bottom" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px,2.2vw,30px)' }}>
          <div className="ul-botrow" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{
                fontFamily: DISP, fontWeight: 700, fontSize: 'clamp(28px,4.8vw,58px)',
                lineHeight: .95, letterSpacing: '.01em', color: INK,
              }}>
                <span style={{ color: ACCENT }}>Sun 20 Sep</span> 2026
              </div>
              <div style={{ fontFamily: DISP, fontWeight: 500, fontSize: 'clamp(14px,1.7vw,21px)', letterSpacing: '.06em' }}>
                2 – 4 PM
              </div>
              <div style={{
                fontFamily: SANS, fontSize: 'clamp(11px,1.1vw,13px)', letterSpacing: '.22em',
                textTransform: 'uppercase', color: MUTED, marginTop: 4,
              }}>KCR Academy Barn · Dalgarven Mill · KA13 6PL</div>
            </div>

            {!printMode && (
              <a className="ul-cta" href="/urlar/tickets" style={{
                fontFamily: SANS, fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase',
                color: INK, textDecoration: 'none', borderBottom: `1px solid ${ACCENT}`,
                paddingBottom: 5, whiteSpace: 'nowrap',
              }}>Tickets &amp; updates →</a>
            )}
          </div>

          {!printMode && (
            <div style={{ textAlign: 'center' }}>
              <a className="ul-printlink" href="/urlar-poster.pdf" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: SANS, fontSize: 9.5, letterSpacing: '.3em', textTransform: 'uppercase',
                color: FAINT, textDecoration: 'none', transition: 'color .2s',
              }}>Download poster (PDF)</a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
