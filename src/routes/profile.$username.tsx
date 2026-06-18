import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/coming-soon-page";

export const Route = createFileRoute("/profile/$username")({
  head: () => ({ meta: [{ title: "Profile — FootballVerse AI" }] }),
  component: () => (
    <ComingSoonPage
      emoji="👤"
      title="Profile"
      invitation="Your Football IQ, streak, badge collection, and recent calls — your fan résumé."
    />
  ),
});
