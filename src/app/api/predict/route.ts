import { NextRequest, NextResponse } from 'next/server';

// POST /api/predict - Get tomorrow's quest failure risk score
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { calendarData } = body;

    // TODO: Replace with actual AWS SageMaker integration

    // Rule-based fallback: calendar fullness (50%), completion rate (30%), streak benefit (up to -20pts)
    const calendarFullness = calendarData?.fullness || 75;
    const historicalCompletionRate = 78; // would come from DynamoDB
    const currentStreak = 12;

    let riskScore = 0;
    const reasons: string[] = [];

    if (calendarFullness > 80) {
      riskScore += 40;
      reasons.push(`Your calendar is ${calendarFullness}% full tomorrow`);
    } else if (calendarFullness > 60) {
      riskScore += 25;
      reasons.push(`Moderately busy day ahead (${calendarFullness}% scheduled)`);
    } else {
      riskScore += 10;
    }

    if (historicalCompletionRate < 50) {
      riskScore += 30;
      reasons.push('Recent completion rate is below average');
    } else if (historicalCompletionRate < 70) {
      riskScore += 15;
    }

    if (currentStreak >= 14) {
      riskScore -= 20;
      reasons.push('Strong streak momentum working in your favor');
    } else if (currentStreak >= 7) {
      riskScore -= 10;
    }

    riskScore = Math.max(0, Math.min(100, riskScore));

    let riskLevel: 'low' | 'medium' | 'high';
    if (riskScore < 30) {
      riskLevel = 'low';
    } else if (riskScore < 60) {
      riskLevel = 'medium';
    } else {
      riskLevel = 'high';
    }

    const suggestions = [];
    if (calendarFullness > 70) {
      suggestions.push({
        type: 'reschedule',
        message: 'Consider moving your gym session to 7 AM before meetings start',
        action: 'reschedule_to_morning',
      });
    }
    if (riskScore > 50) {
      suggestions.push({
        type: 'simplify',
        message: 'Focus on the Main Quest only tomorrow',
        action: 'simplify_quests',
      });
    }
    suggestions.push({
      type: 'shield',
      message: 'Use a Streak Shield as backup protection',
      action: 'activate_shield',
    });

    return NextResponse.json({
      success: true,
      data: {
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
        riskScore,
        riskLevel,
        reason: reasons[0] || 'Analysis complete',
        allReasons: reasons,
        suggestions,
        modelVersion: 'rule-based-v1', // will be 'sagemaker-v1' in production
        analyzedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error generating prediction:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate prediction' },
      { status: 500 }
    );
  }
}

// GET /api/predict - Get historical predictions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');

    // TODO: Fetch from DynamoDB

    const mockHistory = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
        riskScore: Math.floor(Math.random() * 60) + 20,
        riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        actualOutcome: Math.random() > 0.3 ? 'completed' : 'missed',
        accuracy: Math.random() > 0.5,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        history: mockHistory,
        accuracyRate: 78,
      },
    });
  } catch (error) {
    console.error('Error fetching prediction history:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch prediction history' },
      { status: 500 }
    );
  }
}
