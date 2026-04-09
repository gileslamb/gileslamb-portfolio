import { notFound } from "next/navigation";
import { ImmersiveCaseStudy } from "@/components/ImmersiveCaseStudy";
import { getImmersiveProject } from "@/data/immersive";

export default function EpicIrelandPage() {
  const project = getImmersiveProject("epic-ireland");
  if (!project) notFound();
  return <ImmersiveCaseStudy project={project} />;
}
