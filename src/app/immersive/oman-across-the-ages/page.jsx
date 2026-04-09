import { notFound } from "next/navigation";
import { ImmersiveCaseStudy } from "@/components/ImmersiveCaseStudy";
import { getImmersiveProject } from "@/data/immersive";

export default function OmanAcrossTheAgesPage() {
  const project = getImmersiveProject("oman-across-the-ages");
  if (!project) notFound();
  return <ImmersiveCaseStudy project={project} />;
}
