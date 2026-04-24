import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import GratuityCalculatorClient from "@/components/calculators/GratuityCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/india/gratuity">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("gratCalculator"),
    description: t("gratCalculatorDesc"),
    keywords: ["gratuity calculator India", "Payment of Gratuity Act 1972", "gratuity formula", "gratuity tax exemption", "gratuity eligibility"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/india/gratuity` },
  };
}

export default async function GratuityPage(props: PageProps<"/[locale]/calculator/india/gratuity">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("gratCalculator")}
        description={t("gratCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/india/gratuity`}
        locale={locale}
        faqItems={[
          { question: t("gratFaq1Q"), answer: t("gratFaq1A") },
          { question: t("gratFaq2Q"), answer: t("gratFaq2A") },
          { question: t("gratFaq3Q"), answer: t("gratFaq3A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("india"), url: `${baseUrl}/${locale}/calculator/india` },
        { name: t("gratCalculator"), url: `${baseUrl}/${locale}/calculator/india/gratuity` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("gratCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("gratCalculatorDesc")}</p>
            <GratuityCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-3 font-mono text-xs mb-3 space-y-1">
                <div>{t("gratCovered")}: (15 × S × N) / 26</div>
                <div>{t("gratNotCovered")}: (15 × S × N) / 30</div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>S</strong> = {t("gratVarS")}</li>
                <li><strong>N</strong> = {t("gratVarN")}</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-3">{t("gratCapNote")}</p>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("gratStep1")}</li>
                <li>{t("gratStep2")}</li>
                <li>{t("gratStep3")}</li>
                <li>{t("gratStep4")}</li>
              </ol>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["gratFaq1Q", "gratFaq1A"], ["gratFaq2Q", "gratFaq2A"], ["gratFaq3Q", "gratFaq3A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            </div>

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["india/gratuity"]} />
          </div>
        </div>
        <div className="mt-10">
          <AdBanner slot="calc-bottom" format="horizontal" />
        </div>
      </div>
    </>
  );
}
