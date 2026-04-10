import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import FractionCalculatorClient from "@/components/calculators/FractionCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/math/fraction">): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: "Fraction Calculator — Add, Subtract, Multiply, Divide Fractions",
    description: "Free online fraction calculator. Add, subtract, multiply, and divide fractions with automatic simplification. Shows result as a simplified fraction and decimal.",
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/math/fraction` },
  };
}

export default async function FractionPage(props: PageProps<"/[locale]/calculator/math/fraction">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  const faqItems = [
    {
      question: t("fracFaq1Q"),
      answer: t("fracFaq1A"),
    },
    {
      question: t("fracFaq2Q"),
      answer: t("fracFaq2A"),
    },
  ];

  return (
    <>
      <CalculatorJsonLd
        name="Fraction Calculator"
        description="Free online fraction calculator for adding, subtracting, multiplying, and dividing fractions. Results are automatically simplified using GCD."
        url={`${baseUrl}/${locale}/calculator/math/fraction`}
        locale={locale}
        faqItems={faqItems}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Math", url: `${baseUrl}/${locale}/calculator/math` },
          { name: "Fraction Calculator", url: `${baseUrl}/${locale}/calculator/math/fraction` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("fractionCalculator")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("fractionCalculatorDesc")}
            </p>
            <FractionCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="space-y-3 text-sm">
                {[
                  { labelKey: "fracOpAddition" as const, formula: "a/b + c/d = (ad + bc) / bd" },
                  { labelKey: "fracOpSubtraction" as const, formula: "a/b − c/d = (ad − bc) / bd" },
                  { labelKey: "fracOpMultiplication" as const, formula: "a/b × c/d = ac / bd" },
                  { labelKey: "fracOpDivision" as const, formula: "a/b ÷ c/d = ad / bc" },
                ].map(({ labelKey, formula }) => (
                  <div key={labelKey} className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground">{t(labelKey)}</span>
                    <code className="bg-muted rounded px-2 py-1 text-xs font-mono">{formula}</code>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {t("fracGcdNote")}
              </p>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>{t("fracStep1")}</li>
                <li>{t("fracStep2")}</li>
                <li>{t("fracStep3")}</li>
                <li>{t("fracStep4")}</li>
              </ol>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {faqItems.map(({ question, answer }) => (
                  <div key={question}>
                    <h3 className="font-medium text-sm mb-1">{question}</h3>
                    <p className="text-sm text-muted-foreground">{answer}</p>
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
