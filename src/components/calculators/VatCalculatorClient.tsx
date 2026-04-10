"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const EU_VAT_RATES = [5, 10, 12, 15, 19, 20, 21, 23, 25];

function fmtCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export default function VatCalculatorClient() {
  const t = useTranslations("calculators");
  const [tab, setTab] = useState<"add" | "remove">("add");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState<{
    vatAmount: number;
    grossAmount: number;
    netAmount: number;
  } | null>(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    if (isNaN(a) || isNaN(r) || r < 0) return;

    if (tab === "add") {
      // Exclusive VAT: net → gross
      const vatAmount = a * (r / 100);
      setResult({ vatAmount, netAmount: a, grossAmount: a + vatAmount });
    } else {
      // Inclusive VAT: gross → net
      const netAmount = a / (1 + r / 100);
      const vatAmount = a - netAmount;
      setResult({ vatAmount, netAmount, grossAmount: a });
    }
  };

  const reset = () => {
    setAmount("");
    setRate("");
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <Tabs value={tab} onValueChange={(v) => { setTab(v as "add" | "remove"); setResult(null); }}>
        <TabsList className="w-full mb-5">
          <TabsTrigger value="add" className="flex-1">Add VAT</TabsTrigger>
          <TabsTrigger value="remove" className="flex-1">Remove VAT</TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          <div>
            <Label>{tab === "add" ? t("vatNetAmount") : t("vatGrossAmount")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 100`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>VAT Rate (%)</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 20`}
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="mt-1"
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {EU_VAT_RATES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => { setRate(String(r)); setResult(null); }}
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-full border transition-colors",
                    rate === String(r)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground hover:text-foreground border-transparent"
                  )}
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
            <Button variant="outline" onClick={reset}>{t("reset")}</Button>
          </div>
        </div>

        <TabsContent value="add">
          {result && tab === "add" && (
            <div className="mt-5 space-y-3">
              <div className="p-4 rounded-xl bg-primary/10">
                <p className="text-sm text-muted-foreground mb-1">Gross Amount (incl. VAT)</p>
                <p className="text-3xl font-bold text-primary">{fmtCurrency(result.grossAmount)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-muted/50 text-center">
                  <p className="text-xs text-muted-foreground">Net Amount</p>
                  <p className="font-semibold text-sm">{fmtCurrency(result.netAmount)}</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-center">
                  <p className="text-xs text-muted-foreground">VAT Amount</p>
                  <p className="font-semibold text-sm text-blue-600">{fmtCurrency(result.vatAmount)}</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-3 font-mono">
                VAT = {fmtCurrency(result.netAmount)} × {rate}% = {fmtCurrency(result.vatAmount)}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="remove">
          {result && tab === "remove" && (
            <div className="mt-5 space-y-3">
              <div className="p-4 rounded-xl bg-primary/10">
                <p className="text-sm text-muted-foreground mb-1">Net Amount (excl. VAT)</p>
                <p className="text-3xl font-bold text-primary">{fmtCurrency(result.netAmount)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-muted/50 text-center">
                  <p className="text-xs text-muted-foreground">Gross Amount</p>
                  <p className="font-semibold text-sm">{fmtCurrency(result.grossAmount)}</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-center">
                  <p className="text-xs text-muted-foreground">VAT Amount</p>
                  <p className="font-semibold text-sm text-blue-600">{fmtCurrency(result.vatAmount)}</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-3 font-mono">
                Net = {fmtCurrency(result.grossAmount)} ÷ (1 + {rate}%/100) = {fmtCurrency(result.netAmount)}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
