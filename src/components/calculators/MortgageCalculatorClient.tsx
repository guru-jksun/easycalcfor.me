"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Result {
  principalAndInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  totalMonthly: number;
  totalCost: number;
  downPaymentPct: number;
  loanAmount: number;
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
}

function fmtPct(n: number) {
  return n.toFixed(1) + "%";
}

export default function MortgageCalculatorClient() {
  const t = useTranslations("calculators");
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("30");
  const [propertyTax, setPropertyTax] = useState("");
  const [insurance, setInsurance] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment) || 0;
    const annualRate = parseFloat(rate);
    const years = parseFloat(loanTerm);

    if (!price || !annualRate || !years) return;

    const loan = price - down;
    const r = annualRate / 100 / 12;
    const n = years * 12;

    const PI = r === 0
      ? loan / n
      : loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const monthlyTax = propertyTax ? (price * parseFloat(propertyTax)) / 100 / 12 : 0;
    const monthlyIns = parseFloat(insurance) || 0;
    const totalMonthly = PI + monthlyTax + monthlyIns;
    const totalCost = PI * n + down + monthlyTax * n + monthlyIns * n;
    const downPct = price > 0 ? (down / price) * 100 : 0;

    setResult({
      principalAndInterest: PI,
      monthlyTax,
      monthlyInsurance: monthlyIns,
      totalMonthly,
      totalCost,
      downPaymentPct: downPct,
      loanAmount: loan,
    });
  };

  const reset = () => {
    setHomePrice("");
    setDownPayment("");
    setRate("");
    setLoanTerm("30");
    setPropertyTax("");
    setInsurance("");
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("labelHomePrice")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 400000`}
          value={homePrice}
          onChange={(e) => setHomePrice(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label>{t("labelDownPayment")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 80000`}
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
          className="mt-1"
        />
        {homePrice && downPayment && parseFloat(homePrice) > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            {fmtPct((parseFloat(downPayment) / parseFloat(homePrice)) * 100)} {t("ofHomePrice")}
          </p>
        )}
      </div>
      <div>
        <Label>{t("labelAnnualRate")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 7.0`}
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label>{t("labelLoanTerm")}</Label>
        <Select value={loanTerm} onValueChange={(v) => { if (v) setLoanTerm(v); }}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">{t("loan30Years")}</SelectItem>
            <SelectItem value="20">{t("loan20Years")}</SelectItem>
            <SelectItem value="15">{t("loan15Years")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>
          {t("labelPropertyTax")}{" "}
          <span className="text-muted-foreground text-xs">{t("optional")}</span>
        </Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 1.2`}
          value={propertyTax}
          onChange={(e) => setPropertyTax(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label>
          {t("labelHomeInsurance")}{" "}
          <span className="text-muted-foreground text-xs">{t("optional")}</span>
        </Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 100`}
          value={insurance}
          onChange={(e) => setInsurance(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="mt-2 space-y-4">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("resTotalMonthly")}</p>
            <p className="text-3xl font-bold text-primary">{fmt(result.totalMonthly)}</p>
          </div>

          <div className="rounded-xl bg-muted/50 p-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("resPrincipalInterest")}</span>
              <span className="font-medium">{fmt(result.principalAndInterest)}</span>
            </div>
            {result.monthlyTax > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("resPropertyTax")}</span>
                <span className="font-medium">{fmt(result.monthlyTax)}</span>
              </div>
            )}
            {result.monthlyInsurance > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("resInsurance")}</span>
                <span className="font-medium">{fmt(result.monthlyInsurance)}</span>
              </div>
            )}
            <div className="flex justify-between border-t pt-2 font-semibold">
              <span>{t("resLoanAmount")}</span>
              <span>{fmt(result.loanAmount)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("resDownPayment")}</p>
              <p className="font-semibold text-sm">{fmtPct(result.downPaymentPct)}</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("resTotalCost")}</p>
              <p className="font-semibold text-sm">{fmt(result.totalCost)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
