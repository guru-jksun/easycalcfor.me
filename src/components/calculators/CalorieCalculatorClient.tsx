"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Unit = "metric" | "imperial";
type Gender = "male" | "female";

interface CalorieResult {
  bmr: number;
  tdee: number;
  lose: number;
  gain: number;
}

function fmtCal(n: number) {
  return Math.round(n).toLocaleString();
}

export default function CalorieCalculatorClient() {
  const t = useTranslations("calculators");
  const ACTIVITY_OPTIONS = [
    { value: "1.2", label: t("calActSedentaryFull") },
    { value: "1.375", label: t("calActLightFull") },
    { value: "1.55", label: t("calActModerateFull") },
    { value: "1.725", label: t("calActVeryFull") },
    { value: "1.9", label: t("calActExtremeFull") },
  ];
  const [unit, setUnit] = useState<Unit>("metric");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [activity, setActivity] = useState("1.55");
  const [result, setResult] = useState<CalorieResult | null>(null);

  const calculate = () => {
    const a = parseFloat(age);
    const multiplier = parseFloat(activity);
    if (!a || a <= 0) return;

    let weightKg: number;
    let heightCmVal: number;

    if (unit === "metric") {
      weightKg = parseFloat(weight);
      heightCmVal = parseFloat(heightCm);
    } else {
      const lbs = parseFloat(weight);
      weightKg = lbs / 2.20462;
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      heightCmVal = (ft * 12 + inches) * 2.54;
    }

    if (!weightKg || !heightCmVal || weightKg <= 0 || heightCmVal <= 0) return;

    const bmr =
      gender === "male"
        ? 10 * weightKg + 6.25 * heightCmVal - 5 * a + 5
        : 10 * weightKg + 6.25 * heightCmVal - 5 * a - 161;

    const tdee = bmr * multiplier;

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      lose: Math.round(tdee - 500),
      gain: Math.round(tdee + 500),
    });
  };

  const reset = () => {
    setAge(""); setWeight(""); setHeightCm(""); setHeightFt(""); setHeightIn("");
    setResult(null);
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
        {/* Gender */}
        <div>
          <Label>{t("labelGender")}</Label>
          <Tabs value={gender} onValueChange={(v) => { setGender(v as Gender); setResult(null); }} className="mt-1">
            <TabsList className="w-full">
              <TabsTrigger value="male" className="flex-1">{t("labelMale")}</TabsTrigger>
              <TabsTrigger value="female" className="flex-1">{t("labelFemale")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Age */}
        <div>
          <Label>{t("labelAge")}</Label>
          <Input
            type="number"
            placeholder={`${t("egPrefix")} 30`}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Weight */}
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

        {/* Height */}
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

        {/* Activity Level */}
        <div>
          <Label>{t("labelActivityLevel")}</Label>
          <Select value={activity} onValueChange={(v) => { if (v) setActivity(v); }}>
            <SelectTrigger className="mt-1 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ACTIVITY_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
          <Button variant="outline" onClick={reset}>{t("reset")}</Button>
        </div>
      </div>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-xs text-muted-foreground mb-0.5">{t("calBmrLabel")}</p>
            <p className="text-2xl font-bold">{fmtCal(result.bmr)} <span className="text-base font-normal text-muted-foreground">{t("calPerDay")}</span></p>
          </div>
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-xs text-muted-foreground mb-0.5">{t("calTdeeLabel")}</p>
            <p className="text-3xl font-bold text-primary">{fmtCal(result.tdee)} <span className="text-base font-normal text-muted-foreground">{t("calPerDay")}</span></p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className={cn("p-3 rounded-xl text-center border")}>
              <p className="text-xs text-muted-foreground">{t("calLoseWeight")}</p>
              <p className="font-semibold text-sm text-blue-600">{fmtCal(result.lose)}</p>
              <p className="text-xs text-muted-foreground">{t("calPerDay")}</p>
            </div>
            <div className={cn("p-3 rounded-xl text-center border bg-green-50 dark:bg-green-950/40")}>
              <p className="text-xs text-muted-foreground">{t("calMaintain")}</p>
              <p className="font-semibold text-sm text-green-600">{fmtCal(result.tdee)}</p>
              <p className="text-xs text-muted-foreground">{t("calPerDay")}</p>
            </div>
            <div className={cn("p-3 rounded-xl text-center border")}>
              <p className="text-xs text-muted-foreground">{t("calGainWeight")}</p>
              <p className="font-semibold text-sm text-orange-600">{fmtCal(result.gain)}</p>
              <p className="text-xs text-muted-foreground">{t("calPerDay")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
