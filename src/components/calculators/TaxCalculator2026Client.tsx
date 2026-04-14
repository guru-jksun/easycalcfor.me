"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const BRACKETS: Record<string, { rate: number; min: number; max: number }[]> = {
  single: [
    { rate: 10, min: 0, max: 11925 },
    { rate: 12, min: 11925, max: 48475 },
    { rate: 22, min: 48475, max: 103350 },
    { rate: 24, min: 103350, max: 197300 },
    { rate: 32, min: 197300, max: 250525 },
    { rate: 35, min: 250525, max: 626350 },
    { rate: 37, min: 626350, max: Infinity },
  ],
  married: [
    { rate: 10, min: 0, max: 23850 },
    { rate: 12, min: 23850, max: 96950 },
    { rate: 22, min: 96950, max: 206700 },
    { rate: 24, min: 206700, max: 394600 },
    { rate: 32, min: 394600, max: 501050 },
    { rate: 35, min: 501050, max: 751600 },
    { rate: 37, min: 751600, max: Infinity },
  ],
  hoh: [
    { rate: 10, min: 0, max: 17000 },
    { rate: 12, min: 17000, max: 64850 },
    { rate: 22, min: 64850, max: 103350 },
    { rate: 24, min: 103350, max: 197300 },
    { rate: 32, min: 197300, max: 250500 },
    { rate: 35, min: 250500, max: 626350 },
    { rate: 37, min: 626350, max: Infinity },
  ],
};

const STD_DEDUCTIONS: Record<string, number> = { single: 15700, married: 31400, hoh: 23550 };

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function TaxCalculator2026Client() {
  const t = useTranslations("calculators");
  const [filing, setFiling] = useState("single");
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState(String(STD_DEDUCTIONS.single));
  const [result, setResult] = useState<{ taxable: number; totalTax: number; effective: number; marginal: number; brackets: { rate: number; amount: number; tax: number }[]; afterTax: number } | null>(null);

  const calculate = () => {
    const gross = parseFloat(income) || 0;
    const ded = parseFloat(deductions) || 0;
    if (!gross) return;
    const taxable = Math.max(0, gross - ded);
    const brackets = BRACKETS[filing];
    let totalTax = 0;
    let marginal = 10;
    const breakdown: { rate: number; amount: number; tax: number }[] = [];
    for (const b of brackets) {
      if (taxable <= b.min) break;
      const amount = Math.min(taxable, b.max) - b.min;
      const tax = amount * b.rate / 100;
      breakdown.push({ rate: b.rate, amount, tax });
      totalTax += tax;
      marginal = b.rate;
    }
    setResult({ taxable, totalTax, effective: gross > 0 ? (totalTax / gross) * 100 : 0, marginal, brackets: breakdown, afterTax: gross - totalTax });
  };

  const reset = () => { setIncome(""); setDeductions(String(STD_DEDUCTIONS[filing])); setResult(null); };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("tax2026FilingStatus")}</Label>
        <div className="flex gap-1 mt-2">
          {(["single", "married", "hoh"] as const).map((f) => (
            <button key={f} type="button" onClick={() => { setFiling(f); setDeductions(String(STD_DEDUCTIONS[f])); setResult(null); }}
              className={cn("flex-1 text-xs px-2 py-1.5 rounded border transition-colors", filing === f ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-transparent")}>
              {t(f === "single" ? "tax2026Single" : f === "married" ? "tax2026Married" : "tax2026HeadOfHousehold")}
            </button>
          ))}
        </div>
      </div>
      <div><Label>{t("tax2026GrossIncome")}</Label><Input type="number" placeholder="75000" value={income} onChange={(e) => setIncome(e.target.value)} className="mt-1" /></div>
      <div><Label>{t("tax2026Deductions")}</Label><Input type="number" value={deductions} onChange={(e) => setDeductions(e.target.value)} className="mt-1" /><p className="text-xs text-muted-foreground mt-1">{t("tax2026StandardDeduction")}: {fmt(STD_DEDUCTIONS[filing])}</p></div>
      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>
      {result && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("tax2026TotalTax")}</p>
            <p className="text-3xl font-bold text-primary">{fmt(result.totalTax)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("tax2026EffectiveRate")}</p>
              <p className="font-semibold text-sm">{result.effective.toFixed(1)}%</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("tax2026MarginalRate")}</p>
              <p className="font-semibold text-sm">{result.marginal}%</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("tax2026TaxableIncome")}</p>
              <p className="font-semibold text-xs">{fmt(result.taxable)}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("tax2026AfterTax")}</p>
              <p className="font-semibold text-xs text-green-600">{fmt(result.afterTax)}</p>
            </div>
          </div>
          <div className="bg-muted/40 rounded-lg p-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">{t("tax2026BracketBreakdown")}</p>
            {result.brackets.map((b, i) => (
              <div key={i} className="flex justify-between text-xs py-0.5">
                <span>{b.rate}% on {fmt(b.amount)}</span>
                <span className="font-mono">{fmt(b.tax)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
