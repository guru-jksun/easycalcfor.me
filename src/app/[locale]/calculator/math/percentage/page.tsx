import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PercentageCalculatorClient from "@/components/calculators/PercentageCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/math/percentage">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("percentageCalculator"),
    description: t("percentageCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/math/percentage` },
  };
}

export default async function PercentagePage(props: PageProps<"/[locale]/calculator/math/percentage">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("percentageCalculator")}
        description={t("percentageCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/math/percentage`}
        locale={locale}
        faqItems={[
          { question: t("pctFaq1Q"), answer: t("pctFaq1A") },
          { question: t("pctFaq2Q"), answer: t("pctFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: t("percentageCalculator"), url: `${baseUrl}/${locale}/calculator/math/percentage` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("percentageCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("percentageCalculatorDesc")}</p>
            <PercentageCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("pctFormulaTitle")}</h2>
              <div className="space-y-3 text-sm">
                {[
                  { labelKey: "pctMode1" as const, formulaKey: "pctFormula1" as const },
                  { labelKey: "pctMode2" as const, formulaKey: "pctFormula2" as const },
                  { labelKey: "pctMode3" as const, formulaKey: "pctFormula3" as const },
                  { labelKey: "pctMode4" as const, formulaKey: "pctFormula4" as const },
                ].map(({ labelKey, formulaKey }) => (
                  <div key={labelKey} className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground">{t(labelKey)}</span>
                    <code className="bg-muted rounded px-2 py-1 text-xs font-mono">{t(formulaKey)}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("pctExamplesTitle")}</h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                {[
                  { labelKey: "pctExSalesTax" as const, textKey: "pctExSalesTaxText" as const },
                  { labelKey: "pctExGrade" as const,    textKey: "pctExGradeText" as const },
                  { labelKey: "pctExPriceDrop" as const, textKey: "pctExPriceDropText" as const },
                  { labelKey: "pctExTip" as const,      textKey: "pctExTipText" as const },
                ].map(({ labelKey, textKey }) => (
                  <p key={labelKey}>
                    <strong className="text-foreground">{t(labelKey)}:</strong>{" "}
                    {t(textKey)}
                  </p>
                ))}
              </div>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {[
                  { q: "pctFaq1Q" as const, a: "pctFaq1A" as const },
                  { q: "pctFaq2Q" as const, a: "pctFaq2A" as const },
                ].map(({ q, a }) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            </div>

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["math/percentage"]} />
          </div>
        </div>

        <div className="mt-10">
          <AdBanner slot="calc-bottom" format="horizontal" />
        </div>
      </div>
    </>
  );
}
