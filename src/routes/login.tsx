import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MarketingShell } from "@/components/shells";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — FootballVerse AI" },
      { name: "description", content: "Sign in to FootballVerse AI." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <MarketingShell>
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 md:py-24">
        <div className="glass-card-lg w-full p-8">
          <h1 className="text-scoreboard text-3xl text-chalk md:text-4xl">Welcome back</h1>
          <p className="mt-1 text-sm text-chalk-dim">Pick up your streak where you left off.</p>

          <button
            onClick={() => navigate({ to: "/dashboard" })}
            className="glass-button mt-6 flex h-11 w-full items-center justify-center gap-2 text-sm font-semibold text-chalk"
          >
            <span className="text-base">🔑</span>
            Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-widest text-chalk-dim">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/dashboard" });
            }}
          >
            <Field icon={<Mail className="h-4 w-4" />} placeholder="you@email.com" value={email} onChange={setEmail} type="email" />
            <Field icon={<Lock className="h-4 w-4" />} placeholder="Password" value={password} onChange={setPassword} type="password" />
            <button
              type="submit"
              className="mt-2 h-11 w-full rounded-[14px] bg-pitch text-sm font-semibold text-stadium transition-colors hover:bg-pitch/90"
            >
              Log in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-chalk-dim">
            New here?{" "}
            <Link to="/signup" className="text-pitch hover:underline">
              Start free
            </Link>
          </p>
        </div>
      </div>
    </MarketingShell>
  );
}

export function Field({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="glass-button flex h-11 items-center gap-2 px-3">
      <span className="text-chalk-dim">{icon}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-full flex-1 bg-transparent text-sm text-chalk placeholder:text-chalk-dim/70 focus:outline-none"
      />
    </div>
  );
}
