"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type WeightUnit = "kg" | "g" | "mg" | "mt" | "lb" | "oz" | "stone" | "uston";

interface UnitDef {
  key: WeightUnit;
  label: string;
  toKg: number;
}

const UNITS: UnitDef[] = [
  { key: "kg",    label: "Kilogram (kg)",     toKg: 1 },
  { key: "g",     label: "Gram (g)",          toKg: 0.001 },
  { key: "mg",    label: "Milligram (mg)",    toKg: 1e-6 },
  { key: "mt",    label: "Metric Ton (t)",    toKg: 1000 },
  { key: "lb",    label: "Pound (lb)",        toKg: 0.45359237 },
  { key: "oz",    label: "Ounce (oz)",        toKg: 0.028349523125 },
  { key: "stone", label: "Stone (st)",        toKg: 6.35029318 },
  { key: "uston", label: "US Ton (short ton)", toKg: 907.18474 },
];

function formatNum(n: number): string {
  if (!isFinite(n)) return "—";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e-4 && abs < 1e10) {
    return parseFloat(n.toPrecision(6)).toString();
  }
  return n.toExponential(4);
}

export default function WeightConverterClient() {
  const t = useTranslations("calculators");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState<WeightUnit>("kg");

  const fromDef = UNITS.find((u) => u.key === fromUnit)!;
  const kg = parseFloat(value) * fromDef.toKg;
  const hasValue = value !== "" && !isNaN(parseFloat(value));

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label className="mb-1 block">{t("convValue")}</Label>
          <Input
            type="number"
            placeholder={t("enterNumber")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div>
          <Label className="mb-1 block">{t("convFromUnit")}</Label>
          <Select value={fromUnit} onValueChange={(v) => setFromUnit(v as WeightUnit)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {UNITS.map((u) => (
                <SelectItem key={u.key} value={u.key}>
                  {u.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasValue && (
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-2 font-medium text-muted-foreground">{t("convUnit")}</th>
                <th className="px-4 py-2 font-medium text-muted-foreground text-right">{t("result")}</th>
              </tr>
            </thead>
            <tbody>
              {UNITS.map((u, i) => {
                const result = kg / u.toKg;
                const isFrom = u.key === fromUnit;
                return (
                  <tr
                    key={u.key}
                    className={`border-t ${isFrom ? "bg-primary/5 font-semibold" : i % 2 === 0 ? "" : "bg-muted/20"}`}
                  >
                    <td className="px-4 py-2.5">{u.label}</td>
                    <td className="px-4 py-2.5 text-right font-mono">{formatNum(result)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!hasValue && (
        <p className="text-center text-sm text-muted-foreground py-6">
          {t("convEnterValue")}
        </p>
      )}
    </div>
  );
}
