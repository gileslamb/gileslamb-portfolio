import fs from "fs";
import path from "path";
import matter from "gray-matter";

const WRITING_DIR = path.join(process.cwd(), "content/writing");

/** Parse frontmatter date (YYYY-MM-DD) as a local calendar date — avoids UTC off-by-one in display/sort. */
export function parseWritingDate(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return new Date(NaN);
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr.trim());
  if (!m) return new Date(dateStr);
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

export function formatWritingDateShort(dateStr) {
  return parseWritingDate(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatWritingDateLong(dateStr) {
  return parseWritingDate(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getAllPosts() {
  const files = fs.readdirSync(WRITING_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const fullPath = path.join(WRITING_DIR, file);
    const content = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(content);
    return {
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle ?? data.description ?? "",
      date: data.date,
      coverImage: data.coverImage || null,
    };
  });
  return posts.sort(
    (a, b) =>
      parseWritingDate(b.date).getTime() - parseWritingDate(a.date).getTime(),
  );
}

export function getPostBySlug(slug) {
  const files = fs.readdirSync(WRITING_DIR).filter((f) => f.endsWith(".mdx"));
  const file = files.find((f) => {
    const fullPath = path.join(WRITING_DIR, f);
    const content = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(content);
    return data.slug === slug;
  });
  if (!file) return null;
  const fullPath = path.join(WRITING_DIR, file);
  const content = fs.readFileSync(fullPath, "utf8");
  const { data, content: body } = matter(content);
  return { frontmatter: data, body };
}
