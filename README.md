# Giles Lamb — Portfolio

Professional portfolio site for Giles Lamb, cinematic composer and immersive audiovisual artist.

## Tech Stack

- **Next.js** (App Router)
- **Tailwind CSS** (layout/spacing only — design via CSS variables)
- **Deploy target:** Render

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. **Add images** to `public/images/`:
   - `Wide_studio_2026.png` — Hero background (full bleed)
   - `unnamed.jpg` — Portrait for Contact section

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Deploy on Render

Connect the repo to [Render](https://render.com); deployment happens automatically on push to `main`. See `render.yaml` for configuration.

## Structure

- `src/components/` — Nav, Hero, Practice, Work, LivePractice, Contact, Footer
- `src/app/globals.css` — CSS variables, typography (Cormorant Garamond + Karla), animations
- Single-page layout with smooth scroll anchors
