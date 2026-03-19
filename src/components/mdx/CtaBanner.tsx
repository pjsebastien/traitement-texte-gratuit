"use client";

import { ArrowRight } from "lucide-react";

interface CtaBannerProps {
  title: string;
  description?: string;
  buttonText: string;
  href: string;
  variant?: "subtle" | "bold";
}

export default function CtaBanner({
  title,
  description,
  buttonText,
  href,
  variant = "subtle",
}: CtaBannerProps) {
  if (variant === "bold") {
    return (
      <div className="my-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 sm:p-8 text-center not-prose">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-blue-100 text-sm mb-5 max-w-md mx-auto">
            {description}
          </p>
        )}
        <a
          href={href}
          rel="nofollow noopener"
          target="_blank"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all text-sm"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-xl border border-blue-200 bg-blue-50/50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 not-prose">
      <div>
        <p className="font-semibold text-gray-900 text-sm">{title}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
      <a
        href={href}
        rel="nofollow noopener"
        target="_blank"
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm shrink-0"
      >
        {buttonText}
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
