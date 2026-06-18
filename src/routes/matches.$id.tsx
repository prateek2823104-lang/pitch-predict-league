import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/shells";
import {
  AI_BABA_TAKES,
  MATCHES,
  mockUser,
  type Match,
  type Team,
} from "@/lib/mock-data";
import {
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Users,
  Activity,
  Lock,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/matches/$id")({
  head: ({ params }) => {
    const m = MATCHES.find((x) => x.id === params.id);
    const title = m
      ? `${m.home.name} vs ${m.away.name} — FootballVerse AI`
      : "Match — FootballVerse AI";
    const desc = m
      ? `${m.competition}. Predict the score, read AI Baba's take, climb the leaderboard.`
      : "Match detail on FootballVerse AI.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  loader: ({ params }) => {
    const match = MATCHES.find((m) => m.id === params.id);
    if (!match) throw notFound();
    return { match };
  },
  notFoundComponent: NotFoundView,
  errorComponent: ({ reset }) => (
    <AppShell>
      <div className="glass-card-lg mx-auto max-w-xl p-10 text-center">
        <h2 className="text-scoreboard text-2xl text-chalk">Something went sideways</h2>
        <p className="mt-2 text-sm text-chalk-dim">We couldn't load this match. Give it another shot.</p>
        <button
          onClick={() => reset()}
          className="mt-6 h-11 rounded-[14px] bg-pitch px-5 text-sm font-semibold text-stadium hover:bg-pitch/90"
        >
          Try again
        </button>
      </div>
    </AppShell>
  ),
  component: MatchDetailPage,
});

function NotFoundView() {
  return (
    <AppShell>
      <div className="glass-card-lg mx-auto max-w-xl p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-pitch/15 text-2xl">
          ⚽
        </div>
        <h2 className="text-scoreboard mt-4 text-2xl text-chalk">No fixture here</h2>
        <p className="mt-2 text-sm text-chalk-dim">
          This match might have been rescheduled or removed. Head back to the Match Center to find another one.
        </p>
        <Link
          to="/matches"
          className="mt-6 inline-flex h-11 items-center rounded-[14px] bg-pitch px-5 text-sm font-semibold text-stadium hover:bg-pitch/90"
        >
          Back to Match Center
        </Link>
      </div>
    </AppShell>
  );
}

function MatchDetailPage() {
  const { match } = Route.useLoaderData();
  const take = AI_BABA_TAKES.find((t) => t.matchId === match.id);

  return (
    <AppShell>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mx-auto max-w-6xl space-y-6"
      >
        <Link
          to="/matches"
          className="inline-flex items-center gap-1.5 text-xs text-chalk-dim hover:text-pitch"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Match Center
        </Link>

        <Scoreboard match={match} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {match.status !== "finished" ? (
              <PredictionPanel match={match} />
            ) : (
              <RecapPanel match={match} />
            )}
            <HeadToHead match={match} />
            <FormGuide match={match} />
          </div>
          <div className="space-y-6">
            {take ? <AIBabaPanel take={take} match={match} /> : <AIBabaPlaceholder />}
            <PredictionSplit match={match} />
            <StatsPanel match={match} />
          </div>
        </div>
      </motion.div>
    </AppShell>
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
  return { h, m, s, expired: diff === 0 };
}

function Scoreboard({ match }: { match: Match }) {
  const { h, m, s } = useCountdown(match.kickoff);
  const isLive = match.status === "live";
  const isFinished = match.status === "finished";

  return (
    <div className="glass-card-lg relative overflow-hidden p-6 md:p-10">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-pitch/15 blur-3xl" />
      </div>

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-chalk-dim">
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
            {match.competition}
          </span>
          <span className="text-mono">
            {match.kickoff.toLocaleDateString([], {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        {isLive && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-pitch/15 px-3 py-1 text-xs font-semibold text-pitch">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-pitch" />
            LIVE · {match.minute}'
          </span>
        )}
        {isFinished && (
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-chalk-dim">
            FULL TIME
          </span>
        )}
        {match.status === "upcoming" && (
          <span className="text-mono inline-flex items-center gap-1.5 rounded-full border border-pitch/30 bg-pitch/10 px-3 py-1 text-xs text-pitch">
            <Clock className="h-3 w-3" />
            {h.toString().padStart(2, "0")}:{m.toString().padStart(2, "0")}:
            {s.toString().padStart(2, "0")}
          </span>
        )}
      </div>

      <div className="relative mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-6">
        <TeamPillar team={match.home} />
        <div className="text-center">
          {match.status === "upcoming" ? (
            <div className="text-scoreboard text-2xl text-chalk-dim md:text-3xl">VS</div>
          ) : (
            <div className="text-scoreboard text-5xl text-chalk md:text-7xl">
              {match.homeScore}
              <span className="mx-3 text-chalk-dim">–</span>
              {match.awayScore}
            </div>
          )}
          <div className="text-mono mt-2 text-[11px] text-chalk-dim">
            {match.kickoff.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
        <TeamPillar team={match.away} align="right" />
      </div>
    </div>
  );
}

function TeamPillar({ team, align = "left" }: { team: Team; align?: "left" | "right" }) {
  const right = align === "right";
  return (
    <div
      className={`flex flex-col items-center gap-3 ${
        right ? "md:items-end" : "md:items-start"
      }`}
    >
      <div className="grid h-20 w-20 place-items-center rounded-3xl border border-white/10 bg-white/5 text-5xl md:h-24 md:w-24">
        {team.badge}
      </div>
      <div className={`text-center ${right ? "md:text-right" : "md:text-left"}`}>
        <div className="text-scoreboard text-2xl text-chalk md:text-3xl">{team.short}</div>
        <div className="text-xs text-chalk-dim">{team.name}</div>
      </div>
    </div>
  );
}

function PredictionPanel({ match }: { match: Match }) {
  const [home, setHome] = useState(2);
  const [away, setAway] = useState(1);
  const [confidence, setConfidence] = useState(70);
  const [locked, setLocked] = useState(false);
  const live = match.status === "live";

  return (
    <section className="glass-card p-6 md:p-7">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-chalk-dim">
            {live ? "Live prediction" : "Your prediction"}
          </div>
          <h2 className="text-scoreboard mt-1 text-xl text-chalk">
            Call the {live ? "next goal" : "final score"}
          </h2>
        </div>
        <span className="text-mono rounded-lg bg-pitch/10 px-2 py-1 text-[10px] uppercase tracking-widest text-pitch">
          +{Math.round((confidence / 100) * 80)} IQ at stake
        </span>
      </div>

      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <PredictTeam team={match.home} align="left" />
        <div className="flex items-center gap-3">
          <Stepper value={home} onChange={setHome} disabled={locked} />
          <span className="text-mono text-2xl text-chalk-dim">–</span>
          <Stepper value={away} onChange={setAway} disabled={locked} />
        </div>
        <PredictTeam team={match.away} align="right" />
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
        <div className="mt-1 flex justify-between text-[10px] text-chalk-dim/70">
          <span>Coin flip</span>
          <span>Sure thing</span>
        </div>
      </div>

      <button
        onClick={() => setLocked(true)}
        disabled={locked}
        className={[
          "mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-[14px] text-sm font-semibold transition-colors",
          locked
            ? "bg-white/5 text-chalk-dim"
            : "bg-pitch text-stadium hover:bg-pitch/90",
        ].join(" ")}
      >
        {locked ? (
          <>
            <Lock className="h-4 w-4" /> Locked in — see you at full time
          </>
        ) : (
          <>Lock in {home}–{away}</>
        )}
      </button>

      {!locked && (
        <p className="mt-3 text-center text-[11px] text-chalk-dim">
          Logged in as <span className="text-chalk">@{mockUser.username}</span> · prediction earns you Football IQ if it lands.
        </p>
      )}
    </section>
  );
}

function PredictTeam({ team, align }: { team: Team; align: "left" | "right" }) {
  const right = align === "right";
  return (
    <div className={`flex items-center gap-3 ${right ? "flex-row-reverse" : ""}`}>
      <span className="text-4xl">{team.badge}</span>
      <div className={right ? "text-right" : ""}>
        <div className="text-scoreboard text-xl text-chalk">{team.short}</div>
        <div className="text-[11px] text-chalk-dim">{team.name}</div>
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
        aria-label="Increase"
        className="grid h-6 w-10 place-items-center rounded-md border border-white/10 text-chalk-dim hover:border-pitch/40 hover:text-pitch disabled:opacity-30"
      >
        +
      </button>
      <div className="text-scoreboard my-1 w-14 text-center text-5xl text-chalk">{value}</div>
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={disabled}
        aria-label="Decrease"
        className="grid h-6 w-10 place-items-center rounded-md border border-white/10 text-chalk-dim hover:border-pitch/40 hover:text-pitch disabled:opacity-30"
      >
        –
      </button>
    </div>
  );
}

function RecapPanel({ match }: { match: Match }) {
  const winner =
    (match.homeScore ?? 0) > (match.awayScore ?? 0)
      ? match.home
      : (match.awayScore ?? 0) > (match.homeScore ?? 0)
        ? match.away
        : null;
  return (
    <section className="glass-card p-6 md:p-7">
      <div className="text-xs uppercase tracking-widest text-chalk-dim">Final whistle</div>
      <h2 className="text-scoreboard mt-1 text-xl text-chalk">
        {winner ? `${winner.name} take it` : "Honours even"}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-chalk-dim">
        {winner
          ? `${winner.name} edged a ${match.homeScore}–${match.awayScore} result against ${winner.id === match.home.id ? match.away.name : match.home.name}. Predictors who called the winner banked Football IQ — exact scoreline calls cleaned up.`
          : `A ${match.homeScore}–${match.awayScore} draw splits the points and the prediction pool. Players who called the exact score walked away with the full reward.`}
      </p>
      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <Stat label="Possession" value="58% – 42%" />
        <Stat label="Shots" value="14 – 9" />
        <Stat label="xG" value="2.1 – 1.4" />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-mono text-sm text-chalk">{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-widest text-chalk-dim">{label}</div>
    </div>
  );
}

function HeadToHead({ match }: { match: Match }) {
  // Deterministic mock H2H based on team ids
  const rows = useMemo(
    () => [
      { date: "Mar 2024", comp: match.competition, home: match.home, away: match.away, h: 2, a: 2 },
      { date: "Nov 2023", comp: "Friendly", home: match.away, away: match.home, h: 1, a: 3 },
      { date: "Jun 2023", comp: match.competition, home: match.home, away: match.away, h: 0, a: 1 },
      { date: "Oct 2022", comp: "Cup", home: match.away, away: match.home, h: 2, a: 2 },
      { date: "Feb 2022", comp: match.competition, home: match.home, away: match.away, h: 3, a: 0 },
    ],
    [match],
  );

  const homeWins = rows.filter((r) =>
    r.home.id === match.home.id ? r.h > r.a : r.a > r.h,
  ).length;
  const awayWins = rows.filter((r) =>
    r.home.id === match.away.id ? r.h > r.a : r.a > r.h,
  ).length;
  const draws = rows.length - homeWins - awayWins;

  return (
    <section className="glass-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <Users className="h-4 w-4 text-pitch" />
        <h3 className="text-scoreboard text-lg text-chalk">Head to head</h3>
      </div>

      <div className="mb-4 flex h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="bg-pitch"
          style={{ width: `${(homeWins / rows.length) * 100}%` }}
          title={`${match.home.short} wins`}
        />
        <div
          className="bg-chalk-dim/40"
          style={{ width: `${(draws / rows.length) * 100}%` }}
          title="Draws"
        />
        <div
          className="bg-floodlight"
          style={{ width: `${(awayWins / rows.length) * 100}%` }}
          title={`${match.away.short} wins`}
        />
      </div>
      <div className="mb-4 grid grid-cols-3 text-center text-xs text-chalk-dim">
        <div>
          <div className="text-mono text-lg text-pitch">{homeWins}</div>
          {match.home.short} wins
        </div>
        <div>
          <div className="text-mono text-lg text-chalk">{draws}</div>
          Draws
        </div>
        <div>
          <div className="text-mono text-lg text-floodlight">{awayWins}</div>
          {match.away.short} wins
        </div>
      </div>

      <ul className="divide-y divide-white/5 text-sm">
        {rows.map((r, i) => (
          <li
            key={i}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-2.5"
          >
            <span className="text-mono w-20 text-[11px] text-chalk-dim">{r.date}</span>
            <span className="flex items-center justify-center gap-2 text-chalk">
              <span>{r.home.badge}</span>
              <span className="text-mono text-base">
                {r.h} – {r.a}
              </span>
              <span>{r.away.badge}</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-chalk-dim">{r.comp}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

const FORM_HOME = ["W", "W", "D", "W", "L"] as const;
const FORM_AWAY = ["L", "W", "W", "D", "W"] as const;

function FormGuide({ match }: { match: Match }) {
  return (
    <section className="glass-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-pitch" />
        <h3 className="text-scoreboard text-lg text-chalk">Last 5</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FormRow team={match.home} form={FORM_HOME} />
        <FormRow team={match.away} form={FORM_AWAY} />
      </div>
    </section>
  );
}

function FormRow({ team, form }: { team: Team; form: readonly ("W" | "D" | "L")[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{team.badge}</span>
        <span className="text-scoreboard text-base text-chalk">{team.short}</span>
        <span className="ml-auto text-[10px] uppercase tracking-widest text-chalk-dim">
          most recent →
        </span>
      </div>
      <div className="mt-3 flex gap-1.5">
        {form.map((r, i) => (
          <span
            key={i}
            className={[
              "grid h-7 w-7 place-items-center rounded-md text-mono text-xs font-bold",
              r === "W" && "bg-pitch/20 text-pitch",
              r === "D" && "bg-chalk-dim/20 text-chalk",
              r === "L" && "bg-danger/20 text-danger",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}

function AIBabaPanel({
  take,
  match,
}: {
  take: (typeof AI_BABA_TAKES)[number];
  match: Match;
}) {
  return (
    <section className="glass-card p-6 ring-1 ring-floodlight/30">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-floodlight/15 text-floodlight">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <div className="text-xs uppercase tracking-widest text-floodlight">AI Baba's read</div>
          <div className="text-[10px] text-chalk-dim">
            {match.home.short} vs {match.away.short}
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium leading-snug text-chalk">"{take.headline}"</p>
      <p className="mt-3 text-xs leading-relaxed text-chalk-dim">{take.body}</p>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-floodlight/20 bg-floodlight/5 px-4 py-3">
        <span className="text-xs uppercase tracking-widest text-floodlight">Predicted</span>
        <span className="text-mono text-2xl font-bold text-chalk">
          {take.predictedHome}–{take.predictedAway}
        </span>
      </div>
      <Link
        to="/ai-baba"
        className="mt-4 inline-flex items-center gap-1 text-xs text-floodlight hover:underline"
      >
        Read more takes →
      </Link>
    </section>
  );
}

function AIBabaPlaceholder() {
  return (
    <section className="glass-card p-6 ring-1 ring-floodlight/20">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-floodlight/15 text-floodlight">
          <Sparkles className="h-4 w-4" />
        </span>
        <div className="text-xs uppercase tracking-widest text-floodlight">AI Baba</div>
      </div>
      <p className="mt-4 text-sm text-chalk-dim">
        Baba's still chewing on this one. Lock your prediction first, then check back for the full take.
      </p>
    </section>
  );
}

function PredictionSplit({ match }: { match: Match }) {
  // Deterministic mock crowd split from team ids
  const seed = (match.home.id.charCodeAt(0) + match.away.id.charCodeAt(0)) % 30;
  const homePct = 40 + seed;
  const drawPct = Math.max(10, 30 - Math.floor(seed / 2));
  const awayPct = Math.max(5, 100 - homePct - drawPct);

  return (
    <section className="glass-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <Users className="h-4 w-4 text-pitch" />
        <h3 className="text-scoreboard text-base text-chalk">Crowd is calling</h3>
      </div>
      <SplitBar label={match.home.short} pct={homePct} color="bg-pitch" />
      <SplitBar label="Draw" pct={drawPct} color="bg-chalk-dim/60" />
      <SplitBar label={match.away.short} pct={awayPct} color="bg-floodlight" />
      <p className="mt-3 text-[11px] text-chalk-dim">
        Based on locked-in predictions across FootballVerse.
      </p>
    </section>
  );
}

function SplitBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="mb-2 last:mb-0">
      <div className="mb-1 flex justify-between text-[11px]">
        <span className="text-chalk-dim">{label}</span>
        <span className="text-mono text-chalk">{pct}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function StatsPanel({ match }: { match: Match }) {
  return (
    <section className="glass-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-4 w-4 text-pitch" />
        <h3 className="text-scoreboard text-base text-chalk">Season form</h3>
      </div>
      <ul className="space-y-3 text-sm">
        <StatRow label="Goals scored / game" home="2.1" away="1.7" />
        <StatRow label="Goals conceded / game" home="0.9" away="1.3" />
        <StatRow label="Clean sheets (last 10)" home="5" away="3" />
        <StatRow label="Win rate" home="68%" away="52%" />
      </ul>
      <p className="mt-4 text-[11px] text-chalk-dim">
        {match.home.short} edges most categories — but football, as ever, doesn't care about averages.
      </p>
    </section>
  );
}

function StatRow({ label, home, away }: { label: string; home: string; away: string }) {
  return (
    <li className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
      <span className="text-mono text-sm text-pitch">{home}</span>
      <span className="text-[11px] uppercase tracking-widest text-chalk-dim">{label}</span>
      <span className="text-mono text-sm text-floodlight">{away}</span>
    </li>
  );
}
