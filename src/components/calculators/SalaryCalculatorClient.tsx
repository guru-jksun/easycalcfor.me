"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CountryConfig {
  currency: string;
  locale: string;
  symbol: string;
}

const COUNTRIES: Record<string, CountryConfig> = {
  KR: { currency: "KRW", locale: "ko-KR", symbol: "₩" },
  US: { currency: "USD", locale: "en-US", symbol: "$" },
  JP: { currency: "JPY", locale: "ja-JP", symbol: "¥" },
  DE: { currency: "EUR", locale: "de-DE", symbol: "€" },
  FR: { currency: "EUR", locale: "fr-FR", symbol: "€" },
  GB: { currency: "GBP", locale: "en-GB", symbol: "£" },
  ES: { currency: "EUR", locale: "es-ES", symbol: "€" },
  BR: { currency: "BRL", locale: "pt-BR", symbol: "R$" },
  AU: { currency: "AUD", locale: "en-AU", symbol: "A$" },
};

const COUNTRY_LABELS: Record<string, string> = {
  KR: "한국 (KRW)",
  US: "United States (USD)",
  JP: "日本 (JPY)",
  DE: "Deutschland (EUR)",
  FR: "France (EUR)",
  GB: "United Kingdom (GBP)",
  ES: "España (EUR)",
  BR: "Brasil (BRL)",
  AU: "Australia (AUD)",
};

interface DeductionItem {
  label: string;
  amount: number;
}

interface SalaryResult {
  grossAnnual: number;
  netAnnual: number;
  netMonthly: number;
  totalDeductions: number;
  deductionRate: number;
  items: DeductionItem[];
}

// --- Tax calculation functions per country ---

function calcKorea(annual: number): SalaryResult {
  const monthly = annual / 12;

  // 국민연금: 4.5%, 상한 월 590만원
  const pensionBase = Math.min(monthly, 5_900_000);
  const pensionMonthly = pensionBase * 0.045;
  const pension = pensionMonthly * 12;

  // 건강보험: 3.545%
  const healthInsurance = annual * 0.03545;

  // 장기요양: 건강보험의 12.81%
  const longTermCare = healthInsurance * 0.1281;

  // 고용보험: 0.9%
  const employment = annual * 0.009;

  // 소득세 (누진세)
  const taxBrackets = [
    { limit: 12_000_000, rate: 0.06 },
    { limit: 46_000_000, rate: 0.15 },
    { limit: 88_000_000, rate: 0.24 },
    { limit: 150_000_000, rate: 0.35 },
    { limit: 300_000_000, rate: 0.38 },
    { limit: 500_000_000, rate: 0.40 },
    { limit: 1_000_000_000, rate: 0.42 },
    { limit: Infinity, rate: 0.45 },
  ];

  // 과세표준 (간이: 총급여 - 사회보험료 공제)
  const socialInsurance = pension + healthInsurance + longTermCare + employment;
  const taxableIncome = Math.max(0, annual - socialInsurance);
  const incomeTax = calcProgressiveTax(taxableIncome, taxBrackets);

  // 지방소득세: 소득세의 10%
  const localTax = incomeTax * 0.1;

  const items: DeductionItem[] = [
    { label: "salaryNationalPension", amount: pension },
    { label: "salaryHealthInsurance", amount: healthInsurance },
    { label: "salaryLongTermCare", amount: longTermCare },
    { label: "salaryEmploymentInsurance", amount: employment },
    { label: "salaryIncomeTax", amount: incomeTax },
    { label: "salaryLocalTax", amount: localTax },
  ];

  const totalDeductions = items.reduce((s, i) => s + i.amount, 0);
  return buildResult(annual, totalDeductions, items);
}

function calcUS(annual: number): SalaryResult {
  // Social Security: 6.2%, cap $168,600
  const ssCap = 168_600;
  const socialSecurity = Math.min(annual, ssCap) * 0.062;

  // Medicare: 1.45%
  const medicare = annual * 0.0145;

  // Federal Income Tax
  const fedBrackets = [
    { limit: 11_600, rate: 0.10 },
    { limit: 47_150, rate: 0.12 },
    { limit: 100_525, rate: 0.22 },
    { limit: 191_950, rate: 0.24 },
    { limit: 243_725, rate: 0.32 },
    { limit: 609_350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ];

  // Standard deduction
  const standardDeduction = 14_600;
  const taxableIncome = Math.max(0, annual - standardDeduction);
  const federalTax = calcProgressiveTax(taxableIncome, fedBrackets);

  // State tax (average 5%)
  const stateTax = taxableIncome * 0.05;

  const items: DeductionItem[] = [
    { label: "salarySocialSecurity", amount: socialSecurity },
    { label: "salaryMedicare", amount: medicare },
    { label: "salaryFederalTax", amount: federalTax },
    { label: "salaryStateTax", amount: stateTax },
  ];

  const totalDeductions = items.reduce((s, i) => s + i.amount, 0);
  return buildResult(annual, totalDeductions, items);
}

function calcJapan(annual: number): SalaryResult {
  // 후생연금: 9.15%
  const pension = annual * 0.0915;

  // 건강보험: ~5%
  const health = annual * 0.05;

  // 고용보험: 0.6%
  const employment = annual * 0.006;

  const socialInsurance = pension + health + employment;
  const taxableIncome = Math.max(0, annual - socialInsurance);

  // 소득세 누진세
  const taxBrackets = [
    { limit: 1_950_000, rate: 0.05 },
    { limit: 3_300_000, rate: 0.10 },
    { limit: 6_950_000, rate: 0.20 },
    { limit: 9_000_000, rate: 0.23 },
    { limit: 18_000_000, rate: 0.33 },
    { limit: 40_000_000, rate: 0.40 },
    { limit: Infinity, rate: 0.45 },
  ];

  const incomeTax = calcProgressiveTax(taxableIncome, taxBrackets);

  // 주민세: ~10%
  const residentTax = taxableIncome * 0.10;

  const items: DeductionItem[] = [
    { label: "salaryPension", amount: pension },
    { label: "salaryHealthInsurance", amount: health },
    { label: "salaryEmploymentInsurance", amount: employment },
    { label: "salaryIncomeTax", amount: incomeTax },
    { label: "salaryResidentTax", amount: residentTax },
  ];

  const totalDeductions = items.reduce((s, i) => s + i.amount, 0);
  return buildResult(annual, totalDeductions, items);
}

function calcGermany(annual: number): SalaryResult {
  // Rentenversicherung: 9.3%
  const pension = annual * 0.093;

  // Krankenversicherung: 7.3% + 0.85%
  const health = annual * 0.0815;

  // Pflegeversicherung: 1.7%
  const care = annual * 0.017;

  // Arbeitslosenversicherung: 1.3%
  const unemployment = annual * 0.013;

  const socialInsurance = pension + health + care + unemployment;
  const taxableIncome = Math.max(0, annual - socialInsurance);

  // 독일 소득세 간소화 (누진세 14%~45%)
  const taxBrackets = [
    { limit: 11_604, rate: 0.0 },
    { limit: 17_005, rate: 0.14 },
    { limit: 66_760, rate: 0.2397 },
    { limit: 277_825, rate: 0.42 },
    { limit: Infinity, rate: 0.45 },
  ];

  const incomeTax = calcProgressiveTax(taxableIncome, taxBrackets);

  // Solidaritaetszuschlag: 5.5% of income tax (if > threshold)
  const soli = incomeTax > 18_130 ? incomeTax * 0.055 : 0;

  const items: DeductionItem[] = [
    { label: "salaryPension", amount: pension },
    { label: "salaryHealthInsurance", amount: health },
    { label: "salaryLongTermCare", amount: care },
    { label: "salaryUnemploymentInsurance", amount: unemployment },
    { label: "salaryIncomeTax", amount: incomeTax },
    { label: "salarySolidaritySurcharge", amount: soli },
  ];

  const totalDeductions = items.reduce((s, i) => s + i.amount, 0);
  return buildResult(annual, totalDeductions, items);
}

function calcUK(annual: number): SalaryResult {
  // National Insurance
  const niThreshold1 = 12_570;
  const niThreshold2 = 50_270;
  let ni = 0;
  if (annual > niThreshold2) {
    ni = (niThreshold2 - niThreshold1) * 0.08 + (annual - niThreshold2) * 0.02;
  } else if (annual > niThreshold1) {
    ni = (annual - niThreshold1) * 0.08;
  }

  // Income Tax
  const personalAllowance = 12_570;
  const taxBrackets = [
    { limit: 50_270, rate: 0.20 },
    { limit: 125_140, rate: 0.40 },
    { limit: Infinity, rate: 0.45 },
  ];

  const taxableIncome = Math.max(0, annual - personalAllowance);
  let incomeTax = 0;
  let prev = 0;
  for (const bracket of taxBrackets) {
    const bracketTop = bracket.limit - personalAllowance;
    if (taxableIncome <= prev) break;
    const taxable = Math.min(taxableIncome, Math.max(0, bracketTop)) - prev;
    if (taxable > 0) {
      incomeTax += taxable * bracket.rate;
    }
    prev = Math.max(0, bracketTop);
  }

  const items: DeductionItem[] = [
    { label: "salaryNationalInsurance", amount: ni },
    { label: "salaryIncomeTax", amount: incomeTax },
  ];

  const totalDeductions = items.reduce((s, i) => s + i.amount, 0);
  return buildResult(annual, totalDeductions, items);
}

function calcFrance(annual: number): SalaryResult {
  // Social charges ~22%
  const socialCharges = annual * 0.22;
  const taxableIncome = Math.max(0, annual - socialCharges);

  // Income tax brackets
  const taxBrackets = [
    { limit: 11_294, rate: 0.0 },
    { limit: 28_797, rate: 0.11 },
    { limit: 82_341, rate: 0.30 },
    { limit: 177_106, rate: 0.41 },
    { limit: Infinity, rate: 0.45 },
  ];

  const incomeTax = calcProgressiveTax(taxableIncome, taxBrackets);

  const items: DeductionItem[] = [
    { label: "salarySocialCharges", amount: socialCharges },
    { label: "salaryIncomeTax", amount: incomeTax },
  ];

  const totalDeductions = items.reduce((s, i) => s + i.amount, 0);
  return buildResult(annual, totalDeductions, items);
}

function calcSpain(annual: number): SalaryResult {
  // Social security ~6.35%
  const socialSecurity = annual * 0.0635;
  const taxableIncome = Math.max(0, annual - socialSecurity);

  const taxBrackets = [
    { limit: 12_450, rate: 0.19 },
    { limit: 20_200, rate: 0.24 },
    { limit: 35_200, rate: 0.30 },
    { limit: 60_000, rate: 0.37 },
    { limit: 300_000, rate: 0.45 },
    { limit: Infinity, rate: 0.47 },
  ];

  const incomeTax = calcProgressiveTax(taxableIncome, taxBrackets);

  const items: DeductionItem[] = [
    { label: "salarySocialSecurity", amount: socialSecurity },
    { label: "salaryIncomeTax", amount: incomeTax },
  ];

  const totalDeductions = items.reduce((s, i) => s + i.amount, 0);
  return buildResult(annual, totalDeductions, items);
}

function calcBrazil(annual: number): SalaryResult {
  // INSS ~11%
  const inss = annual * 0.11;
  const taxableIncome = Math.max(0, annual - inss);

  // Monthly brackets (annualized)
  const taxBrackets = [
    { limit: 26_963.20, rate: 0.0 },
    { limit: 33_919.80, rate: 0.075 },
    { limit: 45_012.60, rate: 0.15 },
    { limit: 55_976.16, rate: 0.225 },
    { limit: Infinity, rate: 0.275 },
  ];

  const incomeTax = calcProgressiveTax(taxableIncome, taxBrackets);

  const items: DeductionItem[] = [
    { label: "salarySocialSecurity", amount: inss },
    { label: "salaryIncomeTax", amount: incomeTax },
  ];

  const totalDeductions = items.reduce((s, i) => s + i.amount, 0);
  return buildResult(annual, totalDeductions, items);
}

function calcAustralia(annual: number): SalaryResult {
  // No social security from employee; Medicare Levy 2%
  const medicare = annual * 0.02;

  const taxBrackets = [
    { limit: 18_200, rate: 0.0 },
    { limit: 45_000, rate: 0.19 },
    { limit: 120_000, rate: 0.325 },
    { limit: 180_000, rate: 0.37 },
    { limit: Infinity, rate: 0.45 },
  ];

  const incomeTax = calcProgressiveTax(annual, taxBrackets);

  const items: DeductionItem[] = [
    { label: "salaryMedicareLevy", amount: medicare },
    { label: "salaryIncomeTax", amount: incomeTax },
  ];

  const totalDeductions = items.reduce((s, i) => s + i.amount, 0);
  return buildResult(annual, totalDeductions, items);
}

// --- Helpers ---

function calcProgressiveTax(
  income: number,
  brackets: { limit: number; rate: number }[]
): number {
  let tax = 0;
  let prev = 0;
  for (const bracket of brackets) {
    if (income <= prev) break;
    const taxable = Math.min(income, bracket.limit) - prev;
    tax += taxable * bracket.rate;
    prev = bracket.limit;
  }
  return tax;
}

function buildResult(
  grossAnnual: number,
  totalDeductions: number,
  items: DeductionItem[]
): SalaryResult {
  const netAnnual = grossAnnual - totalDeductions;
  return {
    grossAnnual,
    netAnnual,
    netMonthly: netAnnual / 12,
    totalDeductions,
    deductionRate: grossAnnual > 0 ? (totalDeductions / grossAnnual) * 100 : 0,
    items,
  };
}

const CALC_FN: Record<string, (annual: number) => SalaryResult> = {
  KR: calcKorea,
  US: calcUS,
  JP: calcJapan,
  DE: calcGermany,
  GB: calcUK,
  FR: calcFrance,
  ES: calcSpain,
  BR: calcBrazil,
  AU: calcAustralia,
};

export default function SalaryCalculatorClient() {
  const t = useTranslations("calculators");
  const [country, setCountry] = useState("KR");
  const [salary, setSalary] = useState("");
  const [result, setResult] = useState<SalaryResult | null>(null);

  const cfg = COUNTRIES[country];

  const fmt = (n: number) =>
    new Intl.NumberFormat(cfg.locale, {
      style: "currency",
      currency: cfg.currency,
      maximumFractionDigits: cfg.currency === "KRW" || cfg.currency === "JPY" ? 0 : 2,
    }).format(n);

  const calculate = () => {
    const annual = parseFloat(salary);
    if (!annual || annual <= 0) return;
    const fn = CALC_FN[country];
    if (fn) setResult(fn(annual));
  };

  const reset = () => {
    setSalary("");
    setResult(null);
  };

  const netPct = result ? Math.round(100 - result.deductionRate) : 0;
  const dedPct = result ? Math.round(result.deductionRate) : 0;

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("salaryCountry")}</Label>
        <Select
          value={country}
          onValueChange={(v) => {
            if (v) setCountry(v);
            setResult(null);
          }}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(COUNTRY_LABELS).map(([code, label]) => (
              <SelectItem key={code} value={code}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>
          {t("salaryAnnualIncome")} ({cfg.symbol})
        </Label>
        <Input
          type="number"
          placeholder={
            cfg.currency === "KRW"
              ? `${t("egPrefix")} 50000000`
              : cfg.currency === "JPY"
                ? `${t("egPrefix")} 5000000`
                : `${t("egPrefix")} 60000`
          }
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={calculate} className="flex-1">
          {t("calculate")}
        </Button>
        <Button variant="outline" onClick={reset}>
          {t("reset")}
        </Button>
      </div>

      {result && (
        <div className="mt-2 space-y-4">
          {/* Monthly net pay */}
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">
              {t("salaryMonthlyNet")}
            </p>
            <p className="text-3xl font-bold text-primary">
              {fmt(result.netMonthly)}
            </p>
          </div>

          {/* Annual net & total deductions */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">
                {t("salaryAnnualNet")}
              </p>
              <p className="font-semibold text-sm">{fmt(result.netAnnual)}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-center">
              <p className="text-xs text-muted-foreground">
                {t("salaryTotalDeductions")}
              </p>
              <p className="font-semibold text-sm text-red-600">
                {fmt(result.totalDeductions)}
              </p>
            </div>
          </div>

          {/* Deduction ratio bar */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">
              {t("salaryNetVsDeductions")}
            </p>
            <div className="flex rounded-full overflow-hidden h-4">
              <div
                className="bg-primary transition-all"
                style={{ width: `${netPct}%` }}
                title={`${t("salaryNetPay")}: ${netPct}%`}
              />
              <div
                className="bg-red-400 transition-all"
                style={{ width: `${dedPct}%` }}
                title={`${t("salaryDeductions")}: ${dedPct}%`}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                {t("salaryNetPay")} {netPct}%
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-red-400" />
                {t("salaryDeductions")} {dedPct}%
              </span>
            </div>
          </div>

          {/* Detailed breakdown */}
          <div className="border-t pt-3">
            <p className="text-xs text-muted-foreground mb-2 font-medium">
              {t("salaryBreakdown")}
            </p>
            <ul className="space-y-1.5">
              {result.items.map((item) => (
                <li
                  key={item.label}
                  className="flex justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {t(item.label)}
                  </span>
                  <span className="font-medium">{fmt(item.amount)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
