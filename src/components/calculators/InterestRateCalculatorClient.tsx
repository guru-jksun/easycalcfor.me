"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Mode = "find-rate" | "simple-interest";

interface FindRateResult {
  rate: number;
  effectiveRate: number;
}

interface SimpleInterestResult {
  interest: number;
  totalAmount: number;
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
}

export default function InterestRateCalculatorClient() {
  const t = useTranslations("calculators");

  const COMPOUND_OPTIONS = [
    { value: "365", label: t("freqDaily") },
    { value: "52", label: t("freqWeekly") },
    { value: "12", label: t("freqMonthly") },
    { value: "4", label: t("freqQuarterly") },
    { value: "2", label: t("freqSemiAnnually") },
    { value: "1", label: t("freqAnnually") },
  ];

  const [mode, setMode] = useState<Mode>("find-rate");

  // Find Rate inputs
  const [principal, setPrincipal] = useState("");
  const [futureValue, setFutureValue] = useState("");
  const [time, setTime] = useState("");
  const [compounding, setCompounding] = useState("12");

  // Simple Interest inputs
  const [siPrincipal, setSiPrincipal] = useState("");
  const [siRate, setSiRate] = useState("");
  const [siTime, setSiTime] = useState("");

  const [findRateResult, setFindRateResult] = useState<FindRateResult | null>(null);
  const [simpleResult, setSimpleResult] = useState<SimpleInterestResult | null>(null);

  const calculateFindRate = () => {
    const P = parseFloat(principal);
    const FV = parseFloat(futureValue);
    const t = parseFloat(time);
    const n = parseFloat(compounding);

    if (!P || !FV || !t) return;

    // FV = P(1 + r/n)^(nt)  => r = n * [(FV/P)^(1/(nt)) - 1]
    const r = n * (Math.pow(FV / P, 1 / (n * t)) - 1);
    // Effective annual rate
    const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;

    setFindRateResult({ rate: r * 100, effectiveRate });
  };

  const calculateSimpleInterest = () => {
    const P = parseFloat(siPrincipal);
    const r = parseFloat(siRate) / 100;
    const t = parseFloat(siTime);

    if (!P || !r || !t) return;

    // I = Prt
    const interest = P * r * t;
    setSimpleResult({ interest, totalAmount: P + interest });
  };

  const resetFindRate = () => {
    setPrincipal("");
    setFutureValue("");
    setTime("");
    setCompounding("12");
    setFindRateResult(null);
  };

  const resetSimple = () => {
    setSiPrincipal("");
    setSiRate("");
    setSiTime("");
    setSimpleResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      {/* Mode toggle */}
      <div className="flex rounded-lg bg-muted p-1 gap-1">
        {(["find-rate", "simple-interest"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-colors ${
              mode === m
                ? "bg-background shadow text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m === "find-rate" ? t("modeFindRate") : t("modeSimpleInterest")}
          </button>
        ))}
      </div>

      {mode === "find-rate" && (
        <>
          <div>
            <Label>{t("labelPrincipalDollar")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 10000`}
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>{t("labelFutureValueDollar")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 15000`}
              value={futureValue}
              onChange={(e) => setFutureValue(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>{t("labelTimeYears")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 5`}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>{t("labelCompoundingFreq")}</Label>
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
            <Button onClick={calculateFindRate} className="flex-1">{t("calculate")}</Button>
            <Button variant="outline" onClick={resetFindRate}>{t("reset")}</Button>
          </div>

          {findRateResult && (
            <div className="mt-2 space-y-3">
              <div className="p-4 rounded-xl bg-primary/10">
                <p className="text-sm text-muted-foreground mb-1">{t("resNominalRate")}</p>
                <p className="text-3xl font-bold text-primary">{findRateResult.rate.toFixed(4)}%</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground">{t("resEffectiveRate")}</p>
                <p className="font-semibold text-sm">{findRateResult.effectiveRate.toFixed(4)}%</p>
              </div>
            </div>
          )}
        </>
      )}

      {mode === "simple-interest" && (
        <>
          <div>
            <Label>{t("labelPrincipalDollar")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 1000`}
              value={siPrincipal}
              onChange={(e) => setSiPrincipal(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>{t("labelAnnualRate")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 5`}
              value={siRate}
              onChange={(e) => setSiRate(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>{t("labelTimeYears")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 3`}
              value={siTime}
              onChange={(e) => setSiTime(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={calculateSimpleInterest} className="flex-1">{t("calculate")}</Button>
            <Button variant="outline" onClick={resetSimple}>{t("reset")}</Button>
          </div>

          {simpleResult && (
            <div className="mt-2 space-y-3">
              <div className="p-4 rounded-xl bg-primary/10">
                <p className="text-sm text-muted-foreground mb-1">{t("resSimpleInterestFormula")}</p>
                <p className="text-3xl font-bold text-primary">{fmt(simpleResult.interest)}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground">{t("resTotalAmount")}</p>
                <p className="font-semibold text-sm">{fmt(simpleResult.totalAmount)}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
