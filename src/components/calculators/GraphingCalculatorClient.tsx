"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function evaluate(expr: string, x: number): number {
  const e = expr
    .replace(/\^/g, "**")
    .replace(/sin\(/g, "Math.sin(")
    .replace(/cos\(/g, "Math.cos(")
    .replace(/tan\(/g, "Math.tan(")
    .replace(/sqrt\(/g, "Math.sqrt(")
    .replace(/abs\(/g, "Math.abs(")
    .replace(/log\(/g, "Math.log10(")
    .replace(/ln\(/g, "Math.log(")
    .replace(/exp\(/g, "Math.exp(")
    .replace(/pi/gi, "Math.PI")
    .replace(/(?<![a-zA-Z.])e(?![a-zA-Z.(])/g, "Math.E")
    .replace(/(?<![a-zA-Z.])x(?![a-zA-Z])/g, `(${x})`);
  try {
    return new Function(`"use strict"; return (${e});`)() as number;
  } catch {
    return NaN;
  }
}

export default function GraphingCalculatorClient() {
  const t = useTranslations("calculators");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [expression, setExpression] = useState("x^2");
  const [xMin, setXMin] = useState("-10");
  const [xMax, setXMax] = useState("10");

  const plot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const xMinN = parseFloat(xMin) || -10;
    const xMaxN = parseFloat(xMax) || 10;
    const steps = w;
    const dx = (xMaxN - xMinN) / steps;

    // Compute Y values
    const ys: number[] = [];
    for (let i = 0; i <= steps; i++) {
      ys.push(evaluate(expression, xMinN + i * dx));
    }
    const validYs = ys.filter((y) => isFinite(y));
    if (validYs.length === 0) return;

    let yMinN = Math.min(...validYs);
    let yMaxN = Math.max(...validYs);
    const padding = (yMaxN - yMinN) * 0.1 || 1;
    yMinN -= padding;
    yMaxN += padding;

    const toCanvasX = (x: number) => ((x - xMinN) / (xMaxN - xMinN)) * w;
    const toCanvasY = (y: number) => h - ((y - yMinN) / (yMaxN - yMinN)) * h;

    // Clear
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * w;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      const y = (i / 10) * h;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 1;
    if (xMinN <= 0 && xMaxN >= 0) {
      const x0 = toCanvasX(0);
      ctx.beginPath(); ctx.moveTo(x0, 0); ctx.lineTo(x0, h); ctx.stroke();
    }
    if (yMinN <= 0 && yMaxN >= 0) {
      const y0 = toCanvasY(0);
      ctx.beginPath(); ctx.moveTo(0, y0); ctx.lineTo(w, y0); ctx.stroke();
    }

    // Labels
    ctx.fillStyle = "#666";
    ctx.font = "11px sans-serif";
    ctx.fillText(xMinN.toFixed(1), 4, h - 4);
    ctx.fillText(xMaxN.toFixed(1), w - 40, h - 4);
    ctx.fillText(yMaxN.toFixed(1), 4, 14);
    ctx.fillText(yMinN.toFixed(1), 4, h - 14);

    // Curve
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= steps; i++) {
      const y = ys[i];
      if (!isFinite(y)) { started = false; continue; }
      const cx = toCanvasX(xMinN + i * dx);
      const cy = toCanvasY(y);
      if (!started) { ctx.moveTo(cx, cy); started = true; } else { ctx.lineTo(cx, cy); }
    }
    ctx.stroke();
  }, [expression, xMin, xMax]);

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-md space-y-4">
      <div>
        <Label>{t("graphExpression")}</Label>
        <Input value={expression} onChange={(e) => setExpression(e.target.value)} className="mt-1 font-mono" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{t("graphXMin")}</Label>
          <Input type="number" value={xMin} onChange={(e) => setXMin(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>{t("graphXMax")}</Label>
          <Input type="number" value={xMax} onChange={(e) => setXMax(e.target.value)} className="mt-1" />
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={plot} className="flex-1">{t("graphPlot")}</Button>
        <Button variant="outline" onClick={() => { setExpression(""); const c = canvasRef.current; if (c) c.getContext("2d")?.clearRect(0, 0, c.width, c.height); }}>{t("graphClear")}</Button>
      </div>
      <canvas ref={canvasRef} width={400} height={300} className="w-full rounded-lg border" />
    </div>
  );
}
