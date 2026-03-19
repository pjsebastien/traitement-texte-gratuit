import {
  Info,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Zap,
} from "lucide-react";

const VARIANTS = {
  info: {
    bg: "bg-blue-50 border-blue-200",
    icon: <Info className="w-5 h-5 text-blue-600" />,
    title: "text-blue-900",
    text: "text-blue-800",
  },
  warning: {
    bg: "bg-amber-50 border-amber-200",
    icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
    title: "text-amber-900",
    text: "text-amber-800",
  },
  success: {
    bg: "bg-green-50 border-green-200",
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    title: "text-green-900",
    text: "text-green-800",
  },
  tip: {
    bg: "bg-purple-50 border-purple-200",
    icon: <Lightbulb className="w-5 h-5 text-purple-600" />,
    title: "text-purple-900",
    text: "text-purple-800",
  },
  cta: {
    bg: "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200",
    icon: <Zap className="w-5 h-5 text-blue-600" />,
    title: "text-gray-900",
    text: "text-gray-700",
  },
};

interface CalloutProps {
  type?: keyof typeof VARIANTS;
  title?: string;
  children: React.ReactNode;
}

export default function Callout({
  type = "info",
  title,
  children,
}: CalloutProps) {
  const v = VARIANTS[type];

  return (
    <div
      className={`my-6 rounded-xl border p-4 sm:p-5 ${v.bg} not-prose`}
    >
      <div className="flex gap-3">
        <div className="shrink-0 mt-0.5">{v.icon}</div>
        <div className="min-w-0">
          {title && (
            <p className={`font-semibold mb-1 ${v.title}`}>{title}</p>
          )}
          <div className={`text-sm leading-relaxed ${v.text}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
