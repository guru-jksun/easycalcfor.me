import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { blogPosts } from "@/data/blog-posts";

const BASE_URL = "https://easycalcfor.me";

const CALCULATORS = [
  // Math
  "/calculator/math/basic",
  "/calculator/math/percentage",
  "/calculator/math/fraction",
  "/calculator/math/square-root",
  "/calculator/math/scientific",
  "/calculator/math/prime",
  "/calculator/math/gpa",
  "/calculator/math/discount",
  "/calculator/math/password-strength",
  // Finance
  "/calculator/finance/compound-interest",
  "/calculator/finance/loan",
  "/calculator/finance/mortgage",
  "/calculator/finance/roi",
  "/calculator/finance/savings",
  "/calculator/finance/interest-rate",
  "/calculator/finance/salary",
  "/calculator/finance/tip",
  "/calculator/finance/rent-compare",
  "/calculator/finance/acquisition-tax",
  "/calculator/finance/capital-gains-tax",
  "/calculator/finance/severance-pay",
  "/calculator/finance/housing-points",
  // Health
  "/calculator/health/bmi",
  "/calculator/health/calorie",
  "/calculator/health/body-fat",
  "/calculator/health/due-date",
  "/calculator/health/ideal-weight",
  "/calculator/health/one-rep-max",
  "/calculator/health/bac",
  "/calculator/health/sleep",
  // Date
  "/calculator/date/age",
  "/calculator/date/difference",
  "/calculator/date/dday",
  "/calculator/date/time-duration",
  "/calculator/date/annual-leave",
  "/calculator/date/military-discharge",
  // Conversion
  "/calculator/conversion/length",
  "/calculator/conversion/weight",
  "/calculator/conversion/temperature",
  "/calculator/conversion/currency",
  "/calculator/conversion/speed",
  "/calculator/conversion/energy",
  "/calculator/conversion/fuel-cost",
  // Tax
  "/calculator/tax/income-tax",
  "/calculator/tax/sales-tax",
  "/calculator/tax/vat",
  // New calculators
  "/calculator/math/average",
  "/calculator/math/grade",
  "/calculator/math/graphing",
  "/calculator/math/solver",
  "/calculator/finance/payment",
  "/calculator/finance/gold",
  "/calculator/finance/investment",
  "/calculator/finance/inflation",
  "/calculator/finance/auto-loan",
  "/calculator/finance/car-payment",
  "/calculator/finance/personal-loan",
  "/calculator/finance/paycheck",
  "/calculator/finance/pay",
  "/calculator/date/time",
  "/calculator/date/hours",
  "/calculator/date/day",
  "/calculator/health/tdee",
  "/calculator/tax/tax-2026",
  // India
  "/calculator/india/emi",
  "/calculator/india/gst",
  "/calculator/india/sip",
  "/calculator/india/fd",
  "/calculator/india/ppf",
  "/calculator/india/hra",
  "/calculator/india/income-tax",
  "/calculator/india/take-home-salary",
  "/calculator/india/nps",
  "/calculator/india/gratuity",
];

const CATEGORY_PAGES = [
  "/calculator/math",
  "/calculator/finance",
  "/calculator/health",
  "/calculator/date",
  "/calculator/conversion",
  "/calculator/tax",
  "/calculator/living",
  "/calculator/korea",
  "/calculator/india",
];

const STATIC_PAGES = [
  "/",
  "/ai",
  "/ai/guide",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/blog",
  ...CATEGORY_PAGES,
  ...CALCULATORS,
];

// routing has localePrefix: "always" — every URL must include the locale
// prefix (including the default locale) so sitemap entries match the canonical
// URL emitted by each page. Without this, Google sees the bare URL as an
// "Alternate page with proper canonical tag" and won't index it as primary.
function localizedPath(locale: string, page: string): string {
  const path = page === "/" ? "" : page;
  return `${BASE_URL}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of STATIC_PAGES) {
    for (const locale of routing.locales) {
      entries.push({
        url: localizedPath(locale, page),
        lastModified: new Date(),
        changeFrequency: page === "/" ? "weekly" : "monthly",
        priority: page === "/" ? 1.0 : page.includes("/calculator/") ? 0.8 : 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, localizedPath(l, page)])
          ),
        },
      });
    }
  }

  // Blog posts
  for (const post of blogPosts) {
    const blogPath = `/blog/${post.slug}`;
    for (const locale of routing.locales) {
      entries.push({
        url: localizedPath(locale, blogPath),
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, localizedPath(l, blogPath)])
          ),
        },
      });
    }
  }

  return entries;
}
