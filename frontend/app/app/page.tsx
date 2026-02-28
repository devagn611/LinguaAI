'use client';

import { useState } from 'react';
import TranslationForm from '@/components/translation/TranslationForm';
import TranslationResults from '@/components/translation/TranslationResults';
import LoadingState from '@/components/translation/LoadingState';
import ErrorDisplay from '@/components/ErrorDisplay';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import type { TranslateRequest, TranslateResponse } from '@/types/translation';
import { translateArticle } from '@/lib/api';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function AppPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<TranslateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastRequest, setLastRequest] = useState<TranslateRequest | null>(null);

  const handleTranslate = async (request: TranslateRequest) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    setLastRequest(request);

    try {
      const response = await translateArticle(request);
      setResults(response);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Translation failed. Please check your API configuration and try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastRequest) {
      handleTranslate(lastRequest);
    }
  };

  const handleDismissError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '20px 20px',
      }}></div>
      <div className="fixed inset-0 opacity-10" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)',
      }}></div>

      <div className="relative z-10">
        <main className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Header with Logo and Back Link */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-8 md:mb-12"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </Link>
              <Logo size="sm" />
            </motion.div>

            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-8 md:mb-12"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 md:mb-4"
              >
                <span className="text-white">Translate</span>{' '}
                <span className="text-[#ffa500]">with AI</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4"
              >
                Translate articles to multiple languages with the power of AI
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full"
              >
                <TranslationForm onSubmit={handleTranslate} isLoading={isLoading} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="lg:sticky lg:top-8 lg:h-fit w-full"
              >
                <ErrorBoundary>
                  {isLoading && <LoadingState />}
                  {error && (
                    <ErrorDisplay
                      error={error}
                      onRetry={handleRetry}
                      onDismiss={handleDismissError}
                    />
                  )}
                  {results && !isLoading && (
                    <TranslationResults results={results} />
                  )}
                </ErrorBoundary>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
