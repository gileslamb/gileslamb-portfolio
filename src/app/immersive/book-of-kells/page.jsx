import { BookOfKellsCaseStudy } from "@/components/case-studies/BookOfKellsCaseStudy";

export default async function ImmersiveBookOfKellsPage() {
  return (
    <BookOfKellsCaseStudy
      backHref="/immersive"
      backLabel="← Back to Installation & Museum"
    />
  );
}
