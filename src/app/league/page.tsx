'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const mockLeaderboard = [
  { rank: 1, username: 'AlexTheGreat', petType: '🐉', weeklyXP: 1250, streak: 14, isRival: false },
  { rank: 2, username: 'SarahQuester', petType: '🦅', weeklyXP: 1180, streak: 21, isRival: true },
  { rank: 3, username: 'You', petType: '👻', weeklyXP: 1020, streak: 12, isCurrentUser: true },
  { rank: 4, username: 'MikeHero', petType: '🔥', weeklyXP: 890, streak: 7, isRival: false },
  { rank: 5, username: 'EmmaChamp', petType: '🌟', weeklyXP: 780, streak: 5, isRival: false },
  { rank: 6, username: 'JakeRunner', petType: '⚡', weeklyXP: 720, streak: 3, isRival: false },
  { rank: 7, username: 'LilyFocus', petType: '🦋', weeklyXP: 650, streak: 9, isRival: false },
  { rank: 8, username: 'TomBuilder', petType: '🗿', weeklyXP: 580, streak: 4, isRival: false },
];

const mockRivalAlert = {
  rivalName: 'SarahQuester',
  message: "Sarah just overtook you on the leaderboard! Are you going to let her win?",
  hasVoice: true,
};

export default function LeaguePage() {
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState('');
  const [view, setView] = useState<'league' | 'friends'>('league');

  const currentUser = mockLeaderboard.find(u => u.isCurrentUser);
  const promotionZone = 3;
  const demotionZone = mockLeaderboard.length - 3;

  return (
    <main className="min-h-screen pb-24 bg-hero-pattern">
      {/* Header */}
      <header className="sticky top-0 z-30 glass border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="p-2 hover:bg-bg-card rounded-lg transition-colors">
              <span className="text-xl">←</span>
            </a>
            <h1 className="font-display text-lg font-bold">Leaderboard</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView('league')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                view === 'league'
                  ? 'bg-accent-gold text-bg-primary'
                  : 'bg-bg-card text-text-secondary'
              }`}
            >
              League
            </button>
            <button
              onClick={() => setView('friends')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                view === 'friends'
                  ? 'bg-accent-gold text-bg-primary'
                  : 'bg-bg-card text-text-secondary'
              }`}
            >
              Friends
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* League Info */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl">🥇</span>
            <h2 className="font-display text-2xl font-bold text-gradient-gold">Gold League</h2>
          </div>
          <p className="text-text-secondary text-sm mb-4">Week 3 • 4 days remaining</p>
          
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/5">
            <div>
              <p className="text-lg font-display font-bold text-accent-green">Top 3</p>
              <p className="text-xs text-text-secondary">→ Platinum</p>
            </div>
            <div>
              <p className="text-lg font-display font-bold">4-17</p>
              <p className="text-xs text-text-secondary">Stay in Gold</p>
            </div>
            <div>
              <p className="text-lg font-display font-bold text-accent-red">18-20</p>
              <p className="text-xs text-text-secondary">→ Silver</p>
            </div>
          </div>
        </motion.section>

        {/* Rival Alert */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card border-accent-red/30"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">⚡</span>
            <h3 className="font-bold text-accent-red">RIVAL ALERT!</h3>
          </div>
          <p className="text-text-secondary text-sm mb-3">{mockRivalAlert.message}</p>
          <div className="flex gap-2">
            {mockRivalAlert.hasVoice && (
              <button className="flex items-center gap-2 px-4 py-2 bg-accent-purple/20 text-accent-purple rounded-lg hover:bg-accent-purple/30 transition-colors">
                <span>🔊</span>
                <span className="text-sm font-medium">Play Message</span>
              </button>
            )}
            <button className="btn btn-primary flex-1">
              🎯 Quick Quest
            </button>
          </div>
        </motion.section>

        {/* Leaderboard */}
        <section className="space-y-2">
          {mockLeaderboard.map((user, index) => (
            <motion.div
              key={user.username}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`leaderboard-row ${user.isCurrentUser ? 'current-user' : ''}`}
            >
              {/* Rank Badge */}
              <div className={`rank-badge mr-4 ${
                user.rank === 1 ? 'rank-1' : 
                user.rank === 2 ? 'rank-2' : 
                user.rank === 3 ? 'rank-3' : 
                'bg-bg-card'
              }`}>
                {user.rank}
              </div>

              {/* Pet & Username */}
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">{user.petType}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{user.username}</p>
                    {user.isRival && (
                      <span className="text-xs px-2 py-0.5 bg-accent-red/20 text-accent-red rounded-full">
                        Rival
                      </span>
                    )}
                    {user.isCurrentUser && (
                      <span className="text-xs px-2 py-0.5 bg-accent-purple/20 text-accent-purple rounded-full">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <span>🔥 {user.streak}</span>
                  </div>
                </div>
              </div>

              {/* Weekly XP */}
              <div className="text-right">
                <p className="font-display font-bold text-gradient">{user.weeklyXP.toLocaleString()}</p>
                <p className="text-xs text-text-muted">XP this week</p>
              </div>
            </motion.div>
          ))}

          {/* Zone Indicators */}
          <div className="pt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-accent-green">
              <div className="w-4 h-0.5 bg-accent-green"></div>
              <span>↑ Promotion Zone (Top 3)</span>
            </div>
            <div className="flex items-center gap-2 text-accent-red">
              <div className="w-4 h-0.5 bg-accent-red"></div>
              <span>↓ Demotion Zone (Bottom 3)</span>
            </div>
          </div>
        </section>

        {/* Gift Shield */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🎁</span>
            <div>
              <h3 className="font-semibold">Gift a Streak Shield</h3>
              <p className="text-sm text-text-secondary">Help a friend protect their streak</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <select 
              value={selectedFriend}
              onChange={(e) => setSelectedFriend(e.target.value)}
              className="flex-1 bg-bg-secondary border border-white/10 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-purple"
            >
              <option value="">Select a friend...</option>
              {mockLeaderboard.filter(u => !u.isCurrentUser).map(user => (
                <option key={user.username} value={user.username}>
                  {user.petType} {user.username}
                </option>
              ))}
            </select>
            <button 
              className="btn btn-primary"
              disabled={!selectedFriend}
            >
              Send Shield
            </button>
          </div>
          
          <p className="text-xs text-text-muted mt-2">
            You can gift 1 shield per week to each friend
          </p>
        </motion.section>

        {/* Your Stats */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h3 className="font-semibold mb-4">Your Weekly Performance</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xl font-display font-bold">#3</p>
              <p className="text-xs text-text-secondary">Rank</p>
            </div>
            <div>
              <p className="text-xl font-display font-bold text-gradient">1,020</p>
              <p className="text-xs text-text-secondary">Weekly XP</p>
            </div>
            <div>
              <p className="text-xl font-display font-bold">12</p>
              <p className="text-xs text-text-secondary">Quests</p>
            </div>
            <div>
              <p className="text-xl font-display font-bold text-accent-orange">+2</p>
              <p className="text-xs text-text-secondary">vs Last Week</p>
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
        <a href="/civic" className="nav-item">
          <span className="text-xl">🏛️</span>
          <span className="text-xs">Kingston</span>
        </a>
        <a href="/league" className="nav-item active">
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
