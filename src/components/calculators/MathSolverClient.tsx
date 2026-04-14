"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function MathSolverClient() {
  const t = useTranslations("calculators");
  const [tab, setTab] = useState("linear");

  // Linear: ax + b = c
  const [la, setLa] = useState("");
  const [lb, setLb] = useState("");
  const [lc, setLc] = useState("");
  const [linearResult, setLinearResult] = useState<string | null>(null);
  const [linearSteps, setLinearSteps] = useState<string[]>([]);

  // Quadratic: ax² + bx + c = 0
  const [qa, setQa] = useState("");
  const [qb, setQb] = useState("");
  const [qc, setQc] = useState("");
  const [quadResult, setQuadResult] = useState<string | null>(null);
  const [quadSteps, setQuadSteps] = useState<string[]>([]);

  // System: a1x + b1y = c1, a2x + b2y = c2
  const [s1a, setS1a] = useState("");
  const [s1b, setS1b] = useState("");
  const [s1c, setS1c] = useState("");
  const [s2a, setS2a] = useState("");
  const [s2b, setS2b] = useState("");
  const [s2c, setS2c] = useState("");
  const [sysResult, setSysResult] = useState<string | null>(null);
  const [sysSteps, setSysSteps] = useState<string[]>([]);

  const solveLinear = () => {
    const a = parseFloat(la), b = parseFloat(lb), c = parseFloat(lc);
    if (isNaN(a) || isNaN(b) || isNaN(c)) return;
    if (a === 0) { setLinearResult("a cannot be 0"); return; }
    const x = (c - b) / a;
    setLinearSteps([
      `${a}x + ${b} = ${c}`,
      `${a}x = ${c} - ${b} = ${c - b}`,
      `x = ${c - b} / ${a} = ${x}`,
    ]);
    setLinearResult(`x = ${x}`);
  };

  const solveQuadratic = () => {
    const a = parseFloat(qa), b = parseFloat(qb), c = parseFloat(qc);
    if (isNaN(a) || isNaN(b) || isNaN(c)) return;
    if (a === 0) { setQuadResult("a cannot be 0"); return; }
    const disc = b * b - 4 * a * c;
    const steps = [
      `${a}x² + ${b}x + ${c} = 0`,
      `${t("solverDiscriminant")}: b² - 4ac = ${b}² - 4(${a})(${c}) = ${disc}`,
    ];
    if (disc < 0) {
      steps.push(t("solverNoReal"));
      setQuadResult(t("solverNoReal"));
    } else if (disc === 0) {
      const x = -b / (2 * a);
      steps.push(`x = -b / 2a = ${-b} / ${2 * a} = ${x}`);
      setQuadResult(`${t("solverOneRoot")}: x = ${x}`);
    } else {
      const x1 = (-b + Math.sqrt(disc)) / (2 * a);
      const x2 = (-b - Math.sqrt(disc)) / (2 * a);
      steps.push(`x₁ = (-${b} + √${disc}) / ${2 * a} = ${x1.toFixed(4)}`);
      steps.push(`x₂ = (-${b} - √${disc}) / ${2 * a} = ${x2.toFixed(4)}`);
      setQuadResult(`${t("solverTwoRoots")}: x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`);
    }
    setQuadSteps(steps);
  };

  const solveSystem = () => {
    const a1 = parseFloat(s1a), b1 = parseFloat(s1b), c1 = parseFloat(s1c);
    const a2 = parseFloat(s2a), b2 = parseFloat(s2b), c2 = parseFloat(s2c);
    if ([a1, b1, c1, a2, b2, c2].some(isNaN)) return;
    const det = a1 * b2 - a2 * b1;
    const steps = [
      `${a1}x + ${b1}y = ${c1}`,
      `${a2}x + ${b2}y = ${c2}`,
      `det = ${a1}×${b2} - ${a2}×${b1} = ${det}`,
    ];
    if (det === 0) {
      steps.push(t("solverNoReal"));
      setSysResult(t("solverNoReal"));
    } else {
      const x = (c1 * b2 - c2 * b1) / det;
      const y = (a1 * c2 - a2 * c1) / det;
      steps.push(`x = (${c1}×${b2} - ${c2}×${b1}) / ${det} = ${x.toFixed(4)}`);
      steps.push(`y = (${a1}×${c2} - ${a2}×${c1}) / ${det} = ${y.toFixed(4)}`);
      setSysResult(`x = ${x.toFixed(4)}, y = ${y.toFixed(4)}`);
    }
    setSysSteps(steps);
  };

  const ResultBox = ({ result, steps }: { result: string | null; steps: string[] }) =>
    result ? (
      <div className="mt-4 space-y-3">
        <div className="p-4 rounded-xl bg-primary/10">
          <p className="text-sm text-muted-foreground mb-1">{t("solverSolution")}</p>
          <p className="text-xl font-bold text-primary font-mono">{result}</p>
        </div>
        {steps.length > 0 && (
          <div className="bg-muted/40 rounded-lg p-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">{t("solverSteps")}</p>
            {steps.map((s, i) => (
              <p key={i} className="text-sm font-mono">{s}</p>
            ))}
          </div>
        )}
      </div>
    ) : null;

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm">
      <Tabs value={tab} onValueChange={(v) => { setTab(v); setLinearResult(null); setQuadResult(null); setSysResult(null); }}>
        <TabsList className="w-full mb-5">
          <TabsTrigger value="linear" className="flex-1 text-xs">{t("solverLinear")}</TabsTrigger>
          <TabsTrigger value="quadratic" className="flex-1 text-xs">{t("solverQuadratic")}</TabsTrigger>
          <TabsTrigger value="system" className="flex-1 text-xs">{t("solverSystem")}</TabsTrigger>
        </TabsList>

        <TabsContent value="linear">
          <div className="space-y-3">
            <p className="text-sm font-mono text-muted-foreground">ax + b = c</p>
            <div className="grid grid-cols-3 gap-2">
              <div><Label className="text-xs">a</Label><Input type="number" value={la} onChange={(e) => setLa(e.target.value)} className="mt-1" /></div>
              <div><Label className="text-xs">b</Label><Input type="number" value={lb} onChange={(e) => setLb(e.target.value)} className="mt-1" /></div>
              <div><Label className="text-xs">c</Label><Input type="number" value={lc} onChange={(e) => setLc(e.target.value)} className="mt-1" /></div>
            </div>
            <Button onClick={solveLinear} className="w-full">{t("calculate")}</Button>
            <ResultBox result={linearResult} steps={linearSteps} />
          </div>
        </TabsContent>

        <TabsContent value="quadratic">
          <div className="space-y-3">
            <p className="text-sm font-mono text-muted-foreground">ax² + bx + c = 0</p>
            <div className="grid grid-cols-3 gap-2">
              <div><Label className="text-xs">a</Label><Input type="number" value={qa} onChange={(e) => setQa(e.target.value)} className="mt-1" /></div>
              <div><Label className="text-xs">b</Label><Input type="number" value={qb} onChange={(e) => setQb(e.target.value)} className="mt-1" /></div>
              <div><Label className="text-xs">c</Label><Input type="number" value={qc} onChange={(e) => setQc(e.target.value)} className="mt-1" /></div>
            </div>
            <Button onClick={solveQuadratic} className="w-full">{t("calculate")}</Button>
            <ResultBox result={quadResult} steps={quadSteps} />
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="space-y-3">
            <p className="text-sm font-mono text-muted-foreground">a₁x + b₁y = c₁</p>
            <div className="grid grid-cols-3 gap-2">
              <div><Label className="text-xs">a₁</Label><Input type="number" value={s1a} onChange={(e) => setS1a(e.target.value)} className="mt-1" /></div>
              <div><Label className="text-xs">b₁</Label><Input type="number" value={s1b} onChange={(e) => setS1b(e.target.value)} className="mt-1" /></div>
              <div><Label className="text-xs">c₁</Label><Input type="number" value={s1c} onChange={(e) => setS1c(e.target.value)} className="mt-1" /></div>
            </div>
            <p className="text-sm font-mono text-muted-foreground">a₂x + b₂y = c₂</p>
            <div className="grid grid-cols-3 gap-2">
              <div><Label className="text-xs">a₂</Label><Input type="number" value={s2a} onChange={(e) => setS2a(e.target.value)} className="mt-1" /></div>
              <div><Label className="text-xs">b₂</Label><Input type="number" value={s2b} onChange={(e) => setS2b(e.target.value)} className="mt-1" /></div>
              <div><Label className="text-xs">c₂</Label><Input type="number" value={s2c} onChange={(e) => setS2c(e.target.value)} className="mt-1" /></div>
            </div>
            <Button onClick={solveSystem} className="w-full">{t("calculate")}</Button>
            <ResultBox result={sysResult} steps={sysSteps} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
