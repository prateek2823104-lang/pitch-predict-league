import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/coming-soon-page";

export const Route = createFileRoute("/ai-baba")({
  head: () => ({ meta: [{ title: "AI Baba — FootballVerse AI" }] }),
  component: () => (
    <ComingSoonPage
      emoji="✨"
      title="AI Baba"
      invitation="Your floodlit oracle, with a confident take and a scoreline on every upcoming match."
    />
  ),
});
