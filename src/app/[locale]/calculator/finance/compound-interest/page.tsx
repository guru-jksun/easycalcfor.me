import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CompoundInterestClient from "@/components/calculators/CompoundInterestClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/compound-interest">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("compoundInterestCalculator"),
    description: t("compoundInterestCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/compound-interest` },
  };
}

export default async function CompoundInterestPage(props: PageProps<"/[locale]/calculator/finance/compound-interest">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("compoundInterestCalculator")}
        description={t("compoundInterestCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/finance/compound-interest`}
        locale={locale}
        faqItems={[
          {
            question: t("ciFaq1Q"),
            answer: t("ciFaq1A"),
          },
          {
            question: t("ciFaq2Q"),
            answer: t("ciFaq2A"),
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: tCat("finance"), url: `${baseUrl}/${locale}/calculator/finance` },
          { name: t("compoundInterestCalculator"), url: `${baseUrl}/${locale}/calculator/finance/compound-interest` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("compoundInterestCalculator")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("compoundInterestCalculatorDesc")}
            </p>
            <CompoundInterestClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                A = P(1 + r/n)^(nt)
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>A</strong> = {t("ciVarA")}</li>
                <li><strong>P</strong> = {t("ciVarP")}</li>
                <li><strong>r</strong> = {t("ciVarR")}</li>
                <li><strong>n</strong> = {t("ciVarN")}</li>
                <li><strong>t</strong> = {t("ciVarT")}</li>
              </ul>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["ciFaq1Q", "ciFaq1A"], ["ciFaq2Q", "ciFaq2A"]] as const).map(([q, a]) => (
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
