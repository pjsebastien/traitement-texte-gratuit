import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles } from "@/lib/mdx";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import ArticleCard from "@/components/ArticleCard";
import categories from "../../../../data/categories.json";

const SITE_URL = "https://www.traitement-de-texte-gratuit.fr";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};

  const title = `${category.name} - Traitement de Texte Gratuit`;
  const description = category.description;
  const url = `${SITE_URL}/categorie/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Traitement de Texte Gratuit",
      type: "website",
      locale: "fr_FR",
    },
  };
}

export default async function CategoriePage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const allArticles = getAllArticles();
  const articles = allArticles.filter((a) => a.category === slug);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Accueil", url: SITE_URL },
    { name: category.name, url: `${SITE_URL}/categorie/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link
              href="/"
              className="hover:text-blue-600 transition-colors"
            >
              Accueil
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </nav>

          {/* En-tete */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              {category.name}
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl">
              {category.description}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {articles.length} article{articles.length > 1 ? "s" : ""}
            </p>
          </div>

          {/* Grille d'articles */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">
                Aucun article dans cette catégorie pour le moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
