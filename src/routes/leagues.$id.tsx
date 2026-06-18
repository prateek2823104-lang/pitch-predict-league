import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/coming-soon-page";

export const Route = createFileRoute("/leagues/$id")({
  head: () => ({ meta: [{ title: "League — FootballVerse AI" }] }),
  component: () => (
    <ComingSoonPage
      emoji="🛡️"
      title="League"
      invitation="Standings, league chat, invites, and analytics — your private competition lives here."
    />
  ),
});
