import { randomInt } from "crypto";

const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

const POOL = [
  { src: `${CF}/dttm--high-res-stills-dttm-picture-lock-v06_01_01_19_12.jpg/public`,          alt: "Distance to the Moon" },
  { src: `${CF}/dttm--high-res-stills-dttm-picture-lock-v06_01_00_25_21-copy.jpg/public`,     alt: "Distance to the Moon" },
  { src: `${CF}/dttm--high-res-stills-dttm-picture-lock-v06_01_01_46_12-copy.jpg/public`,     alt: "Distance to the Moon" },
  { src: `${CF}/dttm--high-res-stills-dttm-picture-lock-v06_01_02_10_21-copy.jpg/public`,     alt: "Distance to the Moon" },
  { src: `${CF}/4c4c6acf-96ad-47b3-4f2a-de7efc826a00/public`,                                alt: "The 21" },
];

export function pickKidsAnimationImages(count = 3) {
  if (POOL.length <= count) return [...POOL];
  const ix = POOL.map((_, i) => i);
  for (let i = ix.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [ix[i], ix[j]] = [ix[j], ix[i]];
  }
  return ix.slice(0, count).map((i) => POOL[i]);
}
