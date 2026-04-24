"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Regime = "new" | "old";
type Metro = "metro" | "nonMetro";

function fmtINR(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

function newRegimeTax(taxable: number): number {
  const slabs: [number, number][] = [
    [400_000, 0],
    [400_000, 0.05],
    [400_000, 0.10],
    [400_000, 0.15],
    [400_000, 0.20],
    [400_000, 0.25],
    [Infinity, 0.30],
  ];
  let tax = 0;
  let rem = taxable;
  for (const [w, r] of slabs) {
    if (rem <= 0) break;
    const c = Math.min(rem, w);
    tax += c * r;
    rem -= c;
  }
  // Rebate u/s 87A
  if (taxable <= 1_200_000) tax = Math.max(0, tax - 60000);
  return tax;
}

function oldRegimeTax(taxable: number): number {
  const slabs: [number, number][] = [
    [250_000, 0],
    [250_000, 0.05],
    [500_000, 0.20],
    [Infinity, 0.30],
  ];
  let tax = 0;
  let rem = taxable;
  for (const [w, r] of slabs) {
    if (rem <= 0) break;
    const c = Math.min(rem, w);
    tax += c * r;
    rem -= c;
  }
  if (taxable <= 500_000) tax = Math.max(0, tax - 12500);
  return tax;
}

export default function TakeHomeSalaryIndiaClient() {
  const t = useTranslations("calculators");
  const [ctc, setCtc] = useState("");
  const [basicPct, setBasicPct] = useState("50");
  const [hraPct, setHraPct] = useState("40");
  const [rentPaid, setRentPaid] = useState("");
  const [metro, setMetro] = useState<Metro>("metro");
  const [deduct80C, setDeduct80C] = useState("");
  const [regime, setRegime] = useState<Regime>("new");

  const result = useMemo(() => {
    const c = parseFloat(ctc);
    if (!c || c <= 0) return null;
    const bp = Math.max(0, Math.min(100, parseFloat(basicPct) || 50)) / 100;
    const hp = Math.max(0, Math.min(100, parseFloat(hraPct) || 40)) / 100;
    const rent = parseFloat(rentPaid) || 0;
    const ded80C = Math.min(parseFloat(deduct80C) || 0, 150000);

    const basic = c * bp;
    const hra = basic * hp;
    const special = Math.max(0, c - basic - hra);

    // Employer PF contribution (12% of basic, capped at 15,000/month basic for statutory cap)
    const pfEmployer = Math.min(basic, 15000 * 12) * 0.12;
    const pfEmployee = pfEmployer;  // employee pays same
    // Gross = CTC minus employer PF (employer PF is part of CTC but not paid to you)
    const gross = c - pfEmployer;

    // HRA exemption: min(actual HRA, rent - 10% basic, 50%/40% of basic)
    const hraExempt = rent > 0
      ? Math.min(hra, Math.max(0, rent * 12 - basic * 0.10), basic * (metro === "metro" ? 0.50 : 0.40))
      : 0;

    // Professional tax (Maharashtra example ~2500/yr; approximate)
    const professionalTax = 2500;

    // Tax calculation
    const stdDeduction = regime === "new" ? 75000 : 50000;
    const taxableOld = Math.max(0, gross - stdDeduction - hraExempt - ded80C - professionalTax);
    const taxableNew = Math.max(0, gross - stdDeduction);
    const baseTax = regime === "new" ? newRegimeTax(taxableNew) : oldRegimeTax(taxableOld);
    const cess = baseTax * 0.04;
    const totalTax = Math.round(baseTax + cess);

    const annualInHand = gross - pfEmployee - totalTax - professionalTax;
    const monthlyInHand = annualInHand / 12;

    return {
      ctc: c,
      basic, hra, special,
      pfEmployer, pfEmployee,
      gross,
      hraExempt,
      professionalTax,
      taxableIncome: regime === "new" ? taxableNew : taxableOld,
      baseTax, cess, totalTax,
      annualInHand, monthlyInHand,
    };
  }, [ctc, basicPct, hraPct, rentPaid, metro, deduct80C, regime]);

  const reset = () => {
    setCtc("");
    setRentPaid("");
    setDeduct80C("");
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-md space-y-4">
      <div>
        <Label>{t("thsCtc")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 1200000`}
          value={ctc}
          onChange={(e) => setCtc(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>{t("thsBasicPct")}</Label>
          <Input
            type="number"
            value={basicPct}
            onChange={(e) => setBasicPct(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label>{t("thsHraPct")}</Label>
          <Input
            type="number"
            value={hraPct}
            onChange={(e) => setHraPct(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label>{t("thsRegime")}</Label>
        <Select value={regime} onValueChange={(v) => setRegime(v as Regime)}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">{t("itRegimeNew")}</SelectItem>
            <SelectItem value="old">{t("itRegimeOld")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {regime === "old" && (
        <>
          <div>
            <Label>{t("thsRentPaid")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 15000`}
              value={rentPaid}
              onChange={(e) => setRentPaid(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>{t("thsMetro")}</Label>
            <Select value={metro} onValueChange={(v) => setMetro(v as Metro)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metro">{t("thsMetroCity")}</SelectItem>
                <SelectItem value="nonMetro">{t("thsNonMetroCity")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{t("thsDeduct80C")}</Label>
            <Input
              type="number"
              placeholder={`${t("egPrefix")} 150000`}
              value={deduct80C}
              onChange={(e) => setDeduct80C(e.target.value)}
              className="mt-1"
            />
          </div>
        </>
      )}

      <div className="flex gap-2 pt-2">
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="mt-2 space-y-4">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{t("thsMonthlyInHand")}</p>
            <p className="text-3xl font-bold text-primary">{fmtINR(result.monthlyInHand)}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("thsAnnualInHand")}: {fmtINR(result.annualInHand)}</p>
          </div>

          <div className="text-xs text-muted-foreground space-y-1 border-t pt-3">
            <div className="flex justify-between"><span>{t("thsCtc")}</span><span>{fmtINR(result.ctc)}</span></div>
            <div className="flex justify-between text-muted-foreground/70"><span>− {t("thsPfEmployer")}</span><span>−{fmtINR(result.pfEmployer)}</span></div>
            <div className="flex justify-between font-medium text-foreground"><span>{t("thsGross")}</span><span>{fmtINR(result.gross)}</span></div>
            <div className="flex justify-between text-muted-foreground/70"><span>− {t("thsPfEmployee")}</span><span>−{fmtINR(result.pfEmployee)}</span></div>
            <div className="flex justify-between text-muted-foreground/70"><span>− {t("thsProfessionalTax")}</span><span>−{fmtINR(result.professionalTax)}</span></div>
            <div className="flex justify-between text-red-600"><span>− {t("thsIncomeTax")}</span><span>−{fmtINR(result.totalTax)}</span></div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg bg-muted/50 text-center">
              <p className="text-[10px] text-muted-foreground">{t("thsBasic")}</p>
              <p className="text-xs font-semibold">{fmtINR(result.basic)}</p>
            </div>
            <div className="p-2 rounded-lg bg-muted/50 text-center">
              <p className="text-[10px] text-muted-foreground">{t("thsHra")}</p>
              <p className="text-xs font-semibold">{fmtINR(result.hra)}</p>
            </div>
            <div className="p-2 rounded-lg bg-muted/50 text-center">
              <p className="text-[10px] text-muted-foreground">{t("thsSpecial")}</p>
              <p className="text-xs font-semibold">{fmtINR(result.special)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
