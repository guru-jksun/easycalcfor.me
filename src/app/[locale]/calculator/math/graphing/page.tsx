import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import GraphingCalculatorClient from "@/components/calculators/GraphingCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/math/graphing">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("graphCalculator"),
    description: t("graphCalculatorDesc"),
    keywords: ["graphing calculator", "graphing calculator online", "desmos alternative", "equation grapher"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/math/graphing` },
  };
}

export default async function Page(props: PageProps<"/[locale]/calculator/math/graphing">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("graphCalculator")}
        description={t("graphCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/math/graphing`}
        locale={locale}
        faqItems={[
          { question: t("graphFaq1Q"), answer: t("graphFaq1A") },
          { question: t("graphFaq2Q"), answer: t("graphFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("mathPageTitle"), url: `${baseUrl}/${locale}/calculator/math` },
        { name: t("graphCalculator"), url: `${baseUrl}/${locale}/calculator/math/graphing` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("graphCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("graphCalculatorDesc")}</p>
            <GraphingCalculatorClient />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                <p>{t("graphFormulaNote")}</p>
              </div>
            </div>
            <AdBanner slot="calc-sidebar" format="rectangle" />
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("graphStep1")}</li>
                <li>{t("graphStep2")}</li>
                <li>{t("graphStep3")}</li>
              </ol>
            </div>
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-1">{t("graphFaq1Q")}</h3>
                  <p className="text-sm text-muted-foreground">{t("graphFaq1A")}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">{t("graphFaq2Q")}</h3>
                  <p className="text-sm text-muted-foreground">{t("graphFaq2A")}</p>
                </div>
              </div>
            </div>

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["math/graphing"]} />
          </div>
        </div>
        <div className="mt-10"><AdBanner slot="calc-bottom" format="horizontal" /></div>
      </div>
    </>
  );
}
