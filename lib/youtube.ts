export interface YouTubeVideo {
  title: string;
  videoId: string;
  thumbnail: string;
  channelTitle: string;
}

export async function searchYouTubeWalkthroughs(
  searchQueries: string[]
): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.warn('YouTube API key not configured');
    return [];
  }

  try {
    // Fetch results for each search query
    const allResults: YouTubeVideo[] = [];
    const seenVideoIds = new Set<string>();

    for (const query of searchQueries) {
      const url = new URL('https://www.googleapis.com/youtube/v3/search');
      url.searchParams.append('part', 'snippet');
      url.searchParams.append('q', query);
      url.searchParams.append('type', 'video');
      url.searchParams.append('maxResults', '5');
      url.searchParams.append('order', 'relevance');
      url.searchParams.append('videoDuration', 'medium');
      url.searchParams.append('key', apiKey);

      const response = await fetch(url.toString());

      if (!response.ok) {
        console.warn(`YouTube API request failed for query: ${query}`);
        continue;
      }

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        for (const video of data.items) {
          const videoId = video.id.videoId;

          // Deduplicate by videoId
          if (!seenVideoIds.has(videoId)) {
            seenVideoIds.add(videoId);
            allResults.push({
              title: video.snippet.title,
              videoId: videoId,
              thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url,
              channelTitle: video.snippet.channelTitle,
            });
          }

          // Stop if we have enough results
          if (allResults.length >= 5) {
            break;
          }
        }
      }

      // Stop if we have enough results
      if (allResults.length >= 5) {
        break;
      }
    }

    // Return top 5 deduplicated results
    return allResults.slice(0, 5);
  } catch (error) {
    console.error('Error searching YouTube:', error);
    return [];
  }
}
