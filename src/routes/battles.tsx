import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/coming-soon-page";

export const Route = createFileRoute("/battles")({
  head: () => ({ meta: [{ title: "Battles — FootballVerse AI" }] }),
  component: () => (
    <ComingSoonPage
      emoji="⚔️"
      title="Match Battles"
      invitation="Challenge a friend on a single match. Head-to-head predictions, coins on the line."
    />
  ),
});
