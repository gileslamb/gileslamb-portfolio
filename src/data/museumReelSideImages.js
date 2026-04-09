import { randomInt } from "crypto";
import { IMMERSIVE_GRID } from "@/data/immersive";

const SLUGS = new Set([
  "epic-ireland",
  "zephyr",
  "oman-across-the-ages",
  "wallace-monument",
  "monarch-theatre",
  "carlsberg",
  "story-trails",
  "siren-servers",
  "book-of-kells",
]);

/**
 * Image pool for /reels/museum-reel right column (immerse project stills).
 * Picks `count` unique images at random per request (requires dynamic rendering).
 */
export function pickMuseumReelGalleryImages(count = 3) {
  const pool = IMMERSIVE_GRID.filter((p) => SLUGS.has(p.slug)).map((p) => ({
    src: p.image,
    alt: p.title,
  }));
  if (pool.length <= count) return pool;
  const ix = pool.map((_, i) => i);
  for (let i = ix.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [ix[i], ix[j]] = [ix[j], ix[i]];
  }
  return ix.slice(0, count).map((i) => pool[i]);
}
