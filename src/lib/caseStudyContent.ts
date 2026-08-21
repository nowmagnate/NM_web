import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

/**
 * MDX case-study loader. Runs at build time only (this is called from
 * `generateStaticParams` and Server Components, never shipped to the
 * client) — `fs` access here is normal Node, not a runtime dependency of the
 * static export.
 *
 * The content directory is empty right now (see the README inside it), so
 * every function here correctly returns nothing until real files exist. No
 * placeholder or invented case study is generated to fill the gap.
 */

const CONTENT_DIR = join(process.cwd(), "src", "content", "case-studies");

export type CaseStudyFrontmatter = {
  title: string;
  client: string;
  summary: string;
  services: string[];
  year: number;
};

export type CaseStudyContent = {
  slug: string;
  frontmatter: CaseStudyFrontmatter;
  body: string;
};

/** Slugs derived from filenames, so a new .mdx file is the only step needed. */
export function getAllCaseStudySlugs(): string[] {
  if (!existsSync(CONTENT_DIR)) return [];
  return readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getCaseStudyContent(slug: string): CaseStudyContent | null {
  const filePath = join(CONTENT_DIR, `${slug}.mdx`);
  if (!existsSync(filePath)) return null;

  const raw = readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as CaseStudyFrontmatter,
    body: content,
  };
}
