"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Unit = "metric" | "imperial";

interface BmiResult {
  bmi: number;
  categoryKey: string;
  color: string;
  min: number;
  max: number;
}

function getBmiCategory(bmi: number): { categoryKey: string; color: string } {
  if (bmi < 18.5) return { categoryKey: "bmiCatUnderweight", color: "text-blue-600" };
  if (bmi < 25) return { categoryKey: "bmiCatNormal", color: "text-green-600" };
  if (bmi < 30) return { categoryKey: "bmiCatOverweight", color: "text-yellow-600" };
  if (bmi < 35) return { categoryKey: "bmiCatObese1", color: "text-orange-600" };
  return { categoryKey: "bmiCatObese2", color: "text-red-600" };
}

function getBmiPosition(bmi: number): number {
  // Map BMI to 0-100% on bar (scale: 15-40)
  return Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100));
}

export default function BmiCalculatorClient() {
  const t = useTranslations("calculators");
  const [unit, setUnit] = useState<Unit>("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [result, setResult] = useState<BmiResult | null>(null);

  const calculate = () => {
    let bmi: number;
    const w = parseFloat(weight);

    if (unit === "metric") {
      const h = parseFloat(height) / 100;
      if (!w || !h || h <= 0) return;
      bmi = w / (h * h);
    } else {
      const totalInches = parseFloat(heightFt) * 12 + parseFloat(heightIn || "0");
      if (!w || !totalInches) return;
      bmi = (w / (totalInches * totalInches)) * 703;
    }

    const { categoryKey, color } = getBmiCategory(bmi);
    setResult({ bmi: Math.round(bmi * 10) / 10, categoryKey, color, min: 18.5, max: 24.9 });
  };

  const reset = () => {
    setWeight(""); setHeight(""); setHeightFt(""); setHeightIn(""); setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <Tabs value={unit} onValueChange={(v) => { setUnit(v as Unit); setResult(null); }}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="metric" className="flex-1">{t("tabMetricKgCm")}</TabsTrigger>
          <TabsTrigger value="imperial" className="flex-1">{t("tabImperialLbsFt")}</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        <div>
          <Label>{t("labelWeight")} ({unit === "metric" ? "kg" : "lbs"})</Label>
          <Input
            type="number"
            placeholder={unit === "metric" ? `${t("egPrefix")} 70` : `${t("egPrefix")} 154`}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-1"
          />
        </div>

        {unit === "metric" ? (
          <div>
            <Label>{t("labelHeightCm")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 170`}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-1"
            />
          </div>
        ) : (
          <div>
            <Label>{t("labelHeight")}</Label>
            <div className="flex gap-2 mt-1">
              <Input
                type="number"
                placeholder="ft"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
              />
              <Input
                type="number"
                placeholder="in"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
          <Button variant="outline" onClick={reset}>{t("reset")}</Button>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-4 rounded-xl bg-muted/50">
          <p className="text-sm text-muted-foreground mb-1">{t("resBmi")}</p>
          <p className={cn("text-4xl font-bold mb-1", result.color)}>{result.bmi}</p>
          <p className={cn("font-semibold", result.color)}>{t(result.categoryKey as any)}</p>

          {/* BMI Bar */}
          <div className="mt-4">
            <div className="relative h-3 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 via-orange-400 to-red-500">
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-foreground shadow"
                style={{ left: `calc(${getBmiPosition(result.bmi)}% - 6px)` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>15</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            {t("bmiHealthyRangeNote")}
          </p>
        </div>
      )}
    </div>
  );
}
