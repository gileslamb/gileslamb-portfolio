import type { WithContext, Thing, BreadcrumbList, Blog, BlogPosting } from "schema-dts";
import { GILES_ID, BASE_URL, gilesLamb } from "./person";
import { curiousDreamers, savalas, screenFacilitiesScotland, filmCityGlasgow } from "./organizations";

// schema-dts uses narrow discriminated unions that can't be spread.
// Cast each entity to a plain object with @context before returning.
type JsonLdObject = Record<string, unknown>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withContext(entity: any): JsonLdObject {
  return { "@context": "https://schema.org", ...entity };
}

/** Global schemas injected on every page. */
export function buildGlobalSchemas(): JsonLdObject[] {
  return [
    withContext(gilesLamb),
    withContext(curiousDreamers),
    withContext(savalas),
    withContext(screenFacilitiesScotland),
    withContext(filmCityGlasgow),
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: "Giles Lamb",
      url: BASE_URL,
      publisher: { "@id": GILES_ID },
    },
  ];
}

/** Breadcrumb for a /work/[slug] page. */
export function buildWorkBreadcrumb(title: string, slug: string): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Work", item: `${BASE_URL}/#work` },
      { "@type": "ListItem", position: 3, name: title, item: `${BASE_URL}/work/${slug}` },
    ],
  };
}

/** Breadcrumb for /immersive or /writing. */
export function buildSectionBreadcrumb(
  section: string,
  path: string
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: section, item: `${BASE_URL}/${path}` },
    ],
  };
}

/** Breadcrumb for /writing/[slug]. */
export function buildEssayBreadcrumb(title: string, slug: string): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Essays", item: `${BASE_URL}/writing` },
      { "@type": "ListItem", position: 3, name: title, item: `${BASE_URL}/writing/${slug}` },
    ],
  };
}

/** Blog schema for /writing listing page. */
export function buildBlogSchema(): WithContext<Blog> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${BASE_URL}/writing#blog`,
    name: "The Quiet Room",
    description: "Essays on sound, image, and the act of making by Giles Lamb.",
    url: `${BASE_URL}/writing`,
    author: { "@id": GILES_ID } as any,
    publisher: { "@id": GILES_ID } as any,
  };
}

/** BlogPosting schema for a single essay. */
export function buildBlogPostingSchema(opts: {
  title: string;
  description?: string;
  date: string;
  slug: string;
  coverImage?: string;
}): WithContext<BlogPosting> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${BASE_URL}/writing/${opts.slug}#article`,
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    url: `${BASE_URL}/writing/${opts.slug}`,
    author: { "@id": GILES_ID } as any,
    publisher: { "@id": GILES_ID } as any,
    isPartOf: { "@id": `${BASE_URL}/writing#blog` } as any,
    ...(opts.coverImage ? { image: opts.coverImage } : {}),
  };
}
