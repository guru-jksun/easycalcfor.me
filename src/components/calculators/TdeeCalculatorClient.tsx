"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ACTIVITIES = [
  { key: "tdeeSedentary", factor: 1.2 },
  { key: "tdeeLightly", factor: 1.375 },
  { key: "tdeeModerately", factor: 1.55 },
  { key: "tdeeVery", factor: 1.725 },
  { key: "tdeeExtra", factor: 1.9 },
];

export default function TdeeCalculatorClient() {
  const t = useTranslations("calculators");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState(2);
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);

  const calculate = () => {
    const a = parseInt(age) || 0;
    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0;
    if (!a || !w || !h) return;
    const bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * ACTIVITIES[activity].factor;
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee) });
  };

  const reset = () => { setAge(""); setWeight(""); setHeight(""); setResult(null); };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><Label>{t("tdeeAge")}</Label><Input type="number" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} className="mt-1" /></div>
        <div>
          <Label>{t("tdeeGender")}</Label>
          <div className="flex gap-1 mt-1">
            <button type="button" onClick={() => setGender("male")} className={`flex-1 text-xs py-2 rounded border ${gender === "male" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{t("tdeeMale")}</button>
            <button type="button" onClick={() => setGender("female")} className={`flex-1 text-xs py-2 rounded border ${gender === "female" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{t("tdeeFemale")}</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>{t("tdeeWeight")} ({t("tdeeKg")})</Label><Input type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-1" /></div>
        <div><Label>{t("tdeeHeight")} ({t("tdeeCm")})</Label><Input type="number" placeholder="175" value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1" /></div>
      </div>
      <div>
        <Label>{t("tdeeActivity")}</Label>
        <div className="space-y-1 mt-2">
          {ACTIVITIES.map((a, i) => (
            <button key={i} type="button" onClick={() => setActivity(i)}
              className={`w-full text-left text-xs px-3 py-2 rounded border transition-colors ${activity === i ? "bg-primary text-primary-foreground border-primary" : "bg-muted/50 text-muted-foreground hover:text-foreground border-transparent"}`}>
              {t(a.key as never)}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>
      {result && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-muted/50 text-center">
              <p className="text-sm text-muted-foreground mb-1">{t("tdeeBmr")}</p>
              <p className="text-2xl font-bold">{result.bmr} cal</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/10 text-center">
              <p className="text-sm text-muted-foreground mb-1">{t("tdeeTdee")}</p>
              <p className="text-2xl font-bold text-primary">{result.tdee} cal</p>
            </div>
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">{t("tdeeMildLoss")}</span><span className="font-medium text-green-600">{result.tdee - 250} cal</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t("tdeeWeightLoss")}</span><span className="font-medium text-green-600">{result.tdee - 500} cal</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t("tdeeMaintain")}</span><span className="font-medium">{result.tdee} cal</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t("tdeeMildGain")}</span><span className="font-medium text-orange-600">{result.tdee + 250} cal</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t("tdeeWeightGain")}</span><span className="font-medium text-orange-600">{result.tdee + 500} cal</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
