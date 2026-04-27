import { notFound } from "next/navigation";
import { AnimationCaseStudy } from "@/components/AnimationCaseStudy";
import { getAnimationProject } from "@/data/animation";

export default function TheBurryManPage() {
  const project = getAnimationProject("the-burry-man");
  if (!project) notFound();
  return <AnimationCaseStudy project={project} />;
}
