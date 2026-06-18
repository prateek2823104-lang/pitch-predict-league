import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/shells";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Users, Swords, Tv, Brain, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FootballVerse AI — Predict. Compete. Beat AI." },
      {
        name: "description",
        content:
          "Predict match scores, build your Football IQ, climb leaderboards, and battle friends. Featuring AI Baba, your personal football oracle.",
      },
      { property: "og:title", content: "FootballVerse AI — Predict. Compete. Beat AI." },
      { property: "og:description", content: "Football predictions, leagues, battles, and AI Baba." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <MarketingShell>
      <Hero />
      <Features />
      <HowItWorks />
      <SocialProof />
      <PricingTeaser />
    </MarketingShell>
  );
}

function Hero() {
  return (
    <section className="relative px-4 pb-16 pt-12 md:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-pitch/30 bg-pitch/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-pitch">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-pitch" />
            Kickoff in 1h 35m
          </span>
          <h1 className="text-scoreboard mt-5 text-5xl text-chalk sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Predict.
            <br />
            Compete.
            <br />
            <span className="text-pitch">Beat AI.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-chalk-dim">
            Call the score. Climb the leaderboard. Outsmart AI Baba — your floodlit
            football oracle who's been waiting for kickoff.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/signup"
              className="inline-flex h-12 items-center gap-2 rounded-[14px] bg-pitch px-6 text-sm font-semibold text-stadium transition-colors hover:bg-pitch/90"
            >
              Start Predicting Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className="glass-button inline-flex h-12 items-center px-5 text-sm font-semibold text-chalk"
            >
              See how it works
            </a>
          </div>
        </motion.div>

        <MockPredictionCard />
      </div>
    </section>
  );
}

function MockPredictionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.6 }}
      className="glass-card-lg relative mx-auto w-full max-w-md p-6"
    >
      <div className="flex items-center justify-between text-xs text-chalk-dim">
        <span className="rounded-full bg-white/5 px-2.5 py-1 uppercase tracking-widest">
          Copa America
        </span>
        <span className="text-mono text-pitch">1h 35m</span>
      </div>

      <div className="mt-6 grid grid-cols-3 items-center gap-3">
        <div className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-sky-500/15 text-3xl">
            🇦🇷
          </div>
          <div className="text-scoreboard mt-3 text-lg text-chalk">ARG</div>
        </div>
        <div className="text-center text-chalk-dim">
          <div className="text-xs uppercase tracking-widest">Your call</div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse", repeatDelay: 1.2 }}
            className="text-mono mt-1 flex items-center justify-center gap-1 text-3xl font-bold text-chalk"
          >
            <span className="text-pitch">2</span>
            <span className="text-chalk-dim">–</span>
            <span>1</span>
          </motion.div>
        </div>
        <div className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-yellow-500/15 text-3xl">
            🇧🇷
          </div>
          <div className="text-scoreboard mt-3 text-lg text-chalk">BRA</div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-chalk-dim">
          <span>Confidence</span>
          <span className="text-mono text-chalk">78%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-pitch to-floodlight"
          />
        </div>
      </div>

      <button className="mt-6 h-11 w-full rounded-[14px] bg-pitch text-sm font-semibold text-stadium transition-colors hover:bg-pitch/90">
        Lock in prediction
      </button>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-floodlight/30 bg-floodlight/5 p-3 text-xs text-chalk-dim">
        <Sparkles className="h-3.5 w-3.5 shrink-0 text-floodlight" />
        <span>
          <span className="text-floodlight">AI Baba</span> agrees — calls it 2–1 Argentina.
        </span>
      </div>
    </motion.div>
  );
}

const features = [
  {
    Icon: Sparkles,
    title: "AI Baba",
    body: "A characterful oracle who reads every fixture and tells you who's winning — and why — in a voice that sounds like your loudest, smartest football mate.",
    accent: "text-floodlight",
  },
  {
    Icon: Brain,
    title: "Football IQ",
    body: "Every correct call sharpens your rating. Climb from Rookie to Legend as your read on the game gets sharper week by week.",
    accent: "text-pitch",
  },
  {
    Icon: Users,
    title: "Leagues",
    body: "Spin up a private league for your group chat, your office, or your campus. Public leagues for the whole world. One invite code, in.",
    accent: "text-var-blue",
  },
  {
    Icon: Swords,
    title: "Battles",
    body: "Challenge a friend on a single match. Head-to-head predictions, instant winner once full-time hits. Coins on the line.",
    accent: "text-danger",
  },
  {
    Icon: Tv,
    title: "Watch Parties",
    body: "Watch live matches together in rooms with chat, polls, and quick-reactions. The pub atmosphere, minus the queue at the bar.",
    accent: "text-floodlight",
  },
];

function Features() {
  return (
    <section id="features" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-scoreboard text-3xl text-chalk md:text-5xl">
          The stadium, <span className="text-pitch">in your pocket.</span>
        </h2>
        <p className="mt-3 max-w-xl text-chalk-dim">
          Five things you can do tonight, without learning a new vocabulary.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="glass-card glass-card-hover p-6">
              <div className={`grid h-11 w-11 place-items-center rounded-xl bg-white/5 ${f.accent}`}>
                <f.Icon className="h-5 w-5" />
              </div>
              <h3 className="text-scoreboard mt-4 text-xl text-chalk">{f.title}</h3>
              <p className="mt-2 text-sm text-chalk-dim">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Predict", b: "Call the scoreline on any upcoming match. Add a confidence level." },
    { n: "02", t: "Earn Football IQ", b: "Correct calls and bold confidence climb your rating." },
    { n: "03", t: "Climb the leaderboard", b: "Global, country, league, and friends — choose your battlefield." },
  ];
  return (
    <section id="how-it-works" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-scoreboard text-3xl text-chalk md:text-5xl">How it works</h2>
        <div className="relative mt-10">
          <div className="absolute left-6 top-8 hidden h-[2px] w-[calc(100%-3rem)] bg-gradient-to-r from-pitch via-floodlight to-var-blue opacity-40 md:block" />
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="glass-card p-6">
                <div className="text-mono text-xs text-pitch">{s.n}</div>
                <h3 className="text-scoreboard mt-2 text-2xl text-chalk">{s.t}</h3>
                <p className="mt-2 text-sm text-chalk-dim">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="glass-card flex flex-wrap items-center justify-around gap-y-4 p-6 text-center">
          <Stat n="12,438" l="active predictors" />
          <span className="hidden h-10 w-px bg-white/10 md:block" />
          <Stat n="842" l="leagues created" />
          <span className="hidden h-10 w-px bg-white/10 md:block" />
          <Stat n="3,201" l="predictions today" />
          <span className="hidden h-10 w-px bg-white/10 md:block" />
          <Stat n="98%" l="of users beat AI Baba once" />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="px-4">
      <div className="text-mono text-2xl font-bold text-pitch md:text-3xl">{n}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-chalk-dim">{l}</div>
    </div>
  );
}

function PricingTeaser() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="glass-card-lg p-8 text-center md:p-12">
          <div className="text-xs uppercase tracking-widest text-floodlight">Premium</div>
          <h2 className="text-scoreboard mt-3 text-3xl text-chalk md:text-5xl">
            Go deeper. <span className="text-pitch">₹99/mo</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-chalk-dim">
            Advanced AI analysis, detailed analytics, unlimited leagues, ad-free. The
            full floodlit experience.
          </p>
          <Link
            to="/premium"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-[14px] bg-pitch px-6 text-sm font-semibold text-stadium transition-colors hover:bg-pitch/90"
          >
            See what's inside <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
