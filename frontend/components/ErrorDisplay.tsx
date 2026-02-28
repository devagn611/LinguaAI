'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export default function ErrorDisplay({
  error,
  onRetry,
  onDismiss,
}: ErrorDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card variant="outlined" className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
        <div className="flex items-start gap-4">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900 dark:text-red-300 mb-1">Translation Error</h3>
            <p className="text-red-800 dark:text-red-400 text-sm">{error}</p>
            {onRetry && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRetry}
                  className="border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry
                </Button>
              </div>
            )}
          </div>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
