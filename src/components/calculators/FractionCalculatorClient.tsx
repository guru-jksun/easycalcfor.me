"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Operation = "add" | "subtract" | "multiply" | "divide";

interface FractionResult {
  numerator: number;
  denominator: number;
  decimal: number;
  operation: Operation;
  a: [number, number];
  b: [number, number];
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b > 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function simplify(n: number, d: number): [number, number] {
  if (d === 0) return [n, d];
  const g = gcd(Math.abs(n), Math.abs(d));
  const sn = n / g;
  const sd = d / g;
  // Keep negative in numerator
  return sd < 0 ? [-sn, -sd] : [sn, sd];
}

const OP_SYMBOLS: Record<Operation, string> = {
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷",
};

export default function FractionCalculatorClient() {
  const t = useTranslations("calculators");
  const [operation, setOperation] = useState<Operation>("add");
  const [n1, setN1] = useState("");
  const [d1, setD1] = useState("");
  const [n2, setN2] = useState("");
  const [d2, setD2] = useState("");
  const [result, setResult] = useState<FractionResult | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const num1 = parseInt(n1);
    const den1 = parseInt(d1);
    const num2 = parseInt(n2);
    const den2 = parseInt(d2);

    if (isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2)) {
      setError(t("fracErrIntegers"));
      return;
    }
    if (den1 === 0 || den2 === 0) {
      setError(t("fracErrDenZero"));
      return;
    }
    if (operation === "divide" && num2 === 0) {
      setError(t("fracErrDivZero"));
      return;
    }

    let rn: number, rd: number;

    switch (operation) {
      case "add":
        rn = num1 * den2 + num2 * den1;
        rd = den1 * den2;
        break;
      case "subtract":
        rn = num1 * den2 - num2 * den1;
        rd = den1 * den2;
        break;
      case "multiply":
        rn = num1 * num2;
        rd = den1 * den2;
        break;
      case "divide":
        rn = num1 * den2;
        rd = den1 * num2;
        break;
    }

    const [sn, sd] = simplify(rn, rd);
    setResult({
      numerator: sn,
      denominator: sd,
      decimal: sn / sd,
      operation,
      a: [num1, den1],
      b: [num2, den2],
    });
  };

  const reset = () => {
    setN1(""); setD1(""); setN2(""); setD2("");
    setResult(null); setError("");
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <Tabs value={operation} onValueChange={(v) => { setOperation(v as Operation); setResult(null); }}>
        <TabsList className="w-full mb-6 grid grid-cols-4">
          <TabsTrigger value="add">+</TabsTrigger>
          <TabsTrigger value="subtract">−</TabsTrigger>
          <TabsTrigger value="multiply">×</TabsTrigger>
          <TabsTrigger value="divide">÷</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        <div>
          <Label>{t("fracFirstFraction")}</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="number"
              placeholder={t("numerator")}
              value={n1}
              onChange={(e) => setN1(e.target.value)}
            />
            <span className="text-muted-foreground font-bold text-lg">/</span>
            <Input
              type="number"
              placeholder={t("denominator")}
              value={d1}
              onChange={(e) => setD1(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 border-t border-dashed" />
          <span className="text-2xl font-bold text-muted-foreground px-2">
            {OP_SYMBOLS[operation]}
          </span>
          <div className="flex-1 border-t border-dashed" />
        </div>

        <div>
          <Label>{t("fracSecondFraction")}</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="number"
              placeholder={t("numerator")}
              value={n2}
              onChange={(e) => setN2(e.target.value)}
            />
            <span className="text-muted-foreground font-bold text-lg">/</span>
            <Input
              type="number"
              placeholder={t("denominator")}
              value={d2}
              onChange={(e) => setD2(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex gap-2 pt-2">
          <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
          <Button variant="outline" onClick={reset}>{t("reset")}</Button>
        </div>
      </div>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="p-4 rounded-xl bg-primary/10">
            <p className="text-sm text-muted-foreground mb-2">
              {result.a[0]}/{result.a[1]} {OP_SYMBOLS[result.operation]} {result.b[0]}/{result.b[1]}
            </p>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary leading-none">{result.numerator}</p>
                <div className="border-t-2 border-primary my-1" />
                <p className="text-2xl font-bold text-primary leading-none">{result.denominator}</p>
              </div>
              <div className="text-muted-foreground">=</div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {parseFloat(result.decimal.toFixed(8))}
                </p>
                <p className="text-xs text-muted-foreground">{t("fracDecimal")}</p>
              </div>
            </div>
          </div>
          {result.numerator !== result.a[0] * result.b[1] + result.a[1] * result.b[0] && (
            <p className="text-xs text-muted-foreground text-center">
              {t("fracSimplifiedGcd")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
