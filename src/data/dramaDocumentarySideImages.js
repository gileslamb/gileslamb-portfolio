import { randomInt } from "crypto";

const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

const POOL = [
  { src: `${CF}/14535be8-678b-404a-60d3-71cb2c887300/public`,          alt: "Holy Hell — CNN" },
  { src: `${CF}/7d088885-be0f-4554-0ee1-ec4dbf3a0f00/public`,          alt: "Holy Hell — CNN" },
  { src: `${CF}/3362dd69-35ae-4e85-f2f6-6665a03d4e00/public`,          alt: "Valhalla Rising" },
  { src: `${CF}/9ae53dfd-1b02-4624-20e2-157dafce9000/public`,          alt: "Cineworld" },
];

export function pickDramaDocumentaryImages(count = 3) {
  if (POOL.length <= count) return [...POOL];
  const ix = POOL.map((_, i) => i);
  for (let i = ix.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [ix[i], ix[j]] = [ix[j], ix[i]];
  }
  return ix.slice(0, count).map((i) => POOL[i]);
}
