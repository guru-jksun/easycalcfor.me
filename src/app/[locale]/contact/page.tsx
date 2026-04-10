import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Mail, MessageSquare, Bug } from "lucide-react";

export async function generateMetadata(props: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("contactTitle"),
    description: t("contactDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/contact` },
  };
}

export default async function ContactPage(props: PageProps<"/[locale]/contact">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "pages" });

  return (
    <div className="container mx-auto px-4 max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-4">{t("contactTitle")}</h1>
      <p className="text-muted-foreground mb-10 text-lg">{t("contactDesc")}</p>

      {/* Email Card */}
      <section className="rounded-xl border bg-card p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">{t("contactEmailLabel")}</h2>
            <p className="text-sm text-muted-foreground">{t("contactEmailDesc")}</p>
          </div>
        </div>

        <a
          href="mailto:help@easycalcfor.me"
          className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Mail className="w-4 h-4" />
          help@easycalcfor.me
        </a>

        <p className="text-xs text-muted-foreground mt-4">{t("contactResponseTime")}</p>
      </section>

      {/* Feedback & Bug Report */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-card p-5 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="font-semibold text-sm">{t("contactFeedback")}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{t("contactFeedbackDesc")}</p>
        </div>

        <div className="rounded-xl border bg-card p-5 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Bug className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="font-semibold text-sm">{t("contactBug")}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{t("contactBugDesc")}</p>
        </div>
      </div>
    </div>
  );
}
