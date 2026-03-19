import Link from "next/link";
import { FileText } from "lucide-react";
import categories from "../../data/categories.json";

const POPULAR_ARTICLES = [
  { slug: "zoho-writer-gratuit", label: "Zoho Writer gratuit" },
  { slug: "alternatives-notion", label: "Alternatives à Notion" },
  {
    slug: "meilleurs-generateurs-de-texte-ia",
    label: "Générateurs de texte IA",
  },
  { slug: "alternative-a-powerpoint", label: "Alternatives à PowerPoint" },
  {
    slug: "traitement-de-texte-ipad-gratuit",
    label: "Traitement de texte iPad",
  },
];

const INFO_LINKS = [
  { href: "/a-propos", label: "À propos" },
  { href: "/mentions-legales", label: "Mentions légales" },
  {
    href: "/politique-de-confidentialite",
    label: "Politique de confidentialité",
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Colonne 1 : Logo + description */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">
                Traitement de Texte Gratuit
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Guides, comparatifs et avis sur les meilleurs logiciels gratuits de
              traitement de texte et outils de productivité.
            </p>
          </div>

          {/* Colonne 2 : Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categorie/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Ressources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Ressources</h3>
            <ul className="space-y-2.5 text-sm">
              {POPULAR_ARTICLES.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/${article.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {article.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Informations */}
          <div>
            <h3 className="text-white font-semibold mb-4">Informations</h3>
            <ul className="space-y-2.5 text-sm">
              {INFO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          &copy; {new Date().getFullYear()} traitement-de-texte-gratuit.fr.
          Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
