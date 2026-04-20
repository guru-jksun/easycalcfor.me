import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import GpaCalculatorClient from "@/components/calculators/GpaCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/math/gpa">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("gpaCalculator"),
    description: t("gpaCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/math/gpa` },
  };
}

export default async function GpaPage(props: PageProps<"/[locale]/calculator/math/gpa">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("gpaCalculator")}
        description={t("gpaCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/math/gpa`}
        locale={locale}
        faqItems={[
          { question: t("gpaFaq1Q"), answer: t("gpaFaq1A") },
          { question: t("gpaFaq2Q"), answer: t("gpaFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: t("gpaCalculator"), url: `${baseUrl}/${locale}/calculator/math/gpa` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("gpaCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("gpaCalculatorDesc")}</p>
            <GpaCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("gpaHowToUse")}</h2>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>{t("gpaStep1")}</li>
                <li>{t("gpaStep2")}</li>
                <li>{t("gpaStep3")}</li>
                <li>{t("gpaStep4")}</li>
              </ol>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {[
                  { q: "gpaFaq1Q" as const, a: "gpaFaq1A" as const },
                  { q: "gpaFaq2Q" as const, a: "gpaFaq2A" as const },
                ].map(({ q, a }) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["math/gpa"]} />
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
