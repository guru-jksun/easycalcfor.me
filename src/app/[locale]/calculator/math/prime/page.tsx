import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PrimeCheckerClient from "@/components/calculators/PrimeCheckerClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/math/prime">): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: "Prime Number Checker — Is It Prime? Factors & Factorization",
    description: "Free online prime number checker. Instantly check if any number is prime, see all factors, prime factorization, nearest primes, and list the first N prime numbers.",
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/math/prime` },
  };
}

export default async function PrimePage(props: PageProps<"/[locale]/calculator/math/prime">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  const faqItems = [
    {
      question: t("primeFaq1Q"),
      answer: t("primeFaq1A"),
    },
    {
      question: t("primeFaq2Q"),
      answer: t("primeFaq2A"),
    },
  ];

  return (
    <>
      <CalculatorJsonLd
        name="Prime Number Checker"
        description="Free online prime number checker. Check if a number is prime, get all factors, prime factorization, nearest primes, and list the first N primes."
        url={`${baseUrl}/${locale}/calculator/math/prime`}
        locale={locale}
        faqItems={faqItems}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Math", url: `${baseUrl}/${locale}/calculator/math` },
          { name: "Prime Number Checker", url: `${baseUrl}/${locale}/calculator/math/prime` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("primeChecker")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("primeCheckerDesc")}
            </p>
            <PrimeCheckerClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("primeHowTitle")}</h2>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>{t("primeStep1")}</li>
                <li>{t("primeStep2")}</li>
                <li>{t("primeStep3")}</li>
                <li>{t("primeStep4")}</li>
                <li>{t("primeStep5")}</li>
              </ol>
              <p className="text-xs text-muted-foreground mt-3">
                {t("primeAlgoNote")}
              </p>
            </div>

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("primeFirst20Title")}</h2>
              <div className="flex flex-wrap gap-1">
                {[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71].map((p) => (
                  <span key={p} className="px-2 py-1 rounded bg-primary/10 text-primary text-sm font-mono font-medium">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />

            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-4">{t("faq")}</h2>
              <div className="space-y-4">
                {faqItems.map(({ question, answer }) => (
                  <div key={question}>
                    <h3 className="font-medium text-sm mb-1">{question}</h3>
                    <p className="text-sm text-muted-foreground">{answer}</p>
                  </div>
                ))}
              </div>
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["math/prime"]} />
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
