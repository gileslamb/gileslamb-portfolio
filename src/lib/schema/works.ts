import { GILES_ID, BASE_URL } from "./person";
import { CURIOUS_DREAMERS_ID } from "./organizations";
import { WILL_ALLEN_ID, NWR_ID, DAVID_OLUSOGA_ID } from "./people";

const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";
const CTX = "https://schema.org";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonLd = Record<string, any>;

export function buildDistanceToTheMoonSchema(): JsonLd[] {
  return [
    {
      "@context": CTX,
      "@type": "Movie",
      "@id": `${BASE_URL}/work/distance-to-the-moon#film`,
      name: "Distance to the Moon",
      dateCreated: "2025",
      description:
        "Stop-motion animated short film inspired by Italo Calvino's Cosmicomics. Set during the Space Race era, a lone Earth inhabitant ascends to the Moon. Premiered at Athens Animfest.",
      genre: ["Short Film", "Stop-Motion Animation", "Science Fiction"],
      productionCompany: [
        { "@id": CURIOUS_DREAMERS_ID },
        { "@type": "Organization", name: "Eyebols" },
      ],
      composer: { "@id": GILES_ID },
      producer: { "@id": GILES_ID },
      image: `${CF}/dttm--high-res-stills-dttm-picture-lock-v06_01_01_19_12.jpg/public`,
      url: `${BASE_URL}/work/distance-to-the-moon`,
      award: [
        "Distinction Award (Short Competition), Athens Animfest",
        "Music Award, Athens Animfest",
        "Best Soundtrack, Animaze",
        "Best Original Composition in a Short Film, Finalist, Music & Sound Awards",
      ],
    },
    {
      "@context": CTX,
      "@type": "MusicComposition",
      "@id": `${BASE_URL}/work/distance-to-the-moon#score`,
      name: "Distance to the Moon (Original Score)",
      composer: { "@id": GILES_ID },
      isPartOf: { "@id": `${BASE_URL}/work/distance-to-the-moon#film` },
    },
  ];
}

export function buildHolyHellSchema(): JsonLd[] {
  return [
    {
      "@context": CTX,
      "@type": "Movie",
      "@id": `${BASE_URL}/work/holy-hell#film`,
      name: "Holy Hell",
      dateCreated: "2016",
      description:
        "Feature documentary directed by Will Allen about a director's two decades inside a cult. Premiered at Sundance in the US Documentary Competition.",
      genre: ["Documentary", "Feature Film"],
      director: { "@id": WILL_ALLEN_ID },
      productionCompany: [
        { "@type": "Organization", name: "WRA Productions" },
        { "@type": "Organization", name: "Very Special Projects" },
        { "@type": "Organization", name: "Whitewater Films" },
      ],
      composer: { "@id": GILES_ID },
      image: `${CF}/14535be8-678b-404a-60d3-71cb2c887300/public`,
      url: `${BASE_URL}/work/holy-hell`,
      award: [
        "Sundance Film Festival, US Documentary Competition",
        "Documentary Critics Choice Award",
      ],
    },
    {
      "@context": CTX,
      "@type": "MusicComposition",
      "@id": `${BASE_URL}/work/holy-hell#score`,
      name: "Holy Hell (Original Score)",
      composer: { "@id": GILES_ID },
      instrumentation: "Piano, Cello, Guitar, Ambient",
      isPartOf: { "@id": `${BASE_URL}/work/holy-hell#film` },
    },
  ];
}

export function buildDeadIslandSchema(): JsonLd[] {
  return [
    {
      "@context": CTX,
      "@type": "VideoGame",
      "@id": `${BASE_URL}/work/dead-island#game`,
      name: "Dead Island",
      dateCreated: "2011",
      description:
        "Game announcement trailer for Deep Silver's zombie survival game. The trailer's orchestral score became internationally celebrated.",
      producer: { "@type": "Organization", name: "Deep Silver" },
      url: `${BASE_URL}/work/dead-island`,
      image: `${CF}/dead-island-cover.png/public`,
    },
    {
      "@context": CTX,
      "@type": "MusicComposition",
      "@id": `${BASE_URL}/work/dead-island#composition`,
      name: "Dead Island (Announcement Trailer Score)",
      composer: { "@id": GILES_ID },
      producer: { "@id": GILES_ID },
      genre: ["Orchestral", "Electronic"],
      award: [
        "Cannes Lions Gold — Best Internet Film (2011)",
        "Music+Sound Award (2012)",
      ],
      isPartOf: { "@id": `${BASE_URL}/work/dead-island#game` },
    },
  ];
}

export function buildSirenServersSchema(): JsonLd {
  return {
    "@context": CTX,
    "@type": "VisualArtwork",
    "@id": `${BASE_URL}/work/siren-servers#work`,
    name: "Siren Servers",
    dateCreated: "2015",
    description:
      "VR installation premiered at Sonica Glasgow. Collaboration with ISO Design and Numbercult exploring the surveillance of human data.",
    artMedium: "VR Installation",
    locationCreated: { "@type": "Place", name: "Sonica Glasgow" },
    contributor: [
      { "@id": GILES_ID },
      { "@type": "Organization", name: "ISO Design" },
      { "@type": "Organization", name: "Numbercult" },
    ],
    image: `${CF}/c7ab2e8f-fd53-45d8-a626-1eb588589600/public`,
    url: `${BASE_URL}/work/siren-servers`,
  };
}

export function buildValhallaRisingSchema(): JsonLd[] {
  return [
    {
      "@context": CTX,
      "@type": "Movie",
      "@id": `${BASE_URL}/work/valhalla-rising#film`,
      name: "Valhalla Rising",
      dateCreated: "2009",
      description:
        "Nicolas Winding Refn's mythic Viking film shot entirely in Scotland. Sound design and additional composition recorded live with an improvising ensemble over two days.",
      genre: ["Feature Film", "Historical Drama"],
      director: { "@id": NWR_ID },
      productionCompany: [{ "@type": "Organization", name: "IFC Films" }],
      url: `${BASE_URL}/work/valhalla-rising`,
    },
    {
      "@context": CTX,
      "@type": "MusicComposition",
      "@id": `${BASE_URL}/work/valhalla-rising#composition`,
      name: "Valhalla Rising (Sound Design and Additional Score)",
      composer: { "@id": GILES_ID },
      description:
        "Recorded with improvising ensemble live to picture over two days in Scotland. Released on 180g vinyl by Milan Records.",
      recordLabel: { "@type": "Organization", name: "Milan Records" },
      isPartOf: { "@id": `${BASE_URL}/work/valhalla-rising#film` },
    },
  ];
}

export function buildVisitScotlandSchema(): JsonLd[] {
  return [
    {
      "@context": CTX,
      "@type": "CreativeWork",
      "@id": `${BASE_URL}/work/visit-scotland#campaign`,
      name: "Visit Scotland: A Spirit of its Own",
      dateCreated: "2016",
      description:
        "Original orchestral score for VisitScotland's first ever global campaign, performed by the Royal Scottish National Orchestra. Featured on Good Morning America.",
      creator: { "@id": GILES_ID },
      producer: { "@type": "Organization", name: "Mallinson TV Productions" },
      funder: { "@type": "Organization", name: "VisitScotland" },
      image: `${CF}/67d9add6-9e16-4eff-e6a3-66dc69cdcd00/public`,
      url: `${BASE_URL}/work/visit-scotland`,
    },
    {
      "@context": CTX,
      "@type": "MusicComposition",
      "@id": `${BASE_URL}/work/visit-scotland#score`,
      name: "Spirit of Scotland (Orchestral Score)",
      composer: { "@id": GILES_ID },
      description:
        "Recorded with over 50 musicians from the Royal Scottish National Orchestra at their new Glasgow concert hall. Released as EP 'Timeless'.",
      performer: { "@type": "MusicGroup", name: "Royal Scottish National Orchestra" },
      isPartOf: { "@id": `${BASE_URL}/work/visit-scotland#campaign` },
    },
  ];
}

export function buildStoryTrailsSchema(): JsonLd {
  return {
    "@context": CTX,
    "@type": "CreativeWork",
    "@id": `${BASE_URL}/work/story-trails#work`,
    name: "Story Trails",
    dateCreated: "2022",
    description:
      "Immersive cinema touring 15 UK cities. Part of UNBOXED, executive produced by David Olusoga. Original score, sound design and spatial audio.",
    creator: { "@id": GILES_ID },
    productionCompany: [
      { "@type": "Organization", name: "StoryFutures Academy" },
      { "@type": "Organization", name: "ISO Design" },
      { "@type": "Organization", name: "BBC" },
    ],
    contributor: { "@id": DAVID_OLUSOGA_ID },
    image: `${CF}/d7b9ffe0-5073-4182-1443-89c60b8b4000/public`,
    url: `${BASE_URL}/work/story-trails`,
  };
}

export function buildFableLegendsSchema(): JsonLd[] {
  return [
    {
      "@context": CTX,
      "@type": "VideoGame",
      "@id": `${BASE_URL}/work/fable-legends#game`,
      name: "Fable Legends",
      dateCreated: "2013",
      description:
        "Announcement trailer for Lionhead Studios' Fable prequel, directed by Ben Hibon. Premiered at Gamescom 2013. The game was cancelled by Microsoft in 2016.",
      image: `${CF}/198cfe11-01bf-43f9-dece-34662a41bd00/public`,
      url: `${BASE_URL}/work/fable-legends`,
    },
    {
      "@context": CTX,
      "@type": "MusicComposition",
      "@id": `${BASE_URL}/work/fable-legends#score`,
      name: "Fable Legends (Announcement Trailer Score)",
      composer: { "@id": GILES_ID },
      isPartOf: { "@id": `${BASE_URL}/work/fable-legends#game` },
    },
  ];
}

export function buildThe21Schema(): JsonLd {
  return {
    "@context": CTX,
    "@type": "Movie",
    "@id": `${BASE_URL}/work/the-21#film`,
    name: "The 21",
    dateCreated: "2023",
    description:
      "Animated short film about the 21 Coptic Christians martyred in Libya in 2015. Longlisted for an Academy Award. Score production, sound design and mix.",
    genre: ["Short Film", "Animation"],
    creator: { "@id": GILES_ID },
    image: `${CF}/4c4c6acf-96ad-47b3-4f2a-de7efc826a00/public`,
    url: `${BASE_URL}/work/the-21`,
    award: ["Academy Award longlist"],
  };
}

export function buildCineworldSchema(): JsonLd {
  return {
    "@context": CTX,
    "@type": "MusicComposition",
    "@id": `${BASE_URL}/work/cineworld#composition`,
    name: "The Eternal Descent (Cineworld Theme)",
    dateCreated: "2012",
    description:
      "Theme that played before every Cineworld screening across the UK. Composer: Giles Lamb.",
    composer: { "@id": GILES_ID },
    image: `${CF}/9ae53dfd-1b02-4624-20e2-157dafce9000/public`,
    url: `${BASE_URL}/work/cineworld`,
  };
}

/** ItemList of selected works for the homepage. */
export function buildWorkItemList(): JsonLd {
  return {
    "@context": CTX,
    "@type": "ItemList",
    "@id": `${BASE_URL}/#selected-works`,
    name: "Selected Works by Giles Lamb",
    itemListElement: [
      { "@type": "ListItem", position: 1, item: { "@id": `${BASE_URL}/work/distance-to-the-moon#film` } },
      { "@type": "ListItem", position: 2, item: { "@id": `${BASE_URL}/work/holy-hell#film` } },
      { "@type": "ListItem", position: 3, item: { "@id": `${BASE_URL}/work/dead-island#composition` } },
      { "@type": "ListItem", position: 4, item: { "@id": `${BASE_URL}/work/siren-servers#work` } },
      { "@type": "ListItem", position: 5, item: { "@id": `${BASE_URL}/work/valhalla-rising#film` } },
      { "@type": "ListItem", position: 6, item: { "@id": `${BASE_URL}/work/visit-scotland#campaign` } },
      { "@type": "ListItem", position: 7, item: { "@id": `${BASE_URL}/work/story-trails#work` } },
      { "@type": "ListItem", position: 8, item: { "@id": `${BASE_URL}/work/the-21#film` } },
      { "@type": "ListItem", position: 9, item: { "@id": `${BASE_URL}/work/fable-legends#score` } },
      { "@type": "ListItem", position: 10, item: { "@id": `${BASE_URL}/work/cineworld#composition` } },
    ],
  };
}
