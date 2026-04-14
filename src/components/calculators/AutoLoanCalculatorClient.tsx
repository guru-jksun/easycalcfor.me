"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const TERMS = [24, 36, 48, 60, 72, 84];

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
}

export default function AutoLoanCalculatorClient() {
  const t = useTranslations("calculators");
  const [vehiclePrice, setVehiclePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState(60);
  const [result, setResult] = useState<{ monthly: number; totalInterest: number; totalCost: number; loanAmount: number } | null>(null);

  const calculate = () => {
    const price = parseFloat(vehiclePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const annualRate = parseFloat(rate) || 0;
    if (!price || !annualRate) return;
    const P = price - down;
    const r = annualRate / 12 / 100;
    const n = term;
    const monthly = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalCost = monthly * n + down;
    setResult({ monthly, totalInterest: monthly * n - P, totalCost, loanAmount: P });
  };

  const reset = () => { setVehiclePrice(""); setDownPayment(""); setRate(""); setResult(null); };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div><Label>{t("autoLoanVehiclePrice")}</Label><Input type="number" placeholder="35000" value={vehiclePrice} onChange={(e) => setVehiclePrice(e.target.value)} className="mt-1" /></div>
      <div><Label>{t("autoLoanDownPayment")}</Label><Input type="number" placeholder="5000" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="mt-1" /></div>
      <div><Label>{t("autoLoanInterestRate")}</Label><Input type="number" placeholder="5.9" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-1" /></div>
      <div>
        <Label>{t("autoLoanTerm")}</Label>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {TERMS.map((m) => (
            <button key={m} type="button" onClick={() => { setTerm(m); setResult(null); }}
              className={cn("text-xs px-2.5 py-1 rounded-full border transition-colors", term === m ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground hover:text-foreground border-transparent")}>
              {m} {t("autoLoanMonths")}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>
      {result && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("autoLoanMonthlyPayment")}</p>
            <p className="text-3xl font-bold text-primary">{fmt(result.monthly)}</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("autoLoanLoanAmount")}</p>
              <p className="font-semibold text-xs">{fmt(result.loanAmount)}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("autoLoanTotalInterest")}</p>
              <p className="font-semibold text-xs text-red-600">{fmt(result.totalInterest)}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("autoLoanTotalCost")}</p>
              <p className="font-semibold text-xs text-blue-600">{fmt(result.totalCost)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
