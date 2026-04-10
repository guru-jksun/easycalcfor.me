"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Result {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
  principalPct: number;
  interestPct: number;
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
}

export default function LoanCalculatorClient() {
  const t = useTranslations("calculators");
  const [loanAmount, setLoanAmount] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [termUnit, setTermUnit] = useState<"years" | "months">("years");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(rate);
    const termVal = parseFloat(term);

    if (!P || !annualRate || !termVal) return;

    const r = annualRate / 100 / 12;
    const n = termUnit === "years" ? termVal * 12 : termVal;

    // M = P[r(1+r)^n] / [(1+r)^n - 1]
    const M = r === 0
      ? P / n
      : P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const totalPayment = M * n;
    const totalInterest = totalPayment - P;
    const principalPct = Math.round((P / totalPayment) * 100);
    const interestPct = 100 - principalPct;

    setResult({
      monthlyPayment: M,
      totalPayment,
      totalInterest,
      principal: P,
      principalPct,
      interestPct,
    });
  };

  const reset = () => {
    setLoanAmount("");
    setRate("");
    setTerm("");
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("labelLoanAmount")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 25000`}
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label>{t("labelAnnualRate")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 6.5`}
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label>{t("labelLoanTerm")}</Label>
        <div className="flex gap-2 mt-1">
          <Input
            type="number"
            placeholder={termUnit === "years" ? `${t("egPrefix")} 5` : `${t("egPrefix")} 60`}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="flex-1"
          />
          <Select value={termUnit} onValueChange={(v) => setTermUnit(v as "years" | "months")}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="years">{t("labelTermYears")}</SelectItem>
              <SelectItem value="months">{t("labelTermMonths")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="mt-2 space-y-4">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("resMonthlyPayment")}</p>
            <p className="text-3xl font-bold text-primary">{fmt(result.monthlyPayment)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("resTotalPayment")}</p>
              <p className="font-semibold text-sm">{fmt(result.totalPayment)}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("resTotalInterest")}</p>
              <p className="font-semibold text-sm text-red-600">{fmt(result.totalInterest)}</p>
            </div>
          </div>

          {/* Amortization summary bar */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">{t("resPrincipalVsInterest")}</p>
            <div className="flex rounded-full overflow-hidden h-4">
              <div
                className="bg-primary transition-all"
                style={{ width: `${result.principalPct}%` }}
                title={`Principal: ${result.principalPct}%`}
              />
              <div
                className="bg-red-400 transition-all"
                style={{ width: `${result.interestPct}%` }}
                title={`Interest: ${result.interestPct}%`}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                {t("resPrincipal")} {result.principalPct}%
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-red-400" />
                {t("resTotalInterest")} {result.interestPct}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
