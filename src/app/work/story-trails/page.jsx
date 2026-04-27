import { StoryTrailsCaseStudy } from "@/components/case-studies/StoryTrailsCaseStudy";
import { JsonLd } from "@/components/JsonLd";
import { buildStoryTrailsSchema } from "@/lib/schema/works";
import { buildWorkBreadcrumb } from "@/lib/schema/helpers";

export default function StoryTrailsPage() {
  return (
    <>
      <JsonLd schema={[buildStoryTrailsSchema(), buildWorkBreadcrumb("Story Trails", "story-trails")]} />
      <StoryTrailsCaseStudy />
    </>
  );
}
