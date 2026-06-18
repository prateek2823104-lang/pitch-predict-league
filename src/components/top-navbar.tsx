import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { mockUser } from "@/lib/mock-data";

export function TopNavbar({ variant = "app" }: { variant?: "app" | "marketing" }) {
  return (
    <header className="glass-bar sticky top-0 z-40 flex h-14 items-center gap-3 px-4 lg:px-6">
      <Link to="/" className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-pitch/20 text-base">⚽</span>
        <span className="text-scoreboard text-lg text-chalk hidden sm:block">
          FootballVerse <span className="text-pitch">AI</span>
        </span>
      </Link>

      {variant === "marketing" && (
        <nav className="ml-6 hidden items-center gap-5 text-sm text-chalk-dim md:flex">
          <Link to="/" className="hover:text-chalk transition-colors">Home</Link>
          <Link to="/premium" className="hover:text-chalk transition-colors">Premium</Link>
          <a href="#features" className="hover:text-chalk transition-colors">Features</a>
        </nav>
      )}

      {variant === "app" && (
        <nav className="ml-6 hidden items-center gap-4 text-sm text-chalk-dim lg:flex">
          <Link to="/matches" className="hover:text-chalk transition-colors">Matches</Link>
          <Link to="/predictions" className="hover:text-chalk transition-colors">Predictions</Link>
          <Link to="/leaderboard" className="hover:text-chalk transition-colors">Leaderboard</Link>
          <Link to="/leagues" className="hover:text-chalk transition-colors">Leagues</Link>
          <Link to="/battles" className="hover:text-chalk transition-colors">Battles</Link>
          <Link to="/community" className="hover:text-chalk transition-colors">Community</Link>
        </nav>
      )}

      <div className="ml-auto flex items-center gap-2">
        {variant === "app" ? (
          <>
            <button className="glass-button hidden h-9 w-9 place-items-center sm:grid" aria-label="Search">
              <Search className="h-4 w-4 text-chalk-dim" />
            </button>
            <span className="glass-button hidden h-9 items-center gap-1.5 px-3 sm:flex">
              <span className="text-xs text-floodlight">🪙</span>
              <span className="text-mono text-sm text-chalk">{mockUser.coins}</span>
            </span>
            <span className="hidden h-9 items-center gap-1.5 rounded-[14px] border border-pitch/30 bg-pitch/10 px-3 md:flex">
              <span className="text-[10px] uppercase tracking-widest text-pitch">IQ</span>
              <span className="text-mono text-sm font-semibold text-chalk">{mockUser.footballIQ}</span>
            </span>
            <Link
              to="/profile/$username"
              params={{ username: mockUser.username }}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-stadium-soft text-base hover:border-pitch/40 transition-colors"
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
              className="glass-button h-9 px-4 grid place-items-center text-sm font-semibold text-chalk"
            >
              Start free
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
