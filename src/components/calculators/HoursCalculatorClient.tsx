"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DayEntry { clockIn: string; clockOut: string; }

export default function HoursCalculatorClient() {
  const t = useTranslations("calculators");
  const [days, setDays] = useState<DayEntry[]>([
    { clockIn: "09:00", clockOut: "18:00" },
    { clockIn: "09:00", clockOut: "18:00" },
    { clockIn: "09:00", clockOut: "18:00" },
    { clockIn: "09:00", clockOut: "18:00" },
    { clockIn: "09:00", clockOut: "18:00" },
  ]);
  const [breakMin, setBreakMin] = useState("60");
  const [hourlyRate, setHourlyRate] = useState("");
  const [overtimeAfter, setOvertimeAfter] = useState("40");
  const [result, setResult] = useState<{ totalHours: number; regularHours: number; overtimeHours: number; regularPay: number; overtimePay: number; totalPay: number } | null>(null);

  const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const updateDay = (i: number, field: keyof DayEntry, val: string) => {
    const copy = [...days];
    copy[i] = { ...copy[i], [field]: val };
    setDays(copy);
  };

  const calculate = () => {
    const brk = (parseInt(breakMin) || 0) / 60;
    let totalHours = 0;
    for (const day of days) {
      if (!day.clockIn || !day.clockOut) continue;
      const [inH, inM] = day.clockIn.split(":").map(Number);
      const [outH, outM] = day.clockOut.split(":").map(Number);
      let hours = (outH + outM / 60) - (inH + inM / 60) - brk;
      if (hours < 0) hours += 24;
      totalHours += Math.max(0, hours);
    }

    const otThreshold = parseFloat(overtimeAfter) || 40;
    const regularHours = Math.min(totalHours, otThreshold);
    const overtimeHours = Math.max(0, totalHours - otThreshold);
    const rate = parseFloat(hourlyRate) || 0;

    setResult({
      totalHours,
      regularHours,
      overtimeHours,
      regularPay: regularHours * rate,
      overtimePay: overtimeHours * rate * 1.5,
      totalPay: regularHours * rate + overtimeHours * rate * 1.5,
    });
  };

  const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div className="space-y-2">
        {days.map((day, i) => (
          <div key={i} className="grid grid-cols-5 gap-1.5 items-center">
            <span className="text-xs font-medium text-muted-foreground">{DAY_LABELS[i]}</span>
            <Input type="time" value={day.clockIn} onChange={(e) => updateDay(i, "clockIn", e.target.value)} className="col-span-2 text-xs h-8" />
            <Input type="time" value={day.clockOut} onChange={(e) => updateDay(i, "clockOut", e.target.value)} className="col-span-2 text-xs h-8" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div><Label className="text-xs">{t("hoursCalcBreak")}</Label><Input type="number" placeholder="60" value={breakMin} onChange={(e) => setBreakMin(e.target.value)} className="mt-1" /></div>
        <div><Label className="text-xs">{t("hoursCalcOtAfter")}</Label><Input type="number" placeholder="40" value={overtimeAfter} onChange={(e) => setOvertimeAfter(e.target.value)} className="mt-1" /></div>
      </div>
      <div><Label className="text-xs">{t("hoursCalcRate")}</Label><Input type="number" placeholder="25" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="mt-1" /></div>
      <Button onClick={calculate} className="w-full">{t("calculate")}</Button>
      {result && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-primary/10 text-center">
            <p className="text-sm text-muted-foreground mb-1">{t("hoursCalcTotalHours")}</p>
            <p className="text-3xl font-bold text-primary">{result.totalHours.toFixed(1)}h</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("hoursCalcRegular")}</p>
              <p className="font-semibold text-xs">{result.regularHours.toFixed(1)}h</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("hoursCalcOvertime")}</p>
              <p className="font-semibold text-xs text-orange-600">{result.overtimeHours.toFixed(1)}h</p>
            </div>
          </div>
          {parseFloat(hourlyRate) > 0 && (
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/40">
              <p className="text-sm text-muted-foreground mb-1">{t("hoursCalcWeeklyPay")}</p>
              <p className="text-2xl font-bold text-green-600">{fmt(result.totalPay)}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("hoursCalcRegular")}: {fmt(result.regularPay)} + OT: {fmt(result.overtimePay)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
