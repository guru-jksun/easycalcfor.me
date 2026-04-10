"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Mode = "discount" | "reverse";

interface DiscountResult {
  discountAmount: number;
  finalPrice: number;
  savings: number;
  discountRate?: number;
}

function fmt(n: number): string {
  if (!isFinite(n)) return "Error";
  return parseFloat(n.toFixed(2)).toLocaleString();
}

export default function DiscountCalculatorClient() {
  const t = useTranslations("calculators");
  const [mode, setMode] = useState<Mode>("discount");
  const [originalPrice, setOriginalPrice] = useState("");
  const [percentage, setPercentage] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [result, setResult] = useState<DiscountResult | null>(null);

  const calculate = () => {
    if (mode === "discount") {
      const orig = parseFloat(originalPrice);
      const pct = parseFloat(percentage);
      if (isNaN(orig) || isNaN(pct)) return;
      const discountAmount = orig * (pct / 100);
      const final_ = orig - discountAmount;
      setResult({ discountAmount, finalPrice: final_, savings: discountAmount });
    } else {
      const orig = parseFloat(originalPrice);
      const final_ = parseFloat(finalPrice);
      if (isNaN(orig) || isNaN(final_) || orig === 0) return;
      const discountAmount = orig - final_;
      const rate = (discountAmount / orig) * 100;
      setResult({ discountAmount, finalPrice: final_, savings: discountAmount, discountRate: rate });
    }
  };

  const reset = () => {
    setOriginalPrice("");
    setPercentage("");
    setFinalPrice("");
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <div className="grid grid-cols-2 gap-1 mb-6 p-1 bg-muted rounded-xl">
        {([
          { key: "discount" as Mode, labelKey: "discPercentage" },
          { key: "reverse" as Mode, labelKey: "discReverseMode" },
        ]).map(({ key, labelKey }) => (
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
          <Label>{t("discOriginalPrice")}</Label>
          <Input
            type="number"
            placeholder="100000"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="mt-1"
          />
        </div>

        {mode === "discount" ? (
          <div>
            <Label>{t("discPercentage")} (%)</Label>
            <Input
              type="number"
              placeholder="20"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="mt-1"
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
        ) : (
          <div>
            <Label>{t("discFinalPrice")}</Label>
            <Input
              type="number"
              placeholder="80000"
              value={finalPrice}
              onChange={(e) => setFinalPrice(e.target.value)}
              className="mt-1"
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
          <Button variant="outline" onClick={reset}>{t("reset")}</Button>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-4 rounded-xl bg-primary/10 space-y-3">
          {result.discountRate !== undefined && (
            <div>
              <p className="text-sm text-muted-foreground">{t("discPercentage")}</p>
              <p className="text-2xl font-bold text-primary">{fmt(result.discountRate)}%</p>
            </div>
          )}
          <div>
            <p className="text-sm text-muted-foreground">{t("discSavings")}</p>
            <p className="text-2xl font-bold text-green-600">{fmt(result.savings)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t("discFinalPrice")}</p>
            <p className="text-4xl font-bold text-primary">{fmt(result.finalPrice)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
