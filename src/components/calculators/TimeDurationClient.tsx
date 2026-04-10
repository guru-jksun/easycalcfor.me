"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DurationResult {
  hh: number;
  mm: number;
  ss: number;
  totalHoursDecimal: number;
  totalMinutes: number;
  totalSeconds: number;
}

function parseTime(str: string): { h: number; m: number; s: number } | null {
  const parts = str.trim().split(":").map(Number);
  if (parts.some(isNaN)) return null;
  if (parts.length === 2) return { h: parts[0], m: parts[1], s: 0 };
  if (parts.length === 3) return { h: parts[0], m: parts[1], s: parts[2] };
  return null;
}

function toSeconds(t: { h: number; m: number; s: number }) {
  return t.h * 3600 + t.m * 60 + t.s;
}

function secondsToHms(total: number): { hh: number; mm: number; ss: number } {
  const hh = Math.floor(total / 3600);
  const mm = Math.floor((total % 3600) / 60);
  const ss = total % 60;
  return { hh, mm, ss };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function addTimeToBase(base: { h: number; m: number; s: number }, addH: number, addM: number, subtract: boolean): DurationResult {
  let totalSec = toSeconds(base);
  const delta = addH * 3600 + addM * 60;
  totalSec = subtract ? totalSec - delta : totalSec + delta;
  // Keep within 24h
  totalSec = ((totalSec % 86400) + 86400) % 86400;
  const { hh, mm, ss } = secondsToHms(totalSec);
  return {
    hh, mm, ss,
    totalHoursDecimal: Math.round((totalSec / 3600) * 100) / 100,
    totalMinutes: Math.round(totalSec / 60),
    totalSeconds: totalSec,
  };
}

export default function TimeDurationClient() {
  const t = useTranslations("calculators");
  const [startTime, setStartTime] = useState("09:00:00");
  const [endTime, setEndTime] = useState("17:30:00");
  const [crossesMidnight, setCrossesMidnight] = useState(false);
  const [result, setResult] = useState<DurationResult | null>(null);
  const [error, setError] = useState("");

  // Add/subtract mode
  const [baseTime, setBaseTime] = useState("09:00:00");
  const [addHours, setAddHours] = useState("");
  const [addMinutes, setAddMinutes] = useState("");
  const [addSubMode, setAddSubMode] = useState<"add" | "subtract">("add");
  const [addResult, setAddResult] = useState<string | null>(null);
  const [addError, setAddError] = useState("");

  const calculateDuration = () => {
    setError("");
    const s = parseTime(startTime);
    const e = parseTime(endTime);
    if (!s || !e) { setError(t("tdErrValidTime")); return; }

    let startSec = toSeconds(s);
    let endSec = toSeconds(e);
    if (crossesMidnight && endSec < startSec) endSec += 86400;
    if (!crossesMidnight && endSec < startSec) { setError(t("tdErrCrossesMidnight")); return; }

    const diffSec = endSec - startSec;
    const { hh, mm, ss } = secondsToHms(diffSec);
    setResult({
      hh, mm, ss,
      totalHoursDecimal: Math.round((diffSec / 3600) * 10000) / 10000,
      totalMinutes: Math.round(diffSec / 60),
      totalSeconds: diffSec,
    });
  };

  const calculateAdd = () => {
    setAddError("");
    const base = parseTime(baseTime);
    if (!base) { setAddError(t("tdErrBaseTime")); return; }
    const h = parseFloat(addHours) || 0;
    const m = parseFloat(addMinutes) || 0;
    const res = addTimeToBase(base, h, m, addSubMode === "subtract");
    setAddResult(`${pad(res.hh)}:${pad(res.mm)}:${pad(res.ss)}`);
  };

  const reset = () => {
    setStartTime("09:00:00");
    setEndTime("17:30:00");
    setCrossesMidnight(false);
    setResult(null);
    setError("");
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-5">
      {/* Duration section */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="start-time">{t("tdStartTime")}</Label>
          <Input
            id="start-time"
            type="text"
            placeholder="09:00:00"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 font-mono"
          />
        </div>

        <div>
          <Label htmlFor="end-time">{t("tdEndTime")}</Label>
          <Input
            id="end-time"
            type="text"
            placeholder="17:30:00"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 font-mono"
          />
        </div>

        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={crossesMidnight}
            onChange={(e) => setCrossesMidnight(e.target.checked)}
            className="rounded"
          />
          {t("tdCrossesMidnight")}
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex gap-2">
          <Button onClick={calculateDuration} className="flex-1">{t("calculate")}</Button>
          <Button variant="outline" onClick={reset}>{t("reset")}</Button>
        </div>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="rounded-xl bg-primary/10 p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">{t("tdDuration")}</p>
            <p className="text-4xl font-bold text-primary font-mono">
              {pad(result.hh)}:{pad(result.mm)}:{pad(result.ss)}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: t("tdHoursDec"), value: result.totalHoursDecimal.toFixed(4) },
              { label: t("tdMinutes"), value: String(result.totalMinutes) },
              { label: t("tdSeconds"), value: String(result.totalSeconds) },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-muted/50 p-3 text-center">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-semibold text-sm mt-0.5 font-mono">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t pt-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">{t("tdAddSubtract")}</p>

        <div className="space-y-3">
          <div>
            <Label htmlFor="base-time">{t("tdBaseTime")}</Label>
            <Input
              id="base-time"
              type="text"
              placeholder="09:00:00"
              value={baseTime}
              onChange={(e) => setBaseTime(e.target.value)}
              className="mt-1 font-mono"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <Label>{t("tdHours")}</Label>
              <Input
                type="number"
                placeholder="0"
                min="0"
                value={addHours}
                onChange={(e) => setAddHours(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex-1">
              <Label>{t("tdMinutes")}</Label>
              <Input
                type="number"
                placeholder="0"
                min="0"
                value={addMinutes}
                onChange={(e) => setAddMinutes(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={addSubMode === "add" ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => setAddSubMode("add")}
            >
              {t("tdAdd")}
            </Button>
            <Button
              variant={addSubMode === "subtract" ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => setAddSubMode("subtract")}
            >
              {t("tdSubtract")}
            </Button>
          </div>

          {addError && <p className="text-sm text-red-500">{addError}</p>}

          <Button onClick={calculateAdd} variant="outline" className="w-full">{t("calculate")}</Button>

          {addResult && (
            <div className="rounded-xl bg-muted/50 p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">{t("result")}</p>
              <p className="text-2xl font-bold font-mono">{addResult}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
