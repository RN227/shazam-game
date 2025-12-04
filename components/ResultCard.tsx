'use client';

import Image from 'next/image';

interface ResultCardProps {
  result: {
    gameName: string;
    context: string;
    suggestions: string[];
    walkthrough: {
      title: string;
      videoId: string;
      thumbnail: string;
      channelTitle: string;
    } | null;
  };
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="glass-card rounded-2xl p-8 md:p-10 space-y-8 animate-slide-up">
      {/* Game Title Header */}
      <div className="relative pb-6">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-3 h-12 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 rounded-full"></div>
          <div>
            <p className="text-xs font-gaming text-cyan-400 tracking-widest mb-2">GAME IDENTIFIED</p>
            <h2 className="text-4xl md:text-5xl font-gaming font-black text-white">
              {result.gameName}
            </h2>
          </div>
        </div>
      </div>

      {/* Context Section */}
      {result.context && (
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-gaming font-bold text-cyan-300 tracking-wide">
              DETECTED CONTEXT
            </h3>
          </div>
          <div className="pl-11">
            <p className="text-gray-300 leading-relaxed text-lg">
              {result.context}
            </p>
          </div>
        </div>
      )}

      {/* Suggestions Section */}
      {result.suggestions && result.suggestions.length > 0 && (
        <div className="space-y-5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-600 to-cyan-700 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-gaming font-bold text-purple-300 tracking-wide">
              AI SUGGESTIONS
            </h3>
          </div>
          <ul className="space-y-3 pl-11">
            {result.suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="flex items-start gap-4 group animate-slide-up"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-md bg-gradient-to-br from-purple-600/30 to-cyan-600/30 border border-purple-500/30 flex items-center justify-center mt-1 group-hover:border-cyan-400/60 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                </div>
                <span className="text-gray-300 leading-relaxed text-base group-hover:text-white transition-colors">
                  {suggestion}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Walkthrough Section */}
      {result.walkthrough && (
        <div className="space-y-5 pt-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-600 to-pink-700 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <h3 className="text-xl font-gaming font-bold text-pink-300 tracking-wide">
              RECOMMENDED GUIDE
            </h3>
          </div>

          <a
            href={`https://www.youtube.com/watch?v=${result.walkthrough.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative"
          >
            <div className="relative rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-[1.02]">
              {/* Neon border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10"></div>
              <div className="relative neon-border rounded-xl overflow-hidden">
                <div className="relative aspect-video bg-black/50">
                  <Image
                    src={result.walkthrough.thumbnail}
                    alt={result.walkthrough.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-pink-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-10 h-10 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Duration badge (if you have it) */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-gaming rounded-md border border-pink-500/30">
                      WALKTHROUGH
                    </span>
                  </div>
                </div>

                {/* Video info */}
                <div className="p-5 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border-t border-purple-500/20">
                  <h4 className="font-gaming font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                    {result.walkthrough.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400 font-medium">
                      {result.walkthrough.channelTitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Watch now indicator */}
            <div className="mt-4 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-cyan-400 font-gaming text-sm tracking-wider">CLICK TO WATCH</span>
              <svg className="w-4 h-4 text-cyan-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
