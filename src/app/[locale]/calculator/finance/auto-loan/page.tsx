import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AutoLoanCalculatorClient from "@/components/calculators/AutoLoanCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/auto-loan">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("autoLoanCalculator"),
    description: t("autoLoanCalculatorDesc"),
    keywords: ["auto loan calculator", "car loan calculator", "vehicle loan calculator"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/auto-loan` },
  };
}

export default async function Page(props: PageProps<"/[locale]/calculator/finance/auto-loan">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd name={t("autoLoanCalculator")} description={t("autoLoanCalculatorDesc")} url={`${baseUrl}/${locale}/calculator/finance/auto-loan`} locale={locale} faqItems={[{ question: t("autoLoanFaq1Q"), answer: t("autoLoanFaq1A") }, { question: t("autoLoanFaq2Q"), answer: t("autoLoanFaq2A") }]} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: `${baseUrl}/${locale}` }, { name: tCat("financePageTitle"), url: `${baseUrl}/${locale}/calculator/finance` }, { name: t("autoLoanCalculator"), url: `${baseUrl}/${locale}/calculator/finance/auto-loan` }]} />
      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("autoLoanCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("autoLoanCalculatorDesc")}</p>
            <AutoLoanCalculatorClient />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3"><p>{t("autoLoanFormulaNote")}</p></div>
            </div>
            <AdBanner slot="calc-sidebar" format="rectangle" />
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("autoLoanStep1")}</li><li>{t("autoLoanStep2")}</li><li>{t("autoLoanStep3")}</li>
              </ol>
            </div>
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                <div><h3 className="font-medium text-sm mb-1">{t("autoLoanFaq1Q")}</h3><p className="text-sm text-muted-foreground">{t("autoLoanFaq1A")}</p></div>
                <div><h3 className="font-medium text-sm mb-1">{t("autoLoanFaq2Q")}</h3><p className="text-sm text-muted-foreground">{t("autoLoanFaq2A")}</p></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10"><AdBanner slot="calc-bottom" format="horizontal" /></div>
      </div>
    </>
  );
}
