import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/coming-soon-page";

export const Route = createFileRoute("/matches")({
  head: () => ({ meta: [{ title: "Match Center — FootballVerse AI" }] }),
  component: () => (
    <ComingSoonPage
      emoji="📅"
      title="Match Center"
      invitation="Upcoming, live, and finished fixtures across every competition you follow — one tap to predict."
    />
  ),
});
