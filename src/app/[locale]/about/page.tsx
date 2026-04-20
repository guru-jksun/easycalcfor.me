import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Calculator, Brain, Globe, Smartphone, BarChart3, BookOpen, Languages, Clock } from "lucide-react";

export async function generateMetadata(props: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("aboutTitle"),
    description: t("aboutDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/about` },
  };
}

export default async function AboutPage(props: PageProps<"/[locale]/about">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "pages" });

  const features = [
    { icon: Calculator, titleKey: "aboutFeature1Title" as const, descKey: "aboutFeature1Desc" as const },
    { icon: Brain, titleKey: "aboutFeature2Title" as const, descKey: "aboutFeature2Desc" as const },
    { icon: Globe, titleKey: "aboutFeature3Title" as const, descKey: "aboutFeature3Desc" as const },
    { icon: Smartphone, titleKey: "aboutFeature4Title" as const, descKey: "aboutFeature4Desc" as const },
  ];

  const stats = [
    { icon: Calculator, key: "aboutStat1" as const, descKey: "aboutStat1Desc" as const },
    { icon: Languages, key: "aboutStat2" as const, descKey: "aboutStat2Desc" as const },
    { icon: BookOpen, key: "aboutStat3" as const, descKey: "aboutStat3Desc" as const },
    { icon: Clock, key: "aboutStat4" as const, descKey: "aboutStat4Desc" as const },
  ];

  return (
    <div className="container mx-auto px-4 max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-4">{t("aboutTitle")}</h1>
      <p className="text-muted-foreground mb-10 text-lg leading-relaxed">{t("aboutDesc")}</p>

      {/* Founder Story */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">{t("aboutFounder")}</h2>
        <p className="text-muted-foreground leading-relaxed">{t("aboutFounderDesc")}</p>
      </section>

      {/* Mission */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">{t("aboutMission")}</h2>
        <p className="text-muted-foreground leading-relaxed">{t("aboutMissionDesc")}</p>
      </section>

      {/* Stats */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-5">{t("aboutStats")}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {stats.map(({ icon: Icon, key, descKey }) => (
            <div key={key} className="rounded-xl border bg-card p-5 space-y-1 text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-lg font-bold">{t(key)}</p>
              <p className="text-sm text-muted-foreground">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-5">{t("aboutFeatures")}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map(({ icon: Icon, titleKey, descKey }) => (
            <div key={titleKey} className="rounded-xl border bg-card p-5 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">{t(titleKey)}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">{t("aboutTech")}</h2>
        <p className="text-muted-foreground leading-relaxed">{t("aboutTechDesc")}</p>
      </section>

      {/* Team */}
      <section>
        <h2 className="text-xl font-semibold mb-3">{t("aboutTeam")}</h2>
        <p className="text-muted-foreground leading-relaxed">{t("aboutTeamDesc")}</p>
      </section>
    </div>
  );
}
