import { Link } from "@tanstack/react-router";
import { AppShell } from "./shells";
import { Sparkles } from "lucide-react";

export function ComingSoonPage({
  title,
  invitation,
  emoji = "⚡",
}: {
  title: string;
  invitation: string;
  emoji?: string;
}) {
  return (
    <AppShell>
      <div className="mx-auto flex max-w-3xl flex-col items-center pt-12 text-center md:pt-20">
        <div className="glass-card-lg w-full p-10 md:p-14">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-pitch/15 text-3xl">
            {emoji}
          </div>
          <h1 className="text-scoreboard mt-6 text-4xl text-chalk md:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-md text-base text-chalk-dim">{invitation}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="glass-button h-11 px-5 grid place-items-center text-sm font-semibold text-chalk"
            >
              Back to dashboard
            </Link>
            <Link
              to="/matches"
              className="h-11 rounded-[14px] bg-pitch px-5 grid place-items-center text-sm font-semibold text-stadium hover:bg-pitch/90 transition-colors"
            >
              Browse matches
            </Link>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-chalk-dim">
            <Sparkles className="h-3 w-3 text-floodlight" />
            Phase 1 preview — full experience coming soon
          </div>
        </div>
      </div>
    </AppShell>
  );
}
