import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import MilitaryDischargeClient from "@/components/calculators/MilitaryDischargeClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/date/military-discharge">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("militaryDischargeCalculator"),
    description: t("militaryDischargeCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/date/military-discharge` },
  };
}

export default async function MilitaryDischargePage(props: PageProps<"/[locale]/calculator/date/military-discharge">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("militaryDischargeCalculator")}
        description={t("militaryDischargeCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/date/military-discharge`}
        locale={locale}
        faqItems={[
          {
            question: t("mdFaq1Q"),
            answer: t("mdFaq1A"),
          },
          {
            question: t("mdFaq2Q"),
            answer: t("mdFaq2A"),
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Date", url: `${baseUrl}/${locale}/calculator/date` },
          { name: t("militaryDischargeCalculator"), url: `${baseUrl}/${locale}/calculator/date/military-discharge` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("militaryDischargeCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("militaryDischargeCalculatorDesc")}</p>
            <MilitaryDischargeClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>{t("mdStep1")}</li>
                <li>{t("mdStep2")}</li>
                <li>{t("mdStep3")}</li>
              </ol>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["mdFaq1Q", "mdFaq1A"], ["mdFaq2Q", "mdFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["date/military-discharge"]} />
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
