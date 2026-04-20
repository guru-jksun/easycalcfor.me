import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SavingsCalculatorClient from "@/components/calculators/SavingsCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/savings">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("savingsCalculator"),
    description: t("savingsCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/savings` },
  };
}

export default async function SavingsCalculatorPage(props: PageProps<"/[locale]/calculator/finance/savings">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("savingsCalculator")}
        description={t("savingsCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/finance/savings`}
        locale={locale}
        faqItems={[
          {
            question: t("savFaq1Q"),
            answer: t("savFaq1A"),
          },
          {
            question: t("savFaq2Q"),
            answer: t("savFaq2A"),
          },
          {
            question: t("savFaq3Q"),
            answer: t("savFaq3A"),
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: tCat("finance"), url: `${baseUrl}/${locale}/calculator/finance` },
          { name: t("savingsCalculator"), url: `${baseUrl}/${locale}/calculator/finance/savings` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("savingsCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("savingsCalculatorDesc")}</p>
            <SavingsCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                A = P(1 + r/12)^(12t) + PMT × [(1 + r/12)^(12t) − 1] / (r/12)
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>A</strong> = {t("savVarA")}</li>
                <li><strong>P</strong> = {t("savVarP")}</li>
                <li><strong>r</strong> = {t("savVarR")}</li>
                <li><strong>t</strong> = {t("savVarT")}</li>
                <li><strong>PMT</strong> = {t("savVarPMT")}</li>
              </ul>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["savFaq1Q", "savFaq1A"], ["savFaq2Q", "savFaq2A"], ["savFaq3Q", "savFaq3A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["finance/savings"]} />
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
