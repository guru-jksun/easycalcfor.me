import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import FdCalculatorClient from "@/components/calculators/FdCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/india/fd">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("fdCalculator"),
    description: t("fdCalculatorDesc"),
    keywords: ["FD calculator", "fixed deposit calculator", "FD calculator India", "FD interest calculator", "bank FD calculator", "FD कैलकुलेटर"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/india/fd` },
  };
}

export default async function FdCalculatorPage(props: PageProps<"/[locale]/calculator/india/fd">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("fdCalculator")}
        description={t("fdCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/india/fd`}
        locale={locale}
        faqItems={[
          { question: t("fdFaq1Q"), answer: t("fdFaq1A") },
          { question: t("fdFaq2Q"), answer: t("fdFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("india"), url: `${baseUrl}/${locale}/calculator/india` },
        { name: t("fdCalculator"), url: `${baseUrl}/${locale}/calculator/india/fd` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("fdCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("fdCalculatorDesc")}</p>
            <FdCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                A = P × (1 + r/n)^(n×t)
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>A</strong> = {t("fdVarA")}</li>
                <li><strong>P</strong> = {t("fdVarP")}</li>
                <li><strong>r</strong> = {t("fdVarR")}</li>
                <li><strong>n</strong> = {t("fdVarN")}</li>
                <li><strong>t</strong> = {t("fdVarT")}</li>
              </ul>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("fdStep1")}</li>
                <li>{t("fdStep2")}</li>
                <li>{t("fdStep3")}</li>
                <li>{t("fdStep4")}</li>
              </ol>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["fdFaq1Q", "fdFaq1A"], ["fdFaq2Q", "fdFaq2A"]] as const).map(([q, a]) => (
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
