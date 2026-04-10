import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import InterestRateCalculatorClient from "@/components/calculators/InterestRateCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/interest-rate">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("interestRateCalculator"),
    description: t("interestRateCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/interest-rate` },
  };
}

export default async function InterestRateCalculatorPage(props: PageProps<"/[locale]/calculator/finance/interest-rate">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("interestRateCalculator")}
        description={t("interestRateCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/finance/interest-rate`}
        locale={locale}
        faqItems={[
          {
            question: t("irFaq1Q"),
            answer: t("irFaq1A"),
          },
          {
            question: t("irFaq2Q"),
            answer: t("irFaq2A"),
          },
          {
            question: t("irFaq3Q"),
            answer: t("irFaq3A"),
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: tCat("finance"), url: `${baseUrl}/${locale}/calculator/finance` },
          { name: t("interestRateCalculator"), url: `${baseUrl}/${locale}/calculator/finance/interest-rate` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("interestRateCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("interestRateCalculatorDesc")}</p>
            <InterestRateCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>

              <p className="text-sm font-medium mb-1">{t("irSectionCompound")}</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                r = n × [(FV / P)^(1 / nt) − 1]
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                <li><strong>r</strong> = {t("irVarR")}</li>
                <li><strong>FV</strong> = {t("irVarFV")}</li>
                <li><strong>P</strong> = {t("irVarP")}</li>
                <li><strong>n</strong> = {t("irVarN")}</li>
                <li><strong>t</strong> = {t("irVarT")}</li>
              </ul>

              <p className="text-sm font-medium mb-1">{t("irSectionSimple")}</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                I = P × r × t
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>I</strong> = {t("irVarI")}</li>
                <li><strong>P</strong> = {t("irVarP")}</li>
                <li><strong>r</strong> = {t("irVarRDecimal")}</li>
                <li><strong>t</strong> = {t("irVarT")}</li>
              </ul>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["irFaq1Q", "irFaq1A"], ["irFaq2Q", "irFaq2A"], ["irFaq3Q", "irFaq3A"]] as const).map(([q, a]) => (
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
