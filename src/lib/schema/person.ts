import type { Person } from "schema-dts";

export const GILES_ID = "https://www.gileslamb.com/#giles-lamb";
export const BASE_URL = "https://www.gileslamb.com";

export const gilesLamb: Person = {
  "@type": "Person",
  "@id": GILES_ID,
  name: "Giles Lamb",
  givenName: "Giles",
  familyName: "Lamb",
  jobTitle: "Composer and Immersive Sound Artist",
  description:
    "Award-winning composer and sound designer with three decades of experience scoring film, television, advertising, games and immersive installations. Co-founder of Curious Dreamers and former co-founder of Savalas. Background in neuroscience and music psychology.",
  nationality: "British",
  birthDate: "1971-06-25",
  url: BASE_URL,
  email: "giles@gileslamb.com",
  telephone: "+44 7971 951272",
  // TODO: replace with portrait image URL when available
  image: "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/wide_studio_2026.png/public",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Glasgow",
    addressRegion: "Scotland",
    addressCountry: "GB",
  },
  worksFor: { "@id": "https://www.gileslamb.com/#curious-dreamers" } as any,
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Glasgow",
      url: "https://www.gla.ac.uk",
    },
  ],
  knowsAbout: [
    "Film Scoring",
    "Sound Design",
    "Spatial Audio",
    "Generative Music",
    "Modular Synthesis",
    "Live Audiovisual Performance",
    "Immersive Installation",
    "Music Psychology",
    "Neuroscience",
  ],
  hasOccupation: [
    { "@type": "Occupation", name: "Composer" },
    { "@type": "Occupation", name: "Sound Designer" },
    { "@type": "Occupation", name: "Audiovisual Artist" },
  ],
  award: [
    "Cannes Lions Gold — Best Internet Film (Dead Island, 2011)",
    "Music+Sound Award (Dead Island, 2012)",
    "RTS Scotland Award (Hushabye Lullaby, 2021)",
    "BAFTA Kids (2016)",
    "Athens Animfest Distinction Award — Short Competition (Distance to the Moon, 2025)",
    "Athens Animfest Music Award (Distance to the Moon, 2025)",
    "Animaze Best Soundtrack (Distance to the Moon, 2025)",
  ],
  sameAs: [
    "https://www.imdb.com/name/nm1506362/",
    // TODO: Add Vimeo profile URL
    // TODO: Add Spotify for Artists URL
    // TODO: Add Apple Music artist URL
    // TODO: Add Instagram URL
    // TODO: Add LinkedIn URL
    // TODO: Add Bandcamp / SoundCloud URL
    // TODO: Add Wikipedia URL if exists
  ],
};
