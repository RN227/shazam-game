'use client';

import Image from 'next/image';

interface MissionInfo {
  name: string;
  type: 'mission' | 'level' | 'boss' | 'area' | 'puzzle' | 'quest';
  objective: string;
}

interface YouTubeVideo {
  title: string;
  videoId: string;
  thumbnail: string;
  channelTitle: string;
}

interface ResultCardProps {
  result: {
    gameName: string;
    mission: MissionInfo | null;
    summary: string;
    tips: string[];
    walkthroughs: YouTubeVideo[];
  };
}

export default function ResultCard({ result }: ResultCardProps) {
  const isIdentified = result.gameName !== 'Unknown Game';

  const getMissionTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      mission: 'Mission',
      level: 'Level',
      boss: 'Boss Fight',
      area: 'Area',
      puzzle: 'Puzzle',
      quest: 'Quest',
    };
    return labels[type] || 'Location';
  };

  const getMissionTypeIcon = (type: string) => {
    switch (type) {
      case 'boss':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        );
      case 'puzzle':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        );
      default:
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      {/* Game Name Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <h2 className="text-3xl font-bold text-white flex-1">
            {result.gameName}
          </h2>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
            isIdentified
              ? 'bg-green-500 text-white'
              : 'bg-yellow-500 text-gray-900'
          }`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              {isIdentified ? (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              )}
            </svg>
            {isIdentified ? 'Identified' : 'Low Confidence'}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Mission/Level Info */}
        {result.mission && (
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-5 border border-indigo-200 dark:border-indigo-800">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {getMissionTypeIcon(result.mission.type)}
              </svg>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                    {getMissionTypeLabel(result.mission.type)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-200 mb-2">
                  {result.mission.name}
                </h3>
                <p className="text-indigo-700 dark:text-indigo-300">
                  <span className="font-medium">Objective:</span> {result.mission.objective}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        {result.summary && (
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Summary
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {result.summary}
            </p>
          </div>
        )}

        {/* Tips */}
        {result.tips && result.tips.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border-l-4 border-purple-500">
            <h3 className="text-lg font-bold text-purple-900 dark:text-purple-200 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Tips to Help You
            </h3>
            <ul className="space-y-3">
              {result.tips.map((tip, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-purple-800 dark:text-purple-300"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center text-sm font-bold text-purple-700 dark:text-purple-300">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Walkthrough Videos */}
        {result.walkthroughs && result.walkthroughs.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Walkthrough Videos ({result.walkthroughs.length})
            </h3>
            
            <div className="grid gap-4">
              {result.walkthroughs.map((video, index) => (
                <a
                  key={video.videoId}
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className={`flex gap-4 p-3 rounded-xl transition-all duration-300 ${
                    index === 0 
                      ? 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600' 
                      : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}>
                    <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="bg-red-600 rounded-full p-2 group-hover:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {index === 0 && (
                        <div className="absolute top-1 left-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                          TOP PICK
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {video.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {video.channelTitle}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* No walkthroughs found */}
        {(!result.walkthroughs || result.walkthroughs.length === 0) && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p>No walkthrough videos found for this specific situation.</p>
          </div>
        )}
      </div>
    </div>
  );
}
