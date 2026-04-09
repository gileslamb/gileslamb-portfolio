import { MuseumReelContent } from "@/components/MuseumReelContent";
import { pickMuseumReelGalleryImages } from "@/data/museumReelSideImages";

export const dynamic = "force-dynamic";

export default function MuseumReelPage() {
  const sideImages = pickMuseumReelGalleryImages(3);
  return <MuseumReelContent sideImages={sideImages} />;
}
