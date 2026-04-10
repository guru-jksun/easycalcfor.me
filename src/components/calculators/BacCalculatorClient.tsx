"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Gender = "male" | "female";
type DrinkType = "beer" | "soju" | "wine" | "whiskey";

const DRINK_ALCOHOL_G: Record<DrinkType, number> = {
  beer: 14,     // 355ml, 5%
  soju: 6.8,    // 50ml, 17%
  wine: 14,     // 150ml, 12%
  whiskey: 14,  // 45ml, 40%
};

const GENDER_R: Record<Gender, number> = {
  male: 0.68,
  female: 0.55,
};

interface BacResult {
  bac: number;
  statusKey: string;
  statusColor: string;
  canDrive: boolean;
  timeToSober: number;
}

function getBacStatus(bac: number): { statusKey: string; statusColor: string } {
  if (bac < 0.03) return { statusKey: "bacNormal", statusColor: "text-green-600" };
  if (bac < 0.05) return { statusKey: "bacCaution", statusColor: "text-yellow-600" };
  if (bac < 0.1) return { statusKey: "bacDanger", statusColor: "text-orange-600" };
  return { statusKey: "bacSevere", statusColor: "text-red-600" };
}

export default function BacCalculatorClient() {
  const t = useTranslations("calculators");
  const [gender, setGender] = useState<Gender>("male");
  const [weight, setWeight] = useState("");
  const [drinkType, setDrinkType] = useState<DrinkType>("beer");
  const [glasses, setGlasses] = useState("");
  const [hoursAgo, setHoursAgo] = useState("");
  const [result, setResult] = useState<BacResult | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const g = parseFloat(glasses);
    const h = parseFloat(hoursAgo) || 0;
    if (isNaN(w) || isNaN(g) || w <= 0) return;

    const alcoholG = DRINK_ALCOHOL_G[drinkType] * g;
    const r = GENDER_R[gender];
    let bac = (alcoholG / (w * 1000 * r)) * 100 - 0.015 * h;
    bac = Math.max(0, bac);

    const { statusKey, statusColor } = getBacStatus(bac);
    const canDrive = bac < 0.03;
    const timeToSober = bac > 0 ? bac / 0.015 : 0;

    setResult({ bac: Math.round(bac * 1000) / 1000, statusKey, statusColor, canDrive, timeToSober: Math.round(timeToSober * 10) / 10 });
  };

  const reset = () => {
    setGender("male");
    setWeight("");
    setDrinkType("beer");
    setGlasses("");
    setHoursAgo("");
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <div className="space-y-4">
        <div>
          <Label>{t("bacGender")}</Label>
          <div className="grid grid-cols-2 gap-1 mt-1 p-1 bg-muted rounded-xl">
            {(["male", "female"] as Gender[]).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={cn(
                  "text-xs py-2 rounded-lg transition-colors",
                  gender === g
                    ? "bg-background text-foreground shadow-sm font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(g === "male" ? "bacMale" : "bacFemale")}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>{t("bacWeight")}</Label>
          <Input
            type="number"
            placeholder="70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label>{t("bacDrinkType")}</Label>
          <Select value={drinkType} onValueChange={(v) => setDrinkType(v as DrinkType)}>
            <SelectTrigger className="mt-1">
              <SelectValue>{t(drinkType === "beer" ? "bacBeer" : drinkType === "soju" ? "bacSoju" : drinkType === "wine" ? "bacWine" : "bacWhiskey")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beer">{t("bacBeer")}</SelectItem>
              <SelectItem value="soju">{t("bacSoju")}</SelectItem>
              <SelectItem value="wine">{t("bacWine")}</SelectItem>
              <SelectItem value="whiskey">{t("bacWhiskey")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>{t("bacGlasses")}</Label>
          <Input
            type="number"
            min="0"
            placeholder="3"
            value={glasses}
            onChange={(e) => setGlasses(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label>{t("bacHoursAgo")}</Label>
          <Input
            type="number"
            min="0"
            step="0.5"
            placeholder="1"
            value={hoursAgo}
            onChange={(e) => setHoursAgo(e.target.value)}
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
            <p className="text-sm text-muted-foreground">{t("bacLevel")}</p>
            <p className={cn("text-4xl font-bold", result.statusColor)}>{result.bac}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t("bacStatus")}</p>
            <p className={cn("text-lg font-semibold", result.statusColor)}>
              {t(result.statusKey as any)}
            </p>
          </div>
          <div>
            <p className={cn("text-sm font-medium", result.canDrive ? "text-green-600" : "text-red-600")}>
              {t("bacDriveWarning")}:{" "}
              {result.canDrive ? "OK" : "NO"}
            </p>
          </div>
          {result.timeToSober > 0 && (
            <div>
              <p className="text-sm text-muted-foreground">{t("bacTimeToSober")}</p>
              <p className="text-lg font-semibold">{result.timeToSober}h</p>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-2 border-t pt-2">
            {t("bacDisclaimer")}
          </p>
        </div>
      )}
    </div>
  );
}
