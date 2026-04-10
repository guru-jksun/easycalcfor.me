import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import FuelCostClient from "@/components/calculators/FuelCostClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/conversion/fuel-cost">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("fuelCostCalculator"),
    description: t("fuelCostCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/conversion/fuel-cost` },
  };
}

export default async function FuelCostPage(props: PageProps<"/[locale]/calculator/conversion/fuel-cost">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("fuelCostCalculator")}
        description={t("fuelCostCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/conversion/fuel-cost`}
        locale={locale}
        faqItems={[
          { question: t("fuelFaq1Q"), answer: t("fuelFaq1A") },
          { question: t("fuelFaq2Q"), answer: t("fuelFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Conversion", url: `${baseUrl}/${locale}/calculator/conversion` },
          { name: t("fuelCostCalculator"), url: `${baseUrl}/${locale}/calculator/conversion/fuel-cost` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("fuelCostCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("fuelCostCalculatorDesc")}</p>
            <FuelCostClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>{t("fuelStep1")}</li>
                <li>{t("fuelStep2")}</li>
                <li>{t("fuelStep3")}</li>
              </ol>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["fuelFaq1Q", "fuelFaq1A"], ["fuelFaq2Q", "fuelFaq2A"]] as const).map(([q, a]) => (
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
