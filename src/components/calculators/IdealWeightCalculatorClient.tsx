"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Unit = "metric" | "imperial";
type Gender = "male" | "female";

interface FormulaResult {
  name: string;
  year: string;
  kg: number;
  lbs: number;
}

interface IdealWeightResult {
  formulas: FormulaResult[];
  bmiMin: number;
  bmiMax: number;
  bmiMinLbs: number;
  bmiMaxLbs: number;
  heightCm: number;
}

function calcIdealWeight(heightCm: number, gender: Gender): FormulaResult[] {
  // Convert height to total inches over 5ft
  const totalInches = heightCm / 2.54;
  const inchesOver5ft = Math.max(0, totalInches - 60);

  const formulas: Array<{ name: string; year: string; maleBase: number; femaleBase: number; maleRate: number; femaleRate: number }> = [
    { name: "Robinson", year: "1983", maleBase: 52, femaleBase: 49, maleRate: 1.9, femaleRate: 1.7 },
    { name: "Miller", year: "1983", maleBase: 56.2, femaleBase: 53.1, maleRate: 1.41, femaleRate: 1.36 },
    { name: "Devine", year: "1974", maleBase: 50, femaleBase: 45.5, maleRate: 2.3, femaleRate: 2.3 },
    { name: "Hamwi", year: "1964", maleBase: 48, femaleBase: 45.5, maleRate: 2.7, femaleRate: 2.2 },
  ];

  return formulas.map((f) => {
    const base = gender === "male" ? f.maleBase : f.femaleBase;
    const rate = gender === "male" ? f.maleRate : f.femaleRate;
    const kg = Math.round((base + rate * inchesOver5ft) * 10) / 10;
    const lbs = Math.round(kg * 2.20462 * 10) / 10;
    return { name: f.name, year: f.year, kg, lbs };
  });
}

export default function IdealWeightCalculatorClient() {
  const t = useTranslations("calculators");
  const [unit, setUnit] = useState<Unit>("metric");
  const [gender, setGender] = useState<Gender>("male");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [result, setResult] = useState<IdealWeightResult | null>(null);

  const calculate = () => {
    let hCm: number;

    if (unit === "metric") {
      hCm = parseFloat(heightCm);
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      hCm = (ft * 12 + inches) * 2.54;
    }

    if (!hCm || hCm <= 0) return;

    const formulas = calcIdealWeight(hCm, gender);

    // BMI healthy range 18.5–24.9, kg = BMI × height(m)²
    const hM = hCm / 100;
    const bmiMin = Math.round(18.5 * hM * hM * 10) / 10;
    const bmiMax = Math.round(24.9 * hM * hM * 10) / 10;

    setResult({
      formulas,
      bmiMin,
      bmiMax,
      bmiMinLbs: Math.round(bmiMin * 2.20462 * 10) / 10,
      bmiMaxLbs: Math.round(bmiMax * 2.20462 * 10) / 10,
      heightCm: hCm,
    });
  };

  const reset = () => {
    setHeightCm(""); setHeightFt(""); setHeightIn(""); setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <Tabs value={unit} onValueChange={(v) => { setUnit(v as Unit); setResult(null); }}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="metric" className="flex-1">{t("tabMetricCm")}</TabsTrigger>
          <TabsTrigger value="imperial" className="flex-1">{t("tabImperialFtIn")}</TabsTrigger>
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

        {unit === "metric" ? (
          <div>
            <Label>{t("labelHeightCm")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 175`}
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
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
        <div className="mt-6 space-y-3">
          <div className="p-4 rounded-xl border bg-primary/5">
            <p className="text-xs font-medium text-muted-foreground mb-2">{t("iwBmiRange")}</p>
            <p className="text-lg font-bold text-primary">
              {result.bmiMin} – {result.bmiMax} kg
            </p>
            <p className="text-sm text-muted-foreground">
              {result.bmiMinLbs} – {result.bmiMaxLbs} lbs
            </p>
          </div>

          <p className="text-xs font-medium text-muted-foreground px-1">{t("iwFormulaResults")}</p>
          <div className="space-y-2">
            {result.formulas.map((f) => (
              <div key={f.name} className="flex items-center justify-between rounded-xl border px-4 py-3">
                <div>
                  <p className="font-medium text-sm">{f.name} <span className="text-xs text-muted-foreground">({f.year})</span></p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{f.kg} kg</p>
                  <p className="text-xs text-muted-foreground">{f.lbs} lbs</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
