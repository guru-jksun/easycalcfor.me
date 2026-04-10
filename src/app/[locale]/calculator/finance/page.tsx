import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, Home, CreditCard, PiggyBank, BarChart2, Percent } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "categories" });
  return {
    title: t("financePageTitle"),
    description: t("financePageSubtitle"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance` },
  };
}

const FINANCE_KEYS = [
  { nameKey: "compoundInterestCalculator", descKey: "compoundInterestCalculatorDesc", href: "finance/compound-interest", emoji: "📈" },
  { nameKey: "loanCalculator", descKey: "loanCalculatorDesc", href: "finance/loan", emoji: "💳" },
  { nameKey: "mortgageCalculator", descKey: "mortgageCalculatorDesc", href: "finance/mortgage", emoji: "🏠" },
  { nameKey: "roiCalculator", descKey: "roiCalculatorDesc", href: "finance/roi", emoji: "📊" },
  { nameKey: "savingsCalculator", descKey: "savingsCalculatorDesc", href: "finance/savings", emoji: "🐷" },
  { nameKey: "interestRateCalculator", descKey: "interestRateCalculatorDesc", href: "finance/interest-rate", emoji: "%" },
  { nameKey: "salaryCalculator", descKey: "salaryCalculatorDesc", href: "finance/salary", emoji: "💰" },
  { nameKey: "tipCalculator", descKey: "tipCalculatorDesc", href: "finance/tip", emoji: "💵" },
  { nameKey: "rentCompareCalculator", descKey: "rentCompareCalculatorDesc", href: "finance/rent-compare", emoji: "🏘️" },
  { nameKey: "acquisitionTaxCalculator", descKey: "acquisitionTaxCalculatorDesc", href: "finance/acquisition-tax", emoji: "🏗️" },
  { nameKey: "capitalGainsTaxCalculator", descKey: "capitalGainsTaxCalculatorDesc", href: "finance/capital-gains-tax", emoji: "📋" },
  { nameKey: "severancePayCalculator", descKey: "severancePayCalculatorDesc", href: "finance/severance-pay", emoji: "💼" },
  { nameKey: "housingPointsCalculator", descKey: "housingPointsCalculatorDesc", href: "finance/housing-points", emoji: "🏠" },
];

export default async function FinancePage(props: PageProps<"/[locale]/calculator/finance">) {
  const { locale } = await props.params;
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const tCalc = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";
  const prefix = (path: string) => `/${locale}/calculator/${path}`;

  return (
    <>
      <CalculatorJsonLd
        name={tCat("financePageTitle")}
        description={tCat("financePageSubtitle")}
        url={`${baseUrl}/${locale}/calculator/finance`}
        locale={locale}
        faqItems={[
          { question: "How do I calculate my monthly loan payment?", answer: "Use our Loan Calculator. Enter the principal amount, interest rate, and loan term to get your monthly payment instantly." },
          { question: "What is compound interest?", answer: "Compound interest is interest calculated on both the principal and accumulated interest. Formula: A = P(1 + r/n)^(nt)" },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("financePageTitle"), url: `${baseUrl}/${locale}/calculator/finance` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{tCat("financePageTitle")}</h1>
          <p className="text-muted-foreground">{tCat("financePageSubtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FINANCE_KEYS.map(({ nameKey, descKey, href, emoji }) => (
            <Link key={href} href={prefix(href)}>
              <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer border hover:border-primary/30">
                <CardContent className="p-5 flex items-start gap-4">
                  <span className="text-3xl">{emoji}</span>
                  <div>
                    <p className="font-semibold">{tCalc(nameKey as never)}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{tCalc(descKey as never)}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
