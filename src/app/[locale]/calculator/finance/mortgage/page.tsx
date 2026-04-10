import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import MortgageCalculatorClient from "@/components/calculators/MortgageCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/mortgage">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("mortgageCalculator"),
    description: t("mortgageCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/mortgage` },
  };
}

export default async function MortgageCalculatorPage(props: PageProps<"/[locale]/calculator/finance/mortgage">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("mortgageCalculator")}
        description={t("mortgageCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/finance/mortgage`}
        locale={locale}
        faqItems={[
          {
            question: t("mortFaq1Q"),
            answer: t("mortFaq1A"),
          },
          {
            question: t("mortFaq2Q"),
            answer: t("mortFaq2A"),
          },
          {
            question: t("mortFaq3Q"),
            answer: t("mortFaq3A"),
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: tCat("finance"), url: `${baseUrl}/${locale}/calculator/finance` },
          { name: t("mortgageCalculator"), url: `${baseUrl}/${locale}/calculator/finance/mortgage` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("mortgageCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("mortgageCalculatorDesc")}</p>
            <MortgageCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                M = P[r(1+r)^n] / [(1+r)^n - 1]
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>M</strong> = {t("mortVarM")}</li>
                <li><strong>P</strong> = {t("mortVarP")}</li>
                <li><strong>r</strong> = {t("mortVarR")}</li>
                <li><strong>n</strong> = {t("mortVarN")}</li>
              </ul>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["mortFaq1Q", "mortFaq1A"], ["mortFaq2Q", "mortFaq2A"], ["mortFaq3Q", "mortFaq3A"]] as const).map(([q, a]) => (
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
