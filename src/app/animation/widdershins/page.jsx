import { notFound } from "next/navigation";
import { AnimationCaseStudy } from "@/components/AnimationCaseStudy";
import { getAnimationProject } from "@/data/animation";

export default function WiddershinsPage() {
  const project = getAnimationProject("widdershins");
  if (!project) notFound();
  return <AnimationCaseStudy project={project} />;
}
