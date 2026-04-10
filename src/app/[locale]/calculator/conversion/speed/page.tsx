import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SpeedConverterClient from "@/components/calculators/SpeedConverterClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(
  props: PageProps<"/[locale]/calculator/conversion/speed">
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("speedConverter"),
    description: t("speedConverterDesc"),
    alternates: {
      canonical: `https://easycalcfor.me/${locale}/calculator/conversion/speed`,
    },
  };
}

export default async function SpeedConverterPage(
  props: PageProps<"/[locale]/calculator/conversion/speed">
) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("speedConverter")}
        description={t("speedConverterDesc")}
        url={`${baseUrl}/${locale}/calculator/conversion/speed`}
        locale={locale}
        faqItems={[
          {
            question: "How do you convert mph to km/h?",
            answer:
              "Multiply mph by 1.60934. For example, 60 mph = 96.56 km/h. This is useful for US to European speed conversions.",
          },
          {
            question: "What is Mach 1 in km/h?",
            answer:
              "Mach 1 (speed of sound at sea level) = approximately 1,225 km/h or 761 mph. This varies with altitude and temperature.",
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Conversion", url: `${baseUrl}/${locale}/calculator/conversion` },
          { name: "Speed Converter", url: `${baseUrl}/${locale}/calculator/conversion/speed` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Converter */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("speedConverter")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("speedConverterDesc")}
            </p>
            <SpeedConverterClient />
          </div>

          {/* Right: Reference + FAQ */}
          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("speedRefsTitle")}</h2>
              <div className="space-y-2 text-sm">
                {[
                  { labelKey: "speedRefWalking" as const,  value: "~5 km/h / 3.1 mph" },
                  { labelKey: "speedRefCity" as const,     value: "50 km/h / 31 mph" },
                  { labelKey: "speedRefHighway" as const,  value: "100–130 km/h / 62–81 mph" },
                  { labelKey: "speedRefAircraft" as const, value: "~900 km/h / ~560 mph" },
                  { labelKey: "speedRefSound" as const,    value: "~1,225 km/h (Mach 1)" },
                  { labelKey: "speedRefLight" as const,    value: "~1.08 billion km/h" },
                ].map(({ labelKey, value }) => (
                  <div key={labelKey} className="flex justify-between gap-4">
                    <span className="text-muted-foreground">{t(labelKey)}</span>
                    <span className="text-right font-mono text-xs">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("speedQuickRefTitle")}</h2>
              <div className="space-y-1.5 text-sm">
                {[
                  { unit: "1 mph",  eq: "= 1.60934 km/h = 0.44704 m/s" },
                  { unit: "1 km/h", eq: "= 0.62137 mph = 0.27778 m/s" },
                  { unit: "1 m/s",  eq: "= 3.6 km/h = 2.23694 mph" },
                  { unit: "1 knot", eq: "= 1.852 km/h = 1.15078 mph" },
                  { unit: "Mach 1", eq: "≈ 340.29 m/s ≈ 1,225 km/h" },
                ].map(({ unit, eq }) => (
                  <div key={unit} className="flex gap-2 text-xs">
                    <span className="font-mono font-semibold w-14 shrink-0">{unit}</span>
                    <span className="text-muted-foreground">{eq}</span>
                  </div>
                ))}
              </div>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["speedFaq1Q", "speedFaq1A"], ["speedFaq2Q", "speedFaq2A"]] as const).map(([qKey, aKey]) => (
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
