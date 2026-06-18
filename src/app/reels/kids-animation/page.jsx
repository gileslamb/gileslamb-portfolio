import { ReelPlayerContent } from "@/components/ReelPlayerContent";
import { pickKidsAnimationImages } from "@/data/kidsAnimationSideImages";

export const dynamic = "force-dynamic";

const BASE = "https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/Reels/Kids%20and%20animation/";

const TRACKS = [
  { title: "About Town, Widdershins", src: BASE + "About%20Town%2C%20Widdershins.mp3" },
  { title: "Brilliant World of Tom Gates, Make It | Sky Kids", src: BASE + "Brilliant%20World%20of%20Tom%20Gates%2C%20Make%20it%20%7C%20Sky%20Kids.mp3" },
  { title: "Burryman — End Theme | Devil May Care", src: BASE + "Burryman_End%20theme%20%7C%20Devil%20May%20Care.mp3" },
  { title: "Burryman — Intro | Devil May Care", src: BASE + "Burryman_Intro%20%7C%20Devil%20May%20Care.mp3" },
  { title: "Counting Kisses — Night Light Version", src: BASE + "Counting%20Kisses_Night%20Light%20Version.mp3" },
  { title: "DasGaden | EBU Shorts", src: BASE + "DasGaden%20%7C%20EBU%20Shorts.mp3" },
  { title: "DasGaden, Garage Cue | EBU Shorts", src: BASE + "DasGaden%2C%20Garage%20Cue%20%7C%20EBU%20Shorts.mp3" },
  { title: "Stay Sure | Curiouss", src: BASE + "Stay%20Sure%20%7C%20Curiouss.mp3" },
  { title: "Widdershins — Outro | Once Were Farmers", src: BASE + "Widdershins_Outro%20%7C%20Once%20Were%20Farmers.mp3" },
];

export default function KidsAnimationPage() {
  const sideImages = pickKidsAnimationImages(3);
  return (
    <ReelPlayerContent
      tracks={TRACKS}
      heading="Selected Kids & Animation"
      framing="Original scores and themes for children's animation and kids' TV across BBC, Sky, CBBC and independent productions. Playful, characterful, emotionally precise."
      sideImages={sideImages}
    />
  );
}
