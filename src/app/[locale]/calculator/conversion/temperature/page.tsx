import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import TemperatureConverterClient from "@/components/calculators/TemperatureConverterClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(
  props: PageProps<"/[locale]/calculator/conversion/temperature">
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("temperatureConverter"),
    description: t("temperatureConverterDesc"),
    alternates: {
      canonical: `https://easycalcfor.me/${locale}/calculator/conversion/temperature`,
    },
  };
}

export default async function TemperatureConverterPage(
  props: PageProps<"/[locale]/calculator/conversion/temperature">
) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("temperatureConverter")}
        description={t("temperatureConverterDesc")}
        url={`${baseUrl}/${locale}/calculator/conversion/temperature`}
        locale={locale}
        faqItems={[
          {
            question: t("tempFaq1Q"),
            answer: t("tempFaq1A"),
          },
          {
            question: t("tempFaq2Q"),
            answer: t("tempFaq2A"),
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Conversion", url: `${baseUrl}/${locale}/calculator/conversion` },
          { name: "Temperature Converter", url: `${baseUrl}/${locale}/calculator/conversion/temperature` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Converter */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("temperatureConverter")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("temperatureConverterDesc")}
            </p>
            <TemperatureConverterClient />
          </div>

          {/* Right: Formulas + Reference + FAQ */}
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("tempFormulasTitle")}</h2>
              <div className="space-y-2 text-sm font-mono">
                {[
                  "°F = (°C × 9/5) + 32",
                  "°C = (°F − 32) × 5/9",
                  "K  = °C + 273.15",
                  "°C = K − 273.15",
                  "K  = (°F − 32) × 5/9 + 273.15",
                  "°F = (K − 273.15) × 9/5 + 32",
                ].map((f) => (
                  <div key={f} className="bg-muted rounded px-3 py-1.5 text-xs">
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("tempRefTitle")}</h2>
              <div className="overflow-hidden rounded-lg border text-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 text-left">
                      <th className="px-3 py-2 font-medium text-muted-foreground">{t("tempRefPoint")}</th>
                      <th className="px-3 py-2 font-medium text-muted-foreground text-right">°C</th>
                      <th className="px-3 py-2 font-medium text-muted-foreground text-right">°F</th>
                      <th className="px-3 py-2 font-medium text-muted-foreground text-right">K</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { labelKey: "tempRefAbsZero" as const, c: -273.15, f: -459.67, k: 0 },
                      { labelKey: "tempRefFreezes" as const, c: 0,       f: 32,      k: 273.15 },
                      { labelKey: "tempRefBody" as const,    c: 37,      f: 98.6,    k: 310.15 },
                      { labelKey: "tempRefBoils" as const,   c: 100,     f: 212,     k: 373.15 },
                    ].map(({ labelKey, c, f, k }, i) => (
                      <tr key={labelKey} className={`border-t ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                        <td className="px-3 py-2">{t(labelKey)}</td>
                        <td className="px-3 py-2 text-right font-mono">{c}</td>
                        <td className="px-3 py-2 text-right font-mono">{f}</td>
                        <td className="px-3 py-2 text-right font-mono">{k}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["tempFaq1Q", "tempFaq1A"], ["tempFaq2Q", "tempFaq2A"]] as const).map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-medium text-sm mb-1">{t(q)}</h3>
                    <p className="text-sm text-muted-foreground">{t(a)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["conversion/temperature"]} />
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
