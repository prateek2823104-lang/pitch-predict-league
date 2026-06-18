import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/coming-soon-page";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Community — FootballVerse AI" }] }),
  component: () => (
    <ComingSoonPage
      emoji="💬"
      title="Fan Rooms & Meme Feed"
      invitation="Talk tactics in chat rooms. Scroll predictions, takes, and memes in the feed."
    />
  ),
});
