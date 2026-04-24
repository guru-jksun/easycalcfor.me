import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import TakeHomeSalaryIndiaClient from "@/components/calculators/TakeHomeSalaryIndiaClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/india/take-home-salary">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("thsCalculator"),
    description: t("thsCalculatorDesc"),
    keywords: ["take home salary calculator India", "in-hand salary calculator", "CTC to in-hand salary", "salary calculator after tax India", "net salary calculator 2025-26"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/india/take-home-salary` },
  };
}

export default async function TakeHomeSalaryPage(props: PageProps<"/[locale]/calculator/india/take-home-salary">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("thsCalculator")}
        description={t("thsCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/india/take-home-salary`}
        locale={locale}
        faqItems={[
          { question: t("thsFaq1Q"), answer: t("thsFaq1A") },
          { question: t("thsFaq2Q"), answer: t("thsFaq2A") },
          { question: t("thsFaq3Q"), answer: t("thsFaq3A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("india"), url: `${baseUrl}/${locale}/calculator/india` },
        { name: t("thsCalculator"), url: `${baseUrl}/${locale}/calculator/india/take-home-salary` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("thsCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("thsCalculatorDesc")}</p>
            <TakeHomeSalaryIndiaClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("thsHowItWorks")}</h2>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• <strong>{t("thsBasic")}</strong>: {t("thsBasicDesc")}</li>
                <li>• <strong>{t("thsHra")}</strong>: {t("thsHraDesc")}</li>
                <li>• <strong>{t("thsPfEmployer")}</strong>: {t("thsPfDesc")}</li>
                <li>• <strong>{t("thsProfessionalTax")}</strong>: {t("thsPtDesc")}</li>
              </ul>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("thsStep1")}</li>
                <li>{t("thsStep2")}</li>
                <li>{t("thsStep3")}</li>
                <li>{t("thsStep4")}</li>
              </ol>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["thsFaq1Q", "thsFaq1A"], ["thsFaq2Q", "thsFaq2A"], ["thsFaq3Q", "thsFaq3A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            </div>

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["india/take-home-salary"]} />
          </div>
        </div>
        <div className="mt-10">
          <AdBanner slot="calc-bottom" format="horizontal" />
        </div>
      </div>
    </>
  );
}
