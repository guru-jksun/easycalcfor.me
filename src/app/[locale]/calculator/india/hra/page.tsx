import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HraCalculatorClient from "@/components/calculators/HraCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/india/hra">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("hraCalculator"),
    description: t("hraCalculatorDesc"),
    keywords: ["HRA calculator", "HRA exemption calculator", "HRA calculator India", "house rent allowance calculator", "HRA tax exemption", "HRA कैलकुलेटर"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/india/hra` },
  };
}

export default async function HraCalculatorPage(props: PageProps<"/[locale]/calculator/india/hra">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("hraCalculator")}
        description={t("hraCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/india/hra`}
        locale={locale}
        faqItems={[
          { question: t("hraFaq1Q"), answer: t("hraFaq1A") },
          { question: t("hraFaq2Q"), answer: t("hraFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("india"), url: `${baseUrl}/${locale}/calculator/india` },
        { name: t("hraCalculator"), url: `${baseUrl}/${locale}/calculator/india/hra` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("hraCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("hraCalculatorDesc")}</p>
            <HraCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 text-sm mb-3 space-y-1">
                <p className="font-mono">{t("hraCondition1")}</p>
                <p className="font-mono">{t("hraCondition2")}</p>
                <p className="font-mono">{t("hraCondition3")}</p>
              </div>
              <p className="text-sm text-muted-foreground">{t("hraFormulaNote")}</p>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("hraStep1")}</li>
                <li>{t("hraStep2")}</li>
                <li>{t("hraStep3")}</li>
                <li>{t("hraStep4")}</li>
              </ol>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["hraFaq1Q", "hraFaq1A"], ["hraFaq2Q", "hraFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["india/hra"]} />
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
