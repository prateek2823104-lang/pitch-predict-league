import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/coming-soon-page";

export const Route = createFileRoute("/store")({
  head: () => ({ meta: [{ title: "Coin Store — FootballVerse AI" }] }),
  component: () => (
    <ComingSoonPage
      emoji="🪙"
      title="Coin Store"
      invitation="AI Insights unlocks, avatar packs, badges, team-themed skins — spend your coins here."
    />
  ),
});
