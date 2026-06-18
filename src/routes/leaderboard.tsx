import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/coming-soon-page";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({ meta: [{ title: "Leaderboard — FootballVerse AI" }] }),
  component: () => (
    <ComingSoonPage
      emoji="🏆"
      title="Leaderboard"
      invitation="Global, country, friends, league — pick your battlefield and start climbing."
    />
  ),
});
