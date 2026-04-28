import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Cloud Run sets x-forwarded-host to the internal run.app domain even when
// Cloudflare fronts the service. next-intl uses that header to build the Link
// (hreflang) and Location (locale-prefix redirect) response headers, so both
// leak the run.app hostname. Worse, Cloudflare resolves run.app redirects
// internally instead of forwarding the 307 to the browser, which means bare
// URLs like /calculator/foo serve content as 200 instead of redirecting to
// /en/calculator/foo — Google then picks the bare URL as the canonical.
const CANONICAL_HOST = "https://easycalcfor.me";
const INTERNAL_HOST_PATTERN = /https:\/\/easycalcforme-\d+\.asia-northeast3\.run\.app/g;

const LOCALE_PATHS = new Set(routing.locales.map((l) => `/${l}`));

function hasLocalePrefix(pathname: string): boolean {
  if (LOCALE_PATHS.has(pathname)) return true;
  for (const locale of routing.locales) {
    if (pathname.startsWith(`/${locale}/`)) return true;
  }
  return false;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Intercept bare URLs (no locale prefix) at the proxy and emit an explicit
  // redirect to https://easycalcfor.me/en{path}. Done here instead of letting
  // next-intl emit a relative 307, because Cloudflare resolves the relative
  // form internally and serves the destination as 200 — which makes Google
  // pick the bare URL as the canonical (verified via GSC URL inspection).
  if (pathname !== "/" && !hasLocalePrefix(pathname)) {
    const host = request.headers.get("host") ?? "";
    const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
    const search = request.nextUrl.search;
    const target = isLocal
      ? new URL(`/${routing.defaultLocale}${pathname}${search}`, request.url)
      : new URL(`${CANONICAL_HOST}/${routing.defaultLocale}${pathname}${search}`);
    return NextResponse.redirect(target, 308);
  }

  const response = intlMiddleware(request);

  const link = response.headers.get("link");
  if (link && link.includes("run.app")) {
    response.headers.set("link", link.replace(INTERNAL_HOST_PATTERN, CANONICAL_HOST));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
