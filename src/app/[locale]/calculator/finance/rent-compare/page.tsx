import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import RentCompareClient from "@/components/calculators/RentCompareClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/rent-compare">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("rentCompareCalculator"),
    description: t("rentCompareCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/rent-compare` },
  };
}

export default async function RentComparePage(props: PageProps<"/[locale]/calculator/finance/rent-compare">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("rentCompareCalculator")}
        description={t("rentCompareCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/finance/rent-compare`}
        locale={locale}
        faqItems={[
          { question: t("rentFaq1Q"), answer: t("rentFaq1A") },
          { question: t("rentFaq2Q"), answer: t("rentFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("finance"), url: `${baseUrl}/${locale}/calculator/finance` },
        { name: t("rentCompareCalculator"), url: `${baseUrl}/${locale}/calculator/finance/rent-compare` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("rentCompareCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("rentCompareCalculatorDesc")}</p>
            <RentCompareClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("rentStep1")}</li>
                <li>{t("rentStep2")}</li>
                <li>{t("rentStep3")}</li>
                <li>{t("rentStep4")}</li>
              </ol>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["rentFaq1Q", "rentFaq1A"], ["rentFaq2Q", "rentFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["finance/rent-compare"]} />
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
