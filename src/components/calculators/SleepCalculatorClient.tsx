"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Mode = "wake" | "bed";

const CYCLE_MIN = 90;
const FALL_ASLEEP_MIN = 15;

interface SleepOption {
  time: string;
  cycles: number;
  hours: number;
  quality: "optimal" | "good" | "minimum";
}

function addMinutes(timeStr: string, minutes: number): string {
  const [h, m] = timeStr.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const newH = ((total % 1440) + 1440) % 1440;
  return `${String(Math.floor(newH / 60)).padStart(2, "0")}:${String(newH % 60).padStart(2, "0")}`;
}

function getQuality(cycles: number): "optimal" | "good" | "minimum" {
  if (cycles >= 6) return "optimal";
  if (cycles >= 5) return "good";
  return "minimum";
}

const QUALITY_COLORS: Record<string, string> = {
  optimal: "border-green-500 bg-green-50 dark:bg-green-950/30",
  good: "border-blue-500 bg-blue-50 dark:bg-blue-950/30",
  minimum: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30",
};

export default function SleepCalculatorClient() {
  const t = useTranslations("calculators");
  const [mode, setMode] = useState<Mode>("wake");
  const [time, setTime] = useState("07:00");
  const [options, setOptions] = useState<SleepOption[]>([]);

  const calculate = () => {
    const results: SleepOption[] = [];

    if (mode === "wake") {
      // Given wake time, calculate bedtimes
      for (let cycles = 6; cycles >= 4; cycles--) {
        const sleepMin = cycles * CYCLE_MIN + FALL_ASLEEP_MIN;
        const bedTime = addMinutes(time, -sleepMin);
        results.push({
          time: bedTime,
          cycles,
          hours: (cycles * CYCLE_MIN) / 60,
          quality: getQuality(cycles),
        });
      }
    } else {
      // Given bed time, calculate wake times
      for (let cycles = 4; cycles <= 6; cycles++) {
        const sleepMin = cycles * CYCLE_MIN + FALL_ASLEEP_MIN;
        const wakeTime = addMinutes(time, sleepMin);
        results.push({
          time: wakeTime,
          cycles,
          hours: (cycles * CYCLE_MIN) / 60,
          quality: getQuality(cycles),
        });
      }
    }

    setOptions(results);
  };

  const reset = () => {
    setTime("07:00");
    setOptions([]);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <div className="grid grid-cols-2 gap-1 mb-6 p-1 bg-muted rounded-xl">
        {([
          { key: "wake" as Mode, labelKey: "sleepWakeMode" },
          { key: "bed" as Mode, labelKey: "sleepBedMode" },
        ]).map(({ key, labelKey }) => (
          <button
            key={key}
            onClick={() => { setMode(key); setOptions([]); }}
            className={cn(
              "text-xs py-2 px-1 rounded-lg text-center transition-colors leading-tight",
              mode === key
                ? "bg-background text-foreground shadow-sm font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <Label>{mode === "wake" ? t("sleepWakeTime") : t("sleepBedTime")}</Label>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
          <Button variant="outline" onClick={reset}>{t("reset")}</Button>
        </div>
      </div>

      {options.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{t("sleepRecommended")}</p>
          {options.map((opt) => (
            <div
              key={opt.cycles}
              className={cn("p-3 rounded-xl border-2", QUALITY_COLORS[opt.quality])}
            >
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">{opt.time}</p>
                <span className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  opt.quality === "optimal" ? "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : opt.quality === "good" ? "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                )}>
                  {t(opt.quality === "optimal" ? "sleepOptimal" : opt.quality === "good" ? "sleepGood" : "sleepMinimum")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {t("sleepCycles")}: {opt.cycles} ({opt.hours}h)
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
