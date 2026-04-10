"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SqrtResult {
  n: number;
  sqrt: number;
  cbrt: number;
  squared: number;
  cubed: number;
  isPerfectSquare: boolean;
  perfectSqrtInt: number;
  isPerfectCube: boolean;
  steps: string[];
}

function isPerfectSquareCheck(n: number): boolean {
  if (n < 0) return false;
  const s = Math.round(Math.sqrt(n));
  return s * s === n;
}

function isPerfectCubeCheck(n: number): boolean {
  const c = Math.round(Math.cbrt(n));
  return c * c * c === n;
}

function getSteps(n: number): string[] {
  const steps: string[] = [];
  if (n < 0) {
    steps.push(`Square root of negative numbers is not a real number.`);
    steps.push(`√${n} = ${Math.sqrt(Math.abs(n)).toFixed(6)}i (imaginary)`);
    return steps;
  }
  if (isPerfectSquareCheck(n)) {
    const s = Math.round(Math.sqrt(n));
    steps.push(`${n} is a perfect square.`);
    steps.push(`Find integer k such that k² = ${n}`);
    steps.push(`k = ${s}, because ${s} × ${s} = ${n}`);
    steps.push(`Therefore √${n} = ${s} (exact)`);
  } else {
    steps.push(`${n} is not a perfect square.`);
    const lower = Math.floor(Math.sqrt(n));
    const upper = lower + 1;
    steps.push(`${lower}² = ${lower * lower} < ${n} < ${upper * upper} = ${upper}²`);
    steps.push(`So √${n} is between ${lower} and ${upper}`);
    steps.push(`√${n} ≈ ${Math.sqrt(n).toFixed(8)}`);
  }
  return steps;
}

function fmt(n: number, digits = 8): string {
  if (!isFinite(n)) return "∞";
  return parseFloat(n.toFixed(digits)).toString();
}

export default function SquareRootCalculatorClient() {
  const t = useTranslations("calculators");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<SqrtResult | null>(null);

  const calculate = () => {
    const n = parseFloat(input);
    if (isNaN(n)) return;

    const sqrtVal = Math.sqrt(Math.abs(n));
    const cbrtVal = Math.cbrt(n);
    const isPS = isPerfectSquareCheck(n);
    const isPC = isPerfectCubeCheck(n);

    setResult({
      n,
      sqrt: sqrtVal,
      cbrt: cbrtVal,
      squared: n * n,
      cubed: n * n * n,
      isPerfectSquare: isPS,
      perfectSqrtInt: Math.round(sqrtVal),
      isPerfectCube: isPC,
      steps: getSteps(n),
    });
  };

  const reset = () => {
    setInput("");
    setResult(null);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <div className="space-y-4">
        <div>
          <Label>{t("enterNumber")}</Label>
          <Input
            type="number"
            placeholder={`${t("egPrefix")} 144`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mt-1 text-lg"
            onKeyDown={(e) => e.key === "Enter" && calculate()}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
          <Button variant="outline" onClick={reset}>{t("reset")}</Button>
        </div>
      </div>

      {result && (
        <div className="mt-6 space-y-3">
          {/* Main results grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-primary/10">
              <p className="text-xs text-muted-foreground mb-1">
                √{result.n} {result.n < 0 ? "(imaginary)" : ""}
              </p>
              <p className="text-2xl font-bold text-primary">
                {result.n < 0 ? `${fmt(result.sqrt)}i` : fmt(result.sqrt)}
              </p>
              {result.isPerfectSquare && (
                <p className="text-xs text-green-600 mt-1 font-medium">Perfect square ✓</p>
              )}
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">∛{result.n}</p>
              <p className="text-2xl font-bold">{fmt(result.cbrt)}</p>
              {result.isPerfectCube && (
                <p className="text-xs text-green-600 mt-1 font-medium">Perfect cube ✓</p>
              )}
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">{result.n}²</p>
              <p className="text-2xl font-bold">{fmt(result.squared, 0)}</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">{result.n}³</p>
              <p className="text-2xl font-bold">{fmt(result.cubed, 0)}</p>
            </div>
          </div>

          {/* Step-by-step */}
          <div className="p-4 rounded-xl border bg-muted/30">
            <p className="text-sm font-semibold mb-2">Step-by-step</p>
            <ol className="space-y-1">
              {result.steps.map((step, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary font-medium shrink-0">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
