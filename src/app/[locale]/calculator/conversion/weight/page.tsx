import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import WeightConverterClient from "@/components/calculators/WeightConverterClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(
  props: PageProps<"/[locale]/calculator/conversion/weight">
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("weightConverter"),
    description: t("weightConverterDesc"),
    alternates: {
      canonical: `https://easycalcfor.me/${locale}/calculator/conversion/weight`,
    },
  };
}

export default async function WeightConverterPage(
  props: PageProps<"/[locale]/calculator/conversion/weight">
) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("weightConverter")}
        description={t("weightConverterDesc")}
        url={`${baseUrl}/${locale}/calculator/conversion/weight`}
        locale={locale}
        faqItems={[
          {
            question: t("wgtFaq1Q"),
            answer: t("wgtFaq1A"),
          },
          {
            question: t("wgtFaq2Q"),
            answer: t("wgtFaq2A"),
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Conversion", url: `${baseUrl}/${locale}/calculator/conversion` },
          { name: "Weight Converter", url: `${baseUrl}/${locale}/calculator/conversion/weight` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Converter */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("weightConverter")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("weightConverterDesc")}
            </p>
            <WeightConverterClient />
          </div>

          {/* Right: Info + FAQ */}
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("wgtCommonTitle")}</h2>
              <div className="space-y-2 text-sm">
                {[
                  { from: "1 kg",          to: "2.20462 lb / 35.274 oz" },
                  { from: "1 pound (lb)",  to: "0.453592 kg / 16 oz" },
                  { from: "1 ounce (oz)",  to: "28.3495 g / 0.0625 lb" },
                  { from: "1 stone",       to: "6.35029 kg / 14 lb" },
                  { from: "1 metric ton",  to: "1,000 kg / 2,204.62 lb" },
                ].map(({ from, to }) => (
                  <div key={from} className="flex justify-between gap-4">
                    <span className="font-mono text-muted-foreground">{from}</span>
                    <span className="text-right">{to}</span>
                  </div>
                ))}
              </div>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["wgtFaq1Q", "wgtFaq1A"], ["wgtFaq2Q", "wgtFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["conversion/weight"]} />
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
