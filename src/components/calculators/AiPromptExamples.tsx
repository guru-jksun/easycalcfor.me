import Link from "next/link";
import { useTranslations } from "next-intl";

interface AiPromptExamplesProps {
  locale: string;
  prompts: string[];
}

export default function AiPromptExamples({ locale, prompts }: AiPromptExamplesProps) {
  const t = useTranslations("ai");
  return (
    <div className="rounded-xl border p-6 bg-card">
      <h2 className="font-semibold text-lg mb-3">🤖 {t("tryWithAi")}</h2>
      <p className="text-sm text-muted-foreground mb-3">{t("tryWithAiDesc")}</p>
      <div className="space-y-2">
        {prompts.map((prompt) => (
          <Link
            key={prompt}
            href={`/${locale}/ai?q=${encodeURIComponent(prompt)}`}
            className="block text-sm p-2.5 rounded-lg border hover:border-primary/50 hover:bg-primary/5 transition-colors text-muted-foreground hover:text-foreground"
          >
            &ldquo;{prompt}&rdquo;
          </Link>
        ))}
      </div>
    </div>
  );
}
