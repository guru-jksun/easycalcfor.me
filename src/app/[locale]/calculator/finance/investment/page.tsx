import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import InvestmentCalculatorClient from "@/components/calculators/InvestmentCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/investment">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("investCalculator"),
    description: t("investCalculatorDesc"),
    keywords: ["investment calculator", "investment return calculator", "future value calculator"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/investment` },
  };
}

export default async function Page(props: PageProps<"/[locale]/calculator/finance/investment">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd name={t("investCalculator")} description={t("investCalculatorDesc")} url={`${baseUrl}/${locale}/calculator/finance/investment`} locale={locale} faqItems={[{ question: t("investFaq1Q"), answer: t("investFaq1A") }, { question: t("investFaq2Q"), answer: t("investFaq2A") }]} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: `${baseUrl}/${locale}` }, { name: tCat("financePageTitle"), url: `${baseUrl}/${locale}/calculator/finance` }, { name: t("investCalculator"), url: `${baseUrl}/${locale}/calculator/finance/investment` }]} />
      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("investCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("investCalculatorDesc")}</p>
            <InvestmentCalculatorClient />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3"><p>{t("investFormulaNote")}</p></div>
            </div>
            <AdBanner slot="calc-sidebar" format="rectangle" />
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("investStep1")}</li><li>{t("investStep2")}</li><li>{t("investStep3")}</li>
              </ol>
            </div>
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                <div><h3 className="font-medium text-sm mb-1">{t("investFaq1Q")}</h3><p className="text-sm text-muted-foreground">{t("investFaq1A")}</p></div>
                <div><h3 className="font-medium text-sm mb-1">{t("investFaq2Q")}</h3><p className="text-sm text-muted-foreground">{t("investFaq2A")}</p></div>
              </div>
            </div>

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["finance/investment"]} />
          </div>
        </div>
        <div className="mt-10"><AdBanner slot="calc-bottom" format="horizontal" /></div>
      </div>
    </>
  );
}
