import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: PageProps<"/[locale]/terms">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("termsTitle"),
    description: t("termsIntro"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/terms` },
  };
}

export default async function TermsPage(props: PageProps<"/[locale]/terms">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "pages" });

  return (
    <div className="container mx-auto px-4 max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-2">{t("termsTitle")}</h1>
      <p className="text-sm text-muted-foreground mb-8">{t("termsLastUpdated")}</p>

      <p className="text-muted-foreground mb-8 leading-relaxed">{t("termsIntro")}</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-3">{t("termsUseTitle")}</h2>
          <p className="text-muted-foreground">{t("termsUseDesc")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">{t("termsAccuracyTitle")}</h2>
          <p className="text-muted-foreground">{t("termsAccuracyDesc")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">{t("termsDisclaimerTitle")}</h2>
          <p className="text-muted-foreground">{t("termsDisclaimerDesc")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">{t("termsLiabilityTitle")}</h2>
          <p className="text-muted-foreground">{t("termsLiabilityDesc")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">{t("termsIpTitle")}</h2>
          <p className="text-muted-foreground">{t("termsIpDesc")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">{t("termsModifyTitle")}</h2>
          <p className="text-muted-foreground">{t("termsModifyDesc")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">{t("termsContactTitle")}</h2>
          <p className="text-muted-foreground">
            {t("termsContactDesc")}{" "}
            <a href="mailto:help@easycalcfor.me" className="text-primary hover:underline">
              help@easycalcfor.me
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
