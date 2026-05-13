'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PET_TYPES, PET_MOODS, PET_EVOLUTION_LEVELS } from '@/lib/constants';

const mockPet = {
  name: 'Blaze',
  type: 'dragon' as const,
  mood: 'happy' as const,
  evolution: 2,
  happiness: 85,
  xpToEvolve: 1500,
  currentXP: 1200,
};

const mockMilestones = [
  { level: 1, name: 'Hatchling', unlocked: true },
  { level: 5, name: 'Youngling', unlocked: true },
  { level: 10, name: 'Adolescent', unlocked: false },
  { level: 20, name: 'Adult', unlocked: false },
  { level: 35, name: 'Elder', unlocked: false },
];

export default function PetPage() {
  const [showFeedModal, setShowFeedModal] = useState(false);
  const [isFeeding, setIsFeeding] = useState(false);

  const petInfo = PET_TYPES[mockPet.type];
  const moodInfo = PET_MOODS[mockPet.mood];
  const evolutionProgress = (mockPet.currentXP / mockPet.xpToEvolve) * 100;

  const handleFeed = () => {
    setIsFeeding(true);
    setTimeout(() => {
      setIsFeeding(false);
      setShowFeedModal(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen pb-24 bg-hero-pattern">
      {/* Header */}
      <header className="sticky top-0 z-30 glass border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="p-2 hover:bg-bg-card rounded-lg transition-colors">
              <span className="text-xl">←</span>
            </a>
            <h1 className="font-display text-lg font-bold">Your Pet</h1>
          </div>
          <button className="p-2 hover:bg-bg-card rounded-lg transition-colors">
            <span className="text-xl">⚙️</span>
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Pet Display */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card text-center py-12 relative overflow-hidden"
        >
          {/* Background Effect */}
          <div className="absolute inset-0 bg-gradient-radial from-accent-purple/10 to-transparent" />
          
          {/* Pet Avatar */}
          <motion.div
            className={`text-9xl mb-6 inline-block ${
              mockPet.mood === 'happy' ? 'pet-happy' : 
              mockPet.mood === 'sleepy' ? 'pet-sleepy' : 
              'pet-idle'
            }`}
            animate={isFeeding ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {petInfo.emoji}
          </motion.div>

          {/* Pet Name & Info */}
          <h2 className="font-display text-3xl font-bold mb-1">{mockPet.name}</h2>
          <p className="text-text-secondary mb-4">
            {petInfo.name} • {petInfo.description}
          </p>

          {/* Mood Indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-secondary rounded-full">
            <span className="text-xl">{moodInfo.emoji}</span>
            <span className={`font-semibold text-accent-${moodInfo.color}`}>
              {mockPet.mood.charAt(0).toUpperCase() + mockPet.mood.slice(1)}
            </span>
            <div className="w-px h-4 bg-white/10" />
            <span className="text-sm text-text-secondary">
              {mockPet.happiness}% Happiness
            </span>
          </div>
        </motion.section>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFeedModal(true)}
            className="card py-6 text-center hover:border-accent-green/50"
          >
            <span className="text-4xl mb-2 block">🍎</span>
            <span className="font-semibold">Feed Pet</span>
            <span className="text-xs text-text-secondary block mt-1">2-min quest</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="card py-6 text-center hover:border-accent-purple/50"
          >
            <span className="text-4xl mb-2 block">🎨</span>
            <span className="font-semibold">Customize</span>
            <span className="text-xs text-text-secondary block mt-1">Unlock at Lv 4</span>
          </motion.button>
        </div>

        {/* Evolution Progress */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Evolution Progress</h3>
            <span className="text-sm text-accent-purple">
              Stage {mockPet.evolution} / 5
            </span>
          </div>

          {/* Progress Bar */}
          <div className="xp-bar h-3 mb-4">
            <motion.div 
              className="xp-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${evolutionProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <p className="text-sm text-text-secondary text-center mb-6">
            {mockPet.currentXP.toLocaleString()} / {mockPet.xpToEvolve.toLocaleString()} XP to next evolution
          </p>

          {/* Evolution Stages */}
          <div className="flex justify-between items-center relative">
            {/* Progress Line */}
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-bg-secondary -z-10" />
            <div 
              className="absolute left-0 top-1/2 h-1 bg-xp-gradient -z-10 transition-all duration-500"
              style={{ width: `${((mockPet.evolution - 1) / 4) * 100}%` }}
            />

            {mockMilestones.map((milestone, index) => (
              <div 
                key={milestone.level}
                className={`flex flex-col items-center ${
                  milestone.unlocked ? 'text-text-primary' : 'text-text-muted'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  milestone.unlocked 
                    ? 'bg-xp-gradient text-white' 
                    : 'bg-bg-secondary'
                }`}>
                  {milestone.unlocked ? '✓' : index + 1}
                </div>
                <span className="text-xs font-medium">{milestone.name}</span>
                <span className="text-xs text-text-muted">Lv {milestone.level}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Pet Stats */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <h3 className="font-semibold mb-4">Pet Stats</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Happiness</span>
                <span className="font-semibold">{mockPet.happiness}%</span>
              </div>
              <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent-green rounded-full transition-all"
                  style={{ width: `${mockPet.happiness}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Energy</span>
                <span className="font-semibold">72%</span>
              </div>
              <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent-cyan rounded-full transition-all"
                  style={{ width: '72%' }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Bond Level</span>
                <span className="font-semibold">Level 4</span>
              </div>
              <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent-purple rounded-full transition-all"
                  style={{ width: '60%' }}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Pet Types Gallery */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h3 className="font-semibold mb-4">All Pet Types</h3>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(PET_TYPES).map(([key, pet]) => (
              <div 
                key={key}
                className={`text-center p-3 rounded-xl transition-all ${
                  mockPet.type === key 
                    ? 'bg-accent-purple/20 border border-accent-purple/30' 
                    : 'bg-bg-secondary hover:bg-bg-hover'
                }`}
              >
                <span className="text-3xl block mb-1">{pet.emoji}</span>
                <span className="text-xs font-medium">{pet.name}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Care Tips */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="font-semibold mb-4">💡 Care Tips</h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Complete daily quests to keep your pet happy</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Feed your pet with quick 2-min quests when mood drops</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Maintain streaks for bonus happiness points</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Reach level milestones to unlock new evolutions!</span>
            </li>
          </ul>
        </motion.section>
      </div>

      {/* Feed Modal */}
      {showFeedModal && (
        <div className="modal-overlay" onClick={() => !isFeeding && setShowFeedModal(false)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="modal-content text-center max-w-sm"
            onClick={e => e.stopPropagation()}
          >
            {isFeeding ? (
              <>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="text-7xl mb-4"
                >
                  {petInfo.emoji}
                </motion.div>
                <p className="text-xl font-display font-bold mb-2">Feeding {mockPet.name}...</p>
                <p className="text-text-secondary">Your pet is loving it! 💕</p>
              </>
            ) : (
              <>
                <span className="text-6xl mb-4 block">🍎</span>
                <h3 className="text-xl font-display font-bold mb-2">Feed Your Pet</h3>
                <p className="text-text-secondary mb-6">
                  Complete a quick 2-minute quest to boost {mockPet.name}&apos;s happiness!
                </p>
                <div className="space-y-3">
                  <button onClick={handleFeed} className="btn btn-primary w-full">
                    🧘 2-min Breathing Exercise
                  </button>
                  <button onClick={handleFeed} className="btn btn-secondary w-full">
                    💧 Drink a Glass of Water
                  </button>
                  <button onClick={handleFeed} className="btn btn-secondary w-full">
                    🚶 Quick Stretch Break
                  </button>
                </div>
                <button 
                  onClick={() => setShowFeedModal(false)}
                  className="mt-4 text-text-secondary hover:text-text-primary transition-colors"
                >
                  Cancel
                </button>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <a href="/" className="nav-item">
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
        <a href="/pet" className="nav-item active">
          <span className="text-xl">🐉</span>
          <span className="text-xs">Pet</span>
        </a>
      </nav>
    </main>
  );
}
