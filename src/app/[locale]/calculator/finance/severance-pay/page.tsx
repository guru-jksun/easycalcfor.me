import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SeverancePayClient from "@/components/calculators/SeverancePayClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/severance-pay">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("severancePayCalculator"),
    description: t("severancePayCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/severance-pay` },
  };
}

export default async function SeverancePayPage(props: PageProps<"/[locale]/calculator/finance/severance-pay">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("severancePayCalculator")}
        description={t("severancePayCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/finance/severance-pay`}
        locale={locale}
        faqItems={[
          {
            question: t("spFaq1Q"),
            answer: t("spFaq1A"),
          },
          {
            question: t("spFaq2Q"),
            answer: t("spFaq2A"),
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: tCat("finance"), url: `${baseUrl}/${locale}/calculator/finance` },
          { name: t("severancePayCalculator"), url: `${baseUrl}/${locale}/calculator/finance/severance-pay` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("severancePayCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("severancePayCalculatorDesc")}</p>
            <SeverancePayClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>{t("spStep1")}</li>
                <li>{t("spStep2")}</li>
                <li>{t("spStep3")}</li>
                <li>{t("spStep4")}</li>
              </ol>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["spFaq1Q", "spFaq1A"], ["spFaq2Q", "spFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["finance/severance-pay"]} />
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
