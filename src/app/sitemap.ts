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
];

const STATIC_PAGES = [
  "/",
  "/ai",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/blog",
  ...CATEGORY_PAGES,
  ...CALCULATORS,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of STATIC_PAGES) {
    for (const locale of routing.locales) {
      const url = locale === routing.defaultLocale
        ? `${BASE_URL}${page === "/" ? "" : page}`
        : `${BASE_URL}/${locale}${page}`;

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === "/" ? "weekly" : "monthly",
        priority: page === "/" ? 1.0 : page.includes("/calculator/") ? 0.8 : 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              l === routing.defaultLocale
                ? `${BASE_URL}${page === "/" ? "" : page}`
                : `${BASE_URL}/${l}${page}`,
            ])
          ),
        },
      });
    }
  }

  // Blog posts
  for (const post of blogPosts) {
    for (const locale of routing.locales) {
      const url = locale === routing.defaultLocale
        ? `${BASE_URL}/blog/${post.slug}`
        : `${BASE_URL}/${locale}/blog/${post.slug}`;

      entries.push({
        url,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              l === routing.defaultLocale
                ? `${BASE_URL}/blog/${post.slug}`
                : `${BASE_URL}/${l}/blog/${post.slug}`,
            ])
          ),
        },
      });
    }
  }

  return entries;
}
