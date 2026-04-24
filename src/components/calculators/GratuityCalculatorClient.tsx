"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Covered = "covered" | "notCovered";

function fmtINR(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

export default function GratuityCalculatorClient() {
  const t = useTranslations("calculators");
  const [lastSalary, setLastSalary] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("0");
  const [coverage, setCoverage] = useState<Covered>("covered");

  const result = useMemo(() => {
    const s = parseFloat(lastSalary);
    const y = parseFloat(years);
    const m = parseFloat(months) || 0;

    if (!s || !y || y < 0 || s <= 0) return null;

    // Payment of Gratuity Act 1972: Minimum 5 years service required (with some exceptions)
    const totalYearsDecimal = y + m / 12;
    const eligible = totalYearsDecimal >= 5;

    let gratuity = 0;
    let formula = "";

    if (coverage === "covered") {
      // If covered under Act: (15 × last salary × years of service) / 26
      // Year rounding: >= 6 months counted as full year
      const countedYears = y + (m >= 6 ? 1 : 0);
      gratuity = (15 * s * countedYears) / 26;
      formula = "(15 × lastSalary × years) / 26";
    } else {
      // If not covered: (15 × last salary × years of service) / 30
      // Only completed years counted
      const countedYears = y;
      gratuity = (15 * s * countedYears) / 30;
      formula = "(15 × lastSalary × years) / 30";
    }

    // Cap at ₹20 lakh for tax-free exemption (government employees different)
    const taxFreeGratuity = Math.min(gratuity, 2_000_000);
    const taxable = Math.max(0, gratuity - 2_000_000);

    return {
      eligible,
      gratuity: Math.round(gratuity),
      taxFreeGratuity: Math.round(taxFreeGratuity),
      taxable: Math.round(taxable),
      years: totalYearsDecimal,
      formula,
    };
  }, [lastSalary, years, months, coverage]);

  const reset = () => {
    setLastSalary("");
    setYears("");
    setMonths("0");
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-md space-y-4">
      <div>
        <Label>{t("gratCoverage")}</Label>
        <Select value={coverage} onValueChange={(v) => setCoverage(v as Covered)}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="covered">{t("gratCovered")}</SelectItem>
            <SelectItem value="notCovered">{t("gratNotCovered")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>{t("gratLastSalary")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 50000`}
          value={lastSalary}
          onChange={(e) => setLastSalary(e.target.value)}
          className="mt-1"
        />
        <p className="text-xs text-muted-foreground mt-1">{t("gratSalaryNote")}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>{t("gratYears")}</Label>
          <Input
            type="number"
            placeholder={`${t("egPrefix")} 10`}
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label>{t("gratMonths")}</Label>
          <Input
            type="number"
            min="0"
            max="11"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="mt-2 space-y-4">
          {!result.eligible && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-sm text-amber-800 dark:text-amber-300">
              ⚠ {t("gratIneligible")}
            </div>
          )}

          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("gratTotalGratuity")}</p>
            <p className="text-3xl font-bold text-primary">{fmtINR(result.gratuity)}</p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">{result.formula}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("gratTaxFree")}</p>
              <p className="font-semibold text-sm text-green-700">{fmtINR(result.taxFreeGratuity)}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-center">
              <p className="text-xs text-muted-foreground">{t("gratTaxable")}</p>
              <p className="font-semibold text-sm text-red-600">{fmtINR(result.taxable)}</p>
            </div>
          </div>

          {result.taxable > 0 && (
            <div className="text-xs text-muted-foreground border-t pt-3">
              {t("gratTaxableNote")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
