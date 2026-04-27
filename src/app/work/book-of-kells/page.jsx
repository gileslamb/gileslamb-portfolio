import { BookOfKellsCaseStudy } from "@/components/case-studies/BookOfKellsCaseStudy";
import { JsonLd } from "@/components/JsonLd";
import { buildWorkBreadcrumb } from "@/lib/schema/helpers";
import { BASE_URL, GILES_ID } from "@/lib/schema/person";

const schema = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": `${BASE_URL}/work/book-of-kells#work`,
  name: "Book of Kells Experience",
  creator: { "@id": GILES_ID },
  url: `${BASE_URL}/work/book-of-kells`,
};

export default async function BookOfKellsPage() {
  return (
    <>
      <JsonLd schema={[schema, buildWorkBreadcrumb("Book of Kells Experience", "book-of-kells")]} />
      <BookOfKellsCaseStudy />
    </>
  );
}
