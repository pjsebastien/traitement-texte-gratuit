import Link from "next/link";
import categories from "../../data/categories.json";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-24 pb-16">
      <div className="max-w-lg mx-auto px-4 text-center">
        <p className="text-6xl font-extrabold text-blue-600 mb-4">404</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
          Page introuvable
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          La page que vous cherchez n'existe pas ou a été déplacée. Vous
          pouvez revenir à l'accueil ou parcourir nos catégories.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Parcourir par catégorie
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categorie/${cat.slug}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
