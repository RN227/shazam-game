'use client';

import { useEffect, useState } from 'react';

export default function LoadingState() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000);
    const timer2 = setTimeout(() => setStep(2), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="glass-card rounded-2xl p-10 animate-slide-up">
      <div className="flex flex-col items-center gap-8">
        {/* Animated Spinner */}
        <div className="relative w-32 h-32">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-cyan-500 animate-spin"
            style={{ animationDuration: '1s' }}
          ></div>

          {/* Middle rotating ring */}
          <div
            className="absolute inset-3 rounded-full border-4 border-transparent border-t-cyan-500 border-l-pink-500 animate-spin"
            style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
          ></div>

          {/* Inner pulsing core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 animate-pulse-glow"></div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
        </div>

        <div className="text-center space-y-3">
          <h3 className="text-3xl font-gaming font-bold text-white">
            ANALYZING
          </h3>
          <p className="text-cyan-300 font-medium text-lg animate-pulse">
            AI processing in progress...
          </p>
        </div>

        <div className="w-full max-w-lg space-y-4">
          {/* Step 1 */}
          <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
            step >= 0 ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-gray-800/20 border border-gray-700/30'
          }`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
              step >= 1 ? 'bg-gradient-to-br from-purple-600 to-purple-700' : 'bg-purple-600/50 animate-pulse-glow'
            }`}>
              {step >= 1 ? (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="flex-1">
              <p className={`font-gaming font-semibold transition-colors ${
                step >= 1 ? 'text-purple-300' : 'text-white'
              }`}>
                PROCESSING IMAGE
              </p>
              <p className="text-sm text-gray-400 mt-1">Extracting visual data with AI</p>
            </div>
            {step >= 0 && step < 1 && (
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>

          {/* Step 2 */}
          <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
            step >= 1 ? 'bg-cyan-600/20 border border-cyan-500/30' : 'bg-gray-800/20 border border-gray-700/30'
          }`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
              step >= 2 ? 'bg-gradient-to-br from-cyan-600 to-cyan-700' : step >= 1 ? 'bg-cyan-600/50 animate-pulse-glow' : 'bg-gray-700'
            }`}>
              {step >= 2 ? (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : step >= 1 ? (
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              ) : (
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              )}
            </div>
            <div className="flex-1">
              <p className={`font-gaming font-semibold transition-colors ${
                step >= 2 ? 'text-cyan-300' : step >= 1 ? 'text-white' : 'text-gray-500'
              }`}>
                IDENTIFYING GAME
              </p>
              <p className="text-sm text-gray-400 mt-1">Analyzing context and details</p>
            </div>
            {step >= 1 && step < 2 && (
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>

          {/* Step 3 */}
          <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
            step >= 2 ? 'bg-pink-600/20 border border-pink-500/30' : 'bg-gray-800/20 border border-gray-700/30'
          }`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
              step >= 2 ? 'bg-pink-600/50 animate-pulse-glow' : 'bg-gray-700'
            }`}>
              <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-white animate-pulse' : 'bg-gray-500'}`}></div>
            </div>
            <div className="flex-1">
              <p className={`font-gaming font-semibold transition-colors ${
                step >= 2 ? 'text-white' : 'text-gray-500'
              }`}>
                FINDING WALKTHROUGHS
              </p>
              <p className="text-sm text-gray-400 mt-1">Searching for best guides</p>
            </div>
            {step >= 2 && (
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-lg">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-600 transition-all duration-1000 ease-out rounded-full"
              style={{
                width: `${((step + 1) / 3) * 100}%`,
                boxShadow: '0 0 20px rgba(183, 68, 255, 0.5)'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
