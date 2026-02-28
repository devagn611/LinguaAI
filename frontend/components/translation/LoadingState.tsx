'use client';

import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function LoadingState() {
  return (
    <Card variant="elevated" className="text-center py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="h-12 w-12 text-primary-600" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0"
          >
            <Sparkles className="h-12 w-12 text-purple-600" />
          </motion.div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            Translating your article...
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            This may take a few moments depending on the length
          </p>
        </div>

        <div className="w-full max-w-xs mx-auto">
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-600 to-purple-600"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>
      </motion.div>
    </Card>
  );
}
