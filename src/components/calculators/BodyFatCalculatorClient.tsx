"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Unit = "metric" | "imperial";
type Gender = "male" | "female";

interface BodyFatResult {
  bodyFat: number;
  categoryKey: string;
  color: string;
  fatMass: number;
  leanMass: number;
}

function getCategory(bf: number, gender: Gender): { categoryKey: string; color: string } {
  if (gender === "male") {
    if (bf < 6) return { categoryKey: "bfCatEssential", color: "text-blue-500" };
    if (bf < 14) return { categoryKey: "bfCatAthletic", color: "text-green-600" };
    if (bf < 18) return { categoryKey: "bfCatFitness", color: "text-teal-600" };
    if (bf < 25) return { categoryKey: "bfCatAverage", color: "text-yellow-600" };
    return { categoryKey: "bfCatObese", color: "text-red-600" };
  } else {
    if (bf < 14) return { categoryKey: "bfCatEssential", color: "text-blue-500" };
    if (bf < 21) return { categoryKey: "bfCatAthletic", color: "text-green-600" };
    if (bf < 25) return { categoryKey: "bfCatFitness", color: "text-teal-600" };
    if (bf < 32) return { categoryKey: "bfCatAverage", color: "text-yellow-600" };
    return { categoryKey: "bfCatObese", color: "text-red-600" };
  }
}

export default function BodyFatCalculatorClient() {
  const t = useTranslations("calculators");
  const [unit, setUnit] = useState<Unit>("metric");
  const [gender, setGender] = useState<Gender>("male");
  const [height, setHeight] = useState("");
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [hip, setHip] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<BodyFatResult | null>(null);

  const unitLabel = unit === "metric" ? "cm" : "in";

  const toInches = (val: string) => {
    const n = parseFloat(val);
    return unit === "metric" ? n / 2.54 : n;
  };

  const calculate = () => {
    const hIn = toInches(height);
    const wIn = toInches(waist);
    const nIn = toInches(neck);

    if (!hIn || !wIn || !nIn || hIn <= 0) return;

    let bodyFat: number;

    if (gender === "male") {
      const diff = wIn - nIn;
      if (diff <= 0) return;
      bodyFat = 86.010 * Math.log10(diff) - 70.041 * Math.log10(hIn) + 36.76;
    } else {
      const hipIn = toInches(hip);
      if (!hipIn || hipIn <= 0) return;
      const sum = wIn + hipIn - nIn;
      if (sum <= 0) return;
      bodyFat = 163.205 * Math.log10(sum) - 97.684 * Math.log10(hIn) - 78.387;
    }

    bodyFat = Math.max(0, Math.round(bodyFat * 10) / 10);
    const { categoryKey, color } = getCategory(bodyFat, gender);

    const w = parseFloat(weight);
    const fatMass = w ? Math.round((w * bodyFat) / 100 * 10) / 10 : 0;
    const leanMass = w ? Math.round((w - fatMass) * 10) / 10 : 0;

    setResult({ bodyFat, categoryKey, color, fatMass, leanMass });
  };

  const reset = () => {
    setHeight(""); setWaist(""); setNeck(""); setHip(""); setWeight(""); setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <Tabs value={unit} onValueChange={(v) => { setUnit(v as Unit); setResult(null); }}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="metric" className="flex-1">{t("tabMetricCm")}</TabsTrigger>
          <TabsTrigger value="imperial" className="flex-1">{t("tabImperialIn")}</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        <div>
          <Label>{t("labelGender")}</Label>
          <Tabs value={gender} onValueChange={(v) => { setGender(v as Gender); setResult(null); }} className="mt-1">
            <TabsList className="w-full">
              <TabsTrigger value="male" className="flex-1">{t("labelMale")}</TabsTrigger>
              <TabsTrigger value="female" className="flex-1">{t("labelFemale")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div>
          <Label>{t("labelHeight")} ({unitLabel})</Label>
          <Input
            type="number"
            placeholder={unit === "metric" ? `${t("egPrefix")} 175` : `${t("egPrefix")} 69`}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label>{t("bfWaist")} ({unitLabel}) <span className="text-xs text-muted-foreground">{t("bfAtNavel")}</span></Label>
          <Input
            type="number"
            placeholder={unit === "metric" ? `${t("egPrefix")} 85` : `${t("egPrefix")} 33`}
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            className="mt-1"
          />
        </div>

        {gender === "female" && (
          <div>
            <Label>{t("bfHip")} ({unitLabel}) <span className="text-xs text-muted-foreground">{t("bfAtWidest")}</span></Label>
            <Input
              type="number"
              placeholder={unit === "metric" ? `${t("egPrefix")} 95` : `${t("egPrefix")} 37`}
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              className="mt-1"
            />
          </div>
        )}

        <div>
          <Label>{t("bfNeck")} ({unitLabel})</Label>
          <Input
            type="number"
            placeholder={unit === "metric" ? `${t("egPrefix")} 38` : `${t("egPrefix")} 15`}
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label>{t("bfBodyWeightLabel")} ({unit === "metric" ? "kg" : "lbs"}) <span className="text-xs text-muted-foreground">{t("optional")}</span></Label>
          <Input
            type="number"
            placeholder={unit === "metric" ? `${t("egPrefix")} 75` : `${t("egPrefix")} 165`}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
          <Button variant="outline" onClick={reset}>{t("reset")}</Button>
        </div>
      </div>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="p-4 rounded-xl bg-muted/50 text-center">
            <p className="text-sm text-muted-foreground mb-1">{t("bfBodyFatPct")}</p>
            <p className={cn("text-4xl font-bold", result.color)}>{result.bodyFat}%</p>
            <p className={cn("font-semibold mt-1", result.color)}>{t(result.categoryKey as any)}</p>
          </div>

          {result.fatMass > 0 && (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground">{t("bfFatMass")}</p>
                <p className="font-semibold text-sm">{result.fatMass} {unit === "metric" ? "kg" : "lbs"}</p>
              </div>
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-center">
                <p className="text-xs text-muted-foreground">{t("bfLeanMass")}</p>
                <p className="font-semibold text-sm text-green-600">{result.leanMass} {unit === "metric" ? "kg" : "lbs"}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
