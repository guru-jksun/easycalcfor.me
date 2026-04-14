"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const UNITS = [
  { key: "goldGrams", factor: 1 / 31.1035 },
  { key: "goldOunces", factor: 1 },
  { key: "goldTola", factor: 11.664 / 31.1035 },
  { key: "goldKg", factor: 1000 / 31.1035 },
];

const KARATS = [24, 22, 18, 14, 10];

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
}

export default function GoldCalculatorClient() {
  const t = useTranslations("calculators");
  const [weight, setWeight] = useState("");
  const [unitIdx, setUnitIdx] = useState(0);
  const [karat, setKarat] = useState(24);
  const [price, setPrice] = useState("2350");
  const [result, setResult] = useState<{ value: number; pureWeight: number } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight) || 0;
    const p = parseFloat(price) || 0;
    if (!w || !p) return;
    const ozWeight = w * UNITS[unitIdx].factor;
    const purity = karat / 24;
    setResult({ value: ozWeight * p * purity, pureWeight: ozWeight * purity * 31.1035 });
  };

  const reset = () => { setWeight(""); setPrice("2350"); setResult(null); };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div><Label>{t("goldWeight")}</Label><Input type="number" placeholder="100" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-1" /></div>
      <div>
        <Label>{t("goldUnit")}</Label>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {UNITS.map((u, i) => (
            <button key={i} type="button" onClick={() => { setUnitIdx(i); setResult(null); }}
              className={cn("text-xs px-2.5 py-1 rounded-full border transition-colors", unitIdx === i ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground hover:text-foreground border-transparent")}>
              {t(u.key as never)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label>{t("goldPurity")}</Label>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {KARATS.map((k) => (
            <button key={k} type="button" onClick={() => { setKarat(k); setResult(null); }}
              className={cn("text-xs px-2.5 py-1 rounded-full border transition-colors", karat === k ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground hover:text-foreground border-transparent")}>
              {k}K
            </button>
          ))}
        </div>
      </div>
      <div><Label>{t("goldPricePerOz")}</Label><Input type="number" placeholder="2350" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1" /></div>
      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>
      {result && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-950/40">
            <p className="text-sm text-muted-foreground mb-1">{t("goldValue")}</p>
            <p className="text-3xl font-bold text-yellow-600">{fmt(result.value)}</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/50 text-center">
            <p className="text-xs text-muted-foreground">{t("goldPureWeight")}</p>
            <p className="font-semibold text-sm">{result.pureWeight.toFixed(2)} g</p>
          </div>
        </div>
      )}
    </div>
  );
}
