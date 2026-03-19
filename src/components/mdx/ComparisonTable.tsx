"use client";

import { useState } from "react";
import { Check, X, Minus } from "lucide-react";

interface Row {
  label: string;
  values: string[];
}

interface ComparisonTableProps {
  data: string; // JSON string: { headers: string[], rows: Row[], highlights?: number[] }
}

function CellValue({ value }: { value: string }) {
  if (value === "yes")
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-600">
        <Check className="w-4 h-4" />
      </span>
    );
  if (value === "no")
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-50 text-red-400">
        <X className="w-4 h-4" />
      </span>
    );
  if (value === "partial")
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-50 text-amber-500">
        <Minus className="w-4 h-4" />
      </span>
    );
  return <span className="text-sm font-medium text-gray-700">{value}</span>;
}

export default function ComparisonTable({ data }: ComparisonTableProps) {
  const { headers, rows, highlights = [0] } = JSON.parse(data) as {
    headers: string[];
    rows: Row[];
    highlights?: number[];
  };
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="my-8 overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Critère
                </th>
                {headers.map((h: string, i: number) => (
                  <th
                    key={h}
                    className={`px-4 py-4 text-center text-sm font-bold ${
                      highlights.includes(i)
                        ? "text-blue-700 bg-blue-50/50"
                        : "text-gray-700"
                    }`}
                  >
                    {highlights.includes(i) && (
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-blue-500 mb-1">
                        Recommandé
                      </span>
                    )}
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row: Row, ri: number) => (
                <tr
                  key={row.label}
                  onMouseEnter={() => setHoveredRow(ri)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`transition-colors ${
                    hoveredRow === ri ? "bg-blue-50/30" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3.5 text-sm font-medium text-gray-900">
                    {row.label}
                  </td>
                  {row.values.map((val: string, vi: number) => (
                    <td
                      key={vi}
                      className={`px-4 py-3.5 text-center ${
                        highlights.includes(vi) ? "bg-blue-50/20" : ""
                      }`}
                    >
                      <CellValue value={val} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
