"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const TIP_PRESETS = [10, 15, 18, 20, 25];

function fmt(n: number): string {
  if (!isFinite(n)) return "Error";
  return parseFloat(n.toFixed(2)).toLocaleString();
}

export default function TipCalculatorClient() {
  const t = useTranslations("calculators");
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [customTip, setCustomTip] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [people, setPeople] = useState("1");
  const [result, setResult] = useState<{ tipAmount: number; total: number; perPerson: number } | null>(null);

  const calculate = () => {
    const bill = parseFloat(billAmount);
    const tip = isCustom ? parseFloat(customTip) : tipPercent;
    const ppl = parseInt(people) || 1;
    if (isNaN(bill) || isNaN(tip)) return;

    const tipAmount = bill * (tip / 100);
    const total = bill + tipAmount;
    const perPerson = total / ppl;
    setResult({ tipAmount, total, perPerson });
  };

  const reset = () => {
    setBillAmount("");
    setTipPercent(15);
    setCustomTip("");
    setIsCustom(false);
    setPeople("1");
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <div className="space-y-4">
        <div>
          <Label>{t("tipBillAmount")}</Label>
          <Input
            type="number"
            placeholder="50000"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label>{t("tipPercentage")} (%)</Label>
          <div className="grid grid-cols-3 gap-1 mt-1 p-1 bg-muted rounded-xl">
            {TIP_PRESETS.map((pct) => (
              <button
                key={pct}
                onClick={() => { setTipPercent(pct); setIsCustom(false); }}
                className={cn(
                  "text-xs py-2 rounded-lg transition-colors",
                  !isCustom && tipPercent === pct
                    ? "bg-background text-foreground shadow-sm font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {pct}%
              </button>
            ))}
            <button
              onClick={() => setIsCustom(true)}
              className={cn(
                "text-xs py-2 rounded-lg transition-colors",
                isCustom
                  ? "bg-background text-foreground shadow-sm font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t("tipCustom")}
            </button>
          </div>
          {isCustom && (
            <Input
              type="number"
              placeholder="12"
              value={customTip}
              onChange={(e) => setCustomTip(e.target.value)}
              className="mt-2"
            />
          )}
        </div>

        <div>
          <Label>{t("tipPeople")}</Label>
          <Input
            type="number"
            min="1"
            placeholder="1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
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
        <div className="mt-6 p-4 rounded-xl bg-primary/10 space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">{t("tipAmount")}</p>
            <p className="text-2xl font-bold text-primary">{fmt(result.tipAmount)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t("tipTotal")}</p>
            <p className="text-4xl font-bold text-primary">{fmt(result.total)}</p>
          </div>
          {parseInt(people) > 1 && (
            <div>
              <p className="text-sm text-muted-foreground">{t("tipPerPerson")}</p>
              <p className="text-2xl font-bold text-green-600">{fmt(result.perPerson)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
