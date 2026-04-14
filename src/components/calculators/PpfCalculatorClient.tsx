"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Result {
  totalInvestment: number;
  totalInterest: number;
  maturityValue: number;
  investmentPct: number;
  interestPct: number;
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

export default function PpfCalculatorClient() {
  const t = useTranslations("calculators");
  const [annualInvestment, setAnnualInvestment] = useState("");
  const [rate, setRate] = useState("7.1");
  const [years, setYears] = useState("15");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const yearly = parseFloat(annualInvestment);
    const annualRate = parseFloat(rate);
    const period = parseFloat(years);

    if (!yearly || !annualRate || !period || period < 15) return;

    const r = annualRate / 100;
    let balance = 0;

    // Each year: balance = (previous balance + annual contribution) × (1 + r)
    for (let y = 1; y <= period; y++) {
      balance = (balance + yearly) * (1 + r);
    }

    const totalInvestment = yearly * period;
    const maturityValue = Math.round(balance);
    const totalInterest = maturityValue - totalInvestment;
    const investmentPct = Math.round((totalInvestment / maturityValue) * 100);
    const interestPct = 100 - investmentPct;

    setResult({
      totalInvestment,
      totalInterest,
      maturityValue,
      investmentPct,
      interestPct,
    });
  };

  const reset = () => {
    setAnnualInvestment("");
    setRate("7.1");
    setYears("15");
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("ppfAnnualInvestment")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 150000`}
          value={annualInvestment}
          onChange={(e) => setAnnualInvestment(e.target.value)}
          className="mt-1"
          min={500}
          max={150000}
        />
        <p className="text-xs text-muted-foreground mt-1">Min: ₹500 · Max: ₹1,50,000</p>
      </div>
      <div>
        <Label>{t("ppfInterestRate")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 7.1`}
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="mt-1"
          step="0.1"
        />
      </div>
      <div>
        <Label>{t("ppfTimePeriod")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 15`}
          value={years}
          onChange={(e) => setYears(e.target.value)}
          className="mt-1"
          min={15}
          max={50}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="mt-2 space-y-4">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("ppfMaturityValue")}</p>
            <p className="text-3xl font-bold text-primary">{fmt(result.maturityValue)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("ppfTotalInvestment")}</p>
              <p className="font-semibold text-sm">{fmt(result.totalInvestment)}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("ppfTotalInterest")}</p>
              <p className="font-semibold text-sm text-green-600">{fmt(result.totalInterest)}</p>
            </div>
          </div>

          {/* Investment vs Interest bar */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">{t("ppfInvestmentVsInterest")}</p>
            <div className="flex rounded-full overflow-hidden h-4">
              <div
                className="bg-primary transition-all"
                style={{ width: `${result.investmentPct}%` }}
                title={`Investment: ${result.investmentPct}%`}
              />
              <div
                className="bg-green-400 transition-all"
                style={{ width: `${result.interestPct}%` }}
                title={`Interest: ${result.interestPct}%`}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                {t("ppfTotalInvestment")} {result.investmentPct}%
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
                {t("ppfTotalInterest")} {result.interestPct}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
