"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PrimeResult {
  n: number;
  isPrime: boolean;
  factors: number[];
  nearestPrimes: number[];
  factorization: string;
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function getFactors(n: number): number[] {
  if (n <= 1) return [];
  const factors: number[] = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i !== n / i) factors.push(n / i);
    }
  }
  return factors.sort((a, b) => a - b);
}

function getPrimeFactorization(n: number): string {
  if (n <= 1) return String(n);
  let num = n;
  const factors: number[] = [];
  for (let d = 2; d * d <= num; d++) {
    while (num % d === 0) {
      factors.push(d);
      num = num / d;
    }
  }
  if (num > 1) factors.push(num);

  if (factors.length === 0) return String(n);

  // Group into exponents
  const map = new Map<number, number>();
  for (const f of factors) map.set(f, (map.get(f) ?? 0) + 1);

  return [...map.entries()]
    .map(([base, exp]) => (exp > 1 ? `${base}^${exp}` : `${base}`))
    .join(" × ");
}

function getNearestPrimes(n: number): number[] {
  const result: number[] = [];

  // Previous primes (up to 3)
  let prev = n - 1;
  while (result.length < 3 && prev >= 2) {
    if (isPrime(prev)) result.unshift(prev);
    prev--;
  }

  // Next primes (up to 3)
  let next = n + 1;
  const after: number[] = [];
  while (after.length < 3) {
    if (isPrime(next)) after.push(next);
    next++;
  }

  return [...result, ...after];
}

function getFirstNPrimes(n: number): number[] {
  const primes: number[] = [];
  let candidate = 2;
  while (primes.length < n) {
    if (isPrime(candidate)) primes.push(candidate);
    candidate++;
  }
  return primes;
}

export default function PrimeCheckerClient() {
  const t = useTranslations("calculators");
  const [input, setInput] = useState("");
  const [listCount, setListCount] = useState("20");
  const [result, setResult] = useState<PrimeResult | null>(null);
  const [firstPrimes, setFirstPrimes] = useState<number[]>([]);
  const [error, setError] = useState("");

  const check = () => {
    setError("");
    const n = parseInt(input);
    if (isNaN(n) || n < 0) {
      setError(t("primeErrNonNeg"));
      return;
    }
    if (n > 10_000_000) {
      setError(t("primeErrMax"));
      return;
    }

    const factors = getFactors(n);
    const factorization = n > 1 && !isPrime(n) ? getPrimeFactorization(n) : "";

    setResult({
      n,
      isPrime: isPrime(n),
      factors,
      nearestPrimes: getNearestPrimes(n),
      factorization,
    });
  };

  const showFirstPrimes = () => {
    const count = Math.min(parseInt(listCount) || 20, 200);
    setFirstPrimes(getFirstNPrimes(count));
  };

  const reset = () => {
    setInput("");
    setResult(null);
    setError("");
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label>{t("enterNumber")}</Label>
        <Input
          type="number"
          placeholder={`${t("egPrefix")} 97`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-1 text-lg"
          onKeyDown={(e) => e.key === "Enter" && check()}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-2">
        <Button onClick={check} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="space-y-3">
          {/* Prime verdict */}
          <div
            className={`p-4 rounded-xl text-center ${
              result.isPrime
                ? "bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800"
                : "bg-muted/50 border"
            }`}
          >
            <p className="text-5xl mb-2">{result.isPrime ? "✓" : "✗"}</p>
            <p className="text-xl font-bold">
              {result.isPrime ? t("primeIsPrime", { n: result.n }) : t("primeIsNotPrime", { n: result.n })}
            </p>
            {result.n < 2 && (
              <p className="text-sm text-muted-foreground mt-1">
                {t("primeLessThan2")}
              </p>
            )}
          </div>

          {/* Factors */}
          {result.factors.length > 0 && (
            <div className="p-4 rounded-xl bg-muted/30 border">
              <p className="text-sm font-semibold mb-2">
                {t("primeFactorsOf", { n: result.n, count: result.factors.length })}
              </p>
              <div className="flex flex-wrap gap-1">
                {result.factors.map((f) => (
                  <span
                    key={f}
                    className={`px-2 py-0.5 rounded text-sm font-mono ${
                      isPrime(f)
                        ? "bg-primary/20 text-primary font-semibold"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>
              {result.factorization && (
                <p className="text-sm mt-2 text-muted-foreground">
                  {t("primeFactorization")} <span className="font-mono font-medium text-foreground">{result.factorization}</span>
                </p>
              )}
            </div>
          )}

          {/* Nearest primes */}
          {result.nearestPrimes.length > 0 && (
            <div className="p-4 rounded-xl bg-muted/30 border">
              <p className="text-sm font-semibold mb-2">{t("primeNearest")}</p>
              <div className="flex flex-wrap gap-1">
                {result.nearestPrimes.map((p) => (
                  <span
                    key={p}
                    className={`px-2 py-0.5 rounded text-sm font-mono font-medium ${
                      p === result.n
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* First N primes list */}
      <div className="border-t pt-4">
        <p className="text-sm font-semibold mb-2">{t("primeFirstN")}</p>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder={t("count") + " (e.g. 20)"}
            value={listCount}
            onChange={(e) => setListCount(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" onClick={showFirstPrimes} size="sm">
            {t("primeShow")}
          </Button>
        </div>
        {firstPrimes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1 max-h-32 overflow-y-auto">
            {firstPrimes.map((p) => (
              <span key={p} className="px-2 py-0.5 rounded text-xs font-mono bg-primary/10 text-primary">
                {p}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
