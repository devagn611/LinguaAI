'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Check } from 'lucide-react';
import { LANGUAGES, POPULAR_LANGUAGES } from '@/lib/constants';
import { getLanguageName, getLanguageNative } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

interface LanguageSelectorProps {
  sourceLang: string;
  targetLanguages: string[];
  onSourceChange: (lang: string) => void;
  onTargetChange: (languages: string[]) => void;
}

export default function LanguageSelector({
  sourceLang,
  targetLanguages,
  onSourceChange,
  onTargetChange,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = useMemo(() => {
    if (!searchQuery) return LANGUAGES;
    const query = searchQuery.toLowerCase();
    return LANGUAGES.filter(
      (lang) =>
        lang.name.toLowerCase().includes(query) ||
        lang.native.toLowerCase().includes(query) ||
        lang.code.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const toggleLanguage = (code: string) => {
    if (targetLanguages.includes(code)) {
      onTargetChange(targetLanguages.filter((lang) => lang !== code));
    } else {
      onTargetChange([...targetLanguages, code]);
    }
  };

  const removeLanguage = (code: string) => {
    onTargetChange(targetLanguages.filter((lang) => lang !== code));
  };

  const addPopularLanguage = (code: string) => {
    if (!targetLanguages.includes(code) && code !== sourceLang) {
      onTargetChange([...targetLanguages, code]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Source Language
        </label>
        <select
          value={sourceLang}
          onChange={(e) => onSourceChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-[#0a0a0a] text-white focus:outline-none focus:ring-2 focus:ring-[#ffa500] focus:border-transparent transition-all"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-[#0a0a0a] text-white">
              {lang.name} ({lang.native})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Target Languages
        </label>
        <div className="space-y-3">
          {targetLanguages.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {targetLanguages.map((code) => (
                  <Badge
                    key={code}
                    variant="primary"
                    onRemove={() => removeLanguage(code)}
                  >
                    {getLanguageName(code)} ({getLanguageNative(code)})
                  </Badge>
                ))}
              </AnimatePresence>
            </div>
          )}

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-[#0a0a0a] text-left text-gray-300 hover:border-[#ffa500] focus:outline-none focus:ring-2 focus:ring-[#ffa500] transition-all"
            >
              {targetLanguages.length === 0
                ? 'Select target languages...'
                : `Add more languages (${targetLanguages.length} selected)`}
            </button>

            <AnimatePresence>
              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 w-full mt-2"
                  >
                    <Card variant="elevated" className="max-h-96 overflow-hidden flex flex-col">
                      <div className="p-4 border-b border-white/10">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="text"
                            placeholder="Search languages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="overflow-y-auto flex-1">
                        {POPULAR_LANGUAGES.length > 0 && (
                          <div className="p-4 border-b border-white/10">
                            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                              Popular
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {POPULAR_LANGUAGES.map((code) => {
                                if (code === sourceLang) return null;
                                const lang = LANGUAGES.find((l) => l.code === code);
                                if (!lang) return null;
                                return (
                                  <motion.button
                                    key={code}
                                    type="button"
                                    onClick={() => addPopularLanguage(code)}
                                    disabled={targetLanguages.includes(code)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-3 py-1.5 text-sm rounded-lg border border-white/10 hover:border-[#ffa500] hover:bg-[#ffa500]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
                                  >
                                    {lang.name}
                                  </motion.button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <div className="p-2">
                          {filteredLanguages.map((lang) => {
                            if (lang.code === sourceLang) return null;
                            const isSelected = targetLanguages.includes(lang.code);
                            return (
                              <motion.button
                                key={lang.code}
                                type="button"
                                onClick={() => toggleLanguage(lang.code)}
                                whileHover={{ x: 4 }}
                                className="w-full px-3 py-2.5 rounded-lg hover:bg-white/5 flex items-center justify-between transition-colors text-left"
                              >
                                <div>
                                  <span className="font-medium text-white">
                                    {lang.name}
                                  </span>
                                  <span className="ml-2 text-sm text-gray-400">
                                    {lang.native}
                                  </span>
                                </div>
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 500 }}
                                  >
                                    <Check className="h-4 w-4 text-[#ffa500]" />
                                  </motion.div>
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
