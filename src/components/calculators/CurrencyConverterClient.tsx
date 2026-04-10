"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftRight } from "lucide-react";

type CurrencyCode =
  | "USD" | "EUR" | "GBP" | "JPY" | "KRW"
  | "CNY" | "INR" | "CAD" | "AUD" | "CHF"
  | "SGD" | "HKD" | "MXN" | "BRL";

interface CurrencyDef {
  code: CurrencyCode;
  name: string;
  symbol: string;
  rateToUSD: number; // how many of this currency = 1 USD
}

// Approximate rates as of early 2025 — clearly labeled
const CURRENCIES: CurrencyDef[] = [
  { code: "USD", name: "US Dollar",          symbol: "$",  rateToUSD: 1 },
  { code: "EUR", name: "Euro",               symbol: "€",  rateToUSD: 0.92 },
  { code: "GBP", name: "British Pound",      symbol: "£",  rateToUSD: 0.79 },
  { code: "JPY", name: "Japanese Yen",       symbol: "¥",  rateToUSD: 149.5 },
  { code: "KRW", name: "Korean Won",         symbol: "₩",  rateToUSD: 1320 },
  { code: "CNY", name: "Chinese Yuan",       symbol: "¥",  rateToUSD: 7.24 },
  { code: "INR", name: "Indian Rupee",       symbol: "₹",  rateToUSD: 83.1 },
  { code: "CAD", name: "Canadian Dollar",    symbol: "C$", rateToUSD: 1.36 },
  { code: "AUD", name: "Australian Dollar",  symbol: "A$", rateToUSD: 1.53 },
  { code: "CHF", name: "Swiss Franc",        symbol: "Fr", rateToUSD: 0.88 },
  { code: "SGD", name: "Singapore Dollar",   symbol: "S$", rateToUSD: 1.34 },
  { code: "HKD", name: "Hong Kong Dollar",   symbol: "HK$",rateToUSD: 7.82 },
  { code: "MXN", name: "Mexican Peso",       symbol: "$",  rateToUSD: 17.15 },
  { code: "BRL", name: "Brazilian Real",     symbol: "R$", rateToUSD: 4.97 },
];

function formatResult(n: number, code: CurrencyCode): string {
  if (!isFinite(n)) return "—";
  const large = ["JPY", "KRW"].includes(code);
  return large
    ? n.toLocaleString("en-US", { maximumFractionDigits: 0 })
    : n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CurrencyConverterClient() {
  const t = useTranslations("calculators");
  const [amount, setAmount] = useState("");
  const [fromCode, setFromCode] = useState<CurrencyCode>("USD");
  const [toCode, setToCode] = useState<CurrencyCode>("EUR");

  const fromDef = CURRENCIES.find((c) => c.code === fromCode)!;
  const toDef   = CURRENCIES.find((c) => c.code === toCode)!;

  const amountNum = parseFloat(amount);
  const hasValue  = amount !== "" && !isNaN(amountNum) && amountNum >= 0;

  // Convert: amount → USD → target
  const usd    = hasValue ? amountNum / fromDef.rateToUSD : 0;
  const result = usd * toDef.rateToUSD;
  const rate   = toDef.rateToUSD / fromDef.rateToUSD;

  const swap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      {/* Disclaimer */}
      <div className="mb-4 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-800 px-4 py-2.5 text-xs text-amber-800 dark:text-amber-300">
        {t("currApproxDisclaimer")}
      </div>

      {/* Amount input */}
      <div className="mb-4">
        <Label className="mb-1 block">{t("currAmount")}</Label>
        <Input
          type="number"
          placeholder={t("enterAmount")}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min={0}
        />
      </div>

      {/* From / Swap / To */}
      <div className="flex items-end gap-2 mb-6">
        <div className="flex-1">
          <Label className="mb-1 block">{t("currFrom")}</Label>
          <Select value={fromCode} onValueChange={(v) => setFromCode(v as CurrencyCode)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.code} — {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={swap}
          className="shrink-0 mb-0.5"
          aria-label="Swap currencies"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </Button>

        <div className="flex-1">
          <Label className="mb-1 block">{t("currTo")}</Label>
          <Select value={toCode} onValueChange={(v) => setToCode(v as CurrencyCode)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.code} — {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Result */}
      {hasValue ? (
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 text-center">
          <p className="text-sm text-muted-foreground mb-1">
            {amountNum.toLocaleString("en-US")} {fromCode} =
          </p>
          <p className="text-3xl font-bold text-primary">
            {toDef.symbol}{formatResult(result, toCode)}{" "}
            <span className="text-lg font-semibold text-foreground">{toCode}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            1 {fromCode} ≈ {formatResult(rate, toCode)} {toCode}
          </p>
          <p className="text-xs text-muted-foreground mt-1 italic">
            {t("currApproxNote")}
          </p>
        </div>
      ) : (
        <p className="text-center text-sm text-muted-foreground py-6">
          {t("currEnterAmount")}
        </p>
      )}
    </div>
  );
}
