import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LengthConverterClient from "@/components/calculators/LengthConverterClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(
  props: PageProps<"/[locale]/calculator/conversion/length">
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("lengthConverter"),
    description: t("lengthConverterDesc"),
    alternates: {
      canonical: `https://easycalcfor.me/${locale}/calculator/conversion/length`,
    },
  };
}

export default async function LengthConverterPage(
  props: PageProps<"/[locale]/calculator/conversion/length">
) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("lengthConverter")}
        description={t("lengthConverterDesc")}
        url={`${baseUrl}/${locale}/calculator/conversion/length`}
        locale={locale}
        faqItems={[
          {
            question: t("lenFaq1Q"),
            answer: t("lenFaq1A"),
          },
          {
            question: t("lenFaq2Q"),
            answer: t("lenFaq2A"),
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Conversion", url: `${baseUrl}/${locale}/calculator/conversion` },
          { name: "Length Converter", url: `${baseUrl}/${locale}/calculator/conversion/length` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Converter */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("lengthConverter")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("lengthConverterDesc")}
            </p>
            <LengthConverterClient />
          </div>

          {/* Right: Info + FAQ */}
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("lenCommonTitle")}</h2>
              <div className="space-y-2 text-sm">
                {[
                  { from: "1 km",          to: "1,000 m / 0.621371 mi" },
                  { from: "1 mile",        to: "1.60934 km / 5,280 ft" },
                  { from: "1 foot",        to: "30.48 cm / 12 inches" },
                  { from: "1 inch",        to: "2.54 cm / 25.4 mm" },
                  { from: "1 nautical mi", to: "1.852 km / 1.15078 mi" },
                ].map(({ from, to }) => (
                  <div key={from} className="flex justify-between gap-4">
                    <span className="font-mono text-muted-foreground">{from}</span>
                    <span className="text-right">{to}</span>
                  </div>
                ))}
              </div>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["lenFaq1Q", "lenFaq1A"], ["lenFaq2Q", "lenFaq2A"]] as const).map(([q, a]) => (
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
