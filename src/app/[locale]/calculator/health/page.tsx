import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Scale, Flame, Baby, Dumbbell, Droplets } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/health">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "categories" });
  return {
    title: t("healthPageTitle"),
    description: t("healthPageSubtitle"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/health` },
  };
}

const HEALTH_KEYS = [
  { nameKey: "bmiCalculator", descKey: "bmiCalculatorDesc", href: "health/bmi", emoji: "⚖️" },
  { nameKey: "calorieCalculator", descKey: "calorieCalculatorDesc", href: "health/calorie", emoji: "🔥" },
  { nameKey: "bodyFatCalculator", descKey: "bodyFatCalculatorDesc", href: "health/body-fat", emoji: "💧" },
  { nameKey: "dueDateCalculator", descKey: "dueDateCalculatorDesc", href: "health/due-date", emoji: "👶" },
  { nameKey: "idealWeightCalculator", descKey: "idealWeightCalculatorDesc", href: "health/ideal-weight", emoji: "❤️" },
  { nameKey: "oneRepMaxCalculator", descKey: "oneRepMaxCalculatorDesc", href: "health/one-rep-max", emoji: "🏋️" },
  { nameKey: "bacCalculator", descKey: "bacCalculatorDesc", href: "health/bac", emoji: "🍺" },
  { nameKey: "sleepCalculator", descKey: "sleepCalculatorDesc", href: "health/sleep", emoji: "😴" },
];

export default async function HealthPage(props: PageProps<"/[locale]/calculator/health">) {
  const { locale } = await props.params;
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const tCalc = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";
  const prefix = (path: string) => `/${locale}/calculator/${path}`;

  return (
    <>
      <CalculatorJsonLd
        name={tCat("healthPageTitle")}
        description={tCat("healthPageSubtitle")}
        url={`${baseUrl}/${locale}/calculator/health`}
        locale={locale}
        faqItems={[
          { question: "What is a normal BMI?", answer: "A normal BMI is between 18.5 and 24.9. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is obese." },
          { question: "How many calories do I need per day?", answer: "It depends on your age, weight, height, and activity level. Use our Calorie Calculator (TDEE) for a personalized estimate." },
        ]}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/${locale}` },
        { name: tCat("healthPageTitle"), url: `${baseUrl}/${locale}/calculator/health` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{tCat("healthPageTitle")}</h1>
          <p className="text-muted-foreground">{tCat("healthPageSubtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HEALTH_KEYS.map(({ nameKey, descKey, href, emoji }) => (
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
