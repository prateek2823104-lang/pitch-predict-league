import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/coming-soon-page";

export const Route = createFileRoute("/matches/$id")({
  head: () => ({ meta: [{ title: "Match — FootballVerse AI" }] }),
  component: () => (
    <ComingSoonPage
      emoji="⚽"
      title="Match Detail"
      invitation="Head-to-head, form, AI Baba's full read, and the prediction widget all live here."
    />
  ),
});
