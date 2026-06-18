import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/shells";
import { MATCHES, type Match } from "@/lib/mock-data";
import { Search, Calendar, Radio, Trophy, Filter } from "lucide-react";

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [
      { title: "Match Center — FootballVerse AI" },
      {
        name: "description",
        content:
          "Every upcoming, live, and finished fixture in one place. One tap to predict, one tap to dive in.",
      },
      { property: "og:title", content: "Match Center — FootballVerse AI" },
      {
        property: "og:description",
        content: "Upcoming, live, and finished fixtures across every competition.",
      },
    ],
  }),
  component: MatchesPage,
});

type Status = "all" | "live" | "upcoming" | "finished";

const TAB_META: { id: Status; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "all", label: "All", icon: Filter },
  { id: "live", label: "Live", icon: Radio },
  { id: "upcoming", label: "Upcoming", icon: Calendar },
  { id: "finished", label: "Finished", icon: Trophy },
];

function MatchesPage() {
  const [tab, setTab] = useState<Status>("all");
  const [comp, setComp] = useState<string>("all");
  const [q, setQ] = useState("");

  const competitions = useMemo(
    () => ["all", ...Array.from(new Set(MATCHES.map((m) => m.competition)))],
    [],
  );

  const counts = useMemo(
    () => ({
      all: MATCHES.length,
      live: MATCHES.filter((m) => m.status === "live").length,
      upcoming: MATCHES.filter((m) => m.status === "upcoming").length,
      finished: MATCHES.filter((m) => m.status === "finished").length,
    }),
    [],
  );

  const filtered = useMemo(() => {
    return MATCHES.filter((m) => {
      if (tab !== "all" && m.status !== tab) return false;
      if (comp !== "all" && m.competition !== comp) return false;
      if (q) {
        const needle = q.toLowerCase();
        if (
          !m.home.name.toLowerCase().includes(needle) &&
          !m.away.name.toLowerCase().includes(needle) &&
          !m.competition.toLowerCase().includes(needle)
        )
          return false;
      }
      return true;
    });
  }, [tab, comp, q]);

  const groups = useMemo(() => {
    const live = filtered.filter((m) => m.status === "live");
    const upcoming = filtered
      .filter((m) => m.status === "upcoming")
      .sort((a, b) => a.kickoff.getTime() - b.kickoff.getTime());
    const finished = filtered
      .filter((m) => m.status === "finished")
      .sort((a, b) => b.kickoff.getTime() - a.kickoff.getTime());
    return { live, upcoming, finished };
  }, [filtered]);

  return (
    <AppShell>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mx-auto max-w-7xl space-y-6"
      >
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-chalk-dim">Match Center</p>
            <h1 className="text-scoreboard text-3xl text-chalk md:text-4xl">
              Every fixture. One <span className="text-pitch">tap</span> to predict.
            </h1>
          </div>
          <div className="glass-card flex items-center gap-2 px-3 py-2 text-mono text-xs text-chalk-dim">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-pitch" />
            <span className="text-pitch">{counts.live} live</span>
            <span className="text-chalk-dim/60">·</span>
            <span>{counts.upcoming} upcoming</span>
          </div>
        </header>

        {/* Controls */}
        <div className="glass-card flex flex-col gap-3 p-3 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-1.5">
            {TAB_META.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-pitch text-stadium"
                      : "border border-white/10 bg-white/5 text-chalk-dim hover:border-pitch/40 hover:text-chalk",
                  ].join(" ")}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t.label}
                  <span className="text-mono text-[10px] opacity-70">{counts[t.id]}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-1 flex-wrap items-center gap-2 md:justify-end">
            <div className="relative flex-1 md:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-chalk-dim" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search teams or competition"
                className="h-9 w-full rounded-[12px] border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-chalk placeholder:text-chalk-dim/70 focus:border-pitch/40"
              />
            </div>
            <select
              value={comp}
              onChange={(e) => setComp(e.target.value)}
              className="h-9 rounded-[12px] border border-white/10 bg-stadium-soft px-3 text-sm text-chalk focus:border-pitch/40"
            >
              {competitions.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All competitions" : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Groups */}
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-8">
            {groups.live.length > 0 && (
              <Section title="Live now" accent="pitch">
                <Grid matches={groups.live} />
              </Section>
            )}
            {groups.upcoming.length > 0 && (
              <Section title="Upcoming" accent="chalk">
                <Grid matches={groups.upcoming} />
              </Section>
            )}
            {groups.finished.length > 0 && (
              <Section title="Finished" accent="dim">
                <Grid matches={groups.finished} />
              </Section>
            )}
          </div>
        )}
      </motion.div>
    </AppShell>
  );
}

function Section({
  title,
  accent,
  children,
}: {
  title: string;
  accent: "pitch" | "chalk" | "dim";
  children: React.ReactNode;
}) {
  const dot =
    accent === "pitch"
      ? "bg-pitch"
      : accent === "chalk"
        ? "bg-chalk"
        : "bg-chalk-dim/50";
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <h2 className="text-scoreboard text-lg text-chalk">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Grid({ matches }: { matches: Match[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {matches.map((m) => (
        <MatchCard key={m.id} m={m} />
      ))}
    </div>
  );
}

function useTickingKickoff(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = target.getTime() - now;
  return diff;
}

function MatchCard({ m }: { m: Match }) {
  const diff = useTickingKickoff(m.kickoff);
  let when: React.ReactNode;
  if (m.status === "live") {
    when = (
      <span className="inline-flex items-center gap-1.5 text-pitch">
        <span className="live-dot h-1.5 w-1.5 rounded-full bg-pitch" />
        LIVE · {m.minute}'
      </span>
    );
  } else if (m.status === "finished") {
    when = <span className="text-chalk-dim">Full time</span>;
  } else {
    const abs = Math.abs(diff);
    const h = Math.floor(abs / 3_600_000);
    const mm = Math.floor((abs % 3_600_000) / 60_000);
    when = (
      <span className="text-mono text-chalk-dim">
        Kickoff in {h}h {mm.toString().padStart(2, "0")}m
      </span>
    );
  }

  return (
    <Link
      to="/matches/$id"
      params={{ id: m.id }}
      className="glass-card glass-card-hover block p-5"
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-chalk-dim">
        <span>{m.competition}</span>
        <span>{when}</span>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <Side team={m.home} score={m.homeScore} status={m.status} />
        <span className="text-mono text-base text-chalk-dim">{m.status === "upcoming" ? "vs" : "—"}</span>
        <Side team={m.away} score={m.awayScore} status={m.status} align="right" />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-[11px] text-chalk-dim">
          {m.kickoff.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}{" "}
          ·{" "}
          {m.kickoff.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
        <span className="glass-button inline-flex h-8 items-center px-3 text-xs font-semibold text-chalk">
          {m.status === "finished" ? "Recap" : m.status === "live" ? "Watch" : "Predict"}
        </span>
      </div>
    </Link>
  );
}

function Side({
  team,
  score,
  status,
  align = "left",
}: {
  team: Match["home"];
  score?: number;
  status: Match["status"];
  align?: "left" | "right";
}) {
  const right = align === "right";
  return (
    <div className={`flex items-center gap-3 ${right ? "flex-row-reverse text-right" : ""}`}>
      <span className="text-3xl">{team.badge}</span>
      <div className={right ? "text-right" : ""}>
        <div className="text-scoreboard text-xl text-chalk">{team.short}</div>
        <div className="text-[11px] text-chalk-dim">{team.name}</div>
      </div>
      {status !== "upcoming" && (
        <span className="text-scoreboard ml-auto text-3xl text-chalk">{score}</span>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="glass-card-lg flex flex-col items-center gap-3 p-12 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-pitch/15 text-2xl">🔭</div>
      <h3 className="text-scoreboard text-xl text-chalk">No fixtures match that</h3>
      <p className="max-w-sm text-sm text-chalk-dim">
        Try a different competition or clear the search — there's always a derby brewing somewhere.
      </p>
    </div>
  );
}
