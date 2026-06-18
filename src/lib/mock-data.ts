// In-memory mock data store for Phase 1.
// Plain mutable singleton — UI-only, no persistence.

export type Team = {
  id: string;
  name: string;
  short: string;
  badge: string; // emoji placeholder
  color: string; // tailwind-safe class for accent bg
};

export type Match = {
  id: string;
  home: Team;
  away: Team;
  kickoff: Date;
  competition: string;
  status: "upcoming" | "live" | "finished";
  homeScore?: number;
  awayScore?: number;
  minute?: number;
};

export type AIBabaTake = {
  id: string;
  matchId: string;
  headline: string;
  body: string;
  predictedHome: number;
  predictedAway: number;
};

export type LeaderboardEntry = {
  rank: number;
  username: string;
  avatar: string;
  iq: number;
  streak: number;
  delta: number;
  isMe?: boolean;
};

export const TEAMS: Team[] = [
  { id: "arg", name: "Argentina", short: "ARG", badge: "🇦🇷", color: "bg-sky-500/20" },
  { id: "bra", name: "Brazil", short: "BRA", badge: "🇧🇷", color: "bg-yellow-500/20" },
  { id: "fra", name: "France", short: "FRA", badge: "🇫🇷", color: "bg-blue-600/20" },
  { id: "eng", name: "England", short: "ENG", badge: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", color: "bg-white/10" },
  { id: "esp", name: "Spain", short: "ESP", badge: "🇪🇸", color: "bg-red-600/20" },
  { id: "ger", name: "Germany", short: "GER", badge: "🇩🇪", color: "bg-yellow-500/20" },
  { id: "por", name: "Portugal", short: "POR", badge: "🇵🇹", color: "bg-red-700/20" },
  { id: "ita", name: "Italy", short: "ITA", badge: "🇮🇹", color: "bg-blue-500/20" },
  { id: "ned", name: "Netherlands", short: "NED", badge: "🇳🇱", color: "bg-orange-500/20" },
  { id: "bel", name: "Belgium", short: "BEL", badge: "🇧🇪", color: "bg-red-500/20" },
  { id: "cro", name: "Croatia", short: "CRO", badge: "🇭🇷", color: "bg-red-600/20" },
  { id: "mex", name: "Mexico", short: "MEX", badge: "🇲🇽", color: "bg-green-600/20" },
  { id: "rmd", name: "Real Madrid", short: "RMD", badge: "👑", color: "bg-white/10" },
  { id: "fcb", name: "Barcelona", short: "BAR", badge: "🔴", color: "bg-blue-700/20" },
  { id: "mci", name: "Man City", short: "MCI", badge: "🩵", color: "bg-sky-500/20" },
  { id: "mun", name: "Man United", short: "MUN", badge: "😈", color: "bg-red-700/20" },
  { id: "liv", name: "Liverpool", short: "LIV", badge: "🔴", color: "bg-red-600/20" },
  { id: "ars", name: "Arsenal", short: "ARS", badge: "🔴", color: "bg-red-500/20" },
  { id: "che", name: "Chelsea", short: "CHE", badge: "🔵", color: "bg-blue-600/20" },
  { id: "tot", name: "Tottenham", short: "TOT", badge: "🐓", color: "bg-white/10" },
  { id: "psg", name: "PSG", short: "PSG", badge: "🗼", color: "bg-blue-700/20" },
  { id: "byn", name: "Bayern Munich", short: "BYN", badge: "🔴", color: "bg-red-600/20" },
  { id: "juv", name: "Juventus", short: "JUV", badge: "⚪", color: "bg-white/10" },
  { id: "atm", name: "Atlético Madrid", short: "ATM", badge: "🔴", color: "bg-red-700/20" },
];

const teamById = (id: string) => TEAMS.find((t) => t.id === id)!;

const now = Date.now();
const mins = (n: number) => new Date(now + n * 60_000);

export const MATCHES: Match[] = [
  {
    id: "m1",
    home: teamById("arg"),
    away: teamById("bra"),
    kickoff: mins(95),
    competition: "Copa America",
    status: "upcoming",
  },
  {
    id: "m2",
    home: teamById("mci"),
    away: teamById("liv"),
    kickoff: mins(-32),
    competition: "Premier League",
    status: "live",
    homeScore: 2,
    awayScore: 1,
    minute: 67,
  },
  {
    id: "m3",
    home: teamById("rmd"),
    away: teamById("fcb"),
    kickoff: mins(-12),
    competition: "La Liga",
    status: "live",
    homeScore: 1,
    awayScore: 1,
    minute: 23,
  },
  {
    id: "m4",
    home: teamById("psg"),
    away: teamById("byn"),
    kickoff: mins(220),
    competition: "Champions League",
    status: "upcoming",
  },
  {
    id: "m5",
    home: teamById("ars"),
    away: teamById("tot"),
    kickoff: mins(310),
    competition: "Premier League",
    status: "upcoming",
  },
  {
    id: "m6",
    home: teamById("mun"),
    away: teamById("che"),
    kickoff: mins(440),
    competition: "Premier League",
    status: "upcoming",
  },
  {
    id: "m7",
    home: teamById("fra"),
    away: teamById("ger"),
    kickoff: mins(-3 * 60),
    competition: "Friendly",
    status: "finished",
    homeScore: 3,
    awayScore: 2,
  },
  {
    id: "m8",
    home: teamById("esp"),
    away: teamById("ita"),
    kickoff: mins(-5 * 60),
    competition: "Euro Qualifier",
    status: "finished",
    homeScore: 1,
    awayScore: 0,
  },
];

export const AI_BABA_TAKES: AIBabaTake[] = [
  {
    id: "t1",
    matchId: "m1",
    headline: "Argentina's attack is in deadly form — Brazil concedes too easily right now.",
    body: "Messi and Álvarez have combined for 7 goals in their last 4. Brazil's backline has shipped at least one in every game this window.",
    predictedHome: 2,
    predictedAway: 1,
  },
  {
    id: "t2",
    matchId: "m4",
    headline: "PSG at home is a different beast. Bayern's away form has cracks.",
    body: "Six wins from seven at the Parc des Princes this season. Bayern have conceded first in three straight road trips.",
    predictedHome: 2,
    predictedAway: 2,
  },
  {
    id: "t3",
    matchId: "m5",
    headline: "North London derby. Form is irrelevant — but Arsenal's press wins it.",
    body: "Spurs lose the high turnovers 64% of the time this season. Saka on the right is a matchup nightmare.",
    predictedHome: 2,
    predictedAway: 1,
  },
  {
    id: "t4",
    matchId: "m6",
    headline: "Chelsea travel well. United at home are vulnerable on transitions.",
    body: "Palmer is on a 5-game scoring streak. United have conceded in 9 of 10 league games at Old Trafford.",
    predictedHome: 1,
    predictedAway: 2,
  },
  {
    id: "t5",
    matchId: "m2",
    headline: "City's pressure is paying off — Liverpool look stretched.",
    body: "Possession 64% to 36%, xG 2.4 to 1.1. If Liverpool don't reset shape at half, this gets ugly.",
    predictedHome: 3,
    predictedAway: 1,
  },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: "stadium_oracle", avatar: "🔥", iq: 2148, streak: 23, delta: 0 },
  { rank: 2, username: "tikitaka_dan", avatar: "⚡", iq: 2104, streak: 11, delta: 1 },
  { rank: 3, username: "vargoddess", avatar: "🎯", iq: 2087, streak: 8, delta: -1 },
  { rank: 4, username: "left_footed_91", avatar: "🦶", iq: 2042, streak: 14, delta: 2 },
  { rank: 5, username: "midfield_general", avatar: "🧠", iq: 2018, streak: 6, delta: 0 },
  { rank: 6, username: "park_the_bus", avatar: "🚌", iq: 1996, streak: 4, delta: -2 },
  { rank: 7, username: "xg_enjoyer", avatar: "📊", iq: 1971, streak: 9, delta: 3 },
  { rank: 8, username: "offside_trap", avatar: "🚩", iq: 1948, streak: 2, delta: 0 },
  { rank: 9, username: "counter_attack", avatar: "💨", iq: 1922, streak: 7, delta: -1 },
  { rank: 10, username: "set_piece_sam", avatar: "🎯", iq: 1898, streak: 5, delta: 1 },
  { rank: 11, username: "high_press_hank", avatar: "🔥", iq: 1874, streak: 3, delta: 0 },
  { rank: 12, username: "false_nine", avatar: "9️⃣", iq: 1851, streak: 12, delta: 4 },
  { rank: 13, username: "wingback_wendy", avatar: "🪽", iq: 1833, streak: 1, delta: -3 },
  { rank: 14, username: "tactico_loco", avatar: "🤯", iq: 1810, streak: 6, delta: 0 },
  { rank: 15, username: "low_block_lou", avatar: "🛡️", iq: 1788, streak: 4, delta: 2 },
  { rank: 16, username: "var_skeptic", avatar: "📺", iq: 1762, streak: 8, delta: -1 },
  { rank: 17, username: "build_up_billy", avatar: "🏗️", iq: 1740, streak: 3, delta: 0 },
  { rank: 18, username: "long_ball_larry", avatar: "🎯", iq: 1721, streak: 2, delta: 1 },
  { rank: 19, username: "gegenpress_gil", avatar: "⚡", iq: 1704, streak: 5, delta: 0 },
  { rank: 20, username: "tiki_taka_terry", avatar: "🎩", iq: 1689, streak: 9, delta: 2 },
];

export type MockUser = {
  username: string;
  email: string;
  avatar: string;
  footballIQ: number;
  tier: "Rookie" | "Analyst" | "Expert" | "Elite" | "Legend";
  rank: number;
  rankDelta: number;
  streak: number;
  coins: number;
  weekDelta: number;
  favoriteTeam: Team | null;
};

// Mutable singleton — onboarding writes here, dashboard reads.
export const mockUser: MockUser = {
  username: "you",
  email: "you@footballverse.ai",
  avatar: "⚽",
  footballIQ: 1247,
  tier: "Expert",
  rank: 23,
  rankDelta: 4,
  streak: 7,
  coins: 480,
  weekDelta: 38,
  favoriteTeam: null,
};

export function setFavoriteTeam(teamId: string) {
  const team = TEAMS.find((t) => t.id === teamId);
  if (team) mockUser.favoriteTeam = team;
}

// Leaderboard with current user spliced at #23
export function leaderboardWithMe(): LeaderboardEntry[] {
  const me: LeaderboardEntry = {
    rank: 23,
    username: mockUser.username,
    avatar: mockUser.avatar,
    iq: mockUser.footballIQ,
    streak: mockUser.streak,
    delta: mockUser.rankDelta,
    isMe: true,
  };
  return [...LEADERBOARD, me];
}

// Ticker entries
export const TICKER_ENTRIES: { kind: "score" | "baba" | "rank"; text: string }[] = [
  { kind: "score", text: "MCI 2 – 1 LIV  67'" },
  { kind: "baba", text: "AI Baba: Argentina's attack is in deadly form." },
  { kind: "score", text: "RMD 1 – 1 BAR  23'" },
  { kind: "rank", text: "you climbed +4 to #23" },
  { kind: "score", text: "FRA 3 – 2 GER  FT" },
  { kind: "baba", text: "AI Baba: PSG at home is a different beast." },
  { kind: "score", text: "ESP 1 – 0 ITA  FT" },
  { kind: "rank", text: "stadium_oracle holds #1 with a 23-game streak" },
  { kind: "baba", text: "AI Baba: North London derby — Arsenal's press wins it." },
  { kind: "score", text: "ARG vs BRA in 1h 35m" },
];
