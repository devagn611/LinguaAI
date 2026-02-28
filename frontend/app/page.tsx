'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

const translationExamples = [
  {
    from: 'EN',
    to: 'JA',
    source: 'The early bird catches the worm.',
    translated: '早起きは三文の徳。',
    context: 'AI - Cultural Context',
  },
  {
    from: 'ES',
    to: 'EN',
    source: 'No hay mal que por bien no venga',
    translated: 'Every cloud has a silver lining',
    context: 'AI - Cultural Context',
  },
  {
    from: 'FR',
    to: 'EN',
    source: 'Il ne faut pas vendre la peau de l\'ours avant de l\'avoir tué',
    translated: 'Don\'t count your chickens before they hatch',
    context: 'AI - Cultural Context',
  },
];

const europeanLanguages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch', 'Polish',
  'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Greek', 'Czech', 'Romanian',
];

const asianLanguages = [
  'Japanese', 'Chinese (Simplified)', 'Chinese (Traditional)', 'Korean', 'Hindi', 'Bengali', 'Thai',
  'Vietnamese', 'Indonesian', 'Malay', 'Tagalog', 'Urdu', 'Tamil', 'Telugu', 'Kannada',
];

const allLanguages = [
  ...europeanLanguages,
  ...asianLanguages,
  'Arabic', 'Hebrew', 'Turkish', 'Russian', 'Ukrainian', 'Bulgarian', 'Serbian', 'Croatian',
  'Swahili', 'Zulu', 'Afrikaans', 'Amharic', 'Persian', 'Pashto', 'Kurdish', 'Azerbaijani',
  'Mongolian', 'Tibetan', 'Burmese', 'Khmer', 'Lao', 'Nepali', 'Sinhala', 'Malayalam',
  'Gujarati', 'Punjabi', 'Marathi', 'Kazakh', 'Uzbek', 'Georgian', 'Armenian', 'Lithuanian',
  'Latvian', 'Estonian', 'Icelandic', 'Irish', 'Welsh', 'Basque', 'Catalan', 'Galician',
];

export default function LandingPage() {
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
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Logo size="md" />

              {/* Navigation Links
              <div className="hidden md:flex items-center gap-8">
                <Link href="#demo" className="text-gray-400 hover:text-white transition-colors text-sm">
                  DEMO
                </Link>
                <Link href="#languages" className="text-gray-400 hover:text-white transition-colors text-sm">
                  LANGUAGES
                </Link>
                <Link href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">
                  FEATURES
                </Link>
                <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">
                  PRICING
                </Link>
              </div> */}

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {/* <button className="px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-lg hover:border-white/40 transition-colors">
                  SIGN IN
                </button> */}
                <Link href="/app">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-[#ffa500] rounded-lg hover:bg-[#ffb733] transition-colors flex items-center gap-2">
                    Launch App
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Hero Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#ffa500] text-xs font-medium"
                >
                  AI-POWERED TRANSLATION ENGINE • 2026
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
                >
                  <span className="text-white">BREAK</span>{' '}
                  <span className="text-[#ffa500]">EVERY</span>{' '}
                  <span className="text-white">BARRIER.</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl"
                >
                  Translate documents, conversations, and code across{' '}
                  <span className="text-[#ffa500] font-semibold">120+ languages</span>{' '}
                  with cultural nuance — not just word-for-word conversion. Built for teams shipping globally.
                </motion.p>
              </motion.div>

              {/* Right Side - Translation Examples */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                {translationExamples.map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="relative p-6 rounded-xl bg-[#1a1a1a] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    {/* Orange dot indicator */}
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#ffa500]"></div>
                    
                    {/* Language pair */}
                    <div className="text-[#ffa500] text-sm font-medium mb-3">
                      {example.from} → {example.to}
                    </div>
                    
                    {/* Source text */}
                    <div className="text-gray-300 text-sm mb-2">
                      {example.source}
                    </div>
                    
                    {/* Translated text */}
                    <div className="text-gray-400 text-sm mb-3">
                      {example.translated}
                    </div>
                    
                    {/* Context badge */}
                    <div className="flex items-center gap-2 text-[#ffa500] text-xs font-medium">
                      <span>◆</span>
                      <span>{example.context}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Languages Section */}
        <section id="languages" className="relative pb-20 md:pb-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            {/* Animated Language Banner */}
            <div className="relative mb-16 overflow-hidden py-4">
              <div className="flex gap-8 animate-scroll">
                {/* First set */}
                <div className="flex gap-8 shrink-0">
                  {allLanguages.map((lang, index) => (
                    <span
                      key={`first-${index}`}
                      className="text-xl md:text-2xl lg:text-3xl font-bold text-white/10 whitespace-nowrap hover:text-white/20 transition-colors"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
                {/* Duplicate for seamless loop */}
                <div className="flex gap-8 shrink-0" aria-hidden="true">
                  {allLanguages.map((lang, index) => (
                    <span
                      key={`second-${index}`}
                      className="text-xl md:text-2xl lg:text-3xl font-bold text-white/10 whitespace-nowrap"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              {/* Gradient overlays for fade effect */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              {/* Section Header */}
              <div className="mb-8">
                <div className="text-sm text-gray-500 uppercase tracking-wider mb-4">COVERAGE</div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span className="text-white">120+ languages.</span>
                  <br />
                  <span className="text-[#ffa500]">Every region.</span>{' '}
                  <span className="text-white">Every</span>
                  <br />
                  <span className="text-white">dialect.</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mt-6">
                  From widely-spoken languages to regional dialects and minority languages — LinguaAI covers more ground than any other platform.
                </p>
              </div>

              {/* Language Cards */}
              <div className="space-y-6">
                {/* European Languages */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative p-8 rounded-2xl bg-[#1a1a1a] border border-white/5"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <h3 className="text-blue-500 text-lg font-semibold">EUROPEAN</h3>
                    </div>
                    <div className="text-6xl font-bold text-blue-500/20">15+</div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {europeanLanguages.map((lang, index) => (
                      <button
                        key={index}
                        className="px-4 py-2 rounded-lg bg-[#0a0a0a] text-gray-300 text-sm hover:bg-[#1a1a1a] hover:text-white transition-colors border border-white/5"
                      >
                        {lang}
                      </button>
                    ))}
                    <button className="px-4 py-2 rounded-lg bg-[#0a0a0a] text-blue-500 text-sm hover:bg-[#1a1a1a] transition-colors border border-white/5">
                      +more
                    </button>
                  </div>
                </motion.div>

                {/* Asian Languages */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative p-8 rounded-2xl bg-[#1a1a1a] border border-white/5"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#ffa500]"></div>
                      <h3 className="text-[#ffa500] text-lg font-semibold">ASIAN</h3>
                    </div>
                    <div className="text-6xl font-bold text-[#ffa500]/20">15+</div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {asianLanguages.map((lang, index) => (
                      <button
                        key={index}
                        className="px-4 py-2 rounded-lg bg-[#0a0a0a] text-gray-300 text-sm hover:bg-[#1a1a1a] hover:text-white transition-colors border border-white/5"
                      >
                        {lang}
                      </button>
                    ))}
                    <button className="px-4 py-2 rounded-lg bg-[#0a0a0a] text-[#ffa500] text-sm hover:bg-[#1a1a1a] transition-colors border border-white/5">
                      +more
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <Logo size="sm" />
              <p className="text-sm text-gray-500">
                © 2026 LinguaAI. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
