import { randomInt } from "crypto";

const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

const POOL = [
  { src: `${CF}/dead-island-cover.png/public`,                          alt: "Dead Island — Deep Silver" },
  { src: `${CF}/3362dd69-35ae-4e85-f2f6-6665a03d4e00/public`,          alt: "Valhalla Rising" },
  { src: `${CF}/6deb68c1-1ec3-4787-071c-245e4eafaf00/public`,          alt: "Valhalla Rising" },
  { src: `${CF}/198cfe11-01bf-43f9-dece-34662a41bd00/public`,          alt: "Fable Legends — Lionhead" },
];

export function pickCinematicsTrailersImages(count = 3) {
  if (POOL.length <= count) return [...POOL];
  const ix = POOL.map((_, i) => i);
  for (let i = ix.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [ix[i], ix[j]] = [ix[j], ix[i]];
  }
  return ix.slice(0, count).map((i) => POOL[i]);
}
