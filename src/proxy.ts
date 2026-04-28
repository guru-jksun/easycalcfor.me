import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Cloud Run sets x-forwarded-host to the internal run.app domain even when
// Cloudflare fronts the service. next-intl uses that header to build the Link
// (hreflang) and Location (locale-prefix redirect) response headers, so both
// leak the run.app hostname. Worse, Cloudflare resolves run.app redirects
// internally instead of forwarding the 307 to the browser, which means bare
// URLs like /calculator/foo serve content as 200 instead of redirecting to
// /en/calculator/foo — Google then picks the bare URL as the canonical.
// Rewrite both headers to the canonical public host on the way out.
const CANONICAL_HOST = "https://easycalcfor.me";
const INTERNAL_HOST_PATTERN = /https:\/\/easycalcforme-\d+\.asia-northeast3\.run\.app/g;

export function proxy(request: NextRequest) {
  const response = intlMiddleware(request);

  const link = response.headers.get("link");
  if (link && link.includes("run.app")) {
    response.headers.set("link", link.replace(INTERNAL_HOST_PATTERN, CANONICAL_HOST));
  }

  const location = response.headers.get("location");
  if (location) {
    if (location.includes("run.app")) {
      response.headers.set("location", location.replace(INTERNAL_HOST_PATTERN, CANONICAL_HOST));
    } else if (location.startsWith("/")) {
      // next-intl emits a relative Location for the locale-prefix redirect.
      // Behind Cloudflare + Cloud Run, that 307 is resolved internally and the
      // browser sees a 200 for the bare URL — Google then picks the bare URL
      // as canonical. Making the Location an absolute URL on the canonical
      // host forces Cloudflare to forward the redirect to the client.
      const host = request.headers.get("host") ?? "";
      if (!host.includes("localhost") && !host.includes("127.0.0.1")) {
        response.headers.set("location", CANONICAL_HOST + location);
      }
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
