import Anthropic from '@anthropic-ai/sdk';
import { GAME_ANALYSIS_PROMPT } from './prompts';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface GameAnalysisResult {
  gameName: string;
  context: string;
  suggestions: string[];
  searchQueries: string[];
}

export async function analyzeGameImage(
  base64Image: string,
  mediaType: string
): Promise<GameAnalysisResult> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: GAME_ANALYSIS_PROMPT,
            },
          ],
        },
      ],
    });

    const textContent = response.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    // Extract JSON from the response
    const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON response from Claude');
    }

    const result = JSON.parse(jsonMatch[0]) as GameAnalysisResult;

    return result;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw new Error('Failed to analyze image with Claude');
  }
}
