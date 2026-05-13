import { NextRequest, NextResponse } from 'next/server';

const mockLeaderboard = [
  { userId: 'u1', username: 'AlexTheGreat', weeklyXP: 1250, rank: 1, petType: 'dragon', streak: 14 },
  { userId: 'u2', username: 'SarahQuester', weeklyXP: 1180, rank: 2, petType: 'phoenix', streak: 21, isRival: true },
  { userId: 'current', username: 'You', weeklyXP: 1020, rank: 3, petType: 'spirit', streak: 12 },
  { userId: 'u4', username: 'MikeHero', weeklyXP: 890, rank: 4, petType: 'golem', streak: 7 },
  { userId: 'u5', username: 'EmmaChamp', weeklyXP: 780, rank: 5, petType: 'phoenix', streak: 5 },
  { userId: 'u6', username: 'JakeRunner', weeklyXP: 720, rank: 6, petType: 'dragon', streak: 3 },
  { userId: 'u7', username: 'LilyFocus', weeklyXP: 650, rank: 7, petType: 'spirit', streak: 9 },
  { userId: 'u8', username: 'TomBuilder', weeklyXP: 580, rank: 8, petType: 'golem', streak: 4 },
  { userId: 'u9', username: 'RoseAchiever', weeklyXP: 520, rank: 9, petType: 'phoenix', streak: 6 },
  { userId: 'u10', username: 'MaxPower', weeklyXP: 480, rank: 10, petType: 'dragon', streak: 2 },
];

// GET /api/leaderboard - Get current league standings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const leagueId = searchParams.get('leagueId');

    // TODO: Replace with actual DynamoDB query

    return NextResponse.json({
      success: true,
      data: {
        league: {
          id: leagueId || 'gold-league-001',
          tier: 'gold',
          weekNumber: 3,
          daysRemaining: 4,
          promotionZone: 3,
          demotionZone: 8,
        },
        entries: mockLeaderboard,
        currentUserRank: 3,
      },
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}

// POST /api/leaderboard - Gift a streak shield to a friend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, targetUserId } = body;

    if (action === 'gift_shield') {
      if (!targetUserId) {
        return NextResponse.json(
          { success: false, error: 'Target user ID is required' },
          { status: 400 }
        );
      }

      // TODO: Replace with actual DynamoDB transaction
      // Needs to: decrement sender's available gifts, increment target's shields,
      // create a notification for the target, and store a memory event for both users.

      return NextResponse.json({
        success: true,
        data: {
          action: 'gift_shield',
          targetUserId,
          message: 'Streak Shield sent successfully!',
          canGiftAgainAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      });
    }

    return NextResponse.json(
      { success: false, error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error processing leaderboard action:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process action' },
      { status: 500 }
    );
  }
}

// PUT /api/leaderboard - Update XP after quest completion
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, xpGained } = body;

    // TODO: Replace with actual DynamoDB update
    // Needs to: update weekly XP, recalculate rank, check for rival overtakes,
    // and send notifications if rank changed.

    const previousRank = 4;
    const newRank = 3;
    const overtakenUsers = previousRank > newRank ? ['MikeHero'] : [];

    return NextResponse.json({
      success: true,
      data: {
        userId,
        xpGained,
        newWeeklyXP: 1020 + xpGained,
        previousRank,
        newRank,
        overtakenUsers,
        wasOvertaken: false,
      },
    });
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update leaderboard' },
      { status: 500 }
    );
  }
}
