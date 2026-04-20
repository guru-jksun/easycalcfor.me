import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import GstCalculatorClient from "@/components/calculators/GstCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/india/gst">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("gstCalculator"),
    description: t("gstCalculatorDesc"),
    keywords: ["GST calculator", "GST calculator India", "GST calculator online", "CGST SGST calculator", "18% GST calculator", "GST कैलकुलेटर"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/india/gst` },
  };
}

export default async function GstCalculatorPage(props: PageProps<"/[locale]/calculator/india/gst">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("gstCalculator")}
        description={t("gstCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/india/gst`}
        locale={locale}
        faqItems={[
          { question: t("gstFaq1Q"), answer: t("gstFaq1A") },
          { question: t("gstFaq2Q"), answer: t("gstFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("india"), url: `${baseUrl}/${locale}/calculator/india` },
        { name: t("gstCalculator"), url: `${baseUrl}/${locale}/calculator/india/gst` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("gstCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("gstCalculatorDesc")}</p>
            <GstCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1 mb-3">
                <p>GST = Amount × Rate / 100</p>
                <p>CGST = GST / 2</p>
                <p>SGST = GST / 2</p>
              </div>
              <p className="text-sm text-muted-foreground">{t("gstFormulaNote")}</p>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("gstStep1")}</li>
                <li>{t("gstStep2")}</li>
                <li>{t("gstStep3")}</li>
                <li>{t("gstStep4")}</li>
              </ol>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("gstSlabsTitle")}</h2>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>5%</strong> — {t("gstSlab5")}</p>
                <p><strong>12%</strong> — {t("gstSlab12")}</p>
                <p><strong>18%</strong> — {t("gstSlab18")}</p>
                <p><strong>28%</strong> — {t("gstSlab28")}</p>
              </div>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["gstFaq1Q", "gstFaq1A"], ["gstFaq2Q", "gstFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["india/gst"]} />
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
