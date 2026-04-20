import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import TimeDurationClient from "@/components/calculators/TimeDurationClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/date/time-duration">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  return {
    title: t("timeDuration"),
    description: t("timeDurationDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/date/time-duration` },
  };
}

export default async function TimeDurationPage(props: PageProps<"/[locale]/calculator/date/time-duration">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={t("timeDuration")}
        description={t("timeDurationDesc")}
        url={`${baseUrl}/${locale}/calculator/date/time-duration`}
        locale={locale}
        faqItems={[
          {
            question: "How do I enter times correctly?",
            answer: "Enter times in HH:MM:SS or HH:MM format, using 24-hour notation. For example: 09:30:00 for 9:30 AM, or 17:45 for 5:45 PM.",
          },
          {
            question: "What does 'crosses midnight' mean?",
            answer: "Enable this toggle when your end time is on the next day — for example, a shift from 22:00 to 06:00. Without this toggle, the calculator would report an error since end time appears before start time.",
          },
          {
            question: "What is decimal hours?",
            answer: "Decimal hours express the duration as a single number. For example, 1 hour 30 minutes = 1.5 hours. This is useful for payroll and time-tracking calculations.",
          },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Date", url: `${baseUrl}/${locale}/calculator/date` },
          { name: "Time Duration", url: `${baseUrl}/${locale}/calculator/date/time-duration` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("timeDuration")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("timeDurationDesc")}
            </p>
            <TimeDurationClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("tdFormatsTitle")}</h2>
              <div className="space-y-2 text-sm">
                {[
                  { input: "09:30:00", descKey: "tdFormat1" as const },
                  { input: "17:45", descKey: "tdFormat2" as const },
                  { input: "00:00:00", descKey: "tdFormat3" as const },
                  { input: "23:59:59", descKey: "tdFormat4" as const },
                ].map(({ input, descKey }) => (
                  <div key={input} className="flex gap-3">
                    <code className="font-mono text-primary font-medium min-w-[90px]">{input}</code>
                    <span className="text-muted-foreground">{t(descKey)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("tdUseCasesTitle")}</h2>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>{t("tdUseCase1")}</li>
                <li>{t("tdUseCase2")}</li>
                <li>{t("tdUseCase3")}</li>
                <li>{t("tdUseCase4")}</li>
                <li>{t("tdUseCase5")}</li>
              </ul>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {([["tdFaq1Q", "tdFaq1A"], ["tdFaq2Q", "tdFaq2A"]] as const).map(([qKey, aKey]) => (
                  <div key={qKey}>
                    <h3 className="font-medium text-sm mb-1">{t(qKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(aKey)}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["date/time-duration"]} />
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
