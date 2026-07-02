'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';

const MANIFEST =
  'https://customer-3aa0vwfgpylhsylu.cloudflarestream.com/9510de9cffc769d1720604298dc57895/manifest/video.m3u8';
const THUMBNAIL =
  'https://customer-3aa0vwfgpylhsylu.cloudflarestream.com/9510de9cffc769d1720604298dc57895/thumbnails/thumbnail.jpg?time=8s&height=1080';
const TRACK_URL =
  'https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/resonant-beings/internal-logic-middle.m4a';
const CAPTURE_URL = 'https://giles-engine.gileslamb.workers.dev/capture';
const CONSENT_TEXT =
  'Occasional updates from Giles Lamb about Ùrlar. No spam, unsubscribe any time.';
const FADE = 1.2;

const INK = '#F5F3ED';
const MUTED = 'rgba(245,243,237,.72)';
const FAINT = 'rgba(245,243,237,.5)';
const LINE = 'rgba(245,243,237,.28)';
const LINE_SOFT = 'rgba(245,243,237,.14)';
const ACCENT = '#E7A75E';

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
  const [formState, setFormState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [formError, setFormError] = useState('');

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

  /* Cloudflare Stream crossfade */
  useEffect(() => {
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

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    if (!email) { setFormError('Please enter your email.'); return; }
    setFormState('sending');
    setFormError('');
    try {
      const res = await fetch(CAPTURE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          source: 'urlar',
          source_detail: 'urlar',
          consent_text: CONSENT_TEXT,
          consent_at: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setFormState('done');
    } catch {
      setFormState('error');
      setFormError('Something went wrong. Please try again.');
    }
  }, []);

  return (
    <>
      <style>{`
        .ul-top   { opacity:0; animation:ul-rise 1s .2s cubic-bezier(.2,.7,.2,1) forwards; }
        .ul-h1    { opacity:0; animation:ul-rise 1.1s .36s cubic-bezier(.2,.7,.2,1) forwards; }
        .ul-ph    { opacity:0; animation:ul-rise 1.1s .50s cubic-bezier(.2,.7,.2,1) forwards; }
        .ul-strap { opacity:0; animation:ul-rise 1.1s .62s cubic-bezier(.2,.7,.2,1) forwards; }
        .ul-bio   { opacity:0; animation:ul-rise 1.1s .78s cubic-bezier(.2,.7,.2,1) forwards; }
        .ul-quote { opacity:0; animation:ul-rise 1.1s .68s cubic-bezier(.2,.7,.2,1) forwards; }
        .ul-bottom{ opacity:0; animation:ul-rise 1.1s .82s cubic-bezier(.2,.7,.2,1) forwards; }
        @keyframes ul-rise{ from{ opacity:0; transform:translateY(16px);} to{ opacity:1; transform:none;} }
        .ul-r1{ animation:ul-ripple 6s ease-in-out infinite; transform-origin:32px 32px; }
        .ul-r2{ animation:ul-ripple 6s ease-in-out .8s infinite; transform-origin:32px 32px; }
        .ul-r3{ animation:ul-ripple 6s ease-in-out 1.6s infinite; transform-origin:32px 32px; }
        @keyframes ul-ripple{ 0%,100%{ opacity:.18; transform:scale(.96);} 45%{ opacity:.6; transform:scale(1.02);} }
        .ul-eq-ring.on{ animation:ul-pulse 2.4s ease-out infinite; }
        @keyframes ul-pulse{ 0%{ opacity:.5; transform:scale(1);} 100%{ opacity:0; transform:scale(1.4);} }
        @media (prefers-reduced-motion:reduce){ .ul-r1,.ul-r2,.ul-r3{ animation:none!important; } }
        @media (max-width:720px){
          .ul-bottomrow{ flex-direction:column!important; align-items:stretch!important; }
          .ul-quotebox{ position:static!important; transform:none!important; text-align:left!important; max-width:100%!important; margin:18px 0 0!important; }
        }
        .ul-btn:hover{ background:#fff!important; transform:translateY(-1px)!important; }
        .ul-atoggle:hover{ background:rgba(245,243,237,.18)!important; transform:scale(1.05)!important; }
      `}</style>

      {/* Video background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden',
        background: `#05070a url(${THUMBNAIL}) center/cover no-repeat`,
      }}>
        <video
          ref={vidARef}
          muted playsInline preload="auto"
          poster={THUMBNAIL}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity 1.2s linear', willChange: 'opacity' }}
        />
        <video
          ref={vidBRef}
          muted playsInline preload="auto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity 1.2s linear', willChange: 'opacity' }}
        />
      </div>

      {/* Scrim */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: [
          'linear-gradient(to right,rgba(4,7,12,.62) 0%,rgba(4,7,12,.28) 42%,rgba(4,7,12,0) 70%)',
          'linear-gradient(to top,rgba(4,7,12,.72) 0%,rgba(4,7,12,.15) 40%,rgba(4,7,12,.1) 100%)',
          'radial-gradient(120% 90% at 50% 40%,transparent 55%,rgba(4,7,12,.4))',
        ].join(','),
      }} />

      {/* Watermark */}
      <svg aria-hidden="true" viewBox="0 0 64 64" fill="none" style={{
        position: 'fixed', zIndex: 2, right: '-14vw', top: '50%', transform: 'translateY(-50%)',
        width: '60vw', height: '60vw', color: INK, opacity: 0.05, pointerEvents: 'none',
      }}>
        <circle cx="32" cy="32" r="2.6" fill="currentColor"/>
        <circle cx="32" cy="32" r="9"  stroke="currentColor" strokeWidth=".5"/>
        <circle cx="32" cy="32" r="17" stroke="currentColor" strokeWidth=".5"/>
        <circle cx="32" cy="32" r="25" stroke="currentColor" strokeWidth=".5"/>
        <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth=".5"/>
      </svg>

      {/* Hairline frame */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 'clamp(16px,2.2vw,28px)', zIndex: 4, pointerEvents: 'none' }}>
        <span style={{ position: 'absolute', left: 0, right: 0, top: 0,    height: 1, background: LINE_SOFT }} />
        <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: LINE_SOFT }} />
        <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0,   width: 1,  background: LINE_SOFT }} />
        <span style={{ position: 'absolute', top: 0, bottom: 0, right: 0,  width: 1,  background: LINE_SOFT }} />
        {(['tl','tr','bl','br'] as const).map(corner => (
          <span key={corner} style={{
            position: 'absolute',
            ...(corner[0] === 't' ? { top: 0 } : { bottom: 0 }),
            ...(corner[1] === 'l' ? { left: 0 } : { right: 0 }),
            width: 8, height: 8,
          }}>
            <span style={{ position: 'absolute', width: 8, height: 1, background: LINE, ...(corner[0] === 't' ? { top: 0 } : { bottom: 0 }) }} />
            <span style={{ position: 'absolute', width: 1, height: 8, background: LINE, ...(corner[1] === 'l' ? { left: 0 } : { right: 0 }) }} />
          </span>
        ))}
        <span style={{
          position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
          fontFamily: SANS, fontSize: 9, letterSpacing: '.34em', color: FAINT, textTransform: 'uppercase',
        }}>Ùrlar · 20.09.26 · Ayrshire</span>
      </div>

      {/* Audio toggle */}
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
      <audio ref={audioRef} src={TRACK_URL} loop preload="auto" />

      {/* Content */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 5,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: 'clamp(34px,4.5vw,64px)',
        fontFamily: SANS, color: INK,
      }}>
        {/* Brand — top */}
        <div className="ul-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <svg viewBox="0 0 64 64" fill="none" aria-hidden="true"
              style={{ width: 'clamp(46px,4.8vw,64px)', height: 'clamp(46px,4.8vw,64px)', flex: 'none', color: INK }}
            >
              <circle cx="32" cy="32" r="2.6" fill="currentColor"/>
              <circle className="ul-r1" cx="32" cy="32" r="9"  stroke="currentColor" strokeWidth="1.1" opacity=".7"/>
              <circle className="ul-r2" cx="32" cy="32" r="17" stroke="currentColor" strokeWidth="1"   opacity=".45"/>
              <circle className="ul-r3" cx="32" cy="32" r="25" stroke="currentColor" strokeWidth="1"   opacity=".25"/>
              <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="1" opacity=".12"/>
            </svg>
            <div>
              <div style={{ fontFamily: DISP, fontWeight: 600, fontSize: 'clamp(22px,2.6vw,30px)', letterSpacing: '.05em', lineHeight: 1.05 }}>
                Giles Lamb
              </div>
              <small style={{
                display: 'block', fontFamily: SANS, fontWeight: 400,
                fontSize: 'clamp(11px,1.1vw,13px)', letterSpacing: '.42em',
                textTransform: 'uppercase', color: FAINT, marginTop: 8,
              }}>Live</small>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div style={{ maxWidth: 'min(92vw,860px)' }}>
          {/* Headword + bracketed gloss, side-by-side on desktop, stacked on mobile */}
          <div className="ul-h1" style={{
            display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap',
            gap: 'clamp(12px,1.8vw,28px)', margin: 0,
          }}>
            <h1 style={{
              fontFamily: SERIF, fontWeight: 300, fontStyle: 'italic',
              fontSize: 'clamp(68px,11vw,140px)', lineHeight: .88, letterSpacing: '-.01em',
              textShadow: '0 2px 48px rgba(0,0,0,.5)', margin: 0, color: INK, flex: 'none',
            }}>Ùrlar</h1>
            <p style={{
              fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
              fontSize: 'clamp(11px,1.1vw,14px)', lineHeight: 1.75, color: FAINT,
              maxWidth: '20ch', margin: 0, paddingBottom: '0.12em',
            }}>[ ground; floor — the foundational theme of a pibroch, the classical theme-and-variations art music of the Highland bagpipe ]</p>
          </div>

          {/* Phonetic */}
          <p className="ul-ph" style={{
            fontFamily: SANS,
            fontWeight: 300,
            fontSize: 'clamp(10px,1vw,12px)',
            letterSpacing: '.26em',
            color: FAINT,
            margin: 'clamp(10px,1.2vw,16px) 0 0',
          }}>/ˈuːr-lər/ · OOR-lar</p>

          {/* Strap */}
          <p className="ul-strap" style={{
            fontFamily: DISP,
            fontWeight: 400,
            fontSize: 'clamp(18px,2.4vw,30px)',
            lineHeight: 1.35,
            color: INK,
            maxWidth: '26ch',
            margin: 'clamp(14px,1.8vw,24px) 0 0',
          }}>A live transmedia performance. Piano, synthesis, projection and quadraphonic sound.</p>
        </div>

        {/* Right-side column — Oliveros epigraph */}
        <div className="ul-quotebox ul-quote" style={{
          position: 'absolute', right: 'clamp(34px,4.5vw,64px)', top: '50%', transform: 'translateY(-50%)',
          maxWidth: '22ch', textAlign: 'right',
        }}>
          <p style={{ fontFamily: SERIF, fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(17px,2vw,24px)', lineHeight: 1.45, color: ACCENT }}>
            "To listen is to open to the possibility of change."
          </p>
          <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '.32em', textTransform: 'uppercase', color: FAINT, marginTop: 12 }}>
            Pauline Oliveros
          </p>
        </div>

        {/* Bottom — bio + date/venue + sign-up */}
        <div className="ul-bottom" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(22px,3vw,42px)' }}>
          <p className="ul-bio" style={{ fontSize: 'clamp(17px,2.2vw,25px)', fontWeight: 300, lineHeight: 1.5, color: MUTED, maxWidth: '40ch' }}>
            Award-winning composer and improviser Giles Lamb. With a background in neuroscience and psychology, he shapes music and visuals, live, into a deep listening experience.
          </p>

          <div className="ul-bottomrow" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 28 }}>
            <div style={{ fontSize: 13, letterSpacing: '.04em', color: MUTED }}>
              <strong style={{ fontWeight: 500, color: INK, display: 'block', fontSize: 15, marginBottom: 3 }}>
                Sunday 20 September 2026, 2–4pm
              </strong>
              KCR Academy Barn, Dalgarven Mill, KA13 6PL
            </div>

            {/* Sign-up */}
            <div style={{ width: '100%', maxWidth: 380 }}>
              <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase', color: ACCENT, marginBottom: 14 }}>
                Be first to know when tickets open
              </p>
              {formState === 'done' ? (
                <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 20, padding: '10px 0' }}>
                  Thank you. You&rsquo;re on the list.
                </p>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <input name="name" type="text" placeholder="Name (optional)" autoComplete="name" style={fieldStyle} />
                    <input name="email" type="email" placeholder="Email" required autoComplete="email" style={fieldStyle} />
                  </div>
                  {formError && (
                    <p style={{ color: ACCENT, fontSize: 12, margin: '4px 0 8px', fontFamily: SANS }}>{formError}</p>
                  )}
                  <button className="ul-btn" type="submit" disabled={formState === 'sending'} style={{
                    width: '100%', marginTop: 6,
                    background: INK, color: '#0a0d12', border: 'none',
                    padding: '13px 20px', cursor: formState === 'sending' ? 'wait' : 'pointer',
                    fontFamily: SANS, fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase',
                    transition: 'transform .2s,background .25s',
                  }}>
                    {formState === 'sending' ? 'Sending…' : 'Notify me'}
                  </button>
                  <p style={{ fontFamily: SANS, fontSize: 10, lineHeight: 1.6, color: FAINT, marginTop: 12 }}>
                    {CONSENT_TEXT}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(245,243,237,.06)',
  border: 'none',
  borderBottom: `1px solid ${LINE}`,
  padding: '12px 10px',
  fontFamily: SANS,
  fontSize: 14,
  color: INK,
  marginBottom: 10,
  backdropFilter: 'blur(2px)',
  outline: 'none',
};
