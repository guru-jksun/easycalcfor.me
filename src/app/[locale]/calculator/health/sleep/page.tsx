import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SleepCalculatorClient from "@/components/calculators/SleepCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/health/sleep">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("sleepCalculator"),
    description: t("sleepCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/health/sleep` },
  };
}

export default async function SleepPage(props: PageProps<"/[locale]/calculator/health/sleep">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("sleepCalculator")}
        description={t("sleepCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/health/sleep`}
        locale={locale}
        faqItems={[
          { question: t("sleepFaq1Q"), answer: t("sleepFaq1A") },
          { question: t("sleepFaq2Q"), answer: t("sleepFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Health", url: `${baseUrl}/${locale}/calculator/health` },
          { name: t("sleepCalculator"), url: `${baseUrl}/${locale}/calculator/health/sleep` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("sleepCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("sleepCalculatorDesc")}</p>
            <SleepCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>{t("sleepStep1")}</li>
                <li>{t("sleepStep2")}</li>
                <li>{t("sleepStep3")}</li>
              </ol>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["sleepFaq1Q", "sleepFaq1A"], ["sleepFaq2Q", "sleepFaq2A"]] as const).map(([q, a]) => (
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
