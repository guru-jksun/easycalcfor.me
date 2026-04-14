"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
}

export default function PaycheckCalculatorClient() {
  const t = useTranslations("calculators");
  const [gross, setGross] = useState("");
  const [isAnnual, setIsAnnual] = useState(true);
  const [federalRate, setFederalRate] = useState("22");
  const [stateRate, setStateRate] = useState("5");
  const [ssRate, setSsRate] = useState("6.2");
  const [medicareRate, setMedicareRate] = useState("1.45");
  const [otherDeductions, setOtherDeductions] = useState("0");
  const [result, setResult] = useState<{ gross: number; federal: number; state: number; ss: number; medicare: number; other: number; net: number } | null>(null);

  const calculate = () => {
    const g = parseFloat(gross) || 0;
    if (!g) return;
    const annualGross = isAnnual ? g : g * 12;
    const federal = annualGross * (parseFloat(federalRate) || 0) / 100;
    const state = annualGross * (parseFloat(stateRate) || 0) / 100;
    const ss = annualGross * (parseFloat(ssRate) || 0) / 100;
    const medicare = annualGross * (parseFloat(medicareRate) || 0) / 100;
    const other = (parseFloat(otherDeductions) || 0) * 12;
    const net = annualGross - federal - state - ss - medicare - other;
    setResult({ gross: annualGross, federal, state, ss, medicare, other, net });
  };

  const reset = () => { setGross(""); setResult(null); };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <div className="flex items-center justify-between">
          <Label>{t("paycheckGrossSalary")}</Label>
          <div className="flex gap-1">
            <button type="button" onClick={() => setIsAnnual(true)} className={`text-xs px-2 py-0.5 rounded ${isAnnual ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{t("paycheckAnnual")}</button>
            <button type="button" onClick={() => setIsAnnual(false)} className={`text-xs px-2 py-0.5 rounded ${!isAnnual ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{t("paycheckMonthlyMode")}</button>
          </div>
        </div>
        <Input type="number" placeholder={isAnnual ? "75000" : "6250"} value={gross} onChange={(e) => setGross(e.target.value)} className="mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label className="text-xs">{t("paycheckFederalRate")}</Label><Input type="number" value={federalRate} onChange={(e) => setFederalRate(e.target.value)} className="mt-1" /></div>
        <div><Label className="text-xs">{t("paycheckStateRate")}</Label><Input type="number" value={stateRate} onChange={(e) => setStateRate(e.target.value)} className="mt-1" /></div>
        <div><Label className="text-xs">{t("paycheckSocialSecurity")}</Label><Input type="number" value={ssRate} onChange={(e) => setSsRate(e.target.value)} className="mt-1" /></div>
        <div><Label className="text-xs">{t("paycheckMedicare")}</Label><Input type="number" value={medicareRate} onChange={(e) => setMedicareRate(e.target.value)} className="mt-1" /></div>
      </div>
      <div><Label className="text-xs">{t("paycheckOtherDeductions")}</Label><Input type="number" value={otherDeductions} onChange={(e) => setOtherDeductions(e.target.value)} className="mt-1" /></div>
      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>
      {result && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/40">
            <p className="text-sm text-muted-foreground mb-1">{t("paycheckNetPay")}</p>
            <p className="text-3xl font-bold text-green-600">{fmt(result.net)}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("paycheckMonthlyNet")}: {fmt(result.net / 12)}</p>
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">{t("paycheckGrossPay")}</span><span className="font-medium">{fmt(result.gross)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t("paycheckFederalTax")}</span><span className="text-red-500">-{fmt(result.federal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t("paycheckStateTax")}</span><span className="text-red-500">-{fmt(result.state)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Social Security</span><span className="text-red-500">-{fmt(result.ss)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Medicare</span><span className="text-red-500">-{fmt(result.medicare)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
