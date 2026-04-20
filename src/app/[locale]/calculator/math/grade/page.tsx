import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import GradeCalculatorClient from "@/components/calculators/GradeCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/math/grade">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("gradeCalculator"),
    description: t("gradeCalculatorDesc"),
    keywords: ["grade calculator", "grade calculator online", "GPA grade calculator", "weighted grade calculator"],
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/math/grade` },
  };
}

export default async function Page(props: PageProps<"/[locale]/calculator/math/grade">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("gradeCalculator")}
        description={t("gradeCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/math/grade`}
        locale={locale}
        faqItems={[
          { question: t("gradeFaq1Q"), answer: t("gradeFaq1A") },
          { question: t("gradeFaq2Q"), answer: t("gradeFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("mathPageTitle"), url: `${baseUrl}/${locale}/calculator/math` },
        { name: t("gradeCalculator"), url: `${baseUrl}/${locale}/calculator/math/grade` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("gradeCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("gradeCalculatorDesc")}</p>
            <GradeCalculatorClient />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                <p>{t("gradeFormulaNote")}</p>
              </div>
            </div>
            <AdBanner slot="calc-sidebar" format="rectangle" />
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("gradeStep1")}</li>
                <li>{t("gradeStep2")}</li>
                <li>{t("gradeStep3")}</li>
              </ol>
            </div>
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-1">{t("gradeFaq1Q")}</h3>
                  <p className="text-sm text-muted-foreground">{t("gradeFaq1A")}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">{t("gradeFaq2Q")}</h3>
                  <p className="text-sm text-muted-foreground">{t("gradeFaq2A")}</p>
                </div>
              </div>
            </div>

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["math/grade"]} />
          </div>
        </div>
        <div className="mt-10"><AdBanner slot="calc-bottom" format="horizontal" /></div>
      </div>
    </>
  );
}
