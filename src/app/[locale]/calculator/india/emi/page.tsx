import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import EmiCalculatorClient from "@/components/calculators/EmiCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/india/emi">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("emiCalculator"),
    description: t("emiCalculatorDesc"),
    keywords: ["EMI calculator", "EMI calculator India", "home loan EMI", "car loan EMI", "personal loan EMI", "loan EMI calculator online", "EMI कैलकुलेटर"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/india/emi` },
  };
}

export default async function EmiCalculatorPage(props: PageProps<"/[locale]/calculator/india/emi">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("emiCalculator")}
        description={t("emiCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/india/emi`}
        locale={locale}
        faqItems={[
          { question: t("emiFaq1Q"), answer: t("emiFaq1A") },
          { question: t("emiFaq2Q"), answer: t("emiFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("india"), url: `${baseUrl}/${locale}/calculator/india` },
        { name: t("emiCalculator"), url: `${baseUrl}/${locale}/calculator/india/emi` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("emiCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("emiCalculatorDesc")}</p>
            <EmiCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                EMI = P × r × (1+r)^n / [(1+r)^n − 1]
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>P</strong> = {t("emiVarP")}</li>
                <li><strong>r</strong> = {t("emiVarR")}</li>
                <li><strong>n</strong> = {t("emiVarN")}</li>
              </ul>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("emiStep1")}</li>
                <li>{t("emiStep2")}</li>
                <li>{t("emiStep3")}</li>
                <li>{t("emiStep4")}</li>
              </ol>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["emiFaq1Q", "emiFaq1A"], ["emiFaq2Q", "emiFaq2A"]] as const).map(([q, a]) => (
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
