import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticle, getArticleSlugs } from "@/lib/mdx";
import { generateArticleMetadata, generateArticleJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import ArticleLayout from "@/components/ArticleLayout";
import CloudinaryImage from "@/components/CloudinaryImage";
import AffiliateLink from "@/components/AffiliateLink";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import ComparisonTable from "@/components/mdx/ComparisonTable";
import Callout from "@/components/mdx/Callout";
import ProsConsBox from "@/components/mdx/ProsConsBox";
import FeatureGrid from "@/components/mdx/FeatureGrid";
import CtaBanner from "@/components/mdx/CtaBanner";
import Rating from "@/components/mdx/Rating";
import AuthorBox from "@/components/mdx/AuthorBox";
import RelatedArticles from "@/components/mdx/RelatedArticles";
import categories from "../../../data/categories.json";

const mdxComponents = {
  CloudinaryImage,
  AffiliateLink,
  YouTubeEmbed,
  ComparisonTable,
  Callout,
  ProsConsBox,
  FeatureGrid,
  CtaBanner,
  Rating,
  AuthorBox,
  RelatedArticles,
};

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return generateArticleMetadata(article);
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const articleJsonLd = generateArticleJsonLd(article);
  const category = categories.find((c) => c.slug === article.category);
  const categoryName = category ? category.name : article.category;
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Accueil", url: "https://www.traitement-de-texte-gratuit.fr" },
    {
      name: categoryName,
      url: `https://www.traitement-de-texte-gratuit.fr/categorie/${article.category}`,
    },
    {
      name: article.title,
      url: `https://www.traitement-de-texte-gratuit.fr/${article.slug}`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ArticleLayout article={article}>
        <MDXRemote source={article.content} components={mdxComponents} />
      </ArticleLayout>
    </>
  );
}
