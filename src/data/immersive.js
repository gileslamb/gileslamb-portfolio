const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

export function cfImage(id) {
  return `${CF}/${id}/public`;
}

/** Index grid: order matches spec */
export const IMMERSIVE_GRID = [
  {
    id: "zephyr",
    slug: "zephyr",
    title: "Zephyr · MSI Chicago",
    client: "Museum of Science and Industry, Chicago",
    year: "2019",
    role: "Composer · Sound Design",
    type: "Museum Installation",
    image: cfImage("8b2cd1c7-9095-40d0-6900-12a8e52ef000"),
    href: "/immersive/zephyr",
  },
  {
    id: "oman-across-the-ages",
    slug: "oman-across-the-ages",
    title: "Oman Across the Ages",
    client: "National Museum of Oman",
    year: "2021",
    role: "Composer · Sound Design",
    type: "Museum Installation · 360° Film",
    image: cfImage("6b61954e-0f3b-4e14-1ae6-61ae1a792e00"),
    href: "/immersive/oman-across-the-ages",
  },
  {
    id: "waldorf-astoria",
    slug: "waldorf-astoria",
    title: "Waldorf Astoria New York",
    client: "Waldorf Astoria",
    year: "2019",
    role: "Composer · Sound Design",
    type: "Hotel Installation · Multi-channel",
    image: cfImage("57b27752-bc4e-41a0-a8aa-5fead118e000"),
    href: "/immersive/waldorf-astoria",
  },
  {
    id: "wallace-monument",
    slug: "wallace-monument",
    title: "Wallace Monument",
    client: "Wallace Monument Museum",
    year: "2018",
    role: "Composer · Sound Design",
    type: "Museum Installation · 5.1 Surround",
    image: cfImage("5a6a36bc-16c0-45f6-155f-1583c31cfa00"),
    href: "/immersive/wallace-monument",
  },
  {
    id: "monarch-theatre",
    slug: "monarch-theatre",
    title: "Monarch Theatre · Wonderland",
    client: "Wonderland Restaurants",
    year: "2023",
    role: "Composer · Sound Design",
    type: "Immersive Dining · Spatial Audio",
    image: cfImage("ce950ed8-79e3-403f-7a58-a386f8432500"),
    href: "/immersive/monarch-theatre",
  },
  {
    id: "carlsberg",
    slug: "carlsberg",
    title: "Carlsberg Experience",
    client: "Carlsberg",
    year: "2019",
    role: "Composer · Sound Design",
    type: "Brand Museum · Experiential",
    image: cfImage("2891d1b7-0e42-41c4-6d9e-fb5ad1865e00"),
    href: "/immersive/carlsberg",
  },
  {
    id: "story-trails",
    slug: "story-trails",
    title: "Story Trails",
    client: "StoryFutures / ISO Design / BBC",
    year: "2022",
    role: "Composer · Sound Design · Mix",
    type: "Immersive · Spatial Audio",
    image: `${CF}/d7b9ffe0-5073-4182-1443-89c60b8b4000/public`,
    href: "/immersive/story-trails",
  },
  {
    id: "epic-ireland",
    slug: "epic-ireland",
    title: "Isle of the Senses · EPIC Ireland",
    client: "EPIC The Irish Emigration Museum, Dublin",
    year: "2026",
    role: "Composer · Sound Design",
    type: "Museum Installation · Multi-screen · Interactive",
    image: cfImage("b1f7ee90-62bf-4961-3ca1-38ffad4bfb00"),
    href: "/immersive/epic-ireland",
  },
  {
    id: "siren-servers",
    slug: "siren-servers",
    title: "Siren Servers",
    client: "Sonica / ISO Design / Numbercult",
    year: "2015",
    role: "Composer · Sound Design",
    type: "VR Installation",
    image: `${CF}/c7ab2e8f-fd53-45d8-a626-1eb588589600/public`,
    href: "/immersive/siren-servers",
  },
  {
    id: "book-of-kells",
    slug: "book-of-kells",
    title: "Book of Kells Experience",
    client: "Trinity College Dublin / ISO Design",
    year: "",
    role: "Immersive Score & Sound Design",
    type: "Immersive / Installation",
    image: "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/229dc73b-9aa2-497a-4a02-796ec9e11600/public",
    href: "/immersive/book-of-kells",
  },
];

export const IMMERSIVE_PROJECTS = {
  zephyr: {
    slug: "zephyr",
    title: "Zephyr · MSI Chicago",
    year: "2019",
    type: "Museum Installation",
    client: "Museum of Science and Industry, Chicago",
    studio: "ISO Design",
    role: "Composer · Sound Design",
    description: `The Pioneer Zephyr is a 1934 stainless steel train, installed permanently at the Museum of Science and Industry in Chicago. The commission was to create a complete sonic environment for the exhibit, with music and sound design running across multiple screens along the length of the train, and a separate 180-degree immersive film at the rear viewing carriage.

The screens along the train carry a continuous moving landscape: countryside, weather, terrain, giving passengers the impression the train is still in motion. The sound is abstract, spatial, built around the sensation of movement and distance rather than literal representation. Audio runs across multiple speakers along the train's full length, with the landscape and sound shifting together.

At the rear, the 180-degree film takes the journey further: a full animated sequence of the Zephyr travelling through different American landscapes and weather conditions. This section carries a complete orchestral and electronic score.`,
    rightBlocks: [
      { block: "video", id: "6834db137751afc701fbb264e68416cc" },
      { block: "video", id: "3f1202e90aa41c244fffec955eb06725" },
      {
        block: "images",
        items: [
          {
            src: cfImage("8b2cd1c7-9095-40d0-6900-12a8e52ef000"),
            alt: "Pioneer Zephyr exhibit",
          },
          {
            src: cfImage("0760966e-9737-4eef-0c05-ff7224ed3300"),
            alt: "Zephyr installation",
          },
        ],
      },
    ],
  },
  "oman-across-the-ages": {
    slug: "oman-across-the-ages",
    title: "Oman Across the Ages",
    year: "2021",
    type: "Museum Installation · 360° Film",
    client: "National Museum of Oman",
    role: "Composer · Sound Design",
    description: `Four 360-degree film experiences for the national museum of Oman, tracing the country's history of technological development and architectural evolution across the ages.

Each film is a distinct environment: different periods, different scales, different moods. The brief was to immerse visitors completely: sound design and music working together as a single quad soundscape wrapping the full 360-degree space.

The score is cinematic and atmospheric, built to support visuals that move through time: buildings rising, cities evolving, landscapes shifting. The sound had to hold that sense of scale without overwhelming the image.`,
    rightBlocks: [
      {
        block: "image",
        src: cfImage("6b61954e-0f3b-4e14-1ae6-61ae1a792e00"),
        alt: "Oman Across the Ages",
      },
      { block: "video", id: "21720068819d262ef1f0ccbf4661530b" },
      {
        block: "images",
        items: [
          {
            src: cfImage("4370ef63-a2e4-49ce-6e01-bc34b327a700"),
            alt: "Oman 360 film",
          },
          {
            src: cfImage("f25c8311-a645-45fd-37f3-ef8a4fa86900"),
            alt: "Oman museum immersive",
          },
        ],
      },
    ],
  },
  "waldorf-astoria": {
    slug: "waldorf-astoria",
    title: "Waldorf Astoria New York",
    year: "2019",
    type: "Hotel Installation · Multi-channel",
    client: "Waldorf Astoria",
    role: "Composer · Sound Design",
    description: `An immersive room installation commissioned for the Waldorf Astoria New York, telling the story of the hotel through archive footage, stills and original film: politicians, musicians, cultural figures, pivotal moments in New York history from the early 20th century to the present day.

The installation uses multiple revolving screens. The score is multi-channel, mapped so the sound tracks movement across the screens. The audio follows the image as it rotates through the space.

The brief was to capture a sense of time passing and cultural weight without sentimentality. Music and sound design working as a single continuous composition.`,
    rightBlocks: [
      {
        block: "image",
        src: cfImage("57b27752-bc4e-41a0-a8aa-5fead118e000"),
        alt: "Waldorf Astoria installation",
      },
      { block: "video", id: "55510f685c1efbe4429e8750609c7be3" },
    ],
  },
  "wallace-monument": {
    slug: "wallace-monument",
    title: "Wallace Monument",
    year: "2018",
    type: "Museum Installation · 5.1 Surround",
    client: "Wallace Monument Museum",
    role: "Composer · Sound Design",
    description: `A cinematic score and sound design for the film installation inside the Wallace Monument itself, composed and mixed in 5.1 surround, built to be heard in the actual space where the history happened.

The brief was to evoke the period: violence, drama, historical weight, without dramatising beyond what the material supports. The score is rhythmic and propulsive, using orchestral and electronic elements together. Sound design and music are composed as one, not layered separately.`,
    rightBlocks: [
      {
        block: "image",
        src: cfImage("5a6a36bc-16c0-45f6-155f-1583c31cfa00"),
        alt: "Wallace Monument",
      },
      { block: "video", id: "10a8ecaad5b082d223815e0a58c3d308" },
      {
        block: "images",
        items: [
          {
            src: cfImage("22a67b74-c9c6-49e8-1f43-b276ba95e400"),
            alt: "Wallace Monument film installation",
          },
        ],
      },
    ],
  },
  "monarch-theatre": {
    slug: "monarch-theatre",
    title: "Monarch Theatre · Wonderland",
    year: "2023",
    type: "Immersive Dining · Spatial Audio",
    client: "Wonderland Restaurants",
    role: "Composer · Sound Design",
    description: `An ongoing commission for Wonderland Restaurants: multiple scored chapters for their immersive dining experiences at the Monarch Theatre. Each course is introduced by a 360-degree film with its own score, running across an 11-speaker array surrounding the dining room.

The sound design was modelled in VR before installation, mapping how audio moves through the physical space. Each chapter has its own identity. The brief was built around DC Comics characters, so Gotham City, the Joker, Mr Freeze, Harlequin, each paired with a specific dish and a specific sonic atmosphere.

This was a long-form commission across multiple productions. Score, sound design, spatial mixing.`,
    rightBlocks: [
      { block: "video", id: "5c84c3679524834896b48087900b49d1" },
      { block: "video", id: "979f10d5f2540e897ab99a8dfc306b90" },
      {
        block: "images",
        items: [
          {
            src: cfImage("ce950ed8-79e3-403f-7a58-a386f8432500"),
            alt: "Monarch Theatre immersive dining",
          },
          {
            src: cfImage("bc99afa0-430a-40ca-3887-766d787bf300"),
            alt: "Wonderland at Monarch Theatre",
          },
          {
            src: cfImage("78e27be1-5970-4bbd-dbe7-f1a7c9707f00"),
            alt: "Monarch Theatre experience",
          },
        ],
      },
    ],
  },
  carlsberg: {
    slug: "carlsberg",
    title: "Carlsberg Experience",
    year: "2019",
    type: "Brand Museum · Experiential",
    client: "Carlsberg",
    role: "Composer · Sound Design",
    description: `Score and sound design for the Carlsberg Experience in Copenhagen: a multi-level visitor centre tracing the history of the Carlsberg family and the evolution of the brand from a 19th-century family brewery to a global operation.

The installation moves visitors through the building across several distinct environments, each with its own sonic landscape: family history, the brewing process, brand heritage. Sound design and music guide the journey without narrating it.`,
    rightBlocks: [
      {
        block: "image",
        src: cfImage("2891d1b7-0e42-41c4-6d9e-fb5ad1865e00"),
        alt: "Carlsberg Experience Copenhagen",
      },
    ],
  },
  "epic-ireland": {
    slug: "epic-ireland",
    title: "Isle of the Senses · EPIC Ireland",
    year: "2026",
    type: "Museum Installation · Multi-screen · Interactive",
    client: "EPIC The Irish Emigration Museum, Dublin",
    role: "Composer · Sound Design",
    description: `A complete score and sound design commission for the new Isle of the Senses galleries at EPIC The Irish Emigration Museum in Dublin, part of a €2 million upgrade marking the museum's tenth anniversary.

Three distinct environments, three sonic briefs. The introductory multi-screen gallery establishes the emotional weight of Irish emigration. The 180-degree atmospheric flythrough places visitors inside the landscapes emigrants left behind: Kerry, the Giant's Causeway, Wicklow, the Cliffs of Moher. The third space is an interactive LED floor spanning 28 square metres, the largest of its kind in any Irish museum, tracing emigration from monks in currachs to ocean liners to aircraft.

Score and sound design composed as a single piece across all three spaces. Opened March 2026.`,
    rightBlocks: [
      {
        block: "image",
        src: cfImage("b1f7ee90-62bf-4961-3ca1-38ffad4bfb00"),
        alt: "Isle of the Senses, EPIC Ireland",
      },
      { block: "video", id: "7666ad9a2dcfee86c86b5fefb14eed16" },
      {
        block: "images",
        items: [
          {
            src: cfImage("3bb1f8d1-93c5-402b-9e84-23a3afdd0300"),
            alt: "EPIC The Irish Emigration Museum installation",
          },
        ],
      },
    ],
  },
};

export function getImmersiveProject(slug) {
  return IMMERSIVE_PROJECTS[slug] ?? null;
}
