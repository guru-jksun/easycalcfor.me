import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getExamplesForLocale } from "@/data/ai-guide-examples";

const EXAMPLES_UNUSED: Record<string, string[]> = {
  math: [
    "What is 15% of 2500?",
    "Square root of 256",
    "What is 3/8 + 5/12?",
    "Solve 2x + 5 = 17",
    "What is 7 factorial?",
    "Greatest common divisor of 48 and 36",
    "Least common multiple of 12 and 18",
    "What is 2 to the power of 16?",
    "Log base 10 of 1000",
    "What is the area of a circle with radius 7?",
    "Volume of a sphere with radius 5 cm",
    "What is sin(45 degrees)?",
    "Calculate the hypotenuse of a triangle with sides 3 and 4",
    "Average of 85, 92, 78, 96, and 88",
    "Standard deviation of 10, 12, 23, 23, 16, 23, 21, 16",
    "Is 97 a prime number?",
  ],
  finance: [
    "Monthly payment for $300,000 mortgage at 6.5% for 30 years",
    "How much will $10,000 grow at 7% for 20 years?",
    "Compound interest on $5,000 at 8% for 10 years compounded monthly",
    "How long to double my money at 6% annual return?",
    "ROI if I buy a stock at $50 and sell at $72",
    "How much to save monthly to reach $1,000,000 by age 65 starting at 25?",
    "Monthly car payment for $35,000 at 4.9% for 60 months",
    "Total interest paid on a $200,000 loan at 5% for 15 years",
    "What is my annual salary if I earn $28 per hour?",
    "How much is $75,000 salary after 3% annual raise for 5 years?",
    "Simple interest on $15,000 at 4.5% for 3 years",
    "Present value of $50,000 received in 10 years at 6% discount rate",
    "Future value of $500/month invested at 7% for 30 years",
    "Debt-to-income ratio with $2,500 monthly debt and $7,000 income",
    "Break-even point if fixed costs are $10,000 and margin is 40%",
  ],
  health: [
    "BMI for 175cm, 70kg",
    "How many calories does a 30-year-old male need per day?",
    "BMI for someone 5'10\" and 180 pounds",
    "Ideal weight for a 6 foot tall male",
    "How many calories in a 30-minute jog at 6 mph?",
    "Body fat percentage for a male with 32 inch waist and 170 lbs",
    "TDEE for a 25-year-old female, 160cm, 55kg, moderate activity",
    "How much water should a 200 lb person drink daily?",
    "One rep max if I can bench 185 lbs for 5 reps",
    "Target heart rate zone for a 40-year-old",
    "How many steps is 5 miles?",
    "Pregnancy due date if last period was March 15, 2026",
    "Macro split for a 2500 calorie diet at 40/30/30",
  ],
  date: [
    "How many days until Christmas 2026?",
    "What day of the week is July 4, 2026?",
    "How many days between January 15 and August 22?",
    "How old am I if I was born on March 5, 1990?",
    "What date is 100 days from today?",
    "How many weeks until New Year 2027?",
    "How many working days in September 2026?",
    "Time difference between New York and Tokyo",
    "How many hours between 9:15 AM and 5:45 PM?",
    "What week number is October 15, 2026?",
    "How many months between June 2024 and April 2026?",
    "How many seconds in a year?",
  ],
  conversion: [
    "Convert 100 miles to kilometers",
    "Convert 72°F to Celsius",
    "Convert 5 feet 8 inches to centimeters",
    "How many liters in a gallon?",
    "Convert 200 pounds to kilograms",
    "How many ounces in 2.5 liters?",
    "Convert 100 meters per second to miles per hour",
    "How many acres in a square mile?",
    "Convert 250 grams to ounces",
    "How many cups in 750 milliliters?",
    "Convert 30 megabytes to kilobytes",
    "How many inches in 3 meters?",
    "Convert 1 atmosphere to PSI",
    "How many tablespoons in a cup?",
  ],
  tax: [
    "Federal tax on $85,000 income for single filer",
    "How much is 8.5% sales tax on $150?",
    "Tax on $120,000 income married filing jointly",
    "Capital gains tax on $50,000 profit held for 2 years",
    "Self-employment tax on $60,000 net income",
    "How much is 20% VAT on a $500 item?",
    "Effective tax rate on $95,000 income",
    "Tax bracket for $150,000 income single filer 2026",
  ],
  daily: [
    "Split a $120 restaurant bill between 4 people with 18% tip",
    "How much paint for a 12x15 foot room?",
    "Gas cost for a 350-mile road trip at 28 mpg with $3.50/gallon gas",
    "20% tip on a $65 dinner bill",
    "How much carpet for a 14x16 foot room?",
    "Electricity cost to run a 1500W heater for 8 hours at $0.12/kWh",
    "How many tiles for a 10x12 foot floor with 12 inch tiles?",
    "Cost per load if a washer uses 500 watts for 1 hour at $0.15/kWh",
    "How much topsoil for a 20x30 foot garden at 4 inches deep?",
    "Price per ounce: $4.99 for 16oz vs $7.49 for 28oz",
    "How many rolls of wallpaper for a 12x14 room with 8 foot ceilings?",
    "Monthly cost of a $5.50 daily coffee habit",
    "How much fence for a 50x100 foot yard?",
    "Savings switching from $5/day lunch to $2/day, over a year",
  ],
};

const CATEGORY_META: Record<string, { icon: string; colorClass: string }> = {
  math: { icon: "+-", colorClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  finance: { icon: "$", colorClass: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
  health: { icon: "\u2764", colorClass: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
  date: { icon: "\u{1F4C5}", colorClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
  conversion: { icon: "\u21C4", colorClass: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
  tax: { icon: "\u{1F4B0}", colorClass: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20" },
  daily: { icon: "\u{1F3E0}", colorClass: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20" },
};

const CATEGORY_KEYS: Record<string, string> = {
  math: "guideMath",
  finance: "guideFinance",
  health: "guideHealth",
  date: "guideDate",
  conversion: "guideConversion",
  tax: "guideTax",
  daily: "guideDaily",
};

export async function generateMetadata(props: PageProps<"/[locale]/ai/guide">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "ai" });
  return {
    title: t("guideTitle"),
    description: t("guideSubtitle"),
    keywords: [
      "AI calculator",
      "free AI calculator",
      "online calculator AI",
      "smart calculator",
      "natural language calculator",
      "AI math solver",
      "calculator examples",
      "AI calculation guide",
    ],
    alternates: { canonical: `https://easycalcfor.me/${locale}/ai/guide` },
  };
}

export default async function AiGuidePage(props: PageProps<"/[locale]/ai/guide">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "ai" });

  const EXAMPLES = getExamplesForLocale(locale);
  const totalExamples = Object.values(EXAMPLES).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="container mx-auto px-4 max-w-5xl py-10">
      {/* Hero Section */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {t("powered")}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          {t("guideTitle")}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
          {t("guideSubtitle")}
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{totalExamples}+</span> {t("guideExamples")}
          <span className="text-border">|</span>
          <span className="font-semibold text-foreground">7</span> {t("guideCategories")}
          <span className="text-border">|</span>
          <span className="font-semibold text-foreground">100%</span> {t("guideFree")}
        </div>
      </div>

      {/* Quick nav */}
      <nav className="flex flex-wrap justify-center gap-2 mb-12">
        {Object.entries(CATEGORY_META).map(([key, meta]) => (
          <a
            key={key}
            href={`#${key}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors hover:opacity-80 ${meta.colorClass}`}
          >
            {meta.icon} {t(CATEGORY_KEYS[key] as "guideMath")}
          </a>
        ))}
      </nav>

      {/* Category sections */}
      {Object.entries(EXAMPLES).map(([category, examples]) => {
        const meta = CATEGORY_META[category];
        return (
          <section key={category} id={category} className="mb-12 scroll-mt-20">
            <div className="flex items-center gap-3 mb-5">
              <span className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg border ${meta.colorClass}`}>
                {meta.icon}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold">
                {t(CATEGORY_KEYS[category] as "guideMath")}
              </h2>
              <span className="text-sm text-muted-foreground ml-auto">
                {examples.length} {t("guideExamples")}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {examples.map((example) => (
                <Link
                  key={example}
                  href={`/${locale}/ai?q=${encodeURIComponent(example)}`}
                  className="group p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-sm text-muted-foreground hover:text-foreground"
                >
                  <span className="group-hover:underline">{example}</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <div className="text-center mt-16 mb-8 p-8 rounded-2xl bg-primary/5 border border-primary/10">
        <h2 className="text-2xl font-bold mb-3">{t("title")}</h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          {t("subtitle")}
        </p>
        <Link
          href={`/${locale}/ai`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          {t("guideCtaButton")}
        </Link>
      </div>
    </div>
  );
}
