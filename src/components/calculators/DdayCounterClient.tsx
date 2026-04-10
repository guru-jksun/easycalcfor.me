"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SavedEvent {
  id: string;
  name: string;
  targetDate: string;
}

interface DdayResult {
  isPast: boolean;
  days: number;
  weeks: number;
  hours: number;
  minutes: number;
  progressPercent: number | null;
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

function calculateDday(targetDate: Date): DdayResult {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diffMs = target.getTime() - now.getTime();
  const isPast = diffMs < 0;
  const absDays = Math.abs(Math.round(diffMs / (1000 * 60 * 60 * 24)));
  const weeks = Math.floor(absDays / 7);
  const hours = absDays * 24;
  const minutes = hours * 60;

  // Progress bar: if within 1 year (365 days)
  let progressPercent: number | null = null;
  if (!isPast && absDays <= 365) {
    progressPercent = Math.round(((365 - absDays) / 365) * 100);
  }

  return { isPast, days: absDays, weeks, hours, minutes, progressPercent };
}

const MAX_EVENTS = 5;
const STORAGE_KEY = "dday_events";

export default function DdayCounterClient() {
  const t = useTranslations("calculators");
  const todayStr = new Date().toISOString().split("T")[0];
  const [eventName, setEventName] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [result, setResult] = useState<DdayResult | null>(null);
  const [error, setError] = useState("");
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSavedEvents(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const persistEvents = (events: SavedEvent[]) => {
    setSavedEvents(events);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(events)); } catch { /* ignore */ }
  };

  const calculate = () => {
    setError("");
    if (!targetDate) { setError(t("ddayErrNoDate")); return; }
    const date = new Date(targetDate + "T00:00:00");
    if (isNaN(date.getTime())) { setError(t("ddayErrInvalidDate")); return; }
    setResult(calculateDday(date));
  };

  const saveEvent = () => {
    if (!targetDate) { setError(t("ddayErrEnterDate")); return; }
    if (savedEvents.length >= MAX_EVENTS) { setError(t("ddayErrMaxEvents")); return; }
    const name = eventName.trim() || "Event";
    const newEvent: SavedEvent = { id: Date.now().toString(), name, targetDate };
    persistEvents([...savedEvents, newEvent]);
  };

  const removeEvent = (id: string) => {
    persistEvents(savedEvents.filter((e) => e.id !== id));
  };

  const loadEvent = (event: SavedEvent) => {
    setEventName(event.name);
    setTargetDate(event.targetDate);
    const date = new Date(event.targetDate + "T00:00:00");
    setResult(calculateDday(date));
    setError("");
  };

  const reset = () => {
    setEventName("");
    setTargetDate("");
    setResult(null);
    setError("");
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm max-w-sm space-y-4">
      <div>
        <Label htmlFor="event-name">{t("ddayEventNameLabel")} <span className="text-muted-foreground text-xs">{t("optional")}</span></Label>
        <Input
          id="event-name"
          type="text"
          placeholder={`${t("egPrefix")} My Wedding`}
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="target-date">{t("ddayTargetDate")}</Label>
        <Input
          id="target-date"
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="mt-1"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-2 pt-1">
        <Button onClick={calculate} className="flex-1">{t("calculate")}</Button>
        <Button variant="outline" onClick={saveEvent} disabled={!targetDate}>{t("ddaySave")}</Button>
        <Button variant="outline" onClick={reset}>{t("reset")}</Button>
      </div>

      {result && (
        <div className="space-y-3 mt-2">
          {/* Primary result */}
          <div className={`rounded-xl p-4 text-center ${result.isPast ? "bg-muted/60" : "bg-primary/10"}`}>
            {eventName && <p className="text-sm font-medium mb-1">{eventName}</p>}
            <p className="text-sm text-muted-foreground mb-1">
              {result.isPast ? t("ddayDaysSince") : t("ddayDaysRemaining")}
            </p>
            <p className={`text-5xl font-bold ${result.isPast ? "text-muted-foreground" : "text-primary"}`}>
              {result.days === 0 ? "Today!" : result.isPast ? `+${fmt(result.days)}` : `D-${fmt(result.days)}`}
            </p>
          </div>

          {/* Progress bar (future, within 1 year) */}
          {result.progressPercent !== null && (
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{t("ddayProgressToDate")}</span>
                <span>{result.progressPercent}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${result.progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: t("ddayWeeks"), value: fmt(result.weeks) },
              { label: t("ddayHours"), value: fmt(result.hours) },
              { label: t("ddayMinutes"), value: fmt(result.minutes) },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-muted/50 p-3 text-center">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-semibold text-sm mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved events */}
      {savedEvents.length > 0 && (
        <div className="border-t pt-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            {t("ddaySavedEvents")} ({savedEvents.length}/{MAX_EVENTS})
          </p>
          <div className="space-y-2">
            {savedEvents.map((event) => {
              const d = new Date(event.targetDate + "T00:00:00");
              const r = calculateDday(d);
              return (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm gap-2"
                >
                  <button
                    className="flex-1 text-left"
                    onClick={() => loadEvent(event)}
                  >
                    <span className="font-medium">{event.name}</span>
                    <span className="text-muted-foreground ml-2 text-xs">
                      {r.isPast ? `+${r.days}d ago` : `D-${r.days}`}
                    </span>
                  </button>
                  <button
                    onClick={() => removeEvent(event.id)}
                    className="text-muted-foreground hover:text-red-500 text-xs px-1"
                    aria-label="Remove"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
