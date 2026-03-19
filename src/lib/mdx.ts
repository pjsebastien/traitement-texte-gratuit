import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { ArticleMeta } from "./seo";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export interface Article extends ArticleMeta {
  content: string;
  readingTime: string;
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getArticle(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    title: data.title || "",
    description: data.description || "",
    slug,
    date: data.date || "",
    updated: data.updated || undefined,
    category: data.category || "",
    keywords: data.keywords || [],
    featuredImage: data.featuredImage || undefined,
    content,
    readingTime: stats.text.replace("read", "de lecture"),
  };
}

export function getAllArticles(): Article[] {
  return getArticleSlugs()
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => a !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
