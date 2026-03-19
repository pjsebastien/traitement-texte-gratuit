import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/lib/mdx";
import { generateWebsiteJsonLd, generateFAQJsonLd } from "@/lib/seo";
import { cloudinaryUrl } from "@/lib/cloudinary";
import ArticleCard from "@/components/ArticleCard";
import categories from "../../data/categories.json";
import {
  CheckCircle,
  XCircle,
  Minus,
  Globe,
  Download,
  Apple,
  Smartphone,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.traitement-de-texte-gratuit.fr",
  },
};

/* ───── Data: comparatif traitements de texte gratuits ───── */
const TOOLS = [
  {
    name: "Google Docs",
    logo: "blog-screenshots/google-docs-home",
    url: "https://docs.google.com/",
    type: "En ligne",
    os: ["Windows", "Mac", "Linux", "iOS", "Android"],
    offline: "Partiel",
    collab: true,
    docx: true,
    pdf: true,
    free: "100% gratuit",
    bestFor: "Collaboration en temps réel",
    slug: "alternative-google-docs",
    description:
      "Le traitement de texte en ligne de Google. Gratuit, accessible depuis un navigateur, avec sauvegarde automatique et collaboration en temps réel. Nécessite un compte Google.",
  },
  {
    name: "LibreOffice Writer",
    logo: "blog-screenshots/libreoffice-writer-home",
    url: "https://fr.libreoffice.org/",
    type: "Bureau",
    os: ["Windows", "Mac", "Linux"],
    offline: "Oui",
    collab: false,
    docx: true,
    pdf: true,
    free: "100% gratuit",
    bestFor: "Alternative complète à Word",
    slug: "alternative-libreoffice-open-source",
    description:
      "Le traitement de texte open source le plus complet. Compatible .docx, fonctionne hors ligne. L'alternative directe à Microsoft Word, sans abonnement.",
  },
  {
    name: "Microsoft Word Online",
    logo: "blog-screenshots/powerpoint-home",
    url: "https://www.microsoft.com/fr-fr/microsoft-365/free-office-online-for-the-web",
    type: "En ligne",
    os: ["Windows", "Mac", "Linux", "iOS", "Android"],
    offline: "Non",
    collab: true,
    docx: true,
    pdf: true,
    free: "Gratuit (version allégée)",
    bestFor: "Compatibilité Word parfaite",
    slug: "alternative-microsoft-office",
    description:
      "La version gratuite de Word dans le navigateur. Compatibilité .docx native. Moins de fonctions que la version payante, mais suffisant pour un usage courant.",
  },
  {
    name: "Apple Pages",
    logo: "blog-screenshots/apple-pages-home",
    url: "https://www.apple.com/fr/pages/",
    type: "Bureau + en ligne",
    os: ["Mac", "iOS"],
    offline: "Oui",
    collab: true,
    docx: true,
    pdf: true,
    free: "Gratuit (Apple uniquement)",
    bestFor: "Utilisateurs Mac et iPad",
    slug: "traitement-de-texte-ipad-gratuit",
    description:
      "Le traitement de texte d'Apple, préinstallé sur Mac et iPad. Interface soignée, bons modèles de documents. Export en .docx et PDF. Réservé à l'écosystème Apple.",
  },
  {
    name: "OnlyOffice",
    logo: "blog-screenshots/onlyoffice-home",
    url: "https://www.onlyoffice.com/fr/",
    type: "Bureau + en ligne",
    os: ["Windows", "Mac", "Linux"],
    offline: "Oui",
    collab: true,
    docx: true,
    pdf: true,
    free: "100% gratuit",
    bestFor: "Compatibilité Microsoft Office",
    slug: "alternative-microsoft-office",
    description:
      "Traitement de texte open source avec la meilleure compatibilité Microsoft Office du marché. L'interface ressemble à Word. Disponible en local et en ligne.",
  },
  {
    name: "Zoho Writer",
    logo: "blog-screenshots/zoho-writer-home",
    url: "https://www.zoho.com/fr/writer/",
    type: "En ligne",
    os: ["Windows", "Mac", "Linux", "iOS", "Android"],
    offline: "Partiel",
    collab: true,
    docx: true,
    pdf: true,
    free: "Gratuit (usage personnel)",
    bestFor: "Rédaction assistée par IA",
    slug: "zoho-writer-gratuit",
    description:
      "Traitement de texte en ligne avec correction grammaticale avancée et assistant IA intégré. Bonne alternative à Google Docs pour ceux qui veulent plus de contrôle sur leurs données.",
  },
];

function FeatureIcon({ value }: { value: boolean | string }) {
  if (value === true || value === "Oui")
    return <CheckCircle className="w-5 h-5 text-green-500" />;
  if (value === false || value === "Non")
    return <XCircle className="w-5 h-5 text-gray-300" />;
  return <Minus className="w-5 h-5 text-amber-400" />;
}

export default function HomePage() {
  const articles = getAllArticles();
  const websiteJsonLd = generateWebsiteJsonLd();

  const faqItems = [
    {
      question: "Quel est le meilleur traitement de texte gratuit ?",
      answer: "Google Docs pour un usage en ligne et collaboratif. LibreOffice Writer pour un usage hors ligne et un remplacement complet de Word. Les deux sont 100% gratuits et couvrent la grande majorité des besoins.",
    },
    {
      question: "Google Docs est-il vraiment gratuit ?",
      answer: "Oui. Google Docs est entièrement gratuit avec un compte Google. Il n'y a pas de version payante pour les particuliers. Le stockage est limité à 15 Go sur Google Drive (partagé avec Gmail et Google Photos).",
    },
    {
      question: "Quel traitement de texte gratuit pour remplacer Word ?",
      answer: "LibreOffice Writer est l'alternative la plus proche de Word. L'interface est similaire, il lit et écrit les fichiers .docx, et il offre les mêmes fonctions (styles, table des matières, publipostage). OnlyOffice est une autre bonne option si vous tenez à la compatibilité Microsoft.",
    },
    {
      question: "Peut-on utiliser Word gratuitement ?",
      answer: "Oui, via Word Online (office.com). C'est une version allégée de Word qui fonctionne dans le navigateur. Elle est gratuite avec un compte Microsoft. Les fonctions avancées (macros, publipostage) ne sont pas disponibles.",
    },
    {
      question: "Quel traitement de texte gratuit pour un étudiant ?",
      answer: "Google Docs est le plus simple. Pas d'installation, sauvegarde automatique, accessible depuis n'importe quel appareil. Beaucoup d'universités proposent aussi Google Workspace for Education ou Microsoft 365 Education gratuitement.",
    },
    {
      question: "Existe-t-il un traitement de texte gratuit hors ligne ?",
      answer: "Oui. LibreOffice Writer et OnlyOffice fonctionnent entièrement hors ligne. Il suffit de les télécharger et de les installer. Aucune connexion internet n'est nécessaire après l'installation.",
    },
  ];
  const faqJsonLd = generateFAQJsonLd(faqItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ───── Hero SEO ───── */}
      <section className="relative pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white to-white" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
            Les meilleurs{" "}
            <span className="text-blue-600">traitements de texte gratuits</span>{" "}
            en 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed">
            Google Docs, LibreOffice, Word Online, Pages, OnlyOffice, Zoho
            Writer. Quel traitement de texte gratuit choisir ? Comparatif
            complet avec les avantages, les limites et notre avis sur chaque
            logiciel.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Mis à jour en mars 2026. Testé par notre équipe.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#comparatif"
              className="px-7 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all text-base"
            >
              Voir le comparatif
            </a>
            <a
              href="#articles"
              className="px-7 py-3.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-blue-300 hover:shadow-md transition-all text-base"
            >
              Tous nos guides
            </a>
          </div>
        </div>
      </section>

      {/* ───── Intro SEO ───── */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg prose-gray max-w-none">
            <h2>Pourquoi utiliser un traitement de texte gratuit ?</h2>
            <p>
              Microsoft Word reste le traitement de texte le plus connu, mais son
              abonnement Microsoft 365 coûte plus de 70 euros par an. La bonne
              nouvelle : plusieurs alternatives gratuites couvrent 90% des besoins
              du quotidien. Rédiger un document, mettre en forme un CV, préparer
              un rapport ou écrire un mémoire, tout ça est possible sans dépenser
              un centime.
            </p>
            <p>
              Les traitements de texte gratuits se divisent en deux catégories :
              les <strong>outils en ligne</strong> (Google Docs, Word Online, Zoho
              Writer) qui fonctionnent dans le navigateur, et les{" "}
              <strong>logiciels à installer</strong> (LibreOffice, OnlyOffice)
              qui fonctionnent sans connexion internet. Chacun a ses avantages.
            </p>
          </div>
        </div>
      </section>

      {/* ───── Comparatif détaillé ───── */}
      <section id="comparatif" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
              Comparatif des traitements de texte gratuits
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              6 logiciels testés et comparés. Voici les différences qui comptent.
            </p>
          </div>

          {/* Tableau comparatif responsive */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm mb-12">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-5 font-semibold text-gray-900 w-40">
                    Logiciel
                  </th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-900">
                    Type
                  </th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-900">
                    Hors ligne
                  </th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-900">
                    Collaboration
                  </th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-900">
                    .docx
                  </th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-900">
                    Export PDF
                  </th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-900">
                    Prix
                  </th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-900">
                    Idéal pour
                  </th>
                </tr>
              </thead>
              <tbody>
                {TOOLS.map((tool, i) => (
                  <tr
                    key={tool.name}
                    className={`border-b border-gray-100 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    } hover:bg-blue-50/30 transition-colors`}
                  >
                    <td className="py-4 px-5">
                      <span className="font-semibold text-gray-900">
                        {tool.name}
                      </span>
                    </td>
                    <td className="text-center py-4 px-3">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600">
                        {tool.type === "En ligne" ? (
                          <Globe className="w-3.5 h-3.5" />
                        ) : tool.type === "Bureau" ? (
                          <Download className="w-3.5 h-3.5" />
                        ) : (
                          <Smartphone className="w-3.5 h-3.5" />
                        )}
                        {tool.type}
                      </span>
                    </td>
                    <td className="text-center py-4 px-3">
                      <div className="flex justify-center">
                        <FeatureIcon value={tool.offline} />
                      </div>
                    </td>
                    <td className="text-center py-4 px-3">
                      <div className="flex justify-center">
                        <FeatureIcon value={tool.collab} />
                      </div>
                    </td>
                    <td className="text-center py-4 px-3">
                      <div className="flex justify-center">
                        <FeatureIcon value={tool.docx} />
                      </div>
                    </td>
                    <td className="text-center py-4 px-3">
                      <div className="flex justify-center">
                        <FeatureIcon value={tool.pdf} />
                      </div>
                    </td>
                    <td className="text-center py-4 px-3 text-xs text-gray-600">
                      {tool.free}
                    </td>
                    <td className="text-center py-4 px-3 text-xs font-medium text-blue-600">
                      {tool.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cartes détaillées de chaque outil */}
          <h3 className="text-xl font-bold text-gray-900 mb-8">
            Notre avis sur chaque traitement de texte gratuit
          </h3>

          <div className="space-y-6">
            {TOOLS.map((tool, i) => (
              <div
                key={tool.name}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-0">
                  <div className="aspect-[16/9] md:aspect-auto overflow-hidden bg-gray-100">
                    <Image
                      src={cloudinaryUrl(tool.logo, { width: 560 })}
                      alt={`${tool.name}, traitement de texte gratuit`}
                      width={560}
                      height={315}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {i + 1}. {tool.name}
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          {tool.os.map((os) => (
                            <span
                              key={os}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                            >
                              {os}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full shrink-0">
                        {tool.free}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="nofollow noopener"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Visiter le site &rarr;
                      </a>
                      {tool.slug && (
                        <Link
                          href={`/${tool.slug}`}
                          className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          Lire notre avis
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Comment choisir ───── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg prose-gray max-w-none">
            <h2>Comment choisir son traitement de texte gratuit ?</h2>

            <h3>Vous travaillez souvent en équipe</h3>
            <p>
              Prenez <strong>Google Docs</strong>. La collaboration en temps réel
              est la meilleure du marché. Plusieurs personnes peuvent écrire dans
              le même document en même temps, avec un historique complet des
              modifications.
            </p>

            <h3>Vous voulez un vrai logiciel sur votre PC</h3>
            <p>
              <strong>LibreOffice Writer</strong> est le choix évident. Gratuit,
              open source, compatible avec les fichiers Word. Il s'installe sur
              Windows, Mac et Linux. Pas besoin de connexion internet.
            </p>

            <h3>Vous êtes sur Mac ou iPad</h3>
            <p>
              <strong>Apple Pages</strong> est déjà installé. L'interface est
              propre, les modèles de documents sont soignés. La synchronisation
              iCloud permet de passer d'un appareil à l'autre sans effort.
            </p>

            <h3>Vous devez envoyer des fichiers .docx</h3>
            <p>
              <strong>Word Online</strong> ou <strong>OnlyOffice</strong>. Les
              deux gèrent le format .docx nativement. Word Online a l'avantage de
              la compatibilité parfaite (c'est le format natif de Microsoft).
              OnlyOffice offre plus de fonctions en version bureau.
            </p>

            <h3>Vous cherchez une aide à la rédaction</h3>
            <p>
              <strong>Zoho Writer</strong> intègre un assistant IA qui corrige la
              grammaire, le style et propose des reformulations. Pour ceux qui
              veulent améliorer leur écriture en plus de rédiger.
            </p>
          </div>
        </div>
      </section>

      {/* ───── FAQ SEO ───── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-10 text-center">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Quel est le meilleur traitement de texte gratuit ?",
                a: "Google Docs pour un usage en ligne et collaboratif. LibreOffice Writer pour un usage hors ligne et un remplacement complet de Word. Les deux sont 100% gratuits et couvrent la grande majorité des besoins.",
              },
              {
                q: "Google Docs est-il vraiment gratuit ?",
                a: "Oui. Google Docs est entièrement gratuit avec un compte Google. Il n'y a pas de version payante pour les particuliers. Le stockage est limité à 15 Go sur Google Drive (partagé avec Gmail et Google Photos).",
              },
              {
                q: "Quel traitement de texte gratuit pour remplacer Word ?",
                a: "LibreOffice Writer est l'alternative la plus proche de Word. L'interface est similaire, il lit et écrit les fichiers .docx, et il offre les mêmes fonctions (styles, table des matières, publipostage). OnlyOffice est une autre bonne option si vous tenez à la compatibilité Microsoft.",
              },
              {
                q: "Peut-on utiliser Word gratuitement ?",
                a: "Oui, via Word Online (office.com). C'est une version allégée de Word qui fonctionne dans le navigateur. Elle est gratuite avec un compte Microsoft. Les fonctions avancées (macros, publipostage) ne sont pas disponibles.",
              },
              {
                q: "Quel traitement de texte gratuit pour un étudiant ?",
                a: "Google Docs est le plus simple. Pas d'installation, sauvegarde automatique, accessible depuis n'importe quel appareil. Beaucoup d'universités proposent aussi Google Workspace for Education ou Microsoft 365 Education gratuitement.",
              },
              {
                q: "Existe-t-il un traitement de texte gratuit hors ligne ?",
                a: "Oui. LibreOffice Writer et OnlyOffice fonctionnent entièrement hors ligne. Il suffit de les télécharger et de les installer. Aucune connexion internet n'est nécessaire après l'installation.",
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <summary className="cursor-pointer px-6 py-4 font-semibold text-gray-900 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span>{q}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Articles par catégorie ───── */}
      <section id="articles" className="pt-16">
        {categories.map((cat, index) => {
          const catArticles = articles
            .filter((a) => a.category === cat.slug)
            .slice(0, 3);

          if (catArticles.length === 0) return null;

          const bgClass = index % 2 === 0 ? "bg-white" : "bg-gray-50";

          return (
            <div key={cat.slug} className={`py-16 ${bgClass}`}>
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                      {cat.name}
                    </h2>
                    <p className="text-gray-500 text-sm">{cat.description}</p>
                  </div>
                  <Link
                    href={`/categorie/${cat.slug}`}
                    className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors shrink-0"
                  >
                    Voir tout &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catArticles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>

                <div className="sm:hidden mt-6 text-center">
                  <Link
                    href={`/categorie/${cat.slug}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Voir tout &rarr;
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ───── CTA final ───── */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Trouvez le logiciel gratuit parfait
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Des alternatives gratuites existent pour tous vos besoins. Nos guides
            vous aident à faire le bon choix.
          </p>
          <Link
            href="/categorie/traitement-de-texte"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
          >
            Découvrir nos guides
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
