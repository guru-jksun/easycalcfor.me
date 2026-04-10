"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Country = "US" | "UK" | "DE" | "FR" | "JP" | "KR" | "CA" | "AU";

interface Result {
  estimatedTax: number;
  effectiveRate: number;
  afterTaxIncome: number;
}

// US 2024 brackets (Single filer)
const US_BRACKETS = [
  { min: 0,       max: 11600,   rate: 0.10 },
  { min: 11600,   max: 47150,   rate: 0.12 },
  { min: 47150,   max: 100525,  rate: 0.22 },
  { min: 100525,  max: 191950,  rate: 0.24 },
  { min: 191950,  max: 243725,  rate: 0.32 },
  { min: 243725,  max: 609350,  rate: 0.35 },
  { min: 609350,  max: Infinity, rate: 0.37 },
];

function calcUS(income: number): number {
  let tax = 0;
  for (const { min, max, rate } of US_BRACKETS) {
    if (income <= min) break;
    tax += (Math.min(income, max) - min) * rate;
  }
  return tax;
}

// Simplified flat effective rate estimates for other countries
const FLAT_RATES: Record<Exclude<Country, "US">, (income: number) => number> = {
  UK: (i) => {
    // Basic: 20% up to £50,270; 40% up to £125,140; 45% above; personal allowance £12,570
    const allowance = 12570;
    const taxable = Math.max(0, i - allowance);
    if (taxable <= 0) return 0;
    if (taxable <= 37700) return taxable * 0.20;
    if (taxable <= 112570) return 37700 * 0.20 + (taxable - 37700) * 0.40;
    return 37700 * 0.20 + 74870 * 0.40 + (taxable - 112570) * 0.45;
  },
  DE: (i) => {
    // Germany: progressive 0–45%; solidarity surcharge 5.5% on income tax
    if (i <= 11604) return 0;
    const taxable = i - 11604;
    let tax = 0;
    if (taxable <= 14532) tax = taxable * 0.14;
    else if (taxable <= 57918) tax = 14532 * 0.14 + (taxable - 14532) * 0.24;
    else if (taxable <= 274612) tax = 14532 * 0.14 + (57918 - 14532) * 0.24 + (taxable - 57918) * 0.42;
    else tax = 14532 * 0.14 + (57918 - 14532) * 0.24 + (274612 - 57918) * 0.42 + (taxable - 274612) * 0.45;
    return tax * 1.055; // solidarity surcharge
  },
  FR: (i) => {
    // France: 0/11/30/41/45%
    if (i <= 10777) return 0;
    let tax = 0;
    if (i <= 27478) tax = (i - 10777) * 0.11;
    else if (i <= 78570) tax = (27478 - 10777) * 0.11 + (i - 27478) * 0.30;
    else if (i <= 168994) tax = (27478 - 10777) * 0.11 + (78570 - 27478) * 0.30 + (i - 78570) * 0.41;
    else tax = (27478 - 10777) * 0.11 + (78570 - 27478) * 0.30 + (168994 - 78570) * 0.41 + (i - 168994) * 0.45;
    return tax;
  },
  JP: (i) => {
    // Japan national income tax (simplified)
    const brackets = [
      { max: 1950000,  rate: 0.05, ded: 0 },
      { max: 3300000,  rate: 0.10, ded: 97500 },
      { max: 6950000,  rate: 0.20, ded: 427500 },
      { max: 9000000,  rate: 0.23, ded: 636000 },
      { max: 18000000, rate: 0.33, ded: 1536000 },
      { max: 40000000, rate: 0.40, ded: 2796000 },
      { max: Infinity, rate: 0.45, ded: 4796000 },
    ];
    for (const { max, rate, ded } of brackets) {
      if (i <= max) return i * rate - ded;
    }
    return 0;
  },
  KR: (i) => {
    // South Korea national income tax (KRW)
    const brackets = [
      { max: 14000000,  rate: 0.06, ded: 0 },
      { max: 50000000,  rate: 0.15, ded: 1260000 },
      { max: 88000000,  rate: 0.24, ded: 5760000 },
      { max: 150000000, rate: 0.35, ded: 15440000 },
      { max: 300000000, rate: 0.38, ded: 19940000 },
      { max: 500000000, rate: 0.40, ded: 25940000 },
      { max: 1000000000,rate: 0.42, ded: 35940000 },
      { max: Infinity,  rate: 0.45, ded: 65940000 },
    ];
    for (const { max, rate, ded } of brackets) {
      if (i <= max) return Math.max(0, i * rate - ded);
    }
    return 0;
  },
  CA: (i) => {
    // Canada federal income tax
    const brackets = [
      { max: 55867,   rate: 0.15, ded: 0 },
      { max: 111733,  rate: 0.205, ded: 3047 },
      { max: 154906,  rate: 0.26, ded: 9183 },
      { max: 220000,  rate: 0.29, ded: 13829 },
      { max: Infinity,rate: 0.33, ded: 22636 },
    ];
    for (const { max, rate, ded } of brackets) {
      if (i <= max) return Math.max(0, i * rate - ded);
    }
    return 0;
  },
  AU: (i) => {
    // Australia income tax 2023-24
    if (i <= 18200) return 0;
    if (i <= 45000) return (i - 18200) * 0.19;
    if (i <= 120000) return 5092 + (i - 45000) * 0.325;
    if (i <= 180000) return 29467 + (i - 120000) * 0.37;
    return 51667 + (i - 180000) * 0.45;
  },
};

const COUNTRIES: { value: Country; label: string; currency: string }[] = [
  { value: "US", label: "United States (USD)", currency: "USD" },
  { value: "UK", label: "United Kingdom (GBP)", currency: "GBP" },
  { value: "DE", label: "Germany (EUR)", currency: "EUR" },
  { value: "FR", label: "France (EUR)", currency: "EUR" },
  { value: "JP", label: "Japan (JPY)", currency: "JPY" },
  { value: "KR", label: "South Korea (KRW)", currency: "KRW" },
  { value: "CA", label: "Canada (CAD)", currency: "CAD" },
  { value: "AU", label: "Australia (AUD)", currency: "AUD" },
];

function fmtCurrency(n: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

export default function IncomeTaxCalculatorClient() {
  const t = useTranslations("calculators");
  const [income, setIncome] = useState("");
  const [country, setCountry] = useState<Country>("US");
  const [result, setResult] = useState<Result | null>(null);

  const selectedCountry = COUNTRIES.find((c) => c.value === country)!;

  const calculate = () => {
    const inc = parseFloat(income.replace(/,/g, ""));
    if (isNaN(inc) || inc < 0) return;

    const estimatedTax =
      country === "US" ? calcUS(inc) : FLAT_RATES[country](inc);
    const effectiveRate = inc > 0 ? (estimatedTax / inc) * 100 : 0;
    const afterTaxIncome = inc - estimatedTax;

    setResult({ estimatedTax, effectiveRate, afterTaxIncome });
  };

  const reset = () => {
    setIncome("");
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("itAnnualIncome")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 75000`}
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="mt-1"
          onKeyDown={(e) => e.key === "Enter" && calculate()}
        />
      </div>

      <div>
        <Label>{t("itCountry")}</Label>
        <Select value={country} onValueChange={(v) => { setCountry(v as Country); setResult(null); }}>
          <SelectTrigger className="mt-1 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map(({ value, label }) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="space-y-3 mt-2">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">Estimated Tax</p>
            <p className="text-3xl font-bold text-primary">
              {fmtCurrency(result.estimatedTax, selectedCountry.currency)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">Effective Rate</p>
              <p className="font-semibold text-sm">{result.effectiveRate.toFixed(1)}%</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-center">
              <p className="text-xs text-muted-foreground">After-tax Income</p>
              <p className="font-semibold text-sm text-green-600">
                {fmtCurrency(result.afterTaxIncome, selectedCountry.currency)}
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground bg-amber-50 dark:bg-amber-950/40 rounded-lg p-3 leading-relaxed">
            Simplified estimate. Consult a tax professional for accurate figures.
          </p>
        </div>
      )}
    </div>
  );
}
