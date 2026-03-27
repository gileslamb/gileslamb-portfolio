import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

export type ProjectFrontmatter = {
  title: string;
  client: string;
  role: string;
  category: string;
  slug: string;
  year?: string;
  thumbnailId: string;
  image2Id: string;
  videoId: string;
  metadataRow: string;
};

export function getProjectBySlug(slug: string): {
  frontmatter: ProjectFrontmatter;
  body: string;
} | null {
  const file = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const content = fs.readFileSync(file, "utf8");
  const { data, content: body } = matter(content);
  return { frontmatter: data as ProjectFrontmatter, body };
}
