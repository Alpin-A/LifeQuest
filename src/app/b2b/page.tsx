'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const mockCompanyData = {
  name: 'TechCorp Inc.',
  totalEmployees: 127,
  activeUsers: 89,
  weekOf: 'January 12, 2026',
  overallStats: {
    avgSleepScore: 6.2,
    avgFocusScore: 78,
    questCompletionRate: 84,
    avgStreak: 5.3,
  },
  teams: [
    { id: '1', name: 'Engineering', memberCount: 34, completionRate: 89, sleepScore: 5.8, focusScore: 82, color: '#8b5cf6' },
    { id: '2', name: 'Sales', memberCount: 22, completionRate: 72, sleepScore: 6.5, focusScore: 71, color: '#06b6d4' },
    { id: '3', name: 'Marketing', memberCount: 18, completionRate: 65, sleepScore: 6.8, focusScore: 68, color: '#22c55e' },
    { id: '4', name: 'Support', memberCount: 15, completionRate: 81, sleepScore: 6.1, focusScore: 75, color: '#f97316' },
  ],
  alerts: [
    {
      teamId: '1',
      teamName: 'Engineering',
      alertType: 'sleep_deprivation',
      severity: 'warning',
      message: 'Engineering team averaging only 5.8 hours of sleep this week. Consider team wellness check.',
    },
  ],
};

export default function B2BDashboardPage() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('week');

  return (
    <main className="min-h-screen pb-8 bg-hero-pattern">
      {/* Header */}
      <header className="sticky top-0 z-30 glass border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="p-2 hover:bg-bg-card rounded-lg transition-colors">
              <span className="text-xl">←</span>
            </a>
            <div>
              <h1 className="font-display text-lg font-bold">Company Dashboard</h1>
              <p className="text-xs text-text-secondary">{mockCompanyData.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-accent-purple/20 text-accent-purple rounded-full">
              B2B Mode
            </span>
            <button className="btn btn-secondary text-sm">
              📊 Export
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Company Header */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🏢</span>
              <div>
                <h2 className="font-display text-xl font-bold">{mockCompanyData.name}</h2>
                <p className="text-sm text-text-secondary">
                  Week of {mockCompanyData.weekOf}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {(['week', 'month', 'quarter'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    timeRange === range
                      ? 'bg-accent-purple text-white'
                      : 'bg-bg-card text-text-secondary hover:bg-bg-hover'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-bg-secondary rounded-xl">
              <p className="text-3xl mb-1">😴</p>
              <p className="text-2xl font-display font-bold">{mockCompanyData.overallStats.avgSleepScore}h</p>
              <p className="text-xs text-text-secondary">Avg Sleep</p>
            </div>
            <div className="text-center p-4 bg-bg-secondary rounded-xl">
              <p className="text-3xl mb-1">🎯</p>
              <p className="text-2xl font-display font-bold">{mockCompanyData.overallStats.avgFocusScore}%</p>
              <p className="text-xs text-text-secondary">Focus Score</p>
            </div>
            <div className="text-center p-4 bg-bg-secondary rounded-xl">
              <p className="text-3xl mb-1">✅</p>
              <p className="text-2xl font-display font-bold">{mockCompanyData.overallStats.questCompletionRate}%</p>
              <p className="text-xs text-text-secondary">Quest Completion</p>
            </div>
            <div className="text-center p-4 bg-bg-secondary rounded-xl">
              <p className="text-3xl mb-1">🔥</p>
              <p className="text-2xl font-display font-bold">{mockCompanyData.overallStats.avgStreak}</p>
              <p className="text-xs text-text-secondary">Avg Streak</p>
            </div>
          </div>
        </motion.section>

        {/* Alerts */}
        {mockCompanyData.alerts.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card border-accent-orange/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">⚠️</span>
              <h3 className="font-bold text-accent-orange">Wellness Alerts</h3>
            </div>
            {mockCompanyData.alerts.map((alert, index) => (
              <div key={index} className="p-4 bg-accent-orange/10 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{alert.teamName}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    alert.severity === 'critical' 
                      ? 'bg-accent-red/20 text-accent-red' 
                      : 'bg-accent-orange/20 text-accent-orange'
                  }`}>
                    {alert.severity === 'critical' ? '🚨 Critical' : '⚠️ Warning'}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">{alert.message}</p>
                <div className="flex gap-2 mt-3">
                  <button className="btn btn-secondary text-sm">
                    View Details
                  </button>
                  <button className="btn btn-primary text-sm">
                    Notify HR
                  </button>
                </div>
              </div>
            ))}
          </motion.section>
        )}

        {/* Team Comparison */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h3 className="font-semibold mb-4">📊 Team Comparison</h3>
          
          <div className="space-y-4">
            {mockCompanyData.teams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedTeam === team.id 
                    ? 'bg-bg-hover border border-accent-purple/30' 
                    : 'bg-bg-secondary hover:bg-bg-hover'
                }`}
                onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: team.color }}
                    />
                    <span className="font-semibold">{team.name}</span>
                    <span className="text-xs text-text-muted">
                      {team.memberCount} members
                    </span>
                  </div>
                  <span className="font-display font-bold" style={{ color: team.color }}>
                    {team.completionRate}%
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="team-bar">
                  <div 
                    className="team-bar-fill"
                    style={{ 
                      width: `${team.completionRate}%`,
                      backgroundColor: team.color 
                    }}
                  />
                </div>

                {/* Expanded Details */}
                {selectedTeam === team.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/5"
                  >
                    <div className="text-center">
                      <p className="text-lg font-display font-bold">{team.sleepScore}h</p>
                      <p className="text-xs text-text-secondary">Avg Sleep</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-display font-bold">{team.focusScore}%</p>
                      <p className="text-xs text-text-secondary">Focus Score</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-display font-bold">{team.memberCount}</p>
                      <p className="text-xs text-text-secondary">Active Users</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Participation Stats */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="font-semibold mb-4">👥 Participation</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-bg-secondary rounded-xl text-center">
              <p className="text-3xl font-display font-bold text-accent-green">
                {mockCompanyData.activeUsers}
              </p>
              <p className="text-sm text-text-secondary">Active Users</p>
              <p className="text-xs text-text-muted mt-1">
                out of {mockCompanyData.totalEmployees} employees
              </p>
            </div>
            <div className="p-4 bg-bg-secondary rounded-xl text-center">
              <p className="text-3xl font-display font-bold text-accent-cyan">
                {Math.round((mockCompanyData.activeUsers / mockCompanyData.totalEmployees) * 100)}%
              </p>
              <p className="text-sm text-text-secondary">Adoption Rate</p>
              <p className="text-xs text-text-muted mt-1">
                +12% from last week
              </p>
            </div>
          </div>
        </motion.section>

        {/* Team Quests Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="font-semibold mb-4">🏆 Burnout Prevention Quests</h3>
          <p className="text-sm text-text-secondary mb-4">
            Create team challenges to improve wellness across departments
          </p>
          
          <div className="space-y-3">
            <div className="p-4 bg-bg-secondary rounded-xl flex items-center justify-between">
              <div>
                <p className="font-semibold">💤 Sleep Challenge</p>
                <p className="text-sm text-text-secondary">7+ hours avg sleep for a week</p>
              </div>
              <span className="text-xs px-3 py-1 bg-accent-green/20 text-accent-green rounded-full">
                Active
              </span>
            </div>
            <div className="p-4 bg-bg-secondary rounded-xl flex items-center justify-between">
              <div>
                <p className="font-semibold">🚶 Step Challenge</p>
                <p className="text-sm text-text-secondary">10,000 steps daily</p>
              </div>
              <span className="text-xs px-3 py-1 bg-text-muted/20 text-text-secondary rounded-full">
                Upcoming
              </span>
            </div>
          </div>
          
          <button className="btn btn-primary w-full mt-4">
            + Create New Team Quest
          </button>
        </motion.section>

        {/* Privacy Notice */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-text-muted p-4"
        >
          <p>🔒 All data is anonymized and aggregated at the team level.</p>
          <p>Individual employee data is never shared with management.</p>
        </motion.section>
      </div>
    </main>
  );
}
