import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, Timer, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/date">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "categories" });
  return {
    title: t("datePageTitle"),
    description: t("datePageSubtitle"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/date` },
  };
}

const DATE_KEYS = [
  { nameKey: "ageCalculator", descKey: "ageCalculatorDesc", href: "date/age", emoji: "🎂" },
  { nameKey: "dateDifference", descKey: "dateDifferenceDesc", href: "date/difference", emoji: "📅" },
  { nameKey: "ddayCounter", descKey: "ddayCounterDesc", href: "date/dday", emoji: "⏳" },
  { nameKey: "timeDuration", descKey: "timeDurationDesc", href: "date/time-duration", emoji: "⏰" },
  { nameKey: "annualLeaveCalculator", descKey: "annualLeaveCalculatorDesc", href: "date/annual-leave", emoji: "🌴" },
  { nameKey: "militaryDischargeCalculator", descKey: "militaryDischargeCalculatorDesc", href: "date/military-discharge", emoji: "🎖️" },
];

export default async function DatePage(props: PageProps<"/[locale]/calculator/date">) {
  const { locale } = await props.params;
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const tCalc = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";
  const prefix = (path: string) => `/${locale}/calculator/${path}`;

  return (
    <>
      <CalculatorJsonLd
        name={tCat("datePageTitle")}
        description={tCat("datePageSubtitle")}
        url={`${baseUrl}/${locale}/calculator/date`}
        locale={locale}
        faqItems={[
          { question: "How do I calculate my exact age?", answer: "Use our Age Calculator. Enter your birth date and it will calculate your exact age in years, months, and days." },
          { question: "How many days between two dates?", answer: "Use our Date Difference Calculator. Enter the start and end dates to get the exact number of days, weeks, months, and years." },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("datePageTitle"), url: `${baseUrl}/${locale}/calculator/date` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{tCat("datePageTitle")}</h1>
          <p className="text-muted-foreground">{tCat("datePageSubtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DATE_KEYS.map(({ nameKey, descKey, href, emoji }) => (
            <Link key={href} href={prefix(href)}>
              <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer border hover:border-primary/30">
                <CardContent className="p-5 flex items-start gap-4">
                  <span className="text-3xl">{emoji}</span>
                  <div>
                    <p className="font-semibold">{tCalc(nameKey as never)}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{tCalc(descKey as never)}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
