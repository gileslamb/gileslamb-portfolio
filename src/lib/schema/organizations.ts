import type { Organization } from "schema-dts";
import { GILES_ID } from "./person";

export const CURIOUS_DREAMERS_ID = "https://www.gileslamb.com/#curious-dreamers";
export const SAVALAS_ID = "https://www.gileslamb.com/#savalas";
export const SFS_ID = "https://www.gileslamb.com/#sfs";
export const FILM_CITY_ID = "https://www.gileslamb.com/#film-city-glasgow";

export const curiousDreamers: Organization = {
  "@type": "Organization",
  "@id": CURIOUS_DREAMERS_ID,
  name: "Curious Dreamers",
  foundingDate: "2023",
  location: "Glasgow, UK",
  description:
    "Glasgow-based music and screen studio making animated series, immersive films and sound installations. Music comes first in everything they make.",
  url: "https://www.curiousdreamers.com",
  founder: [
    { "@id": GILES_ID } as any,
    { "@type": "Person", name: "Sacha Kyle" },
  ],
  member: {
    "@type": "OrganizationRole",
    member: { "@id": GILES_ID } as any,
    roleName: "Composer and Sound Designer",
  },
};

export const savalas: Organization = {
  "@type": "Organization",
  "@id": SAVALAS_ID,
  name: "Savalas Ltd",
  foundingDate: "1998",
  foundingLocation: { "@type": "Place", name: "Glasgow" },
  description:
    "UK audio post-production company specialising in international film, TV and games projects including Halo 4 and Brave.",
  founder: { "@id": GILES_ID } as any,
  // Giles's involvement: 1998–2016
};

export const screenFacilitiesScotland: Organization = {
  "@type": "Organization",
  "@id": SFS_ID,
  name: "Screen Facilities Scotland",
  foundingDate: "2009",
  founder: { "@id": GILES_ID } as any,
};

export const filmCityGlasgow: Organization = {
  "@type": "Organization",
  "@id": FILM_CITY_ID,
  name: "Film City Glasgow",
  // Giles served on the board 2007–2016
};
