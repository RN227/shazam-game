import { NextRequest, NextResponse } from 'next/server';
import { analyzeGameImage } from '@/lib/claude';
import { searchYouTubeWalkthrough } from '@/lib/youtube';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, mediaType } = body;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    if (!mediaType) {
      return NextResponse.json(
        { error: 'No mediaType provided' },
        { status: 400 }
      );
    }

    // Analyze image with Claude (image is already base64)
    const analysisResult = await analyzeGameImage(image, mediaType);

    if (!analysisResult.gameName) {
      return NextResponse.json(
        { error: 'Could not identify the game from the screenshot' },
        { status: 400 }
      );
    }

    // Search for YouTube walkthrough
    const walkthroughVideo = await searchYouTubeWalkthrough(
      analysisResult.gameName,
      analysisResult.context
    );

    return NextResponse.json({
      success: true,
      gameName: analysisResult.gameName,
      context: analysisResult.context,
      suggestions: analysisResult.suggestions,
      walkthrough: walkthroughVideo,
    });
  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image. Please try again.' },
      { status: 500 }
    );
  }
}
