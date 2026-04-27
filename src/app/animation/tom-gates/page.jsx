import { notFound } from "next/navigation";
import { AnimationCaseStudy } from "@/components/AnimationCaseStudy";
import { getAnimationProject } from "@/data/animation";

export default function TomGatesPage() {
  const project = getAnimationProject("tom-gates");
  if (!project) notFound();
  return <AnimationCaseStudy project={project} />;
}
