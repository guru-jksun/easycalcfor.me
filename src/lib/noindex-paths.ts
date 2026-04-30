// Pages temporarily hidden from search engines while focusing AdSense review
// on India + Finance + Health core pages and the blog. Remove entries from
// this set as their content is improved enough to be indexed.

const NOINDEX_PATHS = new Set<string>([
  // Conversion — commodity content available on every site
  "/calculator/conversion/currency",
  "/calculator/conversion/length",
  "/calculator/conversion/weight",
  "/calculator/conversion/temperature",
  "/calculator/conversion/speed",
  "/calculator/conversion/energy",
  "/calculator/conversion/fuel-cost",

  // Math — generic, low E-E-A-T
  "/calculator/math/basic",
  "/calculator/math/scientific",
  "/calculator/math/percentage",
  "/calculator/math/fraction",
  "/calculator/math/average",
  "/calculator/math/prime",
  "/calculator/math/square-root",
  "/calculator/math/password-strength",
  "/calculator/math/graphing",
  "/calculator/math/solver",
  "/calculator/math/gpa",
  "/calculator/math/grade",
  "/calculator/math/discount",

  // Date — generic
  "/calculator/date/age",
  "/calculator/date/day",
  "/calculator/date/dday",
  "/calculator/date/difference",
  "/calculator/date/hours",
  "/calculator/date/time",
  "/calculator/date/time-duration",
  "/calculator/date/military-discharge",
  "/calculator/date/annual-leave",

  // Tax — overlaps with India income-tax; keep India version only
  "/calculator/tax/income-tax",
  "/calculator/tax/sales-tax",
  "/calculator/tax/tax-2026",
  "/calculator/tax/vat",

  // Finance — non-core (keep loan, mortgage, compound-interest, investment, paycheck)
  "/calculator/finance/acquisition-tax",
  "/calculator/finance/auto-loan",
  "/calculator/finance/capital-gains-tax",
  "/calculator/finance/car-payment",
  "/calculator/finance/gold",
  "/calculator/finance/housing-points",
  "/calculator/finance/inflation",
  "/calculator/finance/interest-rate",
  "/calculator/finance/payment",
  "/calculator/finance/personal-loan",
  "/calculator/finance/rent-compare",
  "/calculator/finance/roi",
  "/calculator/finance/salary",
  "/calculator/finance/savings",
  "/calculator/finance/severance-pay",
  "/calculator/finance/tip",
  "/calculator/finance/pay",

  // Health — non-core (keep bmi, tdee, calorie, body-fat)
  "/calculator/health/bac",
  "/calculator/health/due-date",
  "/calculator/health/ideal-weight",
  "/calculator/health/one-rep-max",
  "/calculator/health/sleep",

  // Category pages whose children are all Tier 3
  "/calculator/math",
  "/calculator/conversion",
  "/calculator/date",
  "/calculator/tax",
  "/calculator/korea",
  "/calculator/living",
]);

export function isNoindexPath(unprefixedPath: string): boolean {
  return NOINDEX_PATHS.has(unprefixedPath);
}

export function getNoindexPaths(): readonly string[] {
  return Array.from(NOINDEX_PATHS);
}
