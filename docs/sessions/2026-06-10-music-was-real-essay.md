# Session: "The Music Was Real" essay — 10 Jun 2026

## What was done

Added the essay "The Music Was Real" to the portfolio writing section at `/writing/music-was-real`.

## Image migration

**Source:** Substack CDN (S3) — 4 JPEG images downloaded directly from S3 originals at full resolution.

**Problem:** Cloudflare Images API requires a dedicated API token with `images:write` scope. The wrangler OAuth token covers Workers/D1/KV/Pages but not the Images API, so direct upload to `imagedelivery.net` was not possible.

**Decision:** Upload to R2 instead — the `music-releases` bucket already had R2.dev public access enabled (`pub-1c42ac5be9844cb9bd9cf16ce1ef9b94.r2.dev`), and wrangler is authenticated with `workers:write` + storage scopes. Used `wrangler r2 object put --remote` for all four images.

**Final image URLs:**
- `https://pub-1c42ac5be9844cb9bd9cf16ce1ef9b94.r2.dev/essays/music-was-real/01-hero.jpeg` (2048×1536, hero + og:image)
- `https://pub-1c42ac5be9844cb9bd9cf16ce1ef9b94.r2.dev/essays/music-was-real/02-resonates.jpeg` (1829×1024, in "The work that resonates")
- `https://pub-1c42ac5be9844cb9bd9cf16ce1ef9b94.r2.dev/essays/music-was-real/03-portrait.jpeg` (3024×4032, portrait, end of "The generous case")
- `https://pub-1c42ac5be9844cb9bd9cf16ce1ef9b94.r2.dev/essays/music-was-real/04-in-a-room.jpeg` (1600×1054, before "In a room")

## Template decisions

**Portrait image:** Image 3 is 3024×4032 — if rendered at full `article-wide-image` width it would be ~1000px tall. Added a `portrait` boolean prop to `WideImage` in `src/app/writing/[slug]/page.jsx`. When set, applies `.article-wide-image--portrait` CSS class: `display: flex; justify-content: center` on the figure, `max-width: 55%; max-height: 75vh; object-fit: contain` on the image. This keeps it centred and readable without dominating the page.

**generateMetadata:** The essay renderer had no `generateMetadata` export — no page titles, descriptions, canonical URLs, or og tags were being set for any essays. Added `generateMetadata` to `src/app/writing/[slug]/page.jsx` covering: `title`, `description`, `alternates.canonical`, `openGraph` (type: article, publishedTime, images from coverImage), `twitter` (summary_large_image). Applies to all essays.

**Section header typo:** Substack version has "The work that resonates." with trailing period. Site version uses "The work that resonates" (no period), per spec.

**Subscribe blocks:** Excluded — Substack CTA blocks stripped, site version is clean prose.
