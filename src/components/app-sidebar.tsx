import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  Target,
  Trophy,
  Users,
  Swords,
  Tv,
  MessageCircle,
  Coins,
  Bell,
  User,
} from "lucide-react";
import type { ComponentType } from "react";

type NavItem = {
  to: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  params?: Record<string, string>;
};

const items: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/matches", label: "Match Center", Icon: Calendar },
  { to: "/ai-baba", label: "AI Baba", Icon: Sparkles },
  { to: "/predictions", label: "Predictions", Icon: Target },
  { to: "/leaderboard", label: "Leaderboard", Icon: Trophy },
  { to: "/leagues", label: "Leagues", Icon: Users },
  { to: "/battles", label: "Battles", Icon: Swords },
  { to: "/watch-parties", label: "Watch Parties", Icon: Tv },
  { to: "/community", label: "Fan Rooms", Icon: MessageCircle },
  { to: "/store", label: "Coin Store", Icon: Coins },
  { to: "/notifications", label: "Notifications", Icon: Bell },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="sticky top-[3.5rem] hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 flex-col gap-0.5 overflow-y-auto border-r border-white/5 bg-[#0d0d0d]/60 px-3 py-4 md:flex">
      <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-chalk-dim">
        Command
      </div>
      {items.map((item, i) => {
        const active = pathname === item.to;
        return (
          <Link
            key={`${item.to}-${i}`}
            to={item.to as any}
            className={[
              "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
              active
                ? "bg-white/[0.04] text-chalk"
                : "text-chalk-dim hover:bg-white/[0.03] hover:text-chalk",
            ].join(" ")}
          >
            {active && (
              <span
                aria-hidden
                className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-full bg-[#c9a84c] shadow-[0_0_10px_rgba(201,168,76,0.6)]"
              />
            )}
            <item.Icon className={`h-[18px] w-[18px] ${active ? "text-[#c9a84c]" : ""}`} />
            <span className="truncate font-medium">{item.label}</span>
          </Link>
        );
      })}
      <Link
        to="/profile/$username"
        params={{ username: "you" }}
        className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-chalk-dim transition-colors hover:bg-white/[0.03] hover:text-chalk"
      >
        <User className="h-[18px] w-[18px]" />
        <span className="font-medium">Profile</span>
      </Link>
    </aside>
  );
}

const bottomItems: NavItem[] = [
  { to: "/dashboard", label: "Home", Icon: LayoutDashboard },
  { to: "/matches", label: "Matches", Icon: Calendar },
  { to: "/predictions", label: "Predict", Icon: Target },
  { to: "/community", label: "Chat", Icon: MessageCircle },
  { to: "/profile/$username", label: "Profile", Icon: User, params: { username: "you" } },
];

export function MobileBottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="glass-bar fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-around md:hidden">
      {bottomItems.map((item) => {
        const active = pathname === item.to || pathname.startsWith(item.to + "/");
        return (
          <Link
            key={item.label}
            to={item.to as any}
            params={item.params as any}
            className="flex flex-col items-center gap-1 px-3 py-1"
          >
            <item.Icon className={`h-5 w-5 ${active ? "text-[#c9a84c]" : "text-chalk-dim"}`} />
            <span className={`text-[10px] font-medium ${active ? "text-[#c9a84c]" : "text-chalk-dim"}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
