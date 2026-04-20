import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LoanCalculatorClient from "@/components/calculators/LoanCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/loan">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("loanCalculator"),
    description: t("loanCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/loan` },
  };
}

export default async function LoanCalculatorPage(props: PageProps<"/[locale]/calculator/finance/loan">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("loanCalculator")}
        description={t("loanCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/finance/loan`}
        locale={locale}
        faqItems={[
          {
            question: t("loanFaq1Q"),
            answer: t("loanFaq1A"),
          },
          {
            question: t("loanFaq2Q"),
            answer: t("loanFaq2A"),
          },
          {
            question: t("loanFaq3Q"),
            answer: t("loanFaq3A"),
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: tCat("finance"), url: `${baseUrl}/${locale}/calculator/finance` },
          { name: t("loanCalculator"), url: `${baseUrl}/${locale}/calculator/finance/loan` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("loanCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("loanCalculatorDesc")}</p>
            <LoanCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                M = P[r(1+r)^n] / [(1+r)^n - 1]
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>M</strong> = {t("loanVarM")}</li>
                <li><strong>P</strong> = {t("loanVarP")}</li>
                <li><strong>r</strong> = {t("loanVarR")}</li>
                <li><strong>n</strong> = {t("loanVarN")}</li>
              </ul>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["loanFaq1Q", "loanFaq1A"], ["loanFaq2Q", "loanFaq2A"], ["loanFaq3Q", "loanFaq3A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            </div>

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["finance/loan"]} />
          </div>
        </div>

        <div className="mt-10">
          <AdBanner slot="calc-bottom" format="horizontal" />
        </div>
      </div>
    </>
  );
}
