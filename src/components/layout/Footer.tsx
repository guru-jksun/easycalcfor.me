import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";


interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t    = useTranslations("footer");
  const tC   = useTranslations("calculators");
  const tNav = useTranslations("nav");
  const tBlog = useTranslations("blog");
  const prefix = (path: string) => `/${locale}${path}`;

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={prefix("/")} className="flex items-center gap-2 font-bold text-lg text-foreground mb-3">
              <Image src="/logo.svg" alt="EasyCalcFor.me" width={28} height={28} className="rounded-lg" />
              EasyCalcFor.me
            </Link>
            <p className="text-sm text-muted-foreground">{t("description")}</p>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="font-semibold text-sm mb-3">{t("calculators")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href={prefix("/calculator/math/basic")} className="hover:text-primary transition-colors">{tC("basicCalculator")}</Link></li>
              <li><Link href={prefix("/calculator/finance/compound-interest")} className="hover:text-primary transition-colors">{tC("compoundInterestCalculator")}</Link></li>
              <li><Link href={prefix("/calculator/health/bmi")} className="hover:text-primary transition-colors">{tC("bmiCalculator")}</Link></li>
              <li><Link href={prefix("/calculator/date/age")} className="hover:text-primary transition-colors">{tC("ageCalculator")}</Link></li>
              <li><Link href={prefix("/calculator/math/percentage")} className="hover:text-primary transition-colors">{tC("percentageCalculator")}</Link></li>
              <li><Link href={prefix("/calculator/finance/loan")} className="hover:text-primary transition-colors">{tC("loanCalculator")}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm mb-3">{t("company")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href={prefix("/about")} className="hover:text-primary transition-colors">{t("about")}</Link></li>
              <li><Link href={prefix("/contact")} className="hover:text-primary transition-colors">{t("contact")}</Link></li>
              <li><Link href={prefix("/privacy")} className="hover:text-primary transition-colors">{t("privacy")}</Link></li>
              <li><Link href={prefix("/terms")} className="hover:text-primary transition-colors">{t("terms")}</Link></li>
            </ul>
          </div>

          {/* AI */}
          <div>
            <h3 className="font-semibold text-sm mb-3">{tNav("ai")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href={prefix("/ai")} className="hover:text-primary transition-colors">{tNav("ai")}</Link></li>
              <li><Link href={prefix("/calculator")} className="hover:text-primary transition-colors">{tNav("allCalculators")}</Link></li>
              <li><Link href={prefix("/blog")} className="hover:text-primary transition-colors">{tBlog("blogTitle")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EasyCalcFor.me. {t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
