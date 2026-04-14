"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Result {
  maturityAmount: number;
  totalInterest: number;
  principal: number;
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

export default function FdCalculatorClient() {
  const t = useTranslations("calculators");

  const COMPOUND_OPTIONS = [
    { value: "4", label: t("freqQuarterly") },
    { value: "12", label: t("freqMonthly") },
    { value: "2", label: t("freqSemiAnnually") },
    { value: "1", label: t("freqAnnually") },
  ];

  const [deposit, setDeposit] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");
  const [compounding, setCompounding] = useState("4");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const P = parseFloat(deposit);
    const annualRate = parseFloat(rate);
    const tenureVal = parseFloat(tenure);

    if (!P || !annualRate || !tenureVal) return;

    const r = annualRate / 100;
    const n = parseFloat(compounding);
    const tYears = tenureUnit === "years" ? tenureVal : tenureVal / 12;

    // A = P × (1 + r/n)^(n×t)
    const maturityAmount = P * Math.pow(1 + r / n, n * tYears);
    const totalInterest = maturityAmount - P;

    setResult({
      maturityAmount: Math.round(maturityAmount),
      totalInterest: Math.round(totalInterest),
      principal: P,
    });
  };

  const reset = () => {
    setDeposit("");
    setRate("");
    setTenure("");
    setCompounding("4");
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("fdDepositAmount")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 100000`}
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label>{t("labelAnnualRate")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 7`}
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label>{t("fdTenure")}</Label>
        <div className="flex gap-2 mt-1">
          <Input
            type="number"
            placeholder={tenureUnit === "years" ? `${t("egPrefix")} 5` : `${t("egPrefix")} 60`}
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="flex-1"
          />
          <Select value={tenureUnit} onValueChange={(v) => setTenureUnit(v as "years" | "months")}>
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
      <div>
        <Label>{t("fdCompounding")}</Label>
        <Select value={compounding} onValueChange={(v) => { if (v) setCompounding(v); }}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COMPOUND_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="mt-2 space-y-4">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("fdMaturityAmount")}</p>
            <p className="text-3xl font-bold text-primary">{fmt(result.maturityAmount)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("resPrincipal")}</p>
              <p className="font-semibold text-sm">{fmt(result.principal)}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("resInterestEarned")}</p>
              <p className="font-semibold text-sm text-green-600">{fmt(result.totalInterest)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
