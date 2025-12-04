'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import ResultCard from './ResultCard';
import LoadingState from './LoadingState';

interface AnalysisResult {
  gameName: string;
  context: string;
  suggestions: string[];
  walkthroughs: {
    title: string;
    videoId: string;
    thumbnail: string;
    channelTitle: string;
  }[];
}

export default function ImageUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Analyze image
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze image');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setPreview(null);
    setResult(null);
    setError(null);
    setIsAnalyzing(false);
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

          {isAnalyzing && <LoadingState />}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-700 dark:text-red-400">{error}</p>
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
