import { NextRequest, NextResponse } from 'next/server';

const mockDailyQuests = {
  date: new Date().toISOString().split('T')[0],
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
    status: 'active',
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
  xpEarned: 0,
};

// GET /api/quests - Get today's daily quests
export async function GET(_request: NextRequest) {
  try {
    // TODO: Replace with actual DynamoDB query
    return NextResponse.json({
      success: true,
      data: mockDailyQuests,
    });
  } catch (error) {
    console.error('Error fetching quests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quests' },
      { status: 500 }
    );
  }
}

// POST /api/quests - Complete a quest
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questId, action } = body;

    if (!questId) {
      return NextResponse.json(
        { success: false, error: 'Quest ID is required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual DynamoDB update
    const xpGained = action === 'complete' ? 50 : 0;

    return NextResponse.json({
      success: true,
      data: {
        questId,
        action,
        xpGained,
        newTotalXP: 2390,
        levelUp: false,
        streakUpdated: true,
        newStreak: 13,
      },
    });
  } catch (error) {
    console.error('Error completing quest:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to complete quest' },
      { status: 500 }
    );
  }
}
