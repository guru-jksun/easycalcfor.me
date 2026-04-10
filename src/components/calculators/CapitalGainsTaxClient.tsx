"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type HoldingPeriod = "less1" | "1to2" | "over2";

interface Result {
  gain: number;
  taxableAmount: number;
  incomeTax: number;
  localTax: number;
  totalTax: number;
  longTermDeduction: number;
}

function fmtKRW(n: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(n);
}

// 양도소득세 누진세율 (2025년 기준)
const TAX_BRACKETS = [
  { max: 14000000, rate: 0.06, deduction: 0 },
  { max: 50000000, rate: 0.15, deduction: 1260000 },
  { max: 88000000, rate: 0.24, deduction: 5760000 },
  { max: 150000000, rate: 0.35, deduction: 15440000 },
  { max: 300000000, rate: 0.38, deduction: 19940000 },
  { max: 500000000, rate: 0.40, deduction: 25940000 },
  { max: 1000000000, rate: 0.42, deduction: 35940000 },
  { max: Infinity, rate: 0.45, deduction: 65940000 },
];

function calcProgressiveTax(taxable: number): number {
  if (taxable <= 0) return 0;
  for (const { max, rate, deduction } of TAX_BRACKETS) {
    if (taxable <= max) {
      return Math.max(0, taxable * rate - deduction);
    }
  }
  return 0;
}

function getLongTermDeductionRate(period: HoldingPeriod): number {
  // 장기보유특별공제 (2년 이상 보유 시 기본 공제율)
  if (period === "over2") return 0.06; // 연 3% x 2년 (최소)
  return 0;
}

export default function CapitalGainsTaxClient() {
  const t = useTranslations("calculators");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [expenses, setExpenses] = useState("");
  const [holdingPeriod, setHoldingPeriod] = useState<HoldingPeriod>("over2");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const buy = parseFloat(buyPrice);
    const sell = parseFloat(sellPrice);
    const exp = parseFloat(expenses) || 0;

    if (isNaN(buy) || isNaN(sell)) return;

    const gain = sell - buy - exp;
    if (gain <= 0) {
      setResult({ gain, taxableAmount: 0, incomeTax: 0, localTax: 0, totalTax: 0, longTermDeduction: 0 });
      return;
    }

    // 장기보유특별공제
    const ltdRate = getLongTermDeductionRate(holdingPeriod);
    const longTermDeduction = Math.round(gain * ltdRate);
    const afterDeduction = gain - longTermDeduction;

    // 기본공제 250만원
    const basicDeduction = 2500000;
    const taxableAmount = Math.max(0, afterDeduction - basicDeduction);

    // 보유기간에 따른 세율 적용
    let incomeTax: number;
    if (holdingPeriod === "less1") {
      // 1년 미만: 45% 단일세율 (비사업용 토지 등)
      incomeTax = Math.round(taxableAmount * 0.45);
    } else if (holdingPeriod === "1to2") {
      // 1~2년: 기본세율 (누진세율)
      incomeTax = Math.round(calcProgressiveTax(taxableAmount));
    } else {
      // 2년 이상: 기본세율 (누진세율)
      incomeTax = Math.round(calcProgressiveTax(taxableAmount));
    }

    const localTax = Math.round(incomeTax * 0.1);
    const totalTax = incomeTax + localTax;

    setResult({ gain, taxableAmount, incomeTax, localTax, totalTax, longTermDeduction });
  };

  const reset = () => {
    setBuyPrice("");
    setSellPrice("");
    setExpenses("");
    setHoldingPeriod("over2");
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("cgtBuyPrice")}</Label>
        <Input
          type="number"
          placeholder="300000000"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>{t("cgtSellPrice")}</Label>
        <Input
          type="number"
          placeholder="500000000"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>
          {t("cgtExpenses")}{" "}
          <span className="text-muted-foreground text-xs">({t("optional")})</span>
        </Label>
        <Input
          type="number"
          placeholder="5000000"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>{t("cgtHoldingPeriod")}</Label>
        <Select value={holdingPeriod} onValueChange={(v) => { setHoldingPeriod(v as HoldingPeriod); setResult(null); }}>
          <SelectTrigger className="mt-1 w-full">
            <SelectValue>{holdingPeriod === "less1" ? t("cgtLess1Year") : holdingPeriod === "1to2" ? t("cgt1to2Years") : t("cgtOver2Years")}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="less1">{t("cgtLess1Year")}</SelectItem>
            <SelectItem value="1to2">{t("cgt1to2Years")}</SelectItem>
            <SelectItem value="over2">{t("cgtOver2Years")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="space-y-3 mt-2">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("cgtTotalTax")}</p>
            <p className="text-3xl font-bold text-primary">
              {fmtKRW(result.totalTax)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("cgtGain")}</p>
              <p className={`font-semibold text-sm ${result.gain >= 0 ? "text-green-600" : "text-red-600"}`}>
                {fmtKRW(result.gain)}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("cgtTaxableAmount")}</p>
              <p className="font-semibold text-sm">{fmtKRW(result.taxableAmount)}</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("cgtIncomeTax")}</p>
              <p className="font-semibold text-sm">{fmtKRW(result.incomeTax)}</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("cgtLocalTax")}</p>
              <p className="font-semibold text-sm">{fmtKRW(result.localTax)}</p>
            </div>
          </div>
          {result.gain <= 0 && (
            <p className="text-xs text-muted-foreground bg-amber-50 dark:bg-amber-950/40 rounded-lg p-3 leading-relaxed">
              {t("cgtGain")}: {fmtKRW(result.gain)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
