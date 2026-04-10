"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Branch = "army" | "marines" | "navy" | "airforce" | "police" | "social";

const SERVICE_MONTHS: Record<Branch, number> = {
  army: 18,
  marines: 18,
  navy: 20,
  airforce: 21,
  police: 18,
  social: 21,
};

interface Result {
  dischargeDate: Date;
  dday: number;
  isPast: boolean;
  progress: number;
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  // 전역일은 복무 만료일 전날
  result.setDate(result.getDate() - 1);
  return result;
}

export default function MilitaryDischargeClient() {
  const t = useTranslations("calculators");
  const [enlistDate, setEnlistDate] = useState("");
  const [branch, setBranch] = useState<Branch>("army");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    if (!enlistDate) return;

    const enlist = new Date(enlistDate + "T00:00:00");
    if (isNaN(enlist.getTime())) return;

    const months = SERVICE_MONTHS[branch];
    const dischargeDate = addMonths(enlist, months);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffMs = dischargeDate.getTime() - today.getTime();
    const dday = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const isPast = dday < 0;

    const totalMs = dischargeDate.getTime() - enlist.getTime();
    const elapsedMs = today.getTime() - enlist.getTime();
    const progress = Math.min(Math.max(Math.round((elapsedMs / totalMs) * 100), 0), 100);

    setResult({ dischargeDate, dday: Math.abs(dday), isPast, progress });
  };

  const reset = () => {
    setEnlistDate("");
    setBranch("army");
    setResult(null);
  };

  const branchKeys: { value: Branch; labelKey: string }[] = [
    { value: "army", labelKey: "mdArmy" },
    { value: "marines", labelKey: "mdMarines" },
    { value: "navy", labelKey: "mdNavy" },
    { value: "airforce", labelKey: "mdAirForce" },
    { value: "police", labelKey: "mdPolice" },
    { value: "social", labelKey: "mdSocialService" },
  ];

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("mdEnlistDate")}</Label>
        <Input
          type="date"
          value={enlistDate}
          onChange={(e) => setEnlistDate(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>{t("mdBranch")}</Label>
        <Select value={branch} onValueChange={(v) => setBranch(v as Branch)}>
          <SelectTrigger className="mt-1">
            <SelectValue>{t(branchKeys.find(b => b.value === branch)?.labelKey ?? "mdArmy")}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {branchKeys.map(({ value, labelKey }) => (
              <SelectItem key={value} value={value}>
                {t(labelKey)} ({SERVICE_MONTHS[value]}{t("alMonths")})
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
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">{t("mdDischargeDate")}</p>
            <p className="text-xl font-bold">
              {result.dischargeDate.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </p>
          </div>

          <div className={`p-4 rounded-xl text-center ${result.isPast ? "bg-muted/60" : "bg-primary/10"}`}>
            <p className="text-sm text-muted-foreground mb-1">{t("mdDday")}</p>
            <p className={`text-4xl font-bold ${result.isPast ? "text-muted-foreground" : "text-primary"}`}>
              {result.isPast ? `+${result.dday}` : `D-${result.dday}`}
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{t("mdProgress")}</span>
              <span>{result.progress}%</span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${result.progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
