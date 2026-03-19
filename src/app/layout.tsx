import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.traitement-de-texte-gratuit.fr"),
  title: {
    default: "Traitement de Texte Gratuit — Les Meilleurs Logiciels Gratuits",
    template: "%s | Traitement de Texte Gratuit",
  },
  description:
    "Trouvez les meilleurs logiciels de traitement de texte gratuits et alternatives aux outils populaires. Comparatifs, guides et avis détaillés.",
  keywords: [
    "traitement de texte gratuit",
    "logiciel gratuit",
    "alternative word",
    "traitement de texte en ligne",
  ],
  openGraph: {
    siteName: "Traitement de Texte Gratuit",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
