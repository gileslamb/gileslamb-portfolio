import fs from "fs";
import path from "path";
import matter from "gray-matter";

const WRITING_DIR = path.join(process.cwd(), "content/writing");

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
  return posts.sort((a, b) => (b.date > a.date ? 1 : -1));
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
