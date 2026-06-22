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
import {
  Flame,
  Sparkles,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

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
        className="mx-auto max-w-7xl space-y-8"
      >
        <Header />
        <KPIRow />
        <div className="grid gap-8 xl:grid-cols-3">
          <div className="space-y-8 xl:col-span-2">
            <NextMatchHero />
            <UpcomingRail />
          </div>
          <div className="space-y-8">
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
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-chalk-dim">
          Command Suite
        </p>
        <h1
          className="mt-2 truncate text-3xl font-extrabold tracking-tight text-chalk md:text-4xl"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Welcome back, <span className="text-[#f0d78c]">@{mockUser.username}</span>
        </h1>
      </div>
      {mockUser.favoriteTeam && (
        <div className="flex shrink-0 items-center gap-2 rounded-xl border border-white/5 bg-[#1a1a1a] px-3 py-2">
          <span className="text-xl">{mockUser.favoriteTeam.badge}</span>
          <span className="hidden text-xs text-chalk-dim sm:inline">Riding with</span>
          <span className="text-sm font-semibold text-chalk">{mockUser.favoriteTeam.name}</span>
        </div>
      )}
    </div>
  );
}

function KPI({
  label,
  value,
  suffix,
  accent = "white",
  hint,
}: {
  label: string;
  value: string;
  suffix?: React.ReactNode;
  accent?: "white" | "gold";
  hint?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#1a1a1a] p-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-chalk-dim">{label}</p>
      <div className="mt-3 flex items-baseline gap-2">
        <h2
          className={`text-4xl font-extrabold tracking-tight ${accent === "gold" ? "text-[#f0d78c]" : "text-chalk"}`}
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          {value}
        </h2>
        {suffix}
      </div>
      {hint && <div className="mt-3">{hint}</div>}
      {accent === "gold" && (
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-1/4 bg-[#c9a84c]"
        />
      )}
    </div>
  );
}

function KPIRow() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      <KPI
        label="Football IQ"
        value={mockUser.footballIQ.toLocaleString()}
        accent="gold"
        suffix={
          <span className="text-mono text-[11px] font-bold text-[#c9a84c]">
            +{mockUser.weekDelta}
          </span>
        }
        hint={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/[0.06] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#c9a84c]">
            {mockUser.tier}
          </span>
        }
      />
      <KPI
        label="Active Streak"
        value={String(mockUser.streak).padStart(2, "0")}
        suffix={<span className="text-xs font-semibold text-chalk-dim">days</span>}
        hint={
          <div className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-[#c9a84c]" />
            <span className="text-[11px] text-chalk-dim">predict daily to keep it alive</span>
          </div>
        }
      />
      <KPI
        label="Verse Balance"
        value={mockUser.coins.toLocaleString()}
        suffix={<span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c]">VRC</span>}
        hint={
          <Link to="/store" className="inline-flex items-center gap-1 text-[11px] text-[#c9a84c] hover:text-[#f0d78c]">
            Earn more <ArrowRight className="h-3 w-3" />
          </Link>
        }
      />
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
  return { h, m, s, label: `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}` };
}

function NextMatchHero() {
  const nextMatch = MATCHES.find((m) => m.status === "upcoming")!;
  const { label } = useCountdown(nextMatch.kickoff);
  const [home, setHome] = useState(2);
  const [away, setAway] = useState(1);
  const [confidence, setConfidence] = useState(82);
  const [locked, setLocked] = useState(false);

  return (
    <section
      className="relative overflow-hidden rounded-[28px] border border-white/10 p-8 md:p-10"
      style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #121212 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)" }}
      />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-chalk-dim">
            Your next match
          </p>
          <h2
            className="mt-1 text-xl font-extrabold tracking-tight text-chalk md:text-2xl"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            {nextMatch.competition}
          </h2>
        </div>
        <span className="rounded-full border border-[#c9a84c]/40 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f0d78c]">
          Kickoff <span className="text-mono ml-1 text-chalk">{label}</span>
        </span>
      </div>

      <div className="relative mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-6">
        <TeamColumn team={nextMatch.home} />
        <div className="flex items-center gap-6">
          <Stepper value={home} onChange={setHome} disabled={locked} gold />
          <span
            className="text-2xl font-bold text-chalk-dim/40"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            vs
          </span>
          <Stepper value={away} onChange={setAway} disabled={locked} />
        </div>
        <TeamColumn team={nextMatch.away} />
      </div>

      <div className="relative mx-auto mt-10 max-w-md">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.22em] text-chalk-dim">
          <span>Confidence Rating</span>
          <span className="text-[#c9a84c]">{confidence}%</span>
        </div>
        <div className="relative mt-3 h-2 w-full rounded-full bg-white/5">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-[#c9a84c] shadow-[0_0_18px_rgba(201,168,76,0.45)]"
            style={{ width: `${confidence}%` }}
          />
          <input
            type="range"
            min={10}
            max={100}
            value={confidence}
            disabled={locked}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label="Confidence"
          />
        </div>
        <button
          onClick={() => setLocked(true)}
          disabled={locked}
          className={[
            "mt-8 w-full rounded-2xl py-4 text-xs font-extrabold uppercase tracking-[0.28em] transition-all",
            locked
              ? "cursor-default bg-white/5 text-chalk-dim"
              : "bg-[#c9a84c] text-[#0d0d0d] hover:-translate-y-0.5 hover:bg-[#f0d78c]",
          ].join(" ")}
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          {locked ? "Locked · See you at full time" : "Lock Analysis"}
        </button>
      </div>
    </section>
  );
}

function TeamColumn({ team }: { team: { name: string; short: string; badge: string } }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-black/40 text-3xl md:h-20 md:w-20 md:text-4xl">
        {team.badge}
      </div>
      <h3
        className="mt-3 text-base font-bold tracking-tight text-chalk md:text-lg"
        style={{ fontFamily: "Sora, sans-serif" }}
      >
        {team.name}
      </h3>
      <span className="text-mono text-[10px] text-chalk-dim">{team.short}</span>
    </div>
  );
}

function Stepper({
  value,
  onChange,
  disabled,
  gold = false,
}: {
  value: number;
  onChange: (n: number) => void;
  disabled?: boolean;
  gold?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => onChange(value + 1)}
        disabled={disabled}
        className="text-chalk-dim transition-colors hover:text-[#c9a84c] disabled:opacity-30"
        aria-label="Increase"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
      <span
        className={`text-mono text-5xl font-extrabold md:text-6xl ${gold ? "text-[#f0d78c]" : "text-chalk"}`}
      >
        {value}
      </span>
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={disabled}
        className="text-chalk-dim transition-colors hover:text-[#c9a84c] disabled:opacity-30"
        aria-label="Decrease"
      >
        <ChevronDown className="h-5 w-5" />
      </button>
    </div>
  );
}

function UpcomingRail() {
  const upcoming = MATCHES.filter((m) => m.status !== "finished");
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3
          className="text-[10px] font-bold uppercase tracking-[0.22em] text-chalk-dim"
        >
          Upcoming Fixtures
        </h3>
        <Link to="/matches" className="text-[11px] font-bold uppercase tracking-widest text-[#c9a84c] hover:text-[#f0d78c]">
          View all
        </Link>
      </div>
      <div className="no-scrollbar -mx-2 flex gap-4 overflow-x-auto px-2 pb-2">
        {upcoming.map((m) => (
          <Link
            key={m.id}
            to="/matches/$id"
            params={{ id: m.id }}
            className="block min-w-[260px] rounded-2xl border border-white/5 bg-[#1a1a1a] p-5 transition-colors hover:border-[#c9a84c]/30"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-chalk-dim">
                {m.competition}
              </span>
              {m.status === "live" ? (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#c9a84c]">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#c9a84c]" />
                  {m.minute}'
                </span>
              ) : (
                <span className="h-2 w-2 rounded-full bg-white/10" />
              )}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-2xl">{m.home.badge}</span>
              <span className="text-mono text-xs font-bold text-chalk">
                {m.status === "live"
                  ? `${m.homeScore}–${m.awayScore}`
                  : `${m.home.short} v ${m.away.short}`}
              </span>
              <span className="text-2xl">{m.away.badge}</span>
            </div>
            <div className="mt-4 text-mono text-[10px] text-chalk-dim">
              {m.kickoff.toLocaleString([], {
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function AIBabaTake() {
  const take = AI_BABA_TAKES[0];
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#c9a84c]/15 bg-[#1a1a1a] p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#c9a84c]/[0.06] blur-3xl"
      />
      <div className="relative flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/10 text-[#f0d78c]">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h4 className="text-sm font-bold tracking-tight text-chalk" style={{ fontFamily: "Sora, sans-serif" }}>
            Baba's Oracle
          </h4>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c9a84c]">
            <span className="live-dot mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#c9a84c]" />
            Analysis Active
          </p>
        </div>
      </div>
      <p className="relative mt-5 border-l-2 border-[#c9a84c]/25 pl-4 text-sm italic leading-relaxed text-chalk/90">
        "{take.headline}"
      </p>
      <div className="relative mt-5 flex items-center justify-between rounded-xl border border-white/5 bg-black/30 px-4 py-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-chalk-dim">Predicted</span>
        <span className="text-mono text-2xl font-extrabold text-[#f0d78c]">
          {take.predictedHome}–{take.predictedAway}
        </span>
      </div>
      <Link
        to="/ai-baba"
        className="relative mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-chalk transition-colors hover:bg-white/[0.04]"
      >
        Get Full Intel <ArrowRight className="h-3 w-3" />
      </Link>
    </section>
  );
}

function LeaderboardPreview() {
  const board = leaderboardWithMe();
  const top = board.slice(0, 5);
  const me = board.find((e) => e.isMe)!;
  return (
    <section className="rounded-3xl border border-white/5 bg-[#1a1a1a] p-7">
      <div className="mb-5 flex items-center justify-between">
        <h4 className="text-sm font-bold tracking-tight text-chalk" style={{ fontFamily: "Sora, sans-serif" }}>
          Global Elite
        </h4>
        <Link
          to="/leaderboard"
          className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] hover:text-[#f0d78c]"
        >
          Full board
        </Link>
      </div>
      <ul className="space-y-1">
        {top.map((e, i) => (
          <Row key={e.username} e={e} highlight={i === 0} />
        ))}
      </ul>
      <div className="mt-4 border-t border-white/5 pt-4">
        <Row e={me} self />
      </div>
    </section>
  );
}

function Row({
  e,
  highlight,
  self,
}: {
  e: ReturnType<typeof leaderboardWithMe>[number];
  highlight?: boolean;
  self?: boolean;
}) {
  return (
    <li
      className={[
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
        self
          ? "border border-[#c9a84c]/30 bg-[#c9a84c]/[0.06]"
          : highlight
            ? "border border-white/5 bg-white/[0.03]"
            : "",
      ].join(" ")}
    >
      <span className={`text-mono w-7 text-xs font-bold ${highlight || self ? "text-[#c9a84c]" : "text-chalk-dim"}`}>
        {String(e.rank).padStart(2, "0")}
      </span>
      <span className="grid h-7 w-7 place-items-center rounded-full border border-white/5 bg-black/40 text-sm">
        {e.avatar}
      </span>
      <span className="min-w-0 flex-1 truncate font-semibold text-chalk">@{e.username}</span>
      <span className="text-mono text-xs font-bold text-chalk">{e.iq.toLocaleString()}</span>
      <DeltaIcon d={e.delta} />
    </li>
  );
}

function DeltaIcon({ d }: { d: number }) {
  if (d > 0) return <TrendingUp className="h-3.5 w-3.5 text-[#c9a84c]" />;
  if (d < 0) return <TrendingDown className="h-3.5 w-3.5 text-danger" />;
  return <Minus className="h-3.5 w-3.5 text-chalk-dim" />;
}
