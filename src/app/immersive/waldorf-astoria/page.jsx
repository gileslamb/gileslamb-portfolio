import { notFound } from "next/navigation";
import { ImmersiveCaseStudy } from "@/components/ImmersiveCaseStudy";
import { getImmersiveProject } from "@/data/immersive";

export default function WaldorfAstoriaPage() {
  const project = getImmersiveProject("waldorf-astoria");
  if (!project) notFound();
  return <ImmersiveCaseStudy project={project} />;
}
