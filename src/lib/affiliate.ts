import fs from "fs";
import path from "path";

export interface AffiliateLink {
  affiliateUrl: string;
  label: string;
  active: boolean;
}

export type AffiliateLinkMap = Record<string, AffiliateLink>;

const AFFILIATE_FILE = path.join(process.cwd(), "data", "affiliate-links.json");

export function getAffiliateLinks(): AffiliateLinkMap {
  try {
    const raw = fs.readFileSync(AFFILIATE_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveAffiliateLinks(links: AffiliateLinkMap): void {
  fs.writeFileSync(AFFILIATE_FILE, JSON.stringify(links, null, 2));
}

export function resolveAffiliateUrl(cleanUrl: string): string {
  const links = getAffiliateLinks();

  // 1. Exact match
  const exact = links[cleanUrl];
  if (exact && exact.active && exact.affiliateUrl) {
    return exact.affiliateUrl;
  }

  // 2. Domain match: any configured URL on the same domain redirects
  let domain: string;
  try {
    domain = new URL(cleanUrl).hostname.replace(/^www\./, "");
  } catch {
    return cleanUrl;
  }

  for (const [configuredUrl, entry] of Object.entries(links)) {
    if (!entry.active || !entry.affiliateUrl) continue;
    try {
      const configuredDomain = new URL(configuredUrl).hostname.replace(/^www\./, "");
      if (configuredDomain === domain) {
        return entry.affiliateUrl;
      }
    } catch {
      continue;
    }
  }

  return cleanUrl;
}

export interface ArticleLinkInfo {
  url: string;
  label: string;
  articles: string[];
}

export function scanArticleLinks(): ArticleLinkInfo[] {
  const articlesDir = path.join(process.cwd(), "content", "articles");
  if (!fs.existsSync(articlesDir)) return [];

  // Group by domain: keep only one URL per domain (the first one found)
  const domainMap: Record<string, { url: string; labels: Set<string>; articles: Set<string> }> = {};

  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".mdx"));
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const content = fs.readFileSync(path.join(articlesDir, file), "utf-8");

    const regex = /<AffiliateLink\s+href="([^"]+)"[^>]*>([^<]*)<\/AffiliateLink>/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const url = match[1];
      const label = match[2].trim();
      let domain: string;
      try {
        domain = new URL(url).hostname.replace(/^www\./, "");
      } catch {
        domain = url;
      }
      if (!domainMap[domain]) {
        domainMap[domain] = { url, labels: new Set(), articles: new Set() };
      }
      if (label) domainMap[domain].labels.add(label);
      domainMap[domain].articles.add(slug);
    }
  }

  return Object.values(domainMap).map((data) => ({
    url: data.url,
    label: [...data.labels][0] || "",
    articles: [...data.articles],
  }));
}
