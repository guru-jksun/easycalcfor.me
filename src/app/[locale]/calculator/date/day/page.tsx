import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DayCalculatorClient from "@/components/calculators/DayCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/date/day">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("dayCalcCalculator"),
    description: t("dayCalcCalculatorDesc"),
    keywords: ["day calculator", "days calculator", "days between dates calculator"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/date/day` },
  };
}

export default async function Page(props: PageProps<"/[locale]/calculator/date/day">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd name={t("dayCalcCalculator")} description={t("dayCalcCalculatorDesc")} url={`${baseUrl}/${locale}/calculator/date/day`} locale={locale} faqItems={[{ question: t("dayCalcFaq1Q"), answer: t("dayCalcFaq1A") }, { question: t("dayCalcFaq2Q"), answer: t("dayCalcFaq2A") }]} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: `${baseUrl}/${locale}` }, { name: tCat("datePageTitle"), url: `${baseUrl}/${locale}/calculator/date` }, { name: t("dayCalcCalculator"), url: `${baseUrl}/${locale}/calculator/date/day` }]} />
      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("dayCalcCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("dayCalcCalculatorDesc")}</p>
            <DayCalculatorClient />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3"><p>{t("dayCalcFormulaNote")}</p></div>
            </div>
            <AdBanner slot="calc-sidebar" format="rectangle" />
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("dayCalcStep1")}</li><li>{t("dayCalcStep2")}</li><li>{t("dayCalcStep3")}</li>
              </ol>
            </div>
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                <div><h3 className="font-medium text-sm mb-1">{t("dayCalcFaq1Q")}</h3><p className="text-sm text-muted-foreground">{t("dayCalcFaq1A")}</p></div>
                <div><h3 className="font-medium text-sm mb-1">{t("dayCalcFaq2Q")}</h3><p className="text-sm text-muted-foreground">{t("dayCalcFaq2A")}</p></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10"><AdBanner slot="calc-bottom" format="horizontal" /></div>
      </div>
    </>
  );
}
