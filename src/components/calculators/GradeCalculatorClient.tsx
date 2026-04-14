"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Assignment {
  name: string;
  score: string;
  maxScore: string;
  weight: string;
}

function getLetterGrade(avg: number): string {
  if (avg >= 97) return "A+";
  if (avg >= 93) return "A";
  if (avg >= 90) return "A-";
  if (avg >= 87) return "B+";
  if (avg >= 83) return "B";
  if (avg >= 80) return "B-";
  if (avg >= 77) return "C+";
  if (avg >= 73) return "C";
  if (avg >= 70) return "C-";
  if (avg >= 67) return "D+";
  if (avg >= 63) return "D";
  if (avg >= 60) return "D-";
  return "F";
}

export default function GradeCalculatorClient() {
  const t = useTranslations("calculators");
  const [assignments, setAssignments] = useState<Assignment[]>([
    { name: "", score: "", maxScore: "100", weight: "" },
    { name: "", score: "", maxScore: "100", weight: "" },
  ]);
  const [result, setResult] = useState<{ avg: number; letter: string } | null>(null);

  const update = (i: number, field: keyof Assignment, value: string) => {
    const copy = [...assignments];
    copy[i] = { ...copy[i], [field]: value };
    setAssignments(copy);
  };

  const addRow = () =>
    setAssignments([...assignments, { name: "", score: "", maxScore: "100", weight: "" }]);

  const removeRow = (i: number) => {
    if (assignments.length <= 1) return;
    setAssignments(assignments.filter((_, idx) => idx !== i));
  };

  const calculate = () => {
    let totalWeighted = 0;
    let totalWeight = 0;
    for (const a of assignments) {
      const score = parseFloat(a.score);
      const max = parseFloat(a.maxScore);
      const weight = parseFloat(a.weight) || 1;
      if (isNaN(score) || isNaN(max) || max === 0) continue;
      totalWeighted += (score / max) * 100 * weight;
      totalWeight += weight;
    }
    if (totalWeight === 0) return;
    const avg = totalWeighted / totalWeight;
    setResult({ avg, letter: getLetterGrade(avg) });
  };

  const reset = () => {
    setAssignments([
      { name: "", score: "", maxScore: "100", weight: "" },
      { name: "", score: "", maxScore: "100", weight: "" },
    ]);
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-md space-y-4">
      {assignments.map((a, i) => (
        <div key={i} className="grid grid-cols-12 gap-1.5 items-end">
          <div className="col-span-3">
            {i === 0 && <Label className="text-xs">{t("gradeAssignment")}</Label>}
            <Input placeholder={`#${i + 1}`} value={a.name} onChange={(e) => update(i, "name", e.target.value)} className="text-xs h-8" />
          </div>
          <div className="col-span-2">
            {i === 0 && <Label className="text-xs">{t("gradeScore")}</Label>}
            <Input type="number" placeholder="85" value={a.score} onChange={(e) => update(i, "score", e.target.value)} className="text-xs h-8" />
          </div>
          <div className="col-span-2">
            {i === 0 && <Label className="text-xs">{t("gradeMaxScore")}</Label>}
            <Input type="number" placeholder="100" value={a.maxScore} onChange={(e) => update(i, "maxScore", e.target.value)} className="text-xs h-8" />
          </div>
          <div className="col-span-3">
            {i === 0 && <Label className="text-xs">{t("gradeWeight")}</Label>}
            <Input type="number" placeholder="1" value={a.weight} onChange={(e) => update(i, "weight", e.target.value)} className="text-xs h-8" />
          </div>
          <div className="col-span-2">
            <Button variant="ghost" size="sm" onClick={() => removeRow(i)} className="text-xs h-8 text-red-500 px-2">✕</Button>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addRow} className="w-full">{t("gradeAdd")}</Button>
      <div className="flex gap-2">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-primary/10 text-center">
            <p className="text-sm text-muted-foreground mb-1">{t("gradeWeightedAvg")}</p>
            <p className="text-3xl font-bold text-primary">{result.avg.toFixed(1)}%</p>
          </div>
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/40 text-center">
            <p className="text-sm text-muted-foreground mb-1">{t("gradeLetterGrade")}</p>
            <p className="text-3xl font-bold text-green-600">{result.letter}</p>
          </div>
        </div>
      )}
    </div>
  );
}
