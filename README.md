# Giles Lamb: Portfolio

Professional portfolio site for Giles Lamb, cinematic composer and immersive audiovisual artist.

## Tech Stack

- **Next.js** (App Router)
- **Tailwind CSS** (layout/spacing only; design via CSS variables)
- **Deploy target:** Vercel

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:4321](http://localhost:4321)

Images are served from Cloudflare Images or `public/images/`; video from Cloudflare Stream.

## Deploy on Vercel

The site is hosted on [Vercel](https://vercel.com). Every push to `main` deploys to production, so work on a branch and use its Vercel preview deployment before merging. See `CLAUDE.md` and `docs/gileslamb-site.md`.

## Structure

- `src/components/`: Nav, Hero, Practice, Work, LivePractice, Contact, Footer
- `src/app/globals.css`: CSS variables, typography (Cormorant Garamond + Karla), animations
- Single-page layout with smooth scroll anchors

## Music Releases

Static HTML release pages live in `public/releases/` and are served via Next.js rewrites (see `next.config.ts`). They are self-contained — no React, no build step. Release data for the `/releases` catalogue page lives in `src/data/releases.json`.

**Orbital Fifths** (`/releases/orbital-fifths`)
- Release page: `public/releases/orbital-fifths/index.html`
- Listening room (access-gated): `public/releases/orbital-fifths/listen/index.html`
- Audio, peaks, and cover served from Cloudflare R2: `pub-1c42ac5be9844cb9bd9cf16ce1ef9b94.r2.dev`
- Access key for the listening room: `single-take-001` (delivered in purchase receipt URL)

**Utility scripts** (`scripts/`)
- `make_peaks.py` — generates waveform peaks JSON from a WAV master; upload output to R2
- `make_cover.py` — composites text onto artwork to produce the release cover PNG

**Adding a new live release:**
1. Duplicate and update the HTML files under `public/releases/<slug>/`
2. Add rewrite entries to `next.config.ts`
3. Add an entry to the `live` array in `src/data/releases.json`
4. Upload audio files, peaks JSON, and cover PNG to R2
