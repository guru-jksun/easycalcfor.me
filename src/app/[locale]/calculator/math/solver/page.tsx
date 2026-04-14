import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import MathSolverClient from "@/components/calculators/MathSolverClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/math/solver">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("solverCalculator"),
    description: t("solverCalculatorDesc"),
    keywords: ["math solver", "equation solver", "quadratic formula calculator", "system of equations solver"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/math/solver` },
  };
}

export default async function Page(props: PageProps<"/[locale]/calculator/math/solver">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("solverCalculator")}
        description={t("solverCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/math/solver`}
        locale={locale}
        faqItems={[
          { question: t("solverFaq1Q"), answer: t("solverFaq1A") },
          { question: t("solverFaq2Q"), answer: t("solverFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("mathPageTitle"), url: `${baseUrl}/${locale}/calculator/math` },
        { name: t("solverCalculator"), url: `${baseUrl}/${locale}/calculator/math/solver` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("solverCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("solverCalculatorDesc")}</p>
            <MathSolverClient />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                <p>{t("solverFormulaNote")}</p>
              </div>
            </div>
            <AdBanner slot="calc-sidebar" format="rectangle" />
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("solverStep1")}</li>
                <li>{t("solverStep2")}</li>
                <li>{t("solverStep3")}</li>
              </ol>
            </div>
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-1">{t("solverFaq1Q")}</h3>
                  <p className="text-sm text-muted-foreground">{t("solverFaq1A")}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">{t("solverFaq2Q")}</h3>
                  <p className="text-sm text-muted-foreground">{t("solverFaq2A")}</p>
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
