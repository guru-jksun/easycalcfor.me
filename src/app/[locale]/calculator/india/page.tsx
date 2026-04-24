import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/india">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "categories" });
  return {
    title: t("indiaPageTitle"),
    description: t("indiaPageSubtitle"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/india` },
  };
}

const INDIA_KEYS = [
  { nameKey: "itCalculator", descKey: "itCalculatorDesc", href: "india/income-tax", emoji: "📊" },
  { nameKey: "thsCalculator", descKey: "thsCalculatorDesc", href: "india/take-home-salary", emoji: "💰" },
  { nameKey: "emiCalculator", descKey: "emiCalculatorDesc", href: "india/emi", emoji: "🏦" },
  { nameKey: "gstCalculator", descKey: "gstCalculatorDesc", href: "india/gst", emoji: "🧾" },
  { nameKey: "sipCalculator", descKey: "sipCalculatorDesc", href: "india/sip", emoji: "📈" },
  { nameKey: "npsCalculator", descKey: "npsCalculatorDesc", href: "india/nps", emoji: "👵" },
  { nameKey: "gratCalculator", descKey: "gratCalculatorDesc", href: "india/gratuity", emoji: "🎁" },
  { nameKey: "fdCalculator", descKey: "fdCalculatorDesc", href: "india/fd", emoji: "🏧" },
  { nameKey: "ppfCalculator", descKey: "ppfCalculatorDesc", href: "india/ppf", emoji: "🏛️" },
  { nameKey: "hraCalculator", descKey: "hraCalculatorDesc", href: "india/hra", emoji: "🏠" },
];

export default async function IndiaPage(props: PageProps<"/[locale]/calculator/india">) {
  const { locale } = await props.params;
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const tCalc = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";
  const prefix = (path: string) => `/${locale}/calculator/${path}`;

  return (
    <>
      <CalculatorJsonLd
        name={tCat("indiaPageTitle")}
        description={tCat("indiaPageSubtitle")}
        url={`${baseUrl}/${locale}/calculator/india`}
        locale={locale}
        faqItems={[
          { question: "What India-specific calculators are available?", answer: "Income Tax Calculator (Old vs New Regime), Take-home Salary Calculator, EMI, GST, SIP, NPS, Gratuity, FD, PPF, and HRA calculators — all designed for Indian financial calculations." },
          { question: "Are these calculators free?", answer: "Yes, all calculators on EasyCalcFor.me are completely free with no registration required." },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("indiaPageTitle"), url: `${baseUrl}/${locale}/calculator/india` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{tCat("indiaPageTitle")}</h1>
          <p className="text-muted-foreground">{tCat("indiaPageSubtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDIA_KEYS.map(({ nameKey, descKey, href, emoji }) => (
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
