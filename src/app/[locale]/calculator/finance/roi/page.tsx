import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import RoiCalculatorClient from "@/components/calculators/RoiCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/roi">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("roiCalculator"),
    description: t("roiCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/roi` },
  };
}

export default async function RoiCalculatorPage(props: PageProps<"/[locale]/calculator/finance/roi">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("roiCalculator")}
        description={t("roiCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/finance/roi`}
        locale={locale}
        faqItems={[
          {
            question: t("roiFaq1Q"),
            answer: t("roiFaq1A"),
          },
          {
            question: t("roiFaq2Q"),
            answer: t("roiFaq2A"),
          },
          {
            question: t("roiFaq3Q"),
            answer: t("roiFaq3A"),
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: tCat("finance"), url: `${baseUrl}/${locale}/calculator/finance` },
          { name: t("roiCalculator"), url: `${baseUrl}/${locale}/calculator/finance/roi` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("roiCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("roiCalculatorDesc")}</p>
            <RoiCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                ROI = (FV − P) / P × 100%
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>ROI</strong> = {t("roiVarROI")}</li>
                <li><strong>FV</strong> = {t("roiVarFV")}</li>
                <li><strong>P</strong> = {t("roiVarP")}</li>
              </ul>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mt-3 mb-3">
                {t("roiAnnualizedFormula")}
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>t</strong> = {t("roiVarT")}</li>
              </ul>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["roiFaq1Q", "roiFaq1A"], ["roiFaq2Q", "roiFaq2A"], ["roiFaq3Q", "roiFaq3A"]] as const).map(([q, a]) => (
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
