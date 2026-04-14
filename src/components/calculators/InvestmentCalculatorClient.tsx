"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function InvestmentCalculatorClient() {
  const t = useTranslations("calculators");
  const [initial, setInitial] = useState("");
  const [monthly, setMonthly] = useState("");
  const [returnRate, setReturnRate] = useState("");
  const [period, setPeriod] = useState("");
  const [result, setResult] = useState<{ futureValue: number; totalInvested: number; totalReturns: number } | null>(null);

  const calculate = () => {
    const P = parseFloat(initial) || 0;
    const PMT = parseFloat(monthly) || 0;
    const annualRate = parseFloat(returnRate) || 0;
    const years = parseFloat(period) || 0;
    if ((!P && !PMT) || !years) return;
    const r = annualRate / 12 / 100;
    const n = years * 12;
    const fvInitial = P * Math.pow(1 + r, n);
    const fvContrib = r > 0 ? PMT * ((Math.pow(1 + r, n) - 1) / r) : PMT * n;
    const futureValue = fvInitial + fvContrib;
    const totalInvested = P + PMT * n;
    setResult({ futureValue, totalInvested, totalReturns: futureValue - totalInvested });
  };

  const reset = () => { setInitial(""); setMonthly(""); setReturnRate(""); setPeriod(""); setResult(null); };
  const investedPct = result ? (result.totalInvested / result.futureValue) * 100 : 0;

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div><Label>{t("investInitial")}</Label><Input type="number" placeholder="10000" value={initial} onChange={(e) => setInitial(e.target.value)} className="mt-1" /></div>
      <div><Label>{t("investMonthly")}</Label><Input type="number" placeholder="500" value={monthly} onChange={(e) => setMonthly(e.target.value)} className="mt-1" /></div>
      <div><Label>{t("investReturn")}</Label><Input type="number" placeholder="8" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} className="mt-1" /></div>
      <div><Label>{t("investPeriod")}</Label><Input type="number" placeholder="20" value={period} onChange={(e) => setPeriod(e.target.value)} className="mt-1" /></div>
      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>
      {result && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("investFutureValue")}</p>
            <p className="text-3xl font-bold text-primary">{fmt(result.futureValue)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("investTotalInvested")}</p>
              <p className="font-semibold text-sm">{fmt(result.totalInvested)}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("investTotalReturns")}</p>
              <p className="font-semibold text-sm text-green-600">{fmt(result.totalReturns)}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">{t("investInvestedVsReturns")}</p>
            <div className="flex h-6 rounded-full overflow-hidden">
              <div className="bg-primary/70" style={{ width: `${investedPct}%` }} />
              <div className="bg-green-500" style={{ width: `${100 - investedPct}%` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
