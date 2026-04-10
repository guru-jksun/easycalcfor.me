import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BmiCalculatorClient from "@/components/calculators/BmiCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/health/bmi">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("bmiCalculator"),
    description: t("bmiCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/health/bmi` },
  };
}

export default async function BmiPage(props: PageProps<"/[locale]/calculator/health/bmi">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("bmiCalculator")}
        description={t("bmiCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/health/bmi`}
        locale={locale}
        faqItems={[
          { question: t("bmiFaq1Q"), answer: t("bmiFaq1A") },
          { question: t("bmiFaq2Q"), answer: t("bmiFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Health", url: `${baseUrl}/${locale}/calculator/health` },
          { name: "BMI Calculator", url: `${baseUrl}/${locale}/calculator/health/bmi` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("bmiCalculator")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("bmiCalculatorDesc")}
            </p>
            <BmiCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3">
                BMI = weight(kg) ÷ height(m)²
              </div>
              <p className="text-sm text-muted-foreground">{t("bmiImperialNote")}</p>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("bmiCategoriesTitle")}</h2>
              <div className="space-y-2">
                {[
                  { range: "Below 18.5", catKey: "bmiCatUnderweight" as const, color: "text-blue-600" },
                  { range: "18.5 – 24.9", catKey: "bmiCatNormal" as const, color: "text-green-600" },
                  { range: "25.0 – 29.9", catKey: "bmiCatOverweight" as const, color: "text-yellow-600" },
                  { range: "30.0 – 34.9", catKey: "bmiCatObese1" as const, color: "text-orange-600" },
                  { range: "35.0+", catKey: "bmiCatObese2" as const, color: "text-red-600" },
                ].map(({ range, catKey, color }) => (
                  <div key={catKey} className="flex justify-between text-sm">
                    <span className="font-mono text-muted-foreground">{range}</span>
                    <span className={`font-medium ${color}`}>{t(catKey)}</span>
                  </div>
                ))}
              </div>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["bmiFaq1Q", "bmiFaq1A"], ["bmiFaq2Q", "bmiFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
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
