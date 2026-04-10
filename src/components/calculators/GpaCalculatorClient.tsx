"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type GradeSystem = "us4" | "kr45" | "jp" | "pct";

interface GradeOption {
  label: string;
  value: number;
}

const GRADE_OPTIONS: Record<Exclude<GradeSystem, "pct">, GradeOption[]> = {
  us4: [
    { label: "A+", value: 4.0 },
    { label: "A",  value: 4.0 },
    { label: "A-", value: 3.7 },
    { label: "B+", value: 3.3 },
    { label: "B",  value: 3.0 },
    { label: "B-", value: 2.7 },
    { label: "C+", value: 2.3 },
    { label: "C",  value: 2.0 },
    { label: "C-", value: 1.7 },
    { label: "D+", value: 1.3 },
    { label: "D",  value: 1.0 },
    { label: "D-", value: 0.7 },
    { label: "F",  value: 0.0 },
  ],
  kr45: [
    { label: "A+", value: 4.5 },
    { label: "A0", value: 4.0 },
    { label: "B+", value: 3.5 },
    { label: "B0", value: 3.0 },
    { label: "C+", value: 2.5 },
    { label: "C0", value: 2.0 },
    { label: "D+", value: 1.5 },
    { label: "D0", value: 1.0 },
    { label: "F",  value: 0.0 },
  ],
  jp: [
    { label: "S", value: 4.0 },
    { label: "A", value: 3.0 },
    { label: "B", value: 2.0 },
    { label: "C", value: 1.0 },
    { label: "D/F", value: 0.0 },
  ],
};

const MAX_SCALE: Record<GradeSystem, number> = {
  us4: 4.0,
  kr45: 4.5,
  jp: 4.0,
  pct: 10.0,
};

interface CourseRow {
  id: number;
  name: string;
  credits: string;
  grade: string;       // grade label for dropdown systems
  score: string;       // raw score for percentage system
}

function getLetterBucket(system: GradeSystem, gradeLabel: string, score: string): string {
  if (system === "pct") {
    const s = parseFloat(score);
    if (isNaN(s)) return "";
    if (s >= 90) return "A";
    if (s >= 80) return "B";
    if (s >= 70) return "C";
    if (s >= 60) return "D";
    return "F";
  }
  if (system === "jp") {
    return gradeLabel; // S, A, B, C, D/F
  }
  // US & Korean: first letter
  if (!gradeLabel) return "";
  return gradeLabel[0]; // A, B, C, D, F
}

function getHonorLabel(gpa: number, maxScale: number): { labelKey: string; color: string } | null {
  const ratio = gpa / maxScale;
  if (ratio >= 0.975) return { labelKey: "gpaSummaCumLaude", color: "text-yellow-600" };
  if (ratio >= 0.925) return { labelKey: "gpaMagnaCumLaude", color: "text-blue-600" };
  if (ratio >= 0.875) return { labelKey: "gpaCumLaude", color: "text-green-600" };
  return null;
}

let nextId = 5;
function makeRow(): CourseRow {
  return { id: nextId++, name: "", credits: "3", grade: "", score: "" };
}

const MAX_COURSES = 20;

export default function GpaCalculatorClient() {
  const t = useTranslations("calculators");
  const [system, setSystem] = useState<GradeSystem>("us4");
  const [courses, setCourses] = useState<CourseRow[]>([
    { id: 1, name: "", credits: "3", grade: "", score: "" },
    { id: 2, name: "", credits: "3", grade: "", score: "" },
    { id: 3, name: "", credits: "3", grade: "", score: "" },
    { id: 4, name: "", credits: "3", grade: "", score: "" },
  ]);
  const [result, setResult] = useState<{
    gpa: number;
    totalCredits: number;
    distribution: Record<string, number>;
  } | null>(null);

  const updateCourse = (id: number, field: keyof CourseRow, value: string) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const addCourse = () => {
    if (courses.length >= MAX_COURSES) return;
    setCourses((prev) => [...prev, makeRow()]);
  };

  const removeCourse = (id: number) => {
    if (courses.length <= 1) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    const distribution: Record<string, number> = {};

    for (const c of courses) {
      const credits = parseFloat(c.credits);
      if (isNaN(credits) || credits <= 0) continue;

      let gradeValue: number | null = null;

      if (system === "pct") {
        const s = parseFloat(c.score);
        if (isNaN(s) || s < 0 || s > 100) continue;
        gradeValue = s / 10;
      } else {
        const options = GRADE_OPTIONS[system];
        const found = options.find((o) => o.label === c.grade);
        if (!found) continue;
        gradeValue = found.value;
      }

      totalPoints += gradeValue * credits;
      totalCredits += credits;

      const bucket = getLetterBucket(system, c.grade, c.score);
      if (bucket) {
        distribution[bucket] = (distribution[bucket] || 0) + 1;
      }
    }

    if (totalCredits === 0) return;

    setResult({
      gpa: Math.round((totalPoints / totalCredits) * 1000) / 1000,
      totalCredits,
      distribution,
    });
  };

  const reset = () => {
    setCourses([
      { id: 1, name: "", credits: "3", grade: "", score: "" },
      { id: 2, name: "", credits: "3", grade: "", score: "" },
      { id: 3, name: "", credits: "3", grade: "", score: "" },
      { id: 4, name: "", credits: "3", grade: "", score: "" },
    ]);
    nextId = 5;
    setResult(null);
  };

  const gradeOptions = system !== "pct" ? GRADE_OPTIONS[system] : [];
  const maxGpa = MAX_SCALE[system];
  const honor = result ? getHonorLabel(result.gpa, maxGpa) : null;

  // Distribution bar colors
  const bucketColors: Record<string, string> = {
    S: "bg-purple-500",
    A: "bg-green-500",
    B: "bg-blue-500",
    C: "bg-yellow-500",
    D: "bg-orange-500",
    "D/F": "bg-red-500",
    F: "bg-red-500",
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-lg">
      {/* System selector */}
      <Tabs value={system} onValueChange={(v) => { setSystem(v as GradeSystem); setResult(null); }}>
        <TabsList className="w-full mb-6 flex-wrap h-auto">
          <TabsTrigger value="us4" className="flex-1 text-xs">{t("gpaTabUs")}</TabsTrigger>
          <TabsTrigger value="kr45" className="flex-1 text-xs">{t("gpaTabKr")}</TabsTrigger>
          <TabsTrigger value="jp" className="flex-1 text-xs">{t("gpaTabJp")}</TabsTrigger>
          <TabsTrigger value="pct" className="flex-1 text-xs">{t("gpaTabPct")}</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Course list header */}
      <div className="grid grid-cols-[1fr_60px_100px_32px] gap-2 mb-2 text-xs font-medium text-muted-foreground px-1">
        <span>{t("gpaCourseName")}</span>
        <span>{t("gpaCredits")}</span>
        <span>{t("gpaGrade")}</span>
        <span />
      </div>

      {/* Course rows */}
      <div className="space-y-2">
        {courses.map((course) => (
          <div key={course.id} className="grid grid-cols-[1fr_60px_100px_32px] gap-2 items-center">
            <Input
              placeholder={t("gpaCourseNamePlaceholder")}
              value={course.name}
              onChange={(e) => updateCourse(course.id, "name", e.target.value)}
              className="h-9 text-sm"
            />
            <Input
              type="number"
              min="0.5"
              max="10"
              step="0.5"
              placeholder="3"
              value={course.credits}
              onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
              className="h-9 text-sm text-center"
            />
            {system === "pct" ? (
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="0-100"
                value={course.score}
                onChange={(e) => updateCourse(course.id, "score", e.target.value)}
                className="h-9 text-sm text-center"
              />
            ) : (
              <Select
                value={course.grade}
                onValueChange={(v) => { if (v) updateCourse(course.id, "grade", v); }}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  {gradeOptions.map((opt) => (
                    <SelectItem key={opt.label} value={opt.label}>
                      {opt.label} ({opt.value})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <button
              onClick={() => removeCourse(course.id)}
              className="h-9 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors text-lg"
              aria-label="Remove course"
            >
              x
            </button>
          </div>
        ))}
      </div>

      {/* Add course button */}
      {courses.length < MAX_COURSES && (
        <button
          onClick={addCourse}
          className="mt-3 w-full py-2 text-sm text-muted-foreground hover:text-foreground border border-dashed rounded-lg transition-colors"
        >
          {t("gpaAddCourse")}
        </button>
      )}

      {/* Calculate / Reset */}
      <div className="flex gap-2 pt-4">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 p-4 rounded-xl bg-primary/10">
          <p className="text-sm text-muted-foreground mb-1">
            GPA ({maxGpa.toFixed(1)} scale)
          </p>
          <p className="text-4xl font-bold text-primary">
            {result.gpa.toFixed(2)}
          </p>

          {honor && (
            <p className={cn("text-sm font-semibold mt-1", honor.color)}>
              {t(honor.labelKey as any)}
            </p>
          )}

          <p className="text-sm text-muted-foreground mt-2">
            {t("gpaTotalCredits")}: {result.totalCredits}
          </p>

          {/* Grade distribution */}
          {Object.keys(result.distribution).length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                {t("gpaDistribution")}
              </p>
              <div className="space-y-1.5">
                {Object.entries(result.distribution)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([bucket, count]) => {
                    const total = Object.values(result.distribution).reduce((s, v) => s + v, 0);
                    const pct = (count / total) * 100;
                    return (
                      <div key={bucket} className="flex items-center gap-2 text-sm">
                        <span className="w-8 font-medium">{bucket}</span>
                        <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full transition-all", bucketColors[bucket] || "bg-gray-400")}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-6 text-xs text-muted-foreground text-right">{count}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
