'use client';

import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, FileText } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';
import type { TranslateResponse } from '@/types/translation';

interface UsageStatsProps {
  usage: TranslateResponse['usage'];
}

export default function UsageStats({ usage }: UsageStatsProps) {
  const stats = [
    {
      label: 'Input Tokens',
      value: formatNumber(usage.inputTokens),
      icon: FileText,
      color: 'text-blue-400',
    },
    {
      label: 'Output Tokens',
      value: formatNumber(usage.outputTokens),
      icon: TrendingUp,
      color: 'text-green-400',
    },
    {
      label: 'Estimated Cost',
      value: formatCurrency(usage.estimatedCostUsd),
      icon: DollarSign,
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0a0a0a] rounded-lg p-4 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-xs font-medium text-gray-400">
                {stat.label}
              </span>
            </div>
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="text-lg font-bold text-white"
            >
              {stat.value}
            </motion.p>
          </motion.div>
        );
      })}
    </div>
  );
}
