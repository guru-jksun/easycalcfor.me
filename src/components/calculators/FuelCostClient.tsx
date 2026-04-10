"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FuelResult {
  fuelNeeded: number;
  totalCost: number;
  costPerKm: number;
}

function fmt(n: number): string {
  if (!isFinite(n)) return "Error";
  return parseFloat(n.toFixed(2)).toLocaleString();
}

export default function FuelCostClient() {
  const t = useTranslations("calculators");
  const [distance, setDistance] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [fuelPrice, setFuelPrice] = useState("1800");
  const [result, setResult] = useState<FuelResult | null>(null);

  const calculate = () => {
    const d = parseFloat(distance);
    const e = parseFloat(efficiency);
    const p = parseFloat(fuelPrice);
    if (isNaN(d) || isNaN(e) || isNaN(p) || e <= 0) return;

    const fuelNeeded = d / e;
    const totalCost = fuelNeeded * p;
    const costPerKm = totalCost / d;

    setResult({ fuelNeeded: Math.round(fuelNeeded * 100) / 100, totalCost: Math.round(totalCost), costPerKm: Math.round(costPerKm * 10) / 10 });
  };

  const reset = () => {
    setDistance("");
    setEfficiency("");
    setFuelPrice("1800");
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <div className="space-y-4">
        <div>
          <Label>{t("fuelDistance")} (km)</Label>
          <Input
            type="number"
            placeholder="300"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label>{t("fuelEfficiency")} (km/L)</Label>
          <Input
            type="number"
            placeholder="12"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label>{t("fuelPrice")}</Label>
          <Input
            type="number"
            placeholder="1800"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(e.target.value)}
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
            <p className="text-sm text-muted-foreground">{t("fuelNeeded")}</p>
            <p className="text-2xl font-bold text-primary">{fmt(result.fuelNeeded)} L</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t("fuelTotalCost")}</p>
            <p className="text-4xl font-bold text-primary">{fmt(result.totalCost)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t("fuelCostPerKm")}</p>
            <p className="text-lg font-semibold text-muted-foreground">{fmt(result.costPerKm)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
