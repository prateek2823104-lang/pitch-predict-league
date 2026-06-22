import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { mockUser } from "@/lib/mock-data";

export function TopNavbar({ variant = "app" }: { variant?: "app" | "marketing" }) {
  return (
    <header className="glass-bar sticky top-0 z-40 flex h-14 items-center gap-3 px-4 lg:px-6">
      <Link to="/" className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="grid h-8 w-8 place-items-center rounded-lg bg-[#c9a84c] text-[#0d0d0d] font-extrabold"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          FV
        </span>
        <span className="hidden text-base font-bold tracking-tight text-chalk sm:block" style={{ fontFamily: "Sora, sans-serif" }}>
          FootballVerse <span className="text-[#c9a84c]">AI</span>
        </span>
      </Link>

      {variant === "marketing" && (
        <nav className="ml-8 hidden items-center gap-6 text-sm text-chalk-dim md:flex">
          <Link to="/" className="hover:text-chalk transition-colors">Home</Link>
          <Link to="/premium" className="hover:text-chalk transition-colors">Premium</Link>
          <a href="#features" className="hover:text-chalk transition-colors">Features</a>
        </nav>
      )}

      {variant === "app" && (
        <nav className="ml-8 hidden items-center gap-5 text-sm text-chalk-dim lg:flex">
          <Link to="/matches" className="hover:text-chalk transition-colors">Matches</Link>
          <Link to="/predictions" className="hover:text-chalk transition-colors">Predictions</Link>
          <Link to="/leaderboard" className="hover:text-chalk transition-colors">Leaderboard</Link>
          <Link to="/leagues" className="hover:text-chalk transition-colors">Leagues</Link>
          <Link to="/community" className="hover:text-chalk transition-colors">Community</Link>
        </nav>
      )}

      <div className="ml-auto flex items-center gap-2">
        {variant === "app" ? (
          <>
            <button className="glass-button hidden h-9 w-9 place-items-center sm:grid" aria-label="Search">
              <Search className="h-4 w-4 text-chalk-dim" />
            </button>
            <span className="hidden h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c9a84c]" />
              <span className="text-mono text-sm text-chalk">{mockUser.coins.toLocaleString()}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c]">VRC</span>
            </span>
            <span className="hidden h-9 items-center gap-2 rounded-xl border border-[#c9a84c]/30 bg-[#c9a84c]/[0.06] px-3 md:flex">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c]">IQ</span>
              <span className="text-mono text-sm font-semibold text-chalk">{mockUser.footballIQ.toLocaleString()}</span>
            </span>
            <Link
              to="/profile/$username"
              params={{ username: mockUser.username }}
              className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#c9a84c]/30 bg-[#1a1a1a] text-base hover:border-[#c9a84c]/70 transition-colors"
              aria-label="Profile"
            >
              {mockUser.favoriteTeam?.badge ?? mockUser.avatar}
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-chalk-dim hover:text-chalk transition-colors hidden sm:block px-3"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="grid h-9 place-items-center rounded-xl bg-[#c9a84c] px-4 text-sm font-bold text-[#0d0d0d] hover:bg-[#f0d78c] transition-colors"
            >
              Start free
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
