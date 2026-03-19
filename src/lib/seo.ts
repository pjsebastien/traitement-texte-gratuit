import type { Metadata } from "next";
import { cloudinaryUrl } from "./cloudinary";

const SITE_URL = "https://www.traitement-de-texte-gratuit.fr";
const SITE_NAME = "Traitement de Texte Gratuit";

export interface ArticleMeta {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  category: string;
  keywords: string[];
  featuredImage?: string;
}

export function generateArticleMetadata(article: ArticleMeta): Metadata {
  const url = `${SITE_URL}/${article.slug}`;
  const images = article.featuredImage
    ? [{ url: cloudinaryUrl(article.featuredImage, { width: 1200, height: 630 }) }]
    : [];

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.updated || article.date,
      images,
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images,
    },
  };
}

export function generateArticleJsonLd(article: ArticleMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated || article.date,
    url: `${SITE_URL}/${article.slug}`,
    image: article.featuredImage
      ? cloudinaryUrl(article.featuredImage, { width: 1200, height: 630 })
      : undefined,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Trouvez les meilleurs logiciels de traitement de texte gratuits et alternatives aux outils populaires.",
    inLanguage: "fr-FR",
  };
}

export function generateFAQJsonLd(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
