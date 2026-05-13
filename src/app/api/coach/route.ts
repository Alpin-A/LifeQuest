import { NextRequest, NextResponse } from 'next/server';

// POST /api/coach - Get personalized coach message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { context } = body;

    // TODO: Replace with actual Backboard.io integration
    const mockMessages: Record<string, string> = {
      morning: "Good morning! Based on your patterns, you're most productive between 9-11 AM. Let's tackle your Main Quest during that window!",
      slump: "Hey! Last Tuesday you had an energy slump around 2 PM because you were dehydrated. It's almost that time—drink some water now to stay ahead of it!",
      streak_risk: "Your streak is at risk! Remember, last week when you missed a day, your productivity dropped 30% the next day. Let's protect that momentum!",
      rival: "Sarah just overtook you on the leaderboard! Looking at your history, you usually crush it when challenged. Time to show what you're made of!",
      default: "You've been consistently completing your Side Quests but skipping Boss Quests. Today's Boss Quest aligns with your career goals—give it a try!",
    };

    const messageKey = context?.type || 'default';
    const message = mockMessages[messageKey] || mockMessages.default;

    return NextResponse.json({
      success: true,
      data: {
        message,
        memoryReference: context?.type || 'general_coaching',
        hasVoice: true,
        voiceUrl: null,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error generating coach message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate coach message' },
      { status: 500 }
    );
  }
}

// PUT /api/coach - Store a memory event for future personalization
export async function PUT(request: NextRequest) {
  try {
    // TODO: Replace with actual Backboard.io memory storage
    await request.json();

    return NextResponse.json({
      success: true,
      data: {
        eventId: `event-${Date.now()}`,
        stored: true,
      },
    });
  } catch (error) {
    console.error('Error storing memory event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to store memory event' },
      { status: 500 }
    );
  }
}
