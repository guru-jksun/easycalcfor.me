import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import InflationCalculatorClient from "@/components/calculators/InflationCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/inflation">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("inflationCalculator"),
    description: t("inflationCalculatorDesc"),
    keywords: ["inflation calculator", "purchasing power calculator", "inflation rate calculator"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/inflation` },
  };
}

export default async function Page(props: PageProps<"/[locale]/calculator/finance/inflation">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd name={t("inflationCalculator")} description={t("inflationCalculatorDesc")} url={`${baseUrl}/${locale}/calculator/finance/inflation`} locale={locale} faqItems={[{ question: t("inflationFaq1Q"), answer: t("inflationFaq1A") }, { question: t("inflationFaq2Q"), answer: t("inflationFaq2A") }]} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: `${baseUrl}/${locale}` }, { name: tCat("financePageTitle"), url: `${baseUrl}/${locale}/calculator/finance` }, { name: t("inflationCalculator"), url: `${baseUrl}/${locale}/calculator/finance/inflation` }]} />
      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("inflationCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("inflationCalculatorDesc")}</p>
            <InflationCalculatorClient />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3"><p>{t("inflationFormulaNote")}</p></div>
            </div>
            <AdBanner slot="calc-sidebar" format="rectangle" />
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("inflationStep1")}</li><li>{t("inflationStep2")}</li><li>{t("inflationStep3")}</li>
              </ol>
            </div>
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                <div><h3 className="font-medium text-sm mb-1">{t("inflationFaq1Q")}</h3><p className="text-sm text-muted-foreground">{t("inflationFaq1A")}</p></div>
                <div><h3 className="font-medium text-sm mb-1">{t("inflationFaq2Q")}</h3><p className="text-sm text-muted-foreground">{t("inflationFaq2A")}</p></div>
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["finance/inflation"]} />
          </div>
          </div>
        </div>
        <div className="mt-10"><AdBanner slot="calc-bottom" format="horizontal" /></div>
      </div>
    </>
  );
}
