'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './list.module.css';

/* Mailing list. Posts straight to the giles-engine worker, which writes the
   `subscribers` table in D1 (not captures, not contacts). No third-party
   scripts: bots are handled by a honeypot field and the worker's rate limit.
   Double-submit safe: the button locks while a request is in flight, and the
   worker treats a repeat email as a no-op. */

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

export default function ListClient({ source }: { source: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');
  const inFlight = useRef(false);

  /* Site cursor is a custom dot; restore the real one over the form. */
  useEffect(() => {
    document.body.classList.add('list-mode');
    return () => document.body.classList.remove('list-mode');
  }, []);

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
        body: JSON.stringify({ name: name.trim(), email: value, source, website }),
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
    <div className={styles.page}>
      <a href="https://www.gileslamb.com" className={styles.back}>
        ← gileslamb.com
      </a>

      <div className={styles.inner}>
        <h1 className={styles.name}>Giles Lamb</h1>

        <p className={styles.lede}>
          Occasional emails about live dates and new releases. Dates go out here first.
        </p>

        {state === 'done' ? (
          <p className={styles.done} role="status">
            Thank you. You&rsquo;re on the list.
          </p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="source" value={source} />

            {/* Honeypot: hidden from people and screen readers, filled by bots. */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
              <label htmlFor="list-website">Website</label>
              <input
                id="list-website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <label htmlFor="list-name" style={SR_ONLY}>
              Name
            </label>
            <input
              id="list-name"
              className={styles.input}
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              maxLength={120}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="list-email" style={SR_ONLY}>
              Email address
            </label>
            <input
              id="list-email"
              className={`${styles.input} ${styles.stacked}`}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className={styles.submit} type="submit" disabled={state === 'submitting'}>
              {state === 'submitting' ? 'Signing up…' : 'Sign up'}
            </button>
            <div className={styles.err} aria-live="polite">
              {error}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
