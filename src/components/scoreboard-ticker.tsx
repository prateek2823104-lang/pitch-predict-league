import { TICKER_ENTRIES } from "@/lib/mock-data";
import { Radio, Sparkles, TrendingUp } from "lucide-react";

const iconFor = (kind: "score" | "baba" | "rank") => {
  if (kind === "score") return <Radio className="h-3 w-3 text-pitch" />;
  if (kind === "baba") return <Sparkles className="h-3 w-3 text-floodlight" />;
  return <TrendingUp className="h-3 w-3 text-var-blue" />;
};

export function ScoreboardTicker() {
  // duplicate the list once so the -50% translate loops seamlessly
  const items = [...TICKER_ENTRIES, ...TICKER_ENTRIES];

  return (
    <div className="ticker-wrap glass-bar relative h-9 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-stadium to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-stadium to-transparent" />
      <div className="absolute left-3 top-1/2 z-20 -translate-y-1/2">
        <span className="flex items-center gap-1.5 rounded-md bg-pitch/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-pitch">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-pitch" />
          Live
        </span>
      </div>
      <div className="ticker-track h-full items-center gap-10 pl-24">
        {items.map((entry, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2 text-mono text-xs text-chalk-dim"
          >
            {iconFor(entry.kind)}
            <span
              className={
                entry.kind === "score"
                  ? "text-pitch"
                  : entry.kind === "baba"
                    ? "text-chalk"
                    : "text-var-blue"
              }
            >
              {entry.text}
            </span>
            <span className="text-chalk-dim/40">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
