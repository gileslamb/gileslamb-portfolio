import { notFound } from "next/navigation";
import { ImmersiveCaseStudy } from "@/components/ImmersiveCaseStudy";
import { JsonLd } from "@/components/JsonLd";
import { getImmersiveProject } from "@/data/immersive";
import { buildMailRailSchema } from "@/lib/schema/works";

export const metadata = {
  title: "Mail Rail · The Postal Museum · Giles Lamb",
  description:
    "Original score and full sound design for the Mail Rail ride at The Postal Museum, London.",
};

export default function MailRailPage() {
  const project = getImmersiveProject("mail-rail");
  if (!project) notFound();
  return (
    <>
      <JsonLd schema={buildMailRailSchema()} />
      <ImmersiveCaseStudy project={project} />
    </>
  );
}
