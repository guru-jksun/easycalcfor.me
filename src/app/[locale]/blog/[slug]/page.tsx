import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, Calculator } from "lucide-react";
import { blogPosts, getBlogPost, getAdjacentPosts } from "@/data/blog-posts";
import { CalculatorJsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const title = post.title[locale] || post.title.en;
  const description = post.summary[locale] || post.summary.en;

  return {
    title,
    description,
    alternates: { canonical: `https://easycalcfor.me/${locale}/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  finance: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  health: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  living: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  korea: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
};

function renderMarkdown(content: string) {
  // Simple markdown-to-HTML conversion for blog content
  let html = content
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-8 mb-3 text-foreground">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-10 mb-4 text-foreground">$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    // Italic
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    // Math formulas ($$..$$)
    .replace(/\$\$(.+?)\$\$/g, '<code class="block bg-muted px-4 py-3 rounded-xl text-sm my-4 overflow-x-auto">$1</code>')
    // Tables
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split("|").filter((c) => c.trim());
      const isHeader = cells.some((c) => /^[\s-:]+$/.test(c));
      if (isHeader) return "<!--table-separator-->";
      const cellHtml = cells
        .map((c) => `<td class="px-3 py-2 border-b border-border text-sm">${c.trim()}</td>`)
        .join("");
      return `<tr class="hover:bg-muted/30">${cellHtml}</tr>`;
    })
    // Wrap consecutive table rows
    .replace(
      /((?:<tr[^>]*>.*<\/tr>\n?)+)/g,
      '<div class="overflow-x-auto my-4"><table class="w-full border-collapse border border-border rounded-xl overflow-hidden"><tbody>$1</tbody></table></div>'
    )
    // Clean up table separators
    .replace(/<!--table-separator-->\n?/g, "")
    // Make first row of each table a header
    .replace(
      /(<tbody>)\s*<tr[^>]*>(.*?)<\/tr>/g,
      (_, tbody, cells) => {
        const headerCells = cells.replace(/<td/g, "<th").replace(/<\/td>/g, "</th>");
        return `${tbody}<tr class="bg-muted/50 font-semibold">${headerCells}</tr>`;
      }
    )
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-sm text-muted-foreground leading-relaxed">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-sm text-muted-foreground leading-relaxed list-decimal">$1</li>')
    // Paragraphs (lines that don't start with HTML tags)
    .replace(/^(?!<[a-z]|$|\s*$)(.+)$/gm, '<p class="text-sm text-muted-foreground leading-relaxed mb-3">$1</p>')
    // Remove empty paragraphs
    .replace(/<p[^>]*>\s*<\/p>/g, "");

  return html;
}

export default async function BlogPostPage(props: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await props.params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });
  const prefix = (p: string) => `/${locale}${p}`;

  const { prev, next } = getAdjacentPosts(slug);

  const categoryLabelMap: Record<string, string> = {
    finance: t("blogFinance"),
    health: t("blogHealth"),
    living: t("blogLiving"),
    korea: t("blogKorea"),
  };

  const title = post.title[locale] || post.title.en;
  const content = post.content[locale] || post.content.en;
  const baseUrl = "https://easycalcfor.me";

  return (
    <>
      <CalculatorJsonLd
        name={title}
        description={post.summary[locale] || post.summary.en}
        url={`${baseUrl}/${locale}/blog/${slug}`}
        locale={locale}
      />

      <div className="container mx-auto px-4 max-w-3xl py-12">
        {/* Back link */}
        <Link
          href={prefix("/blog")}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("blogTitle")}
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[post.category] || ""}`}>
              <Tag className="w-3 h-3" />
              {categoryLabelMap[post.category]}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 text-foreground leading-tight">
            {title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readingTime} {t("blogMinRead")}
            </span>
          </div>
        </header>

        {/* Article Body */}
        <article
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />

        {/* Related Calculator Card */}
        <div className="mt-10 p-5 bg-primary/5 border border-primary/20 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-bold text-foreground">{t("blogRelatedCalculator")}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {post.summary[locale] || post.summary.en}
          </p>
          <Link
            href={prefix(post.calculatorLink)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            {t("blogRelatedCalculator")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Previous / Next Navigation */}
        <nav className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={prefix(`/blog/${prev.slug}`)}
              className="bg-card rounded-2xl p-5 border border-border card-shadow card-hover flex flex-col"
            >
              <span className="text-xs text-muted-foreground mb-1">{t("blogPrevious")}</span>
              <span className="text-sm font-semibold text-foreground leading-snug flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                {prev.title[locale] || prev.title.en}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={prefix(`/blog/${next.slug}`)}
              className="bg-card rounded-2xl p-5 border border-border card-shadow card-hover flex flex-col sm:text-right"
            >
              <span className="text-xs text-muted-foreground mb-1">{t("blogNext")}</span>
              <span className="text-sm font-semibold text-foreground leading-snug flex items-center gap-1.5 sm:justify-end">
                {next.title[locale] || next.title.en}
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </>
  );
}
