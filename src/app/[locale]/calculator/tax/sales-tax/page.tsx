import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SalesTaxCalculatorClient from "@/components/calculators/SalesTaxCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/tax/sales-tax">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("salesTaxCalculator"),
    description: t("salesTaxCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/tax/sales-tax` },
  };
}

export default async function SalesTaxPage(props: PageProps<"/[locale]/calculator/tax/sales-tax">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("salesTaxCalculator")}
        description={t("salesTaxCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/tax/sales-tax`}
        locale={locale}
        faqItems={[
          { question: t("salesTaxFaq1Q"), answer: t("salesTaxFaq1A") },
          { question: t("salesTaxFaq2Q"), answer: t("salesTaxFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("tax"), url: `${baseUrl}/${locale}/calculator/tax` },
        { name: t("salesTaxCalculator"), url: `${baseUrl}/${locale}/calculator/tax/sales-tax` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("salesTaxCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("salesTaxCalculatorDesc")}</p>
            <SalesTaxCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="space-y-3">
                <div className="bg-muted rounded-lg p-4 font-mono text-sm">Tax Amount = Price × (Rate ÷ 100)</div>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm">Total = Price + Tax Amount</div>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm">Pre-tax = Total ÷ (1 + Rate ÷ 100)</div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 mt-3">
                <li><strong>Price</strong> — {t("salesTaxPriceLabel")}</li>
                <li><strong>Rate</strong> — {t("salesTaxRateLabel")}</li>
                <li><strong>Total</strong> — {t("salesTaxTotalLabel")}</li>
              </ul>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["salesTaxFaq1Q", "salesTaxFaq1A"], ["salesTaxFaq2Q", "salesTaxFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["tax/sales-tax"]} />
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
