import { notFound } from "next/navigation";
import { AnimationCaseStudy } from "@/components/AnimationCaseStudy";
import { getAnimationProject } from "@/data/animation";

export default function WoollyAndTigPage() {
  const project = getAnimationProject("woolly-and-tig");
  if (!project) notFound();
  return <AnimationCaseStudy project={project} />;
}
