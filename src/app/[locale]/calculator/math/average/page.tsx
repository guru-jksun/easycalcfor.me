import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AverageCalculatorClient from "@/components/calculators/AverageCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/math/average">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("avgCalculator"),
    description: t("avgCalculatorDesc"),
    keywords: ["average calculator", "mean calculator", "median calculator", "statistics calculator"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/math/average` },
  };
}

export default async function Page(props: PageProps<"/[locale]/calculator/math/average">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("avgCalculator")}
        description={t("avgCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/math/average`}
        locale={locale}
        faqItems={[
          { question: t("avgFaq1Q"), answer: t("avgFaq1A") },
          { question: t("avgFaq2Q"), answer: t("avgFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("mathPageTitle"), url: `${baseUrl}/${locale}/calculator/math` },
        { name: t("avgCalculator"), url: `${baseUrl}/${locale}/calculator/math/average` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("avgCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("avgCalculatorDesc")}</p>
            <AverageCalculatorClient />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                <p>{t("avgFormulaNote")}</p>
              </div>
            </div>
            <AdBanner slot="calc-sidebar" format="rectangle" />
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("avgStep1")}</li>
                <li>{t("avgStep2")}</li>
                <li>{t("avgStep3")}</li>
              </ol>
            </div>
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-1">{t("avgFaq1Q")}</h3>
                  <p className="text-sm text-muted-foreground">{t("avgFaq1A")}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">{t("avgFaq2Q")}</h3>
                  <p className="text-sm text-muted-foreground">{t("avgFaq2A")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10"><AdBanner slot="calc-bottom" format="horizontal" /></div>
      </div>
    </>
  );
}
