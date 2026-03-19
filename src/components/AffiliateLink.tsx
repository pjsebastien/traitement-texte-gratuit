import { resolveAffiliateUrl } from "@/lib/affiliate";

interface AffiliateLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function AffiliateLink({ href, children }: AffiliateLinkProps) {
  const resolvedUrl = resolveAffiliateUrl(href);

  return (
    <a
      href={resolvedUrl}
      rel="nofollow noopener"
      target="_blank"
      className="inline-flex items-center gap-1 text-blue-600 font-medium hover:text-blue-800 underline decoration-blue-300 underline-offset-2 hover:decoration-blue-600 transition-colors"
    >
      {children}
      <svg
        className="w-3.5 h-3.5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}
