import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/coming-soon-page";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — FootballVerse AI" }] }),
  component: () => (
    <ComingSoonPage
      emoji="🔔"
      title="Notifications"
      invitation="Kickoff reminders, AI Baba alerts, rank changes, league and battle invites."
    />
  ),
});
