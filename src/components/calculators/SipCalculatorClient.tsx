"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Result {
  totalInvested: number;
  estimatedReturns: number;
  totalValue: number;
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

export default function SipCalculatorClient() {
  const t = useTranslations("calculators");

  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const P = parseFloat(monthlyInvestment) || 0;
    const annualRate = parseFloat(expectedReturn) || 0;
    const years = parseFloat(timePeriod) || 0;

    if (!P || !annualRate || !years) return;

    const r = annualRate / 12 / 100; // monthly rate
    const n = years * 12; // total months

    // SIP Future Value: FV = P × [(1+r)^n - 1] / r × (1+r)
    const totalValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvested = P * n;
    const estimatedReturns = totalValue - totalInvested;

    setResult({
      totalInvested: Math.round(totalInvested),
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(totalValue),
    });
  };

  const reset = () => {
    setMonthlyInvestment("");
    setExpectedReturn("");
    setTimePeriod("");
    setResult(null);
  };

  const investedPct = result ? (result.totalInvested / result.totalValue) * 100 : 0;
  const returnsPct = result ? (result.estimatedReturns / result.totalValue) * 100 : 0;

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("sipMonthlyInvestment")}</Label>
        <Input type="number" placeholder={`${t("egPrefix")} 5000`} value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)} className="mt-1" />
      </div>
      <div>
        <Label>{t("sipExpectedReturn")}</Label>
        <Input type="number" placeholder={`${t("egPrefix")} 12`} value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="mt-1" />
      </div>
      <div>
        <Label>{t("sipTimePeriod")}</Label>
        <Input type="number" placeholder={`${t("egPrefix")} 10`} value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="mt-1" />
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="mt-2 space-y-4">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("sipTotalValue")}</p>
            <p className="text-3xl font-bold text-primary">{fmt(result.totalValue)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("sipTotalInvested")}</p>
              <p className="font-semibold text-sm">{fmt(result.totalInvested)}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("sipEstimatedReturns")}</p>
              <p className="font-semibold text-sm text-green-600">{fmt(result.estimatedReturns)}</p>
            </div>
          </div>

          {/* Invested vs Returns visual bar */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">{t("sipInvestedVsReturns")}</p>
            <div className="flex h-6 rounded-full overflow-hidden">
              <div
                className="bg-primary/70 transition-all"
                style={{ width: `${investedPct}%` }}
                title={`${t("sipTotalInvested")}: ${fmt(result.totalInvested)}`}
              />
              <div
                className="bg-green-500 transition-all"
                style={{ width: `${returnsPct}%` }}
                title={`${t("sipEstimatedReturns")}: ${fmt(result.estimatedReturns)}`}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary/70" />
                {t("sipTotalInvested")} ({investedPct.toFixed(0)}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" />
                {t("sipEstimatedReturns")} ({returnsPct.toFixed(0)}%)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
