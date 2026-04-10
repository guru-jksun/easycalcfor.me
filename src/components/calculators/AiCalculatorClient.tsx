"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Brain, Send, Loader2, RotateCcw, ChevronDown, ChevronUp, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface AiResult {
  result: string;
  explanation: string;
  formula?: string;
  steps?: string[];
  relatedCalculators?: string[];
}

interface AiCalculatorClientProps {
  locale: string;
  initialQuery?: string;
}

export default function AiCalculatorClient({ locale, initialQuery }: AiCalculatorClientProps) {
  const t = useTranslations("ai");
  const tC = useTranslations("calculators");
  const [query, setQuery] = useState(initialQuery || "");
  const [result, setResult] = useState<AiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialQuery) {
      calculate(initialQuery);
    }
  }, [initialQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const calculate = async (q?: string) => {
    const queryToUse = q || query;
    if (!queryToUse.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setShowSteps(false);

    try {
      const res = await fetch("/api/ai-calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryToUse, locale }),
      });

      if (!res.ok) throw new Error("Failed to calculate");

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("text/event-stream")) {
        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const parsed = JSON.parse(line.slice(6));
              if (parsed.error) { setError(parsed.error); setLoading(false); return; }
              if (parsed.done) { setResult(parsed as AiResult); }
            } catch { /* ignore partial JSON */ }
          }
        }
      } else {
        const data: AiResult = await res.json();
        setResult(data);
      }
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      calculate();
    }
  };

  return (
    <div className="space-y-4">
      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); calculate(); }}
        className="bg-card border-2 border-border focus-within:border-primary rounded-2xl overflow-hidden transition-colors card-shadow"
      >
        <div className="flex items-start gap-3 p-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
            <Brain className="w-4 h-4 text-primary-foreground" />
          </div>
          <Textarea
            ref={textareaRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("placeholder")}
            className="flex-1 resize-none border-0 shadow-none focus-visible:ring-0 p-0 min-h-[60px] bg-transparent text-sm"
            rows={2}
          />
        </div>
        <div className="flex items-center justify-between px-4 pb-3">
          <p className="text-xs text-muted-foreground">{t("hint")}</p>
          <div className="flex gap-2">
            {(query || result) && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => { setQuery(""); setResult(null); setError(null); }}
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                {t("clear")}
              </Button>
            )}
            <Button type="submit" size="sm" disabled={!query.trim() || loading} className="gap-2">
              {loading
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                : <Send className="w-3.5 h-3.5" />
              }
              {t("calculate")}
            </Button>
          </div>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-3 card-shadow">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Loader2 className="w-4 h-4 text-primary animate-spin" />
          </div>
          <div>
            <p className="font-medium text-sm">{t("calculating")}</p>
            <p className="text-xs text-muted-foreground">{t("calculatingDesc")}</p>
          </div>
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="bg-card border border-border rounded-2xl overflow-hidden card-shadow">
          <div className="bg-primary/10 p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Brain className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">{t("resultLabel")}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                {copied ? tC("aiCopied") : tC("aiShareLink")}
              </button>
            </div>
            <p className="text-3xl font-bold text-primary">{result.result}</p>
          </div>

          <div className="p-5 space-y-4">
            <p className="text-sm text-foreground leading-relaxed">{result.explanation}</p>

            {result.formula && (
              <div className="bg-muted rounded-lg px-4 py-3">
                <p className="text-xs text-muted-foreground font-medium mb-1">{t("formula")}</p>
                <p className="font-mono text-sm">{result.formula}</p>
              </div>
            )}

            {result.steps && result.steps.length > 0 && (
              <div>
                <button
                  onClick={() => setShowSteps(!showSteps)}
                  className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  {showSteps
                    ? <><ChevronUp className="w-4 h-4" />{t("hideSteps")}</>
                    : <><ChevronDown className="w-4 h-4" />{t("showSteps")}</>
                  }
                </button>
                {showSteps && (
                  <ol className="mt-3 space-y-2 list-decimal list-inside">
                    {result.steps.map((step, i) => (
                      <li key={i} className="text-sm text-muted-foreground">{step}</li>
                    ))}
                  </ol>
                )}
              </div>
            )}

            {result.relatedCalculators && result.relatedCalculators.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-2">{t("relatedCalcs")}</p>
                <div className="flex flex-wrap gap-2">
                  {result.relatedCalculators.map((calc) => (
                    <span key={calc} className="text-xs bg-secondary text-secondary-foreground rounded-full px-3 py-1">
                      {calc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
