"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  nextBirthdayDays: number;
  nextBirthdayDate: string;
  heartbeats: number;
  breaths: number;
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

function calculateAge(birthDate: Date, asOf: Date): AgeResult {
  let years = asOf.getFullYear() - birthDate.getFullYear();
  let months = asOf.getMonth() - birthDate.getMonth();
  let days = asOf.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((asOf.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);

  // Next birthday
  let nextBirthday = new Date(asOf.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday <= asOf) {
    nextBirthday = new Date(asOf.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
  }
  const nextBirthdayDays = Math.ceil((nextBirthday.getTime() - asOf.getTime()) / (1000 * 60 * 60 * 24));
  const nextBirthdayDate = nextBirthday.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const totalMinutes = totalDays * 24 * 60;
  const heartbeats = totalMinutes * 70;
  const breaths = totalMinutes * 15;

  return { years, months, days, totalDays, totalWeeks, nextBirthdayDays, nextBirthdayDate, heartbeats, breaths };
}

export default function AgeCalculatorClient() {
  const t = useTranslations("calculators");
  const todayStr = new Date().toISOString().split("T")[0];
  const [birthdate, setBirthdate] = useState("");
  const [asOf, setAsOf] = useState(todayStr);
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    if (!birthdate) { setError(t("ageErrNoBirthdate")); return; }
    const birth = new Date(birthdate + "T00:00:00");
    const ref = new Date((asOf || todayStr) + "T00:00:00");
    if (isNaN(birth.getTime()) || isNaN(ref.getTime())) { setError(t("ageErrInvalidDate")); return; }
    if (birth > ref) { setError(t("ageErrBirthBeforeAsOf")); return; }
    setResult(calculateAge(birth, ref));
  };

  const reset = () => {
    setBirthdate("");
    setAsOf(todayStr);
    setResult(null);
    setError("");
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label htmlFor="birthdate">{t("ageDateOfBirth")}</Label>
        <Input
          id="birthdate"
          type="date"
          value={birthdate}
          max={todayStr}
          onChange={(e) => setBirthdate(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="asof">{t("ageCalculateAsOf")}</Label>
        <Input
          id="asof"
          type="date"
          value={asOf}
          onChange={(e) => setAsOf(e.target.value)}
          className="mt-1"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-2 pt-1">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="space-y-4 mt-2">
          {/* Primary result */}
          <div className="rounded-xl bg-primary/10 p-4">
            <p className="text-sm text-muted-foreground mb-2">{t("ageYourAge")}</p>
            <div className="flex gap-4 text-center">
              {[
                { label: t("ageYearsLabel"), value: result.years },
                { label: t("ageMonthsLabel"), value: result.months },
                { label: t("ageDaysLabel"), value: result.days },
              ].map(({ label, value }) => (
                <div key={label} className="flex-1">
                  <p className="text-3xl font-bold text-primary">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-muted/50 p-3 text-center">
              <p className="text-xs text-muted-foreground">{t("ageTotalDays")}</p>
              <p className="font-semibold text-sm">{fmt(result.totalDays)}</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3 text-center">
              <p className="text-xs text-muted-foreground">{t("ageTotalWeeks")}</p>
              <p className="font-semibold text-sm">{fmt(result.totalWeeks)}</p>
            </div>
          </div>

          {/* Next birthday */}
          <div className="rounded-xl border p-3">
            <p className="text-xs text-muted-foreground">{t("ageNextBirthday")}</p>
            <p className="font-semibold text-sm">{result.nextBirthdayDate}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {result.nextBirthdayDays === 0 ? t("ageHappyBirthday") : t("ageInDays", { days: result.nextBirthdayDays })}
            </p>
          </div>

          {/* Fun facts */}
          <div className="rounded-xl bg-muted/30 p-4">
            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">{t("ageFunFacts")}</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("ageHeartbeats")}</span>
                <span className="font-medium">{fmt(result.heartbeats)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("ageBreaths")}</span>
                <span className="font-medium">{fmt(result.breaths)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
