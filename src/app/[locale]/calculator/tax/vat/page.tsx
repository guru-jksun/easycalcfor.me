import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import VatCalculatorClient from "@/components/calculators/VatCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/tax/vat">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("vatCalculator"),
    description: t("vatCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/tax/vat` },
  };
}

export default async function VatPage(props: PageProps<"/[locale]/calculator/tax/vat">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("vatCalculator")}
        description={t("vatCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/tax/vat`}
        locale={locale}
        faqItems={[
          { question: t("vatFaq1Q"), answer: t("vatFaq1A") },
          { question: t("vatFaq2Q"), answer: t("vatFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("tax"), url: `${baseUrl}/${locale}/calculator/tax` },
        { name: t("vatCalculator"), url: `${baseUrl}/${locale}/calculator/tax/vat` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("vatCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("vatCalculatorDesc")}</p>
            <VatCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1 font-medium">{t("vatExclusiveLabel")}</p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">VAT = Price × Rate / 100</div>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm mt-1">Gross = Price + VAT</div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 font-medium">{t("vatInclusiveLabel")}</p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">Net = Gross ÷ (1 + Rate / 100)</div>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm mt-1">VAT = Gross − Net</div>
                </div>
              </div>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["vatFaq1Q", "vatFaq1A"], ["vatFaq2Q", "vatFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
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
