"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Calculator, TrendingUp, Heart, Calendar,
  ArrowRightLeft, Percent, Brain, Menu, X,
  Globe, ChevronDown, Home, Sparkles, Flag,
  Sun, Moon,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface HeaderProps {
  locale: string;
}

const NAV_ITEMS = [
  { key: "home",       href: "/",                      icon: Home },
  { key: "math",       href: "/calculator/math",        icon: Calculator },
  { key: "finance",    href: "/calculator/finance",     icon: TrendingUp },
  { key: "health",     href: "/calculator/health",      icon: Heart },
  { key: "date",       href: "/calculator/date",        icon: Calendar },
  { key: "conversion", href: "/calculator/conversion",  icon: ArrowRightLeft },
  { key: "tax",        href: "/calculator/tax",         icon: Percent },
  { key: "living",     href: "/calculator/living",      icon: Sparkles },
  { key: "korea",      href: "/calculator/korea",       icon: Flag },
  { key: "ai",         href: "/ai",                     icon: Brain },
] as const;

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations("nav");
  const tLang = useTranslations("languages");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();

  const prefix = (path: string) => `/${locale}${path}`;
  const isActive = (href: string) =>
    href === "/" ? pathname === `/${locale}` || pathname === `/${locale}/` : pathname.startsWith(prefix(href));

  const pathWithoutLocale = pathname.slice(locale.length + 1) || "/";

  return (
    <>
      {/* ── Desktop: Left Sidebar ── */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-20 bg-card z-40 py-5 items-center gap-1 border-r border-border card-shadow">
        {/* Logo */}
        <Link
          href={prefix("/")}
          className="mb-5 flex items-center justify-center w-11 h-11 rounded-2xl shadow-sm overflow-hidden"
        >
          <Image src="/logo.svg" alt="EasyCalcFor.me" width={44} height={44} />
        </Link>

        {/* Nav items */}
        <nav className="flex flex-col gap-0.5 flex-1 w-full px-2">
          {NAV_ITEMS.map(({ key, href, icon: Icon }) => (
            <Link
              key={key}
              href={prefix(href)}
              title={t(key)}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 rounded-xl text-[10px] font-medium transition-all",
                isActive(href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="w-[18px] h-[18px]" />
              <span className="w-full text-center px-0.5 leading-tight break-words">{t(key)}</span>
            </Link>
          ))}
        </nav>

        {/* Dark mode toggle */}
        <div className="mt-auto w-full px-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex flex-col items-center gap-1 py-2.5 w-full rounded-xl text-[10px] font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-[18px] h-[18px]" />
            ) : (
              <Moon className="w-[18px] h-[18px]" />
            )}
            <span>{resolvedTheme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </div>

        {/* Language switcher */}
        <div className="relative w-full px-2">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex flex-col items-center gap-1 py-2.5 w-full rounded-xl text-[10px] font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
          >
            <Globe className="w-[18px] h-[18px]" />
            <span className="uppercase">{locale}</span>
          </button>
          {langOpen && (
            <div className="absolute bottom-full left-full mb-0 ml-2 w-44 bg-card border border-border rounded-2xl shadow-xl z-50 py-1.5 overflow-hidden card-shadow-lg">
              {routing.locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}${pathWithoutLocale}`}
                  onClick={() => setLangOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-2.5 text-sm hover:bg-accent transition-colors",
                    l === locale ? "text-primary font-semibold" : "text-foreground"
                  )}
                >
                  {tLang(l)}
                </Link>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* ── Mobile: Top Bar ── */}
      <header className="lg:hidden sticky top-0 z-40 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href={prefix("/")} className="flex items-center gap-2">
            <Image src="/logo.svg" alt="EasyCalcFor.me" width={32} height={32} className="rounded-lg" />
            <span className="text-sm font-bold text-foreground">EasyCalcFor.me</span>
          </Link>

          <div className="flex items-center gap-1">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:bg-accent transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase">{locale}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1.5 w-40 bg-card border border-border rounded-xl shadow-xl z-50 py-1.5 card-shadow-lg">
                  {routing.locales.map((l) => (
                    <Link
                      key={l}
                      href={`/${l}${pathWithoutLocale}`}
                      onClick={() => setLangOpen(false)}
                      className={cn(
                        "flex px-3 py-2.5 text-sm hover:bg-accent transition-colors",
                        l === locale ? "text-primary font-semibold" : "text-foreground"
                      )}
                    >
                      {tLang(l)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <nav className="border-t border-border bg-card px-3 py-2.5 grid grid-cols-4 gap-1">
            {NAV_ITEMS.map(({ key, href, icon: Icon }) => (
              <Link
                key={key}
                href={prefix(href)}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 rounded-xl text-[10px] font-medium transition-all",
                  isActive(href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{t(key)}</span>
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
