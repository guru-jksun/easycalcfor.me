"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DiffResult {
  totalDays: number;
  weeks: number;
  remainderDays: number;
  months: number;
  monthsRemDays: number;
  years: number;
  yearsRemMonths: number;
  yearsRemDays: number;
  totalHours: number;
  totalMinutes: number;
  businessDays: number;
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

function countBusinessDays(start: Date, end: Date): number {
  let count = 0;
  const cur = new Date(start);
  cur.setHours(0, 0, 0, 0);
  const endDate = new Date(end);
  endDate.setHours(0, 0, 0, 0);
  while (cur < endDate) {
    const dow = cur.getDay();
    if (dow !== 0 && dow !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

function calculateDiff(start: Date, end: Date): DiffResult {
  const totalMs = end.getTime() - start.getTime();
  const totalDays = Math.round(totalMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);
  const remainderDays = totalDays % 7;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const businessDays = countBusinessDays(start, end);

  // Months + days
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  let monthsRemDays = end.getDate() - start.getDate();
  if (monthsRemDays < 0) {
    months -= 1;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    monthsRemDays += prevMonth.getDate();
  }

  // Years + months + days
  let years = end.getFullYear() - start.getFullYear();
  let yearsRemMonths = end.getMonth() - start.getMonth();
  let yearsRemDays = end.getDate() - start.getDate();
  if (yearsRemDays < 0) {
    yearsRemMonths -= 1;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    yearsRemDays += prevMonth.getDate();
  }
  if (yearsRemMonths < 0) {
    years -= 1;
    yearsRemMonths += 12;
  }

  return { totalDays, weeks, remainderDays, months, monthsRemDays, years, yearsRemMonths, yearsRemDays, totalHours, totalMinutes, businessDays };
}

export default function DateDifferenceClient() {
  const t = useTranslations("calculators");
  const todayStr = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(todayStr);
  const [result, setResult] = useState<DiffResult | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    if (!startDate || !endDate) { setError(t("diffErrBothDates")); return; }
    const start = new Date(startDate + "T00:00:00");
    const end = new Date(endDate + "T00:00:00");
    if (isNaN(start.getTime()) || isNaN(end.getTime())) { setError(t("diffErrInvalidDate")); return; }
    if (start > end) { setError(t("diffErrStartBeforeEnd")); return; }
    setResult(calculateDiff(start, end));
  };

  const swap = () => {
    setStartDate(endDate);
    setEndDate(startDate);
    setResult(null);
  };

  const reset = () => {
    setStartDate("");
    setEndDate(todayStr);
    setResult(null);
    setError("");
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label htmlFor="start-date">{t("diffStartDate")}</Label>
        <Input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="end-date">{t("diffEndDate")}</Label>
        <Input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-2 pt-1">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={swap}>{t("diffSwap")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="space-y-3 mt-2">
          {/* Primary */}
          <div className="rounded-xl bg-primary/10 p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">{t("diffTotalDaysLabel")}</p>
            <p className="text-4xl font-bold text-primary">{fmt(result.totalDays)}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("diffDaysBetween")}</p>
          </div>

          {/* Breakdowns */}
          <div className="space-y-2">
            {[
              { label: t("diffWeeksDays"), value: `${fmt(result.weeks)} weeks, ${result.remainderDays} days` },
              { label: t("diffMonthsDays"), value: `${result.months} months, ${result.monthsRemDays} days` },
              { label: t("diffYearsMonthsDays"), value: `${result.years}y ${result.yearsRemMonths}m ${result.yearsRemDays}d` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center rounded-lg bg-muted/40 px-3 py-2 text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>

          {/* Hours / Minutes / Business days */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: t("diffHours"), value: fmt(result.totalHours) },
              { label: t("diffMinutes"), value: fmt(result.totalMinutes) },
              { label: t("diffBusinessDays"), value: fmt(result.businessDays) },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-muted/50 p-3 text-center">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-semibold text-sm mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
