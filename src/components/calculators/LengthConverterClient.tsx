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

type LengthUnit =
  | "km"
  | "m"
  | "cm"
  | "mm"
  | "mile"
  | "yard"
  | "foot"
  | "inch"
  | "nmi";

interface UnitDef {
  key: LengthUnit;
  label: string;
  toMeter: number;
}

const UNITS: UnitDef[] = [
  { key: "km",   label: "Kilometer (km)",      toMeter: 1000 },
  { key: "m",    label: "Meter (m)",            toMeter: 1 },
  { key: "cm",   label: "Centimeter (cm)",      toMeter: 0.01 },
  { key: "mm",   label: "Millimeter (mm)",      toMeter: 0.001 },
  { key: "mile", label: "Mile (mi)",            toMeter: 1609.344 },
  { key: "yard", label: "Yard (yd)",            toMeter: 0.9144 },
  { key: "foot", label: "Foot (ft)",            toMeter: 0.3048 },
  { key: "inch", label: "Inch (in)",            toMeter: 0.0254 },
  { key: "nmi",  label: "Nautical Mile (nmi)",  toMeter: 1852 },
];

function formatNum(n: number): string {
  if (!isFinite(n)) return "—";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e-4 && abs < 1e7) {
    // up to 6 significant digits, strip trailing zeros
    return parseFloat(n.toPrecision(6)).toString();
  }
  return n.toExponential(4);
}

export default function LengthConverterClient() {
  const t = useTranslations("calculators");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState<LengthUnit>("m");

  const fromDef = UNITS.find((u) => u.key === fromUnit)!;
  const meters = parseFloat(value) * fromDef.toMeter;
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
          <Select value={fromUnit} onValueChange={(v) => setFromUnit(v as LengthUnit)}>
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
                const result = meters / u.toMeter;
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
