'use client';

interface LoadingStateProps {
  step?: 'upload' | 'analyze' | 'search';
}

export default function LoadingState({ step = 'analyze' }: LoadingStateProps) {
  const steps = [
    { id: 'upload', label: 'Processing image with AI' },
    { id: 'analyze', label: 'Identifying game and context' },
    { id: 'search', label: 'Finding walkthrough videos' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  const getStepIcon = (index: number) => {
    if (index < currentStepIndex) {
      // Completed step
      return (
        <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    } else if (index === currentStepIndex) {
      // Current step
      return (
        <div className="w-5 h-5 rounded-full border-2 border-purple-600 animate-pulse"></div>
      );
    } else {
      // Future step
      return (
        <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
      );
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-8">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {step === 'upload' && 'Processing your screenshot...'}
            {step === 'analyze' && 'Analyzing your screenshot...'}
            {step === 'search' && 'Finding the best walkthrough...'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            AI is identifying the game and finding the best walkthrough
          </p>
        </div>

        <div className="w-full max-w-md space-y-3">
          {steps.map((s, index) => (
            <div
              key={s.id}
              className={`flex items-center gap-3 text-sm ${
                index <= currentStepIndex
                  ? 'text-gray-600 dark:text-gray-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {getStepIcon(index)}
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
