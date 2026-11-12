/* /menin — unlisted listening page for the CWGC Menin Gate 100 tender (Nov 2026).
   Everything the page shows lives here: edit titles, lines, order, images and
   URLs in this file only. A blank `line` is simply not shown; a track without
   `download` gets no download link.

   Media: R2 bucket `music-releases`, prefix `menin/` (public r2.dev URL).
   - Audio: 320k MP3 from the WAVs in "Meningate Tender - pitch media". The
     montage is meningate montage/Bounces/meningate montage_2_giles Lamb.wav
     (13:53 bounce, 12 Nov 2026), uploaded as demo-montage-2.mp3. Upload a new
     cut under a NEW key: files are cached for a year.
   - Downloads: copies under menin/dl/ served with Content-Disposition:
     attachment, so the link saves the file instead of opening a player.
   - Images: menin/img/<name>-<width>.{avif,webp,jpg}, built from the concept
     book photos and Dead Island session stills.
   `duration` (seconds) is shown before playback starts, because nothing is
   preloaded. */

const BASE = "https://pub-1c42ac5be9844cb9bd9cf16ce1ef9b94.r2.dev/menin";

export type Img = {
  /** Base name under menin/img/, e.g. "hero-arch" */
  name: string;
  /** Widths that exist on R2 for this image, smallest first */
  widths: number[];
  /** Intrinsic aspect, used for width/height so the page doesn't jump */
  w: number;
  h: number;
  alt: string;
};

export type AudioItem = {
  kind: "audio";
  title: string;
  line: string;
  src: string;
  duration: number;
  download?: string;
};

export type VideoItem = {
  kind: "video";
  title: string;
  line: string;
  src: string;
  poster: string;
  /** Picture area inside the baked-in letterbox (width / height). The frame
      is cut to this so the black bars don't show on the page; fullscreen
      still shows the whole frame. */
  aspect: string;
};

export type Section = {
  heading: string;
  intro?: string;
  image?: Img;
  items: (AudioItem | VideoItem)[];
};

export const IMG_BASE = `${BASE}/img`;

export const PAGE = {
  title: "Menin Gate 100",
  byline: "Giles Lamb",
  subtitle: "Sound and music examples",
  footerName: "Giles Lamb Ltd",
  footerEmail: "giles@gileslamb.com",
};

export const HERO: Img = {
  name: "hero-arch",
  widths: [960, 1600, 2400],
  w: 2880,
  h: 1620,
  alt: "Inside the Menin Gate, Ypres, looking out through the arch",
};

export const MONTAGE: AudioItem & { note: string } = {
  kind: "audio",
  title: "Demo montage",
  line: "",
  src: `${BASE}/demo-montage-2.mp3`,
  duration: 149,
  note:
    "A demo assembly to give a feeling of how the piece could sound. The music is from my existing work, not written for this, chosen because it has the right feel. In the installation the arch carries music alone and the voices play on visitors' phones; here they're heard together. Archive voices courtesy of IWM, for illustration only.",
};

export const SECTIONS: Section[] = [
  {
    heading: "Strings and orchestra",
    image: {
      name: "strings-session",
      widths: [640, 1280],
      w: 1920,
      h: 776,
      alt: "A violinist playing at the Dead Island orchestral recording session",
    },
    items: [
      {
        kind: "audio",
        title: "Timeless Horizon",
        line: "Score for VisitScotland's global campaign, recorded by the Royal Scottish National Orchestra.",
        src: `${BASE}/timeless-horizon.mp3`,
        duration: 212,
        download: `${BASE}/dl/timeless-horizon.mp3`,
      },
      {
        kind: "audio",
        title: "Silo (strings version)",
        line: "",
        src: `${BASE}/silo-strings.mp3`,
        duration: 312,
        download: `${BASE}/dl/silo-strings.mp3`,
      },
      {
        kind: "audio",
        title: "Cello Moment",
        line: "",
        src: `${BASE}/cello-moment.mp3`,
        duration: 225,
        download: `${BASE}/dl/cello-moment.mp3`,
      },
    ],
  },
  {
    heading: "Piano",
    image: {
      name: "piano-session",
      widths: [640, 1280],
      w: 1920,
      h: 776,
      alt: "Hands on the piano keys at the Dead Island orchestral recording session",
    },
    items: [
      {
        kind: "audio",
        title: "September",
        line: "",
        src: `${BASE}/september.mp3`,
        duration: 199,
        download: `${BASE}/dl/september.mp3`,
      },
      {
        kind: "audio",
        title: "Quiet in Thought",
        line: "",
        src: `${BASE}/quiet-in-thought.mp3`,
        duration: 225,
        download: `${BASE}/dl/quiet-in-thought.mp3`,
      },
    ],
  },
  {
    heading: "Film",
    intro: "Previous work in a similar tone.",
    items: [
      {
        kind: "video",
        title: "Scotland. A Spirit of Its Own",
        line: "VisitScotland's global campaign, scored for the Royal Scottish National Orchestra.",
        src: `${BASE}/visitscotland-spirit-of-scotland.mp4`,
        poster: `${BASE}/visitscotland-spirit-of-scotland-poster.jpg`,
        aspect: "1920 / 720",
      },
      {
        kind: "video",
        title: "Dead Island (orchestral video)",
        line: "The Dead Island trailer score, re-recorded in 2021 with the Scottish Session Orchestra.",
        src: `${BASE}/dead-island-orchestral.mp4`,
        poster: `${BASE}/dead-island-orchestral-poster.jpg`,
        aspect: "1920 / 776",
      },
    ],
  },
];
