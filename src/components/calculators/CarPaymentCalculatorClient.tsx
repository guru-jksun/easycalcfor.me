"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function CarPaymentCalculatorClient() {
  const t = useTranslations("calculators");
  const [tab, setTab] = useState<"payment" | "afford">("payment");

  // Tab 1: Calculate payment
  const [price, setPrice] = useState("");
  const [down, setDown] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("60");
  const [result1, setResult1] = useState<{ monthly: number; total: number; interest: number } | null>(null);

  // Tab 2: What can I afford?
  const [budget, setBudget] = useState("");
  const [affordRate, setAffordRate] = useState("");
  const [affordMonths, setAffordMonths] = useState("60");
  const [affordDown, setAffordDown] = useState("");
  const [result2, setResult2] = useState<{ maxPrice: number; loanAmount: number; totalCost: number } | null>(null);

  const calcPayment = () => {
    const P = (parseFloat(price) || 0) - (parseFloat(down) || 0);
    const r = (parseFloat(rate) || 0) / 12 / 100;
    const n = parseInt(months) || 60;
    if (P <= 0 || r <= 0) return;
    const monthly = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setResult1({ monthly, total: monthly * n + (parseFloat(down) || 0), interest: monthly * n - P });
  };

  const calcAfford = () => {
    const M = parseFloat(budget) || 0;
    const r = (parseFloat(affordRate) || 0) / 12 / 100;
    const n = parseInt(affordMonths) || 60;
    const d = parseFloat(affordDown) || 0;
    if (M <= 0 || r <= 0) return;
    const loanAmount = M * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
    setResult2({ maxPrice: loanAmount + d, loanAmount, totalCost: M * n + d });
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <Tabs value={tab} onValueChange={(v) => { setTab(v as "payment" | "afford"); }}>
        <TabsList className="w-full mb-5">
          <TabsTrigger value="payment" className="flex-1 text-xs">{t("carPaymentCalcPayment")}</TabsTrigger>
          <TabsTrigger value="afford" className="flex-1 text-xs">{t("carPaymentCalcAfford")}</TabsTrigger>
        </TabsList>

        <TabsContent value="payment">
          <div className="space-y-3">
            <div><Label className="text-xs">{t("autoLoanVehiclePrice")}</Label><Input type="number" placeholder="35000" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1" /></div>
            <div><Label className="text-xs">{t("autoLoanDownPayment")}</Label><Input type="number" placeholder="5000" value={down} onChange={(e) => setDown(e.target.value)} className="mt-1" /></div>
            <div><Label className="text-xs">{t("autoLoanInterestRate")}</Label><Input type="number" placeholder="5.9" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-1" /></div>
            <div><Label className="text-xs">{t("autoLoanTerm")}</Label><Input type="number" placeholder="60" value={months} onChange={(e) => setMonths(e.target.value)} className="mt-1" /></div>
            <Button onClick={calcPayment} className="w-full">{t("calculate")}</Button>
            {result1 && (
              <div className="space-y-3 mt-2">
                <div className="p-4 rounded-xl bg-primary/10">
                  <p className="text-sm text-muted-foreground mb-1">{t("autoLoanMonthlyPayment")}</p>
                  <p className="text-3xl font-bold text-primary">{fmt(result1.monthly)}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <p className="text-xs text-muted-foreground">{t("autoLoanTotalCost")}</p>
                    <p className="font-semibold text-xs">{fmt(result1.total)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-center">
                    <p className="text-xs text-muted-foreground">{t("autoLoanTotalInterest")}</p>
                    <p className="font-semibold text-xs text-red-600">{fmt(result1.interest)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="afford">
          <div className="space-y-3">
            <div><Label className="text-xs">{t("carPaymentBudget")}</Label><Input type="number" placeholder="500" value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-1" /></div>
            <div><Label className="text-xs">{t("autoLoanDownPayment")}</Label><Input type="number" placeholder="5000" value={affordDown} onChange={(e) => setAffordDown(e.target.value)} className="mt-1" /></div>
            <div><Label className="text-xs">{t("autoLoanInterestRate")}</Label><Input type="number" placeholder="5.9" value={affordRate} onChange={(e) => setAffordRate(e.target.value)} className="mt-1" /></div>
            <div><Label className="text-xs">{t("autoLoanTerm")}</Label><Input type="number" placeholder="60" value={affordMonths} onChange={(e) => setAffordMonths(e.target.value)} className="mt-1" /></div>
            <Button onClick={calcAfford} className="w-full">{t("calculate")}</Button>
            {result2 && (
              <div className="space-y-3 mt-2">
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/40">
                  <p className="text-sm text-muted-foreground mb-1">{t("carPaymentMaxPrice")}</p>
                  <p className="text-3xl font-bold text-green-600">{fmt(result2.maxPrice)}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <p className="text-xs text-muted-foreground">{t("autoLoanLoanAmount")}</p>
                    <p className="font-semibold text-xs">{fmt(result2.loanAmount)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <p className="text-xs text-muted-foreground">{t("autoLoanTotalCost")}</p>
                    <p className="font-semibold text-xs">{fmt(result2.totalCost)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
