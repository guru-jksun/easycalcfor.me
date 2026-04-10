"use client";

import { useState, useEffect, useCallback } from "react";
import { Delete, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Operation = "+" | "-" | "×" | "÷" | null;

export default function BasicCalculatorClient() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [shouldReset, setShouldReset] = useState(false);
  const [history, setHistory] = useState<{ expr: string; result: string }[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const calculate = useCallback((a: number, b: number, op: Operation): number => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b !== 0 ? a / b : NaN;
      default: return b;
    }
  }, []);

  const handleNumber = useCallback((num: string) => {
    if (shouldReset) {
      setDisplay(num === "." ? "0." : num);
      setShouldReset(false);
    } else {
      if (num === "." && display.includes(".")) return;
      setDisplay(display === "0" && num !== "." ? num : display + num);
    }
  }, [display, shouldReset]);

  const handleOperation = useCallback((op: Operation) => {
    const current = parseFloat(display);
    if (prevValue !== null && operation && !shouldReset) {
      const result = calculate(prevValue, current, operation);
      const resultStr = formatNumber(result);
      setDisplay(resultStr);
      setPrevValue(result);
    } else {
      setPrevValue(current);
    }
    setOperation(op);
    setShouldReset(true);
  }, [display, prevValue, operation, shouldReset, calculate]);

  const handleEquals = useCallback(() => {
    if (prevValue === null || !operation) return;
    const current = parseFloat(display);
    const result = calculate(prevValue, current, operation);
    const resultStr = formatNumber(result);
    setHistory(prev => [{ expr: `${prevValue} ${operation} ${current}`, result: resultStr }, ...prev].slice(0, 20));
    setShowHistory(true);
    setDisplay(isNaN(result) ? "Error" : resultStr);
    setPrevValue(null);
    setOperation(null);
    setShouldReset(true);
  }, [display, prevValue, operation, calculate]);

  const handlePercent = useCallback(() => {
    const value = parseFloat(display) / 100;
    setDisplay(formatNumber(value));
  }, [display]);

  const handleToggleSign = useCallback(() => {
    setDisplay(formatNumber(-parseFloat(display)));
  }, [display]);

  const handleClear = useCallback(() => {
    setDisplay("0");
    setPrevValue(null);
    setOperation(null);
    setShouldReset(false);
  }, []);

  const handleBackspace = useCallback(() => {
    if (shouldReset) return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  }, [display, shouldReset]);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ("0123456789.".includes(e.key)) handleNumber(e.key);
      else if (e.key === "+") handleOperation("+");
      else if (e.key === "-") handleOperation("-");
      else if (e.key === "*") handleOperation("×");
      else if (e.key === "/") { e.preventDefault(); handleOperation("÷"); }
      else if (e.key === "Enter" || e.key === "=") handleEquals();
      else if (e.key === "Escape") handleClear();
      else if (e.key === "Backspace") handleBackspace();
      else if (e.key === "%") handlePercent();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleNumber, handleOperation, handleEquals, handleClear, handleBackspace, handlePercent]);

  function formatNumber(n: number): string {
    if (isNaN(n) || !isFinite(n)) return "Error";
    const str = n.toPrecision(10);
    return parseFloat(str).toString();
  }

  const BUTTONS = [
    { label: "C", action: handleClear, variant: "destructive" as const, span: false },
    { label: "+/-", action: handleToggleSign, variant: "secondary" as const, span: false },
    { label: "%", action: handlePercent, variant: "secondary" as const, span: false },
    { label: "÷", action: () => handleOperation("÷"), variant: "operator" as const, span: false },
    { label: "7", action: () => handleNumber("7"), variant: "number" as const, span: false },
    { label: "8", action: () => handleNumber("8"), variant: "number" as const, span: false },
    { label: "9", action: () => handleNumber("9"), variant: "number" as const, span: false },
    { label: "×", action: () => handleOperation("×"), variant: "operator" as const, span: false },
    { label: "4", action: () => handleNumber("4"), variant: "number" as const, span: false },
    { label: "5", action: () => handleNumber("5"), variant: "number" as const, span: false },
    { label: "6", action: () => handleNumber("6"), variant: "number" as const, span: false },
    { label: "−", action: () => handleOperation("-"), variant: "operator" as const, span: false },
    { label: "1", action: () => handleNumber("1"), variant: "number" as const, span: false },
    { label: "2", action: () => handleNumber("2"), variant: "number" as const, span: false },
    { label: "3", action: () => handleNumber("3"), variant: "number" as const, span: false },
    { label: "+", action: () => handleOperation("+"), variant: "operator" as const, span: false },
    { label: "0", action: () => handleNumber("0"), variant: "number" as const, span: true },
    { label: ".", action: () => handleNumber("."), variant: "number" as const, span: false },
    { label: "=", action: handleEquals, variant: "equals" as const, span: false },
  ];

  const variantClass = {
    destructive: "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950 dark:text-red-300",
    secondary: "bg-muted hover:bg-muted/80 text-foreground",
    operator: "bg-primary/10 text-primary hover:bg-primary/20 font-semibold",
    number: "bg-card hover:bg-muted text-foreground border",
    equals: "bg-primary text-primary-foreground hover:bg-primary/90 font-bold",
  };

  return (
    <div className="bg-card border rounded-2xl overflow-hidden shadow-md max-w-sm">
      {/* Display */}
      <div className="bg-foreground/5 p-5">
        {/* Current operation */}
        <div className="flex justify-between items-center h-5">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={cn(
              "flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg transition-colors",
              showHistory
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <Clock className="w-3.5 h-3.5" />
            {history.length > 0 && (
              <span className="bg-primary/20 text-primary text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {history.length}
              </span>
            )}
          </button>
          <span className="text-xs text-muted-foreground text-right">
            {operation && prevValue !== null ? `${prevValue} ${operation}` : ""}
          </span>
        </div>
        {/* Main display */}
        <div className={cn(
          "text-right font-mono font-bold mt-1 transition-all",
          display.length > 12 ? "text-2xl" : display.length > 8 ? "text-3xl" : "text-4xl"
        )}>
          {display}
        </div>
      </div>

      {/* History panel */}
      {showHistory && (
        <div className="mx-3 mt-2 mb-2 rounded-xl bg-muted/50 border max-h-36 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4">No history yet</p>
          ) : (
            <>
              <div className="flex justify-end px-2 pt-1.5">
                <button
                  onClick={() => { setHistory([]); setShowHistory(false); }}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              {history.map((entry, i) => (
                <button
                  key={i}
                  className="w-full text-right px-3 py-1.5 hover:bg-muted transition-colors text-xs"
                  onClick={() => {
                    setDisplay(entry.result);
                    setPrevValue(null);
                    setOperation(null);
                    setShouldReset(true);
                    setShowHistory(false);
                  }}
                >
                  <p className="text-muted-foreground font-mono text-[10px]">{entry.expr}</p>
                  <p className="font-semibold font-mono text-sm text-foreground">= {entry.result}</p>
                </button>
              ))}
            </>
          )}
        </div>
      )}

      {/* Backspace */}
      <div className="flex justify-end px-4 pt-2">
        <button
          onClick={handleBackspace}
          className="text-muted-foreground hover:text-foreground p-1.5 rounded transition-colors"
        >
          <Delete className="w-4 h-4" />
        </button>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2 p-4">
        {BUTTONS.map(({ label, action, variant, span }) => (
          <button
            key={label}
            onClick={action}
            className={cn(
              "h-14 rounded-xl text-lg font-medium transition-all active:scale-95",
              variantClass[variant],
              span && "col-span-2"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
