import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DueDateCalculatorClient from "@/components/calculators/DueDateCalculatorClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/health/due-date">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("dueDateCalculator"),
    description: t("dueDateCalculatorDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/health/due-date` },
  };
}

export default async function DueDatePage(props: PageProps<"/[locale]/calculator/health/due-date">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("dueDateCalculator")}
        description={t("dueDateCalculatorDesc")}
        url={`${baseUrl}/${locale}/calculator/health/due-date`}
        locale={locale}
        faqItems={[
          {
            question: "How is the due date calculated?",
            answer: "Using Naegele's rule: add 280 days (40 weeks) to the first day of your last menstrual period. If your cycle differs from 28 days, the calculator adjusts accordingly.",
          },
          {
            question: "How accurate is the due date?",
            answer: "Only about 5% of babies are born on their exact due date. Most babies are born within 2 weeks before or after the estimated due date.",
          },
          {
            question: "What are the three trimesters?",
            answer: "First trimester: weeks 1–12. Second trimester: weeks 13–26. Third trimester: weeks 27–40. Each trimester involves different developmental milestones.",
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Health", url: `${baseUrl}/${locale}/calculator/health` },
          { name: "Due Date Calculator", url: `${baseUrl}/${locale}/calculator/health/due-date` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("dueDateCalculator")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("dueDateCalculatorDesc")}
            </p>
            <DueDateCalculatorClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("formula")}</h2>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-3 space-y-1">
                <p>{t("dueDateLmpMethod")}</p>
                <p>{t("dueDateConceptionMethod")}</p>
              </div>
              <p className="text-sm text-muted-foreground">{t("dueDateNaegeleNote")}</p>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("dueDateTrimesterTitle")}</h2>
              <div className="space-y-3">
                {[
                  {
                    tKey: "dueDateT1" as const,
                    weeksKey: "dueDateT1Weeks" as const,
                    descKey: "dueDateT1Desc" as const,
                    color: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
                  },
                  {
                    tKey: "dueDateT2" as const,
                    weeksKey: "dueDateT2Weeks" as const,
                    descKey: "dueDateT2Desc" as const,
                    color: "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300",
                  },
                  {
                    tKey: "dueDateT3" as const,
                    weeksKey: "dueDateT3Weeks" as const,
                    descKey: "dueDateT3Desc" as const,
                    color: "bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300",
                  },
                ].map(({ tKey, weeksKey, descKey, color }) => (
                  <div key={tKey} className={`rounded-lg p-3 ${color}`}>
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold text-sm">{t(tKey)}</p>
                      <p className="text-xs font-mono">{t(weeksKey)}</p>
                    </div>
                    <p className="text-xs opacity-80">{t(descKey)}</p>
                  </div>
                ))}
              </div>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["dueDateFaq1Q", "dueDateFaq1A"], ["dueDateFaq2Q", "dueDateFaq2A"]] as const).map(([qKey, aKey]) => (
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
