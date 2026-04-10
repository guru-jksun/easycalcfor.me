import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("privacyTitle"),
    description: t("privacyIntro"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/privacy` },
  };
}

export default async function PrivacyPage(props: PageProps<"/[locale]/privacy">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "pages" });

  return (
    <div className="container mx-auto px-4 max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-2">{t("privacyTitle")}</h1>
      <p className="text-sm text-muted-foreground mb-8">{t("privacyLastUpdated")}</p>

      <p className="text-muted-foreground mb-8 leading-relaxed">{t("privacyIntro")}</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-3">{t("privacyCollectTitle")}</h2>
          <p className="text-muted-foreground mb-3">{t("privacyCollectDesc")}</p>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
            <li>{t("privacyCollect1")}</li>
            <li>{t("privacyCollect2")}</li>
            <li>{t("privacyCollect3")}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">{t("privacyCookiesTitle")}</h2>
          <p className="text-muted-foreground">{t("privacyCookiesDesc")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">{t("privacyAdsTitle")}</h2>
          <p className="text-muted-foreground">{t("privacyAdsDesc")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">{t("privacyDataTitle")}</h2>
          <p className="text-muted-foreground">{t("privacyDataDesc")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">{t("privacyThirdPartyTitle")}</h2>
          <p className="text-muted-foreground">{t("privacyThirdPartyDesc")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">{t("privacyChangesTitle")}</h2>
          <p className="text-muted-foreground">{t("privacyChangesDesc")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">{t("privacyContactTitle")}</h2>
          <p className="text-muted-foreground">
            {t("privacyContactDesc")}{" "}
            <a href="mailto:help@easycalcfor.me" className="text-primary hover:underline">
              help@easycalcfor.me
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
