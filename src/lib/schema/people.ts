import type { Person } from "schema-dts";

export const SACHA_KYLE_ID = "https://www.gileslamb.com/#sacha-kyle";
export const WILL_ALLEN_ID = "https://www.gileslamb.com/#will-allen";
export const NWR_ID = "https://www.gileslamb.com/#nicolas-winding-refn";
export const DAVID_OLUSOGA_ID = "https://www.gileslamb.com/#david-olusoga";
export const TOD_POLSON_ID = "https://www.gileslamb.com/#tod-polson";

export const sachaKyle: Person = {
  "@type": "Person",
  "@id": SACHA_KYLE_ID,
  name: "Sacha Kyle",
  jobTitle: "Producer and Director",
};

export const willAllen: Person = {
  "@type": "Person",
  "@id": WILL_ALLEN_ID,
  name: "Will Allen",
  jobTitle: "Director",
};

export const nicolasWindingRefn: Person = {
  "@type": "Person",
  "@id": NWR_ID,
  name: "Nicolas Winding Refn",
  jobTitle: "Director",
};

export const davidOlusoga: Person = {
  "@type": "Person",
  "@id": DAVID_OLUSOGA_ID,
  name: "David Olusoga",
  jobTitle: "Historian and Broadcaster",
};

export const todPolson: Person = {
  "@type": "Person",
  "@id": TOD_POLSON_ID,
  name: "Tod Polson",
  jobTitle: "Director",
};
