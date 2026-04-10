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
  totalDays: number;
  severancePay: number;
  afterTax: number;
}

function fmtKRW(n: number) {
  return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(n);
}

function calcWorkPeriod(startDate: Date, endDate: Date) {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  return { years, months, days, totalDays };
}

export default function SeverancePayClient() {
  const t = useTranslations("calculators");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [avgSalary, setAvgSalary] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    if (!startDate || !endDate || !avgSalary) return;

    const start = new Date(startDate + "T00:00:00");
    const end = new Date(endDate + "T00:00:00");
    const salary = parseFloat(avgSalary);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || isNaN(salary) || salary <= 0) return;
    if (end <= start) return;

    const { years, months, days, totalDays } = calcWorkPeriod(start, end);

    // 퇴직금 = (평균임금 x 30일 x 총 근무일수) / 365
    const severancePay = (salary / 30) * 30 * totalDays / 365;

    // 퇴직소득세 간이 계산 (약 6% 추정)
    const taxRate = 0.06;
    const afterTax = severancePay * (1 - taxRate);

    setResult({ years, months, days, totalDays, severancePay, afterTax });
  };

  const reset = () => {
    setStartDate("");
    setEndDate("");
    setAvgSalary("");
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("spStartDate")}</Label>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>{t("spEndDate")}</Label>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>{t("spAvgSalary")}</Label>
        <Input
          type="number"
          placeholder="3,000,000"
          value={avgSalary}
          onChange={(e) => setAvgSalary(e.target.value)}
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
            <p className="text-sm text-muted-foreground mb-1">{t("spWorkPeriod")}</p>
            <p className="font-semibold">
              {result.years > 0 && `${result.years}${t("alYears")} `}
              {result.months > 0 && `${result.months}${t("alMonths")} `}
              {result.days > 0 && `${result.days}${t("alDays")}`}
              <span className="text-sm text-muted-foreground ml-2">({result.totalDays}days)</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("spSeverancePay")}</p>
            <p className="text-3xl font-bold text-primary">{fmtKRW(result.severancePay)}</p>
          </div>

          <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-center">
            <p className="text-xs text-muted-foreground">{t("spAfterTax")}</p>
            <p className="font-semibold text-sm text-green-600">{fmtKRW(result.afterTax)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
