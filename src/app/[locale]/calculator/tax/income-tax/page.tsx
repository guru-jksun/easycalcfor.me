import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import IncomeTaxCalculatorClient from "@/components/calculators/IncomeTaxCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/tax/income-tax">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("incomeTaxCalculator"),
    description: t("incomeTaxCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/tax/income-tax` },
  };
}

export default async function IncomeTaxPage(props: PageProps<"/[locale]/calculator/tax/income-tax">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("incomeTaxCalculator")}
        description={t("incomeTaxCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/tax/income-tax`}
        locale={locale}
        faqItems={[
          { question: t("taxFaq1Q"), answer: t("taxFaq1A") },
          { question: t("taxFaq2Q"), answer: t("taxFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("tax"), url: `${baseUrl}/${locale}/calculator/tax` },
        { name: t("incomeTaxCalculator"), url: `${baseUrl}/${locale}/calculator/tax/income-tax` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("incomeTaxCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("incomeTaxCalculatorDesc")}</p>
            <IncomeTaxCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("taxHowItWorksTitle")}</h2>
              <p className="text-sm text-muted-foreground mb-4">{t("taxProgressiveDesc")}</p>
              <div className="space-y-2">
                <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                  Effective Rate = Total Tax ÷ Gross Income × 100
                </div>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                  After-tax Income = Gross Income − Total Tax
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">{t("taxBracketsNote")}</p>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["taxFaq1Q", "taxFaq1A"], ["taxFaq2Q", "taxFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["tax/income-tax"]} />
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
