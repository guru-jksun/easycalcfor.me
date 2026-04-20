import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DiscountCalculatorClient from "@/components/calculators/DiscountCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/math/discount">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("discountCalculator"),
    description: t("discountCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/math/discount` },
  };
}

export default async function DiscountPage(props: PageProps<"/[locale]/calculator/math/discount">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("discountCalculator")}
        description={t("discountCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/math/discount`}
        locale={locale}
        faqItems={[
          { question: t("discFaq1Q"), answer: t("discFaq1A") },
          { question: t("discFaq2Q"), answer: t("discFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Math", url: `${baseUrl}/${locale}/calculator/math` },
          { name: t("discountCalculator"), url: `${baseUrl}/${locale}/calculator/math/discount` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("discountCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("discountCalculatorDesc")}</p>
            <DiscountCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>{t("discStep1")}</li>
                <li>{t("discStep2")}</li>
                <li>{t("discStep3")}</li>
              </ol>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["discFaq1Q", "discFaq1A"], ["discFaq2Q", "discFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["math/discount"]} />
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
