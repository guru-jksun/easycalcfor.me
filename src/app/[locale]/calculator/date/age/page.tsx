import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AgeCalculatorClient from "@/components/calculators/AgeCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/date/age">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("ageCalculator"),
    description: t("ageCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/date/age` },
  };
}

export default async function AgePage(props: PageProps<"/[locale]/calculator/date/age">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("ageCalculator")}
        description={t("ageCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/date/age`}
        locale={locale}
        faqItems={[
          {
            question: t("ageFaq1Q"),
            answer: t("ageFaq1A"),
          },
          {
            question: t("ageFaq2Q"),
            answer: t("ageFaq2A"),
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Date", url: `${baseUrl}/${locale}/calculator/date` },
          { name: "Age Calculator", url: `${baseUrl}/${locale}/calculator/date/age` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("ageCalculator")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("ageCalculatorDesc")}
            </p>
            <AgeCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("ageHowTitle")}</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>{t("ageHowP1")}</p>
                <p>{t("ageHowP2")}</p>
                <p>{t("ageHowP3")}</p>
              </div>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("ageFunTitle")}</h2>
              <div className="space-y-2 text-sm">
                {[
                  { statKey: "ageFunHeartbeats" as const, value: "~100,800 (@ 70 bpm)" },
                  { statKey: "ageFunBreaths" as const, value: "~21,600 (@ 15/min)" },
                  { statKey: "ageFunDaysYear" as const, value: t("ageFunDaysYearValue") },
                  { statKey: "ageFunWeeksYear" as const, value: "52.18" },
                ].map(({ statKey, value }) => (
                  <div key={statKey} className="flex justify-between">
                    <span className="text-muted-foreground">{t(statKey)}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["ageFaq1Q", "ageFaq1A"], ["ageFaq2Q", "ageFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            </div>

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["date/age"]} />
          </div>
        </div>

        <div className="mt-10">
          <AdBanner slot="calc-bottom" format="horizontal" />
        </div>
      </div>
    </>
  );
}
