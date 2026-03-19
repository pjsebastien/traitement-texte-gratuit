"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";

interface ProsConsBoxProps {
  pros: string;  // JSON string: string[]
  cons: string;  // JSON string: string[]
}

export default function ProsConsBox({ pros, cons }: ProsConsBoxProps) {
  const prosList: string[] = JSON.parse(pros);
  const consList: string[] = JSON.parse(cons);

  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
      <div className="rounded-2xl border border-green-200 bg-green-50/50 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <ThumbsUp className="w-4 h-4 text-green-600" />
          </div>
          <h4 className="font-bold text-green-900">Avantages</h4>
        </div>
        <ul className="space-y-2.5">
          {prosList.map((pro) => (
            <li key={pro} className="flex gap-2 text-sm text-green-800">
              <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-green-500" />
              {pro}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
            <ThumbsDown className="w-4 h-4 text-red-500" />
          </div>
          <h4 className="font-bold text-red-900">Inconvénients</h4>
        </div>
        <ul className="space-y-2.5">
          {consList.map((con) => (
            <li key={con} className="flex gap-2 text-sm text-red-800">
              <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-red-400" />
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
