import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import TdeeCalculatorClient from "@/components/calculators/TdeeCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/health/tdee">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("tdeeCalculator"),
    description: t("tdeeCalculatorDesc"),
    keywords: ["TDEE calculator", "total daily energy expenditure calculator", "calorie calculator TDEE", "tdee calculator"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/health/tdee` },
  };
}

export default async function Page(props: PageProps<"/[locale]/calculator/health/tdee">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd name={t("tdeeCalculator")} description={t("tdeeCalculatorDesc")} url={`${baseUrl}/${locale}/calculator/health/tdee`} locale={locale} faqItems={[{ question: t("tdeeFaq1Q"), answer: t("tdeeFaq1A") }, { question: t("tdeeFaq2Q"), answer: t("tdeeFaq2A") }]} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: `${baseUrl}/${locale}` }, { name: tCat("healthPageTitle"), url: `${baseUrl}/${locale}/calculator/health` }, { name: t("tdeeCalculator"), url: `${baseUrl}/${locale}/calculator/health/tdee` }]} />
      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("tdeeCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("tdeeCalculatorDesc")}</p>
            <TdeeCalculatorClient />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3"><p>{t("tdeeFormulaNote")}</p></div>
              <p className="text-xs text-muted-foreground mt-3">* {t("tdeeNameNote")}</p>
            </div>
            <AdBanner slot="calc-sidebar" format="rectangle" />
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("tdeeStep1")}</li><li>{t("tdeeStep2")}</li><li>{t("tdeeStep3")}</li>
              </ol>
            </div>
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                <div><h3 className="font-medium text-sm mb-1">{t("tdeeFaq1Q")}</h3><p className="text-sm text-muted-foreground">{t("tdeeFaq1A")}</p></div>
                <div><h3 className="font-medium text-sm mb-1">{t("tdeeFaq2Q")}</h3><p className="text-sm text-muted-foreground">{t("tdeeFaq2A")}</p></div>
              </div>
            </div>

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["health/tdee"]} />
          </div>
        </div>
        <div className="mt-10"><AdBanner slot="calc-bottom" format="horizontal" /></div>
      </div>
    </>
  );
}
