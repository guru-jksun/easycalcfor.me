import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BodyFatCalculatorClient from "@/components/calculators/BodyFatCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/health/body-fat">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("bodyFatCalculator"),
    description: t("bodyFatCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/health/body-fat` },
  };
}

export default async function BodyFatPage(props: PageProps<"/[locale]/calculator/health/body-fat">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("bodyFatCalculator")}
        description={t("bodyFatCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/health/body-fat`}
        locale={locale}
        faqItems={[
          { question: t("bfFaq1Q"), answer: t("bfFaq1A") },
          { question: t("bfFaq2Q"), answer: t("bfFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Health", url: `${baseUrl}/${locale}/calculator/health` },
          { name: "Body Fat Calculator", url: `${baseUrl}/${locale}/calculator/health/body-fat` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("bodyFatCalculator")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("bodyFatCalculatorDesc")}
            </p>
            <BodyFatCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-xs space-y-2">
                <p className="font-semibold">{t("bfMaleLabel")}:</p>
                <p>{t("bfFormulaMale1")}</p>
                <p>{t("bfFormulaMale2")}</p>
                <p className="font-semibold mt-2">{t("bfFemaleLabel")}:</p>
                <p>{t("bfFormulaFemale1")}</p>
                <p>{t("bfFormulaFemale2")}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{t("bfMeasNote")}</p>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("bfCategoriesTitle")}</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1 text-muted-foreground">{t("bfMenLabel")}</p>
                  {[
                    { range: "< 6%", catKey: "bfCatEssential" as const, color: "text-blue-500" },
                    { range: "6–13%", catKey: "bfCatAthletic" as const, color: "text-green-600" },
                    { range: "14–17%", catKey: "bfCatFitness" as const, color: "text-teal-600" },
                    { range: "18–24%", catKey: "bfCatAverage" as const, color: "text-yellow-600" },
                    { range: "25%+", catKey: "bfCatObese" as const, color: "text-red-600" },
                  ].map(({ range, catKey, color }) => (
                    <div key={catKey} className="flex justify-between text-sm py-0.5">
                      <span className="font-mono text-muted-foreground">{range}</span>
                      <span className={`font-medium ${color}`}>{t(catKey)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-1 text-muted-foreground">{t("bfWomenLabel")}</p>
                  {[
                    { range: "< 14%", catKey: "bfCatEssential" as const, color: "text-blue-500" },
                    { range: "14–20%", catKey: "bfCatAthletic" as const, color: "text-green-600" },
                    { range: "21–24%", catKey: "bfCatFitness" as const, color: "text-teal-600" },
                    { range: "25–31%", catKey: "bfCatAverage" as const, color: "text-yellow-600" },
                    { range: "32%+", catKey: "bfCatObese" as const, color: "text-red-600" },
                  ].map(({ range, catKey, color }) => (
                    <div key={`w-${catKey}`} className="flex justify-between text-sm py-0.5">
                      <span className="font-mono text-muted-foreground">{range}</span>
                      <span className={`font-medium ${color}`}>{t(catKey)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["bfFaq1Q", "bfFaq1A"], ["bfFaq2Q", "bfFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["health/body-fat"]} />
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
