import { notFound } from "next/navigation";
import { ImmersiveCaseStudy } from "@/components/ImmersiveCaseStudy";
import { getImmersiveProject } from "@/data/immersive";

export default function CarlsbergPage() {
  const project = getImmersiveProject("carlsberg");
  if (!project) notFound();
  return <ImmersiveCaseStudy project={project} />;
}
