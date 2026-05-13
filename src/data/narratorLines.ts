import { NarratorStyle } from '@/types';

export interface NarratorLineTemplate {
  type: string;
  template: string;
  variables?: string[];
}

export interface NarratorLines {
  rival_overtake: string;
  daily_checkin: string;
  quest_complete: string;
  streak_warning: string;
  level_up: string;
  streak_broken: string;
  boss_quest_available: string;
  civic_quest_complete: string;
  weekly_summary: string;
  shield_received: string;
}

export const NARRATOR_VOICE_LINES: Record<NarratorStyle, NarratorLines> = {
  drill_sergeant: {
    rival_overtake:
      "ATTENTION! {rivalName} just passed you on the leaderboard! You gonna let them win? Get moving, soldier! Show them what you're made of!",
    daily_checkin:
      "Rise and shine, recruit! Your daily briefing is ready. Three objectives today. No excuses. No complaints. Get it done!",
    quest_complete:
      "Outstanding work, soldier! That's how it's done! Keep that momentum going. The mission isn't over until we say it's over!",
    streak_warning:
      "Your streak is at risk! Don't you dare let me down! One quick mission and you're back in action. Move it!",
    level_up:
      "PROMOTION! You've reached level {level}! Your dedication is paying off. But don't get comfortable—there's more ground to cover!",
    streak_broken:
      "We lost the streak. It happens to the best of us. But a true soldier gets back up. Starting fresh. Starting NOW!",
    boss_quest_available:
      "Attention! A BOSS QUEST has been unlocked! This is the big leagues. High risk, high reward. You ready for this?",
    civic_quest_complete:
      "Excellent! You've served your community AND yourself. That's the kind of dedication that builds champions. Kingston salutes you!",
    weekly_summary:
      "Weekly report, soldier! You earned {xp} XP this week. {questsCompleted} missions completed. Current streak: {streak} days. {message}",
    shield_received:
      "{friendName} sent you a Streak Shield! That's called having your back. Don't waste it—make every day count!",
  },

  wise_sage: {
    rival_overtake:
      "Ah, young one. {rivalName} has moved ahead on the path. Remember, the journey matters more than the destination... but perhaps pick up the pace, yes?",
    daily_checkin:
      "Good morning, seeker. The universe has prepared three lessons for you today. Approach them with mindfulness and intention.",
    quest_complete:
      "Well done, grasshopper. Each completed task is a step toward your higher self. Rest now, but not too long. The path continues.",
    streak_warning:
      "Your flame flickers, but has not yet gone out. A small action will rekindle it. What will you choose to preserve your progress?",
    level_up:
      "You have ascended to level {level}. With greater power comes greater responsibility. Use your wisdom well.",
    streak_broken:
      "The streak has ended, but not your journey. In every ending lies a new beginning. Rise with renewed purpose.",
    boss_quest_available:
      "A great challenge awaits—the Boss Quest has revealed itself. Only those ready to grow will attempt it. Are you ready?",
    civic_quest_complete:
      "By serving your community, you serve yourself. This is the way of balance. Kingston grows stronger through your actions.",
    weekly_summary:
      "Reflect upon your week, seeker. {xp} points of experience gained. {questsCompleted} lessons learned. {streak} days of continuous growth. {message}",
    shield_received:
      "A gift of protection from {friendName}. Kindness flows in both directions. Honor their gesture with perseverance.",
  },

  hype_man: {
    rival_overtake:
      "YO! {rivalName} just zoomed past you! But that's okay because you're about to make the BIGGEST comeback! Let's GO! Show them who's boss!",
    daily_checkin:
      "GOOD MORNING CHAMPION! It's gonna be YOUR day! I've got three EPIC quests lined up just for you! Let's make some MAGIC happen!",
    quest_complete:
      "LET'S GOOOOO! You CRUSHED it! You're absolutely ON FIRE right now! Keep that energy! You're UNSTOPPABLE!",
    streak_warning:
      "Hey hey HEY! Your streak needs some love! Just a quick 2-minute task and you're GOLDEN! You got this! Easy peasy!",
    level_up:
      "LEVEL UP BABY! Level {level}! The crowd goes WILD! You're making MOVES! You're a LEGEND in the making!",
    streak_broken:
      "Okay, the streak reset. BUT GUESS WHAT? This is your COMEBACK arc! Every champion falls before they FLY! Day ONE, let's GO!",
    boss_quest_available:
      "WHOOOOA! A BOSS QUEST just dropped! This is HUGE! Big XP energy! You ready to level up your LIFE? I BELIEVE IN YOU!",
    civic_quest_complete:
      "You're not just winning for yourself—you're winning for KINGSTON! Community CHAMPION! Give yourself a round of applause!",
    weekly_summary:
      "WEEKLY RECAP TIME! You earned {xp} XP—INCREDIBLE! {questsCompleted} quests DEMOLISHED! {streak} day streak—FIRE! {message}",
    shield_received:
      "FRIENDSHIP GOALS! {friendName} just blessed you with a Streak Shield! That's REAL squad energy right there! Don't let them down!",
  },
};

// Fills named template variables: {rivalName}, {level}, {xp}, etc.
export const fillNarratorTemplate = (
  template: string,
  variables: Record<string, string | number>
): string => {
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`{${key}}`, 'g'), String(value));
  }
  return result;
};

export const getNarratorLine = (
  style: NarratorStyle,
  lineType: keyof NarratorLines,
  variables?: Record<string, string | number>
): string => {
  const template = NARRATOR_VOICE_LINES[style][lineType];
  return variables ? fillNarratorTemplate(template, variables) : template;
};

// Returns a performance-based closing message for weekly summary templates
export const getWeeklyMessage = (
  questCompletionRate: number,
  streakDays: number
): string => {
  if (questCompletionRate >= 90 && streakDays >= 7) return "Outstanding performance! You're in the top tier!";
  if (questCompletionRate >= 70) return "Solid progress! Keep pushing forward!";
  if (questCompletionRate >= 50) return "Good effort! Room for improvement—you've got this!";
  return "Every step counts. Let's make next week even better!";
};
