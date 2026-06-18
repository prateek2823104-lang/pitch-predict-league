import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/coming-soon-page";

export const Route = createFileRoute("/leagues")({
  head: () => ({ meta: [{ title: "Leagues — FootballVerse AI" }] }),
  component: () => (
    <ComingSoonPage
      emoji="👥"
      title="Leagues"
      invitation="Spin up a private league for your group chat or join a public one. One invite code, in."
    />
  ),
});
