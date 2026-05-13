'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const mockUser = {
  username: 'QuestHero',
  level: 7,
  xp: 2340,
  xpToNext: 4000,
  streak: 12,
  streakShields: 3,
  petName: 'Blaze',
  petType: 'dragon',
  petMood: 'happy',
};

const mockDailyQuests = {
  main: {
    id: '1',
    title: '30 min deep work session',
    description: 'Complete a focused work session without distractions',
    xpReward: 50,
    type: 'main',
    duration: 30,
    completed: false,
  },
  side: {
    id: '2',
    title: 'Drink 8 glasses of water',
    description: 'Stay hydrated throughout the day',
    xpReward: 20,
    type: 'side',
    duration: 0,
    completed: true,
  },
  boss: {
    id: '3',
    title: 'Complete job application',
    description: 'Apply to one position that excites you',
    xpReward: 100,
    type: 'boss',
    duration: 45,
    completed: false,
  },
};

const mockCoachMessage = {
  message: "Hey! Last Tuesday you had an energy slump around 2 PM because you skipped lunch. It's almost that time—grab a healthy snack now to stay ahead of it!",
  hasVoice: true,
};

export default function HomePage() {
  const [showXPGain, setShowXPGain] = useState(false);
  const [completedQuest, setCompletedQuest] = useState<string | null>(null);

  const handleCompleteQuest = (questId: string, xp: number) => {
    setCompletedQuest(questId);
    setShowXPGain(true);
    setTimeout(() => setShowXPGain(false), 1500);
  };

  const xpProgress = (mockUser.xp / mockUser.xpToNext) * 100;

  return (
    <main className="min-h-screen pb-24 bg-hero-pattern">
      {/* XP Gain Animation */}
      <AnimatePresence>
        {showXPGain && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -50, scale: 1 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 text-4xl font-display font-bold text-accent-gold"
            style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}
          >
            +50 XP
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-30 glass border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-xl font-bold text-gradient">LifeQuest</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Pet Avatar */}
            <motion.div 
              className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center text-2xl pet-idle"
              whileHover={{ scale: 1.1 }}
            >
              🐉
            </motion.div>
            {/* Notifications */}
            <button className="relative p-2 rounded-full hover:bg-bg-card transition-colors">
              <span className="text-xl">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-red rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Card */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card card-glow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`relative ${mockUser.streak >= 7 ? 'streak-fire' : ''}`}>
                <span className="text-3xl">🔥</span>
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{mockUser.streak} Day Streak</p>
                <p className="text-text-secondary text-sm">
                  {mockUser.streakShields} shields remaining
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary">Level {mockUser.level}</p>
              <p className="font-display font-bold text-gradient">{mockUser.xp.toLocaleString()} XP</p>
            </div>
          </div>
          
          {/* XP Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-text-secondary">
              <span>Progress to Level {mockUser.level + 1}</span>
              <span>{Math.round(xpProgress)}%</span>
            </div>
            <div className="xp-bar">
              <motion.div 
                className="xp-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-text-muted text-right">
              {(mockUser.xpToNext - mockUser.xp).toLocaleString()} XP to next level
            </p>
          </div>
        </motion.section>

        {/* Daily Quests */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">📋 Today&apos;s Quests</h2>
            <span className="text-text-secondary text-sm">1/3 completed</span>
          </div>

          {/* Main Quest */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card quest-card quest-main"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">⚔️</span>
                  <span className="text-xs font-bold text-accent-purple uppercase tracking-wider">
                    Main Quest
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{mockDailyQuests.main.title}</h3>
                <p className="text-text-secondary text-sm mb-3">
                  {mockDailyQuests.main.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-accent-gold font-semibold">
                    +{mockDailyQuests.main.xpReward} XP
                  </span>
                  <span className="text-text-muted">
                    ⏱️ {mockDailyQuests.main.duration} min
                  </span>
                </div>
              </div>
              <button 
                onClick={() => handleCompleteQuest('1', 50)}
                className="btn btn-primary"
              >
                Start
              </button>
            </div>
          </motion.div>

          {/* Side Quest */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`card quest-card quest-side ${mockDailyQuests.side.completed ? 'opacity-60' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🎯</span>
                  <span className="text-xs font-bold text-accent-cyan uppercase tracking-wider">
                    Side Quest
                  </span>
                  {mockDailyQuests.side.completed && (
                    <span className="text-accent-green text-lg">✓</span>
                  )}
                </div>
                <h3 className="font-semibold mb-1">{mockDailyQuests.side.title}</h3>
                <p className="text-text-secondary text-sm mb-3">
                  {mockDailyQuests.side.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-accent-gold font-semibold">
                    +{mockDailyQuests.side.xpReward} XP
                  </span>
                </div>
              </div>
              {mockDailyQuests.side.completed ? (
                <div className="px-4 py-2 bg-accent-green/20 text-accent-green rounded-lg font-semibold">
                  Done!
                </div>
              ) : (
                <button className="btn btn-secondary">
                  Mark Done
                </button>
              )}
            </div>
          </motion.div>

          {/* Boss Quest */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card quest-card quest-boss card-gold"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">👑</span>
                  <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                    Boss Quest
                  </span>
                  <span className="text-xs text-text-muted">(Optional)</span>
                </div>
                <h3 className="font-semibold mb-1">{mockDailyQuests.boss.title}</h3>
                <p className="text-text-secondary text-sm mb-3">
                  {mockDailyQuests.boss.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-accent-gold font-semibold">
                    +{mockDailyQuests.boss.xpReward} XP
                  </span>
                  <span className="text-text-muted">
                    ⏱️ {mockDailyQuests.boss.duration} min
                  </span>
                </div>
              </div>
              <button className="btn btn-gold">
                Start
              </button>
            </div>
          </motion.div>
        </section>

        {/* Coach Message */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card border-accent-purple/30"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-2xl flex-shrink-0">
              🤖
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold">Coach Says</h3>
                <span className="text-xs px-2 py-0.5 bg-accent-purple/20 text-accent-purple rounded-full">
                  Powered by Backboard
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {mockCoachMessage.message}
              </p>
              {mockCoachMessage.hasVoice && (
                <button className="mt-3 flex items-center gap-2 text-accent-cyan hover:text-accent-cyan/80 transition-colors">
                  <span className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                    ▶️
                  </span>
                  <span className="text-sm font-medium">Play Voice Message</span>
                </button>
              )}
            </div>
          </div>
        </motion.section>

        {/* Tomorrow Prediction */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card border-accent-orange/30"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-orange to-accent-red flex items-center justify-center text-2xl flex-shrink-0">
              🔮
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Tomorrow&apos;s Prediction</h3>
                <span className="px-3 py-1 bg-accent-orange/20 text-accent-orange rounded-full text-sm font-bold">
                  78% Risk
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                Your calendar shows 90% full tomorrow. High probability of skipping the gym.
              </p>
              <button className="btn btn-secondary text-sm">
                ⏰ Reschedule to 7 AM
              </button>
            </div>
          </div>
        </motion.section>

        {/* Quick Actions */}
        <section className="grid grid-cols-2 gap-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="card flex flex-col items-center gap-2 py-6 hover:border-accent-green/50"
          >
            <span className="text-3xl">🏛️</span>
            <span className="font-semibold">Civic Quests</span>
            <span className="text-xs text-accent-green">2x XP</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="card flex flex-col items-center gap-2 py-6 hover:border-accent-cyan/50"
          >
            <span className="text-3xl">🏆</span>
            <span className="font-semibold">Leaderboard</span>
            <span className="text-xs text-accent-cyan">Rank #3</span>
          </motion.button>
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <a href="/" className="nav-item active">
          <span className="text-xl">🏠</span>
          <span className="text-xs">Home</span>
        </a>
        <a href="/quests" className="nav-item">
          <span className="text-xl">📋</span>
          <span className="text-xs">Quests</span>
        </a>
        <a href="/civic" className="nav-item">
          <span className="text-xl">🏛️</span>
          <span className="text-xs">Kingston</span>
        </a>
        <a href="/league" className="nav-item">
          <span className="text-xl">🏆</span>
          <span className="text-xs">League</span>
        </a>
        <a href="/pet" className="nav-item">
          <span className="text-xl">🐉</span>
          <span className="text-xs">Pet</span>
        </a>
      </nav>
    </main>
  );
}
