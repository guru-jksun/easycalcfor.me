"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TimeCalculatorClient() {
  const t = useTranslations("calculators");
  const [mode, setMode] = useState<"add" | "subtract">("add");
  const [h1, setH1] = useState(""); const [m1, setM1] = useState(""); const [s1, setS1] = useState("");
  const [h2, setH2] = useState(""); const [m2, setM2] = useState(""); const [s2, setS2] = useState("");
  const [result, setResult] = useState<{ hh: number; mm: number; ss: number; totalH: number; totalM: number; totalS: number } | null>(null);

  const calculate = () => {
    const sec1 = (parseInt(h1) || 0) * 3600 + (parseInt(m1) || 0) * 60 + (parseInt(s1) || 0);
    const sec2 = (parseInt(h2) || 0) * 3600 + (parseInt(m2) || 0) * 60 + (parseInt(s2) || 0);
    const total = mode === "add" ? sec1 + sec2 : Math.abs(sec1 - sec2);
    const hh = Math.floor(total / 3600);
    const mm = Math.floor((total % 3600) / 60);
    const ss = total % 60;
    setResult({ hh, mm, ss, totalH: total / 3600, totalM: total / 60, totalS: total });
  };

  const reset = () => { setH1(""); setM1(""); setS1(""); setH2(""); setM2(""); setS2(""); setResult(null); };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <Tabs value={mode} onValueChange={(v) => { setMode(v as "add" | "subtract"); setResult(null); }}>
        <TabsList className="w-full">
          <TabsTrigger value="add" className="flex-1">{t("timeCalcAdd")}</TabsTrigger>
          <TabsTrigger value="subtract" className="flex-1">{t("timeCalcSubtract")}</TabsTrigger>
        </TabsList>
      </Tabs>
      <div>
        <Label className="text-xs">{t("timeCalcTime1")}</Label>
        <div className="grid grid-cols-3 gap-2 mt-1">
          <Input type="number" placeholder={t("timeCalcHours")} value={h1} onChange={(e) => setH1(e.target.value)} />
          <Input type="number" placeholder={t("timeCalcMinutes")} value={m1} onChange={(e) => setM1(e.target.value)} />
          <Input type="number" placeholder={t("timeCalcSeconds")} value={s1} onChange={(e) => setS1(e.target.value)} />
        </div>
      </div>
      <div>
        <Label className="text-xs">{t("timeCalcTime2")}</Label>
        <div className="grid grid-cols-3 gap-2 mt-1">
          <Input type="number" placeholder={t("timeCalcHours")} value={h2} onChange={(e) => setH2(e.target.value)} />
          <Input type="number" placeholder={t("timeCalcMinutes")} value={m2} onChange={(e) => setM2(e.target.value)} />
          <Input type="number" placeholder={t("timeCalcSeconds")} value={s2} onChange={(e) => setS2(e.target.value)} />
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>
      {result && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-primary/10 text-center">
            <p className="text-sm text-muted-foreground mb-1">{t("timeCalcTotal")}</p>
            <p className="text-3xl font-bold text-primary font-mono">{String(result.hh).padStart(2, "0")}:{String(result.mm).padStart(2, "0")}:{String(result.ss).padStart(2, "0")}</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("timeCalcTotalHours")}</p>
              <p className="font-semibold text-xs">{result.totalH.toFixed(2)}</p>
            </div>
            <div className="p-2 rounded-lg bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("timeCalcTotalMinutes")}</p>
              <p className="font-semibold text-xs">{result.totalM.toFixed(1)}</p>
            </div>
            <div className="p-2 rounded-lg bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">{t("timeCalcTotalSeconds")}</p>
              <p className="font-semibold text-xs">{result.totalS}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
