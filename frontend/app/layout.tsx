import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import './globals.css';

const ubuntu = Ubuntu({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '700'],
  variable: '--font-ubuntu' 
});

export const metadata: Metadata = {
  title: 'LinguaAI - Translate Articles with AI',
  description: 'Translate articles to multiple languages using OpenAI or Google Gemini',
  keywords: ['translation', 'AI', 'OpenAI', 'Google Gemini', 'multilingual'],
};

import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ubuntu.variable}>
      <body className="antialiased bg-gradient-to-br from-slate-50 via-white to-purple-50 min-h-screen">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
