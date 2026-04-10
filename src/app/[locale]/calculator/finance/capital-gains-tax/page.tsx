import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CapitalGainsTaxClient from "@/components/calculators/CapitalGainsTaxClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/capital-gains-tax">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("capitalGainsTaxCalculator"),
    description: t("capitalGainsTaxCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/capital-gains-tax` },
  };
}

export default async function CapitalGainsTaxPage(props: PageProps<"/[locale]/calculator/finance/capital-gains-tax">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("capitalGainsTaxCalculator")}
        description={t("capitalGainsTaxCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/finance/capital-gains-tax`}
        locale={locale}
        faqItems={[
          { question: t("cgtFaq1Q"), answer: t("cgtFaq1A") },
          { question: t("cgtFaq2Q"), answer: t("cgtFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("finance"), url: `${baseUrl}/${locale}/calculator/finance` },
        { name: t("capitalGainsTaxCalculator"), url: `${baseUrl}/${locale}/calculator/finance/capital-gains-tax` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("capitalGainsTaxCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("capitalGainsTaxCalculatorDesc")}</p>
            <CapitalGainsTaxClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("cgtStep1")}</li>
                <li>{t("cgtStep2")}</li>
                <li>{t("cgtStep3")}</li>
                <li>{t("cgtStep4")}</li>
              </ol>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["cgtFaq1Q", "cgtFaq1A"], ["cgtFaq2Q", "cgtFaq2A"]] as const).map(([q, a]) => (
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
