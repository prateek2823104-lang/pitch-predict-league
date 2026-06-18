import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MarketingShell } from "@/components/shells";
import { TEAMS, setFavoriteTeam } from "@/lib/mock-data";
import { useMemo, useState } from "react";
import { Search, Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/onboarding/favorite-team")({
  head: () => ({
    meta: [
      { title: "Pick your team — FootballVerse AI" },
      { name: "description", content: "Choose your favorite team to personalize FootballVerse AI." },
    ],
  }),
  component: FavoriteTeamPage,
});

function FavoriteTeamPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      TEAMS.filter((t) =>
        (t.name + " " + t.short).toLowerCase().includes(query.toLowerCase().trim()),
      ),
    [query],
  );

  const continueOn = () => {
    if (selected) setFavoriteTeam(selected);
    navigate({ to: "/dashboard" });
  };

  return (
    <MarketingShell>
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-pitch">Step 2 of 2</span>
          <h1 className="text-scoreboard mt-2 text-3xl text-chalk md:text-5xl">
            Who do you <span className="text-pitch">ride with?</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-chalk-dim">
            Pick your favorite team. We'll prioritize their fixtures and pin them to
            your profile. You can change this anytime.
          </p>
        </div>

        <div className="glass-card mt-8 flex h-12 items-center gap-2 px-4">
          <Search className="h-4 w-4 text-chalk-dim" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search teams…"
            className="h-full flex-1 bg-transparent text-sm text-chalk placeholder:text-chalk-dim focus:outline-none"
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filtered.map((team) => {
            const isSelected = selected === team.id;
            return (
              <button
                key={team.id}
                onClick={() => setSelected(team.id)}
                className={[
                  "glass-card relative flex flex-col items-center gap-2 p-4 transition-all",
                  isSelected
                    ? "border-pitch/60 bg-pitch/10 ring-2 ring-pitch/40"
                    : "glass-card-hover",
                ].join(" ")}
              >
                {isSelected && (
                  <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-pitch text-stadium">
                    <Check className="h-3 w-3" />
                  </span>
                )}
                <span className={`grid h-12 w-12 place-items-center rounded-xl text-3xl ${team.color}`}>
                  {team.badge}
                </span>
                <div className="text-center">
                  <div className="text-scoreboard text-sm text-chalk">{team.short}</div>
                  <div className="truncate text-[10px] text-chalk-dim">{team.name}</div>
                </div>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="mt-6 text-center text-sm text-chalk-dim">
            No teams match "{query}". Try a different name.
          </p>
        )}

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={() => navigate({ to: "/dashboard" })}
            className="text-sm text-chalk-dim hover:text-chalk"
          >
            Skip for now
          </button>
          <button
            onClick={continueOn}
            disabled={!selected}
            className={[
              "inline-flex h-11 items-center gap-2 rounded-[14px] px-6 text-sm font-semibold transition-colors",
              selected
                ? "bg-pitch text-stadium hover:bg-pitch/90"
                : "bg-white/5 text-chalk-dim cursor-not-allowed",
            ].join(" ")}
          >
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </MarketingShell>
  );
}
