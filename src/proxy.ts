import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Cloud Run sets x-forwarded-host to the internal run.app domain even when
// Cloudflare fronts the service. next-intl reads that header to build hreflang
// URLs in the Link response header, leaking the run.app hostname into SERPs.
// Rewrite those URLs to the canonical public domain on the way out.
const CANONICAL_HOST = "https://easycalcfor.me";
const INTERNAL_HOST_PATTERN = /https:\/\/easycalcforme-\d+\.asia-northeast3\.run\.app/g;

export function proxy(request: NextRequest) {
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
