"use client";

import { Star } from "lucide-react";

interface RatingProps {
  score: number | string;
  max?: number | string;
  label?: string;
}

export default function Rating({ score, max = 5, label }: RatingProps) {
  const s = Number(score);
  const m = Number(max);

  return (
    <div className="my-4 inline-flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 not-prose">
      <div className="flex gap-0.5">
        {Array.from({ length: m }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(s)
                ? "text-amber-400 fill-amber-400"
                : i < s
                  ? "text-amber-400 fill-amber-200"
                  : "text-gray-300 fill-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="font-bold text-gray-900">{s}/{m}</span>
      {label && <span className="text-sm text-gray-600">— {label}</span>}
    </div>
  );
}
