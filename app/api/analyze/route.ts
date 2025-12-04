import { NextRequest, NextResponse } from 'next/server';
import { analyzeGameImage } from '@/lib/claude';
import { searchYouTubeWalkthrough } from '@/lib/youtube';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const image = formData.get('image') as File;

    // Validate image presence
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Validate image type
    if (!ALLOWED_IMAGE_TYPES.includes(image.type)) {
      return NextResponse.json(
        { error: 'Invalid image type. Please upload a PNG, JPG, GIF, or WebP image.' },
        { status: 400 }
      );
    }

    // Validate image size
    if (image.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Image size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Analyze image with Claude
    let analysisResult;
    try {
      analysisResult = await analyzeGameImage(base64Image, image.type);
    } catch (error) {
      console.error('Claude API error:', error);
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          return NextResponse.json(
            { error: 'AI service configuration error. Please contact support.' },
            { status: 500 }
          );
        }
        if (error.message.includes('rate limit')) {
          return NextResponse.json(
            { error: 'Too many requests. Please try again in a moment.' },
            { status: 429 }
          );
        }
      }
      return NextResponse.json(
        { error: 'Failed to analyze image with AI. Please try again.' },
        { status: 500 }
      );
    }

    // Validate analysis result
    if (!analysisResult.gameName) {
      return NextResponse.json(
        { error: 'Could not identify the game from the screenshot. Please try a clearer image.' },
        { status: 400 }
      );
    }

    // Search for YouTube walkthrough
    let walkthroughVideo = null;
    try {
      walkthroughVideo = await searchYouTubeWalkthrough(
        analysisResult.gameName,
        analysisResult.context
      );
    } catch (error) {
      console.error('YouTube search error:', error);
      // Don't fail the entire request if YouTube search fails
      // Just return results without walkthrough
    }

    return NextResponse.json({
      success: true,
      gameName: analysisResult.gameName,
      context: analysisResult.context,
      suggestions: analysisResult.suggestions,
      walkthrough: walkthroughVideo,
    });
  } catch (error) {
    console.error('Error analyzing image:', error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('Failed to parse')) {
        return NextResponse.json(
          { error: 'Invalid request format' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
