"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Result {
  futureValue: number;
  totalInterest: number;
  principal: number;
  years: number;
  yearlyData: Array<{ year: number; value: number }>;
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function CompoundInterestClient() {
  const t = useTranslations("calculators");

  const COMPOUND_OPTIONS = [
    { value: "365", label: t("freqDaily") },
    { value: "52", label: t("freqWeekly") },
    { value: "12", label: t("freqMonthly") },
    { value: "4", label: t("freqQuarterly") },
    { value: "2", label: t("freqSemiAnnually") },
    { value: "1", label: t("freqAnnually") },
  ];

  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [compounding, setCompounding] = useState("12");
  const [monthlyContrib, setMonthlyContrib] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const P = parseFloat(principal) || 0;
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = parseFloat(compounding);
    const pmt = parseFloat(monthlyContrib) || 0;

    if (!P || !r || !t) return;

    const yearlyData: Array<{ year: number; value: number }> = [];

    for (let y = 1; y <= t; y++) {
      // Compound interest: A = P(1 + r/n)^(nt)
      const principalGrowth = P * Math.pow(1 + r / n, n * y);
      // Monthly contributions with compound interest
      const contribGrowth = pmt > 0
        ? pmt * ((Math.pow(1 + r / n, n * y) - 1) / (r / n)) * (n / 12)
        : 0;
      yearlyData.push({ year: y, value: principalGrowth + contribGrowth });
    }

    const futureValue = yearlyData[yearlyData.length - 1]?.value || 0;
    const totalContribs = pmt * 12 * t;
    const totalInterest = futureValue - P - totalContribs;

    setResult({
      futureValue: Math.round(futureValue),
      totalInterest: Math.round(totalInterest),
      principal: P + totalContribs,
      years: t,
      yearlyData,
    });
  };

  const maxValue = result ? Math.max(...result.yearlyData.map((d) => d.value)) : 0;

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("labelPrincipalDollar")}</Label>
        <Input type="number" placeholder={`${t("egPrefix")} 10000`} value={principal} onChange={(e) => setPrincipal(e.target.value)} className="mt-1" />
      </div>
      <div>
        <Label>{t("labelAnnualRate")}</Label>
        <Input type="number" placeholder={`${t("egPrefix")} 7`} value={rate} onChange={(e) => setRate(e.target.value)} className="mt-1" />
      </div>
      <div>
        <Label>{t("labelTimeYears")}</Label>
        <Input type="number" placeholder={`${t("egPrefix")} 10`} value={years} onChange={(e) => setYears(e.target.value)} className="mt-1" />
      </div>
      <div>
        <Label>{t("labelCompoundFreq")}</Label>
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
      <div>
        <Label>{t("labelMonthlyContrib")} <span className="text-muted-foreground text-xs">{t("optional")}</span></Label>
        <Input type="number" placeholder={`${t("egPrefix")} 200`} value={monthlyContrib} onChange={(e) => setMonthlyContrib(e.target.value)} className="mt-1" />
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={() => { setPrincipal(""); setRate(""); setYears(""); setMonthlyContrib(""); setResult(null); }}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="mt-2 space-y-4">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("resFutureValue")}</p>
            <p className="text-3xl font-bold text-primary">{fmt(result.futureValue)}</p>
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

          {/* Growth Chart (simple bar chart) */}
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
