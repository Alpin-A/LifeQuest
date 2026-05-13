# LifeQuest Kingston

A gamified productivity app that borrows mechanics from games — streaks, XP, a weekly league, and a Tamagotchi-style pet — to make habit-building more engaging. The civic layer was built specifically for Kingston, Ontario: real GPS coordinates for local landmarks, 2x XP for community quests, and a voice reporting flow for city issues.

## What it does

Users get three daily quests (main, side, and optional boss), maintain a streak protected by consumable shields, and compete on a weekly leaderboard that promotes and demotes players across Bronze → Diamond tiers. A prediction engine estimates tomorrow's risk of missing quests based on calendar density and recent completion rate, surfacing rescheduling suggestions before the day gets away.

The narrator system (Drill Sergeant, Wise Sage, or Hype Man) generates contextual voice alerts for rival overtakes, streak warnings, and level-ups via ElevenLabs. A separate B2B view surfaces anonymized team wellness metrics and burnout alerts for company administrators.

## Tech stack

- **Next.js 14** with App Router and TypeScript in strict mode
- **Zustand** with persistence middleware for client-side game state
- **Framer Motion** for quest completion and XP animations
- **TanStack Query** for data fetching and caching
- **Tailwind CSS** with a custom dark gaming theme
- **Recharts** for the B2B analytics view

Backend integration points (stubbed with mock data in the current build):
- AWS DynamoDB + SageMaker — persistence and prediction model
- ElevenLabs — voice narration
- Backboard.io — context-aware coaching memory

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The app runs fully on mock data with no environment variables required. To connect real services, copy `env.example` to `.env.local` and fill in your keys.

## Project structure

```
src/
├── app/        # Pages and API routes (Next.js App Router)
├── data/       # Civic quest definitions and narrator voice line templates
├── lib/        # Game constants and utility functions
├── stores/     # Zustand game state store with persistence
└── types/      # TypeScript type definitions
```

## Technical notes

**Location verification** (`src/lib/utils.ts`) uses the Haversine formula to determine whether a user's GPS coordinates fall within a configurable radius of a quest landmark — used for Kingston civic quests that require physical presence.

**Prediction engine** (`src/app/api/predict/route.ts`) uses a rule-based model as a fallback while the SageMaker integration is pending: calendar fullness weighted at 50%, recent completion rate at 30%, and streak length reducing the risk score by up to 20 points. The SageMaker slot is documented in the route file.

**Game state** persists across sessions via Zustand's `persist` middleware, serializing only the user profile, completed quest IDs, and pet happiness to localStorage — keeping the stored footprint minimal rather than persisting the full game state.

**Narrator templates** (`src/data/narratorLines.ts`) use named interpolation (`{rivalName}`, `{streak}`, etc.) resolved at call time, so the same template set drives both the UI display text and the ElevenLabs TTS payloads without duplication.
