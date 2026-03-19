import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site traitement-de-texte-gratuit.fr, édité par Margouillapp.",
  alternates: {
    canonical:
      "https://www.traitement-de-texte-gratuit.fr/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6">
      <article className="max-w-3xl mx-auto prose prose-lg">
        <h1>Mentions légales</h1>

        <section>
          <h2>Editeur du site</h2>
          <p>
            Le site <strong>traitement-de-texte-gratuit.fr</strong> est édité
            par <strong>Margouillapp</strong>.
          </p>
          <ul>
            <li>Raison sociale : Margouillapp</li>
            <li>
              Site web :{" "}
              <a href="https://www.traitement-de-texte-gratuit.fr">
                traitement-de-texte-gratuit.fr
              </a>
            </li>
            <li>
              Email :{" "}
              <a href="mailto:contact@traitement-de-texte-gratuit.fr">
                contact@traitement-de-texte-gratuit.fr
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2>Directeur de la publication</h2>
          <p>
            Le directeur de la publication est <strong>Sébastien</strong>,
            fondateur de Margouillapp.
          </p>
        </section>

        <section>
          <h2>Hébergeur</h2>
          <p>Le site est hébergé par :</p>
          <ul>
            <li>Raison sociale : Vercel Inc.</li>
            <li>Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
            <li>
              Site web :{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                vercel.com
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, logos,
            captures d&apos;écran, mise en page) est protégé par le droit
            d&apos;auteur. Toute reproduction, même partielle, est interdite
            sans autorisation écrite préalable de l&apos;éditeur.
          </p>
          <p>
            Les marques et logos des logiciels mentionnés sur ce site
            appartiennent à leurs propriétaires respectifs.
          </p>
        </section>

        <section>
          <h2>Responsabilité</h2>
          <p>
            Les informations publiées sur traitement-de-texte-gratuit.fr sont
            fournies à titre informatif. Malgré tout le soin apporté à la
            rédaction, l&apos;éditeur ne peut garantir l&apos;exactitude,
            l&apos;exhaustivité ou l&apos;actualité des informations diffusées.
          </p>
          <p>
            L&apos;utilisation des informations et contenus disponibles sur ce
            site se fait sous la seule responsabilité de l&apos;utilisateur.
            L&apos;éditeur ne saurait être tenu responsable des dommages
            directs ou indirects résultant de l&apos;utilisation de ce site.
          </p>
        </section>

        <section>
          <h2>Liens hypertextes</h2>
          <p>
            Ce site peut contenir des liens vers des sites tiers.
            L&apos;éditeur n&apos;exerce aucun contrôle sur ces sites et
            décline toute responsabilité quant à leur contenu.
          </p>
          <p>
            Certains liens présents sur ce site sont des{" "}
            <strong>liens affiliés</strong>. Lorsqu&apos;un achat est réalisé
            via ces liens, l&apos;éditeur peut percevoir une commission, sans
            frais supplémentaires pour l&apos;utilisateur. Cette pratique
            contribue au financement du site et n&apos;influence pas nos avis
            éditoriaux.
          </p>
        </section>

        <section>
          <h2>Droit applicable</h2>
          <p>
            Les présentes mentions légales sont soumises au droit français. En
            cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-12">
          Dernière mise à jour : mars 2026
        </p>
      </article>
    </div>
  );
}
