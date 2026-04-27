import { SirenServersCaseStudy } from "@/components/case-studies/SirenServersCaseStudy";
import { JsonLd } from "@/components/JsonLd";
import { buildSirenServersSchema } from "@/lib/schema/works";
import { buildWorkBreadcrumb } from "@/lib/schema/helpers";

export default function SirenServersPage() {
  return (
    <>
      <JsonLd schema={[buildSirenServersSchema(), buildWorkBreadcrumb("Siren Servers", "siren-servers")]} />
      <SirenServersCaseStudy />
    </>
  );
}
