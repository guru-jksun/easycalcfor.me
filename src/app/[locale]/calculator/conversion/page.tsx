import type { Metadata } from "next";
import Link from "next/link";
import { Ruler, Weight, Thermometer, DollarSign, Gauge, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/conversion">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "categories" });
  return {
    title: t("conversionPageTitle"),
    description: t("conversionPageSubtitle"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/conversion` },
  };
}

const CONVERSION_KEYS = [
  { nameKey: "lengthConverter", descKey: "lengthConverterDesc", href: "conversion/length", emoji: "📏" },
  { nameKey: "weightConverter", descKey: "weightConverterDesc", href: "conversion/weight", emoji: "⚖️" },
  { nameKey: "temperatureConverter", descKey: "temperatureConverterDesc", href: "conversion/temperature", emoji: "🌡️" },
  { nameKey: "currencyConverter", descKey: "currencyConverterDesc", href: "conversion/currency", emoji: "💱" },
  { nameKey: "speedConverter", descKey: "speedConverterDesc", href: "conversion/speed", emoji: "🚀" },
  { nameKey: "energyConverter", descKey: "energyConverterDesc", href: "conversion/energy", emoji: "⚡" },
  { nameKey: "fuelCostCalculator", descKey: "fuelCostCalculatorDesc", href: "conversion/fuel-cost", emoji: "⛽" },
];

export default async function ConversionPage(props: PageProps<"/[locale]/calculator/conversion">) {
  const { locale } = await props.params;
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const tCalc = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";
  const prefix = (path: string) => `/${locale}/calculator/${path}`;

  return (
    <>
      <CalculatorJsonLd
        name={tCat("conversionPageTitle")}
        description={tCat("conversionPageSubtitle")}
        url={`${baseUrl}/${locale}/calculator/conversion`}
        locale={locale}
        faqItems={[
          { question: "How do I convert Celsius to Fahrenheit?", answer: "Formula: °F = (°C × 9/5) + 32. For example, 100°C = 212°F. Use our Temperature Converter for instant results." },
          { question: "How many kg in a pound?", answer: "1 pound = 0.453592 kg. Or 1 kg = 2.20462 pounds. Use our Weight Converter for any unit conversion." },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("conversionPageTitle"), url: `${baseUrl}/${locale}/calculator/conversion` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{tCat("conversionPageTitle")}</h1>
          <p className="text-muted-foreground">{tCat("conversionPageSubtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONVERSION_KEYS.map(({ nameKey, descKey, href, emoji }) => (
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
