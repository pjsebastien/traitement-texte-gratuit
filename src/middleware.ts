import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Patterns for hacked/spam pages that should return 410 Gone
const GONE_PATTERNS = [
  /^\/.*-q-\d+/,          // Product pages: /Something-q-123456
  /^\/shop\//,             // /shop/brands, /shop/product/...
  /^\/s\//,                // /s/free-shipping, /s/events, /s/purpose...
  /^\/p\//,                // /p/lenscrafters, /p/credit-service...
  /^\/registry$/,          // /registry
  /^\/returns$/,           // /returns
];

// Specific old pages without a matching new article → 410
const GONE_EXACT = new Set([
  "/nouveau-logiciel-entreprise",
  "/nouveau-logiciel-entreprise/",
  "/contact",
  "/contact/",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check pattern-based 410s
  for (const pattern of GONE_PATTERNS) {
    if (pattern.test(pathname)) {
      return new NextResponse(
        "<html><head><title>410 Gone</title></head><body><h1>410 Gone</h1><p>Cette page a été définitivement supprimée.</p></body></html>",
        {
          status: 410,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }
  }

  // Check exact 410s
  if (GONE_EXACT.has(pathname)) {
    return new NextResponse(
      "<html><head><title>410 Gone</title></head><body><h1>410 Gone</h1><p>Cette page a été définitivement supprimée.</p></body></html>",
      {
        status: 410,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  // Strip trailing slashes for article pages (except root)
  if (pathname !== "/" && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
