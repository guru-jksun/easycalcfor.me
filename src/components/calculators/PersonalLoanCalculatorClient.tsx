"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
}

export default function PersonalLoanCalculatorClient() {
  const t = useTranslations("calculators");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [result, setResult] = useState<{ monthly: number; totalInterest: number; totalPaid: number; ratio: number } | null>(null);

  const calculate = () => {
    const P = parseFloat(amount) || 0;
    const annualRate = parseFloat(rate) || 0;
    const years = parseFloat(term) || 0;
    if (!P || !annualRate || !years) return;
    const r = annualRate / 12 / 100;
    const n = years * 12;
    const monthly = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthly * n;
    const totalInterest = totalPaid - P;
    setResult({ monthly, totalInterest, totalPaid, ratio: totalInterest / P * 100 });
  };

  const reset = () => { setAmount(""); setRate(""); setTerm(""); setResult(null); };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div><Label>{t("personalLoanAmount")}</Label><Input type="number" placeholder="25000" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1" /></div>
      <div><Label>{t("personalLoanRate")}</Label><Input type="number" placeholder="10.5" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-1" /></div>
      <div><Label>{t("personalLoanTerm")}</Label><Input type="number" placeholder="5" value={term} onChange={(e) => setTerm(e.target.value)} className="mt-1" /></div>
      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>
      {result && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("personalLoanMonthly")}</p>
            <p className="text-3xl font-bold text-primary">{fmt(result.monthly)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("personalLoanTotalPaid")}</p>
              <p className="font-semibold text-sm">{fmt(result.totalPaid)}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("personalLoanTotalInterest")}</p>
              <p className="font-semibold text-sm text-red-600">{fmt(result.totalInterest)}</p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-center">
            <p className="text-xs text-muted-foreground">{t("personalLoanRatio")}</p>
            <p className="font-semibold text-sm text-orange-600">{result.ratio.toFixed(1)}%</p>
          </div>
        </div>
      )}
    </div>
  );
}
