"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function fmtINR(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

export default function NpsCalculatorClient() {
  const t = useTranslations("calculators");
  const [currentAge, setCurrentAge] = useState("");
  const [retireAge, setRetireAge] = useState("60");
  const [monthly, setMonthly] = useState("");
  const [returnRate, setReturnRate] = useState("10");
  const [annuityPct, setAnnuityPct] = useState("40");
  const [annuityRate, setAnnuityRate] = useState("6");

  const result = useMemo(() => {
    const age = parseInt(currentAge);
    const retire = parseInt(retireAge);
    const m = parseFloat(monthly);
    const r = parseFloat(returnRate);
    const ap = parseFloat(annuityPct);
    const ar = parseFloat(annuityRate);

    if (!age || !retire || !m || age >= retire || age < 18 || retire > 75) return null;

    const years = retire - age;
    const months = years * 12;
    const monthlyRate = r / 100 / 12;

    // FV of annuity (monthly SIP)
    const corpus = monthlyRate === 0
      ? m * months
      : m * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);

    const totalInvested = m * months;
    const returns = corpus - totalInvested;

    // At retirement: min 40% must be annuitized; max 60% lump sum tax-free
    const annuityCorpus = corpus * (ap / 100);
    const lumpSum = corpus - annuityCorpus;
    // Monthly pension from annuity at purchase rate
    const monthlyPension = annuityCorpus * (ar / 100) / 12;

    return {
      years,
      totalInvested,
      returns,
      corpus,
      lumpSum,
      annuityCorpus,
      monthlyPension,
    };
  }, [currentAge, retireAge, monthly, returnRate, annuityPct, annuityRate]);

  const reset = () => {
    setCurrentAge("");
    setMonthly("");
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-md space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>{t("npsCurrentAge")}</Label>
          <Input
            type="number"
            placeholder={`${t("egPrefix")} 30`}
            value={currentAge}
            onChange={(e) => setCurrentAge(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label>{t("npsRetireAge")}</Label>
          <Input
            type="number"
            value={retireAge}
            onChange={(e) => setRetireAge(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label>{t("npsMonthly")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 5000`}
          value={monthly}
          onChange={(e) => setMonthly(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>{t("npsReturnRate")}</Label>
        <Input
          type="number"
          step="0.1"
          value={returnRate}
          onChange={(e) => setReturnRate(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>{t("npsAnnuityPct")}</Label>
          <Select value={annuityPct} onValueChange={(v) => v && setAnnuityPct(v)}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="40">40% ({t("npsMinimum")})</SelectItem>
              <SelectItem value="50">50%</SelectItem>
              <SelectItem value="60">60%</SelectItem>
              <SelectItem value="80">80%</SelectItem>
              <SelectItem value="100">100%</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>{t("npsAnnuityRate")}</Label>
          <Input
            type="number"
            step="0.1"
            value={annuityRate}
            onChange={(e) => setAnnuityRate(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="mt-2 space-y-4">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("npsCorpus")}</p>
            <p className="text-3xl font-bold text-primary">{fmtINR(result.corpus)}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("npsMonthlyPension")}: <strong>{fmtINR(result.monthlyPension)}</strong></p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("npsInvested")}</p>
              <p className="font-semibold text-sm">{fmtINR(result.totalInvested)}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("npsReturns")}</p>
              <p className="font-semibold text-sm text-green-700">{fmtINR(result.returns)}</p>
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-1 border-t pt-3">
            <div className="flex justify-between"><span>{t("npsLumpSum")}</span><span className="font-medium text-foreground">{fmtINR(result.lumpSum)}</span></div>
            <div className="flex justify-between"><span>{t("npsAnnuityCorpus")}</span><span className="font-medium text-foreground">{fmtINR(result.annuityCorpus)}</span></div>
            <div className="flex justify-between"><span>{t("npsYears")}</span><span>{result.years} {t("labelTermYears")}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
