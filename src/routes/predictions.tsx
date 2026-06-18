import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/coming-soon-page";

export const Route = createFileRoute("/predictions")({
  head: () => ({ meta: [{ title: "Predictions — FootballVerse AI" }] }),
  component: () => (
    <ComingSoonPage
      emoji="🎯"
      title="My Predictions"
      invitation="Every call you've made, the result, and how it moved your Football IQ — all in one place."
    />
  ),
});
