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

type SpeedUnit = "mph" | "kmh" | "ms" | "knot" | "fts" | "mach";

interface UnitDef {
  key: SpeedUnit;
  label: string;
  toMs: number; // conversion factor to m/s
}

// Base unit: m/s
const UNITS: UnitDef[] = [
  { key: "mph",  label: "Miles per hour (mph)",    toMs: 0.44704 },
  { key: "kmh",  label: "Kilometers per hour (km/h)", toMs: 1 / 3.6 },
  { key: "ms",   label: "Meters per second (m/s)", toMs: 1 },
  { key: "knot", label: "Knot (kn)",               toMs: 0.514444 },
  { key: "fts",  label: "Feet per second (ft/s)",  toMs: 0.3048 },
  { key: "mach", label: "Mach (at sea level)",     toMs: 340.29 },
];

function formatNum(n: number): string {
  if (!isFinite(n)) return "—";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e-4 && abs < 1e9) {
    return parseFloat(n.toPrecision(6)).toString();
  }
  return n.toExponential(4);
}

export default function SpeedConverterClient() {
  const t = useTranslations("calculators");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState<SpeedUnit>("kmh");

  const fromDef = UNITS.find((u) => u.key === fromUnit)!;
  const ms = parseFloat(value) * fromDef.toMs;
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
          <Select value={fromUnit} onValueChange={(v) => setFromUnit(v as SpeedUnit)}>
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
                const result = ms / u.toMs;
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
