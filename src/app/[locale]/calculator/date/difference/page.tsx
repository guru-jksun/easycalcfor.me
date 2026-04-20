import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DateDifferenceClient from "@/components/calculators/DateDifferenceClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/date/difference">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("dateDifference"),
    description: t("dateDifferenceDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/date/difference` },
  };
}

export default async function DateDifferencePage(props: PageProps<"/[locale]/calculator/date/difference">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("dateDifference")}
        description={t("dateDifferenceDesc")}
        url={`${baseUrl}/${locale}/calculator/date/difference`}
        locale={locale}
        faqItems={[
          {
            question: t("diffFaq1Q"),
            answer: t("diffFaq1A"),
          },
          {
            question: t("diffFaq2Q"),
            answer: t("diffFaq2A"),
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Date", url: `${baseUrl}/${locale}/calculator/date` },
          { name: "Date Difference", url: `${baseUrl}/${locale}/calculator/date/difference` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("dateDifference")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("dateDifferenceDesc")}
            </p>
            <DateDifferenceClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("diffResultTitle")}</h2>
              <div className="space-y-3 text-sm">
                {[
                  { labelKey: "diffFmtTotalDays" as const, descKey: "diffFmtTotalDaysDesc" as const },
                  { labelKey: "diffFmtWeeks" as const, descKey: "diffFmtWeeksDesc" as const },
                  { labelKey: "diffFmtMonths" as const, descKey: "diffFmtMonthsDesc" as const },
                  { labelKey: "diffFmtYears" as const, descKey: "diffFmtYearsDesc" as const },
                  { labelKey: "diffFmtBusiness" as const, descKey: "diffFmtBusinessDesc" as const },
                ].map(({ labelKey, descKey }) => (
                  <div key={labelKey}>
                    <span className="font-medium">{t(labelKey)}:</span>{" "}
                    <span className="text-muted-foreground">{t(descKey)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("diffUseCasesTitle")}</h2>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>{t("diffUseCase1")}</li>
                <li>{t("diffUseCase2")}</li>
                <li>{t("diffUseCase3")}</li>
                <li>{t("diffUseCase4")}</li>
                <li>{t("diffUseCase5")}</li>
              </ul>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["diffFaq1Q", "diffFaq1A"], ["diffFaq2Q", "diffFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["date/difference"]} />
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
