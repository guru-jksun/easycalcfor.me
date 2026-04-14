import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PaymentCalculatorClient from "@/components/calculators/PaymentCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/payment">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("paymentCalculator"),
    description: t("paymentCalculatorDesc"),
    keywords: ["payment calculator", "loan payment calculator", "monthly payment calculator"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/payment` },
  };
}

export default async function Page(props: PageProps<"/[locale]/calculator/finance/payment">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd name={t("paymentCalculator")} description={t("paymentCalculatorDesc")} url={`${baseUrl}/${locale}/calculator/finance/payment`} locale={locale} faqItems={[{ question: t("paymentFaq1Q"), answer: t("paymentFaq1A") }, { question: t("paymentFaq2Q"), answer: t("paymentFaq2A") }]} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: `${baseUrl}/${locale}` }, { name: tCat("financePageTitle"), url: `${baseUrl}/${locale}/calculator/finance` }, { name: t("paymentCalculator"), url: `${baseUrl}/${locale}/calculator/finance/payment` }]} />
      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("paymentCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("paymentCalculatorDesc")}</p>
            <PaymentCalculatorClient />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3"><p>{t("paymentFormulaNote")}</p></div>
            </div>
            <AdBanner slot="calc-sidebar" format="rectangle" />
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("paymentStep1")}</li><li>{t("paymentStep2")}</li><li>{t("paymentStep3")}</li>
              </ol>
            </div>
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                <div><h3 className="font-medium text-sm mb-1">{t("paymentFaq1Q")}</h3><p className="text-sm text-muted-foreground">{t("paymentFaq1A")}</p></div>
                <div><h3 className="font-medium text-sm mb-1">{t("paymentFaq2Q")}</h3><p className="text-sm text-muted-foreground">{t("paymentFaq2A")}</p></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10"><AdBanner slot="calc-bottom" format="horizontal" /></div>
      </div>
    </>
  );
}
