"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
}

type PayType = "hourly" | "daily" | "weekly" | "monthly" | "annual";

const LABELS: Record<PayType, string> = {
  hourly: "payCalcHourly",
  daily: "payCalcDaily",
  weekly: "payCalcWeekly",
  monthly: "payCalcMonthly",
  annual: "payCalcAnnual",
};

export default function PayCalculatorClient() {
  const t = useTranslations("calculators");
  const [payType, setPayType] = useState<PayType>("hourly");
  const [amount, setAmount] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [taxRate, setTaxRate] = useState("25");
  const [result, setResult] = useState<Record<PayType, number> | null>(null);
  const [netResult, setNetResult] = useState<{ gross: number; tax: number; net: number } | null>(null);

  const calculate = () => {
    const val = parseFloat(amount) || 0;
    const hpw = parseFloat(hoursPerWeek) || 40;
    const tax = parseFloat(taxRate) || 0;
    if (!val) return;

    let annual = 0;
    switch (payType) {
      case "hourly": annual = val * hpw * 52; break;
      case "daily": annual = val * 5 * 52; break;
      case "weekly": annual = val * 52; break;
      case "monthly": annual = val * 12; break;
      case "annual": annual = val; break;
    }

    setResult({
      hourly: annual / 52 / hpw,
      daily: annual / 260,
      weekly: annual / 52,
      monthly: annual / 12,
      annual,
    });

    const grossMonthly = annual / 12;
    const taxAmount = grossMonthly * tax / 100;
    setNetResult({ gross: grossMonthly, tax: taxAmount, net: grossMonthly - taxAmount });
  };

  const reset = () => { setAmount(""); setResult(null); setNetResult(null); };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label className="text-xs">{t("payCalcInputType")}</Label>
        <div className="flex flex-wrap gap-1 mt-1.5">
          {(["hourly", "daily", "weekly", "monthly", "annual"] as PayType[]).map((p) => (
            <button key={p} type="button" onClick={() => { setPayType(p); setResult(null); }}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${payType === p ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-transparent"}`}>
              {t(LABELS[p])}
            </button>
          ))}
        </div>
      </div>
      <div><Label className="text-xs">{t(LABELS[payType])} ($)</Label><Input type="number" placeholder={payType === "hourly" ? "25" : payType === "annual" ? "60000" : "1000"} value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1" /></div>
      {payType === "hourly" && (
        <div><Label className="text-xs">{t("payCalcHoursPerWeek")}</Label><Input type="number" placeholder="40" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} className="mt-1" /></div>
      )}
      <div><Label className="text-xs">{t("payCalcTaxRate")}</Label><Input type="number" placeholder="25" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="mt-1" /></div>
      <div className="flex gap-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>
      {result && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            {(["hourly", "daily", "weekly", "monthly", "annual"] as PayType[]).map((p) => (
              <div key={p} className={`flex justify-between text-sm p-2 rounded-lg ${p === payType ? "bg-primary/10 font-bold text-primary" : ""}`}>
                <span className="text-muted-foreground">{t(LABELS[p])}</span>
                <span>{fmt(result[p])}</span>
              </div>
            ))}
          </div>
          {netResult && (
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/40">
              <p className="text-sm text-muted-foreground mb-1">{t("paycheckNetPay")} ({t("paycheckMonthlyMode")})</p>
              <p className="text-2xl font-bold text-green-600">{fmt(netResult.net)}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("paycheckGrossPay")}: {fmt(netResult.gross)} | {t("payCalcTaxRate")}: {fmt(netResult.tax)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
