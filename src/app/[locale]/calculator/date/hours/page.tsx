import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import TimeCalculatorClient from "@/components/calculators/TimeCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/date/hours">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("hoursCalcCalculator"),
    description: t("hoursCalcCalculatorDesc"),
    keywords: ["hours calculator", "hours and minutes calculator", "hours calculator online"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/date/hours` },
  };
}

export default async function Page(props: PageProps<"/[locale]/calculator/date/hours">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd name={t("hoursCalcCalculator")} description={t("hoursCalcCalculatorDesc")} url={`${baseUrl}/${locale}/calculator/date/hours`} locale={locale} faqItems={[{ question: t("timeCalcFaq1Q"), answer: t("timeCalcFaq1A") }, { question: t("timeCalcFaq2Q"), answer: t("timeCalcFaq2A") }]} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: `${baseUrl}/${locale}` }, { name: tCat("datePageTitle"), url: `${baseUrl}/${locale}/calculator/date` }, { name: t("hoursCalcCalculator"), url: `${baseUrl}/${locale}/calculator/date/hours` }]} />
      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("hoursCalcCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("hoursCalcCalculatorDesc")}</p>
            <TimeCalculatorClient />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3"><p>{t("timeCalcFormulaNote")}</p></div>
            </div>
            <AdBanner slot="calc-sidebar" format="rectangle" />
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("timeCalcStep1")}</li><li>{t("timeCalcStep2")}</li><li>{t("timeCalcStep3")}</li>
              </ol>
            </div>
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                <div><h3 className="font-medium text-sm mb-1">{t("timeCalcFaq1Q")}</h3><p className="text-sm text-muted-foreground">{t("timeCalcFaq1A")}</p></div>
                <div><h3 className="font-medium text-sm mb-1">{t("timeCalcFaq2Q")}</h3><p className="text-sm text-muted-foreground">{t("timeCalcFaq2A")}</p></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10"><AdBanner slot="calc-bottom" format="horizontal" /></div>
      </div>
    </>
  );
}
