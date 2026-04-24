import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import NpsCalculatorClient from "@/components/calculators/NpsCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/india/nps">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("npsCalculator"),
    description: t("npsCalculatorDesc"),
    keywords: ["NPS calculator", "National Pension System calculator", "NPS returns calculator", "NPS pension calculator", "NPS tier 1 calculator"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/india/nps` },
  };
}

export default async function NpsCalculatorPage(props: PageProps<"/[locale]/calculator/india/nps">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("npsCalculator")}
        description={t("npsCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/india/nps`}
        locale={locale}
        faqItems={[
          { question: t("npsFaq1Q"), answer: t("npsFaq1A") },
          { question: t("npsFaq2Q"), answer: t("npsFaq2A") },
          { question: t("npsFaq3Q"), answer: t("npsFaq3A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("india"), url: `${baseUrl}/${locale}/calculator/india` },
        { name: t("npsCalculator"), url: `${baseUrl}/${locale}/calculator/india/nps` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("npsCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("npsCalculatorDesc")}</p>
            <NpsCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                FV = P × [((1 + r)ⁿ − 1) / r] × (1 + r)
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>P</strong> = {t("npsVarP")}</li>
                <li><strong>r</strong> = {t("npsVarR")}</li>
                <li><strong>n</strong> = {t("npsVarN")}</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-3">{t("npsTaxNote")}</p>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("npsStep1")}</li>
                <li>{t("npsStep2")}</li>
                <li>{t("npsStep3")}</li>
                <li>{t("npsStep4")}</li>
              </ol>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["npsFaq1Q", "npsFaq1A"], ["npsFaq2Q", "npsFaq2A"], ["npsFaq3Q", "npsFaq3A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            </div>

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["india/nps"]} />
          </div>
        </div>
        <div className="mt-10">
          <AdBanner slot="calc-bottom" format="horizontal" />
        </div>
      </div>
    </>
  );
}
