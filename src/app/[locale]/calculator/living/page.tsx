import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/living">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "categories" });
  return {
    title: t("livingPageTitle"),
    description: t("livingPageSubtitle"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/living` },
  };
}

const LIVING_KEYS = [
  { nameKey: "discountCalculator", descKey: "discountCalculatorDesc", href: "math/discount", emoji: "🏷️" },
  { nameKey: "tipCalculator", descKey: "tipCalculatorDesc", href: "finance/tip", emoji: "💵" },
  { nameKey: "bacCalculator", descKey: "bacCalculatorDesc", href: "health/bac", emoji: "🍺" },
  { nameKey: "sleepCalculator", descKey: "sleepCalculatorDesc", href: "health/sleep", emoji: "😴" },
  { nameKey: "fuelCostCalculator", descKey: "fuelCostCalculatorDesc", href: "conversion/fuel-cost", emoji: "⛽" },
  { nameKey: "passwordStrengthChecker", descKey: "passwordStrengthCheckerDesc", href: "math/password-strength", emoji: "🔒" },
];

export default async function LivingPage(props: PageProps<"/[locale]/calculator/living">) {
  const { locale } = await props.params;
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const tCalc = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";
  const prefix = (path: string) => `/${locale}/calculator/${path}`;

  return (
    <>
      <CalculatorJsonLd
        name={tCat("livingPageTitle")}
        description={tCat("livingPageSubtitle")}
        url={`${baseUrl}/${locale}/calculator/living`}
        locale={locale}
        faqItems={[
          { question: "What living calculators are available?", answer: "Discount calculator, tip calculator, BAC calculator, sleep calculator, fuel cost calculator, and password strength checker." },
          { question: "Are these calculators free?", answer: "Yes, all calculators on EasyCalcFor.me are completely free with no registration required." },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("livingPageTitle"), url: `${baseUrl}/${locale}/calculator/living` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{tCat("livingPageTitle")}</h1>
          <p className="text-muted-foreground">{tCat("livingPageSubtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LIVING_KEYS.map(({ nameKey, descKey, href, emoji }) => (
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
