import type { ReactNode } from "react";
import { FloodlightBackground } from "./floodlight-background";
import { ScoreboardTicker } from "./scoreboard-ticker";
import { TopNavbar } from "./top-navbar";
import { AppSidebar, MobileBottomNav } from "./app-sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen text-chalk">
      <FloodlightBackground />
      <TopNavbar variant="app" />
      <ScoreboardTicker />
      <div className="flex">
        <AppSidebar />
        <main className="min-h-[calc(100vh-3.5rem-2.25rem)] flex-1 px-4 pb-24 pt-6 md:px-8 md:pb-10">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen text-chalk">
      <FloodlightBackground />
      <TopNavbar variant="marketing" />
      <ScoreboardTicker />
      <main>{children}</main>
      <footer className="glass-bar mt-20 border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="text-scoreboard text-xl">
              FootballVerse <span className="text-pitch">AI</span>
            </div>
            <p className="mt-1 text-sm text-chalk-dim">Built for football fans.</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-chalk-dim">
            <a className="hover:text-chalk" href="#features">Features</a>
            <a className="hover:text-chalk" href="/premium">Premium</a>
            <a className="hover:text-chalk" href="/login">Log in</a>
            <a className="hover:text-chalk" href="/signup">Get started</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
