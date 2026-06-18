import { ReelPlayerContent } from "@/components/ReelPlayerContent";

const BASE = "https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/Reels/Cinematics%20and%20trailers/";

const TRACKS = [
  { title: "AD | Illion Studios", src: BASE + "AD%20%7C%20Illion%20Studios.mp3" },
  { title: "Darksiders2 TV Spot | THQ", src: BASE + "Darksiders2%20TV%20Spot%20%7C%20THQ.mp3" },
  { title: "Darksiders2, Death Eternal Trailer | THQ", src: BASE + "Darksiders2%2C%20Death%20Eternal%20Trailer%20%7C%20THQ.mp3" },
  { title: "Dead Island Trailer | Deep Silver", src: BASE + "Dead%20Island%20Trailer%20%7C%20Deep%20Silver.mp3" },
  { title: "Drakensang | Radon Labs", src: BASE + "Drakensang%20%7C%20Radon%20Labs.mp3" },
  { title: "Exxon (pitch) | Felt Music", src: BASE + "Exxon%20%28pitch%29%20%7C%20Felt%20Music.mp3" },
  { title: "Fable Legends Trailer | Lionhead", src: BASE + "Fable%20Legends%20Trailer%20%7C%20Lionhead.mp3" },
  { title: "Fragment | Axis", src: BASE + "Fragment%20%7C%20Axis.mp3" },
  { title: "Grey Goo | Six Foot Games", src: BASE + "Grey%20Goo%20%7C%20Six%20Foot%20Games.mp3" },
  { title: "Interstellar Trailer (Pitch) | Paramount", src: BASE + "Interstellar%20Trailer%20%28Pitch%29%20%7C%20Paramount.mp3" },
  { title: "Reel Theme | Axis Animation", src: BASE + "Reel%20Theme%20%7C%20Axis%20Animation.mp3" },
  { title: "Resident Evil ORC Demo2 v2.01", src: BASE + "Resident%20Evil%20ORC%20Demo2%20v2.01.mp3" },
  { title: "Risen2, Dark Waters Trailer | Piranha Bytes", src: BASE + "Risen2%2C%20Dark%20Waters%20Trailer%20%7C%20Piranha%20Bytes.mp3" },
  { title: "Simple Dreams | Salvation Army", src: BASE + "Simple%20Dreams%20%7C%20Salvation%20Army.mp3" },
  { title: "Suckerpunch Dragons | Warner Bros", src: BASE + "Suckerpunch%20Dragons%20%7C%20Warner%20Bros.mp3" },
  { title: "Suckerpunch Robots | Warner Bros", src: BASE + "Suckerpunch%20Robots%20%7C%20Warner%20Bros.mp3" },
  { title: "Suckerpunch Samurai | Warner Bros", src: BASE + "Suckerpunch%20Samurai%20%7C%20Warner%20Bros.mp3" },
  { title: "Suckerpunch World War — v1 | Warner Bros", src: BASE + "Suckerpunch%20World%20War%20-%20v1%20%7C%20Warner%20Bros.mp3" },
  { title: "Suckerpunch World War — v2 | Warner Bros", src: BASE + "Suckerpunch%20World%20War%20-%20v2%20%7C%20Warner%20Bros.mp3" },
];

export default function CinematicsTrailersPage() {
  return (
    <ReelPlayerContent
      tracks={TRACKS}
      heading="Selected Cinematics & Trailers"
      framing="Score and music for game cinematics, film trailers and commercial work. Orchestral, electronic and hybrid approaches across major studio and independent productions."
    />
  );
}
