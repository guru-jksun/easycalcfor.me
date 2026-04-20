import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PpfCalculatorClient from "@/components/calculators/PpfCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/india/ppf">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("ppfCalculator"),
    description: t("ppfCalculatorDesc"),
    keywords: ["PPF calculator", "PPF calculator India", "public provident fund calculator", "PPF interest calculator", "PPF maturity calculator", "PPF कैलकुलेटर"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/india/ppf` },
  };
}

export default async function PpfCalculatorPage(props: PageProps<"/[locale]/calculator/india/ppf">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("ppfCalculator")}
        description={t("ppfCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/india/ppf`}
        locale={locale}
        faqItems={[
          { question: t("ppfFaq1Q"), answer: t("ppfFaq1A") },
          { question: t("ppfFaq2Q"), answer: t("ppfFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("india"), url: `${baseUrl}/${locale}/calculator/india` },
        { name: t("ppfCalculator"), url: `${baseUrl}/${locale}/calculator/india/ppf` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("ppfCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("ppfCalculatorDesc")}</p>
            <PpfCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                Balance = (Prev + Yearly) × (1 + r)
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>Prev</strong> = {t("ppfVarPrev")}</li>
                <li><strong>Yearly</strong> = {t("ppfVarYearly")}</li>
                <li><strong>r</strong> = {t("ppfVarR")}</li>
              </ul>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("ppfStep1")}</li>
                <li>{t("ppfStep2")}</li>
                <li>{t("ppfStep3")}</li>
                <li>{t("ppfStep4")}</li>
              </ol>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["ppfFaq1Q", "ppfFaq1A"], ["ppfFaq2Q", "ppfFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["india/ppf"]} />
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
