"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function DayCalculatorClient() {
  const t = useTranslations("calculators");
  const [tab, setTab] = useState<"between" | "addSub">("between");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [addDate, setAddDate] = useState("");
  const [daysToAdd, setDaysToAdd] = useState("");
  const [addMode, setAddMode] = useState<"add" | "subtract">("add");
  const [includeEnd, setIncludeEnd] = useState(false);
  const [betweenResult, setBetweenResult] = useState<{ days: number; weeks: number; remDays: number; months: number } | null>(null);
  const [addResult, setAddResult] = useState<string | null>(null);

  const calcBetween = () => {
    const s = new Date(startDate); const e = new Date(endDate);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return;
    let diff = Math.abs(e.getTime() - s.getTime());
    let days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (includeEnd) days += 1;
    setBetweenResult({ days, weeks: Math.floor(days / 7), remDays: days % 7, months: parseFloat((days / 30.44).toFixed(1)) });
  };

  const calcAddSub = () => {
    const d = new Date(addDate);
    const n = parseInt(daysToAdd) || 0;
    if (isNaN(d.getTime()) || !n) return;
    const ms = n * 24 * 60 * 60 * 1000;
    const result = new Date(addMode === "add" ? d.getTime() + ms : d.getTime() - ms);
    setAddResult(result.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <Tabs value={tab} onValueChange={(v) => { setTab(v as "between" | "addSub"); }}>
        <TabsList className="w-full mb-5">
          <TabsTrigger value="between" className="flex-1">{t("dayCalcBetween")}</TabsTrigger>
          <TabsTrigger value="addSub" className="flex-1">{t("dayCalcAddSubtract")}</TabsTrigger>
        </TabsList>
        <TabsContent value="between">
          <div className="space-y-4">
            <div><Label>{t("dayCalcStartDate")}</Label><Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1" /></div>
            <div><Label>{t("dayCalcEndDate")}</Label><Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1" /></div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" checked={includeEnd} onChange={(e) => setIncludeEnd(e.target.checked)} />
              {t("dayCalcIncludeEnd")}
            </label>
            <Button onClick={calcBetween} className="w-full">{t("calculate")}</Button>
            {betweenResult && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-primary/10 text-center">
                  <p className="text-sm text-muted-foreground mb-1">{t("dayCalcTotalDays")}</p>
                  <p className="text-3xl font-bold text-primary">{betweenResult.days}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <p className="text-xs text-muted-foreground">{t("dayCalcWeeks")}</p>
                    <p className="font-semibold text-sm">{betweenResult.weeks}w {betweenResult.remDays}d</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <p className="text-xs text-muted-foreground">{t("dayCalcMonths")}</p>
                    <p className="font-semibold text-sm">{betweenResult.months}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="addSub">
          <div className="space-y-4">
            <div><Label>{t("dayCalcDate")}</Label><Input type="date" value={addDate} onChange={(e) => setAddDate(e.target.value)} className="mt-1" /></div>
            <div><Label>{t("dayCalcDays")}</Label><Input type="number" placeholder="30" value={daysToAdd} onChange={(e) => setDaysToAdd(e.target.value)} className="mt-1" /></div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setAddMode("add")} className={`flex-1 text-xs py-1.5 rounded border ${addMode === "add" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{t("dayCalcAdd")}</button>
              <button type="button" onClick={() => setAddMode("subtract")} className={`flex-1 text-xs py-1.5 rounded border ${addMode === "subtract" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{t("dayCalcSubtractMode")}</button>
            </div>
            <Button onClick={calcAddSub} className="w-full">{t("calculate")}</Button>
            {addResult && (
              <div className="p-4 rounded-xl bg-primary/10 text-center">
                <p className="text-sm text-muted-foreground mb-1">{t("dayCalcResultDate")}</p>
                <p className="text-lg font-bold text-primary">{addResult}</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
