import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CurrencyConverterClient from "@/components/calculators/CurrencyConverterClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(
  props: PageProps<"/[locale]/calculator/conversion/currency">
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("currencyConverter"),
    description: t("currencyConverterDesc"),
    alternates: {
      canonical: `https://easycalcfor.me/${locale}/calculator/conversion/currency`,
    },
  };
}

export default async function CurrencyConverterPage(
  props: PageProps<"/[locale]/calculator/conversion/currency">
) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("currencyConverter")}
        description={t("currencyConverterDesc")}
        url={`${baseUrl}/${locale}/calculator/conversion/currency`}
        locale={locale}
        faqItems={[
          {
            question: "Are the exchange rates live?",
            answer:
              "No — this converter uses approximate reference rates for quick estimates. For live, real-time rates used in transactions, please check your bank or a forex service.",
          },
          {
            question: "How is currency conversion calculated?",
            answer:
              "All currencies are converted through a common base (USD). The formula is: result = (amount / fromRate) × toRate, where each rate is expressed as units per 1 USD.",
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Conversion", url: `${baseUrl}/${locale}/calculator/conversion` },
          { name: "Currency Converter", url: `${baseUrl}/${locale}/calculator/conversion/currency` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Converter */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("currencyConverter")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("currencyConverterDesc")}
            </p>
            <CurrencyConverterClient />
          </div>

          {/* Right: Info + FAQ */}
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("currSupportedTitle")}</h2>
              <div className="grid grid-cols-2 gap-1.5 text-sm">
                {[
                  ["USD", "US Dollar"],
                  ["EUR", "Euro"],
                  ["GBP", "British Pound"],
                  ["JPY", "Japanese Yen"],
                  ["KRW", "Korean Won"],
                  ["CNY", "Chinese Yuan"],
                  ["INR", "Indian Rupee"],
                  ["CAD", "Canadian Dollar"],
                  ["AUD", "Australian Dollar"],
                  ["CHF", "Swiss Franc"],
                  ["SGD", "Singapore Dollar"],
                  ["HKD", "Hong Kong Dollar"],
                  ["MXN", "Mexican Peso"],
                  ["BRL", "Brazilian Real"],
                ].map(([code, name]) => (
                  <div key={code} className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-xs bg-muted px-1.5 py-0.5 rounded">
                      {code}
                    </span>
                    <span className="text-muted-foreground text-xs">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-5">
              <h2 className="font-semibold text-sm text-amber-800 dark:text-amber-300 mb-1">
                {t("currAboutTitle")}
              </h2>
              <p className="text-xs text-amber-700 dark:text-amber-400">
                {t("currAboutDesc")}
              </p>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["currFaq1Q", "currFaq1A"], ["currFaq2Q", "currFaq2A"]] as const).map(([qKey, aKey]) => (
                  <div key={qKey}>
                    <h3 className="font-medium text-sm mb-1">{t(qKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(aKey)}</p>
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
