'use client';

import { useEffect, useState } from 'react';
import styles from './list.module.css';

type State = 'idle' | 'submitting' | 'done';

const SR_ONLY: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
};

export default function ListClient() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');

  /* Site cursor is a custom dot; restore the real one over the form. */
  useEffect(() => {
    document.body.classList.add('list-mode');
    return () => document.body.classList.remove('list-mode');
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const value = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setError('A valid email, please.');
      return;
    }

    setState('submitting');
    try {
      const res = await fetch('/api/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setState('done');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try again in a moment.');
      setState('idle');
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
          Occasional emails about live dates and new releases. Ùrlar plays to rooms of
          twenty or so, and dates go out here first.
        </p>

        {state === 'done' ? (
          <p className={styles.done} role="status">
            Thank you. You&rsquo;re on the list.
          </p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label htmlFor="list-email" style={SR_ONLY}>
              Email address
            </label>
            <input
              id="list-email"
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
