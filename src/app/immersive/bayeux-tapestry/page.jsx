import { notFound } from "next/navigation";
import { ImmersiveCaseStudy } from "@/components/ImmersiveCaseStudy";
import { JsonLd } from "@/components/JsonLd";
import { getImmersiveProject } from "@/data/immersive";
import { buildBayeuxTapestrySchema } from "@/lib/schema/works";

export const metadata = {
  title: "Bayeux Tapestry · British Museum · Giles Lamb",
  description:
    "Score and sound design for the immersive spaces of the British Museum's Bayeux Tapestry exhibition.",
};

export default function BayeuxTapestryPage() {
  const project = getImmersiveProject("bayeux-tapestry");
  if (!project) notFound();
  return (
    <>
      <JsonLd schema={buildBayeuxTapestrySchema()} />
      <ImmersiveCaseStudy project={project} />
    </>
  );
}
