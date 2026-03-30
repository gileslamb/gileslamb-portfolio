/* TIER 1: Full case studies (Distance to the Moon, Holy Hell, Dead Island)
   Rendered inline in Work.jsx - not from this file */

/* Cloudflare Images (same account as project pages) so thumbnails load on mobile/Vercel */
const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

/* TIER 2: Further Selected Work, checkerboard grid */
export const FURTHER_WORK_PRIMARY = [
  {
    id: "siren-servers",
    title: "Siren Servers",
    client: "Sonica / ISO Design / Numbercult",
    year: "2015",
    type: "VR INSTALLATION",
    role: "COMPOSER · SOUND DESIGN",
    summary: "VR installation presented at Sonica Glasgow. Composition and sound design for an environment where physical and virtual space shared the same footprint.",
    image: "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/c7ab2e8f-fd53-45d8-a626-1eb588589600/public",
    href: "/work/siren-servers",
  },
  {
    id: "valhalla-rising",
    title: "Valhalla Rising",
    year: "2009",
    type: "FEATURE FILM",
    client: "IFC Films / Newmarket Films",
    director: "Nicolas Winding Refn",
    role: "Sound Design · Additional Composer",
    summary: "Sound design and original composition for Nicolas Winding Refn's mythic Viking film. Recorded with an improvising ensemble over two days in Scotland.",
    metadataRow: "SOUND DESIGN · ADDITIONAL COMPOSER  |  IFC FILMS  |  MILAN RECORDS",
    image: "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/3362dd69-35ae-4e85-f2f6-6665a03d4e00/public",
    image2: "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/6deb68c1-1ec3-4787-071c-245e4eafaf00/public",
    href: "/work/valhalla-rising",
  },
  {
    id: "visit-scotland",
    title: "Visit Scotland",
    client: "RSNO",
    year: "2016",
    role: "Composer",
    summary: "Orchestral score for VisitScotland's first global campaign. Performed by the Royal Scottish National Orchestra. Featured on Good Morning America.",
    image: `${CF}/67d9add6-9e16-4eff-e6a3-66dc69cdcd00/public`,
    href: "/work/visit-scotland",
  },
  {
    id: "story-trails",
    title: "Story Trails",
    client: "StoryFutures / ISO Design",
    year: "2022",
    role: "Spatial Audio",
    summary: "Original score and sound design for a cycloramic immersive cinema touring 15 UK cities. Part of UNBOXED, executive produced by David Olusoga.",
    image: `${CF}/d7b9ffe0-5073-4182-1443-89c60b8b4000/public`,
    href: "/work/story-trails",
  },
];

export const FURTHER_WORK_EXTENDED = [
  {
    id: "fable-legends",
    title: "Fable Legends",
    client: "Lionhead / Microsoft",
    year: "2013",
    role: "Composer",
    summary: "Announcement trailer for Lionhead's final Fable game, directed by Ben Hibon. Narrated by Michael Gambon. Premiered Gamescom 2013. The game was never released.",
    image: `${CF}/198cfe11-01bf-43f9-dece-34662a41bd00/public`,
    href: "/work/fable-legends",
  },
  {
    id: "book-of-kells",
    title: "Book of Kells Experience",
    client: "Trinity College Dublin / ISO Design",
    year: "",
    type: "Immersive / Installation",
    role: "Immersive Score & Sound Design",
    summary: "Immersive score and sound design for Trinity College Dublin's 360° Book of Kells film.",
    metadataRow: "IMMERSIVE SCORE & SOUND DESIGN  |  TRINITY COLLEGE DUBLIN / ISO DESIGN",
    image: "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/229dc73b-9aa2-497a-4a02-796ec9e11600/public",
    href: "/work/book-of-kells",
  },
  {
    id: "cineworld",
    title: "Cineworld",
    client: "Cineworld",
    year: "2012",
    type: "COMMERCIAL · CINEMA",
    role: "Composer",
    summary: "The theme that played before every Cineworld screening, in every cinema across the UK.",
    metadataRow: "COMPOSER  |  CINEWORLD  |  2012",
    image: "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/9ae53dfd-1b02-4624-20e2-157dafce9000/public",
    href: "/work/cineworld",
  },
  {
    id: "the-21",
    title: "The 21",
    client: "The Ayoub Sisters",
    year: "2023",
    type: "SHORT ANIMATED FILM",
    role: "Score Producer · Sound Design · Mix",
    summary: "Animated short about the 21 Coptic martyrs of Libya. Score producer, sound designer and mix. Academy Award longlisted.",
    metadataRow: "SCORE COMPOSITION & PRODUCTION · SOUND DESIGN · MIX  |  THE AYOUB SISTERS  |  2023",
    image: "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/4c4c6acf-96ad-47b3-4f2a-de7efc826a00/public",
    href: "/work/the-21",
  },
];

export const FURTHER_WORK_PROJECTS = [
  ...FURTHER_WORK_PRIMARY,
  ...FURTHER_WORK_EXTENDED,
];
