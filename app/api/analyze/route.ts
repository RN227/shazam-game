import { NextRequest, NextResponse } from 'next/server';
import { analyzeGameImage } from '@/lib/claude';
import { searchYouTubeWalkthrough } from '@/lib/youtube';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Analyze image with Claude
    const analysisResult = await analyzeGameImage(base64Image, image.type);

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
