import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/shells";
import { motion } from "framer-motion";
import {
  AI_BABA_TAKES,
  MATCHES,
  leaderboardWithMe,
  mockUser,
} from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { Flame, Coins, Sparkles, ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — FootballVerse AI" },
      { name: "description", content: "Your Football IQ, next match, and live takes from AI Baba." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <AppShell>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mx-auto max-w-7xl space-y-6"
      >
        <Header />
        <KPIRow />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <NextMatchHero />
            <UpcomingRail />
          </div>
          <div className="space-y-6">
            <AIBabaTake />
            <LeaderboardPreview />
          </div>
        </div>
      </motion.div>
    </AppShell>
  );
}

function Header() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-xs uppercase tracking-widest text-chalk-dim">Welcome back</p>
        <h1 className="text-scoreboard text-3xl text-chalk md:text-4xl">
          The floodlights are on, <span className="text-pitch">@{mockUser.username}.</span>
        </h1>
      </div>
      {mockUser.favoriteTeam && (
        <div className="glass-card flex items-center gap-2 px-3 py-2">
          <span className="text-xl">{mockUser.favoriteTeam.badge}</span>
          <span className="text-sm text-chalk-dim">Riding with</span>
          <span className="text-sm font-semibold text-chalk">{mockUser.favoriteTeam.name}</span>
        </div>
      )}
    </div>
  );
}

function KPIRow() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="glass-card p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-chalk-dim">Football IQ</div>
            <div className="text-scoreboard mt-2 text-5xl text-chalk leading-none">
              {mockUser.footballIQ.toLocaleString()}
            </div>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-pitch/15 px-2 py-0.5 text-xs text-pitch">
              <TrendingUp className="h-3 w-3" /> +{mockUser.weekDelta} this week
            </div>
          </div>
          <span className="rounded-lg border border-pitch/30 bg-pitch/10 px-2 py-1 text-[10px] uppercase tracking-widest text-pitch">
            {mockUser.tier}
          </span>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="text-xs uppercase tracking-widest text-chalk-dim">Streak</div>
        <div className="mt-2 flex items-baseline gap-3">
          <Flame className="h-9 w-9 text-floodlight" />
          <span className="text-mono text-5xl font-bold text-chalk">{mockUser.streak}</span>
          <span className="text-sm text-chalk-dim">days</span>
        </div>
        <p className="mt-3 text-xs text-chalk-dim">Keep predicting daily to extend it.</p>
      </div>

      <div className="glass-card p-5">
        <div className="text-xs uppercase tracking-widest text-chalk-dim">Coins</div>
        <div className="mt-2 flex items-baseline gap-3">
          <Coins className="h-8 w-8 text-floodlight" />
          <span className="text-mono text-5xl font-bold text-chalk">{mockUser.coins}</span>
        </div>
        <Link to="/store" className="mt-3 inline-flex items-center gap-1 text-xs text-pitch hover:underline">
          Earn more <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function NextMatchHero() {
  const nextMatch = MATCHES.find((m) => m.status === "upcoming")!;
  const countdown = useCountdown(nextMatch.kickoff);
  const [home, setHome] = useState(2);
  const [away, setAway] = useState(1);
  const [confidence, setConfidence] = useState(72);
  const [locked, setLocked] = useState(false);

  return (
    <div className="glass-card-lg p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs uppercase tracking-widest text-chalk-dim">Your next match</span>
          <h2 className="text-scoreboard mt-1 text-2xl text-chalk md:text-3xl">
            {nextMatch.competition}
          </h2>
        </div>
        <div className="rounded-xl border border-pitch/30 bg-pitch/10 px-4 py-2 text-center">
          <div className="text-[10px] uppercase tracking-widest text-pitch">Kickoff in</div>
          <div className="text-mono mt-0.5 text-xl font-bold text-chalk">{countdown}</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <TeamBlock team={nextMatch.home} />
        <div className="flex items-center gap-2">
          <Stepper value={home} onChange={setHome} disabled={locked} />
          <span className="text-mono text-2xl text-chalk-dim">–</span>
          <Stepper value={away} onChange={setAway} disabled={locked} />
        </div>
        <TeamBlock team={nextMatch.away} align="right" />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-chalk-dim">
          <span>Confidence</span>
          <span className="text-mono text-chalk">{confidence}%</span>
        </div>
        <input
          type="range"
          min={10}
          max={100}
          value={confidence}
          disabled={locked}
          onChange={(e) => setConfidence(Number(e.target.value))}
          className="mt-2 w-full accent-pitch"
        />
      </div>

      <button
        onClick={() => setLocked(true)}
        disabled={locked}
        className={[
          "mt-6 h-12 w-full rounded-[14px] text-sm font-semibold transition-colors",
          locked
            ? "bg-white/5 text-chalk-dim cursor-default"
            : "bg-pitch text-stadium hover:bg-pitch/90",
        ].join(" ")}
      >
        {locked ? "Prediction locked in 🔒" : "Lock in prediction"}
      </button>
    </div>
  );
}

function TeamBlock({
  team,
  align = "left",
}: {
  team: { name: string; short: string; badge: string };
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <div className={`flex items-center gap-3 ${align === "right" ? "justify-end" : ""}`}>
        {align === "left" && <span className="text-4xl">{team.badge}</span>}
        <div>
          <div className="text-scoreboard text-2xl text-chalk md:text-3xl">{team.short}</div>
          <div className="text-xs text-chalk-dim">{team.name}</div>
        </div>
        {align === "right" && <span className="text-4xl">{team.badge}</span>}
      </div>
    </div>
  );
}

function Stepper({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (n: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => onChange(value + 1)}
        disabled={disabled}
        className="grid h-6 w-9 place-items-center rounded-md border border-white/10 text-chalk-dim hover:border-pitch/40 hover:text-pitch disabled:opacity-30"
        aria-label="Increase"
      >
        +
      </button>
      <div className="text-scoreboard my-1 w-12 text-center text-4xl text-chalk md:text-5xl">
        {value}
      </div>
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={disabled}
        className="grid h-6 w-9 place-items-center rounded-md border border-white/10 text-chalk-dim hover:border-pitch/40 hover:text-pitch disabled:opacity-30"
        aria-label="Decrease"
      >
        –
      </button>
    </div>
  );
}

function UpcomingRail() {
  const upcoming = MATCHES.filter((m) => m.status !== "finished");
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-scoreboard text-xl text-chalk">Up next</h3>
        <Link to="/matches" className="text-xs text-pitch hover:underline">
          See all
        </Link>
      </div>
      <div className="no-scrollbar -mx-2 flex gap-3 overflow-x-auto px-2 pb-2">
        {upcoming.map((m) => (
          <div key={m.id} className="glass-card glass-card-hover w-60 shrink-0 p-4">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-chalk-dim">
              <span>{m.competition}</span>
              {m.status === "live" ? (
                <span className="inline-flex items-center gap-1 text-pitch">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-pitch" />
                  Live {m.minute}'
                </span>
              ) : (
                <span className="text-mono">
                  {m.kickoff.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{m.home.badge}</span>
                <span className="text-scoreboard text-lg text-chalk">{m.home.short}</span>
              </div>
              {m.status === "live" ? (
                <span className="text-mono text-xl font-bold text-pitch">
                  {m.homeScore}–{m.awayScore}
                </span>
              ) : (
                <span className="text-mono text-xs text-chalk-dim">vs</span>
              )}
              <div className="flex items-center gap-2">
                <span className="text-scoreboard text-lg text-chalk">{m.away.short}</span>
                <span className="text-2xl">{m.away.badge}</span>
              </div>
            </div>
            <button className="glass-button mt-4 h-9 w-full text-xs font-semibold text-chalk">
              {m.status === "live" ? "Watch" : "Predict"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIBabaTake() {
  const take = AI_BABA_TAKES[0];
  return (
    <div className="glass-card p-6 ring-1 ring-floodlight/30">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-floodlight/15 text-floodlight">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <div className="text-xs uppercase tracking-widest text-floodlight">AI Baba says</div>
          <div className="text-[10px] text-chalk-dim">ARG vs BRA · 1h 35m</div>
        </div>
      </div>
      <p className="mt-4 text-base font-medium leading-snug text-chalk">"{take.headline}"</p>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <span className="text-xs uppercase tracking-widest text-chalk-dim">Predicted</span>
        <span className="text-mono text-2xl font-bold text-chalk">
          {take.predictedHome}–{take.predictedAway}
        </span>
      </div>
      <Link
        to="/ai-baba"
        className="mt-4 inline-flex items-center gap-1 text-xs text-floodlight hover:underline"
      >
        Read the full take <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

function LeaderboardPreview() {
  const board = leaderboardWithMe();
  const top = board.slice(0, 5);
  const me = board.find((e) => e.isMe)!;
  return (
    <div className="glass-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-scoreboard text-xl text-chalk">Leaderboard</h3>
        <Link to="/leaderboard" className="text-xs text-pitch hover:underline">
          Full board
        </Link>
      </div>
      <ul className="space-y-1.5">
        {top.map((e) => (
          <Row key={e.username} e={e} />
        ))}
      </ul>
      <div className="mt-3 border-t border-white/10 pt-3">
        <Row e={me} />
      </div>
    </div>
  );
}

function Row({ e }: { e: ReturnType<typeof leaderboardWithMe>[number] }) {
  return (
    <li
      className={[
        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm",
        e.isMe ? "border border-pitch/30 bg-pitch/10" : "",
      ].join(" ")}
    >
      <span className="text-mono w-6 text-xs text-chalk-dim">#{e.rank}</span>
      <span className="grid h-7 w-7 place-items-center rounded-full bg-white/5 text-sm">
        {e.avatar}
      </span>
      <span className="min-w-0 flex-1 truncate text-chalk">@{e.username}</span>
      <span className="text-mono text-sm text-chalk">{e.iq}</span>
      <DeltaIcon d={e.delta} />
    </li>
  );
}

function DeltaIcon({ d }: { d: number }) {
  if (d > 0) return <TrendingUp className="h-3.5 w-3.5 text-pitch" />;
  if (d < 0) return <TrendingDown className="h-3.5 w-3.5 text-danger" />;
  return <Minus className="h-3.5 w-3.5 text-chalk-dim" />;
}
