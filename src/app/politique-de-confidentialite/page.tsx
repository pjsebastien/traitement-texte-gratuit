import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et gestion des cookies du site traitement-de-texte-gratuit.fr, conforme au RGPD.",
  alternates: {
    canonical:
      "https://www.traitement-de-texte-gratuit.fr/politique-de-confidentialite",
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6">
      <article className="max-w-3xl mx-auto prose prose-lg">
        <h1>Politique de confidentialité</h1>

        <p>
          La présente politique de confidentialité décrit la manière dont{" "}
          <strong>traitement-de-texte-gratuit.fr</strong> (édité par
          Margouillapp) collecte et traite vos données personnelles
          conformément au Règlement Général sur la Protection des Données
          (RGPD).
        </p>

        <section>
          <h2>Données collectées</h2>
          <p>
            Ce site ne propose ni compte utilisateur, ni formulaire de contact,
            ni newsletter. Nous ne collectons aucune donnée personnelle
            directement.
          </p>
          <p>
            Les seules données collectées le sont de manière automatique, via
            des cookies, dans le cadre de la mesure d&apos;audience du site.
          </p>
        </section>

        <section>
          <h2>Cookies utilisés</h2>
          <p>
            Un cookie est un petit fichier texte déposé sur votre navigateur
            lorsque vous consultez un site. Voici les types de cookies que nous
            utilisons :
          </p>

          <h3>Cookies fonctionnels</h3>
          <p>
            Ces cookies sont nécessaires au bon fonctionnement du site. Ils
            enregistrent par exemple votre choix concernant le consentement aux
            cookies.
          </p>
          <ul>
            <li>
              <strong>cookie-consent</strong> : stocke votre choix
              d&apos;acceptation ou de refus des cookies. Durée : 12 mois.
            </li>
          </ul>

          <h3>Cookies analytiques</h3>
          <p>
            Si vous acceptez les cookies, nous utilisons un outil de mesure
            d&apos;audience pour comprendre comment les visiteurs utilisent le
            site (pages visitées, durée de session, provenance du trafic). Ces
            données sont anonymisées et servent uniquement à améliorer nos
            contenus.
          </p>
          <ul>
            <li>Finalité : mesure d&apos;audience et amélioration du site</li>
            <li>Durée : 13 mois maximum</li>
            <li>Données collectées : pages vues, durée de visite, type d&apos;appareil, source de trafic</li>
          </ul>
        </section>

        <section>
          <h2>Gestion des cookies</h2>
          <p>
            Lors de votre première visite, une bannière vous propose
            d&apos;accepter ou de refuser les cookies analytiques. Vous pouvez
            modifier votre choix à tout moment en supprimant les cookies de
            votre navigateur.
          </p>
          <p>
            Vous pouvez également configurer votre navigateur pour bloquer ou
            supprimer les cookies. Consultez la documentation de votre
            navigateur pour en savoir plus.
          </p>
        </section>

        <section>
          <h2>Liens affiliés</h2>
          <p>
            Certains articles contiennent des <strong>liens affiliés</strong>.
            Lorsque vous cliquez sur ces liens et effectuez un achat ou une
            inscription, nous percevons une commission. Ce mécanisme
            n&apos;entraîne aucun surcoût pour vous et ne modifie en rien les
            avis que nous publions.
          </p>
        </section>

        <section>
          <h2>Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants concernant
            vos données personnelles :
          </p>
          <ul>
            <li>
              <strong>Droit d&apos;accès</strong> : vous pouvez demander quelles
              données nous détenons à votre sujet.
            </li>
            <li>
              <strong>Droit de rectification</strong> : vous pouvez demander la
              correction de données inexactes.
            </li>
            <li>
              <strong>Droit de suppression</strong> : vous pouvez demander
              l&apos;effacement de vos données.
            </li>
            <li>
              <strong>Droit d&apos;opposition</strong> : vous pouvez vous
              opposer au traitement de vos données, notamment en refusant les
              cookies via la bannière de consentement.
            </li>
            <li>
              <strong>Droit à la portabilité</strong> : vous pouvez demander à
              recevoir vos données dans un format structuré.
            </li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à l&apos;adresse :{" "}
            <a href="mailto:contact@traitement-de-texte-gratuit.fr">
              contact@traitement-de-texte-gratuit.fr
            </a>
          </p>
          <p>
            Si vous estimez que le traitement de vos données ne respecte pas la
            réglementation, vous pouvez adresser une réclamation à la CNIL
            (Commission Nationale de l&apos;Informatique et des Libertés).
          </p>
        </section>

        <section>
          <h2>Modification de cette politique</h2>
          <p>
            Nous nous réservons le droit de modifier cette politique de
            confidentialité à tout moment. Toute mise à jour sera publiée sur
            cette page avec la date de dernière modification.
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-12">
          Dernière mise à jour : mars 2026
        </p>
      </article>
    </div>
  );
}
