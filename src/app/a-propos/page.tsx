import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "A propos",
  description:
    "Découvrez l'équipe derrière Traitement de Texte Gratuit, un blog indépendant qui compare les logiciels gratuits de traitement de texte et les alternatives aux outils populaires.",
  alternates: {
    canonical: "https://www.traitement-de-texte-gratuit.fr/a-propos",
  },
};

export default function AProposPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6">
      <article className="max-w-3xl mx-auto prose prose-lg">
        <h1>A propos de Traitement de Texte Gratuit</h1>

        <section>
          <h2>Notre mission</h2>
          <p>
            <strong>Traitement de Texte Gratuit</strong> est un blog indépendant
            dédié à la comparaison des logiciels gratuits de traitement de texte
            et des alternatives aux outils populaires comme Microsoft Word ou
            Google Docs.
          </p>
          <p>
            Notre objectif est simple : vous aider à trouver les meilleurs
            outils gratuits pour rédiger, éditer et mettre en forme vos
            documents, sans dépenser un centime. Nous testons chaque logiciel,
            analysons ses fonctionnalités et partageons des avis honnêtes pour
            vous faire gagner du temps.
          </p>
        </section>

        <section>
          <h2>Qui sommes-nous ?</h2>
          <p>
            Notre équipe est composée de quatre rédacteurs passionnés par la
            tech et la productivité :
          </p>
          <ul>
            <li>
              <strong>Sébastien</strong> - Fondateur du site et responsable
              éditorial. Il supervise les contenus et veille à la qualité des
              comparatifs publiés.
            </li>
            <li>
              <strong>Lucas</strong> - Spécialiste bureautique. Il teste en
              profondeur chaque logiciel de traitement de texte et rédige les
              guides pratiques.
            </li>
            <li>
              <strong>Sarah</strong> - Experte SEO. Elle s&apos;assure que nos
              articles sont bien référencés et faciles à trouver pour ceux qui
              en ont besoin.
            </li>
            <li>
              <strong>Mehdi</strong> - Développeur et passionné d&apos;IA. Il
              explore les nouvelles technologies d&apos;écriture assistée et les
              outils innovants.
            </li>
          </ul>
        </section>

        <section>
          <h2>Notre modèle économique</h2>
          <p>
            L&apos;accès à tous nos articles et comparatifs est entièrement
            gratuit. Pour financer le site et couvrir les frais
            d&apos;hébergement, nous utilisons des{" "}
            <strong>liens affiliés</strong>. Concrètement, lorsque vous cliquez
            sur certains liens et effectuez un achat ou une inscription, nous
            percevons une petite commission, sans aucun surcoût pour vous.
          </p>
          <p>
            Cette source de revenus nous permet de rester indépendants et de
            continuer à publier des contenus objectifs. Nos avis ne sont jamais
            influencés par les programmes d&apos;affiliation : nous recommandons
            uniquement les outils que nous estimons réellement utiles.
          </p>
        </section>

        <section>
          <h2>Nous contacter</h2>
          <p>
            Une question, une suggestion ou une demande de partenariat ?
            Écrivez-nous à{" "}
            <a href="mailto:contact@traitement-de-texte-gratuit.fr">
              contact@traitement-de-texte-gratuit.fr
            </a>
            .
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-12">
          Consultez également nos{" "}
          <Link href="/mentions-legales">mentions légales</Link> et notre{" "}
          <Link href="/politique-de-confidentialite">
            politique de confidentialité
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
