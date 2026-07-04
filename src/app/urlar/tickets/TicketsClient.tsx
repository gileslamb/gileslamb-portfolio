'use client';

import { useCallback, useState } from 'react';

const CAPTURE_URL = 'https://giles-engine.gileslamb.workers.dev/capture';
const CONSENT_TEXT =
  'Occasional updates from Giles Lamb about Ùrlar. No spam, unsubscribe any time.';

const INK = '#F5F3ED';
const MUTED = 'rgba(245,243,237,.82)';
const FAINT = 'rgba(245,243,237,.55)';
const LINE = 'rgba(245,243,237,.24)';
const ACCENT = '#E7A75E';
const BG = '#05070a';

/* Cormorant Garamond is loaded by the root layout as --font-hero-name */
const SERIF = 'var(--font-hero-name,"Cormorant Garamond",Georgia,serif)';
const SANS = 'var(--font-sg,"Space Grotesk",-apple-system,sans-serif)';

export default function TicketsClient() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [formError, setFormError] = useState('');

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
    <div style={{
      minHeight: '100vh', background: BG, color: INK, fontFamily: SANS,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(40px,6vw,90px) 24px',
    }}>
      <style>{`
        .ul-field::placeholder{ color:${FAINT}; }
        .ul-field:focus{ border-bottom-color:${ACCENT}; }
        .ul-notify:hover{ background:#fff; }
        .ul-back:hover{ color:${INK}; }
        @media (max-width:720px){ .ul-rowf{ flex-direction:column!important; } }
      `}</style>

      <div style={{ maxWidth: 600, width: '100%' }}>
        <a href="/urlar" className="ul-back" style={{
          fontFamily: SANS, fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase',
          color: FAINT, textDecoration: 'none', display: 'inline-block', marginBottom: 36,
          transition: 'color .2s',
        }}>← Ùrlar</a>

        <div style={{
          fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(48px,8vw,86px)', lineHeight: .9,
        }}>Ùrlar</div>

        <p style={{
          fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(13px,1.4vw,16px)',
          lineHeight: 1.7, color: FAINT, marginTop: 16, maxWidth: '52ch',
        }}>[Scottish Gaelic — <span style={{ color: MUTED }}>ground</span>; the foundational theme of a pibroch, from which every variation departs and to which it returns.] /ˈuːr-lər/ · OOR-lar</p>

        <p style={{
          fontSize: 'clamp(15px,1.7vw,18px)', fontWeight: 300, lineHeight: 1.6,
          color: MUTED, marginTop: 34, maxWidth: '48ch',
        }}>A deep listening experience by award-winning composer and improviser Giles Lamb. With a background in neuroscience and psychology, Giles creates sound and music for some of the world&rsquo;s most iconic immersive exhibitions and experiences, and for landmark titles in games and film.</p>

        <p style={{
          fontFamily: SANS, fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase',
          color: ACCENT, margin: '44px 0 16px',
        }}>Be first to know when tickets open</p>

        {formState === 'done' ? (
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 24, padding: '10px 0' }}>
            Thank you. You&rsquo;re on the list.
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="ul-rowf" style={{ display: 'flex', gap: 10 }}>
              <input name="name" type="text" placeholder="Name (optional)" autoComplete="name" className="ul-field" style={fieldStyle} />
              <input name="email" type="email" placeholder="Email" required autoComplete="email" className="ul-field" style={fieldStyle} />
            </div>
            {formError && (
              <p style={{ color: ACCENT, fontSize: 12, margin: '4px 0 8px', fontFamily: SANS }}>{formError}</p>
            )}
            <button className="ul-notify" type="submit" disabled={formState === 'sending'} style={{
              width: '100%', marginTop: 6,
              background: INK, color: '#0a0d12', border: 'none',
              padding: '14px 20px', cursor: formState === 'sending' ? 'wait' : 'pointer',
              fontFamily: SANS, fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase',
              transition: 'background .2s',
            }}>
              {formState === 'sending' ? 'Sending…' : 'Notify me'}
            </button>
            <p style={{ fontFamily: SANS, fontSize: 10, lineHeight: 1.6, color: FAINT, marginTop: 14 }}>
              {CONSENT_TEXT}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(245,243,237,.06)',
  border: 'none',
  borderBottom: `1px solid ${LINE}`,
  padding: '13px 10px',
  fontFamily: SANS,
  fontSize: 14,
  color: INK,
  marginBottom: 12,
  outline: 'none',
};
