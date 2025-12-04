export interface YouTubeVideo {
  title: string;
  videoId: string;
  thumbnail: string;
  channelTitle: string;
}

export async function searchYouTubeWalkthrough(
  gameName: string,
  context?: string
): Promise<YouTubeVideo | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.warn('YouTube API key not configured');
    return null;
  }

  try {
    // Build search query
    const searchQuery = context
      ? `${gameName} walkthrough ${context}`
      : `${gameName} walkthrough`;

    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.append('part', 'snippet');
    url.searchParams.append('q', searchQuery);
    url.searchParams.append('type', 'video');
    url.searchParams.append('maxResults', '1');
    url.searchParams.append('order', 'relevance');
    url.searchParams.append('videoDuration', 'medium');
    url.searchParams.append('key', apiKey);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error('YouTube API request failed');
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const video = data.items[0];

    return {
      title: video.snippet.title,
      videoId: video.id.videoId,
      thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url,
      channelTitle: video.snippet.channelTitle,
    };
  } catch (error) {
    console.error('Error searching YouTube:', error);
    return null;
  }
}
