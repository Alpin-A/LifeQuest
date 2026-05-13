// User
export interface User {
  userId: string;
  email: string;
  username: string;
  createdAt: string;

  // Game state
  xp: number;
  level: number;
  streak: number;
  streakShields: number;
  lastActiveDate: string;

  // Pet
  petName: string;
  petType: PetType;
  petMood: PetMood;
  petEvolution: number; // 1-5

  // Settings
  narratorStyle: NarratorStyle;
  companyId?: string; // B2B mode
  teamId?: string;
}

export type PetType = 'dragon' | 'phoenix' | 'spirit' | 'golem';
export type PetMood = 'happy' | 'content' | 'tired' | 'sleepy';
export type NarratorStyle = 'drill_sergeant' | 'wise_sage' | 'hype_man';

export interface PetState {
  name: string;
  type: PetType;
  mood: PetMood;
  evolution: number;
  happiness: number; // 0-100
  lastFed: string;
}

// Quests
export type QuestType = 'main' | 'side' | 'boss' | 'civic';
export type QuestCategory = 'energy' | 'focus' | 'life_admin' | 'community' | 'career';
export type QuestStatus = 'active' | 'completed' | 'failed' | 'skipped';
export type QuestVerification = 'location' | 'voice_report' | 'step_tracker' | 'self_report' | 'timer';

export interface Quest {
  questId: string;
  title: string;
  description: string;
  type: QuestType;
  category: QuestCategory;
  xpReward: number;
  status: QuestStatus;
  dueDate?: string;
  completedAt?: string;
  duration: number; // minutes
  isCivic: boolean;
  kingstonLocation?: KingstonLocation;
  verificationMethod?: QuestVerification;
}

export interface DailyQuests {
  date: string;
  mainQuest: Quest;
  sideQuest: Quest;
  bossQuest?: Quest;
  completed: boolean;
  xpEarned: number;
}

export interface KingstonLocation {
  lat: number;
  lng: number;
  name: string;
}

// League
export type LeagueTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface LeaderboardEntry {
  userId: string;
  username: string;
  weeklyXP: number;
  rank: number;
  petType: PetType;
  streak: number;
  isRival?: boolean;
}

export interface League {
  leagueId: string;
  tier: LeagueTier;
  weekNumber: number;
  entries: LeaderboardEntry[];
  promotionZone: number; // top N get promoted
  demotionZone: number;  // bottom N get demoted
}

// Coach and prediction
export interface CoachMessage {
  message: string;
  context?: string;
  memoryReference?: string;
  voiceUrl?: string;
}

export interface PredictionResult {
  date: string;
  riskScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high';
  reason: string;
  suggestion: string;
  affectedQuest?: string;
}

// Voice
export interface VoiceNote {
  id: string;
  type: 'rival_alert' | 'daily_checkin' | 'quest_complete' | 'streak_warning' | 'level_up';
  audioUrl: string;
  transcript: string;
  narratorStyle: NarratorStyle;
  createdAt: string;
}

// B2B
export interface Company {
  companyId: string;
  name: string;
  teams: Team[];
  totalEmployees: number;
}

export interface Team {
  teamId: string;
  name: string;
  memberCount: number;
  aggregateStats: TeamStats;
}

export interface TeamStats {
  avgSleepScore: number;
  avgFocusScore: number;
  questCompletionRate: number;
  avgStreak: number;
}

export interface WellnessAlert {
  teamId: string;
  teamName: string;
  alertType: 'sleep_deprivation' | 'low_focus' | 'burnout_risk';
  severity: 'warning' | 'critical';
  message: string;
}

// Misc game types
export interface XPReward {
  type: QuestType;
  baseXP: number;
  multiplier?: number;
}

export interface LevelThreshold {
  level: number;
  xpRequired: number;
  unlocks: string[];
}

// API response shapes
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface QuestCompleteResponse {
  quest: Quest;
  xpGained: number;
  newTotalXP: number;
  levelUp?: boolean;
  newLevel?: number;
  petMoodChange?: PetMood;
  streakUpdated: boolean;
  newStreak: number;
}

// Backboard.io memory events
export type MemoryEventType =
  | 'quest_completed'
  | 'quest_failed'
  | 'streak_broken'
  | 'slump_detected'
  | 'level_up'
  | 'rival_overtake';

export interface MemoryEvent {
  eventId: string;
  userId: string;
  eventType: MemoryEventType;
  context: Record<string, unknown>;
  timestamp: string;
}
