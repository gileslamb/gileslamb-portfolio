# Giles Lamb: Portfolio

Professional portfolio site for Giles Lamb, cinematic composer and immersive audiovisual artist.

## Tech Stack

- **Next.js** (App Router)
- **Tailwind CSS** (layout/spacing only; design via CSS variables)
- **Deploy target:** Render

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. **Add images** to `public/images/`:
   - `Wide_studio_2026.png`: Hero background (full bleed)
   - `unnamed.jpg`: Portrait for Contact section

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Deploy on Render

Connect the repo to [Render](https://render.com); deployment happens automatically on push to `main`. See `render.yaml` for configuration.

## Structure

- `src/components/`: Nav, Hero, Practice, Work, LivePractice, Contact, Footer
- `src/app/globals.css`: CSS variables, typography (Cormorant Garamond + Karla), animations
- Single-page layout with smooth scroll anchors

## Music Releases

Static HTML release pages live in `public/unstable-systems/` and are served via Next.js rewrites (see `next.config.ts`). They are self-contained — no React, no build step.

**Unstable Systems — Session 001** (`/unstable-systems/001`)
- Release page: `public/unstable-systems/001/index.html`
- Listening room (access-gated): `public/unstable-systems/001/listen/index.html`
- Audio + peaks served from Cloudflare R2: `pub-1c42ac5be9844cb9bd9cf16ce1ef9b94.r2.dev`
- Purchase via Gumroad: `8787808030905.gumroad.com/l/unstable-systems-001`
- Access key for the listening room: `single-take-001` (delivered in Gumroad receipt URL)

**Utility scripts** (`scripts/`)
- `make_peaks.py` — generates waveform peaks JSON from a WAV master; upload output to R2
- `make_cover.py` — composites text onto artwork to produce the release cover PNG

**Adding a new session:**
1. Duplicate and update the HTML files under `public/unstable-systems/002/`
2. Add rewrite entries to `next.config.ts`
3. Upload audio files and peaks JSON to R2
