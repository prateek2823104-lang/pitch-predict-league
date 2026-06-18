# FootballVerse AI — Phase 1 Build Plan

Establish the floodlit-stadium design language on two fully polished pages (Landing + Dashboard), wire all 16 routes with "coming soon" glass stubs so navigation works end-to-end, and seed mock match/leaderboard data. Backend (Lovable Cloud) and AI Baba LLM hookup come in later phases.

## Phase 1 deliverables

### 1. Design system foundation
- Install fonts via `@fontsource`: Bebas Neue (scoreboard display), Inter (body), JetBrains Mono (data/stats).
- Define color tokens in `src/styles.css` under `@theme` using oklch equivalents of the brief's hex values: `--color-bg-stadium`, `--color-bg-stadium-soft`, `--color-pitch-green`, `--color-floodlight-gold`, `--color-var-blue`, `--color-chalk-white`, `--color-chalk-dim`, `--color-danger-red`. Map shadcn semantic tokens (`--background`, `--foreground`, `--primary`, `--card`, `--border`, `--ring`) onto them so all shadcn components inherit the stadium palette automatically.
- Add custom utilities: `glass-card` (rgba white 5% + 20px blur + 1px white-10% border + 20px radius + green-tinted outer glow), `glass-card-lg` (28px radius for hero), `glass-button` (14px radius). Hover variant brightens border to pitch-green 35%.
- `FloodlightBackground` component: fixed full-viewport layer with 2–3 large soft radial gradient blobs (pitch-green + var-blue at ~12% opacity) that drift slowly via CSS keyframes. Respects `prefers-reduced-motion`.
- Motion primitives via Framer Motion: page fade+8px slide (250ms), card hover lift 2px, score count-up component with single pitch-green flash.

### 2. Global shell
- `AppShell` layout used by all authenticated routes:
  - Fixed glass top navbar: logo "⚽ FootballVerse AI", primary nav links, search icon, coin pill (mono font), Football IQ badge, avatar menu.
  - **ScoreboardTicker** strip under navbar — thin glass bar, continuously scrolling marquee of mock live scores + AI Baba one-liners + rank changes, mono font with pitch-green digits. Pauses on hover. This is the signature motif.
  - Collapsible left sidebar (desktop/tablet): Dashboard, Match Center, AI Baba, Predictions, Leaderboard, Leagues, Battles, Watch Parties, Fan Rooms, Meme Feed, Coin Store, Notifications, Profile. Uses shadcn Sidebar.
  - Mobile bottom tab bar (<768px): Home, Matches, Predict, Community, Profile.
- `MarketingShell` layout for `/`, `/login`, `/signup`, `/premium`: navbar + ticker + footer, no sidebar.
- Pitch-green focus ring globally; visible on every interactive element.

### 3. Routes (TanStack Start, file-based)
All routes created under `src/routes/` so navigation works and links don't 404:

**Fully built in Phase 1:**
- `index.tsx` (`/`) — Landing page (see §4).
- `dashboard.tsx` (`/dashboard`) — Authenticated home (see §5).
- `login.tsx`, `signup.tsx` — Centered glass auth cards with Google + email/password forms (UI only, no auth wired yet). Signup submit advances to `/onboarding/favorite-team` rather than directly to the dashboard.
- `onboarding.favorite-team.tsx` (`/onboarding/favorite-team`) — Post-signup step: glass panel with a grid of ~24 club + national team badges (Lucide/emoji placeholders, named), search/filter input on top, selected card outlined in pitch-green. "Continue" CTA writes the selection into the mock user object in `src/lib/mock-data.ts` (via a tiny in-memory store / zustand-style module) and navigates to `/dashboard`, where it's already surfaced in the avatar menu and profile previews. UI-only — no persistence.

**Stub pages (glass "Coming soon" panel with route-specific headline, ticker still live, sidebar nav functional):**
`matches`, `matches.$id`, `ai-baba`, `predictions`, `leaderboard`, `leagues`, `leagues.$id`, `battles`, `watch-parties`, `community`, `store`, `premium`, `profile.$username`, `notifications`.

Each stub uses a shared `ComingSoonPage` component that takes title + one-line invitation copy, so they still feel on-brand rather than empty.

### 4. Landing page (`/`)
- Hero: Bebas Neue scoreboard headline "PREDICT. COMPETE. BEAT AI." with subhead, animated mock match card mid-prediction (Argentina vs Brazil with score steppers and confidence slider visibly animating), primary CTA "Start Predicting Free" → `/signup`, secondary "See how it works".
- Floodlight blobs drifting behind hero.
- Feature showcase grid (5 glass cards): AI Baba, Football IQ, Leagues, Battles, Watch Parties — each with icon, plain-spoken one-paragraph description of what the user can do.
- "How It Works" 3-step strip: Predict → Earn Football IQ → Climb the Leaderboard. Glass strip with numbered nodes connected by a pitch-green line.
- Social proof strip: "12,438 predictors • 842 leagues • 3,201 predictions today" in mono font (placeholder stats).
- Pricing teaser card linking to `/premium`.
- Footer: product links, social, "Built for football fans" tagline.

### 5. Dashboard (`/dashboard`)
- Top KPI row (3 glass cards):
  - **Football IQ**: large Bebas Neue number (e.g. 1,247) + tier label (Rookie/Analyst/Expert/Elite/Legend) + week delta in pitch-green.
  - **Streak**: flame counter in floodlight-gold with mono day count.
  - **Coins**: mono balance with small "Earn more" link.
- "Your Next Match" hero card: large glass card with team badges, kickoff countdown (mono, ticking), inline score steppers + confidence slider, prominent "Lock in prediction" button (pitch-green).
- Horizontal scroll rail: upcoming matches (6 mock fixtures), each a compact glass card with badges, kickoff time, "Predict" button.
- AI Baba quick-take card: distinct floodlight-gold accent border, oracle-style copy ("Argentina's attack is in deadly form — Brazil concedes too easily right now"), predicted scoreline, "Read full take" link to `/ai-baba`.
- Leaderboard preview: top 5 + sticky "You're #23, +4 this week" row, link to `/leaderboard`.

### 6. Mock data
- `src/lib/mock-data.ts` exports: 8 mock matches (mix of upcoming/live/finished, real club + national team names), 20 leaderboard entries with the current user inserted at #23, 5 AI Baba takes, mock user profile (Football IQ 1247, streak 7, coins 480, favorite team — settable by the onboarding step), and the ~24-team catalog used by the favorite-team picker.
- ScoreboardTicker pulls from this data and rotates entries.

### 7. Quality bar
- Responsive 360px → desktop; bottom tab bar swaps in under 768px.
- Skeleton glass panels (matching final card shape) for any async-feeling area, even on mock data.
- Empty states written as invitations.
- `prefers-reduced-motion` disables floodlight drift, ticker scroll, and page slide.

## Out of scope for Phase 1 (planned for later phases)

- Lovable Cloud / Supabase enablement, schema, RLS, realtime subscriptions.
- Real Google OAuth + email/password auth (and persisting the favorite-team selection beyond the in-memory mock store).
- The other 14 pages' full content (currently stubs).
- AI Baba LLM generation (still hand-written takes when those pages are built).
- Coin store transactions, battle logic, watch party video, chat.
- Any chart/analytics visualizations — `recharts` will be installed when we build Leaderboard / Predictions analytics in a later phase.

After Phase 1 lands and you approve the look, we'll pick the next 2–3 routes to flesh out and decide when to enable Cloud + auth.

## Technical notes

- Stack: TanStack Start + React 19 + Tailwind v4 (already in template). Add `framer-motion`, `@fontsource/bebas-neue`, `@fontsource/inter`, `@fontsource/jetbrains-mono`. No `recharts` in Phase 1.
- No `tailwind.config.js` edits — all tokens in `src/styles.css` via `@theme inline` + shadcn semantic mapping. No hardcoded color classes in components.
- Fonts loaded via `@fontsource` imports in a client-safe entry, not Google Fonts CDN.
- Backdrop-filter: write only standard `backdrop-filter` in CSS; Lightning CSS handles prefixes.
- All `<Link>` navigation, no `<a href>` for internal routes. Every route file defines its own `head()` with title + description + og tags.
