import { ReelPlayerContent } from "@/components/ReelPlayerContent";
import { pickDramaDocumentaryImages } from "@/data/dramaDocumentarySideImages";

export const dynamic = "force-dynamic";

const BASE = "https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/Reels/Drama%20and%20documentary/";

const TRACKS = [
  { title: "Afro Groove", src: BASE + "Afro%20groove%20Master.mp3" },
  { title: "Alien (pitch) | SEGA", src: BASE + "Alien%20%28pitch%29%20%7C%20SEGA.mp3" },
  { title: "Armada | Axis Animation", src: BASE + "Armada%20%7C%20Axis%20Animation.mp3" },
  { title: "Bells, Fireworks | Redbird Films", src: BASE + "Bells%2C%20Fireworks%20%7C%20Redbird%20films.mp3" },
  { title: "China Tran Full Mix", src: BASE + "China%20Tran%20Full%20Mix.mp3" },
  { title: "Desert Mood — Atmos", src: BASE + "Desert%20mood%20full%20-%20Atmos.mp3" },
  { title: "Fire in the Night, Emergency | ITV", src: BASE + "Fire%20in%20the%20night%2C%20Emergency%20%7C%20ITV.mp3" },
  { title: "Forward Motion V2", src: BASE + "Forward%20motion%20V2%20Master.mp3" },
  { title: "Funk Train", src: BASE + "Funk%20Train%20Master%20Full%20Mix.mp3" },
  { title: "Gentle Mbira with Flute", src: BASE + "Gentle%20Mbira%20with%20Flute.mp3" },
  { title: "God Help The Girl, Interlude | Stuart Murdoch", src: BASE + "God%20Help%20The%20Girl%2C%20Interlude%20%7C%20Stuart%20Murdoch.mp3" },
  { title: "Great Migration (piano start)", src: BASE + "Great%20Migration_master_%28pianostart%29.mp3" },
  { title: "Hole | Blazing Griffin", src: BASE + "Hole%20%7C%20Blazing%20Griffin.mp3" },
  { title: "Holy Hell, Broken Garden | CNN", src: BASE + "Holy%20Hell%2C%20Broken%20Garden%20%7C%20CNN.mp3" },
  { title: "Holy Hell, Moving Out | CNN", src: BASE + "Holy%20Hell%2C%20Moving%20out%20%7C%20CNN.mp3" },
  { title: "Holy Hell, My Name Is Will | CNN", src: BASE + "Holy%20Hell%2C%20my%20name%20is%20will%20%7C%20CNN.mp3" },
  { title: "Leather Factory", src: BASE + "Leather%20Factory%20master%20V2.mp3" },
  { title: "Master of the Plains", src: BASE + "Master%20of%20the%20plains_MIX%20shorter.mp3" },
  { title: "Mountain Pass", src: BASE + "Mountain%20Pass%20Full.mp3" },
  { title: "Necraphilia | Michael Millichamp", src: BASE + "Necraphilia%20%7C%20Michael%20Millichamp.mp3" },
  { title: "Slow Trains Titles", src: BASE + "Slow%20Trains%20TItles%20Master.mp3" },
  { title: "Steam Ahead", src: BASE + "Steam%20Ahead%20Master.mp3" },
  { title: "Vic Falls", src: BASE + "Vic%20Falls%20Full%20Mix.mp3" },
  { title: "Water Melon", src: BASE + "Water%20Melon.mp3" },
];

export default function DramaDocumentaryPage() {
  const sideImages = pickDramaDocumentaryImages(3);
  return (
    <ReelPlayerContent
      tracks={TRACKS}
      heading="Selected Drama & Documentary"
      framing="Scores for feature documentary, short drama and factual work. From intimate chamber pieces to large-scale orchestral and world music-influenced compositions."
      sideImages={sideImages}
    />
  );
}
