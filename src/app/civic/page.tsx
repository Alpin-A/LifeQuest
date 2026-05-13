'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { KINGSTON_CIVIC_QUESTS } from '@/data/civicQuests';
import { CIVIC_QUEST_MULTIPLIER } from '@/lib/constants';

export default function CivicQuestsPage() {
  const [filter, setFilter] = useState<'all' | 'location' | 'other'>('all');
  const [completedQuests, setCompletedQuests] = useState<string[]>(['civic-005']);

  const filteredQuests = KINGSTON_CIVIC_QUESTS.filter(quest => {
    if (filter === 'all') return true;
    if (filter === 'location') return quest.verificationMethod === 'location';
    return quest.verificationMethod !== 'location';
  });

  const totalCivicXP = completedQuests.reduce((acc, id) => {
    const quest = KINGSTON_CIVIC_QUESTS.find(q => q.questId === id);
    return acc + (quest ? quest.xpReward * CIVIC_QUEST_MULTIPLIER : 0);
  }, 0);

  return (
    <main className="min-h-screen pb-24 bg-hero-pattern">
      {/* Header */}
      <header className="sticky top-0 z-30 glass border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <a href="/" className="p-2 hover:bg-bg-card rounded-lg transition-colors">
            <span className="text-xl">←</span>
          </a>
          <h1 className="font-display text-lg font-bold">Kingston Civic Quests</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card card-civic text-center py-8"
        >
          <span className="text-5xl mb-4 block">🏛️</span>
          <h2 className="font-display text-2xl font-bold mb-2">Support Your Community</h2>
          <p className="text-text-secondary mb-4">
            Earn <span className="text-accent-green font-bold">2x XP</span> on all civic quests!
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-green/20 rounded-full">
            <span className="text-accent-green font-display font-bold text-xl">
              {totalCivicXP}
            </span>
            <span className="text-accent-green text-sm">Total Civic XP Earned</span>
          </div>
        </motion.section>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'All Quests', count: KINGSTON_CIVIC_QUESTS.length },
            { id: 'location', label: '📍 Location', count: KINGSTON_CIVIC_QUESTS.filter(q => q.verificationMethod === 'location').length },
            { id: 'other', label: '🎤 Other', count: KINGSTON_CIVIC_QUESTS.filter(q => q.verificationMethod !== 'location').length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as 'all' | 'location' | 'other')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                filter === tab.id
                  ? 'bg-accent-green text-bg-primary'
                  : 'bg-bg-card text-text-secondary hover:bg-bg-hover'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Quest List */}
        <section className="space-y-4">
          {filteredQuests.map((quest, index) => {
            const isCompleted = completedQuests.includes(quest.questId);
            const displayXP = quest.xpReward * CIVIC_QUEST_MULTIPLIER;

            return (
              <motion.div
                key={quest.questId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`card quest-card quest-civic ${isCompleted ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {quest.verificationMethod === 'location' && (
                        <span className="text-xs px-2 py-0.5 bg-accent-cyan/20 text-accent-cyan rounded-full">
                          📍 {quest.location?.name}
                        </span>
                      )}
                      {quest.verificationMethod === 'voice_report' && (
                        <span className="text-xs px-2 py-0.5 bg-accent-purple/20 text-accent-purple rounded-full">
                          🎤 Voice Report
                        </span>
                      )}
                      {quest.verificationMethod === 'step_tracker' && (
                        <span className="text-xs px-2 py-0.5 bg-accent-orange/20 text-accent-orange rounded-full">
                          👟 Steps
                        </span>
                      )}
                      {quest.verificationMethod === 'self_report' && (
                        <span className="text-xs px-2 py-0.5 bg-text-muted/20 text-text-secondary rounded-full">
                          ✓ Self Report
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-accent-green text-lg">✓</span>
                      )}
                    </div>
                    
                    <h3 className="font-semibold mb-1">{quest.title}</h3>
                    <p className="text-text-secondary text-sm mb-3">
                      {quest.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-accent-green font-bold">
                        +{displayXP} XP
                        <span className="text-xs text-text-muted ml-1">(2x)</span>
                      </span>
                      <span className="text-text-muted">
                        ⏱️ ~{quest.duration} min
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {isCompleted ? (
                      <div className="px-4 py-2 bg-accent-green/20 text-accent-green rounded-lg font-semibold text-sm">
                        Done!
                      </div>
                    ) : (
                      <>
                        {quest.verificationMethod === 'location' ? (
                          <button className="btn btn-civic text-sm">
                            Navigate
                          </button>
                        ) : quest.verificationMethod === 'voice_report' ? (
                          <button className="btn btn-primary text-sm">
                            🎤 Report
                          </button>
                        ) : (
                          <button 
                            onClick={() => setCompletedQuests([...completedQuests, quest.questId])}
                            className="btn btn-secondary text-sm"
                          >
                            Complete
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Kingston Map Teaser */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card text-center py-8"
        >
          <span className="text-4xl mb-3 block">🗺️</span>
          <h3 className="font-semibold mb-2">Explore Kingston</h3>
          <p className="text-text-secondary text-sm mb-4">
            View all quest locations on an interactive map
          </p>
          <button className="btn btn-secondary">
            Open Map View
          </button>
        </motion.section>

        {/* Impact Stats */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <h3 className="font-semibold mb-4 text-center">Your Civic Impact</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-accent-green">
                {completedQuests.length}
              </p>
              <p className="text-xs text-text-secondary">Quests Done</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-accent-cyan">
                2.3
              </p>
              <p className="text-xs text-text-secondary">km Walked</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-accent-gold">
                1
              </p>
              <p className="text-xs text-text-secondary">Reports Filed</p>
            </div>
          </div>
        </motion.section>
      </div>

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
        <a href="/civic" className="nav-item active">
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
