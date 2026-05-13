# LifeQuest Kingston - Architecture & Development Plan

## 🎯 Project Vision
**"Pokémon GO for Productivity"** - A gamified life management platform where self-improvement, social competition, and civic duty intersect.

---

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (React/Next.js)                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │  Quest   │ │   Pet    │ │ League/  │ │  Civic   │ │   B2B    │          │
│  │  Board   │ │  Screen  │ │ Friends  │ │  Quests  │ │Dashboard │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           API GATEWAY (AWS)                                  │
└─────────────────────────────────────────────────────────────────────────────┘
          │              │              │              │              │
          ▼              ▼              ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Lambda:    │ │   Lambda:    │ │   Lambda:    │ │   Lambda:    │ │   Lambda:    │
│  Quest/XP    │ │  Prediction  │ │  Leaderboard │ │   Voice      │ │    Coach     │
│   Engine     │ │   Engine     │ │   Service    │ │  Generator   │ │   Service    │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
          │              │              │              │              │
          ▼              ▼              ▼              ▼              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATA LAYER                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   DynamoDB   │  │  SageMaker/  │  │  Backboard   │  │  ElevenLabs  │    │
│  │  (Main DB)   │  │  Bedrock     │  │   Memory     │  │    Voice     │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

### Frontend
| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | **Next.js 14** (App Router) | SSR, routing, API routes |
| UI Library | **React 18** | Component architecture |
| Styling | **Tailwind CSS** + **Framer Motion** | Rapid styling + animations |
| State | **Zustand** | Lightweight state management |
| Data Fetching | **TanStack Query** | Caching, real-time updates |
| Charts | **Recharts** | B2B dashboard visualizations |
| Audio | **Howler.js** | Voice note playback |

### Backend (AWS)
| Service | Purpose |
|---------|---------|
| **API Gateway** | REST API endpoint management |
| **Lambda** | Serverless compute for all business logic |
| **DynamoDB** | Primary database (users, quests, XP, streaks) |
| **SageMaker/Bedrock** | Prediction engine + AI quest generation |
| **S3** | Voice note storage, static assets |
| **EventBridge** | Scheduled tasks (daily quest gen, streak checks) |
| **Cognito** | Authentication (optional, can use simple auth for MVP) |

### External APIs
| Service | Purpose |
|---------|---------|
| **Backboard.io** | Long-term memory for personalized coaching |
| **ElevenLabs** | Voice synthesis for narrator |

---

## 📁 Project Structure

```
lifequest-kingston/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── (main)/
│   │   │   ├── layout.tsx            # Main app layout with nav
│   │   │   ├── page.tsx              # Dashboard/Quest Board
│   │   │   ├── pet/page.tsx          # Tamagotchi pet screen
│   │   │   ├── quests/page.tsx       # All quests & paths
│   │   │   ├── civic/page.tsx        # Kingston civic quests
│   │   │   ├── league/page.tsx       # Leaderboard & friends
│   │   │   └── profile/page.tsx      # User profile & settings
│   │   ├── b2b/                       # B2B Mode (IBM Track)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              # Company dashboard
│   │   │   └── teams/page.tsx        # Team comparisons
│   │   ├── api/                       # API Routes (Next.js)
│   │   │   ├── quests/route.ts
│   │   │   ├── xp/route.ts
│   │   │   ├── predict/route.ts
│   │   │   ├── voice/route.ts
│   │   │   ├── coach/route.ts
│   │   │   └── leaderboard/route.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                        # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Progress.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Toast.tsx
│   │   ├── quest/
│   │   │   ├── QuestCard.tsx
│   │   │   ├── QuestList.tsx
│   │   │   ├── DailyQuests.tsx
│   │   │   ├── QuestPath.tsx
│   │   │   └── QuestComplete.tsx     # Celebration animation
│   │   ├── pet/
│   │   │   ├── PetAvatar.tsx
│   │   │   ├── PetMood.tsx
│   │   │   ├── PetEvolution.tsx
│   │   │   └── PetAnimation.tsx
│   │   ├── league/
│   │   │   ├── Leaderboard.tsx
│   │   │   ├── LeagueRank.tsx
│   │   │   ├── FriendCard.tsx
│   │   │   └── RivalAlert.tsx
│   │   ├── coach/
│   │   │   ├── CoachMessage.tsx
│   │   │   ├── VoicePlayer.tsx
│   │   │   └── PredictionCard.tsx
│   │   ├── civic/
│   │   │   ├── CivicQuestCard.tsx
│   │   │   ├── KingstonMap.tsx
│   │   │   └── LocationChecker.tsx
│   │   ├── b2b/
│   │   │   ├── TeamDashboard.tsx
│   │   │   ├── WellnessChart.tsx
│   │   │   └── AnonStats.tsx
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       ├── BottomNav.tsx
│   │       ├── Sidebar.tsx
│   │       └── Header.tsx
│   │
│   ├── hooks/
│   │   ├── useQuests.ts
│   │   ├── useXP.ts
│   │   ├── usePet.ts
│   │   ├── useStreak.ts
│   │   ├── useLeaderboard.ts
│   │   ├── useVoice.ts
│   │   └── usePrediction.ts
│   │
│   ├── lib/
│   │   ├── api.ts                     # API client
│   │   ├── backboard.ts               # Backboard.io integration
│   │   ├── elevenlabs.ts              # ElevenLabs integration
│   │   ├── aws.ts                     # AWS SDK config
│   │   └── constants.ts               # Game constants (XP values, etc.)
│   │
│   ├── stores/
│   │   ├── userStore.ts
│   │   ├── questStore.ts
│   │   └── gameStore.ts
│   │
│   ├── types/
│   │   ├── quest.ts
│   │   ├── user.ts
│   │   ├── pet.ts
│   │   └── leaderboard.ts
│   │
│   └── data/
│       ├── civicQuests.ts             # Preloaded Kingston quests
│       ├── narratorLines.ts           # Voice line templates
│       └── petStates.ts               # Pet mood/evolution data
│
├── public/
│   ├── pets/                          # Pet sprite images
│   ├── icons/                         # Quest type icons
│   ├── sounds/                        # SFX (completion, level up)
│   └── badges/                        # Achievement badges
│
├── aws/                               # AWS Infrastructure (optional CDK/SAM)
│   ├── lambda/
│   │   ├── quest-engine/
│   │   ├── prediction-engine/
│   │   └── voice-generator/
│   └── template.yaml
│
├── .env.local                         # Environment variables
├── next.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 💾 Database Schema (DynamoDB)

### Users Table
```typescript
{
  PK: "USER#<userId>",
  SK: "PROFILE",
  userId: string,
  email: string,
  username: string,
  createdAt: string,
  
  // Game State
  xp: number,
  level: number,
  streak: number,
  streakShields: number,
  lastActiveDate: string,
  
  // Pet State
  petName: string,
  petType: "dragon" | "phoenix" | "spirit" | "golem",
  petMood: "happy" | "content" | "tired" | "sleepy",
  petEvolution: number, // 1-5
  
  // Settings
  narratorStyle: "drill_sergeant" | "wise_sage" | "hype_man",
  companyId?: string, // For B2B mode
  teamId?: string,
}
```

### Quests Table
```typescript
{
  PK: "USER#<userId>",
  SK: "QUEST#<questId>",
  questId: string,
  title: string,
  description: string,
  type: "main" | "side" | "boss" | "civic",
  category: "energy" | "focus" | "life_admin" | "community" | "career",
  xpReward: number,
  status: "active" | "completed" | "failed" | "skipped",
  dueDate: string,
  completedAt?: string,
  duration: number, // minutes
  isCivic: boolean,
  kingstonLocation?: string,
}
```

### Daily Quests Table
```typescript
{
  PK: "USER#<userId>",
  SK: "DAILY#<date>", // YYYY-MM-DD
  mainQuest: Quest,
  sideQuest: Quest,
  bossQuest?: Quest,
  completed: boolean,
  xpEarned: number,
}
```

### Leaderboard Table (GSI for rankings)
```typescript
{
  PK: "LEAGUE#<leagueId>",
  SK: "USER#<userId>",
  weeklyXP: number,
  rank: number,
  userId: string,
  username: string,
  petType: string,
  streak: number,
}
```

### Memory Events Table (for Backboard sync)
```typescript
{
  PK: "USER#<userId>",
  SK: "EVENT#<timestamp>",
  eventType: "quest_completed" | "quest_failed" | "streak_broken" | "slump_detected",
  context: string, // JSON with details
  timestamp: string,
}
```

### B2B Company Table
```typescript
{
  PK: "COMPANY#<companyId>",
  SK: "TEAM#<teamId>",
  teamName: string,
  memberCount: number,
  aggregateStats: {
    avgSleepScore: number,
    avgFocusScore: number,
    questCompletionRate: number,
    avgStreak: number,
  }
}
```

---

## 🔌 API Endpoints

### Quest Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quests/daily` | Get today's generated quests |
| POST | `/api/quests/complete` | Mark quest complete, award XP |
| POST | `/api/quests/skip` | Skip quest (uses shield if needed) |
| GET | `/api/quests/civic` | Get Kingston civic quests |

### User & Progress
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get user profile + game state |
| PUT | `/api/user/settings` | Update narrator, pet name, etc. |
| GET | `/api/user/stats` | Get XP history, completion rates |

### Pet System
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pet` | Get pet state |
| POST | `/api/pet/feed` | Feed pet (2-min quest) |
| POST | `/api/pet/evolve` | Trigger evolution check |

### Leaderboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leaderboard` | Get current league standings |
| GET | `/api/leaderboard/friends` | Get friends only |
| POST | `/api/leaderboard/gift-shield` | Gift streak shield to friend |

### AI Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/coach/message` | Get personalized coach message (Backboard) |
| POST | `/api/predict/tomorrow` | Get tomorrow's risk score (AWS) |
| POST | `/api/voice/generate` | Generate voice note (ElevenLabs) |

### B2B Mode
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/b2b/dashboard` | Get company-wide stats |
| GET | `/api/b2b/teams` | Get team comparison data |

---

## 🎮 Game Mechanics Constants

```typescript
// src/lib/constants.ts

export const XP_VALUES = {
  MAIN_QUEST: 50,
  SIDE_QUEST: 20,
  BOSS_QUEST: 100,
  CIVIC_QUEST: 40, // + 2x multiplier = 80
  STREAK_BONUS: 10, // per day
  DAILY_COMPLETE_BONUS: 30,
};

export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  1000,   // Level 5
  2000,   // Level 6
  4000,   // Level 7
  7000,   // Level 8
  11000,  // Level 9
  16000,  // Level 10
];

export const PET_MOODS = {
  HAPPY: { minQuests: 3, streakMin: 7 },
  CONTENT: { minQuests: 2, streakMin: 3 },
  TIRED: { minQuests: 1, streakMin: 1 },
  SLEEPY: { minQuests: 0, streakMin: 0 },
};

export const EVOLUTION_LEVELS = [1, 5, 10, 20, 35];

export const LEAGUE_TIERS = [
  "bronze",
  "silver", 
  "gold",
  "platinum",
  "diamond"
];

export const CIVIC_QUEST_MULTIPLIER = 2;
export const WEEKLY_SHIELDS_EARNED = 2;
export const MAX_SHIELDS = 5;
```

---

## 🗺 Kingston Civic Quests (Preloaded Data)

```typescript
// src/data/civicQuests.ts

export const KINGSTON_CIVIC_QUESTS = [
  {
    id: "civic-001",
    title: "Visit Kingston Public Market",
    description: "Support local vendors at the Kingston Public Market",
    xpReward: 40,
    location: { lat: 44.2312, lng: -76.4860, name: "Kingston Public Market" },
    verificationMethod: "location",
    category: "community",
  },
  {
    id: "civic-002", 
    title: "Report a Pothole",
    description: "Help improve Kingston roads by reporting a pothole via voice command",
    xpReward: 30,
    verificationMethod: "voice_report",
    category: "community",
  },
  {
    id: "civic-003",
    title: "Walk to Work Challenge",
    description: "Reduce your carbon footprint by walking to work",
    xpReward: 50,
    verificationMethod: "step_tracker",
    category: "energy",
  },
  {
    id: "civic-004",
    title: "Visit City Hall",
    description: "Learn about local government at Kingston City Hall",
    xpReward: 35,
    location: { lat: 44.2306, lng: -76.4819, name: "Kingston City Hall" },
    verificationMethod: "location",
    category: "community",
  },
  {
    id: "civic-005",
    title: "Queen's University Campus Walk",
    description: "Take a mindful walk through Queen's University campus",
    xpReward: 25,
    location: { lat: 44.2253, lng: -76.4951, name: "Queen's University" },
    verificationMethod: "location",
    category: "energy",
  },
  {
    id: "civic-006",
    title: "Lake Ontario Waterfront",
    description: "Visit the beautiful Lake Ontario waterfront for fresh air",
    xpReward: 30,
    location: { lat: 44.2279, lng: -76.4797, name: "Confederation Basin" },
    verificationMethod: "location",
    category: "energy",
  },
  {
    id: "civic-007",
    title: "Support Local Library",
    description: "Visit Kingston Frontenac Public Library",
    xpReward: 35,
    location: { lat: 44.2297, lng: -76.4817, name: "Kingston Frontenac Public Library" },
    verificationMethod: "location",
    category: "focus",
  },
  {
    id: "civic-008",
    title: "Volunteer Hour",
    description: "Log a volunteer hour at any Kingston community organization",
    xpReward: 100,
    verificationMethod: "self_report",
    category: "community",
  },
  {
    id: "civic-009",
    title: "Transit Champion",
    description: "Use Kingston Transit instead of driving",
    xpReward: 25,
    verificationMethod: "self_report",
    category: "community",
  },
  {
    id: "civic-010",
    title: "Memorial Park Mindfulness",
    description: "5-minute meditation at City Park",
    xpReward: 20,
    location: { lat: 44.2332, lng: -76.4815, name: "City Park" },
    verificationMethod: "location",
    category: "energy",
  },
];
```

---

## 🎤 Narrator Voice Lines (ElevenLabs)

```typescript
// src/data/narratorLines.ts

export const NARRATOR_LINES = {
  drill_sergeant: {
    rival_overtake: "ATTENTION! {rivalName} just passed you on the leaderboard! You gonna let them win? Get moving, soldier!",
    daily_checkin: "Rise and shine! Your daily briefing is ready. Three objectives today. No excuses!",
    quest_complete: "Outstanding work! That's how it's done. Keep that momentum going!",
    streak_warning: "Your streak is at risk! Don't let me down. One quick mission and you're back in action!",
    level_up: "PROMOTION! You've reached level {level}! Your dedication is paying off!",
  },
  wise_sage: {
    rival_overtake: "Ah, young one. {rivalName} has moved ahead on the path. Remember, the journey matters more than the destination, but... perhaps pick up the pace?",
    daily_checkin: "Good morning, seeker. The universe has prepared three lessons for you today. Approach them with mindfulness.",
    quest_complete: "Well done. Each completed task is a step toward your higher self. Rest now, but not too long.",
    streak_warning: "Your flame flickers, but has not yet gone out. A small action will rekindle it. What will you choose?",
    level_up: "You have ascended to level {level}. With greater power comes greater responsibility.",
  },
  hype_man: {
    rival_overtake: "YO! {rivalName} just zoomed past you! But that's okay because you're about to make the biggest comeback! Let's GO!",
    daily_checkin: "GOOD MORNING CHAMPION! It's gonna be YOUR day! I've got three epic quests lined up just for you!",
    quest_complete: "LET'S GOOO! You crushed it! You're absolutely on fire right now! Keep that energy!",
    streak_warning: "Hey hey HEY! Your streak needs some love! Just a quick 2-minute task and you're golden! You got this!",
    level_up: "LEVEL UP BABY! Level {level}! The crowd goes WILD! You're unstoppable!",
  }
};
```

---

## 📅 2-Day Implementation Timeline

### Day 1: Core Foundation (16 hours)

#### Morning (4 hours) - Setup & Auth
| Time | Task | Owner |
|------|------|-------|
| 0:00-1:00 | Project setup: Next.js, Tailwind, dependencies | Frontend |
| 1:00-2:00 | Basic auth flow (simple email/password or mock) | Backend |
| 2:00-4:00 | DynamoDB tables setup + seed data | Backend |
| 2:00-4:00 | Design system: colors, typography, base components | Frontend |

#### Afternoon (6 hours) - Quest System
| Time | Task | Owner |
|------|------|-------|
| 4:00-6:00 | Quest Board UI + Daily Quest cards | Frontend |
| 4:00-6:00 | Quest API endpoints (CRUD) | Backend |
| 6:00-8:00 | Quest completion flow + XP animation | Frontend |
| 6:00-8:00 | XP/Level calculation logic | Backend |
| 8:00-10:00 | Streak system + shield logic | Backend |
| 8:00-10:00 | Pet state UI (mood indicator, basic avatar) | Frontend |

#### Evening (6 hours) - Core Features
| Time | Task | Owner |
|------|------|-------|
| 10:00-12:00 | Leaderboard UI + friend comparisons | Frontend |
| 10:00-12:00 | Leaderboard API + real-time updates | Backend |
| 12:00-14:00 | Civic Quests page + Kingston data | Frontend |
| 12:00-14:00 | Backboard.io integration for memory | Backend |
| 14:00-16:00 | Coach message component | Frontend |
| 14:00-16:00 | AI quest generation (Bedrock/rules) | Backend |

### Day 2: Integrations & Polish (16 hours)

#### Morning (4 hours) - Voice & Predictions
| Time | Task | Owner |
|------|------|-------|
| 0:00-2:00 | ElevenLabs integration + voice player | Backend/Frontend |
| 0:00-2:00 | Pre-generate narrator voice lines | Backend |
| 2:00-4:00 | "Tomorrow Risk" prediction UI card | Frontend |
| 2:00-4:00 | Prediction engine (rule-based or SageMaker) | Backend |

#### Afternoon (6 hours) - B2B & Polish
| Time | Task | Owner |
|------|------|-------|
| 4:00-6:00 | B2B Mode toggle + company dashboard | Frontend |
| 4:00-6:00 | Aggregated team stats API | Backend |
| 6:00-8:00 | Pet animations + evolution visuals | Frontend |
| 6:00-8:00 | Rival alert notifications (voice) | Backend |
| 8:00-10:00 | Mobile responsiveness pass | Frontend |
| 8:00-10:00 | AWS deployment (Amplify/Vercel) | Backend |

#### Evening (6 hours) - Demo Prep
| Time | Task | Owner |
|------|------|-------|
| 10:00-12:00 | Bug fixes + edge cases | Both |
| 12:00-14:00 | Demo data seeding (compelling story) | Both |
| 14:00-16:00 | Presentation slides + demo script | Both |

---

## 🎯 MVP Feature Checklist

### Must Have (Day 1)
- [ ] User authentication (basic)
- [ ] Daily quest board (main, side, boss)
- [ ] Quest completion + XP gain
- [ ] Pet mood display
- [ ] Streak counter + shield system
- [ ] Friends leaderboard
- [ ] Civic quests list (Kingston locations)

### Must Have (Day 2)
- [ ] Backboard coach message (1 personalized message)
- [ ] ElevenLabs voice note (rival alert)
- [ ] Tomorrow risk score display
- [ ] B2B mode toggle + basic dashboard
- [ ] Mobile responsive

### Nice to Have
- [ ] Pet evolution animations
- [ ] League system (Bronze → Diamond)
- [ ] Achievement badges
- [ ] Push notifications
- [ ] Location verification for civic quests
- [ ] Voice command pothole report

---

## 🎨 UI/UX Design Guidelines

### Color Palette (Dark Gaming Theme)
```css
:root {
  /* Primary */
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-card: #1a1a24;
  
  /* Accents */
  --accent-gold: #ffd700;
  --accent-purple: #8b5cf6;
  --accent-cyan: #06b6d4;
  --accent-green: #22c55e;
  --accent-red: #ef4444;
  
  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  --text-muted: #52525b;
  
  /* XP Bar */
  --xp-gradient: linear-gradient(90deg, #8b5cf6, #06b6d4);
  
  /* Civic Quest */
  --civic-accent: #22c55e;
}
```

### Typography
```css
/* Headers - Bold, Gaming Feel */
font-family: 'Orbitron', 'Space Grotesk', sans-serif;

/* Body - Clean, Readable */
font-family: 'Inter', 'SF Pro', sans-serif;
```

### Animation Principles
1. **Quest Complete**: Burst particles + XP float-up + sound
2. **Level Up**: Full-screen celebration + confetti
3. **Pet Mood**: Subtle idle animations (breathing, blinking)
4. **Streak**: Fire/glow effect on streak number
5. **Leaderboard**: Smooth rank transitions

---

## 🚀 Deployment Strategy

### Option 1: Vercel (Recommended for Speed)
```bash
# Deploy frontend
vercel deploy --prod

# Environment variables needed:
NEXT_PUBLIC_API_URL=
ELEVENLABS_API_KEY=
BACKBOARD_API_KEY=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
```

### Option 2: AWS Amplify (Better for AWS Track Demo)
```bash
# Initialize Amplify
amplify init
amplify add auth
amplify add api
amplify push
amplify publish
```

---

## 📱 Screen Wireframes

### 1. Quest Board (Home)
```
┌─────────────────────────────────┐
│  LifeQuest    [Pet] [🔔] [≡]   │
├─────────────────────────────────┤
│  ┌─────────────────────────┐   │
│  │  🔥 12 Day Streak       │   │
│  │  Level 7 • 2,340 XP     │   │
│  │  ████████████░░░ 78%    │   │
│  └─────────────────────────┘   │
│                                 │
│  📋 Today's Quests              │
│  ┌─────────────────────────┐   │
│  │ ⚔️ MAIN QUEST            │   │
│  │ 30 min deep work         │   │
│  │ +50 XP         [START]   │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │ 🎯 SIDE QUEST            │   │
│  │ Drink 8 glasses water    │   │
│  │ +20 XP         [START]   │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │ 👑 BOSS QUEST (Optional) │   │
│  │ Complete job application │   │
│  │ +100 XP        [START]   │   │
│  └─────────────────────────┘   │
│                                 │
│  🤖 Coach Says:                │
│  "Last Tuesday you had a slump │
│   at 2pm. Drink water now!"    │
│   [🔊 Play Voice]              │
│                                 │
├─────────────────────────────────┤
│ [🏠] [🗺️] [🏆] [🐲] [👤]       │
└─────────────────────────────────┘
```

### 2. Leaderboard
```
┌─────────────────────────────────┐
│  ← Leaderboard      [Friends]  │
├─────────────────────────────────┤
│  🏆 Gold League - Week 3       │
│  ┌─────────────────────────┐   │
│  │ 1. 🐉 Alex      1,250 XP │   │
│  │ 2. 🦅 Sarah     1,180 XP │   │
│  │ 3. 👻 You       1,020 XP │   │← Your position
│  │ 4. 🔥 Mike        890 XP │   │
│  │ 5. 🌟 Emma        780 XP │   │
│  │ ─────────────────────── │   │
│  │ ↑ Promotion Zone         │   │
│  │ ↓ Demotion Zone          │   │
│  └─────────────────────────┘   │
│                                 │
│  ⚡ RIVAL ALERT                 │
│  ┌─────────────────────────┐   │
│  │ Sarah just passed you!   │   │
│  │ [🔊 Play Message]        │   │
│  │ [🎯 Quick Quest]         │   │
│  └─────────────────────────┘   │
│                                 │
│  🎁 Gift Shield to Friend      │
│  [Select Friend ▼] [Send]      │
│                                 │
└─────────────────────────────────┘
```

### 3. Civic Quests (Mayor Track)
```
┌─────────────────────────────────┐
│  ← Kingston Quests    [Map 🗺️] │
├─────────────────────────────────┤
│  🏛️ Support Your Community     │
│  Earn 2x XP on civic quests!   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🛒 Kingston Public Market│   │
│  │ Visit local vendors      │   │
│  │ +80 XP (2x!)   📍 1.2km  │   │
│  │            [Navigate]    │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │ 🕳️ Report a Pothole      │   │
│  │ Help improve our roads   │   │
│  │ +60 XP (2x!)   🎤 Voice  │   │
│  │             [Report]     │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │ 🚶 Walk to Work          │   │
│  │ Reduce carbon footprint  │   │
│  │ +100 XP (2x!)   👟 Steps │   │
│  │             [Start]      │   │
│  └─────────────────────────┘   │
│                                 │
│  Your Civic Impact: 🌿 420 XP  │
│  Quests Completed: 5           │
│                                 │
└─────────────────────────────────┘
```

### 4. B2B Dashboard (IBM Track)
```
┌─────────────────────────────────┐
│  ← Company Dashboard   [Export]│
├─────────────────────────────────┤
│  🏢 TechCorp Wellness          │
│  Week of Jan 12, 2026          │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Team Wellness Overview   │   │
│  │ ┌─────┐ ┌─────┐ ┌─────┐ │   │
│  │ │ 😴  │ │ 🎯  │ │ ✅  │ │   │
│  │ │Sleep│ │Focus│ │Done │ │   │
│  │ │ 6.2h│ │ 78% │ │ 84% │ │   │
│  │ └─────┘ └─────┘ └─────┘ │   │
│  └─────────────────────────┘   │
│                                 │
│  📊 Team Comparison            │
│  ┌─────────────────────────┐   │
│  │ Engineering  ████████ 89%│   │
│  │ Sales        ██████░░ 72%│   │
│  │ Marketing    █████░░░ 65%│   │
│  │ Support      ███████░ 81%│   │
│  └─────────────────────────┘   │
│                                 │
│  ⚠️ Burnout Alert              │
│  Engineering team showing high │
│  sleep deprivation this week.  │
│                                 │
│  [View Details] [Notify HR]    │
│                                 │
└─────────────────────────────────┘
```

---

## 🔑 Environment Variables

```env
# .env.local

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=LifeQuest Kingston

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
DYNAMODB_TABLE_PREFIX=lifequest_

# Backboard.io
BACKBOARD_API_KEY=
BACKBOARD_PROJECT_ID=

# ElevenLabs
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID_SERGEANT=
ELEVENLABS_VOICE_ID_SAGE=
ELEVENLABS_VOICE_ID_HYPE=

# Auth (simple JWT for MVP)
JWT_SECRET=your-secret-key-here
```

---

## 🎪 Demo Script for Judges

### For AWS/SageMaker Judge (Ran Tao)
1. Show prediction card: "Tomorrow you have 90% chance of skipping gym"
2. Explain SageMaker/rule-based model analyzing calendar + history
3. Show reschedule suggestion
4. Highlight DynamoDB for real-time leaderboard

### For Mayor's Innovation Track
1. Open Civic Quests page
2. Show Kingston Public Market quest
3. Demonstrate pothole voice report
4. Show community impact stats

### For IBM Enterprise Track
1. Toggle to B2B Mode
2. Show company wellness dashboard
3. Highlight anonymized team data
4. Show burnout alert feature

### For Google PM (Juan Djuwadi)
1. Show daily quest loop (Duolingo parallel)
2. Demonstrate streak + shield system
3. Show pet mood changes
4. Highlight retention mechanics

### For ElevenLabs Track
1. Play rival alert voice message
2. Show narrator selection
3. Demonstrate different voice personalities
4. Play daily briefing audio

---

## ✅ Success Metrics

| Metric | Target |
|--------|--------|
| Demo works end-to-end | 100% |
| All 5 tracks addressed | ✓ |
| Voice generation works | ✓ |
| Prediction score displays | ✓ |
| B2B dashboard renders | ✓ |
| Civic quests load | ✓ |
| Leaderboard updates | ✓ |
| Pet state changes | ✓ |

---

## 🆘 Fallback Plans

| Risk | Fallback |
|------|----------|
| SageMaker too complex | Use rule-based prediction (if calendar >80% full → high risk) |
| ElevenLabs rate limit | Pre-generate 10 voice clips, serve from S3 |
| Backboard API issues | Mock memory with local storage + JSON |
| DynamoDB setup slow | Use Supabase or Firebase for MVP |
| Auth too complex | Use mock auth (hardcoded users) |

---

**Total Estimated Development Time: 32 hours (16 hours × 2 days)**

**Team Split:**
- Frontend: ~60% of work (UI, animations, responsiveness)
- Backend: ~40% of work (APIs, integrations, deployment)

Good luck at KingHacks! 🚀🎮
