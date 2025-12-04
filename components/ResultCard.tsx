'use client';

import Image from 'next/image';

interface ResultCardProps {
  result: {
    gameName: string;
    context: string;
    suggestions: string[];
    walkthroughs: {
      title: string;
      videoId: string;
      thumbnail: string;
      channelTitle: string;
    }[];
  };
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {result.gameName}
        </h2>
      </div>

      {result.context && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            What we detected:
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {result.context}
          </p>
        </div>
      )}

      {result.suggestions && result.suggestions.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Suggestions:
          </h3>
          <ul className="space-y-2">
            {result.suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
              >
                <span className="text-purple-500 mt-1">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.walkthroughs && result.walkthroughs.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Recommended Walkthroughs:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.walkthroughs.map((walkthrough) => (
              <a
                key={walkthrough.videoId}
                href={`https://www.youtube.com/watch?v=${walkthrough.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  <div className="relative aspect-video">
                    <Image
                      src={walkthrough.thumbnail}
                      alt={walkthrough.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                      {walkthrough.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {walkthrough.channelTitle}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
