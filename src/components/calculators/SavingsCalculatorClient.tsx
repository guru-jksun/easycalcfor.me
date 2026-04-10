"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Result {
  finalBalance: number;
  totalContributions: number;
  interestEarned: number;
  years: number;
  yearlyData: Array<{ year: number; value: number }>;
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function SavingsCalculatorClient() {
  const t = useTranslations("calculators");
  const [initialSavings, setInitialSavings] = useState("");
  const [monthlyContrib, setMonthlyContrib] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const P = parseFloat(initialSavings) || 0;
    const pmt = parseFloat(monthlyContrib) || 0;
    const annualRate = parseFloat(rate);
    const t = parseFloat(years);

    if (!annualRate || !t) return;

    const r = annualRate / 100 / 12; // monthly rate
    const n = 12; // monthly compounding

    const yearlyData: Array<{ year: number; value: number }> = [];

    for (let y = 1; y <= t; y++) {
      const months = y * n;
      // Principal with compound interest (monthly compounding)
      const principalGrowth = P * Math.pow(1 + r, months);
      // Monthly contributions future value
      const contribGrowth = pmt > 0 && r > 0
        ? pmt * ((Math.pow(1 + r, months) - 1) / r)
        : pmt * months;
      yearlyData.push({ year: y, value: principalGrowth + contribGrowth });
    }

    const finalBalance = yearlyData[yearlyData.length - 1]?.value || 0;
    const totalContributions = P + pmt * 12 * t;
    const interestEarned = finalBalance - totalContributions;

    setResult({
      finalBalance: Math.round(finalBalance),
      totalContributions: Math.round(totalContributions),
      interestEarned: Math.round(interestEarned),
      years: t,
      yearlyData,
    });
  };

  const reset = () => {
    setInitialSavings("");
    setMonthlyContrib("");
    setRate("");
    setYears("");
    setResult(null);
  };

  const maxValue = result ? Math.max(...result.yearlyData.map((d) => d.value)) : 0;

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("labelInitialSavings")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 5000`}
          value={initialSavings}
          onChange={(e) => setInitialSavings(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label>{t("labelMonthlyContrib")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 300`}
          value={monthlyContrib}
          onChange={(e) => setMonthlyContrib(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label>{t("labelAnnualRate")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 5`}
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label>{t("labelTimeYears")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 20`}
          value={years}
          onChange={(e) => setYears(e.target.value)}
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
            <p className="text-sm text-muted-foreground mb-1">{t("resFinalBalance")}</p>
            <p className="text-3xl font-bold text-primary">{fmt(result.finalBalance)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("resContributions")}</p>
              <p className="font-semibold text-sm">{fmt(result.totalContributions)}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("resInterestEarned")}</p>
              <p className="font-semibold text-sm text-green-600">{fmt(result.interestEarned)}</p>
            </div>
          </div>

          {/* Year-by-Year Growth Bar Chart */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">{t("resYearlyGrowth")}</p>
            <div className="flex items-end gap-0.5 h-20">
              {result.yearlyData.map(({ year, value }) => (
                <div
                  key={year}
                  className="flex-1 bg-primary/70 hover:bg-primary rounded-t transition-all"
                  style={{ height: `${(value / maxValue) * 100}%` }}
                  title={`Year ${year}: ${fmt(value)}`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{t("yearLabel")} 1</span>
              <span>{t("yearLabel")} {result.years}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
