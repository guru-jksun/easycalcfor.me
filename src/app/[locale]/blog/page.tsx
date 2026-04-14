import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";

export async function generateMetadata(props: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("blogTitle"),
    description: t("blogSubtitle"),
    alternates: { canonical: `https://easycalcfor.me/${locale}/blog` },
  };
}

const CATEGORY_KEYS = ["all", "finance", "health", "living", "korea"] as const;

const CATEGORY_COLORS: Record<string, string> = {
  finance: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  health: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  living: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  korea: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
};

export default async function BlogPage(props: PageProps<"/[locale]/blog">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const prefix = (p: string) => `/${locale}${p}`;

  const categoryLabelMap: Record<string, string> = {
    all: t("blogAll"),
    finance: t("blogFinance"),
    health: t("blogHealth"),
    living: t("blogLiving"),
    korea: t("blogKorea"),
    india: t("blogIndia"),
    math: t("blogMath"),
    date: t("blogDate"),
    tax: t("blogTax"),
  };

  return (
    <div className="container mx-auto px-4 max-w-5xl py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-foreground">
          {t("blogTitle")}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t("blogSubtitle")}
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORY_KEYS.map((cat) => (
          <Link
            key={cat}
            href={cat === "all" ? prefix("/blog") : prefix(`/blog?category=${cat}`)}
            className="inline-flex items-center px-4 py-2 rounded-full border border-border bg-card text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
          >
            {categoryLabelMap[cat]}
          </Link>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={prefix(`/blog/${post.slug}`)}>
            <article className="bg-card rounded-2xl p-6 border border-border card-shadow card-hover cursor-pointer h-full flex flex-col">
              {/* Category Tag */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[post.category] || ""}`}>
                  <Tag className="w-3 h-3" />
                  {categoryLabelMap[post.category]}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-foreground mb-2 leading-snug">
                {post.title[locale] || post.title.en}
              </h2>

              {/* Summary */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {post.summary[locale] || post.summary.en}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingTime} {t("blogMinRead")}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-primary font-medium">
                  {t("blogReadMore")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
