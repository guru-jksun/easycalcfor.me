"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Regime = "new" | "old";
type AgeBand = "below60" | "senior" | "superSenior";

interface SlabResult {
  gross: number;
  standardDeduction: number;
  chapterVIA: number;
  taxableIncome: number;
  tax: number;
  rebate: number;
  surcharge: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
}

function fmtINR(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

// FY 2025-26 / AY 2026-27 slabs
function computeNewRegime(taxable: number): number {
  const slabs: [number, number][] = [
    [400_000, 0],
    [400_000, 0.05],  // 4L - 8L
    [400_000, 0.10],  // 8L - 12L
    [400_000, 0.15],  // 12L - 16L
    [400_000, 0.20],  // 16L - 20L
    [400_000, 0.25],  // 20L - 24L
    [Infinity, 0.30], // > 24L
  ];
  let tax = 0;
  let remaining = taxable;
  for (const [width, rate] of slabs) {
    if (remaining <= 0) break;
    const chunk = Math.min(remaining, width);
    tax += chunk * rate;
    remaining -= chunk;
  }
  return tax;
}

function computeOldRegime(taxable: number, ageBand: AgeBand): number {
  const baseExempt = ageBand === "superSenior" ? 500_000 : ageBand === "senior" ? 300_000 : 250_000;
  const slabs: [number, number][] = [
    [baseExempt, 0],
    [500_000 - baseExempt, 0.05],  // up to 5L at 5%
    [500_000, 0.20],               // 5L - 10L at 20%
    [Infinity, 0.30],              // > 10L at 30%
  ];
  let tax = 0;
  let remaining = taxable;
  for (const [width, rate] of slabs) {
    if (remaining <= 0 || width <= 0) continue;
    const chunk = Math.min(remaining, width);
    tax += chunk * rate;
    remaining -= chunk;
  }
  return tax;
}

function surchargeRate(taxable: number, regime: Regime): number {
  if (taxable <= 5_000_000) return 0;
  if (taxable <= 10_000_000) return 0.10;
  if (taxable <= 20_000_000) return 0.15;
  if (regime === "new") {
    return taxable <= 50_000_000 ? 0.25 : 0.25; // capped at 25% in new regime
  }
  return taxable <= 50_000_000 ? 0.25 : 0.37;
}

export default function IncomeTaxIndiaClient() {
  const t = useTranslations("calculators");
  const [grossIncome, setGrossIncome] = useState("");
  const [deductions80C, setDeductions80C] = useState("");
  const [deductions80D, setDeductions80D] = useState("");
  const [hraExempt, setHraExempt] = useState("");
  const [homeLoanInterest, setHomeLoanInterest] = useState("");
  const [npsEmployer, setNpsEmployer] = useState("");
  const [regime, setRegime] = useState<Regime>("new");
  const [ageBand, setAgeBand] = useState<AgeBand>("below60");

  const result = useMemo<{ chosen: SlabResult; new: SlabResult; old: SlabResult } | null>(() => {
    const gross = parseFloat(grossIncome);
    if (!gross || gross <= 0) return null;

    const c80 = parseFloat(deductions80C) || 0;
    const d80 = parseFloat(deductions80D) || 0;
    const hra = parseFloat(hraExempt) || 0;
    const homeInt = parseFloat(homeLoanInterest) || 0;
    const nps = parseFloat(npsEmployer) || 0;

    const compute = (reg: Regime): SlabResult => {
      const stdDed = 75000;  // New regime standard deduction FY25-26 increased to ₹75k
      const stdDedOld = 50000;

      const standardDeduction = reg === "new" ? stdDed : stdDedOld;

      // Old regime uses Chapter VIA (80C, 80D, HRA, home loan interest)
      // New regime only allows NPS employer contribution (80CCD(2)) and standard deduction
      const chapterVIA = reg === "new"
        ? Math.min(nps, gross * 0.10)
        : Math.min(c80, 150000) + Math.min(d80, 75000) + hra + Math.min(homeInt, 200000) + Math.min(nps, gross * 0.10);

      const taxableIncome = Math.max(0, gross - standardDeduction - chapterVIA);

      const tax = reg === "new"
        ? computeNewRegime(taxableIncome)
        : computeOldRegime(taxableIncome, ageBand);

      // Rebate u/s 87A
      let rebate = 0;
      if (reg === "new" && taxableIncome <= 1_200_000) {
        rebate = Math.min(tax, 60000);
      } else if (reg === "old" && taxableIncome <= 500_000) {
        rebate = Math.min(tax, 12500);
      }

      const taxAfterRebate = Math.max(0, tax - rebate);
      const sRate = surchargeRate(taxableIncome, reg);
      const surcharge = taxAfterRebate * sRate;
      const cess = (taxAfterRebate + surcharge) * 0.04;
      const totalTax = Math.round(taxAfterRebate + surcharge + cess);
      const effectiveRate = gross > 0 ? (totalTax / gross) * 100 : 0;

      return { gross, standardDeduction, chapterVIA, taxableIncome, tax, rebate, surcharge, cess, totalTax, effectiveRate };
    };

    const newR = compute("new");
    const oldR = compute("old");
    const chosen = regime === "new" ? newR : oldR;
    return { chosen, new: newR, old: oldR };
  }, [grossIncome, deductions80C, deductions80D, hraExempt, homeLoanInterest, npsEmployer, regime, ageBand]);

  const reset = () => {
    setGrossIncome("");
    setDeductions80C("");
    setDeductions80D("");
    setHraExempt("");
    setHomeLoanInterest("");
    setNpsEmployer("");
  };

  const betterRegime = result && result.new.totalTax < result.old.totalTax ? "new" : result && result.new.totalTax > result.old.totalTax ? "old" : null;
  const savings = result ? Math.abs(result.new.totalTax - result.old.totalTax) : 0;

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-md space-y-4">
      <div>
        <Label>{t("itRegime")}</Label>
        <Select value={regime} onValueChange={(v) => setRegime(v as Regime)}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">{t("itRegimeNew")}</SelectItem>
            <SelectItem value="old">{t("itRegimeOld")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>{t("itAgeBand")}</Label>
        <Select value={ageBand} onValueChange={(v) => setAgeBand(v as AgeBand)}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="below60">{t("itAgeBelow60")}</SelectItem>
            <SelectItem value="senior">{t("itAgeSenior")}</SelectItem>
            <SelectItem value="superSenior">{t("itAgeSuperSenior")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>{t("itGrossIncome")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 1200000`}
          value={grossIncome}
          onChange={(e) => setGrossIncome(e.target.value)}
          className="mt-1"
        />
      </div>

      {regime === "old" && (
        <>
          <div>
            <Label>{t("it80C")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 150000`}
              value={deductions80C}
              onChange={(e) => setDeductions80C(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>{t("it80D")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 25000`}
              value={deductions80D}
              onChange={(e) => setDeductions80D(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>{t("itHraExempt")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 120000`}
              value={hraExempt}
              onChange={(e) => setHraExempt(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>{t("itHomeLoanInterest")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 200000`}
              value={homeLoanInterest}
              onChange={(e) => setHomeLoanInterest(e.target.value)}
              className="mt-1"
            />
          </div>
        </>
      )}

      <div>
        <Label>{t("itNpsEmployer")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 50000`}
          value={npsEmployer}
          onChange={(e) => setNpsEmployer(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="mt-2 space-y-4">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("itTotalTax")} ({regime === "new" ? t("itRegimeNew") : t("itRegimeOld")})</p>
            <p className="text-3xl font-bold text-primary">{fmtINR(result.chosen.totalTax)}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("itEffectiveRate")}: {result.chosen.effectiveRate.toFixed(2)}%</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-xl text-center ${betterRegime === "new" ? "bg-green-50 dark:bg-green-950/40 border border-green-400" : "bg-muted/50"}`}>
              <p className="text-xs text-muted-foreground">{t("itRegimeNew")}</p>
              <p className="font-semibold text-sm">{fmtINR(result.new.totalTax)}</p>
            </div>
            <div className={`p-3 rounded-xl text-center ${betterRegime === "old" ? "bg-green-50 dark:bg-green-950/40 border border-green-400" : "bg-muted/50"}`}>
              <p className="text-xs text-muted-foreground">{t("itRegimeOld")}</p>
              <p className="font-semibold text-sm">{fmtINR(result.old.totalTax)}</p>
            </div>
          </div>

          {betterRegime && savings > 0 && (
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-center">
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                {t("itBetterRegime", { regime: betterRegime === "new" ? t("itRegimeNew") : t("itRegimeOld"), savings: fmtINR(savings) })}
              </p>
            </div>
          )}

          <div className="text-xs text-muted-foreground space-y-1 border-t pt-3">
            <div className="flex justify-between"><span>{t("itGrossIncome")}</span><span>{fmtINR(result.chosen.gross)}</span></div>
            <div className="flex justify-between"><span>{t("itStandardDeduction")}</span><span>−{fmtINR(result.chosen.standardDeduction)}</span></div>
            <div className="flex justify-between"><span>{t("itChapterVIA")}</span><span>−{fmtINR(result.chosen.chapterVIA)}</span></div>
            <div className="flex justify-between font-medium text-foreground"><span>{t("itTaxableIncome")}</span><span>{fmtINR(result.chosen.taxableIncome)}</span></div>
            <div className="flex justify-between"><span>{t("itBasicTax")}</span><span>{fmtINR(result.chosen.tax)}</span></div>
            {result.chosen.rebate > 0 && (
              <div className="flex justify-between text-green-700"><span>{t("itRebate87A")}</span><span>−{fmtINR(result.chosen.rebate)}</span></div>
            )}
            {result.chosen.surcharge > 0 && (
              <div className="flex justify-between"><span>{t("itSurcharge")}</span><span>+{fmtINR(result.chosen.surcharge)}</span></div>
            )}
            <div className="flex justify-between"><span>{t("itCess")}</span><span>+{fmtINR(result.chosen.cess)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
