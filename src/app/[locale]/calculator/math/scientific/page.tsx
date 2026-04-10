import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ScientificCalculatorClient from "@/components/calculators/ScientificCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/math/scientific">): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: "Scientific Calculator — sin, cos, tan, log, ln, √, Powers",
    description: "Free online scientific calculator with trigonometry (sin, cos, tan), logarithms (log, ln), square root, powers, π, e. Supports degree and radian modes.",
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/math/scientific` },
  };
}

export default async function ScientificPage(props: PageProps<"/[locale]/calculator/math/scientific">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  const faqItems = [
    {
      question: t("sciFaq1Q"),
      answer: t("sciFaq1A"),
    },
    {
      question: t("sciFaq2Q"),
      answer: t("sciFaq2A"),
    },
  ];

  return (
    <>
      <CalculatorJsonLd
        name="Scientific Calculator"
        description="Free online scientific calculator with trigonometric functions, logarithms, square root, exponents, π, and e. Supports degree and radian modes."
        url={`${baseUrl}/${locale}/calculator/math/scientific`}
        locale={locale}
        faqItems={faqItems}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Math", url: `${baseUrl}/${locale}/calculator/math` },
          { name: "Scientific Calculator", url: `${baseUrl}/${locale}/calculator/math/scientific` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("scientificCalculator")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("scientificCalculatorDesc")}
            </p>
            <ScientificCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("sciRefTitle")}</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                  { btn: "sin / cos / tan", descKey: "sciDescTrig" as const },
                  { btn: "log", descKey: "sciDescLog10" as const },
                  { btn: "ln", descKey: "sciDescLn" as const },
                  { btn: "√", descKey: "sciDescSqrt" as const },
                  { btn: "x²", descKey: "sciDescSquare" as const },
                  { btn: "xⁿ", descKey: "sciDescPower" as const },
                  { btn: "π", descKey: "sciDescPi" as const },
                  { btn: "e", descKey: "sciDescE" as const },
                ].map(({ btn, descKey }) => (
                  <div key={btn} className="flex items-start gap-2">
                    <code className="bg-muted rounded px-1.5 py-0.5 text-xs font-mono shrink-0">{btn}</code>
                    <span className="text-muted-foreground text-xs">{t(descKey)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>{t("sciStep1")}</li>
                <li>{t("sciStep2")}</li>
                <li>{t("sciStep3")}</li>
                <li>{t("sciStep4")}</li>
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
