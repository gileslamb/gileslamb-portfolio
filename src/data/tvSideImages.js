import { randomInt } from "crypto";

const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

const POOL = [
  { src: `${CF}/d7b9ffe0-5073-4182-1443-89c60b8b4000/public`,          alt: "Story Trails" },
  { src: `${CF}/67d9add6-9e16-4eff-e6a3-66dc69cdcd00/public`,          alt: "Visit Scotland — RSNO" },
  { src: `${CF}/9ae53dfd-1b02-4624-20e2-157dafce9000/public`,          alt: "Cineworld" },
  { src: `${CF}/6deb68c1-1ec3-4787-071c-245e4eafaf00/public`,          alt: "Valhalla Rising" },
];

export function pickTvImages(count = 3) {
  if (POOL.length <= count) return [...POOL];
  const ix = POOL.map((_, i) => i);
  for (let i = ix.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [ix[i], ix[j]] = [ix[j], ix[i]];
  }
  return ix.slice(0, count).map((i) => POOL[i]);
}
