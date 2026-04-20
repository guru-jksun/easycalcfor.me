import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SquareRootCalculatorClient from "@/components/calculators/SquareRootCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/math/square-root">): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: "Square Root Calculator — √n, ∛n, n², n³",
    description: "Free online square root calculator. Calculate square root, cube root, square, and cube of any number. Includes step-by-step explanation for perfect squares.",
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/math/square-root` },
  };
}

export default async function SquareRootPage(props: PageProps<"/[locale]/calculator/math/square-root">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  const faqItems = [
    {
      question: t("sqrtFaq1Q"),
      answer: t("sqrtFaq1A"),
    },
    {
      question: t("sqrtFaq2Q"),
      answer: t("sqrtFaq2A"),
    },
  ];

  return (
    <>
      <CalculatorJsonLd
        name="Square Root Calculator"
        description="Free online calculator for square roots, cube roots, squares, and cubes. Shows step-by-step solution for perfect squares."
        url={`${baseUrl}/${locale}/calculator/math/square-root`}
        locale={locale}
        faqItems={faqItems}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Math", url: `${baseUrl}/${locale}/calculator/math` },
          { name: "Square Root Calculator", url: `${baseUrl}/${locale}/calculator/math/square-root` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("squareRootCalculator")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("squareRootCalculatorDesc")}
            </p>
            <SquareRootCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="space-y-2 text-sm">
                {[
                  { symbol: "√n", nameKey: "sqrtNameSquareRoot" as const, descKey: "sqrtDescSquareRoot" as const },
                  { symbol: "∛n", nameKey: "sqrtNameCubeRoot" as const, descKey: "sqrtDescCubeRoot" as const },
                  { symbol: "n²", nameKey: "sqrtNameSquare" as const, desc: "n × n" },
                  { symbol: "n³", nameKey: "sqrtNameCube" as const, desc: "n × n × n" },
                ].map(({ symbol, nameKey, ...rest }) => (
                  <div key={symbol} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <code className="bg-muted rounded px-2 py-0.5 font-mono font-bold text-base w-12 text-center">{symbol}</code>
                      <span className="font-medium">{t(nameKey)}</span>
                    </div>
                    <span className="text-muted-foreground text-xs">{"descKey" in rest ? t(rest.descKey as any) : rest.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("sqrtPerfectSquaresTitle")}</h2>
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <div key={n} className="text-center bg-muted/50 rounded p-1">
                    <p className="text-xs text-muted-foreground">{n}²</p>
                    <p className="text-sm font-bold">{n * n}</p>
                  </div>
                ))}
              </div>
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
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["math/square-root"]} />
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
