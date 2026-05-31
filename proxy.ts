import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "de"];
const LOCALE_COOKIE = "NEXT_LOCALE";
const AUTH_COOKIE = "metricas_token";

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }
  return "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  const locale = getLocale(request);
  const token = request.cookies.get(AUTH_COOKIE)?.value;

  // =====================
  // 1. REMOVE LOCALE PREFIX FIRST (IMPORTANT FIX)
  // =====================
  const cleanPath = pathname.replace(/^\/(en|de)/, "") || "/";

  // =====================
  // 2. AUTH CHECK (NOW ACCURATE)
  // =====================
  const isProtected = cleanPath.startsWith("/search");

  if (isProtected && !token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // =====================
  // 3. LOCALE REDIRECT ONLY IF NOT PRESENT
  // =====================
  if (!pathname.startsWith(`/${locale}`)) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}
