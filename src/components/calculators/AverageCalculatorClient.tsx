"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Result {
  mean: number;
  median: number;
  mode: string;
  range: number;
  sum: number;
  count: number;
  min: number;
  max: number;
}

export default function AverageCalculatorClient() {
  const t = useTranslations("calculators");
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const nums = numbers
      .split(",")
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));
    if (nums.length === 0) return;

    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median =
      sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;

    const freq: Record<number, number> = {};
    nums.forEach((n) => (freq[n] = (freq[n] || 0) + 1));
    const maxFreq = Math.max(...Object.values(freq));
    const modes =
      maxFreq === 1
        ? "—"
        : Object.entries(freq)
            .filter(([, v]) => v === maxFreq)
            .map(([k]) => k)
            .join(", ");

    setResult({
      mean,
      median,
      mode: modes,
      range: sorted[sorted.length - 1] - sorted[0],
      sum,
      count: nums.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
    });
  };

  const reset = () => {
    setNumbers("");
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("avgNumbers")}</Label>
        <Input
          placeholder="1, 2, 3, 4, 5"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>
      {result && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("avgMean")}</p>
            <p className="text-3xl font-bold text-primary">{result.mean.toFixed(4)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("avgMedian")}</p>
              <p className="font-semibold text-sm">{result.median}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("avgMode")}</p>
              <p className="font-semibold text-sm text-blue-600">{result.mode}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("avgRange")}</p>
              <p className="font-semibold text-sm text-green-600">{result.range}</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("avgSum")}</p>
              <p className="font-semibold text-sm text-orange-600">{result.sum}</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("avgCount")}</p>
              <p className="font-semibold text-sm">{result.count}</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("avgMin")} / {t("avgMax")}</p>
              <p className="font-semibold text-sm">{result.min} / {result.max}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
