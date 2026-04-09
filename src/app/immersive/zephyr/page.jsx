import { notFound } from "next/navigation";
import { ImmersiveCaseStudy } from "@/components/ImmersiveCaseStudy";
import { getImmersiveProject } from "@/data/immersive";

export default function ZephyrPage() {
  const project = getImmersiveProject("zephyr");
  if (!project) notFound();
  return <ImmersiveCaseStudy project={project} />;
}
