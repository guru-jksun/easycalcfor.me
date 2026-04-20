import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import OneRepMaxCalculatorClient from "@/components/calculators/OneRepMaxCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/health/one-rep-max">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("oneRepMaxCalculator"),
    description: t("oneRepMaxCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/health/one-rep-max` },
  };
}

export default async function OneRepMaxPage(props: PageProps<"/[locale]/calculator/health/one-rep-max">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("oneRepMaxCalculator")}
        description={t("oneRepMaxCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/health/one-rep-max`}
        locale={locale}
        faqItems={[
          {
            question: "What is a one rep max (1RM)?",
            answer: "Your 1RM is the maximum weight you can lift for a single repetition with proper form. It's the gold standard for measuring strength in resistance training.",
          },
          {
            question: "Which 1RM formula is most accurate?",
            answer: "The Epley and Brzycki formulas are the most widely used and accurate for reps in the 1–10 range. Accuracy decreases above 10 reps. Using an average of multiple formulas reduces error.",
          },
          {
            question: "How do I use the percentage table?",
            answer: "Training at 70–85% of 1RM builds hypertrophy (muscle size). Training at 85–95% builds maximal strength. Training at 60–70% focuses on muscular endurance.",
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Health", url: `${baseUrl}/${locale}/calculator/health` },
          { name: "One Rep Max Calculator", url: `${baseUrl}/${locale}/calculator/health/one-rep-max` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("oneRepMaxCalculator")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("oneRepMaxCalculatorDesc")}
            </p>
            <OneRepMaxCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { name: "Epley", formula: "w × (1 + r/30)" },
                  { name: "Brzycki", formula: "w × 36 / (37 − r)" },
                  { name: "Lander", formula: "100w / (101.3 − 2.671r)" },
                  { name: "Lombardi", formula: "w × r^0.1" },
                ].map(({ name, formula }) => (
                  <div key={name} className="flex justify-between items-center bg-muted/50 rounded-lg px-3 py-2">
                    <span className="font-semibold text-sm not-italic">{name}</span>
                    <span className="text-muted-foreground">{formula}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">{t("ormFormulaNote")}</p>
              <p className="text-xs text-muted-foreground mt-1">* {t("ormFormulaResearcherNote")}</p>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("ormIntensityTitle")}</h2>
              <div className="space-y-2">
                {[
                  { range: "90–100%", goalKey: "ormGoal1" as const, color: "text-red-600" },
                  { range: "85–90%", goalKey: "ormGoal2" as const, color: "text-orange-600" },
                  { range: "75–85%", goalKey: "ormGoal3" as const, color: "text-yellow-600" },
                  { range: "65–75%", goalKey: "ormGoal4" as const, color: "text-green-600" },
                  { range: "50–65%", goalKey: "ormGoal5" as const, color: "text-blue-600" },
                ].map(({ range, goalKey, color }) => (
                  <div key={range} className="flex justify-between items-center text-sm">
                    <span className="font-mono text-muted-foreground">{range}</span>
                    <span className={`font-medium ${color}`}>{t(goalKey)}</span>
                  </div>
                ))}
              </div>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["ormFaq1Q", "ormFaq1A"], ["ormFaq2Q", "ormFaq2A"]] as const).map(([qKey, aKey]) => (
                  <div key={qKey}>
                    <h3 className="font-medium text-sm mb-1">{t(qKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(aKey)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["health/one-rep-max"]} />
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
