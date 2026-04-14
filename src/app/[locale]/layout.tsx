import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HtmlLang from "@/components/layout/HtmlLang";

export async function generateMetadata(props: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "site" });

  const baseUrl = "https://easycalcfor.me";
  const canonicalUrl = locale === "en" ? baseUrl : `${baseUrl}/${locale}`;

  return {
    title: {
      default: `${t("name")} - ${t("tagline")}`,
      template: `%s | ${t("name")}`,
    },
    description: t("description"),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, l === "en" ? baseUrl : `${baseUrl}/${l}`])
        ),
        "hi-IN": `${baseUrl}/hi`,
        "ko-KR": `${baseUrl}/ko`,
        "ja-JP": `${baseUrl}/ja`,
        "zh-CN": `${baseUrl}/zh`,
        "pt-BR": `${baseUrl}/pt`,
        "de-DE": `${baseUrl}/de`,
        "fr-FR": `${baseUrl}/fr`,
        "es-ES": `${baseUrl}/es`,
        "ar-SA": `${baseUrl}/ar`,
        "x-default": baseUrl,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: t("name"),
      title: `${t("name")} - ${t("tagline")}`,
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("name")} - ${t("tagline")}`,
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    },
    verification: {
      google: "RGp1cv60KaWsfcv3",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {/* Sets lang/dir on <html> tag client-side for proper i18n */}
      <HtmlLang locale={locale} />
      <Header locale={locale} />
      {/* lg: offset for fixed sidebar (w-20) */}
      <div className="flex flex-col flex-1 lg:pl-20">
        <main className="flex-1">{props.children}</main>
        <Footer locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
