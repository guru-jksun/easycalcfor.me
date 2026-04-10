import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SalaryCalculatorClient from "@/components/calculators/SalaryCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/finance/salary">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("salaryCalculator"),
    description: t("salaryCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/finance/salary` },
  };
}

export default async function SalaryCalculatorPage(props: PageProps<"/[locale]/calculator/finance/salary">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("salaryCalculator")}
        description={t("salaryCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/finance/salary`}
        locale={locale}
        faqItems={[
          { question: t("salaryFaq1Q"), answer: t("salaryFaq1A") },
          { question: t("salaryFaq2Q"), answer: t("salaryFaq2A") },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("finance"), url: `${baseUrl}/${locale}/calculator/finance` },
        { name: t("salaryCalculator"), url: `${baseUrl}/${locale}/calculator/finance/salary` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("salaryCalculator")}</h1>
            <p className="text-muted-foreground mb-6">{t("salaryCalculatorDesc")}</p>
            <SalaryCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("salaryHowToUse")}</h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t("salaryStep1")}</li>
                <li>{t("salaryStep2")}</li>
                <li>{t("salaryStep3")}</li>
                <li>{t("salaryStep4")}</li>
              </ol>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["salaryFaq1Q", "salaryFaq1A"], ["salaryFaq2Q", "salaryFaq2A"]] as const).map(([q, a]) => (
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
