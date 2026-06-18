import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/coming-soon-page";

export const Route = createFileRoute("/watch-parties")({
  head: () => ({ meta: [{ title: "Watch Parties — FootballVerse AI" }] }),
  component: () => (
    <ComingSoonPage
      emoji="📺"
      title="Watch Parties"
      invitation="Join a room, watch live, react in real time. The pub vibe, in a glass panel."
    />
  ),
});
