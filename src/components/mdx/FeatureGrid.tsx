"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  Users,
  Monitor,
  Shield,
  Globe,
  Zap,
  PenTool,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  file: FileText,
  ai: Sparkles,
  collab: Users,
  desktop: Monitor,
  security: Shield,
  globe: Globe,
  fast: Zap,
  edit: PenTool,
};

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureGridProps {
  data: string; // JSON string: Feature[]
}

export default function FeatureGrid({ data }: FeatureGridProps) {
  const features: Feature[] = JSON.parse(data);

  return (
    <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 not-prose">
      {features.map((f, i) => {
        const Icon = ICONS[f.icon] || Zap;
        return (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="group rounded-xl border border-gray-200 bg-white p-5 hover:border-blue-200 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Icon className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm mb-1">
              {f.title}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              {f.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
