import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DdayCounterClient from "@/components/calculators/DdayCounterClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/date/dday">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("ddayCounter"),
    description: t("ddayCounterDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/date/dday` },
  };
}

export default async function DdayPage(props: PageProps<"/[locale]/calculator/date/dday">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("ddayCounter")}
        description={t("ddayCounterDesc")}
        url={`${baseUrl}/${locale}/calculator/date/dday`}
        locale={locale}
        faqItems={[
          {
            question: "What does D-Day mean?",
            answer: "D-Day originally referred to the day of a military operation. In everyday use, it means a designated target date for any important event — a countdown destination.",
          },
          {
            question: "Are my saved events stored privately?",
            answer: "Yes — saved events are stored only in your browser's localStorage. They never leave your device and are not sent to any server.",
          },
          {
            question: "What does the progress bar show?",
            answer: "For future events within 365 days, the progress bar shows how much of the year-long window has elapsed — giving a visual sense of how close the date is.",
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Date", url: `${baseUrl}/${locale}/calculator/date` },
          { name: "D-Day Counter", url: `${baseUrl}/${locale}/calculator/date/dday` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("ddayCounter")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("ddayCounterDesc")}
            </p>
            <DdayCounterClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("ddayHowTitle")}</h2>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>{t("ddayStep1")}</li>
                <li>{t("ddayStep2")}</li>
                <li>{t("ddayStep3")}</li>
                <li>{t("ddayStep4")}</li>
                <li>{t("ddayStep5")}</li>
              </ol>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("ddayDisplayTitle")}</h2>
              <div className="space-y-2 text-sm">
                {[
                  { label: "D-42", descKey: "ddayFmtFuture" as const },
                  { label: "+365", descKey: "ddayFmtPast" as const },
                  { label: "Today!", descKey: "ddayFmtToday" as const },
                ].map(({ label, descKey }) => (
                  <div key={label} className="flex gap-3">
                    <code className="font-mono text-primary font-bold min-w-[60px]">{label}</code>
                    <span className="text-muted-foreground">{t(descKey)}</span>
                  </div>
                ))}
              </div>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["ddayFaq1Q", "ddayFaq1A"], ["ddayFaq2Q", "ddayFaq2A"]] as const).map(([qKey, aKey]) => (
                  <div key={qKey}>
                    <h3 className="font-medium text-sm mb-1">{t(qKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(aKey)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["date/dday"]} />
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
