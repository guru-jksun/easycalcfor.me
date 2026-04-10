"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const COMMON_RATES = [5, 8, 10, 15, 20, 25];

function fmtCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function fmtNumber(n: number) {
  return parseFloat(n.toFixed(4)).toString();
}

export default function SalesTaxCalculatorClient() {
  const t = useTranslations("calculators");
  const [tab, setTab] = useState<"add" | "remove">("add");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState<{ taxAmount: number; total: number; preTax?: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    if (isNaN(a) || isNaN(r) || r < 0) return;

    if (tab === "add") {
      const taxAmount = a * (r / 100);
      setResult({ taxAmount, total: a + taxAmount });
    } else {
      // Remove tax: given total (tax-inclusive), find pre-tax
      const preTax = a / (1 + r / 100);
      const taxAmount = a - preTax;
      setResult({ taxAmount, total: a, preTax });
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
          <TabsTrigger value="add" className="flex-1">Add Tax</TabsTrigger>
          <TabsTrigger value="remove" className="flex-1">Remove Tax</TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          <div>
            <Label>{tab === "add" ? t("stPreTaxAmount") : t("stTotalInclTax")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 100`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>{t("stTaxRate")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 10`}
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="mt-1"
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
            {/* Quick-select buttons */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {COMMON_RATES.map((r) => (
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
                <p className="text-sm text-muted-foreground mb-1">Total Price (incl. tax)</p>
                <p className="text-3xl font-bold text-primary">{fmtCurrency(result.total)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-muted/50 text-center">
                  <p className="text-xs text-muted-foreground">Pre-tax Amount</p>
                  <p className="font-semibold text-sm">{fmtCurrency(parseFloat(amount))}</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-center">
                  <p className="text-xs text-muted-foreground">Tax Amount</p>
                  <p className="font-semibold text-sm text-amber-600">{fmtCurrency(result.taxAmount)}</p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="remove">
          {result && tab === "remove" && result.preTax !== undefined && (
            <div className="mt-5 space-y-3">
              <div className="p-4 rounded-xl bg-primary/10">
                <p className="text-sm text-muted-foreground mb-1">Pre-tax Price</p>
                <p className="text-3xl font-bold text-primary">{fmtCurrency(result.preTax)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-muted/50 text-center">
                  <p className="text-xs text-muted-foreground">Total (incl. tax)</p>
                  <p className="font-semibold text-sm">{fmtCurrency(result.total)}</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-center">
                  <p className="text-xs text-muted-foreground">Tax Amount</p>
                  <p className="font-semibold text-sm text-amber-600">{fmtCurrency(result.taxAmount)}</p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
