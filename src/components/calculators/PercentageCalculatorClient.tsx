"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Mode = "xPercentOfY" | "xIsWhatPercentOfY" | "percentChange" | "xPlusYPercent";

interface Result {
  value: number;
  label: string;
}

function fmt(n: number): string {
  if (!isFinite(n)) return "Error";
  return parseFloat(n.toFixed(8)).toString();
}

export default function PercentageCalculatorClient() {
  const t = useTranslations("calculators");
  const [mode, setMode] = useState<Mode>("xPercentOfY");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const MODES: { key: Mode; labelKey: "pctMode1" | "pctMode2" | "pctMode3" | "pctMode4" }[] = [
    { key: "xPercentOfY",       labelKey: "pctMode1" },
    { key: "xIsWhatPercentOfY", labelKey: "pctMode2" },
    { key: "percentChange",     labelKey: "pctMode3" },
    { key: "xPlusYPercent",     labelKey: "pctMode4" },
  ];

  const calculate = () => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return;

    switch (mode) {
      case "xPercentOfY":
        setResult({ value: (x / 100) * y, label: `${x}% of ${y}` });
        break;
      case "xIsWhatPercentOfY":
        if (y === 0) return;
        setResult({ value: (x / y) * 100, label: `${x} / ${y} × 100` });
        break;
      case "percentChange":
        if (x === 0) return;
        setResult({ value: ((y - x) / Math.abs(x)) * 100, label: `${x} → ${y}` });
        break;
      case "xPlusYPercent":
        setResult({ value: x + (x * y) / 100, label: `${x} + ${y}%` });
        break;
    }
  };

  const reset = () => { setA(""); setB(""); setResult(null); };

  type LabelKey = "pctLabelPercentage" | "pctLabelNumber" | "pctLabelValue" | "pctLabelTotal" | "pctLabelFrom" | "pctLabelTo" | "pctLabelAddPercent";
  const modeConfig: Record<Mode, { aKey: LabelKey; bKey: LabelKey; aPlaceholder: string; bPlaceholder: string }> = {
    xPercentOfY:       { aKey: "pctLabelPercentage", bKey: "pctLabelNumber",     aPlaceholder: `${t("egPrefix")} 15`,  bPlaceholder: `${t("egPrefix")} 200` },
    xIsWhatPercentOfY: { aKey: "pctLabelValue",       bKey: "pctLabelTotal",      aPlaceholder: `${t("egPrefix")} 30`,  bPlaceholder: `${t("egPrefix")} 150` },
    percentChange:     { aKey: "pctLabelFrom",         bKey: "pctLabelTo",         aPlaceholder: `${t("egPrefix")} 80`,  bPlaceholder: `${t("egPrefix")} 100` },
    xPlusYPercent:     { aKey: "pctLabelNumber",       bKey: "pctLabelAddPercent", aPlaceholder: `${t("egPrefix")} 500`, bPlaceholder: `${t("egPrefix")} 20`  },
  };

  const cfg = modeConfig[mode];
  const isPercentResult = mode === "xIsWhatPercentOfY" || mode === "percentChange";

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      {/* Mode selector */}
      <div className="grid grid-cols-2 gap-1 mb-6 p-1 bg-muted rounded-xl">
        {MODES.map(({ key, labelKey }) => (
          <button
            key={key}
            onClick={() => { setMode(key); setResult(null); }}
            className={cn(
              "text-xs py-2 px-1 rounded-lg text-center transition-colors leading-tight",
              mode === key
                ? "bg-background text-foreground shadow-sm font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <Label>{t(cfg.aKey)}</Label>
          <Input
            type="number"
            placeholder={cfg.aPlaceholder}
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label>{t(cfg.bKey)}</Label>
          <Input
            type="number"
            placeholder={cfg.bPlaceholder}
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="mt-1"
            onKeyDown={(e) => e.key === "Enter" && calculate()}
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
          <Button variant="outline" onClick={reset}>{t("reset")}</Button>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-4 rounded-xl bg-primary/10">
          <p className="text-sm text-muted-foreground mb-1">{result.label}</p>
          <p className="text-4xl font-bold text-primary">
            {fmt(result.value)}{isPercentResult ? "%" : ""}
          </p>
          {mode === "percentChange" && (
            <p className={cn("text-sm mt-2 font-medium", result.value > 0 ? "text-green-600" : result.value < 0 ? "text-red-600" : "text-muted-foreground")}>
              {result.value > 0 ? "▲ Increase" : result.value < 0 ? "▼ Decrease" : "No change"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
