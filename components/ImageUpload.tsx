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
    <div className="max-w-5xl mx-auto">
      {!preview ? (
        <div
          className={`upload-zone ${isDragging ? 'upload-zone-active' : 'upload-zone-idle'} p-16 md:p-20 text-center cursor-pointer relative group`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-purple-400 opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-purple-400 opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity"></div>

          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-6 relative z-10">
            <div className={`relative ${isDragging ? 'animate-float' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <svg
                className="relative w-20 h-20 text-cyan-400 group-hover:text-cyan-300 transition-colors"
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
            </div>
            <div>
              <p className="text-2xl font-gaming font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {isDragging ? 'DROP IT HERE' : 'UPLOAD SCREENSHOT'}
              </p>
              <p className="text-base text-gray-400 font-medium">
                Drag & drop or click to browse
              </p>
              <p className="text-sm text-gray-500 mt-3 font-gaming">
                PNG • JPG • WEBP
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="relative rounded-2xl overflow-hidden neon-border animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-600/10 pointer-events-none"></div>
            <Image
              src={preview}
              alt="Uploaded screenshot"
              width={1000}
              height={600}
              className="w-full h-auto relative z-10"
            />
            {/* Scan line effect while analyzing */}
            {isAnalyzing && (
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" style={{
                  animation: 'scan 2s linear infinite'
                }}></div>
              </div>
            )}
          </div>

          {isAnalyzing && <LoadingState />}

          {error && (
            <div className="glass-card border-red-500/30 rounded-xl p-6 animate-slide-up">
              <div className="flex items-center gap-4">
                <svg className="w-8 h-8 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-red-300 font-medium text-lg">{error}</p>
              </div>
            </div>
          )}

          {result && <ResultCard result={result} />}

          <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <button onClick={handleReset} className="btn-primary group">
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Another
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
