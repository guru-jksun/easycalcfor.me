"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Unit = "kg" | "lbs";

interface FormulaResult {
  name: string;
  oneRM: number;
}

interface OneRMResult {
  formulas: FormulaResult[];
  average: number;
  percentages: Array<{ pct: number; weight: number }>;
  unit: Unit;
}

const PERCENTAGES = [100, 95, 90, 85, 80, 75, 70];

export default function OneRepMaxCalculatorClient() {
  const t = useTranslations("calculators");
  const [unit, setUnit] = useState<Unit>("kg");
  const [weightLifted, setWeightLifted] = useState("");
  const [reps, setReps] = useState("");
  const [result, setResult] = useState<OneRMResult | null>(null);

  const calculate = () => {
    const w = parseFloat(weightLifted);
    const r = parseInt(reps);

    if (!w || !r || r < 1 || r > 12 || w <= 0) return;

    // Handle r=1 edge case gracefully
    const epley = r === 1 ? w : w * (1 + r / 30);
    const brzycki = r === 1 ? w : w * (36 / (37 - r));
    const lander = r === 1 ? w : (100 * w) / (101.3 - 2.67123 * r);
    const lombardi = r === 1 ? w : w * Math.pow(r, 0.1);

    const formulas: FormulaResult[] = [
      { name: "Epley", oneRM: Math.round(epley * 10) / 10 },
      { name: "Brzycki", oneRM: Math.round(brzycki * 10) / 10 },
      { name: "Lander", oneRM: Math.round(lander * 10) / 10 },
      { name: "Lombardi", oneRM: Math.round(lombardi * 10) / 10 },
    ];

    const average = Math.round(
      (formulas.reduce((sum, f) => sum + f.oneRM, 0) / formulas.length) * 10
    ) / 10;

    const percentages = PERCENTAGES.map((pct) => ({
      pct,
      weight: Math.round((average * pct) / 100 * 10) / 10,
    }));

    setResult({ formulas, average, percentages, unit });
  };

  const reset = () => {
    setWeightLifted(""); setReps(""); setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <Tabs value={unit} onValueChange={(v) => { setUnit(v as Unit); setResult(null); }}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="kg" className="flex-1">{t("tabKg")}</TabsTrigger>
          <TabsTrigger value="lbs" className="flex-1">{t("tabLbs")}</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        <div>
          <Label>{t("ormWeightLifted")} ({unit})</Label>
          <Input
            type="number"
            placeholder={unit === "kg" ? `${t("egPrefix")} 100` : `${t("egPrefix")} 225`}
            value={weightLifted}
            onChange={(e) => setWeightLifted(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label>{t("ormRepsPerformed")} <span className="text-xs text-muted-foreground">(1–12)</span></Label>
          <Input
            type="number"
            placeholder={`${t("egPrefix")} 5`}
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            min="1"
            max="12"
            className="mt-1"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
          <Button variant="outline" onClick={reset}>{t("reset")}</Button>
        </div>
      </div>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="p-4 rounded-xl bg-primary/10 text-center">
            <p className="text-xs text-muted-foreground mb-1">{t("ormAverage1rm")}</p>
            <p className="text-4xl font-bold text-primary">{result.average}</p>
            <p className="text-sm text-muted-foreground">{result.unit}</p>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground">{t("ormFormulaBreakdown")}</p>
            {result.formulas.map((f) => (
              <div key={f.name} className="flex justify-between items-center rounded-lg bg-muted/50 px-3 py-2 text-sm">
                <span className="text-muted-foreground">{f.name}</span>
                <span className="font-semibold">{f.oneRM} {result.unit}</span>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">{t("ormPct1rm")}</p>
            <div className="rounded-xl border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left px-3 py-2 font-medium text-muted-foreground">%</th>
                    <th className="text-right px-3 py-2 font-medium text-muted-foreground">Weight ({result.unit})</th>
                  </tr>
                </thead>
                <tbody>
                  {result.percentages.map(({ pct, weight }) => (
                    <tr key={pct} className={`border-b last:border-0 ${pct === 100 ? "bg-primary/5 font-semibold" : ""}`}>
                      <td className="px-3 py-2">{pct}%</td>
                      <td className="px-3 py-2 text-right">{weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
