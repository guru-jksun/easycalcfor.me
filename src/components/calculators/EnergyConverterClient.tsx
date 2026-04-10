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

type EnergyUnit = "J" | "kJ" | "cal" | "kcal" | "Wh" | "kWh" | "BTU" | "ftlb";

interface UnitDef {
  key: EnergyUnit;
  label: string;
  toJoule: number;
}

// Base unit: Joule
const UNITS: UnitDef[] = [
  { key: "J",    label: "Joule (J)",              toJoule: 1 },
  { key: "kJ",   label: "Kilojoule (kJ)",         toJoule: 1000 },
  { key: "cal",  label: "Calorie (cal)",           toJoule: 4.184 },
  { key: "kcal", label: "Kilocalorie (kcal)",      toJoule: 4184 },
  { key: "Wh",   label: "Watt-hour (Wh)",         toJoule: 3600 },
  { key: "kWh",  label: "Kilowatt-hour (kWh)",    toJoule: 3_600_000 },
  { key: "BTU",  label: "BTU (British Thermal Unit)", toJoule: 1055.06 },
  { key: "ftlb", label: "Foot-pound (ft·lb)",     toJoule: 1.35582 },
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

export default function EnergyConverterClient() {
  const t = useTranslations("calculators");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState<EnergyUnit>("J");

  const fromDef = UNITS.find((u) => u.key === fromUnit)!;
  const joules = parseFloat(value) * fromDef.toJoule;
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
          <Select value={fromUnit} onValueChange={(v) => setFromUnit(v as EnergyUnit)}>
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
                const result = joules / u.toJoule;
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
