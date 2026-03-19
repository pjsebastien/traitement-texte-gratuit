import { NextRequest, NextResponse } from "next/server";
import { getAffiliateLinks, saveAffiliateLinks, scanArticleLinks } from "@/lib/affiliate";

function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get("authorization");
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return auth === `Bearer ${password}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const links = getAffiliateLinks();
  const articleLinks = scanArticleLinks();
  return NextResponse.json({ links, articleLinks });
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const body = await request.json();
    saveAffiliateLinks(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }
}
