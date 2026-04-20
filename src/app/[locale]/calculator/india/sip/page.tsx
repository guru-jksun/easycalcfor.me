import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SipCalculatorClient from "@/components/calculators/SipCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/india/sip">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("sipCalculator"),
    description: t("sipCalculatorDesc"),
    keywords: ["SIP calculator", "SIP calculator India", "mutual fund SIP calculator", "SIP returns calculator", "SIP investment calculator", "SIP कैलकुलेटर"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/india/sip` },
  };
}

export default async function SipCalculatorPage(props: PageProps<"/[locale]/calculator/india/sip">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("sipCalculator")}
        description={t("sipCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/india/sip`}
        locale={locale}
        faqItems={[
          { question: t("sipFaq1Q"), answer: t("sipFaq1A") },
          { question: t("sipFaq2Q"), answer: t("sipFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("india"), url: `${baseUrl}/${locale}/calculator/india` },
        { name: t("sipCalculator"), url: `${baseUrl}/${locale}/calculator/india/sip` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("sipCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("sipCalculatorDesc")}</p>
            <SipCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                FV = P × [(1+r)^n − 1] / r × (1+r)
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>FV</strong> = {t("sipVarFV")}</li>
                <li><strong>P</strong> = {t("sipVarP")}</li>
                <li><strong>r</strong> = {t("sipVarR")}</li>
                <li><strong>n</strong> = {t("sipVarN")}</li>
              </ul>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("sipStep1")}</li>
                <li>{t("sipStep2")}</li>
                <li>{t("sipStep3")}</li>
                <li>{t("sipStep4")}</li>
              </ol>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["sipFaq1Q", "sipFaq1A"], ["sipFaq2Q", "sipFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["india/sip"]} />
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
