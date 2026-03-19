import fs from "fs";
import path from "path";

interface AuthorData {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  links?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

interface AuthorBoxProps {
  author: string;
}

function getAuthor(key: string): AuthorData | null {
  try {
    const filePath = path.join(process.cwd(), "data", "authors.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const authors = JSON.parse(raw);
    return authors[key] || null;
  } catch {
    return null;
  }
}

export default function AuthorBox({ author }: AuthorBoxProps) {
  const data = getAuthor(author);
  if (!data) return null;

  const initials = data.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  const hasLinks =
    data.links &&
    (data.links.linkedin || data.links.twitter || data.links.website);

  return (
    <div className="my-8 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5 sm:p-6 not-prose">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
          {initials}
        </div>

        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
            Rédigé par
          </p>
          <p className="font-bold text-gray-900 text-base">{data.name}</p>
          <p className="text-sm text-blue-600 font-medium">{data.role}</p>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            {data.bio}
          </p>

          {hasLinks && (
            <div className="flex items-center gap-3 mt-3">
              {data.links?.linkedin && (
                <a
                  href={data.links.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              )}
              {data.links?.twitter && (
                <a
                  href={data.links.twitter}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X / Twitter
                </a>
              )}
              {data.links?.website && (
                <a
                  href={data.links.website}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-4.247m0 0A8.966 8.966 0 013 12c0-1.528.38-2.967 1.05-4.228" />
                  </svg>
                  Site web
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
