import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getArticle } from "@/lib/mdx";
import { cloudinaryUrl } from "@/lib/cloudinary";

interface RelatedArticlesProps {
  slugs: string; // JSON string: string[] — ex: '["alternative-notion","protonmail-alternative"]'
}

export default function RelatedArticles({ slugs }: RelatedArticlesProps) {
  const slugList: string[] = JSON.parse(slugs);
  const articles = slugList
    .map((s) => getArticle(s))
    .filter((a) => a !== null);

  if (articles.length === 0) return null;

  return (
    <div className="my-10 not-prose">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-blue-600 rounded-full" />
        Sur le même sujet
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/${article.slug}`}
            className="group flex gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-200 hover:shadow-md transition-all"
          >
            {article.featuredImage && (
              <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={cloudinaryUrl(article.featuredImage, { width: 160 })}
                  alt={article.title}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="min-w-0 flex flex-col justify-center">
              <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {article.title}
              </p>
              <p className="text-xs text-blue-600 font-medium mt-1.5 flex items-center gap-1 group-hover:gap-2 transition-all">
                Lire <ArrowRight className="w-3 h-3" />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
