import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import IdealWeightCalculatorClient from "@/components/calculators/IdealWeightCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/health/ideal-weight">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("idealWeightCalculator"),
    description: t("idealWeightCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/health/ideal-weight` },
  };
}

export default async function IdealWeightPage(props: PageProps<"/[locale]/calculator/health/ideal-weight">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("idealWeightCalculator")}
        description={t("idealWeightCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/health/ideal-weight`}
        locale={locale}
        faqItems={[
          {
            question: "Which ideal weight formula is the most accurate?",
            answer: "No single formula is universally best. The Robinson formula is widely used in clinical settings. Comparing multiple formulas gives a useful range rather than a single target.",
          },
          {
            question: "How are the ideal weight formulas calculated?",
            answer: "All formulas start with a base weight and add a fixed amount per inch of height over 5 feet. For example, Devine (male): 50 kg + 2.3 kg per inch over 5 feet.",
          },
          {
            question: "Should I aim for ideal weight or BMI range?",
            answer: "The BMI healthy range (18.5–24.9) accounts for your actual height squared and is often a more personalized target. Ideal weight formulas were originally designed for drug dosing in clinical settings.",
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Health", url: `${baseUrl}/${locale}/calculator/health` },
          { name: "Ideal Weight Calculator", url: `${baseUrl}/${locale}/calculator/health/ideal-weight` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("idealWeightCalculator")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("idealWeightCalculatorDesc")}
            </p>
            <IdealWeightCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="space-y-3 text-sm">
                {[
                  { name: "Robinson (1983)", maleVal: "52 + 1.9", femaleVal: "49 + 1.7" },
                  { name: "Miller (1983)", maleVal: "56.2 + 1.41", femaleVal: "53.1 + 1.36" },
                  { name: "Devine (1974)", maleVal: "50 + 2.3", femaleVal: "45.5 + 2.3" },
                  { name: "Hamwi (1964)", maleVal: "48 + 2.7", femaleVal: "45.5 + 2.2" },
                ].map(({ name, maleVal, femaleVal }) => (
                  <div key={name} className="rounded-lg bg-muted/50 p-3">
                    <p className="font-medium mb-1">{name}</p>
                    <p className="text-muted-foreground font-mono text-xs">{t("iwMaleLabel")}: {maleVal}{t("iwPerInch")} {t("iwOver5ft")}</p>
                    <p className="text-muted-foreground font-mono text-xs">{t("iwFemaleLabel")}: {femaleVal}{t("iwPerInch")} {t("iwOver5ft")}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">* {t("iwFormulaNote")}</p>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["iwFaq1Q", "iwFaq1A"], ["iwFaq2Q", "iwFaq2A"]] as const).map(([qKey, aKey]) => (
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
