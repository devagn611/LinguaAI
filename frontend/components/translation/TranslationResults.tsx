'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { TranslateResponse } from '@/types/translation';
import { getLanguageName, getLanguageNative } from '@/lib/utils';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import UsageStats from './UsageStats';

interface TranslationResultsProps {
  results: TranslateResponse;
}

export default function TranslationResults({ results }: TranslationResultsProps) {
  const [activeTab, setActiveTab] = useState<string | null>(
    Object.keys(results.translations)[0] || null
  );
  const [copiedLang, setCopiedLang] = useState<string | null>(null);

  const languages = Object.keys(results.translations);

  const handleCopy = async (lang: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLang(lang);
      setTimeout(() => setCopiedLang(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = (lang: string, text: string) => {
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translation-${lang}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (languages.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card variant="elevated" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Translations
          </h2>
          <p className="text-gray-400">
            {languages.length} language{languages.length !== 1 ? 's' : ''} translated
          </p>
        </div>

        <UsageStats usage={results.usage} />

        <div>
          <div className="flex flex-wrap gap-2 mb-4 border-b border-white/10 overflow-x-auto pb-2" role="tablist">
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveTab(lang)}
                aria-selected={activeTab === lang}
                role="tab"
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#ffa500] ${
                  activeTab === lang
                    ? 'bg-[#ffa500] text-white border-b-2 border-[#ffa500]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {getLanguageName(lang)}
                <span className="ml-1 text-xs opacity-70">
                  ({getLanguageNative(lang)})
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleCopy(activeTab, results.translations[activeTab])
                    }
                  >
                    {copiedLang === activeTab ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleDownload(activeTab, results.translations[activeTab])
                    }
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="prose prose-invert max-w-none bg-[#0a0a0a] rounded-lg p-4 md:p-6 border border-white/10 overflow-x-auto text-white"
                >
                  <ReactMarkdown>{results.translations[activeTab]}</ReactMarkdown>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}
