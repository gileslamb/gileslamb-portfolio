import { notFound } from "next/navigation";
import { ImmersiveCaseStudy } from "@/components/ImmersiveCaseStudy";
import { getImmersiveProject } from "@/data/immersive";

export default function WallaceMonumentPage() {
  const project = getImmersiveProject("wallace-monument");
  if (!project) notFound();
  return <ImmersiveCaseStudy project={project} />;
}
