"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Petit délai pour l'animation d'entrée
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleRefuse = () => {
    localStorage.setItem("cookie-consent", "refused");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-[slideUp_0.4s_ease-out]"
      role="dialog"
      aria-label="Consentement aux cookies"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-sm text-gray-700 flex-1">
            Ce site utilise des cookies pour améliorer votre expérience.
            Consultez notre{" "}
            <Link
              href="/politique-de-confidentialite"
              className="text-blue-600 underline hover:text-blue-800"
            >
              politique de confidentialité
            </Link>{" "}
            pour en savoir plus.
          </p>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={handleRefuse}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Refuser
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
