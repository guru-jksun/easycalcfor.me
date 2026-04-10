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

type TempUnit = "C" | "F" | "K";

interface Conversion {
  unit: TempUnit;
  label: string;
  value: number;
}

function toCelsius(value: number, from: TempUnit): number {
  if (from === "C") return value;
  if (from === "F") return (value - 32) * (5 / 9);
  return value - 273.15; // K
}

function fromCelsius(celsius: number, to: TempUnit): number {
  if (to === "C") return celsius;
  if (to === "F") return celsius * (9 / 5) + 32;
  return celsius + 273.15; // K
}

function formatNum(n: number): string {
  if (!isFinite(n)) return "—";
  return parseFloat(n.toPrecision(6)).toString();
}

// Thermometer visual: maps Celsius to a 0–100% bar (range: -50 to 150 C)
function getThermometerPct(celsius: number): number {
  return Math.min(100, Math.max(0, ((celsius + 50) / 200) * 100));
}

function getThermometerColor(celsius: number): string {
  if (celsius < 0) return "bg-blue-400";
  if (celsius < 20) return "bg-cyan-400";
  if (celsius < 37) return "bg-green-500";
  if (celsius < 60) return "bg-yellow-500";
  return "bg-red-500";
}

const FORMULAS: { from: TempUnit; to: TempUnit; formula: string }[] = [
  { from: "C", to: "F", formula: "°F = (°C × 9/5) + 32" },
  { from: "F", to: "C", formula: "°C = (°F − 32) × 5/9" },
  { from: "C", to: "K", formula: "K = °C + 273.15" },
  { from: "K", to: "C", formula: "°C = K − 273.15" },
  { from: "F", to: "K", formula: "K = (°F − 32) × 5/9 + 273.15" },
  { from: "K", to: "F", formula: "°F = (K − 273.15) × 9/5 + 32" },
];

export default function TemperatureConverterClient() {
  const t = useTranslations("calculators");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState<TempUnit>("C");

  const hasValue = value !== "" && !isNaN(parseFloat(value));
  const inputNum = parseFloat(value);
  const celsius = hasValue ? toCelsius(inputNum, fromUnit) : 0;

  const conversions: Conversion[] = [
    { unit: "C", label: "Celsius (°C)",    value: fromCelsius(celsius, "C") },
    { unit: "F", label: "Fahrenheit (°F)", value: fromCelsius(celsius, "F") },
    { unit: "K", label: "Kelvin (K)",      value: fromCelsius(celsius, "K") },
  ];

  const pct = getThermometerPct(celsius);
  const color = getThermometerColor(celsius);

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label className="mb-1 block">{t("convTemperature")}</Label>
          <Input
            type="number"
            placeholder={t("enterTemperature")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div>
          <Label className="mb-1 block">{t("convFromUnit")}</Label>
          <Select value={fromUnit} onValueChange={(v) => setFromUnit(v as TempUnit)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="C">Celsius (°C)</SelectItem>
              <SelectItem value="F">Fahrenheit (°F)</SelectItem>
              <SelectItem value="K">Kelvin (K)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasValue && (
        <>
          {/* Thermometer visual */}
          <div className="mb-6 p-4 rounded-xl bg-muted/30 border">
            <p className="text-xs text-muted-foreground mb-2 font-medium">{t("convTempScale")}</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-10 text-right">−50°C</span>
              <div className="flex-1 relative h-4 rounded-full bg-muted overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full rounded-full transition-all ${color}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-10">150°C</span>
            </div>
            <p className="text-center text-sm font-semibold mt-2">
              {formatNum(fromCelsius(celsius, "C"))}°C
            </p>
          </div>

          {/* Results table */}
          <div className="overflow-hidden rounded-xl border mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="px-4 py-2 font-medium text-muted-foreground">{t("convUnit")}</th>
                  <th className="px-4 py-2 font-medium text-muted-foreground text-right">{t("result")}</th>
                </tr>
              </thead>
              <tbody>
                {conversions.map((c, i) => {
                  const isFrom = c.unit === fromUnit;
                  return (
                    <tr
                      key={c.unit}
                      className={`border-t ${isFrom ? "bg-primary/5 font-semibold" : i % 2 === 0 ? "" : "bg-muted/20"}`}
                    >
                      <td className="px-4 py-3">{c.label}</td>
                      <td className="px-4 py-3 text-right font-mono">{formatNum(c.value)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Relevant formulas */}
          <div className="rounded-xl bg-muted/30 border p-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">{t("convFormulas")}</p>
            <ul className="space-y-1">
              {FORMULAS.filter((f) => f.from === fromUnit).map((f) => (
                <li key={`${f.from}-${f.to}`} className="text-xs font-mono text-foreground/80">
                  {f.formula}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {!hasValue && (
        <p className="text-center text-sm text-muted-foreground py-6">
          {t("convEnterTemp")}
        </p>
      )}
    </div>
  );
}
