import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import TaxCalculator2026Client from "@/components/calculators/TaxCalculator2026Client";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/tax/tax-2026">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("tax2026Calculator"),
    description: t("tax2026CalculatorDesc"),
    keywords: ["tax calculator 2026", "income tax calculator 2026", "federal tax calculator 2026", "2026 tax brackets"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/tax/tax-2026` },
  };
}

export default async function Page(props: PageProps<"/[locale]/calculator/tax/tax-2026">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd name={t("tax2026Calculator")} description={t("tax2026CalculatorDesc")} url={`${baseUrl}/${locale}/calculator/tax/tax-2026`} locale={locale} faqItems={[{ question: t("tax2026Faq1Q"), answer: t("tax2026Faq1A") }, { question: t("tax2026Faq2Q"), answer: t("tax2026Faq2A") }]} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: `${baseUrl}/${locale}` }, { name: tCat("taxPageTitle"), url: `${baseUrl}/${locale}/calculator/tax` }, { name: t("tax2026Calculator"), url: `${baseUrl}/${locale}/calculator/tax/tax-2026` }]} />
      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("tax2026Calculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("tax2026CalculatorDesc")}</p>
            <TaxCalculator2026Client />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3"><p>{t("tax2026FormulaNote")}</p></div>
            </div>
            <AdBanner slot="calc-sidebar" format="rectangle" />
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("tax2026Step1")}</li><li>{t("tax2026Step2")}</li><li>{t("tax2026Step3")}</li>
              </ol>
            </div>
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                <div><h3 className="font-medium text-sm mb-1">{t("tax2026Faq1Q")}</h3><p className="text-sm text-muted-foreground">{t("tax2026Faq1A")}</p></div>
                <div><h3 className="font-medium text-sm mb-1">{t("tax2026Faq2Q")}</h3><p className="text-sm text-muted-foreground">{t("tax2026Faq2A")}</p></div>
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["tax/tax-2026"]} />
          </div>
          </div>
        </div>
        <div className="mt-10"><AdBanner slot="calc-bottom" format="horizontal" /></div>
      </div>
    </>
  );
}
