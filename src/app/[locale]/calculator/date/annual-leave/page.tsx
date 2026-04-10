import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AnnualLeaveClient from "@/components/calculators/AnnualLeaveClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/date/annual-leave">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("annualLeaveCalculator"),
    description: t("annualLeaveCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/date/annual-leave` },
  };
}

export default async function AnnualLeavePage(props: PageProps<"/[locale]/calculator/date/annual-leave">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("annualLeaveCalculator")}
        description={t("annualLeaveCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/date/annual-leave`}
        locale={locale}
        faqItems={[
          {
            question: t("alFaq1Q"),
            answer: t("alFaq1A"),
          },
          {
            question: t("alFaq2Q"),
            answer: t("alFaq2A"),
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Date", url: `${baseUrl}/${locale}/calculator/date` },
          { name: t("annualLeaveCalculator"), url: `${baseUrl}/${locale}/calculator/date/annual-leave` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("annualLeaveCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("annualLeaveCalculatorDesc")}</p>
            <AnnualLeaveClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>{t("alStep1")}</li>
                <li>{t("alStep2")}</li>
                <li>{t("alStep3")}</li>
              </ol>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["alFaq1Q", "alFaq1A"], ["alFaq2Q", "alFaq2A"]] as const).map(([q, a]) => (
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
