"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { cloudinaryUrl } from "@/lib/cloudinary";
import type { Article } from "@/lib/mdx";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/${article.slug}`} className="group block">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300">
          {article.featuredImage && (
            <div className="aspect-[16/9] overflow-hidden bg-gray-100">
              <Image
                src={cloudinaryUrl(article.featuredImage, { width: 600 })}
                alt={article.title}
                width={600}
                height={338}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="p-5">
            {article.category && (
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                {article.category}
              </span>
            )}
            <h3 className="text-lg font-bold text-gray-900 mt-1.5 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
              {article.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime}
              </span>
              <span className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                Lire
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
