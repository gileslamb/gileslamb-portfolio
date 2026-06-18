import { ReelPlayerContent } from "@/components/ReelPlayerContent";

const BASE = "https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/Reels/TV/";

const TRACKS = [
  { title: "Interlude 1", src: BASE + "2%20ghtginterlude%201.mp3" },
  { title: "Broken Garden V2", src: BASE + "Broken%20Garden%20V2.mp3" },
  { title: "COSMOS Soundtrack", src: BASE + "COSMOS%20Soundtrack.mp3" },
  { title: "Christmas Competition", src: BASE + "Christmas%20Competition_Full%20_GL.mp3" },
  { title: "Drama 3", src: BASE + "Drama%203.mp3" },
  { title: "Formal Intro (Park City)", src: BASE + "Formal%20Intro%20%28Park%20city%29.mp3" },
  { title: "Hole Demo", src: BASE + "Hole%20demo2_7_4_14%20-44k.mp3" },
  { title: "Insomnia", src: BASE + "Insomnia_full%20_GL.mp3" },
  { title: "J&H New", src: BASE + "J%26H%20new.mp3" },
  { title: "Mysterious Business", src: BASE + "Mysterious%20Business_60s.mp3" },
  { title: "Necraphilia — Trailer", src: BASE + "Necraphilia%20-%20Trailer%20Master.mp3" },
  { title: "P&O Cruises Memories — With Tail", src: BASE + "P%26O%20Cruises%20Memories%2017%20-%20A%20%28With%20Tail%29.mp3" },
  { title: "Sleep Tight", src: BASE + "Sleep%20tight_Full%20m_GL.mp3" },
  { title: "Thirst", src: BASE + "Thirst.mp3" },
  { title: "Fireworks Bells", src: BASE + "fireworks%20bells%201.08.48.mp3" },
  { title: "My Name Is Will — Mix 2", src: BASE + "my%20name%20is%20will%20-%20mix%202.mp3" },
  { title: "Red Eye", src: BASE + "red%20eye_Full%20_GL.mp3" },
  { title: "Holy Hell, Moving Out", src: BASE + "~Holy%20hell%20moving%20out.mp3" },
];

export default function TVPage() {
  return (
    <ReelPlayerContent
      tracks={TRACKS}
      heading="Selected TV Work"
      framing="Music for television across drama, factual and entertainment. Themes, underscore and title sequences for UK and international broadcast."
    />
  );
}
