"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Result {
  roi: number;
  netProfit: number;
  annualizedRoi: number | null;
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
}

function fmtPct(n: number) {
  return n.toFixed(2) + "%";
}

export default function RoiCalculatorClient() {
  const t = useTranslations("calculators");
  const [initialInvestment, setInitialInvestment] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);

    if (!initial || isNaN(final)) return;

    // ROI = (Final Value - Initial Investment) / Initial Investment × 100
    const netProfit = final - initial;
    const roi = (netProfit / initial) * 100;

    let annualizedRoi: number | null = null;
    const years = parseFloat(timePeriod);
    if (years > 0) {
      // Annualized ROI = (Final/Initial)^(1/years) - 1
      annualizedRoi = (Math.pow(final / initial, 1 / years) - 1) * 100;
    }

    setResult({ roi, netProfit, annualizedRoi });
  };

  const reset = () => {
    setInitialInvestment("");
    setFinalValue("");
    setTimePeriod("");
    setResult(null);
  };

  const isPositive = result ? result.roi >= 0 : true;

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("labelInitialInvestment")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 10000`}
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label>{t("labelFinalValue")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 15000`}
          value={finalValue}
          onChange={(e) => setFinalValue(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label>
          {t("labelTimePeriod")}{" "}
          <span className="text-muted-foreground text-xs">{t("optForAnnualized")}</span>
        </Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 3`}
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="mt-2 space-y-4">
          <div className={`p-4 rounded-xl ${isPositive ? "bg-green-50 dark:bg-green-950/40" : "bg-red-50 dark:bg-red-950/40"}`}>
            <p className="text-sm text-muted-foreground mb-1">{t("resRoi")}</p>
            <p className={`text-3xl font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {isPositive ? "+" : ""}{fmtPct(result.roi)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("resNetProfit")}</p>
              <p className={`font-semibold text-sm ${result.netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                {result.netProfit >= 0 ? "+" : ""}{fmt(result.netProfit)}
              </p>
            </div>
            {result.annualizedRoi !== null && (
              <div className="p-3 rounded-xl bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground">{t("resAnnualizedRoi")}</p>
                <p className={`font-semibold text-sm ${result.annualizedRoi >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {result.annualizedRoi >= 0 ? "+" : ""}{fmtPct(result.annualizedRoi)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
