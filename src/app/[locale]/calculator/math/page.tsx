import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Percent, Divide, Hash, Pi } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/math">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "categories" });
  return {
    title: t("mathPageTitle"),
    description: t("mathPageSubtitle"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/math` },
  };
}

const MATH_KEYS = [
  { nameKey: "basicCalculator", descKey: "basicCalculatorDesc", href: "math/basic", emoji: "🔢" },
  { nameKey: "percentageCalculator", descKey: "percentageCalculatorDesc", href: "math/percentage", emoji: "%" },
  { nameKey: "fractionCalculator", descKey: "fractionCalculatorDesc", href: "math/fraction", emoji: "½" },
  { nameKey: "squareRootCalculator", descKey: "squareRootCalculatorDesc", href: "math/square-root", emoji: "√" },
  { nameKey: "scientificCalculator", descKey: "scientificCalculatorDesc", href: "math/scientific", emoji: "π" },
  { nameKey: "primeChecker", descKey: "primeCheckerDesc", href: "math/prime", emoji: "#" },
  { nameKey: "gpaCalculator", descKey: "gpaCalculatorDesc", href: "math/gpa", emoji: "🎓" },
  { nameKey: "discountCalculator", descKey: "discountCalculatorDesc", href: "math/discount", emoji: "🏷️" },
  { nameKey: "passwordStrengthChecker", descKey: "passwordStrengthCheckerDesc", href: "math/password-strength", emoji: "🔒" },
];

export default async function MathPage(props: PageProps<"/[locale]/calculator/math">) {
  const { locale } = await props.params;
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const tCalc = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";
  const prefix = (path: string) => `/${locale}/calculator/${path}`;

  return (
    <>
      <CalculatorJsonLd
        name={tCat("mathPageTitle")}
        description={tCat("mathPageSubtitle")}
        url={`${baseUrl}/${locale}/calculator/math`}
        locale={locale}
        faqItems={[
          { question: "What math calculators are available?", answer: "Basic calculator, percentage, fraction, square root, scientific calculator, and prime number checker." },
          { question: "Are these math calculators free?", answer: "Yes, all calculators on EasyCalcFor.me are completely free with no registration required." },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("mathPageTitle"), url: `${baseUrl}/${locale}/calculator/math` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{tCat("mathPageTitle")}</h1>
          <p className="text-muted-foreground">{tCat("mathPageSubtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MATH_KEYS.map(({ nameKey, descKey, href, emoji }) => (
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
