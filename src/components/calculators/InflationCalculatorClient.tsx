"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
}

export default function InflationCalculatorClient() {
  const t = useTranslations("calculators");
  const [tab, setTab] = useState<"future" | "buying">("future");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("3");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{ adjusted: number; diff: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(amount) || 0;
    const r = parseFloat(rate) || 0;
    const y = parseFloat(years) || 0;
    if (!a || !y) return;
    const factor = Math.pow(1 + r / 100, y);
    if (tab === "future") {
      const fv = a * factor;
      setResult({ adjusted: fv, diff: fv - a });
    } else {
      const pv = a / factor;
      setResult({ adjusted: pv, diff: a - pv });
    }
  };

  const reset = () => { setAmount(""); setRate("3"); setYears(""); setResult(null); };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <Tabs value={tab} onValueChange={(v) => { setTab(v as "future" | "buying"); setResult(null); }}>
        <TabsList className="w-full mb-5">
          <TabsTrigger value="future" className="flex-1">{t("inflationFutureValue")}</TabsTrigger>
          <TabsTrigger value="buying" className="flex-1">{t("inflationBuyingPower")}</TabsTrigger>
        </TabsList>
        <div className="space-y-4">
          <div><Label>{t("inflationAmount")}</Label><Input type="number" placeholder="1000" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1" /></div>
          <div><Label>{t("inflationRate")}</Label><Input type="number" placeholder="3" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-1" /></div>
          <div><Label>{t("inflationYears")}</Label><Input type="number" placeholder="10" value={years} onChange={(e) => setYears(e.target.value)} className="mt-1" /></div>
          <div className="flex gap-2 pt-2">
            <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
            <Button variant="outline" onClick={reset}>{t("reset")}</Button>
          </div>
        </div>
        <TabsContent value="future">
          {result && tab === "future" && (
            <div className="mt-5 space-y-3">
              <div className="p-4 rounded-xl bg-primary/10">
                <p className="text-sm text-muted-foreground mb-1">{t("inflationAdjustedValue")}</p>
                <p className="text-3xl font-bold text-primary">{fmt(result.adjusted)}</p>
              </div>
              <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-center">
                <p className="text-xs text-muted-foreground">{t("inflationPowerGained")}</p>
                <p className="font-semibold text-sm text-orange-600">+{fmt(result.diff)}</p>
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="buying">
          {result && tab === "buying" && (
            <div className="mt-5 space-y-3">
              <div className="p-4 rounded-xl bg-primary/10">
                <p className="text-sm text-muted-foreground mb-1">{t("inflationAdjustedValue")}</p>
                <p className="text-3xl font-bold text-primary">{fmt(result.adjusted)}</p>
              </div>
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-center">
                <p className="text-xs text-muted-foreground">{t("inflationPowerLost")}</p>
                <p className="font-semibold text-sm text-red-600">-{fmt(result.diff)}</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
