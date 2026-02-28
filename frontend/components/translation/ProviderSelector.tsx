'use client';

import { motion } from 'framer-motion';
import { PROVIDERS } from '@/lib/constants';
import type { Provider } from '@/types/translation';
import Select from '@/components/ui/Select';

interface ProviderSelectorProps {
  provider: Provider;
  model?: string;
  onProviderChange: (provider: Provider) => void;
  onModelChange: (model: string) => void;
}

export default function ProviderSelector({
  provider,
  model,
  onProviderChange,
  onModelChange,
}: ProviderSelectorProps) {
  const providerInfo = PROVIDERS[provider];
  const currentModel = model || providerInfo.defaultModel;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          AI Provider
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(['openai', 'google'] as Provider[]).map((p) => {
            const isSelected = provider === p;
            const info = PROVIDERS[p];
            return (
              <motion.button
                key={p}
                type="button"
                onClick={() => {
                  onProviderChange(p);
                  onModelChange(info.defaultModel);
                }}
                className={`relative px-4 py-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-[#ffa500] bg-[#ffa500]/10'
                    : 'border-white/10 bg-[#0a0a0a] hover:border-white/20'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-left">
                  <div className="font-semibold text-white">{info.name}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {info.models.length} models available
                  </div>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 h-2 w-2 bg-[#ffa500] rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Model
        </label>
        <Select
          value={currentModel}
          onChange={(e) => onModelChange(e.target.value)}
          options={providerInfo.models.map((m) => ({
            value: m.value,
            label: `${m.label} (${m.cost} cost)`,
          }))}
        />
      </div>
    </div>
  );
}
