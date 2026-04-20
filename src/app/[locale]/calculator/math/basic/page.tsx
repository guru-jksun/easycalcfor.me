import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BasicCalculatorClient from "@/components/calculators/BasicCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/math/basic">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("basicCalculator"),
    description: t("basicCalculatorDesc"),
    alternates: {
      canonical: `https://easycalcfor.me/${locale}/calculator/math/basic`,
    },
  };
}

export default async function BasicCalculatorPage(props: PageProps<"/[locale]/calculator/math/basic">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("basicCalculator")}
        description={t("basicCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/math/basic`}
        locale={locale}
        faqItems={[
          { question: t("basicFaq1Q"), answer: t("basicFaq1A") },
          { question: t("basicFaq2Q"), answer: t("basicFaq2A") },
          { question: t("basicFaq3Q"), answer: t("basicFaq3A") },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Math", url: `${baseUrl}/${locale}/calculator/math` },
          { name: t("basicCalculator"), url: `${baseUrl}/${locale}/calculator/math/basic` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Calculator */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("basicCalculator")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("basicCalculatorDesc")}
            </p>
            <BasicCalculatorClient />
          </div>

          {/* Info + FAQ + Ad */}
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>{t("basicStep1")}</li>
                <li>{t("basicStep2")}</li>
                <li>{t("basicStep3")}</li>
                <li>{t("basicStep4")}</li>
                <li>{t("basicStep5")}</li>
              </ol>
            </div>

            {/* Ad: Sidebar */}
            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([
                  { q: t("basicFaq1Q"), a: t("basicFaq1A") },
                  { q: t("basicFaq2Q"), a: t("basicFaq2A") },
                  { q: t("basicFaq3Q"), a: t("basicFaq3A") },
                ] as const).map(({ q, a }) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{q}</h3>
                    <p className="text-sm text-muted-foreground">{a}</p>
                  </div>
                ))}
              </div>
            </div>

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["math/basic"]} />
          </div>
        </div>

        {/* Ad: Below calculator content */}
        <div className="mt-10">
          <AdBanner slot="calc-bottom" format="horizontal" />
        </div>
      </div>
    </>
  );
}
