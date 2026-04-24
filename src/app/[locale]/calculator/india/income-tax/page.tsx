import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import IncomeTaxIndiaClient from "@/components/calculators/IncomeTaxIndiaClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/india/income-tax">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("itCalculator"),
    description: t("itCalculatorDesc"),
    keywords: ["income tax calculator India", "new tax regime calculator", "old vs new tax regime", "income tax 2025-26", "tax slab calculator", "आयकर कैलकुलेटर"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/india/income-tax` },
  };
}

export default async function IncomeTaxPage(props: PageProps<"/[locale]/calculator/india/income-tax">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("itCalculator")}
        description={t("itCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/india/income-tax`}
        locale={locale}
        faqItems={[
          { question: t("itFaq1Q"), answer: t("itFaq1A") },
          { question: t("itFaq2Q"), answer: t("itFaq2A") },
          { question: t("itFaq3Q"), answer: t("itFaq3A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("india"), url: `${baseUrl}/${locale}/calculator/india` },
        { name: t("itCalculator"), url: `${baseUrl}/${locale}/calculator/india/income-tax` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("itCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("itCalculatorDesc")}</p>
            <IncomeTaxIndiaClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("itNewSlabsTitle")}</h2>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>{t("itSlabNew1")}</li>
                <li>{t("itSlabNew2")}</li>
                <li>{t("itSlabNew3")}</li>
                <li>{t("itSlabNew4")}</li>
                <li>{t("itSlabNew5")}</li>
                <li>{t("itSlabNew6")}</li>
                <li>{t("itSlabNew7")}</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-3">{t("itSlabNote")}</p>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("itStep1")}</li>
                <li>{t("itStep2")}</li>
                <li>{t("itStep3")}</li>
                <li>{t("itStep4")}</li>
              </ol>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["itFaq1Q", "itFaq1A"], ["itFaq2Q", "itFaq2A"], ["itFaq3Q", "itFaq3A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            </div>

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["india/income-tax"]} />
          </div>
        </div>
        <div className="mt-10">
          <AdBanner slot="calc-bottom" format="horizontal" />
        </div>
      </div>
    </>
  );
}
