"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Result {
  jeonseMonthlyCost: number;
  wolseMonthlyCost: number;
  difference: number;
  betterOption: "jeonse" | "wolse";
}

function fmtKRW(n: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function RentCompareClient() {
  const t = useTranslations("calculators");
  const [jeonseDeposit, setJeonseDeposit] = useState("");
  const [wolseDeposit, setWolseDeposit] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [interestRate, setInterestRate] = useState("3.5");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const jd = parseFloat(jeonseDeposit);
    const wd = parseFloat(wolseDeposit);
    const mr = parseFloat(monthlyRent);
    const rate = parseFloat(interestRate);

    if (isNaN(jd) || isNaN(wd) || isNaN(mr) || isNaN(rate)) return;

    const jeonseMonthlyCost = (jd * (rate / 100)) / 12;
    const wolseMonthlyCost = mr + (wd * (rate / 100)) / 12;
    const difference = Math.abs(jeonseMonthlyCost - wolseMonthlyCost);
    const betterOption = jeonseMonthlyCost <= wolseMonthlyCost ? "jeonse" : "wolse";

    setResult({ jeonseMonthlyCost, wolseMonthlyCost, difference, betterOption });
  };

  const reset = () => {
    setJeonseDeposit("");
    setWolseDeposit("");
    setMonthlyRent("");
    setInterestRate("3.5");
    setResult(null);
  };

  const maxCost = result
    ? Math.max(result.jeonseMonthlyCost, result.wolseMonthlyCost)
    : 0;

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("rentJeonse")} ({t("rentDeposit")})</Label>
        <Input
          type="number"
          placeholder="300000000"
          value={jeonseDeposit}
          onChange={(e) => setJeonseDeposit(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>{t("rentWolse")} ({t("rentDeposit")})</Label>
        <Input
          type="number"
          placeholder="50000000"
          value={wolseDeposit}
          onChange={(e) => setWolseDeposit(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>{t("rentMonthlyRent")}</Label>
        <Input
          type="number"
          placeholder="800000"
          value={monthlyRent}
          onChange={(e) => setMonthlyRent(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>{t("rentOpportunityCost")} (%)</Label>
        <Input
          type="number"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="space-y-3 mt-2">
          <div className={`p-4 rounded-xl ${result.betterOption === "jeonse" ? "bg-blue-50 dark:bg-blue-950/40" : "bg-green-50 dark:bg-green-950/40"}`}>
            <p className="text-sm text-muted-foreground mb-1">
              {result.betterOption === "jeonse" ? t("rentJeonse") : t("rentWolse")}
            </p>
            <p className="text-2xl font-bold text-primary">
              {fmtKRW(result.difference)} {t("rentDifference")}
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>{t("rentJeonseCost")}</span>
                <span className="font-semibold">{fmtKRW(result.jeonseMonthlyCost)}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all"
                  style={{ width: `${maxCost > 0 ? (result.jeonseMonthlyCost / maxCost) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>{t("rentWolseCost")}</span>
                <span className="font-semibold">{fmtKRW(result.wolseMonthlyCost)}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all"
                  style={{ width: `${maxCost > 0 ? (result.wolseMonthlyCost / maxCost) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
