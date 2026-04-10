"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HOMELESS_OPTIONS = [
  { label: "1년 미만", value: "2", points: 2 },
  { label: "1~2년", value: "4", points: 4 },
  { label: "2~3년", value: "6", points: 6 },
  { label: "3~4년", value: "8", points: 8 },
  { label: "4~5년", value: "10", points: 10 },
  { label: "5~6년", value: "12", points: 12 },
  { label: "6~7년", value: "14", points: 14 },
  { label: "7~8년", value: "16", points: 16 },
  { label: "8~9년", value: "18", points: 18 },
  { label: "9~10년", value: "20", points: 20 },
  { label: "10~11년", value: "22", points: 22 },
  { label: "11~12년", value: "24", points: 24 },
  { label: "12~13년", value: "26", points: 26 },
  { label: "13~14년", value: "28", points: 28 },
  { label: "14~15년", value: "30", points: 30 },
  { label: "15년 이상", value: "32", points: 32 },
];

const DEPENDENTS_OPTIONS = [
  { label: "0명", value: "5", points: 5 },
  { label: "1명", value: "10", points: 10 },
  { label: "2명", value: "15", points: 15 },
  { label: "3명", value: "20", points: 20 },
  { label: "4명", value: "25", points: 25 },
  { label: "5명", value: "30", points: 30 },
  { label: "6명 이상", value: "35", points: 35 },
];

const SUBSCRIPTION_OPTIONS = [
  { label: "6개월 미만", value: "1", points: 1 },
  { label: "6~12개월", value: "2", points: 2 },
  { label: "1~2년", value: "3", points: 3 },
  { label: "2~3년", value: "4", points: 4 },
  { label: "3~4년", value: "5", points: 5 },
  { label: "4~5년", value: "6", points: 6 },
  { label: "5~6년", value: "7", points: 7 },
  { label: "6~7년", value: "8", points: 8 },
  { label: "7~8년", value: "9", points: 9 },
  { label: "8~9년", value: "10", points: 10 },
  { label: "9~10년", value: "11", points: 11 },
  { label: "10~11년", value: "12", points: 12 },
  { label: "11~12년", value: "13", points: 13 },
  { label: "12~13년", value: "14", points: 14 },
  { label: "13~14년", value: "15", points: 15 },
  { label: "14~15년", value: "16", points: 16 },
  { label: "15년 이상", value: "17", points: 17 },
];

interface Result {
  homelessPoints: number;
  dependentsPoints: number;
  subscriptionPoints: number;
  totalPoints: number;
}

export default function HousingPointsClient() {
  const t = useTranslations("calculators");
  const [homelessPeriod, setHomelessPeriod] = useState("");
  const [dependents, setDependents] = useState("");
  const [subscriptionPeriod, setSubscriptionPeriod] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const hp = parseInt(homelessPeriod) || 0;
    const dp = parseInt(dependents) || 0;
    const sp = parseInt(subscriptionPeriod) || 0;

    setResult({
      homelessPoints: hp,
      dependentsPoints: dp,
      subscriptionPoints: sp,
      totalPoints: hp + dp + sp,
    });
  };

  const reset = () => {
    setHomelessPeriod("");
    setDependents("");
    setSubscriptionPeriod("");
    setResult(null);
  };

  const MAX_POINTS = 84;

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("hpHomelessPeriod")} (0~32)</Label>
        <Select value={homelessPeriod} onValueChange={(v) => { if (v) setHomelessPeriod(v); }}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent>
            {HOMELESS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label} ({opt.points}점)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>{t("hpDependents")} (0~35)</Label>
        <Select value={dependents} onValueChange={(v) => { if (v) setDependents(v); }}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent>
            {DEPENDENTS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label} ({opt.points}점)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>{t("hpSubscriptionPeriod")} (0~17)</Label>
        <Select value={subscriptionPeriod} onValueChange={(v) => { if (v) setSubscriptionPeriod(v); }}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent>
            {SUBSCRIPTION_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label} ({opt.points}점)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="mt-2 space-y-4">
          <div className="p-4 rounded-xl bg-primary/10 text-center">
            <p className="text-sm text-muted-foreground mb-1">{t("hpTotalPoints")}</p>
            <p className="text-4xl font-bold text-primary">
              {result.totalPoints}<span className="text-lg text-muted-foreground">/{t("hpMaxPoints")}</span>
            </p>
          </div>

          {/* Progress bar */}
          <div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${Math.round((result.totalPoints / MAX_POINTS) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-right mt-1">
              {Math.round((result.totalPoints / MAX_POINTS) * 100)}%
            </p>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("hpHomelessPeriod")}</p>
              <p className="font-semibold text-sm">{result.homelessPoints}점</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("hpDependents")}</p>
              <p className="font-semibold text-sm">{result.dependentsPoints}점</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("hpSubscriptionPeriod")}</p>
              <p className="font-semibold text-sm">{result.subscriptionPoints}점</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
