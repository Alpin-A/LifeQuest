import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, DailyQuests, PetMood, LeaderboardEntry } from '@/types';
import { calculateLevel, calculatePetMood } from '@/lib/utils';
import { XP_VALUES } from '@/lib/constants';

interface GameState {
  // Data
  user: User | null;
  isLoading: boolean;
  dailyQuests: DailyQuests | null;
  completedQuestIds: string[];
  petMood: PetMood;
  petHappiness: number;
  leaderboard: LeaderboardEntry[];

  // UI state
  showCelebration: boolean;
  celebrationXP: number;

  // Actions
  setUser: (user: User) => void;
  completeQuest: (questId: string, xpReward: number) => void;
  feedPet: () => void;
  updateStreak: (increment: boolean) => void;
  useStreakShield: () => void;
  setDailyQuests: (quests: DailyQuests) => void;
  setLeaderboard: (entries: LeaderboardEntry[]) => void;
  triggerCelebration: (xp: number) => void;
  clearCelebration: () => void;
  resetDaily: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      dailyQuests: null,
      completedQuestIds: [],
      petMood: 'content',
      petHappiness: 70,
      leaderboard: [],
      showCelebration: false,
      celebrationXP: 0,

      setUser: (user) => set({ user }),

      completeQuest: (questId, xpReward) => {
        const { user, completedQuestIds } = get();
        if (!user || completedQuestIds.includes(questId)) return;

        const newXP = user.xp + xpReward;
        const newLevel = calculateLevel(newXP);
        const todayCompletedCount = completedQuestIds.length + 1;
        const newPetMood = calculatePetMood(todayCompletedCount, user.streak);

        set({
          user: { ...user, xp: newXP, level: newLevel },
          completedQuestIds: [...completedQuestIds, questId],
          petMood: newPetMood,
          petHappiness: Math.min(100, get().petHappiness + 10),
          showCelebration: true,
          celebrationXP: xpReward,
        });

        // Auto-clear the celebration overlay after the animation finishes
        setTimeout(() => set({ showCelebration: false, celebrationXP: 0 }), 2000);
      },

      feedPet: () => {
        const { user, petHappiness } = get();
        if (!user) return;
        set({
          petHappiness: Math.min(100, petHappiness + 15),
          petMood: 'happy',
          user: { ...user, xp: user.xp + XP_VALUES.QUICK_QUEST },
        });
      },

      updateStreak: (increment) => {
        const { user } = get();
        if (!user) return;
        set({
          user: {
            ...user,
            streak: increment ? user.streak + 1 : 0,
            lastActiveDate: new Date().toISOString().split('T')[0],
          },
        });
      },

      useStreakShield: () => {
        const { user } = get();
        if (!user || user.streakShields <= 0) return;
        set({ user: { ...user, streakShields: user.streakShields - 1 } });
      },

      setDailyQuests: (quests) => set({ dailyQuests: quests }),

      setLeaderboard: (entries) => set({ leaderboard: entries }),

      triggerCelebration: (xp) => set({ showCelebration: true, celebrationXP: xp }),

      clearCelebration: () => set({ showCelebration: false, celebrationXP: 0 }),

      resetDaily: () => set({ completedQuestIds: [], dailyQuests: null }),
    }),
    {
      name: 'lifequest-game-storage',
      // Only persist what needs to survive a page refresh — keep the footprint small
      partialize: (state) => ({
        user: state.user,
        completedQuestIds: state.completedQuestIds,
        petHappiness: state.petHappiness,
      }),
    }
  )
);

// Mock data used to bootstrap the UI during development
export const mockUserData: User = {
  userId: 'user-001',
  email: 'hero@lifequest.app',
  username: 'QuestHero',
  createdAt: '2026-01-01T00:00:00Z',
  xp: 2340,
  level: 7,
  streak: 12,
  streakShields: 3,
  lastActiveDate: '2026-01-14',
  petName: 'Blaze',
  petType: 'dragon',
  petMood: 'happy',
  petEvolution: 2,
  narratorStyle: 'hype_man',
};

export const mockDailyQuestsData: DailyQuests = {
  date: '2026-01-14',
  mainQuest: {
    questId: 'quest-001',
    title: '30 min deep work session',
    description: 'Complete a focused work session without distractions',
    type: 'main',
    category: 'focus',
    xpReward: 50,
    status: 'active',
    duration: 30,
    isCivic: false,
  },
  sideQuest: {
    questId: 'quest-002',
    title: 'Drink 8 glasses of water',
    description: 'Stay hydrated throughout the day',
    type: 'side',
    category: 'energy',
    xpReward: 20,
    status: 'completed',
    duration: 0,
    isCivic: false,
  },
  bossQuest: {
    questId: 'quest-003',
    title: 'Complete job application',
    description: 'Apply to one position that excites you',
    type: 'boss',
    category: 'career',
    xpReward: 100,
    status: 'active',
    duration: 45,
    isCivic: false,
  },
  completed: false,
  xpEarned: 20,
};

export const mockLeaderboardData: LeaderboardEntry[] = [
  { userId: 'u1',       username: 'AlexTheGreat',  weeklyXP: 1250, rank: 1, petType: 'dragon',  streak: 14 },
  { userId: 'u2',       username: 'SarahQuester',  weeklyXP: 1180, rank: 2, petType: 'phoenix', streak: 21, isRival: true },
  { userId: 'user-001', username: 'QuestHero',     weeklyXP: 1020, rank: 3, petType: 'spirit',  streak: 12 },
  { userId: 'u4',       username: 'MikeHero',      weeklyXP: 890,  rank: 4, petType: 'golem',   streak: 7 },
  { userId: 'u5',       username: 'EmmaChamp',     weeklyXP: 780,  rank: 5, petType: 'phoenix', streak: 5 },
];

export const initializeMockData = () => {
  const store = useGameStore.getState();
  if (!store.user) {
    store.setUser(mockUserData);
    store.setDailyQuests(mockDailyQuestsData);
    store.setLeaderboard(mockLeaderboardData);
  }
};
