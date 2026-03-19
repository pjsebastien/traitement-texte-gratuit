import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import TableOfContents from "./TableOfContents";
import { cloudinaryUrl } from "@/lib/cloudinary";
import type { Article } from "@/lib/mdx";

interface ArticleLayoutProps {
  article: Article;
  children: React.ReactNode;
}

export default function ArticleLayout({
  article,
  children,
}: ArticleLayoutProps) {
  const formattedDate = new Date(article.date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
        <nav className="flex items-center gap-1.5 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium truncate">
            {article.title}
          </span>
        </nav>
      </div>

      {/* Featured image */}
      {article.featuredImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={cloudinaryUrl(article.featuredImage, { width: 1200 })}
              alt={article.title}
              width={1200}
              height={630}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      {/* Article header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 mb-10">
        {/* H1 hidden visually (title is in the thumbnail) but kept in DOM for SEO */}
        <h1 className="sr-only">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          {article.category && (
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {article.category}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {article.readingTime}
          </span>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed mt-4">
          {article.description}
        </p>
      </header>

      {/* Content + TOC */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          <article className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-sm">
            {children}
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
