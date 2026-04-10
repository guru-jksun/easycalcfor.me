import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Calculator, TrendingUp, Heart, Calendar, ArrowRightLeft, Percent } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata(props: PageProps<"/[locale]/calculator">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "categories" });
  return {
    title: t("allMetaTitle"),
    description: t("allMetaDesc"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/calculator` },
  };
}

const CATEGORY_ICONS = [Calculator, TrendingUp, Heart, Calendar, ArrowRightLeft, Percent];
const CATEGORY_DEFS = [
  { nameKey: "math",       descKey: "mathDesc",       href: "math",       emoji: "🔢", count: "20" },
  { nameKey: "finance",    descKey: "financeDesc",    href: "finance",    emoji: "💰", count: "15" },
  { nameKey: "health",     descKey: "healthDesc",     href: "health",     emoji: "❤️", count: "10" },
  { nameKey: "date",       descKey: "dateDesc",       href: "date",       emoji: "📅", count: "8"  },
  { nameKey: "conversion", descKey: "conversionDesc", href: "conversion", emoji: "🔄", count: "12" },
  { nameKey: "tax",        descKey: "taxDesc",        href: "tax",        emoji: "%",  count: "10" },
] as const;

export default async function AllCalculatorsPage(props: PageProps<"/[locale]/calculator">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "categories" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const baseUrl = "https://easycalcfor.me";
  const prefix = (path: string) => `/${locale}/calculator/${path}`;

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: tNav("home"), url: `${baseUrl}/${locale}` },
        { name: t("allTitle"), url: `${baseUrl}/${locale}/calculator` },
      ]} />

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">{t("allTitle")}</h1>
          <p className="text-muted-foreground">{t("allSubtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORY_DEFS.map(({ nameKey, descKey, href, emoji, count }, i) => {
            const Icon = CATEGORY_ICONS[i];
            return (
              <Link key={href} href={prefix(href)}>
                <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer border hover:border-primary/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{emoji}</span>
                      <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                        {count}+ {t("countSuffix")}
                      </span>
                    </div>
                    <p className="font-semibold text-lg mb-1">{t(nameKey)}</p>
                    <p className="text-sm text-muted-foreground">{t(descKey)}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
