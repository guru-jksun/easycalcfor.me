import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import EnergyConverterClient from "@/components/calculators/EnergyConverterClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(
  props: PageProps<"/[locale]/calculator/conversion/energy">
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("energyConverter"),
    description: t("energyConverterDesc"),
    alternates: {
      canonical: `https://easycalcfor.me/${locale}/calculator/conversion/energy`,
    },
  };
}

export default async function EnergyConverterPage(
  props: PageProps<"/[locale]/calculator/conversion/energy">
) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("energyConverter")}
        description={t("energyConverterDesc")}
        url={`${baseUrl}/${locale}/calculator/conversion/energy`}
        locale={locale}
        faqItems={[
          {
            question: "How many calories are in a kilowatt-hour?",
            answer:
              "1 kWh = 860,421 calories (cal) = 860.421 kilocalories (kcal). This conversion is used in energy efficiency and dietary calculations.",
          },
          {
            question: "What is the difference between a calorie and a kilocalorie?",
            answer:
              "A kilocalorie (kcal) is 1,000 small calories (cal). The 'Calories' listed on food labels are actually kilocalories. 1 kcal = 4,184 Joules.",
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Conversion", url: `${baseUrl}/${locale}/calculator/conversion` },
          { name: "Energy Converter", url: `${baseUrl}/${locale}/calculator/conversion/energy` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Converter */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("energyConverter")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("energyConverterDesc")}
            </p>
            <EnergyConverterClient />
          </div>

          {/* Right: Reference + FAQ */}
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("energyQuickRefTitle")}</h2>
              <div className="space-y-1.5 text-sm">
                {[
                  { unit: "1 kJ",   eq: "= 1,000 J = 0.2778 Wh = 0.9478 BTU" },
                  { unit: "1 kcal", eq: "= 4,184 J = 1,000 cal = 3.966 BTU" },
                  { unit: "1 kWh",  eq: "= 3,600,000 J = 3,412 BTU = 860 kcal" },
                  { unit: "1 BTU",  eq: "= 1,055.06 J = 0.2931 Wh = 252 cal" },
                ].map(({ unit, eq }) => (
                  <div key={unit} className="flex gap-2 text-xs">
                    <span className="font-mono font-semibold w-14 shrink-0">{unit}</span>
                    <span className="text-muted-foreground">{eq}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("energyExamplesTitle")}</h2>
              <div className="space-y-2 text-sm">
                {[
                  { labelKey: "energyEx1" as const, value: "≈ 4,184 J" },
                  { labelKey: "energyEx2" as const, value: "≈ 2,000 kcal / 8.37 MJ" },
                  { labelKey: "energyEx3" as const, value: "= 0.06 kWh = 216,000 J" },
                  { labelKey: "energyEx4" as const, value: "≈ 34.2 MJ = 9.5 kWh" },
                  { labelKey: "energyEx5" as const, value: "≈ 4,184 J (1 kcal)" },
                ].map(({ labelKey, value }) => (
                  <div key={labelKey} className="flex justify-between gap-4">
                    <span className="text-muted-foreground">{t(labelKey)}</span>
                    <span className="text-right font-mono text-xs">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["energyFaq1Q", "energyFaq1A"], ["energyFaq2Q", "energyFaq2A"]] as const).map(([qKey, aKey]) => (
                  <div key={qKey}>
                    <h3 className="font-medium text-sm mb-1">{t(qKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(aKey)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <AdBanner slot="calc-bottom" format="horizontal" />
        </div>
      </div>
    </>
  );
}
