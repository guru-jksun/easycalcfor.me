import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/korea">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "categories" });
  return {
    title: t("koreaPageTitle"),
    description: t("koreaPageSubtitle"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/korea` },
  };
}

const KOREA_KEYS = [
  { nameKey: "rentCompareCalculator", descKey: "rentCompareCalculatorDesc", href: "finance/rent-compare", emoji: "🏘️" },
  { nameKey: "acquisitionTaxCalculator", descKey: "acquisitionTaxCalculatorDesc", href: "finance/acquisition-tax", emoji: "🏗️" },
  { nameKey: "capitalGainsTaxCalculator", descKey: "capitalGainsTaxCalculatorDesc", href: "finance/capital-gains-tax", emoji: "📋" },
  { nameKey: "severancePayCalculator", descKey: "severancePayCalculatorDesc", href: "finance/severance-pay", emoji: "💼" },
  { nameKey: "housingPointsCalculator", descKey: "housingPointsCalculatorDesc", href: "finance/housing-points", emoji: "🏠" },
  { nameKey: "annualLeaveCalculator", descKey: "annualLeaveCalculatorDesc", href: "date/annual-leave", emoji: "🌴" },
  { nameKey: "militaryDischargeCalculator", descKey: "militaryDischargeCalculatorDesc", href: "date/military-discharge", emoji: "🎖️" },
];

export default async function KoreaPage(props: PageProps<"/[locale]/calculator/korea">) {
  const { locale } = await props.params;
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const tCalc = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";
  const prefix = (path: string) => `/${locale}/calculator/${path}`;

  return (
    <>
      <CalculatorJsonLd
        name={tCat("koreaPageTitle")}
        description={tCat("koreaPageSubtitle")}
        url={`${baseUrl}/${locale}/calculator/korea`}
        locale={locale}
        faqItems={[
          { question: "What Korea-specific calculators are available?", answer: "Rent comparison (jeonse vs wolse), acquisition tax, capital gains tax, severance pay, housing subscription points, annual leave, and military discharge date calculators." },
          { question: "Are these calculators free?", answer: "Yes, all calculators on EasyCalcFor.me are completely free with no registration required." },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("koreaPageTitle"), url: `${baseUrl}/${locale}/calculator/korea` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{tCat("koreaPageTitle")}</h1>
          <p className="text-muted-foreground">{tCat("koreaPageSubtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {KOREA_KEYS.map(({ nameKey, descKey, href, emoji }) => (
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
