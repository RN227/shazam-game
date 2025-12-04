'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import ResultCard from './ResultCard';
import LoadingState from './LoadingState';

interface AnalysisResult {
  gameName: string;
  context: string;
  suggestions: string[];
  walkthrough: {
    title: string;
    videoId: string;
    thumbnail: string;
    channelTitle: string;
  } | null;
}

type LoadingStep = 'upload' | 'analyze' | 'search';

export default function ImageUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState<LoadingStep>('upload');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  // Image analysis function
  const analyzeImage = useCallback(async (file: File, retryCount = 0): Promise<void> => {
    const MAX_RETRIES = 2;
    const TIMEOUT_MS = 60000; // 60 seconds

    try {
      setLoadingStep('upload');

      const formData = new FormData();
      formData.append('image', file);

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

      setLoadingStep('analyze');

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      setLoadingStep('search');

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(data.error || 'Could not identify the game from the screenshot');
        } else if (response.status === 500) {
          throw new Error('Server error. Please try again.');
        } else {
          throw new Error(data.error || 'Failed to analyze image');
        }
      }

      setResult(data);
      setError(null);
    } catch (err) {
      // Handle timeout
      if (err instanceof Error && err.name === 'AbortError') {
        if (retryCount < MAX_RETRIES) {
          setError(`Request timed out. Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          return analyzeImage(file, retryCount + 1);
        } else {
          setError('Request timed out after multiple attempts. Please try again.');
        }
      }
      // Handle network errors
      else if (err instanceof Error && err.message.includes('fetch')) {
        if (retryCount < MAX_RETRIES) {
          setError(`Network error. Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          return analyzeImage(file, retryCount + 1);
        } else {
          setError('Network error. Please check your connection and try again.');
        }
      }
      // Handle other errors
      else {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
      }
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, GIF, or WebP)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Store file for retry functionality
    setCurrentFile(file);

    // Analyze image
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    await analyzeImage(file);
  }, [analyzeImage]);

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleRetry = () => {
    if (currentFile) {
      setIsAnalyzing(true);
      setError(null);
      setResult(null);
      analyzeImage(currentFile);
    }
  };

  const handleReset = () => {
    setPreview(null);
    setResult(null);
    setError(null);
    setIsAnalyzing(false);
    setCurrentFile(null);
    setLoadingStep('upload');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!preview ? (
        <div
          className={`upload-zone ${isDragging ? 'upload-zone-active' : 'upload-zone-idle'} p-12 text-center cursor-pointer`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-4">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Drop your game screenshot here
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                or click to browse
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <Image
              src={preview}
              alt="Uploaded screenshot"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>

          {isAnalyzing && <LoadingState step={loadingStep} />}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-red-700 dark:text-red-400 font-semibold mb-2">Error</p>
                  <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
                  {currentFile && !error.includes('Retrying') && (
                    <button
                      onClick={handleRetry}
                      className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {result && <ResultCard result={result} />}

          <div className="flex justify-center">
            <button onClick={handleReset} className="btn-primary">
              Upload Another Screenshot
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
