import { notFound } from "next/navigation";
import { AnimationCaseStudy } from "@/components/AnimationCaseStudy";
import { getAnimationProject } from "@/data/animation";

export default function HushahyeLullabyPage() {
  const project = getAnimationProject("hushabye-lullaby");
  if (!project) notFound();
  return <AnimationCaseStudy project={project} />;
}
