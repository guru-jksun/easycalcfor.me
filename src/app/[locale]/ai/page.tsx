import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import AiCalculatorClient from "@/components/calculators/AiCalculatorClient";

export async function generateMetadata(props: PageProps<"/[locale]/ai">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "ai" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/ai` },
  };
}

export default async function AiCalculatorPage(props: PageProps<"/[locale]/ai">) {
  const { locale } = await props.params;
  const searchParams = await props.searchParams;
  const initialQuery = typeof searchParams?.q === "string" ? searchParams.q : undefined;
  const t = await getTranslations({ locale, namespace: "ai" });

  const examples = [
    t("example1"), t("example2"), t("example3"),
    t("example4"), t("example5"), t("example6"),
  ];

  return (
    <div className="container mx-auto px-4 max-w-3xl py-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {t("powered")}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{t("title")}</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">{t("subtitle")}</p>
      </div>

      <AiCalculatorClient locale={locale} initialQuery={initialQuery} />

      <div className="mt-12">
        <h2 className="text-lg font-semibold mb-4 text-center">{t("examples")}</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {examples.map((example) => (
            <a
              key={example}
              href={`/${locale}/ai?q=${encodeURIComponent(example)}`}
              className="text-left p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm text-muted-foreground hover:text-foreground"
            >
              {example}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href={`/${locale}/ai/guide`}
          className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
        >
          {t("guideTitle")} &rarr;
        </Link>
      </div>
    </div>
  );
}
