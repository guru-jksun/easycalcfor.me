import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PasswordStrengthClient from "@/components/calculators/PasswordStrengthClient";
import { CalculatorJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import AdBanner from "@/components/ads/AdBanner";
import AiPromptExamples from "@/components/calculators/AiPromptExamples";
import { AI_PROMPTS } from "@/data/ai-prompts";

export async function generateMetadata(props: PageProps<"/[locale]/calculator/math/password-strength">): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: "Password Strength Checker — Test How Strong Your Password Is",
    description: "Free online password strength checker. Analyze your password in real time — check length, complexity, estimated crack time, and get improvement suggestions. Nothing is sent to the server.",
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator/math/password-strength` },
  };
}

export default async function PasswordStrengthPage(props: PageProps<"/[locale]/calculator/math/password-strength">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "calculators" });
  const baseUrl = "https://easycalcfor.me";

  const faqItems = [
    {
      question: t("pwFaq1Q"),
      answer: t("pwFaq1A"),
    },
    {
      question: t("pwFaq2Q"),
      answer: t("pwFaq2A"),
    },
  ];

  return (
    <>
      <CalculatorJsonLd
        name="Password Strength Checker"
        description="Free online password strength checker. Analyze your password in real time with crack time estimation. All processing happens in your browser."
        url={`${baseUrl}/${locale}/calculator/math/password-strength`}
        locale={locale}
        faqItems={faqItems}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Math", url: `${baseUrl}/${locale}/calculator/math` },
          { name: "Password Strength Checker", url: `${baseUrl}/${locale}/calculator/math/password-strength` },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("passwordStrengthChecker")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("passwordStrengthCheckerDesc")}
            </p>
            <PasswordStrengthClient />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 bg-card">
              <h2 className="font-semibold text-lg mb-3">{t("howToUse")}</h2>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>{t("pwStep1")}</li>
                <li>{t("pwStep2")}</li>
                <li>{t("pwStep3")}</li>
              </ol>
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
            

            <AiPromptExamples locale={locale} prompts={AI_PROMPTS["math/password-strength"]} />
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
