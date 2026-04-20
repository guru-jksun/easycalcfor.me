import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CalorieCalculatorClient from "@/components/calculators/CalorieCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/health/calorie">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("calorieCalculator"),
    description: t("calorieCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/health/calorie` },
  };
}

export default async function CaloriePage(props: PageProps<"/[locale]/calculator/health/calorie">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("calorieCalculator")}
        description={t("calorieCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/health/calorie`}
        locale={locale}
        faqItems={[
          { question: t("calFaq1Q"), answer: t("calFaq1A") },
          { question: t("calFaq2Q"), answer: t("calFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Health", url: `${baseUrl}/${locale}/calculator/health` },
          { name: "Calorie Calculator", url: `${baseUrl}/${locale}/calculator/health/calorie` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("calorieCalculator")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("calorieCalculatorDesc")}
            </p>
            <CalorieCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3 space-y-1">
                <p>{t("calMaleBmr")}</p>
                <p>{t("calFemaleBmr")}</p>
              </div>
              <p className="text-sm text-muted-foreground">{t("calTdeeFormula")}</p>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("calActivityTitle")}</h2>
              <div className="space-y-2">
                {[
                  { levelKey: "calActSedentary" as const, multiplier: "×1.2", descKey: "calActSedentaryDesc" as const },
                  { levelKey: "calActLight" as const, multiplier: "×1.375", descKey: "calActLightDesc" as const },
                  { levelKey: "calActModerate" as const, multiplier: "×1.55", descKey: "calActModerateDesc" as const },
                  { levelKey: "calActVery" as const, multiplier: "×1.725", descKey: "calActVeryDesc" as const },
                  { levelKey: "calActExtreme" as const, multiplier: "×1.9", descKey: "calActExtremeDesc" as const },
                ].map(({ levelKey, multiplier, descKey }) => (
                  <div key={levelKey} className="flex justify-between items-start text-sm">
                    <div>
                      <span className="font-medium">{t(levelKey)}</span>
                      <span className="text-muted-foreground text-xs ml-2">({t(descKey)})</span>
                    </div>
                    <span className="font-mono text-muted-foreground">{multiplier}</span>
                  </div>
                ))}
              </div>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["calFaq1Q", "calFaq1A"], ["calFaq2Q", "calFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            </div>

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["health/calorie"]} />
          </div>
        </div>

        <div className="mt-10">
          <AdBanner slot="calc-bottom" format="horizontal" />
        </div>
      </div>
    </>
  );
}
