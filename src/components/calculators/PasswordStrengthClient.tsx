"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CheckItem {
  key: string;
  label: string;
  passed: boolean;
}

type StrengthLevel = 0 | 1 | 2 | 3 | 4 | 5;

const STRENGTH_COLORS: Record<StrengthLevel, string> = {
  0: "bg-gray-300 dark:bg-gray-600",
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-yellow-500",
  4: "bg-green-500",
  5: "bg-emerald-600",
};

function calcCrackTime(password: string): string {
  if (password.length === 0) return "-";

  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 33;

  if (poolSize === 0) return "-";

  // combinations = poolSize ^ length
  // attempts per second = 1 billion (10^9)
  // time in seconds = combinations / attemptsPerSec
  const exponent = password.length * Math.log10(poolSize) - 9; // log10(combinations / 10^9)

  if (exponent < 0) return "< 1 sec";
  if (exponent < Math.log10(60)) return `${Math.ceil(10 ** exponent)} sec`;
  if (exponent < Math.log10(3600)) return `${Math.ceil(10 ** exponent / 60)} min`;
  if (exponent < Math.log10(86400)) return `${Math.ceil(10 ** exponent / 3600)} hours`;
  if (exponent < Math.log10(86400 * 365)) return `${Math.ceil(10 ** exponent / 86400)} days`;
  if (exponent < Math.log10(86400 * 365 * 1000)) return `${Math.ceil(10 ** exponent / (86400 * 365))} years`;
  if (exponent < Math.log10(86400 * 365 * 1e6)) return `${Math.ceil(10 ** exponent / (86400 * 365 * 1000))}K years`;
  if (exponent < Math.log10(86400 * 365 * 1e9)) return `${Math.ceil(10 ** exponent / (86400 * 365 * 1e6))}M years`;
  if (exponent < Math.log10(86400 * 365 * 1e12)) return `${Math.ceil(10 ** exponent / (86400 * 365 * 1e9))}B years`;
  return `${Math.ceil(10 ** (exponent - Math.log10(86400 * 365 * 1e12)))}T+ years`;
}

export default function PasswordStrengthClient() {
  const t = useTranslations("calculators");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const analysis = useMemo(() => {
    const checks: CheckItem[] = [
      { key: "len8", label: `${t("pwLength")} >= 8`, passed: password.length >= 8 },
      { key: "len12", label: `${t("pwLength")} >= 12`, passed: password.length >= 12 },
      { key: "len16", label: `${t("pwLength")} >= 16`, passed: password.length >= 16 },
      { key: "upper", label: t("pwUppercase"), passed: /[A-Z]/.test(password) },
      { key: "lower", label: t("pwLowercase"), passed: /[a-z]/.test(password) },
      { key: "number", label: t("pwNumbers"), passed: /[0-9]/.test(password) },
      { key: "special", label: t("pwSpecialChars"), passed: /[^a-zA-Z0-9]/.test(password) },
    ];

    // Score: count of passed items (max 7), map to 0-5
    const passedCount = checks.filter((c) => c.passed).length;
    let level: StrengthLevel;
    if (password.length === 0) level = 0;
    else if (passedCount <= 1) level = 1;
    else if (passedCount <= 2) level = 2;
    else if (passedCount <= 3) level = 3;
    else if (passedCount <= 5) level = 4;
    else level = 5;

    const strengthLabels: Record<StrengthLevel, string> = {
      0: "",
      1: t("pwVeryWeak"),
      2: t("pwWeak"),
      3: t("pwFair"),
      4: t("pwStrong"),
      5: t("pwVeryStrong"),
    };

    const crackTime = calcCrackTime(password);

    return { checks, level, label: strengthLabels[level], crackTime };
  }, [password, t]);

  const reset = () => {
    setPassword("");
    setShowPassword(false);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      {/* Password input */}
      <div>
        <Label>{t("pwPassword")}</Label>
        <div className="relative mt-1">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pr-20 text-lg"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground px-2 py-1"
          >
            {showPassword ? t("pwHidePassword") : t("pwShowPassword")}
          </button>
        </div>
      </div>

      {/* Strength bar */}
      {password.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t("pwStrength")}</span>
            <span className="text-sm font-semibold">{analysis.label}</span>
          </div>
          <div className="flex gap-1">
            {([1, 2, 3, 4, 5] as const).map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i <= analysis.level ? STRENGTH_COLORS[analysis.level] : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Crack time */}
      {password.length > 0 && (
        <div className="p-3 rounded-xl bg-muted/30 border text-center">
          <p className="text-xs text-muted-foreground mb-1">{t("pwCrackTime")}</p>
          <p className="text-lg font-bold font-mono">{analysis.crackTime}</p>
        </div>
      )}

      {/* Checklist */}
      {password.length > 0 && (
        <div className="space-y-1.5">
          {analysis.checks.map((check) => (
            <div key={check.key} className="flex items-center gap-2 text-sm">
              <span
                className={
                  check.passed
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                }
              >
                {check.passed ? "\u2713" : "\u2717"}
              </span>
              <span className={check.passed ? "text-foreground" : "text-muted-foreground"}>
                {check.label}
              </span>
            </div>
          ))}
        </div>
      )}

      <Button variant="outline" onClick={reset} className="w-full">
        {t("reset")}
      </Button>

      {/* Privacy notice */}
      <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
        <span>🔒</span> {t("pwNeverSent")}
      </p>
    </div>
  );
}
