"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AiSearchBarProps {
  locale: string;
  placeholder: string;
  buttonText: string;
  examples?: string[];
}

export default function AiSearchBar({ locale, placeholder, buttonText, examples }: AiSearchBarProps) {
  const [query, setQuery] = useState("");
  const [currentExample, setCurrentExample] = useState(0);
  const [fade, setFade] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!examples || examples.length === 0) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentExample((prev) => (prev + 1) % examples.length);
        setFade(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, [examples]);

  const displayPlaceholder = examples && examples.length > 0 ? examples[currentExample] : placeholder;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/${locale}/ai?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto">
      <div className="relative flex items-start bg-card border-2 border-border focus-within:border-primary rounded-2xl card-shadow transition-colors overflow-hidden">
        <Sparkles className="absolute left-4 rtl:left-auto rtl:right-4 top-4 w-5 h-5 text-primary pointer-events-none" />
        <div className="relative flex-1">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(e as unknown as React.FormEvent); } }}
            placeholder=" "
            rows={2}
            className="flex-1 w-full bg-transparent pl-12 pr-4 rtl:pl-4 rtl:pr-12 py-4 text-sm sm:text-base outline-none resize-none peer"
          />
          {!query && (
            <span
              className={`absolute left-12 rtl:left-auto rtl:right-12 top-4 text-sm sm:text-base text-muted-foreground pointer-events-none transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
            >
              {displayPlaceholder}
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="m-1.5 mt-3 rounded-xl gap-2 shrink-0"
          disabled={!query.trim()}
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:block">{buttonText}</span>
        </Button>
      </div>
    </form>
  );
}
