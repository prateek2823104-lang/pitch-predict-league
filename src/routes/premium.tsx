import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/coming-soon-page";

export const Route = createFileRoute("/premium")({
  head: () => ({ meta: [{ title: "Premium — FootballVerse AI" }] }),
  component: () => (
    <ComingSoonPage
      emoji="⭐"
      title="Premium — ₹99/month"
      invitation="Advanced AI analysis, detailed analytics, unlimited leagues, ad-free. The full floodlit experience."
    />
  ),
});
