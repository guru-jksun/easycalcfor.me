"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
}

export default function PaymentCalculatorClient() {
  const t = useTranslations("calculators");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [result, setResult] = useState<{ monthly: number; totalPayment: number; totalInterest: number } | null>(null);

  const calculate = () => {
    const P = parseFloat(amount) || 0;
    const annualRate = parseFloat(rate) || 0;
    const years = parseFloat(term) || 0;
    if (!P || !annualRate || !years) return;
    const r = annualRate / 12 / 100;
    const n = years * 12;
    const monthly = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setResult({ monthly, totalPayment: monthly * n, totalInterest: monthly * n - P });
  };

  const reset = () => { setAmount(""); setRate(""); setTerm(""); setResult(null); };
  const principalPct = result ? (parseFloat(amount) / result.totalPayment) * 100 : 0;

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div><Label>{t("paymentLoanAmount")}</Label><Input type="number" placeholder="250000" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1" /></div>
      <div><Label>{t("paymentInterestRate")}</Label><Input type="number" placeholder="6.5" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-1" /></div>
      <div><Label>{t("paymentLoanTerm")}</Label><Input type="number" placeholder="30" value={term} onChange={(e) => setTerm(e.target.value)} className="mt-1" /></div>
      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>
      {result && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("paymentMonthly")}</p>
            <p className="text-3xl font-bold text-primary">{fmt(result.monthly)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("paymentTotalPayment")}</p>
              <p className="font-semibold text-sm">{fmt(result.totalPayment)}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("paymentTotalInterest")}</p>
              <p className="font-semibold text-sm text-red-600">{fmt(result.totalInterest)}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">{t("paymentPrincipalVsInterest")}</p>
            <div className="flex h-6 rounded-full overflow-hidden">
              <div className="bg-primary/70 transition-all" style={{ width: `${principalPct}%` }} />
              <div className="bg-red-400 transition-all" style={{ width: `${100 - principalPct}%` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
