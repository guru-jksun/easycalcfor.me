"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const GST_RATES = [5, 12, 18, 28];

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(n);
}

export default function GstCalculatorClient() {
  const t = useTranslations("calculators");
  const [tab, setTab] = useState<"add" | "remove">("add");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState<{
    originalAmount: number;
    gstAmount: number;
    cgst: number;
    sgst: number;
    totalAmount: number;
  } | null>(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    if (isNaN(a) || isNaN(r) || r < 0) return;

    if (tab === "add") {
      // Add GST: amount is original (exclusive)
      const gstAmount = a * (r / 100);
      const cgst = gstAmount / 2;
      const sgst = gstAmount / 2;
      setResult({ originalAmount: a, gstAmount, cgst, sgst, totalAmount: a + gstAmount });
    } else {
      // Remove GST: amount is total (inclusive)
      const originalAmount = a / (1 + r / 100);
      const gstAmount = a - originalAmount;
      const cgst = gstAmount / 2;
      const sgst = gstAmount / 2;
      setResult({ originalAmount, gstAmount, cgst, sgst, totalAmount: a });
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
          <TabsTrigger value="add" className="flex-1">{t("gstAddMode")}</TabsTrigger>
          <TabsTrigger value="remove" className="flex-1">{t("gstRemoveMode")}</TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          <div>
            <Label>{t("gstAmount")} (₹)</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 10000`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>{t("gstRate")}</Label>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {GST_RATES.map((r) => (
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
                <p className="text-sm text-muted-foreground mb-1">{t("gstTotalAmount")}</p>
                <p className="text-3xl font-bold text-primary">{fmt(result.totalAmount)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-muted/50 text-center">
                  <p className="text-xs text-muted-foreground">{t("gstOriginalAmount")}</p>
                  <p className="font-semibold text-sm">{fmt(result.originalAmount)}</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-center">
                  <p className="text-xs text-muted-foreground">{t("gstGstAmount")}</p>
                  <p className="font-semibold text-sm text-blue-600">{fmt(result.gstAmount)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-center">
                  <p className="text-xs text-muted-foreground">{t("gstCgst")}</p>
                  <p className="font-semibold text-sm text-green-600">{fmt(result.cgst)}</p>
                </div>
                <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-center">
                  <p className="text-xs text-muted-foreground">{t("gstSgst")}</p>
                  <p className="font-semibold text-sm text-orange-600">{fmt(result.sgst)}</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-3 font-mono">
                GST = {fmt(result.originalAmount)} × {rate}% = {fmt(result.gstAmount)}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="remove">
          {result && tab === "remove" && (
            <div className="mt-5 space-y-3">
              <div className="p-4 rounded-xl bg-primary/10">
                <p className="text-sm text-muted-foreground mb-1">{t("gstOriginalAmount")}</p>
                <p className="text-3xl font-bold text-primary">{fmt(result.originalAmount)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-muted/50 text-center">
                  <p className="text-xs text-muted-foreground">{t("gstTotalAmount")}</p>
                  <p className="font-semibold text-sm">{fmt(result.totalAmount)}</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-center">
                  <p className="text-xs text-muted-foreground">{t("gstGstAmount")}</p>
                  <p className="font-semibold text-sm text-blue-600">{fmt(result.gstAmount)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-center">
                  <p className="text-xs text-muted-foreground">{t("gstCgst")}</p>
                  <p className="font-semibold text-sm text-green-600">{fmt(result.cgst)}</p>
                </div>
                <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-center">
                  <p className="text-xs text-muted-foreground">{t("gstSgst")}</p>
                  <p className="font-semibold text-sm text-orange-600">{fmt(result.sgst)}</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-3 font-mono">
                Original = {fmt(result.totalAmount)} ÷ (1 + {rate}%/100) = {fmt(result.originalAmount)}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
