/* /menin — unlisted listening page for the CWGC Menin Gate 100 tender (Nov 2026).
   Everything the page shows lives here: edit titles, lines, order and URLs in
   this file only. A blank `line` is simply not shown.

   Media: R2 bucket `music-releases`, prefix `menin/` (public r2.dev URL).
   Audio = 320k MP3 from the WAVs in "Meningate Tender - pitch media"; the
   montage is from meningate montage/Bounces (11:47 bounce, 12 Nov 2026).
   `duration` (seconds) is shown before playback starts, because nothing is
   preloaded. */

const BASE = "https://pub-1c42ac5be9844cb9bd9cf16ce1ef9b94.r2.dev/menin";

export type AudioItem = {
  kind: "audio";
  title: string;
  line: string;
  src: string;
  duration: number;
};

export type VideoItem = {
  kind: "video";
  title: string;
  line: string;
  src: string;
  poster: string;
};

export type Section = {
  heading: string;
  items: (AudioItem | VideoItem)[];
};

export const PAGE = {
  title: "Menin Gate 100",
  byline: "Giles Lamb",
  footerName: "Giles Lamb Ltd",
  footerEmail: "giles@gileslamb.com",
};

export const MONTAGE: AudioItem & { note: string } = {
  kind: "audio",
  title: "Demo montage",
  line: "",
  src: `${BASE}/demo-montage.mp3`,
  duration: 307,
  note:
    "This is a demo assembly, not the finished piece: a short montage of music and archive voices to give a sense of how the layers work, the emotional tone and the sound world. In the installation the arch carries music alone and the voices play on visitors' phones; here they're heard together. Archive voices courtesy of IWM, for illustration only, to be licensed if commissioned.",
};

export const SECTIONS: Section[] = [
  {
    heading: "Strings and orchestra",
    items: [
      {
        kind: "audio",
        title: "Timeless Horizon",
        line: "Score for VisitScotland's global campaign, recorded by the Royal Scottish National Orchestra.",
        src: `${BASE}/timeless-horizon.mp3`,
        duration: 212,
      },
      {
        kind: "audio",
        title: "Silo (strings version)",
        line: "",
        src: `${BASE}/silo-strings.mp3`,
        duration: 312,
      },
      {
        kind: "audio",
        title: "Cello Moment",
        line: "",
        src: `${BASE}/cello-moment.mp3`,
        duration: 225,
      },
    ],
  },
  {
    heading: "Piano",
    items: [
      {
        kind: "audio",
        title: "September",
        line: "",
        src: `${BASE}/september.mp3`,
        duration: 199,
      },
      {
        kind: "audio",
        title: "Quiet in Thought",
        line: "",
        src: `${BASE}/quiet-in-thought.mp3`,
        duration: 225,
      },
    ],
  },
  {
    heading: "Film",
    items: [
      {
        kind: "video",
        title: "Scotland. A Spirit of Its Own",
        line: "VisitScotland global campaign advert, 2016.",
        src: `${BASE}/visitscotland-spirit-of-scotland.mp4`,
        poster: `${BASE}/visitscotland-spirit-of-scotland-poster.jpg`,
      },
      {
        kind: "video",
        title: "Dead Island (orchestral video)",
        line: "The Dead Island trailer score, re-recorded in 2021 with the Scottish Session Orchestra.",
        src: `${BASE}/dead-island-orchestral.mp4`,
        poster: `${BASE}/dead-island-orchestral-poster.jpg`,
      },
    ],
  },
];
