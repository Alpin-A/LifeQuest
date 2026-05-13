import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateLevel(xp: number): number {
  const thresholds = [0, 100, 250, 500, 1000, 2000, 4000, 7000, 11000, 16000, 25000, 35000, 50000, 70000, 100000];
  let level = 1;
  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  return level;
}

export function getXPForNextLevel(currentLevel: number): number {
  const thresholds = [100, 250, 500, 1000, 2000, 4000, 7000, 11000, 16000, 25000, 35000, 50000, 70000, 100000];
  return thresholds[currentLevel - 1] || thresholds[thresholds.length - 1];
}

export function calculateLevelProgress(xp: number): number {
  const level = calculateLevel(xp);
  const currentLevelXP = level === 1 ? 0 : getXPForNextLevel(level - 1);
  const nextLevelXP = getXPForNextLevel(level);
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  return Math.min(Math.max(progress, 0), 100);
}

// Formats large numbers: 1000 → 1K, 1000000 → 1M
export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export function getRelativeTime(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return past.toLocaleDateString();
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function getStreakStatus(streak: number, shields: number): {
  isAtRisk: boolean;
  canProtect: boolean;
  message: string;
} {
  if (streak === 0) {
    return { isAtRisk: false, canProtect: false, message: 'Start your streak today!' };
  }
  const isAtRisk = shields === 0;
  return {
    isAtRisk,
    canProtect: shields > 0,
    message: isAtRisk
      ? 'Your streak is at risk! Complete a quest to protect it.'
      : `${shields} shield${shields > 1 ? 's' : ''} protecting your streak`,
  };
}

export function calculatePetMood(
  questsCompletedToday: number,
  streak: number
): 'happy' | 'content' | 'tired' | 'sleepy' {
  if (questsCompletedToday >= 3 && streak >= 7) return 'happy';
  if (questsCompletedToday >= 2 && streak >= 3) return 'content';
  if (questsCompletedToday >= 1 || streak >= 1) return 'tired';
  return 'sleepy';
}

// Rule-based risk score: calendar fullness (50%), completion rate (30%), streak benefit (up to -20pts)
export function calculateTomorrowRisk(
  calendarFullness: number,    // 0-100%
  averageCompletionRate: number, // 0-100%
  currentStreak: number
): {
  score: number;
  level: 'low' | 'medium' | 'high';
  reason: string;
} {
  let score = calendarFullness * 0.5;
  score += (100 - averageCompletionRate) * 0.3;
  score -= Math.min(currentStreak * 2, 20);
  score = Math.max(0, Math.min(100, score));

  let level: 'low' | 'medium' | 'high';
  let reason: string;

  if (score < 30) {
    level = 'low';
    reason = 'Your schedule looks manageable tomorrow.';
  } else if (score < 60) {
    level = 'medium';
    reason = 'Moderate schedule tomorrow. Plan ahead!';
  } else {
    level = 'high';
    reason = `Your schedule is ${calendarFullness}% full tomorrow.`;
  }

  return { score: Math.round(score), level, reason };
}

export function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
}

// Haversine formula — checks whether user coordinates fall within rangeMeters of a target point
export function isWithinRange(
  userLat: number,
  userLng: number,
  targetLat: number,
  targetLng: number,
  rangeMeters: number = 100
): boolean {
  const R = 6371e3; // Earth's radius in metres
  const φ1 = (userLat * Math.PI) / 180;
  const φ2 = (targetLat * Math.PI) / 180;
  const Δφ = ((targetLat - userLat) * Math.PI) / 180;
  const Δλ = ((targetLng - userLng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c <= rangeMeters;
}

export function playSound(soundName: 'complete' | 'levelup' | 'notification'): void {
  if (typeof window === 'undefined') return;

  const sounds: Record<string, string> = {
    complete: '/sounds/complete.mp3',
    levelup: '/sounds/levelup.mp3',
    notification: '/sounds/notification.mp3',
  };

  const audio = new Audio(sounds[soundName]);
  audio.volume = 0.5;
  audio.play().catch(() => {
    // Ignore autoplay restrictions
  });
}

export function vibrate(pattern: number | number[] = 100): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}
