"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Result {
  years: number;
  months: number;
  days: number;
  totalLeave: number;
}

function calcAnnualLeave(startDate: Date, asOfDate: Date) {
  const diffMs = asOfDate.getTime() - startDate.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (totalDays < 0) return null;

  let years = asOfDate.getFullYear() - startDate.getFullYear();
  let months = asOfDate.getMonth() - startDate.getMonth();
  let days = asOfDate.getDate() - startDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(asOfDate.getFullYear(), asOfDate.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  let totalLeave = 0;

  if (years < 1) {
    // 1년 미만: 매월 1일 발생 (최대 11일)
    const workedMonths = Math.min(months + (days > 0 ? 0 : 0), 11);
    // Count full months worked
    const fullMonths = years * 12 + months;
    totalLeave = Math.min(fullMonths, 11);
  } else {
    // 1년 이상: 15일 기본
    totalLeave = 15;

    // 3년 이상: 매 2년마다 1일 추가 (최대 25일)
    if (years >= 3) {
      const additionalDays = Math.floor((years - 1) / 2);
      totalLeave = Math.min(15 + additionalDays, 25);
    }
  }

  return { years, months, days, totalLeave };
}

export default function AnnualLeaveClient() {
  const t = useTranslations("calculators");
  const todayStr = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [asOfDate, setAsOfDate] = useState(todayStr);
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    if (!startDate || !asOfDate) return;

    const start = new Date(startDate + "T00:00:00");
    const asOf = new Date(asOfDate + "T00:00:00");

    if (isNaN(start.getTime()) || isNaN(asOf.getTime())) return;
    if (asOf <= start) return;

    const res = calcAnnualLeave(start, asOf);
    if (res) setResult(res);
  };

  const reset = () => {
    setStartDate("");
    setAsOfDate(todayStr);
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("alStartDate")}</Label>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>{t("alAsOfDate")}</Label>
        <Input
          type="date"
          value={asOfDate}
          onChange={(e) => setAsOfDate(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="mt-2 space-y-4">
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">{t("alWorkPeriod")}</p>
            <p className="font-semibold">
              {result.years > 0 && `${result.years}${t("alYears")} `}
              {result.months > 0 && `${result.months}${t("alMonths")} `}
              {result.days > 0 && `${result.days}${t("alDays")}`}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("alTotalLeave")}</p>
            <p className="text-3xl font-bold text-primary">
              {result.totalLeave}{t("alDays")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
