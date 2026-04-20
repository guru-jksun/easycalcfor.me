import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BacCalculatorClient from "@/components/calculators/BacCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/health/bac">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("bacCalculator"),
    description: t("bacCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/health/bac` },
  };
}

export default async function BacPage(props: PageProps<"/[locale]/calculator/health/bac">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("bacCalculator")}
        description={t("bacCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/health/bac`}
        locale={locale}
        faqItems={[
          { question: t("bacFaq1Q"), answer: t("bacFaq1A") },
          { question: t("bacFaq2Q"), answer: t("bacFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Health", url: `${baseUrl}/${locale}/calculator/health` },
          { name: t("bacCalculator"), url: `${baseUrl}/${locale}/calculator/health/bac` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("bacCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("bacCalculatorDesc")}</p>
            <BacCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>{t("bacStep1")}</li>
                <li>{t("bacStep2")}</li>
                <li>{t("bacStep3")}</li>
                <li>{t("bacStep4")}</li>
              </ol>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["bacFaq1Q", "bacFaq1A"], ["bacFaq2Q", "bacFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["health/bac"]} />
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
