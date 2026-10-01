/* Press kit data, shared by /press and the About section on /urlar/host.

   Credits: only credits already on the site or approved for the press kit
   (1 Oct 2026). Never list Halo 4 or Brave. `href` points at the credit's own
   page on this site where one exists.

   Spelling follows the site: "Hushabye Lullaby" (src/data/animation.js). */

const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

export type Credit = { title: string; detail?: string; href?: string };

export const CREDITS: { group: string; items: Credit[] }[] = [
  {
    group: "Immersive and heritage",
    items: [
      { title: "Bayeux Tapestry", detail: "British Museum, via ISO Design" },
      { title: "Book of Kells Experience", detail: "Trinity College Dublin", href: "/immersive/book-of-kells" },
      { title: "Experience Zephyr", detail: "MSI Chicago", href: "/immersive/zephyr" },
      { title: "Story Trails", href: "/immersive/story-trails" },
      { title: "Mail Rail", detail: "London" },
    ],
  },
  {
    group: "Film and TV",
    items: [
      { title: "Valhalla Rising", href: "/work/valhalla-rising" },
      { title: "VisitScotland global campaign", detail: "with the RSNO", href: "/work/visit-scotland" },
      { title: "The Brilliant World of Tom Gates", href: "/animation/tom-gates" },
      { title: "Hushabye Lullaby", href: "/animation/hushabye-lullaby" },
    ],
  },
  {
    group: "Games",
    items: [
      { title: "Dead Island", href: "/work/dead-island" },
      { title: "Darksiders 2", href: "/reels/cinematics-trailers" },
      { title: "Resident Evil ORC", href: "/reels/cinematics-trailers" },
      { title: "Grey Goo", href: "/reels/cinematics-trailers" },
      { title: "Fable Legends", href: "/work/fable-legends" },
    ],
  },
  {
    group: "Commercial",
    items: [{ title: "Cineworld", href: "/work/cineworld" }],
  },
];

/* Six for short-form use (the About section on /urlar/host). */
export const SELECTED_CREDITS: Credit[] = [
  { title: "Bayeux Tapestry", detail: "British Museum" },
  { title: "Book of Kells Experience", detail: "Trinity College Dublin" },
  { title: "Experience Zephyr", detail: "MSI Chicago" },
  { title: "Valhalla Rising" },
  { title: "The Brilliant World of Tom Gates" },
  { title: "Dead Island" },
];

/* TODO(Giles): confirm the Cannes year. The Dead Island page and the site
   schema say 2011; 2012 is as briefed for the press kit. */
export const AWARDS: { award: string; for: string }[] = [
  { award: "Cannes Lions Gold, 2012", for: "Dead Island trailer" },
  { award: "BAFTA Scotland", for: "The Brilliant World of Tom Gates" },
  { award: "Two RTS Scotland Awards", for: "Hushabye Lullaby" },
];

/* Press images. These are the photos of Giles already on the site, served
   from Cloudflare Images. Only the `public` variant is reachable (768px
   tall); the full-resolution originals are not in the repo, so `download`
   points at the largest available version until they are added.
   TODO(Giles): swap in full-res originals. */
export type PressImage = {
  kind: "Headshot" | "Studio" | "Live";
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const PRESS_IMAGES: PressImage[] = [
  {
    kind: "Headshot",
    src: `${CF}/unnamed.jpg/public`,
    alt: "Giles Lamb, arms folded, against a dark textured backdrop",
    width: 960,
    height: 768,
  },
  {
    kind: "Studio",
    src: `${CF}/wide_studio_2026.png/public`,
    alt: "Giles Lamb in the studio, seated in front of the mixing desk and screens",
    width: 1152,
    height: 768,
  },
  {
    kind: "Live",
    src: `${CF}/1fceb1b8-7959-4ce2-b885-a107fd74d300/public`,
    alt: "Giles Lamb at his Unstable Systems rig during the 8 June 2026 live performance",
    width: 1366,
    height: 768,
  },
  {
    kind: "Live",
    src: `${CF}/8cd73992-0209-4125-16d2-5a81f67fb200/public`,
    alt: "Giles Lamb performing live at a keyboard, black and white",
    width: 1024,
    height: 768,
  },
];

/* Slots for press images not yet on the site. */
export const IMAGE_SLOTS: string[] = [
  "Headshot, portrait orientation, full resolution",
  "Headshot, alternative, full resolution",
  "Ùrlar in performance, full resolution",
];

export const HEADSHOT = PRESS_IMAGES[0];
