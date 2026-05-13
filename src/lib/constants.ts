// XP values per quest type
export const XP_VALUES = {
  MAIN_QUEST: 50,
  SIDE_QUEST: 20,
  BOSS_QUEST: 100,
  CIVIC_QUEST: 40,     // base value, multiplied by CIVIC_QUEST_MULTIPLIER
  STREAK_BONUS: 10,    // per day of active streak
  DAILY_COMPLETE_BONUS: 30, // bonus for finishing all daily quests
  QUICK_QUEST: 10,     // 2-minute pet feeding quest
} as const;

// XP thresholds per level, with what each level unlocks
export const LEVEL_THRESHOLDS = [
  { level: 1,  xp: 0,     unlocks: ['Basic pet'] },
  { level: 2,  xp: 100,   unlocks: ['Side quests'] },
  { level: 3,  xp: 250,   unlocks: ['Drill Sergeant narrator'] },
  { level: 4,  xp: 500,   unlocks: ['Pet color customization'] },
  { level: 5,  xp: 1000,  unlocks: ['Wise Sage narrator', 'Pet evolution 2'] },
  { level: 6,  xp: 2000,  unlocks: ['Boss quests'] },
  { level: 7,  xp: 4000,  unlocks: ['Hype Man narrator'] },
  { level: 8,  xp: 7000,  unlocks: ['Pet evolution 3'] },
  { level: 9,  xp: 11000, unlocks: ['Custom pet name'] },
  { level: 10, xp: 16000, unlocks: ['Pet evolution 4', 'Gold badge'] },
  { level: 15, xp: 35000, unlocks: ['Pet evolution 5', 'Diamond badge'] },
  { level: 20, xp: 60000, unlocks: ['Legendary status'] },
] as const;

// Pet types
export const PET_TYPES = {
  dragon:  { name: 'Dragon',  emoji: '🐉', description: 'Fierce and determined' },
  phoenix: { name: 'Phoenix', emoji: '🦅', description: 'Rising from challenges' },
  spirit:  { name: 'Spirit',  emoji: '👻', description: 'Mystical and wise' },
  golem:   { name: 'Golem',   emoji: '🗿', description: 'Strong and steady' },
} as const;

export const PET_MOODS = {
  happy:   { emoji: '😊', minQuests: 3, minStreak: 7, color: 'green' },
  content: { emoji: '🙂', minQuests: 2, minStreak: 3, color: 'cyan' },
  tired:   { emoji: '😴', minQuests: 1, minStreak: 1, color: 'orange' },
  sleepy:  { emoji: '💤', minQuests: 0, minStreak: 0, color: 'red' },
} as const;

export const PET_EVOLUTION_LEVELS = [1, 5, 10, 20, 35] as const;

// League tiers and weekly competition config
export const LEAGUE_TIERS = {
  bronze:   { name: 'Bronze',   emoji: '🥉', color: '#cd7f32', minXP: 0 },
  silver:   { name: 'Silver',   emoji: '🥈', color: '#c0c0c0', minXP: 500 },
  gold:     { name: 'Gold',     emoji: '🥇', color: '#ffd700', minXP: 1500 },
  platinum: { name: 'Platinum', emoji: '💎', color: '#e5e4e2', minXP: 3000 },
  diamond:  { name: 'Diamond',  emoji: '💠', color: '#b9f2ff', minXP: 6000 },
} as const;

export const LEAGUE_CONFIG = {
  PROMOTION_ZONE: 3,    // top N get promoted
  DEMOTION_ZONE: 3,     // bottom N get demoted
  PLAYERS_PER_LEAGUE: 20,
  WEEK_RESET_DAY: 0,    // Sunday
} as const;

// Streak and shield system
export const STREAK_CONFIG = {
  WEEKLY_SHIELDS_EARNED: 2, // shields earned per week
  MAX_SHIELDS: 5,
  SHIELD_GIFT_COOLDOWN: 7,  // days between gifting to the same friend
  STREAK_FIRE_THRESHOLD: 7, // days before the fire animation appears
} as const;

// Quest categories
export const QUEST_CATEGORIES = {
  energy:     { name: 'Energy',     emoji: '⚡', color: 'yellow', description: 'Sleep, hydration, movement' },
  focus:      { name: 'Focus',      emoji: '🎯', color: 'purple', description: 'Deep work, concentration' },
  life_admin: { name: 'Life Admin', emoji: '📋', color: 'blue',   description: 'Deadlines, forms, bills' },
  community:  { name: 'Community',  emoji: '🏛️', color: 'green',  description: 'Kingston civic quests' },
  career:     { name: 'Career',     emoji: '💼', color: 'orange', description: 'Applications, networking' },
} as const;

export const CIVIC_QUEST_MULTIPLIER = 2;

// Narrator personalities and unlock levels
export const NARRATOR_STYLES = {
  drill_sergeant: {
    name: 'Drill Sergeant',
    emoji: '🎖️',
    personality: 'Tough love, no excuses',
    unlockLevel: 3,
  },
  wise_sage: {
    name: 'Wise Sage',
    emoji: '🧙',
    personality: 'Calm, philosophical guidance',
    unlockLevel: 5,
  },
  hype_man: {
    name: 'Hype Man',
    emoji: '🎤',
    personality: 'Enthusiastic, energetic support',
    unlockLevel: 7,
  },
} as const;

// Timing constants (all in ms unless noted)
export const TIME_CONFIG = {
  QUEST_REFRESH_HOUR: 5,          // 5 AM local time
  SLUMP_DETECTION_WINDOW: 3,      // hours
  PREDICTION_LOOKAHEAD_DAYS: 1,
  VOICE_NOTE_CACHE_HOURS: 24,
} as const;

export const FEEDBACK_TIMING = {
  XP_ANIMATION_DURATION: 1000,
  LEVEL_UP_CELEBRATION: 3000,
  QUEST_COMPLETE_DELAY: 500,
  CONFETTI_DURATION: 2000,
  STREAK_PULSE_INTERVAL: 2000,
} as const;

// Risk score thresholds for the prediction engine
export const RISK_THRESHOLDS = {
  LOW: 30,
  MEDIUM: 60,
  HIGH: 80,
} as const;

// Unlockable achievements
export const ACHIEVEMENTS = [
  { id: 'first_quest',       name: 'First Steps',       description: 'Complete your first quest',          xp: 10 },
  { id: 'week_warrior',      name: '7-Day Warrior',      description: '7 day streak',                       xp: 50 },
  { id: 'month_master',      name: 'Month Master',       description: '30 day streak',                      xp: 200 },
  { id: 'civic_hero',        name: 'Civic Hero',         description: 'Complete 10 Kingston quests',        xp: 100 },
  { id: 'early_bird',        name: 'Early Bird',         description: 'Complete a quest before 7 AM',       xp: 25 },
  { id: 'night_owl',         name: 'Night Owl',          description: 'Complete a quest after 10 PM',       xp: 25 },
  { id: 'social_butterfly',  name: 'Social Butterfly',   description: 'Gift 5 shields to friends',          xp: 50 },
  { id: 'boss_slayer',       name: 'Boss Slayer',        description: 'Complete 5 boss quests',             xp: 75 },
  { id: 'pet_parent',        name: 'Pet Parent',         description: 'Reach pet evolution 3',              xp: 100 },
  { id: 'league_champion',   name: 'League Champion',    description: 'Reach Diamond league',               xp: 500 },
] as const;
