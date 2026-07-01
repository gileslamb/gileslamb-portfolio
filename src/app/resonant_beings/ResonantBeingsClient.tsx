'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Nav } from '@/components/Nav';

const AUDIO_URL =
  'https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/resonant-beings/internal-logic-middle.m4a';
const CAPTURE_URL = 'https://giles-engine.gileslamb.workers.dev/capture';
const CONSENT_TEXT =
  'I agree to receive occasional updates from Giles Lamb about Resonant Beings performances. No spam — unsubscribe any time.';

/* ---- Vertex shader — fullscreen quad ---- */
const VERT = `attribute vec2 a_pos; void main(){ gl_Position=vec4(a_pos,0.,1.); }`;

/*
 * Fragment shader — GLSL translation of the Shader Park sculpture:
 *
 *   let scale = .9;
 *   let s = getRayDirection();
 *   setMaxIterations(5);
 *   let audio = input(0.0, 0, 1);
 *   let t  = time * 0.18;
 *   let t2 = time * 0.03;
 *   let a = audio * 0.5;
 *   let n = noise(getSpace()*scale + vec3(0,0,t) + fractalNoise(s*scale + vec3(0,0,t2)));
 *   color(vec3(n)*.5+.5 + normal*.2 + vec3(0,0,1) + a*vec3(0.05,0.08,0.15));
 *   sphere(.9 + .1*n + a*.06);
 *
 * Camera placed at z=-1.8 so the sphere (r≈0.9) fills the full viewport.
 */
const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2  u_res;
uniform float u_audio;

float h3(float n){return fract(sin(n)*43758.5453);}

float vnoise(vec3 p){
  vec3 i=floor(p); vec3 f=fract(p);
  vec3 u=f*f*(3.-2.*f);
  float n000=h3(i.x        +i.y*57.+i.z*113.);
  float n100=h3(i.x+1.     +i.y*57.+i.z*113.);
  float n010=h3(i.x        +(i.y+1.)*57.+i.z*113.);
  float n110=h3(i.x+1.     +(i.y+1.)*57.+i.z*113.);
  float n001=h3(i.x        +i.y*57.+(i.z+1.)*113.);
  float n101=h3(i.x+1.     +i.y*57.+(i.z+1.)*113.);
  float n011=h3(i.x        +(i.y+1.)*57.+(i.z+1.)*113.);
  float n111=h3(i.x+1.     +(i.y+1.)*57.+(i.z+1.)*113.);
  return mix(
    mix(mix(n000,n100,u.x), mix(n010,n110,u.x), u.y),
    mix(mix(n001,n101,u.x), mix(n011,n111,u.x), u.y),
    u.z);
}

float fbm(vec3 p){
  float v=0.,a=.5;
  for(int i=0;i<4;i++){v+=a*vnoise(p);p*=2.;a*=.5;}
  return v;
}

/* SDF — fn is fractalNoise(rd*scale + vec3(0,0,t2)), precomputed per pixel */
float sdf(vec3 pos, float t, float fn, float audio){
  float n=vnoise(pos*.9+vec3(0.,0.,t)+fn);
  return length(pos)-(0.9+0.1*n+audio*0.5*0.06);
}

vec3 calcNormal(vec3 pos, float t, float fn, float audio){
  const vec2 e=vec2(0.0012,0.);
  return normalize(vec3(
    sdf(pos+e.xyy,t,fn,audio)-sdf(pos-e.xyy,t,fn,audio),
    sdf(pos+e.yxy,t,fn,audio)-sdf(pos-e.yxy,t,fn,audio),
    sdf(pos+e.yyx,t,fn,audio)-sdf(pos-e.yyx,t,fn,audio)
  ));
}

void main(){
  vec2 uv=(gl_FragCoord.xy-u_res*.5)/u_res.y;

  float t  = u_time*0.18;
  float t2 = u_time*0.03;

  vec3 ro=vec3(0.,0.,-1.8);
  vec3 rd=normalize(vec3(uv,1.));

  /* fractalNoise(rd*scale + vec3(0,0,t2)) — constant per pixel, varies per view ray */
  float fn=fbm(rd*.9+vec3(0.,0.,t2));

  /* Ray march */
  float d=0.; vec3 p=ro; bool hit=false;
  for(int i=0;i<80;i++){
    p=ro+rd*d;
    float dist=sdf(p,t,fn,u_audio);
    if(dist<0.002){hit=true;break;}
    if(d>5.)break;
    d+=max(dist,0.004);
  }

  vec3 col;
  if(hit){
    vec3 nor=calcNormal(p,t,fn,u_audio);
    float n=vnoise(p*.9+vec3(0.,0.,t)+fn);
    /* Exact shader-park color formula */
    col=vec3(n)*.5+.5 + nor*.2 + vec3(0.,0.,1.) + u_audio*.5*vec3(.05,.08,.15);
    col=col/(col+1.); /* Reinhard tone map — blue channel saturates without this */
    col*=.76;         /* subtle darkening for meditative quality */
  } else {
    col=vec3(.006,.006,.022);
  }

  /* Film grain */
  float g=fract(sin(dot(gl_FragCoord.xy,vec2(127.1,311.7))+u_time*7.3)*43758.5453);
  col+=(g-.5)*.015;

  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}`;

/* ---- Shared input style ---- */
const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(212,201,184,0.15)',
  color: '#d4c9b8',
  fontFamily: 'Karla, sans-serif',
  fontSize: '0.8rem',
  fontWeight: 300,
  letterSpacing: '0.02em',
  padding: '0.75rem 1rem',
  outline: 'none',
  width: '100%',
  borderRadius: 0,
};

export function ResonantBeingsClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const rafRef = useRef<number>(0);
  const audioLevelRef = useRef(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const isListeningRef = useRef(false);

  const [muted, setMuted] = useState(true);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  /* ---- WebGL setup & render loop ---- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;

    function compile(type: number, src: string) {
      const sh = gl!.createShader(type)!;
      gl!.shaderSource(sh, src);
      gl!.compileShader(sh);
      return sh;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime  = gl.getUniformLocation(prog, 'u_time');
    const uRes   = gl.getUniformLocation(prog, 'u_res');
    const uAudio = gl.getUniformLocation(prog, 'u_audio');

    let cw = 0, ch = 0;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const nw = Math.floor(canvas!.offsetWidth  * dpr);
      const nh = Math.floor(canvas!.offsetHeight * dpr);
      if (nw === cw && nh === ch) return;
      cw = nw; ch = nh;
      canvas!.width = cw; canvas!.height = ch;
      gl!.viewport(0, 0, cw, ch);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const start = performance.now();

    function render() {
      if (document.hidden) { rafRef.current = requestAnimationFrame(render); return; }

      /* Sample analyser → EMA */
      if (isListeningRef.current && analyserRef.current && dataRef.current) {
        analyserRef.current.getByteFrequencyData(dataRef.current);
        let sum = 0;
        for (let i = 0; i < dataRef.current.length; i++) sum += dataRef.current[i];
        const rms = sum / dataRef.current.length / 255;
        audioLevelRef.current = audioLevelRef.current * 0.88 + rms * 0.12;
      } else {
        audioLevelRef.current *= 0.95; /* decay to 0 when not listening */
      }

      const t = (performance.now() - start) / 1000;
      gl!.uniform1f(uTime,  t);
      gl!.uniform2f(uRes,   cw, ch);
      gl!.uniform1f(uAudio, audioLevelRef.current);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  /* ---- Listen / mute toggle ---- */
  const handleUnmute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      if (!analyserRef.current) {
        /* First interaction — wire up Web Audio graph */
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        ctx.resume();
        const src     = ctx.createMediaElementSource(audio);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        const gain = ctx.createGain();
        gain.gain.value = 1;
        src.connect(analyser);
        analyser.connect(gain);
        gain.connect(ctx.destination);
        analyserRef.current = analyser;
        gainRef.current     = gain;
        dataRef.current     = new Uint8Array(analyser.frequencyBinCount);
        audio.play().catch(() => {});
      } else {
        gainRef.current!.gain.value = 1;
        audio.play().catch(() => {});
      }
      isListeningRef.current = true;
      setMuted(false);
    } else {
      gainRef.current!.gain.value = 0;
      audio.pause();
      isListeningRef.current = false;
      setMuted(true);
    }
  }, [muted]);

  /* ---- Form submit ---- */
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name  = (form.elements.namedItem('name')  as HTMLInputElement).value.trim();
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
          source:       'resonant-beings',
          source_detail: 'resonant-beings',
          consent_text: CONSENT_TEXT,
          consent_at:   new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error('Network error');
      setFormState('done');
    } catch {
      setFormState('error');
      setFormError('Something went wrong. Please try again.');
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#080810', position: 'relative' }}>

      {/* Full-viewport shader canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          zIndex: 0,
          display: 'block',
        }}
      />

      {/* Gradient overlay — readability for lower-half content */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          height: '65vh',
          background: 'linear-gradient(to top, rgba(8,8,16,0.94) 0%, rgba(8,8,16,0.62) 45%, transparent 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Site nav */}
      <Nav />

      {/* Listen/mute button — top-right corner */}
      <button
        onClick={handleUnmute}
        aria-label={muted ? 'Unmute audio' : 'Mute audio'}
        style={{
          position: 'fixed',
          top: '1.6rem',
          right: '1.8rem',
          zIndex: 200,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: muted ? 'rgba(212,201,184,0.4)' : 'rgba(201,169,110,0.9)',
          fontFamily: 'Karla, sans-serif',
          fontSize: '0.58rem',
          fontWeight: 300,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          padding: '0.4rem 0',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'color 0.5s ease',
        }}
      >
        <span
          style={{
            width: '5px', height: '5px',
            borderRadius: '50%',
            background: muted ? 'rgba(212,201,184,0.25)' : '#c9a96e',
            display: 'inline-block',
            transition: 'background 0.5s ease',
          }}
        />
        {muted ? 'listen' : 'mute'}
      </button>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={AUDIO_URL}
        loop
        preload="auto"
      />

      {/* Page content — anchored to bottom of viewport */}
      <main
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '7rem 1.75rem 4rem',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        {/* Title block */}
        <div style={{ marginBottom: '2rem' }}>
          <p
            style={{
              fontFamily: 'Karla, sans-serif',
              fontSize: '0.54rem',
              fontWeight: 300,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#8a6f42',
              marginBottom: '0.65rem',
            }}
          >
            Giles Lamb · Live performance
          </p>
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.2rem, 7vw, 3.4rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#ede5d8',
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            Resonant Beings
          </h1>
        </div>

        <hr
          style={{
            border: 'none',
            height: '1px',
            background: 'linear-gradient(90deg, rgba(201,169,110,0.14), transparent)',
            marginBottom: '1.75rem',
          }}
        />

        {/* Lead line */}
        <p
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(1.05rem, 3vw, 1.3rem)',
            fontWeight: 300,
            color: '#d4c9b8',
            lineHeight: 1.55,
            marginBottom: '1rem',
          }}
        >
          An expansive transmedia sound world for the listening body.
        </p>

        {/* Descriptor */}
        <p
          style={{
            fontFamily: 'Karla, sans-serif',
            fontSize: '0.84rem',
            fontWeight: 300,
            color: '#8a8278',
            lineHeight: 1.72,
            letterSpacing: '0.01em',
            marginBottom: '1.75rem',
          }}
        >
          A meditative immersive performance — instruments, resonance and projected light.
        </p>

        {/* What it is */}
        <p
          style={{
            fontFamily: 'Karla, sans-serif',
            fontSize: '0.81rem',
            fontWeight: 300,
            color: 'rgba(212,201,184,0.65)',
            lineHeight: 1.78,
            marginBottom: '2rem',
          }}
        >
          Piano, electronics and voice construct a slowly evolving sonic environment. The work
          is procedural and ambient — sound folds and expands across the space. Audiences are
          invited to sit or lie down. Projection breathes onto walls, floor and ceiling; the
          room itself becomes the instrument.
        </p>

        {/* Oliveros pull quote — in Resonant Beings' voice, Oliveros as cited influence */}
        <blockquote
          style={{
            borderLeft: '1px solid rgba(201,169,110,0.22)',
            paddingLeft: '1.25rem',
            marginBottom: '1.75rem',
          }}
        >
          <p
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '0.96rem',
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#b8ad9e',
              lineHeight: 1.65,
              marginBottom: '0.6rem',
            }}
          >
            Resonant Beings draws on the deep listening tradition of Pauline Oliveros — the
            distinction between hearing and listening, the body as a resonating field, sound as
            a way of knowing.
          </p>
          <cite
            style={{
              fontFamily: 'Karla, sans-serif',
              fontSize: '0.56rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#4a4640',
              fontStyle: 'normal',
              display: 'block',
            }}
          >
            Informed by the work of Pauline Oliveros (1932–2016)
          </cite>
        </blockquote>

        {/* Essay link — placeholder */}
        <p
          style={{
            fontFamily: 'Karla, sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#4a4640',
            marginBottom: '2.5rem',
          }}
        >
          Essay ·{' '}
          <span style={{ color: '#8a8278', borderBottom: '1px solid rgba(138,130,120,0.28)', paddingBottom: '1px' }}>
            forthcoming
          </span>
        </p>

        <hr
          style={{
            border: 'none',
            height: '1px',
            background: 'linear-gradient(90deg, rgba(201,169,110,0.12), transparent)',
            marginBottom: '1.75rem',
          }}
        />

        {/* Sign-up */}
        <div>
          <p
            style={{
              fontFamily: 'Karla, sans-serif',
              fontSize: '0.58rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#8a6f42',
              marginBottom: '1.1rem',
            }}
          >
            Be first to know when tickets are available
          </p>

          {formState === 'done' ? (
            <p
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.05rem',
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#d4c9b8',
                lineHeight: 1.6,
              }}
            >
              You're on the list. We'll be in touch.
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '0.85rem' }}>
                <input
                  name="name"
                  type="text"
                  placeholder="Name (optional)"
                  autoComplete="name"
                  style={inputStyle}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  autoComplete="email"
                  style={inputStyle}
                />
              </div>

              {formError && (
                <p
                  style={{
                    color: 'rgba(201,169,110,0.75)',
                    fontSize: '0.72rem',
                    marginBottom: '0.75rem',
                    fontFamily: 'Karla, sans-serif',
                  }}
                >
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={formState === 'sending'}
                style={{
                  background: 'none',
                  border: '1px solid rgba(201,169,110,0.32)',
                  color: formState === 'sending' ? '#4a4640' : '#c9a96e',
                  fontFamily: 'Karla, sans-serif',
                  fontSize: '0.58rem',
                  fontWeight: 300,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  padding: '0.8rem 1.6rem',
                  cursor: formState === 'sending' ? 'wait' : 'pointer',
                  transition: 'color 0.3s, border-color 0.3s',
                }}
              >
                {formState === 'sending' ? 'Sending…' : 'Notify me'}
              </button>

              <p
                style={{
                  fontFamily: 'Karla, sans-serif',
                  fontSize: '0.56rem',
                  color: '#4a4640',
                  lineHeight: 1.6,
                  marginTop: '0.85rem',
                  letterSpacing: '0.01em',
                }}
              >
                {CONSENT_TEXT}
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
