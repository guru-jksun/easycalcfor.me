import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AcquisitionTaxClient from "@/components/calculators/AcquisitionTaxClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/acquisition-tax">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("acquisitionTaxCalculator"),
    description: t("acquisitionTaxCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/acquisition-tax` },
  };
}

export default async function AcquisitionTaxPage(props: PageProps<"/[locale]/calculator/finance/acquisition-tax">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("acquisitionTaxCalculator")}
        description={t("acquisitionTaxCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/finance/acquisition-tax`}
        locale={locale}
        faqItems={[
          { question: t("atFaq1Q"), answer: t("atFaq1A") },
          { question: t("atFaq2Q"), answer: t("atFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("finance"), url: `${baseUrl}/${locale}/calculator/finance` },
        { name: t("acquisitionTaxCalculator"), url: `${baseUrl}/${locale}/calculator/finance/acquisition-tax` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("acquisitionTaxCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("acquisitionTaxCalculatorDesc")}</p>
            <AcquisitionTaxClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("atStep1")}</li>
                <li>{t("atStep2")}</li>
                <li>{t("atStep3")}</li>
                <li>{t("atStep4")}</li>
              </ol>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["atFaq1Q", "atFaq1A"], ["atFaq2Q", "atFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["finance/acquisition-tax"]} />
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
