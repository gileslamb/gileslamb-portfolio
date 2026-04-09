import { notFound } from "next/navigation";
import { ImmersiveCaseStudy } from "@/components/ImmersiveCaseStudy";
import { getImmersiveProject } from "@/data/immersive";

export default function MonarchTheatrePage() {
  const project = getImmersiveProject("monarch-theatre");
  if (!project) notFound();
  return <ImmersiveCaseStudy project={project} />;
}
