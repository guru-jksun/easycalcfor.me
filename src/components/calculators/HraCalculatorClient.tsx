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

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

interface HraResult {
  condition1: number;
  condition2: number;
  condition3: number;
  exemption: number;
  taxableHra: number;
  minIndex: number;
}

function calcHra(
  basicSalary: number,
  hraReceived: number,
  rentPaid: number,
  isMetro: boolean
): HraResult {
  const condition1 = hraReceived;
  const condition2 = basicSalary * (isMetro ? 0.5 : 0.4);
  const condition3 = Math.max(0, rentPaid - basicSalary * 0.1);

  const exemption = Math.min(condition1, condition2, condition3);
  const taxableHra = hraReceived - exemption;

  let minIndex = 0;
  if (exemption === condition2) minIndex = 1;
  if (exemption === condition3) minIndex = 2;

  return { condition1, condition2, condition3, exemption, taxableHra, minIndex };
}

export default function HraCalculatorClient() {
  const t = useTranslations("calculators");
  const [basicSalary, setBasicSalary] = useState("");
  const [hraReceived, setHraReceived] = useState("");
  const [rentPaid, setRentPaid] = useState("");
  const [cityType, setCityType] = useState("metro");
  const [result, setResult] = useState<HraResult | null>(null);

  const calculate = () => {
    const basic = parseFloat(basicSalary);
    const hra = parseFloat(hraReceived);
    const rent = parseFloat(rentPaid);
    if (!basic || basic <= 0 || !hra || hra <= 0 || !rent || rent <= 0) return;
    setResult(calcHra(basic, hra, rent, cityType === "metro"));
  };

  const reset = () => {
    setBasicSalary("");
    setHraReceived("");
    setRentPaid("");
    setCityType("metro");
    setResult(null);
  };

  const conditionLabels = [
    t("hraCondition1"),
    t("hraCondition2"),
    t("hraCondition3"),
  ];

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("hraBasicSalary")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 50000`}
          value={basicSalary}
          onChange={(e) => setBasicSalary(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>{t("hraReceived")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 20000`}
          value={hraReceived}
          onChange={(e) => setHraReceived(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>{t("hraRentPaid")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 15000`}
          value={rentPaid}
          onChange={(e) => setRentPaid(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>{t("hraCityType")}</Label>
        <Select
          value={cityType}
          onValueChange={(v) => {
            if (v) setCityType(v);
            setResult(null);
          }}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="metro">{t("hraMetro")}</SelectItem>
            <SelectItem value="nonmetro">{t("hraNonMetro")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">
          {t("calculate")}
        </Button>
        <Button variant="outline" onClick={reset}>
          {t("reset")}
        </Button>
      </div>

      {result && (
        <div className="mt-2 space-y-4">
          {/* HRA Exemption */}
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">
              {t("hraExemption")}
            </p>
            <p className="text-3xl font-bold text-primary">
              {fmt(result.exemption)}
            </p>
          </div>

          {/* Taxable HRA */}
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-center">
            <p className="text-xs text-muted-foreground">
              {t("hraTaxableHra")}
            </p>
            <p className="font-semibold text-sm text-red-600">
              {fmt(result.taxableHra)}
            </p>
          </div>

          {/* Annual values */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">
                {t("hraAnnualExemption")}
              </p>
              <p className="font-semibold text-sm">
                {fmt(result.exemption * 12)}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-center">
              <p className="text-xs text-muted-foreground">
                {t("hraAnnualTaxable")}
              </p>
              <p className="font-semibold text-sm text-red-600">
                {fmt(result.taxableHra * 12)}
              </p>
            </div>
          </div>

          {/* Breakdown of 3 conditions */}
          <div className="border-t pt-3">
            <ul className="space-y-1.5">
              {[result.condition1, result.condition2, result.condition3].map(
                (value, idx) => (
                  <li
                    key={idx}
                    className={`flex justify-between text-sm ${
                      idx === result.minIndex
                        ? "font-bold text-primary"
                        : ""
                    }`}
                  >
                    <span
                      className={
                        idx === result.minIndex
                          ? ""
                          : "text-muted-foreground"
                      }
                    >
                      {conditionLabels[idx]}
                      {idx === result.minIndex && " *"}
                    </span>
                    <span className="font-medium">{fmt(value)}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
