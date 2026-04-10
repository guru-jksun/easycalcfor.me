"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Clock, Trash2 } from "lucide-react";

type AngleMode = "deg" | "rad";

function safeMath(expr: string, mode: AngleMode): string {
  let e = expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/π/g, String(Math.PI))
    .replace(/e(?![0-9])/g, String(Math.E));

  if (mode === "deg") {
    e = e
      .replace(/Math\.sin\(/g, "Math.sin(Math.PI/180*")
      .replace(/Math\.cos\(/g, "Math.cos(Math.PI/180*")
      .replace(/Math\.tan\(/g, "Math.tan(Math.PI/180*");
  }

  try {
    // eslint-disable-next-line no-new-func
    const result = new Function("Math", `"use strict"; return (${e});`)(Math);
    if (typeof result !== "number" || !isFinite(result)) {
      return isNaN(result) ? "NaN" : result > 0 ? "Infinity" : "-Infinity";
    }
    const abs = Math.abs(result);
    if (abs !== 0 && (abs >= 1e12 || abs < 1e-8)) {
      return result.toExponential(6);
    }
    return parseFloat(result.toFixed(10)).toString();
  } catch {
    return "Error";
  }
}

type ButtonDef = {
  label: string;
  value: string;
  type?: "number" | "op" | "fn" | "action" | "constant";
  wide?: boolean;
};

const SCIENTIFIC_BUTTONS: ButtonDef[] = [
  { label: "sin", value: "Math.sin(", type: "fn" },
  { label: "cos", value: "Math.cos(", type: "fn" },
  { label: "tan", value: "Math.tan(", type: "fn" },
  { label: "log", value: "Math.log10(", type: "fn" },
  { label: "ln", value: "Math.log(", type: "fn" },
  { label: "√", value: "Math.sqrt(", type: "fn" },
  { label: "x²", value: "**2", type: "fn" },
  { label: "xⁿ", value: "**", type: "op" },
  { label: "π", value: "π", type: "constant" },
  { label: "e", value: "e", type: "constant" },
];

const MAIN_BUTTONS: ButtonDef[] = [
  { label: "C", value: "C", type: "action" },
  { label: "CE", value: "CE", type: "action" },
  { label: "(", value: "(", type: "op" },
  { label: ")", value: ")", type: "op" },
  { label: "7", value: "7", type: "number" },
  { label: "8", value: "8", type: "number" },
  { label: "9", value: "9", type: "number" },
  { label: "÷", value: "÷", type: "op" },
  { label: "4", value: "4", type: "number" },
  { label: "5", value: "5", type: "number" },
  { label: "6", value: "6", type: "number" },
  { label: "×", value: "×", type: "op" },
  { label: "1", value: "1", type: "number" },
  { label: "2", value: "2", type: "number" },
  { label: "3", value: "3", type: "number" },
  { label: "−", value: "−", type: "op" },
  { label: "0", value: "0", type: "number", wide: true },
  { label: ".", value: ".", type: "number" },
  { label: "+", value: "+", type: "op" },
  { label: "=", value: "=", type: "action", wide: true },
];

interface HistoryEntry {
  expression: string;
  result: string;
}

export default function ScientificCalculatorClient() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [angleMode, setAngleMode] = useState<AngleMode>("deg");
  const [justCalc, setJustCalc] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleButton = (btn: ButtonDef) => {
    if (btn.value === "C") {
      setDisplay("0");
      setExpression("");
      setJustCalc(false);
      return;
    }
    if (btn.value === "CE") {
      if (expression.length > 0) {
        const newExpr = expression.slice(0, -1);
        setExpression(newExpr);
        setDisplay(newExpr || "0");
      } else {
        setDisplay("0");
      }
      setJustCalc(false);
      return;
    }
    if (btn.value === "=") {
      const result = safeMath(expression, angleMode);
      if (result !== "Error" && expression) {
        setHistory((prev) => [{ expression, result }, ...prev].slice(0, 20));
        setShowHistory(true);
      }
      setDisplay(result);
      setExpression(result === "Error" ? "" : result);
      setJustCalc(true);
      return;
    }

    const startFresh = justCalc && btn.type === "number";
    const base = startFresh ? "" : expression;

    const newExpr = base + btn.value;
    setExpression(newExpr);
    setDisplay(newExpr);
    setJustCalc(false);
  };

  const loadHistory = (entry: HistoryEntry) => {
    setExpression(entry.result);
    setDisplay(entry.result);
    setJustCalc(true);
    setShowHistory(false);
  };

  const isError = display === "Error" || display === "NaN" || display.includes("Infinity");

  // Display expression in readable form
  const displayExpr = display
    .replace(/Math\.sin\(/g, "sin(")
    .replace(/Math\.cos\(/g, "cos(")
    .replace(/Math\.tan\(/g, "tan(")
    .replace(/Math\.log10\(/g, "log(")
    .replace(/Math\.log\(/g, "ln(")
    .replace(/Math\.sqrt\(/g, "√(")
    .replace(/\*\*/g, "^");

  return (
    <div className="bg-card border rounded-2xl p-4 shadow-sm w-full max-w-md">
      {/* Top bar: Angle mode + History toggle */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className={cn(
            "flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors",
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
        <Tabs value={angleMode} onValueChange={(v) => setAngleMode(v as AngleMode)}>
          <TabsList className="h-7">
            <TabsTrigger value="deg" className="text-xs h-6 px-3">DEG</TabsTrigger>
            <TabsTrigger value="rad" className="text-xs h-6 px-3">RAD</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* History panel */}
      {showHistory && (
        <div className="mb-3 rounded-xl bg-muted/50 border max-h-40 overflow-y-auto">
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
                  onClick={() => loadHistory(entry)}
                >
                  <p className="text-muted-foreground font-mono text-[10px]">
                    {entry.expression
                      .replace(/Math\.sin\(/g, "sin(")
                      .replace(/Math\.cos\(/g, "cos(")
                      .replace(/Math\.tan\(/g, "tan(")
                      .replace(/Math\.log10\(/g, "log(")
                      .replace(/Math\.log\(/g, "ln(")
                      .replace(/Math\.sqrt\(/g, "√(")
                      .replace(/\*\*/g, "^")}
                  </p>
                  <p className="font-semibold font-mono text-sm text-foreground">= {entry.result}</p>
                </button>
              ))}
            </>
          )}
        </div>
      )}

      {/* Display */}
      <div className="bg-muted rounded-xl p-4 mb-3 text-right min-h-[64px] flex items-end justify-end">
        <p
          className={cn(
            "font-mono font-bold break-all",
            displayExpr.length > 14 ? "text-lg" : "text-3xl",
            isError ? "text-destructive" : ""
          )}
        >
          {displayExpr || "0"}
        </p>
      </div>

      {/* Scientific buttons */}
      <div className="grid grid-cols-5 gap-1 mb-2">
        {SCIENTIFIC_BUTTONS.map((btn) => (
          <Button
            key={btn.label}
            variant="outline"
            size="sm"
            className="text-xs h-9 font-mono"
            onClick={() => handleButton(btn)}
          >
            {btn.label}
          </Button>
        ))}
      </div>

      {/* Main keypad */}
      <div className="grid grid-cols-4 gap-1">
        {MAIN_BUTTONS.map((btn) => (
          <Button
            key={btn.label}
            variant={
              btn.type === "action" && btn.label === "="
                ? "default"
                : btn.type === "action"
                ? "destructive"
                : btn.type === "op"
                ? "outline"
                : "ghost"
            }
            size="sm"
            className={cn(
              "h-11 text-base font-semibold",
              btn.label === "=" ? "col-span-4" : btn.wide ? "col-span-2" : "",
              btn.type === "number" ? "bg-muted/50" : ""
            )}
            onClick={() => handleButton(btn)}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
