import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator, TrendingUp, Heart, Calendar,
  ArrowRightLeft, Percent, ArrowRight,
  Zap, Globe, Brain, ShieldCheck, Star,
  Sparkles, Flag,
} from "lucide-react";
import { getExamplesForLocale } from "@/data/ai-guide-examples";
import { WebsiteJsonLd } from "@/components/seo/JsonLd";
import AiSearchBar from "@/components/calculators/AiSearchBar";
import ScientificCalculatorClient from "@/components/calculators/ScientificCalculatorClient";
import AdBanner from "@/components/ads/AdBanner";
import { blogPosts } from "@/data/blog-posts";

export async function generateMetadata(props: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    title: `${t("name")} - ${t("tagline")}`,
    description: t("description"),
  };
}

const CATEGORIES = [
  { key: "math",       icon: Calculator,     href: "/calculator/math",       color: "text-blue-600",    bg: "bg-blue-50 dark:bg-blue-950/40",       border: "border-blue-100 dark:border-blue-900" },
  { key: "finance",    icon: TrendingUp,     href: "/calculator/finance",    color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/40", border: "border-emerald-100 dark:border-emerald-900" },
  { key: "health",     icon: Heart,          href: "/calculator/health",     color: "text-rose-500",    bg: "bg-rose-50 dark:bg-rose-950/40",       border: "border-rose-100 dark:border-rose-900" },
  { key: "date",       icon: Calendar,       href: "/calculator/date",       color: "text-violet-600",  bg: "bg-violet-50 dark:bg-violet-950/40",   border: "border-violet-100 dark:border-violet-900" },
  { key: "conversion", icon: ArrowRightLeft, href: "/calculator/conversion", color: "text-orange-500",  bg: "bg-orange-50 dark:bg-orange-950/40",   border: "border-orange-100 dark:border-orange-900" },
  { key: "tax",        icon: Percent,        href: "/calculator/tax",        color: "text-teal-600",    bg: "bg-teal-50 dark:bg-teal-950/40",       border: "border-teal-100 dark:border-teal-900" },
  { key: "living",    icon: Sparkles,       href: "/calculator/living",     color: "text-amber-500",   bg: "bg-amber-50 dark:bg-amber-950/40",     border: "border-amber-100 dark:border-amber-900" },
  { key: "korea",     icon: Flag,           href: "/calculator/korea",      color: "text-sky-600",     bg: "bg-sky-50 dark:bg-sky-950/40",         border: "border-sky-100 dark:border-sky-900" },
  { key: "india",    icon: Flag,           href: "/calculator/india",      color: "text-orange-600",  bg: "bg-orange-50 dark:bg-orange-950/40",   border: "border-orange-100 dark:border-orange-900" },
] as const;

const POPULAR = [
  { nameKey: "loanCalculator",             href: "/calculator/finance/loan",             emoji: "🏦" },  // #1 loan calculator
  { nameKey: "mortgageCalculator",         href: "/calculator/finance/mortgage",         emoji: "🏠" },  // #3 mortgage calculator
  { nameKey: "ageCalculator",              href: "/calculator/date/age",                 emoji: "🎂" },  // #4 age calculator
  { nameKey: "bmiCalculator",              href: "/calculator/health/bmi",               emoji: "⚖️" },  // #5 bmi
  { nameKey: "scientificCalculator",       href: "/calculator/math/scientific",          emoji: "🔬" },  // #13 scientific calculator
  { nameKey: "emiCalculator",              href: "/calculator/india/emi",                emoji: "💳" },  // #14 emi calculator
  { nameKey: "percentageCalculator",       href: "/calculator/math/percentage",          emoji: "%" },   // #24 percentage calculator
  { nameKey: "graphCalculator",            href: "/calculator/math/graphing",            emoji: "📈" },  // #28 graphing calculator
  { nameKey: "goldCalculator",             href: "/calculator/finance/gold",             emoji: "🥇" },  // #22 gold calculator
  { nameKey: "gradeCalculator",            href: "/calculator/math/grade",               emoji: "📝" },  // #23 grade calculator
  { nameKey: "compoundInterestCalculator", href: "/calculator/finance/compound-interest", emoji: "💹" },  // #43 compound interest
  { nameKey: "calorieCalculator",          href: "/calculator/health/calorie",           emoji: "🔥" },  // #37 calories calculator
] as const;

const WHY_ICONS = [ShieldCheck, Zap, Globe, Brain] as const;
const WHY_KEYS = [
  { titleKey: "whyFreeTitle",      descKey: "whyFreeDesc" },
  { titleKey: "whyFastTitle",      descKey: "whyFastDesc" },
  { titleKey: "whyLanguagesTitle", descKey: "whyLanguagesDesc" },
  { titleKey: "whyAiTitle",        descKey: "whyAiDesc" },
] as const;

const FAQ_KEYS = [
  { q: "faq1Q", a: "faq1A" },
  { q: "faq2Q", a: "faq2A" },
  { q: "faq3Q", a: "faq3A" },
  { q: "faq4Q", a: "faq4A" },
] as const;

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  const t    = await getTranslations({ locale, namespace: "home" });
  const tCat = await getTranslations({ locale, namespace: "categories" });
  const tC   = await getTranslations({ locale, namespace: "calculators" });
  const tBlog = await getTranslations({ locale, namespace: "blog" });
  const prefix = (p: string) => `/${locale}${p}`;

  return (
    <>
      <WebsiteJsonLd locale={locale} />

      {/* ── Hero ── */}
      <section className="py-14 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-6">
            <Star className="w-3 h-3 fill-primary" />
            {t("trustBadge")}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-[1.1] text-foreground">
            {t("heroTitle")}{" "}
            <span className="text-primary">{t("heroTitleHighlight")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("heroSubtitle")}
          </p>
          <AiSearchBar
            locale={locale}
            placeholder={t("searchPlaceholder")}
            buttonText={t("searchButton")}
            examples={[
              t("heroExample1"), t("heroExample2"), t("heroExample3"),
              t("heroExample4"), t("heroExample5"), t("heroExample6"),
            ]}
          />
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="px-4 -mt-10 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-2xl px-6 py-5 grid grid-cols-4 divide-x divide-border card-shadow">
            {([
              { value: "50+",  labelKey: "statCalculators" },
              { value: "9",    labelKey: "statLanguages" },
              { value: "100%", labelKey: "statFree" },
              { value: "AI",   labelKey: "statAi" },
            ] as const).map(({ value, labelKey }) => (
              <div key={labelKey} className="text-center px-4">
                <p className="text-2xl font-black text-primary leading-none mb-1">{value}</p>
                <p className="text-[11px] text-muted-foreground font-medium">{t(labelKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI 100 Examples (inline) ── */}
      <section className="px-4 pb-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 text-center">{t("aiExamplesTitle")}</h2>
          <p className="text-muted-foreground text-center mb-10 text-base">{t("heroAiHint")}</p>
          {(() => {
            const examples = getExamplesForLocale(locale);
            const CATS: { key: string; icon: string; colorClass: string }[] = [
              { key: "math", icon: "🧮", colorClass: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
              { key: "finance", icon: "💰", colorClass: "bg-green-500/10 text-green-600 border-green-500/20" },
              { key: "health", icon: "❤️", colorClass: "bg-red-500/10 text-red-600 border-red-500/20" },
              { key: "date", icon: "📅", colorClass: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
              { key: "conversion", icon: "🔄", colorClass: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
              { key: "tax", icon: "💵", colorClass: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
              { key: "daily", icon: "🏠", colorClass: "bg-teal-500/10 text-teal-600 border-teal-500/20" },
            ];
            const catLabels: Record<string, string> = {
              math: tCat("math"), finance: tCat("finance"), health: tCat("health"),
              date: tCat("date"), conversion: tCat("conversion"), tax: tCat("tax"), daily: t("aiDailyLife"),
            };
            return (
              <div className="space-y-8">
                {CATS.map(({ key, icon, colorClass }) => {
                  const items = examples[key] || [];
                  if (items.length === 0) return null;
                  return (
                    <div key={key}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm border ${colorClass}`}>{icon}</span>
                        <h3 className="font-bold text-lg text-foreground">{catLabels[key]}</h3>
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {items.map((ex) => (
                          <Link key={ex} href={prefix(`/ai?q=${encodeURIComponent(ex)}`)}>
                            <div className="text-sm p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors text-muted-foreground hover:text-foreground cursor-pointer">
                              {ex}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── Scientific Calculator (hidden for now) ──
      <section className="px-4 pb-10 -mt-8">
        <div className="max-w-3xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="flex justify-center lg:justify-end">
              <ScientificCalculatorClient />
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border p-5 bg-card">
                <h3 className="font-semibold text-sm mb-3">{tC("sciRefTitle")}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {([
                    { btn: "sin / cos / tan", descKey: "sciDescTrig" as const },
                    { btn: "log", descKey: "sciDescLog10" as const },
                    { btn: "ln", descKey: "sciDescLn" as const },
                    { btn: "√", descKey: "sciDescSqrt" as const },
                    { btn: "x²", descKey: "sciDescSquare" as const },
                    { btn: "xⁿ", descKey: "sciDescPower" as const },
                    { btn: "π", descKey: "sciDescPi" as const },
                    { btn: "e", descKey: "sciDescE" as const },
                  ]).map(({ btn, descKey }) => (
                    <div key={btn} className="flex items-start gap-2">
                      <code className="bg-muted rounded px-1.5 py-0.5 text-xs font-mono shrink-0">{btn}</code>
                      <span className="text-muted-foreground text-xs">{tC(descKey)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border p-5 bg-card">
                <h3 className="font-semibold text-sm mb-3">{tC("howToUse")}</h3>
                <ol className="space-y-1.5 text-xs text-muted-foreground list-decimal list-inside">
                  <li>{tC("sciStep1")}</li>
                  <li>{tC("sciStep2")}</li>
                  <li>{tC("sciStep3")}</li>
                  <li>{tC("sciStep4")}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* ── AI Feature ── */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-primary rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 sm:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-semibold mb-5 w-fit border border-white/20">
                  <Brain className="w-3 h-3" />
                  AI-Powered
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white leading-tight">{t("aiTitle")}</h2>
                <p className="text-white/75 mb-7 leading-relaxed">{t("aiSubtitle")}</p>
                <ul className="space-y-3 mb-8">
                  {[t("aiFeature1"), t("aiFeature2"), t("aiFeature3")].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/90">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={prefix("/ai")}
                  className="inline-flex items-center gap-2 w-fit bg-white text-primary px-6 py-3 rounded-xl text-sm font-bold hover:bg-white/95 transition-colors shadow-sm"
                >
                  {t("tryAi")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-white/10 p-8 sm:p-12 flex items-center justify-center">
                <div className="w-full max-w-xs bg-card rounded-2xl border border-white/20 overflow-hidden card-shadow-lg">
                  <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                      <Brain className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-semibold text-sm text-foreground">{t("aiDemoTitle")}</span>
                    <span className="ml-auto text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-semibold border border-emerald-100">● {t("aiDemoOnline")}</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="bg-muted rounded-xl px-3.5 py-2.5 text-xs max-w-[85%] text-foreground">
                      $10,000 at 7% for 15 years?
                    </div>
                    <div className="bg-primary/10 rounded-xl px-3.5 py-2.5 text-xs ml-auto max-w-[85%]">
                      <p className="font-bold text-primary text-sm">$27,590.32</p>
                      <p className="text-muted-foreground mt-0.5 font-mono text-[10px]">A = P(1 + r/n)^(nt)</p>
                      <p className="mt-1 text-foreground">+$17,590 (175% growth) 🚀</p>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2 border border-border">
                      <input className="flex-1 bg-transparent text-xs outline-none text-muted-foreground" placeholder={t("aiDemoPlaceholder")} readOnly />
                      <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center shrink-0">
                        <ArrowRight className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">{t("categoriesTitle")}</h2>
            <Link href={prefix("/calculator")} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              {t("viewAll")} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.map(({ key, icon: Icon, href, color, bg, border }) => (
              <Link key={key} href={prefix(href)}>
                <div className={`bg-card rounded-2xl p-4 flex flex-col items-center text-center border ${border} card-shadow card-hover cursor-pointer h-[110px]`}>
                  <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mt-2`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div className="flex-1 flex items-end pb-1">
                    <p className="font-semibold text-[10px] leading-tight text-foreground truncate w-full px-1">{tCat(key)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular ── */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t("popularTitle")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {POPULAR.map(({ nameKey, href, emoji }) => (
              <Link key={nameKey} href={prefix(href)}>
                <div className="bg-card rounded-2xl p-4 flex items-center gap-3 border border-border card-shadow card-hover cursor-pointer">
                  <span className="text-2xl shrink-0">{emoji}</span>
                  <span className="text-sm font-medium leading-tight text-foreground">{tC(nameKey)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ad: Between Popular & Why ── */}
      <section className="px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <AdBanner slot="home-mid" format="horizontal" />
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t("whyTitle")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {WHY_KEYS.map(({ titleKey, descKey }, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <div key={titleKey} className="bg-card rounded-2xl p-5 border border-border card-shadow">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3.5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm mb-1.5 text-foreground">{t(titleKey)}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t(descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">{tBlog("blogTitle")}</h2>
            <Link href={prefix("/blog")} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              {t("viewAll")} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogPosts.slice(0, 3).map((post) => (
              <Link key={post.slug} href={prefix(`/blog/${post.slug}`)}>
                <div className="bg-card rounded-2xl p-5 border border-border card-shadow card-hover cursor-pointer h-full">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-3">
                    {tBlog(`blog${post.category.charAt(0).toUpperCase() + post.category.slice(1)}` as any)}
                  </span>
                  <h3 className="font-semibold text-sm mb-2 text-foreground leading-snug">
                    {post.title[locale] || post.title.en}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {post.summary[locale] || post.summary.en}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-3">
                    {post.date} · {post.readingTime}{tBlog("blogMinRead")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ (AEO) ── */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t("faqTitle")}</h2>
          <div className="space-y-3">
            {FAQ_KEYS.map(({ q, a }) => (
              <div key={q} className="bg-card rounded-2xl p-5 border border-border card-shadow">
                <h3 className="font-semibold text-sm mb-1.5 text-foreground">{t(q)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(a)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ad: Bottom ── */}
      <section className="px-4 pb-10">
        <div className="max-w-5xl mx-auto">
          <AdBanner slot="home-bottom" format="horizontal" />
        </div>
      </section>
    </>
  );
}
