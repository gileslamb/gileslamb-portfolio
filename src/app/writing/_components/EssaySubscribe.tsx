'use client';

import { useRef, useState } from 'react';
import styles from './EssaySubscribe.module.css';

/* Inline "new essays by email" box for /writing and every essay. Same
   endpoint, honeypot, validation and in-flight lock as /list (ListClient),
   writing to D1 `subscribers` via the giles-engine worker. No name field.
   The worker only keeps sources matching ^[a-z0-9-]{1,40}$ (anything else
   is stored as "site"), so essay pages pass "essay-<slug>" cut to 40. */

const SUBSCRIBE_ENDPOINT =
  process.env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT ??
  'https://giles-engine.gileslamb.workers.dev/subscribe';

type State = 'idle' | 'submitting' | 'done';

const SR_ONLY: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
};

export default function EssaySubscribe({ source, rule = false }: { source: string; rule?: boolean }) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');
  const inFlight = useRef(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inFlight.current) return;
    setError('');

    const value = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setError('A valid email, please.');
      return;
    }

    inFlight.current = true;
    setState('submitting');
    try {
      const res = await fetch(SUBSCRIBE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '', email: value, source, website }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setState('done');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try again in a moment.');
      setState('idle');
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <aside className={`${styles.box}${rule ? ` ${styles.rule}` : ''}`} aria-labelledby={`sub-${source}`}>
      <h2 id={`sub-${source}`} className={styles.heading}>
        New essays, by email
      </h2>

      {state === 'done' ? (
        <p className={styles.done} role="status">
          Thanks. You&rsquo;re on the list.
        </p>
      ) : (
        <>
          <p className={styles.line}>Every so often, straight from me. No noise.</p>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* Honeypot: hidden from people and screen readers, filled by bots. */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
              <label htmlFor={`${source}-website`}>Website</label>
              <input
                id={`${source}-website`}
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <label htmlFor={`${source}-email`} style={SR_ONLY}>
              Email address
            </label>
            <input
              id={`${source}-email`}
              className={styles.input}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className={styles.submit} type="submit" disabled={state === 'submitting'}>
              {state === 'submitting' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
          <div className={styles.err} aria-live="polite">
            {error}
          </div>
        </>
      )}
    </aside>
  );
}

