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

type HouseCount = "1" | "2" | "3" | "corp";
type AreaType = "small" | "large";

interface Result {
  acquisitionTax: number;
  agriTax: number;
  educationTax: number;
  totalTax: number;
  taxRate: number;
}

function fmtKRW(n: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(n);
}

function getAcquisitionTaxRate(price: number, houseCount: HouseCount): number {
  if (houseCount === "2") return 0.08;
  if (houseCount === "3" || houseCount === "corp") return 0.12;

  // 1주택
  if (price <= 600000000) return 0.01;
  if (price > 900000000) return 0.03;

  // 6억~9억: 누진세율 (1%~3%)
  const ratio = (price - 600000000) / 300000000;
  return 0.01 + ratio * 0.02;
}

export default function AcquisitionTaxClient() {
  const t = useTranslations("calculators");
  const [housePrice, setHousePrice] = useState("");
  const [houseCount, setHouseCount] = useState<HouseCount>("1");
  const [area, setArea] = useState<AreaType>("small");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const price = parseFloat(housePrice);
    if (isNaN(price) || price <= 0) return;

    const taxRate = getAcquisitionTaxRate(price, houseCount);
    const acquisitionTax = Math.round(price * taxRate);
    const agriTax = Math.round(price * 0.002);
    const educationTax = Math.round(acquisitionTax * 0.1);
    const totalTax = acquisitionTax + agriTax + educationTax;

    setResult({ acquisitionTax, agriTax, educationTax, totalTax, taxRate });
  };

  const reset = () => {
    setHousePrice("");
    setHouseCount("1");
    setArea("small");
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("atHousePrice")}</Label>
        <Input
          type="number"
          placeholder="500000000"
          value={housePrice}
          onChange={(e) => setHousePrice(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>{t("atHouseCount")}</Label>
        <Select value={houseCount} onValueChange={(v) => { setHouseCount(v as HouseCount); setResult(null); }}>
          <SelectTrigger className="mt-1 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">{t("atHouse1")}</SelectItem>
            <SelectItem value="2">{t("atHouse2")}</SelectItem>
            <SelectItem value="3">{t("atHouse3")}</SelectItem>
            <SelectItem value="corp">{t("atCorporate")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>{t("atArea")}</Label>
        <Select value={area} onValueChange={(v) => { setArea(v as AreaType); setResult(null); }}>
          <SelectTrigger className="mt-1 w-full">
            <SelectValue>{area === "small" ? t("atAreaSmall") : t("atAreaLarge")}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">{t("atAreaSmall")}</SelectItem>
            <SelectItem value="large">{t("atAreaLarge")}</SelectItem>
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
            <p className="text-sm text-muted-foreground mb-1">{t("atTotalTax")}</p>
            <p className="text-3xl font-bold text-primary">
              {fmtKRW(result.totalTax)}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("atAcquisitionTax")}</p>
              <p className="font-semibold text-xs">{fmtKRW(result.acquisitionTax)}</p>
              <p className="text-xs text-muted-foreground">({(result.taxRate * 100).toFixed(1)}%)</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("atAgriTax")}</p>
              <p className="font-semibold text-xs">{fmtKRW(result.agriTax)}</p>
              <p className="text-xs text-muted-foreground">(0.2%)</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("atEducationTax")}</p>
              <p className="font-semibold text-xs">{fmtKRW(result.educationTax)}</p>
              <p className="text-xs text-muted-foreground">(10%)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
