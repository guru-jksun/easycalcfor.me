import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PaycheckCalculatorClient from "@/components/calculators/PaycheckCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/paycheck">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("paycheckCalculator"),
    description: t("paycheckCalculatorDesc"),
    keywords: ["paycheck calculator", "paycheck calculator 2026", "take home pay calculator"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/paycheck` },
  };
}

export default async function Page(props: PageProps<"/[locale]/calculator/finance/paycheck">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd name={t("paycheckCalculator")} description={t("paycheckCalculatorDesc")} url={`${baseUrl}/${locale}/calculator/finance/paycheck`} locale={locale} faqItems={[{ question: t("paycheckFaq1Q"), answer: t("paycheckFaq1A") }, { question: t("paycheckFaq2Q"), answer: t("paycheckFaq2A") }]} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: `${baseUrl}/${locale}` }, { name: tCat("financePageTitle"), url: `${baseUrl}/${locale}/calculator/finance` }, { name: t("paycheckCalculator"), url: `${baseUrl}/${locale}/calculator/finance/paycheck` }]} />
      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("paycheckCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("paycheckCalculatorDesc")}</p>
            <PaycheckCalculatorClient />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3"><p>{t("paycheckFormulaNote")}</p></div>
            </div>
            <AdBanner slot="calc-sidebar" format="rectangle" />
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("paycheckStep1")}</li><li>{t("paycheckStep2")}</li><li>{t("paycheckStep3")}</li>
              </ol>
            </div>
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                <div><h3 className="font-medium text-sm mb-1">{t("paycheckFaq1Q")}</h3><p className="text-sm text-muted-foreground">{t("paycheckFaq1A")}</p></div>
                <div><h3 className="font-medium text-sm mb-1">{t("paycheckFaq2Q")}</h3><p className="text-sm text-muted-foreground">{t("paycheckFaq2A")}</p></div>
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["finance/paycheck"]} />
          </div>
          </div>
        </div>
        <div className="mt-10"><AdBanner slot="calc-bottom" format="horizontal" /></div>
      </div>
    </>
  );
}
