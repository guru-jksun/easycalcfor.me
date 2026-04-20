import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import TipCalculatorClient from "@/components/calculators/TipCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/tip">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("tipCalculator"),
    description: t("tipCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/tip` },
  };
}

export default async function TipPage(props: PageProps<"/[locale]/calculator/finance/tip">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("tipCalculator")}
        description={t("tipCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/finance/tip`}
        locale={locale}
        faqItems={[
          { question: t("tipFaq1Q"), answer: t("tipFaq1A") },
          { question: t("tipFaq2Q"), answer: t("tipFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Finance", url: `${baseUrl}/${locale}/calculator/finance` },
          { name: t("tipCalculator"), url: `${baseUrl}/${locale}/calculator/finance/tip` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("tipCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("tipCalculatorDesc")}</p>
            <TipCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>{t("tipStep1")}</li>
                <li>{t("tipStep2")}</li>
                <li>{t("tipStep3")}</li>
              </ol>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["tipFaq1Q", "tipFaq1A"], ["tipFaq2Q", "tipFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["finance/tip"]} />
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
