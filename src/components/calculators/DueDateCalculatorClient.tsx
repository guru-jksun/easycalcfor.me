"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Mode = "lmp" | "conception";

interface DueDateResult {
  dueDate: Date;
  weeksPregnant: number;
  daysRemaining: number;
  trimester: number;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function diffDays(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function getTrimester(weeks: number): number {
  if (weeks <= 12) return 1;
  if (weeks <= 26) return 2;
  return 3;
}

export default function DueDateCalculatorClient() {
  const t = useTranslations("calculators");
  const [mode, setMode] = useState<Mode>("lmp");
  const [dateInput, setDateInput] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [result, setResult] = useState<DueDateResult | null>(null);

  const calculate = () => {
    if (!dateInput) return;

    const inputDate = new Date(dateInput + "T00:00:00");
    if (isNaN(inputDate.getTime())) return;

    let dueDate: Date;

    if (mode === "lmp") {
      const cycle = parseInt(cycleLength) || 28;
      const adjustedDays = 280 + (cycle - 28);
      dueDate = addDays(inputDate, adjustedDays);
    } else {
      dueDate = addDays(inputDate, 266);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const conceptionDate = mode === "lmp" ? addDays(inputDate, 14) : inputDate;
    const daysPregnant = diffDays(conceptionDate, today);
    const weeksPregnant = Math.max(0, Math.floor(daysPregnant / 7));
    const daysRemaining = Math.max(0, diffDays(today, dueDate));
    const trimester = getTrimester(weeksPregnant);

    setResult({ dueDate, weeksPregnant, daysRemaining, trimester });
  };

  const reset = () => {
    setDateInput(""); setCycleLength("28"); setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <Tabs value={mode} onValueChange={(v) => { setMode(v as Mode); setResult(null); }}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="lmp" className="flex-1">{t("ddLastPeriodTab")}</TabsTrigger>
          <TabsTrigger value="conception" className="flex-1">{t("ddConceptionTab")}</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        <div>
          <Label>
            {mode === "lmp" ? t("ddFirstDayLastPeriod") : t("ddConceptionDate")}
          </Label>
          <Input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="mt-1"
          />
        </div>

        {mode === "lmp" && (
          <div>
            <Label>{t("ddCycleLength")}</Label>
            <Input
              type="number"
              placeholder="28"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              min="20"
              max="45"
              className="mt-1"
            />
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
          <Button variant="outline" onClick={reset}>{t("reset")}</Button>
        </div>
      </div>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-xs text-muted-foreground mb-1">{t("ddEstimatedDueDate")}</p>
            <p className="text-lg font-bold text-primary">{formatDate(result.dueDate)}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("ddWeekPregnancy")}</p>
              <p className="text-2xl font-bold">{result.weeksPregnant}</p>
              <p className="text-xs text-muted-foreground">{t("ddWeeks")}</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("ddDaysRemaining")}</p>
              <p className="text-2xl font-bold">{result.daysRemaining}</p>
              <p className="text-xs text-muted-foreground">{t("ddDays")}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border">
            <p className="text-sm font-medium mb-3">{t("ddTrimesterBreakdown")}</p>
            <div className="space-y-2">
              {[
                { num: 1, labelKey: "dueDateT1", weeksKey: "dueDateT1Weeks" },
                { num: 2, labelKey: "dueDateT2", weeksKey: "dueDateT2Weeks" },
                { num: 3, labelKey: "dueDateT3", weeksKey: "dueDateT3Weeks" },
              ].map(({ num, labelKey, weeksKey }) => (
                <div
                  key={num}
                  className={`flex justify-between items-center rounded-lg px-3 py-2 text-sm ${
                    result.trimester === num
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <span>{t(labelKey as any)}</span>
                  <span className="text-xs">{t(weeksKey as any)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
