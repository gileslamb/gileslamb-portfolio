'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import styles from './card.module.css';

interface CardProps {
  event: string;
  eventName: string;
  accent: string;
  stingUrl: string | null;
  captureEndpoint: string;
  turnstileSiteKey: string;
}

/* ---- WebGL shader (domain-warped flow, audio-reactive) — reused from prototype ---- */
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;
const FRAG = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform float uLevel;
uniform float uBass;
uniform float uPulse;
uniform vec3  uAccent;
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v=0.,a=0.5;
  for(int i=0;i<5;i++){v+=a*noise(p);p*=2.02;a*=0.5;}
  return v;
}
void main(){
  vec2 p=(gl_FragCoord.xy-0.5*uRes.xy)/uRes.y;
  float t=uTime*0.06;
  float warp=0.55+uLevel*1.4+uBass*0.7+uPulse*1.0;
  vec2 q=vec2(fbm(p*1.4+vec2(0.0,t)),fbm(p*1.4+vec2(5.2,-t)));
  vec2 r=vec2(fbm(p*1.4+warp*q+vec2(1.7,9.2)+t*0.55),
              fbm(p*1.4+warp*q+vec2(8.3,2.8)-t*0.45));
  float f=fbm(p*1.4+warp*r);

  /* sci-fi palette — visible even before audio kicks in */
  vec3 deep =vec3(0.03,0.06,0.13);
  vec3 mid  =vec3(0.07,0.20,0.30);
  vec3 bright=vec3(0.12,0.38,0.52);
  vec3 glow =uAccent;

  float energy=clamp(uLevel*1.6+uBass*1.1+uPulse*1.3,0.0,1.0);
  vec3 col=mix(deep,mid,smoothstep(0.18,0.72,f));
  col=mix(col,bright,smoothstep(0.58,0.92,f)*0.55);
  col=mix(col,glow,smoothstep(0.65,0.98,f)*(0.22+energy*0.65));

  /* ambient bloom so shader is always legible */
  float d=length(p*vec2(uRes.x/uRes.y,1.0));
  col+=mid*0.18*smoothstep(1.1,0.0,d);
  col+=glow*(0.07+uBass*0.28+uPulse*0.18)*smoothstep(0.85,0.0,d);

  /* lighter vignette */
  col*=1.0-0.32*smoothstep(0.42,1.3,d);
  col+=hash(gl_FragCoord.xy+uTime)*0.035-0.017;
  gl_FragColor=vec4(col,1.0);
}`;

function hexToRGB(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.substring(0, 2), 16) / 255,
    parseInt(h.substring(2, 4), 16) / 255,
    parseInt(h.substring(4, 6), 16) / 255,
  ];
}

const CONSENT_TEXT =
  'Happy for Giles Lamb to be in touch about my enquiry. No mailing lists, no automation.';

export default function CardClient({
  event,
  eventName,
  accent,
  stingUrl,
  captureEndpoint,
  turnstileSiteKey,
}: CardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioControlRef = useRef<{
    sample: () => void;
    toggle: () => boolean;
    muted: boolean;
  } | null>(null);
  const audioDataRef = useRef({ level: 0, bass: 0, pulse: 0 });
  const barsRef = useRef<HTMLSpanElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileTokenRef = useRef('');
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const audioMutedRef = useRef(false);

  const [entered, setEntered] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'done'>('idle');
  const [formError, setFormError] = useState('');

  /* ---- Suppress site cursor + lock scroll on body ---- */
  useEffect(() => {
    document.body.classList.add('card-mode');
    return () => document.body.classList.remove('card-mode');
  }, []);

  /* ---- WebGL init + render loop ---- */
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });
    if (!gl) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 1.75);

    function makeShader(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, makeShader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, makeShader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const pLoc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(pLoc);
    gl.vertexAttribPointer(pLoc, 2, gl.FLOAT, false, 0, 0);

    const U = {
      uRes:   gl.getUniformLocation(prog, 'uRes'),
      uTime:  gl.getUniformLocation(prog, 'uTime'),
      uLevel: gl.getUniformLocation(prog, 'uLevel'),
      uBass:  gl.getUniformLocation(prog, 'uBass'),
      uPulse: gl.getUniformLocation(prog, 'uPulse'),
      uAccent:gl.getUniformLocation(prog, 'uAccent'),
    };
    const rgb = hexToRGB(accent);

    function resize() {
      const w = Math.floor(innerWidth * DPR), h = Math.floor(innerHeight * DPR);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        canvas.style.width = innerWidth + 'px';
        canvas.style.height = innerHeight + 'px';
        gl!.viewport(0, 0, w, h);
      }
    }
    window.addEventListener('resize', resize);
    resize();

    let visible = true;
    const onVis = () => { visible = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    const t0 = performance.now();
    let animId: number;
    function frame(now: number) {
      animId = requestAnimationFrame(frame);
      if (!visible) return;

      audioControlRef.current?.sample();
      const a = audioDataRef.current;

      gl!.uniform2f(U.uRes, canvas.width, canvas.height);
      gl!.uniform1f(U.uTime, (now - t0) / 1000);
      gl!.uniform1f(U.uLevel, a.level);
      gl!.uniform1f(U.uBass, a.bass);
      gl!.uniform1f(U.uPulse, a.pulse);
      gl!.uniform3f(U.uAccent, rgb[0], rgb[1], rgb[2]);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      if (!audioMutedRef.current && barsRef.current) {
        const bars = barsRef.current.querySelectorAll('i');
        bars.forEach((b, i) => {
          (b as HTMLElement).style.height =
            (3 + a.level * 9 * (0.6 + 0.4 * Math.sin(now / 120 + i))) + 'px';
        });
      }
    }
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [accent]);

  /* ---- Turnstile: mount widget after user enters ---- */
  useEffect(() => {
    if (!entered || !turnstileSiteKey || !turnstileContainerRef.current) return;
    let retryTimer: ReturnType<typeof setTimeout>;

    function tryRender() {
      const ts = (window as unknown as Record<string, unknown>).turnstile as {
        render: (el: HTMLElement, opts: object) => string;
        remove: (id: string) => void;
      } | undefined;
      if (ts && turnstileContainerRef.current) {
        turnstileWidgetId.current = ts.render(turnstileContainerRef.current, {
          sitekey: turnstileSiteKey,
          theme: 'dark',
          callback: (token: string) => { turnstileTokenRef.current = token; },
          'error-callback': () => { turnstileTokenRef.current = ''; },
          'expired-callback': () => { turnstileTokenRef.current = ''; },
        });
      } else {
        retryTimer = setTimeout(tryRender, 300);
      }
    }
    tryRender();

    return () => {
      clearTimeout(retryTimer);
      const ts = (window as unknown as Record<string, unknown>).turnstile as {
        remove: (id: string) => void;
      } | undefined;
      if (ts && turnstileWidgetId.current) ts.remove(turnstileWidgetId.current);
    };
  }, [entered, turnstileSiteKey]);

  /* ---- Enter: unlock audio ---- */
  async function enter() {
    if (entered) return;

    const AudioCtxClass = (
      window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    );
    const ctx = new AudioCtxClass();
    const master = ctx.createGain(); master.gain.value = 0;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 1024; analyser.smoothingTimeConstant = 0.8;
    const data = new Uint8Array(analyser.frequencyBinCount);
    master.connect(analyser); analyser.connect(ctx.destination);

    function startPad() {
      const filt = ctx.createBiquadFilter();
      filt.type = 'lowpass'; filt.frequency.value = 600; filt.Q.value = 0.6;
      filt.connect(master);
      const lfo = ctx.createOscillator(), lfoG = ctx.createGain();
      lfo.frequency.value = 0.06; lfoG.gain.value = 260;
      lfo.connect(lfoG); lfoG.connect(filt.frequency); lfo.start();
      ([110, 164.81, 220] as const).forEach((f, i) => {
        const o = ctx.createOscillator();
        o.type = i === 2 ? 'triangle' : 'sawtooth';
        o.frequency.value = f; o.detune.value = (i - 1) * 7;
        const g = ctx.createGain(); g.gain.value = i === 2 ? 0.06 : 0.10;
        o.connect(g); g.connect(filt); o.start();
      });
    }

    if (stingUrl) {
      try {
        const buf = await fetch(stingUrl).then(r => r.arrayBuffer()).then(b => ctx.decodeAudioData(b));
        const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
        src.connect(master); src.start();
      } catch { startPad(); }
    } else { startPad(); }

    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 1.4);
    audioDataRef.current = { level: 0, bass: 0, pulse: 1.0 };

    let level = 0, bass = 0, pulse = 1.0, lastLevel = 0;
    let muted = false;

    audioControlRef.current = {
      sample() {
        analyser.getByteFrequencyData(data);
        let lo = 0, all = 0;
        for (let i = 0; i < 12; i++) lo += data[i];
        for (let i = 0; i < data.length; i++) all += data[i];
        bass += (lo / (12 * 255) * 3.5 - bass) * 0.20;
        level += (all / (data.length * 255) * 4.0 - level) * 0.14;
        const rise = Math.max(0, level - lastLevel); lastLevel = level;
        pulse += (Math.min(1, rise * 6) - pulse) * 0.25;
        pulse *= 0.96;
        audioDataRef.current = {
          level: Math.min(1, level),
          bass: Math.min(1, bass),
          pulse: Math.min(1, pulse),
        };
      },
      toggle() {
        muted = !muted;
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.linearRampToValueAtTime(muted ? 0 : 0.55, ctx.currentTime + 0.3);
        return muted;
      },
      get muted() { return muted; },
    };

    setEntered(true);
  }

  /* ---- Sound toggle ---- */
  function toggleAudio() {
    const m = audioControlRef.current?.toggle();
    if (m !== undefined) {
      audioMutedRef.current = m;
      setAudioMuted(m);
    }
  }

  /* ---- Form submit ---- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');
    const name = nameRef.current?.value.trim() ?? '';
    const email = emailRef.current?.value.trim() ?? '';

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setFormError('A valid email, please.');
      return;
    }
    if (turnstileSiteKey && !turnstileTokenRef.current) {
      setFormError('Please complete the verification.');
      return;
    }

    setFormState('submitting');

    const payload: Record<string, string> = {
      name,
      email,
      source: 'card',
      source_detail: event,
      consent_text: CONSENT_TEXT,
      consent_at: new Date().toISOString(),
    };
    if (turnstileSiteKey) payload.turnstileToken = turnstileTokenRef.current;

    try {
      if (captureEndpoint) {
        const res = await fetch(captureEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.ok) throw new Error(json.error ?? 'bad status ' + res.status);
      } else {
        console.info('[demo] captureEndpoint not set — payload:', payload);
        await new Promise(r => setTimeout(r, 500));
      }
      setFormState('done');
    } catch (err) {
      console.error(err);
      setFormError('Something went wrong. Try again in a moment.');
      setFormState('idle');
      const ts = (window as unknown as Record<string, unknown>).turnstile as {
        reset: (id: string) => void;
      } | undefined;
      if (ts && turnstileWidgetId.current) {
        ts.reset(turnstileWidgetId.current);
        turnstileTokenRef.current = '';
      }
    }
  }

  const pageStyle = { '--card-accent': accent } as React.CSSProperties;

  return (
    <div className={styles.page} style={pageStyle}>
      {/* Turnstile script — loads in background while user reads the gate */}
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
      )}

      <canvas ref={canvasRef} className={styles.gl} aria-hidden="true" />
      <div className={styles.veil} aria-hidden="true" />

      <div className={styles.stage}>
        {/* Enter gate */}
        <div
          className={`${styles.gate}${entered ? ' ' + styles.gone : ''}`}
          onClick={enter}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') enter(); }}
          role="button"
          tabIndex={0}
          aria-label="Enter"
        >
          <div className={styles.gateMark}>Giles Lamb</div>
          <div className={styles.gateRing} aria-hidden="true">
            <span className={styles.gateDot} />
          </div>
          <div className={styles.gatePrompt}>Touch to begin</div>
        </div>

        {/* Card */}
        <div
          className={`${styles.card}${entered ? ' ' + styles.in : ''}`}
          aria-hidden={!entered}
        >
          <div className={`${styles.eyebrow} ${styles.reveal} ${styles.r1}`}>
            <span>Composer</span>
            <span className={styles.bar} />
            {eventName && <span>{eventName}</span>}
          </div>

          <h1 className={`${styles.name} ${styles.reveal} ${styles.r1}`}>Giles Lamb</h1>
          <div className={`${styles.role} ${styles.reveal} ${styles.r1}`}>Composer</div>

          <div className={styles.pitch}>
            <div className={`${styles.lede} ${styles.reveal} ${styles.r2}`}>
              For when the brief needs more than a soundtrack.
            </div>
            <div className={`${styles.scope} ${styles.reveal} ${styles.r3}`}>
              Film, animation, games, immersive. And the strange in-between.
            </div>
            <div className={`${styles.invite} ${styles.reveal} ${styles.r3}`}>
              Tell me what you&rsquo;re making.
            </div>
          </div>

          <div className={`${styles.credits} ${styles.reveal} ${styles.r4}`}>
            <div className={styles.cr}>
              <b className={styles.crTitle}>Dead Island</b>
              <span className={styles.crDetail}>Cannes Lions Gold trailer</span>
            </div>
            <div className={styles.cr}>
              <b className={styles.crTitle}>Valhalla Rising</b>
              <span className={styles.crDetail}>feature film</span>
            </div>
            <div className={styles.cr}>
              <b className={styles.crTitle}>Distance to the Moon</b>
              <span className={styles.crDetail}>BFI / Screen Scotland</span>
            </div>
            <div className={styles.cr}>
              <b className={styles.crTitle}>The Brilliant World of Tom Gates</b>
              <span className={styles.crDetail}>Sky Kids · animation</span>
            </div>
            <div className={styles.awards}>BAFTA · RTS · Music &amp; Sound Awards</div>
          </div>

          <div className={`${styles.reveal} ${styles.r5}`}>
            {formState === 'done' ? (
              <div className={styles.done}>
                <div className={styles.doneBig}>Thanks. I&rsquo;ll be in touch.</div>
                <div className={styles.doneSub}>
                  In the meantime:{' '}
                  <a href="https://gileslamb.com">gileslamb.com</a>
                </div>
              </div>
            ) : (
              <div className={styles.formPanel}>
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <input
                    ref={nameRef}
                    className={styles.input}
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                  />
                  <input
                    ref={emailRef}
                    className={styles.input}
                    type="email"
                    autoComplete="email"
                    placeholder="Your email"
                    required
                  />
                </div>

                {turnstileSiteKey && (
                  <div className={styles.turnstileWrap}>
                    <div ref={turnstileContainerRef} />
                  </div>
                )}

                <button
                  className={styles.sendBtn}
                  type="submit"
                  disabled={formState === 'submitting'}
                >
                  {formState === 'submitting' ? 'Sending…' : "Let’s talk"}
                </button>

                <div className={styles.err} aria-live="polite">{formError}</div>

                <p className={styles.consent}>
                  By sharing your details you&rsquo;re happy for Giles Lamb to be in touch
                  about your enquiry. No mailing lists, no automation.{' '}
                  <a href="/privacy" target="_blank" rel="noopener">Privacy</a>
                </p>
              </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.evName}>{eventName || 'Giles Lamb'}</span>
        <button
          className={`${styles.audioBtn}${audioMuted ? ' ' + styles.audioOff : ''}`}
          onClick={toggleAudio}
          aria-label="Toggle sound"
        >
          <span className={styles.bars} ref={barsRef}>
            <i /><i /><i /><i />
          </span>
          <span>{audioMuted ? 'Sound off' : 'Sound on'}</span>
        </button>
      </div>
    </div>
  );
}
