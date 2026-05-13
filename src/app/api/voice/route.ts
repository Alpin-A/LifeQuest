import { NextRequest, NextResponse } from 'next/server';

// POST /api/voice - Generate a voice note via ElevenLabs
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, narratorStyle, type } = body;

    if (!text) {
      return NextResponse.json(
        { success: false, error: 'Text is required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual ElevenLabs integration
    // Select voiceId from env vars by narratorStyle, POST to /v1/text-to-speech/{voiceId},
    // upload the returned audio buffer to S3, return the resulting URL.

    const mockAudioUrls: Record<string, string> = {
      rival_alert: '/audio/rival-alert-mock.mp3',
      daily_checkin: '/audio/daily-checkin-mock.mp3',
      quest_complete: '/audio/quest-complete-mock.mp3',
      streak_warning: '/audio/streak-warning-mock.mp3',
      level_up: '/audio/level-up-mock.mp3',
    };

    return NextResponse.json({
      success: true,
      data: {
        id: `voice-${Date.now()}`,
        type: type || 'custom',
        audioUrl: mockAudioUrls[type] || null, // S3 URL in production
        transcript: text,
        narratorStyle: narratorStyle || 'hype_man',
        createdAt: new Date().toISOString(),
        isGenerated: false,
      },
    });
  } catch (error) {
    console.error('Error generating voice:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate voice' },
      { status: 500 }
    );
  }
}

// GET /api/voice - Fetch pre-generated voice notes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    // TODO: Fetch from S3/DynamoDB

    const mockVoiceNotes = [
      {
        id: 'voice-001',
        type: 'daily_checkin',
        audioUrl: '/audio/daily-checkin.mp3',
        transcript: "GOOD MORNING CHAMPION! It's gonna be YOUR day!",
        narratorStyle: 'hype_man',
      },
      {
        id: 'voice-002',
        type: 'rival_alert',
        audioUrl: '/audio/rival-alert.mp3',
        transcript: "YO! Someone just zoomed past you! Time for a comeback!",
        narratorStyle: 'hype_man',
      },
    ];

    const filteredNotes = type
      ? mockVoiceNotes.filter(n => n.type === type)
      : mockVoiceNotes;

    return NextResponse.json({
      success: true,
      data: filteredNotes,
    });
  } catch (error) {
    console.error('Error fetching voice notes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch voice notes' },
      { status: 500 }
    );
  }
}
