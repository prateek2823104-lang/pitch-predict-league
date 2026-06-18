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
  Image as ImageIcon,
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
  { to: "/community", label: "Meme Feed", Icon: ImageIcon },
  { to: "/store", label: "Coin Store", Icon: Coins },
  { to: "/notifications", label: "Notifications", Icon: Bell },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="glass sticky top-[3.5rem] hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 flex-col gap-1 overflow-y-auto border-r border-white/5 p-3 md:flex">
      {items.map((item, i) => {
        const active = pathname === item.to;
        return (
          <Link
            key={`${item.to}-${i}`}
            to={item.to as any}
            className={[
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
              active
                ? "bg-pitch/15 text-chalk border border-pitch/30"
                : "text-chalk-dim hover:bg-white/5 hover:text-chalk border border-transparent",
            ].join(" ")}
          >
            <item.Icon className={`h-4 w-4 ${active ? "text-pitch" : ""}`} />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
      <Link
        to="/profile/$username"
        params={{ username: "you" }}
        className="mt-auto flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-sm text-chalk-dim transition-colors hover:bg-white/5 hover:text-chalk"
      >
        <User className="h-4 w-4" />
        Profile
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
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <item.Icon className={`h-5 w-5 ${active ? "text-pitch" : "text-chalk-dim"}`} />
            <span className={`text-[10px] ${active ? "text-pitch" : "text-chalk-dim"}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
