import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/tax">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "categories" });
  return {
    title: t("taxPageTitle"),
    description: t("taxPageSubtitle"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/tax` },
  };
}

const TAX_KEYS = [
  { nameKey: "salesTaxCalculator", descKey: "salesTaxCalculatorDesc", href: "tax/sales-tax", emoji: "🧾" },
  { nameKey: "vatCalculator",      descKey: "vatCalculatorDesc",      href: "tax/vat",        emoji: "💶" },
  { nameKey: "incomeTaxCalculator", descKey: "incomeTaxCalculatorDesc", href: "tax/income-tax", emoji: "📊" },
];

export default async function TaxPage(props: PageProps<"/[locale]/calculator/tax">) {
  const { locale } = await props.params;
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const tCalc = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";
  const prefix = (path: string) => `/${locale}/calculator/${path}`;

  return (
    <>
      <CalculatorJsonLd
        name={tCat("taxPageTitle")}
        description={tCat("taxPageSubtitle")}
        url={`${baseUrl}/${locale}/calculator/tax`}
        locale={locale}
        faqItems={[
          { question: "What tax calculators are available?", answer: "Sales tax calculator, VAT calculator, and income tax estimator." },
          { question: "Are these tax calculators free?", answer: "Yes, all calculators on EasyCalcFor.me are completely free with no registration required." },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("taxPageTitle"), url: `${baseUrl}/${locale}/calculator/tax` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{tCat("taxPageTitle")}</h1>
          <p className="text-muted-foreground">{tCat("taxPageSubtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TAX_KEYS.map(({ nameKey, descKey, href, emoji }) => (
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
