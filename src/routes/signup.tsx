import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MarketingShell } from "@/components/shells";
import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { Field } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — FootballVerse AI" },
      { name: "description", content: "Create your FootballVerse AI account." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const finish = () => navigate({ to: "/onboarding/favorite-team" });

  return (
    <MarketingShell>
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 md:py-24">
        <div className="glass-card-lg w-full p-8">
          <h1 className="text-scoreboard text-3xl text-chalk md:text-4xl">
            Build your <span className="text-pitch">Football IQ.</span>
          </h1>
          <p className="mt-1 text-sm text-chalk-dim">Free forever. Upgrade if you want the deep cuts.</p>

          <button
            onClick={finish}
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
              finish();
            }}
          >
            <Field icon={<User className="h-4 w-4" />} placeholder="Display name" value={name} onChange={setName} />
            <Field icon={<Mail className="h-4 w-4" />} placeholder="you@email.com" value={email} onChange={setEmail} type="email" />
            <Field icon={<Lock className="h-4 w-4" />} placeholder="Password" value={password} onChange={setPassword} type="password" />
            <button
              type="submit"
              className="mt-2 h-11 w-full rounded-[14px] bg-pitch text-sm font-semibold text-stadium transition-colors hover:bg-pitch/90"
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-chalk-dim">
            Already in?{" "}
            <Link to="/login" className="text-pitch hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </MarketingShell>
  );
}
