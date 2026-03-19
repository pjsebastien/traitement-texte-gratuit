import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dcngcvz9k/**",
      },
    ],
  },

  async redirects() {
    return [
      // Vrais doublons (suffixe -2 ou slug reformulé du même sujet)
      { source: "/alternative-midjourney-ia-2", destination: "/alternative-midjourney-ia", permanent: true },
      { source: "/alternative-clickup-gestion-equipe-2", destination: "/alternative-clickup-gestion-equipe", permanent: true },
      { source: "/alternative-chatgpt-ia-2", destination: "/alternative-openai-ia", permanent: true },
      { source: "/alternative-jasper-ia-2", destination: "/alternative-jasper-ia", permanent: true },
      { source: "/alternative-libreoffice-open-source-2", destination: "/alternative-libreoffice-open-source", permanent: true },
      { source: "/alternative-microsoft-teams-2", destination: "/alternative-microsoft-teams", permanent: true },
      { source: "/alternative-slack-entreprise", destination: "/alternative-slack-equipe", permanent: true },
      { source: "/alternative-zoom-reunions", destination: "/alternative-zoom-visioconferences", permanent: true },
      { source: "/alternative-evernote-applis", destination: "/alternative-evernote-noter", permanent: true },
      { source: "/alternative-nextcloud-clouds-libres", destination: "/alternative-nextcloud-hebergement", permanent: true },
      { source: "/alternative-gmail-messagerie-privee", destination: "/alternative-gmail-privee", permanent: true },
      { source: "/alternative-mailchimp-newsletters", destination: "/alternative-mailchimp-emailing", permanent: true },
      { source: "/alternative-powerpoint-presenter", destination: "/alternative-powerpoint-presentations", permanent: true },
      // Ancien slug → nouveau slug (même sujet, slug différent)
      { source: "/meilleurs-logiciels-de-traitement-de-texte-gratuit", destination: "/", permanent: true },
      { source: "/meilleurs-outils-de-redaction-ia", destination: "/meilleurs-generateurs-de-texte-ia", permanent: true },
      { source: "/meilleurs-detecteurs-de-redaction-par-ia", destination: "/meilleurs-detecteurs-ia", permanent: true },
      { source: "/midjourney-creez-vos-images-ia-guide-ultime", destination: "/logiciel-midjourney", permanent: true },
      { source: "/alternative-ahrefs-backlinks", destination: "/ahrefs-backlinks-check", permanent: true },
      { source: "/alternative-sendinblue-campagnes", destination: "/alternative-sendinblue", permanent: true },
      { source: "/alternative-wordpress-site", destination: "/alternative-wordpress-sans-cms", permanent: true },
      { source: "/alternative-obsidian-notes", destination: "/alternatives-notion", permanent: true },
      { source: "/alternative-notion-ai", destination: "/alternatives-notion", permanent: true },
      { source: "/alternative-notion-projets", destination: "/alternatives-notion", permanent: true },
      // Old category/author/pagination pages → homepage
      { source: "/category/:slug", destination: "/", permanent: true },
      { source: "/category/:slug/", destination: "/", permanent: true },
      { source: "/author/:slug", destination: "/", permanent: true },
      { source: "/author/:slug/", destination: "/", permanent: true },
      { source: "/page/:num", destination: "/", permanent: true },
      { source: "/page/:num/", destination: "/", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/", destination: "/", permanent: true },
    ];
  },

  // 410 Gone for hacked pages is handled by src/middleware.ts
};

export default nextConfig;
